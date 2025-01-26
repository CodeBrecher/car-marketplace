import React, { useState, useEffect } from 'react';
import { Header } from '@/components/ui/header';
import CarDetails from './../Data/CarDetails.json';
import InputField from './Components/InputField';
import DropdownField from './Components/DropdownField';
import TextArea from './Components/TextArea';
import features from './../Data/features.json';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import { db } from './../../configs';
import { CarListing, CarImages } from './../../configs/schema';
import UploadImages from './Components/UploadImages';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { format } from 'date-fns';
import Service from './../Data/Service';

const { FormatResult } = Service;
import { eq } from 'drizzle-orm';
import moment from 'moment';

function AddListing() {
    const [formData, setFormData] = useState({});
    const [featuresData, setFeaturesData] = useState({});
    const [loading, setLoading] = useState(false);
    const [triggerUploadImages, setTriggerUploadImages] = useState();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useUser();
    const today = new Date();
    const formattedDate = format(today, 'dd/MM/yyyy');

    const mode = searchParams.get('mode');
    const recordId = searchParams.get('id');
    const [carInfo, setCarInfo] = useState(null);

    // Load car listing details when in edit mode
    useEffect(() => {
        if (mode === 'edit') {
            GetListingDetail();
        }
    }, []);

    useEffect(() => {
        if (mode === 'edit' && carInfo?.features) {
            setFeaturesData(carInfo.features);
            console.log("Preloaded Features Data:", carInfo.features);
        } else {
            setFeaturesData({});
        }
    }, [mode, carInfo]);

    // Fetch car listing details for editing
    const GetListingDetail = async () => {
        try {
            const result = await db.select().from(CarListing)
                .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
                .where(eq(CarListing.id, recordId));

            const resp = FormatResult(result);
            setCarInfo(resp[0]);
            console.log("Fetched Car Info:", resp[0]);
        } catch (error) {
            console.error("Error fetching listing details:", error);
        }
    };

    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFeatureChange = (name, value) => {
        setFeaturesData((prevData) => {
            const updatedData = { ...prevData, [name]: value };
            console.log("Feature Updated:", updatedData);
            return updatedData;
        });
    };

    const handleImageUpload = async (uploadedFiles) => {
        try {
            await db.insert(CarImages).values(
                uploadedFiles.map(file => ({
                    imageUrl: file.url,
                    carListingId: formData.id
                }))
            );
            console.log("Images linked to car listing successfully!");
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };

    const validateForm = () => {
        for (const key in formData) {
            if (formData[key] === "" || formData[key] === undefined) {
                toast.error(`Please fill in the ${key}`);
                return false;
            }
        }

        const hasSelectedFeatures = Object.values(featuresData).some((value) => value === true);
        if (!hasSelectedFeatures) {
            toast.error("Please select at least one feature.");
            console.log("Validation failed: No features selected.");
            return false;
        }

        return true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        console.log("Features Data:", featuresData);
        setLoading(true);
    
        if (!validateForm()) {
            setLoading(false);
            return;
        }
    
        // Ensure userName is set before submitting
        if (!formData.userName) {
            formData.userName = user?.fullName || "Unknown User";
        }
    
        if (mode === 'edit') {
            try {
                const result = await db.update(CarListing).set({
                    ...formData,
                    features: featuresData,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    userName: formData.userName, // Use formData.userName here
                    userImageUrl: user?.imageUrl,
                    postedOn: moment().format('DD/MM/yyyy')
                }).where(eq(CarListing.id, recordId)).returning({ id: CarListing.id });
    
                console.log(result);
    
                setLoading(false);
    
                toast.success("Listing updated successfully!");
    
                setTimeout(() => {
                    navigate('/profile');
                }, 3000);
    
            } catch (error) {
                console.error("Error updating listing:", error);
                setLoading(false);
                toast.error("Error updating listing! Please try again.");
            }
        } else {
            try {
                const result = await db.insert(CarListing).values({
                    ...formData,
                    features: featuresData,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    userName: formData.userName, // Use formData.userName here as well
                    postedOn: formattedDate
                }).returning({ id: CarListing.id });
    
                if (result) {
                    setTriggerUploadImages(result[0]?.id);
                    setLoading(false);
                    toast.success("Listing added successfully!");
    
                    setTimeout(() => {
                        navigate('/profile');
                    }, 3000);
                }
            } catch (error) {
                console.error("Error saving listing:", error);
                setLoading(false);
                toast.error("Error saving listing! Please try again.");
            }
        }
    };
    

    return (
        <div>
            <Header />
            <div className='px-10 md:px-20 my-10'>
                <h2 className='font-bold text-4xl'>{mode === 'edit' ? 'Edit Listing' : 'Add New Listing'}</h2>
                <form className='p-10 border rounded-xl mt-10' onSubmit={onSubmit}>
                    <div>
                        <h2 className="font-medium text-xl mb-6">Car Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {CarDetails.carDetails.map((item, index) => (
                                <div key={index}>
                                    <label className="text-sm">
                                        {item?.label}
                                        {item.required && <span className="text-red-500">*</span>}
                                    </label>
                                    {item.fieldType === 'text' || item.fieldType === 'number' ? (
                                        <InputField
                                            item={item}
                                            handleInputChange={(name, value) => handleInputChange(item.name, value)}
                                            carInfo={carInfo}
                                        />
                                    ) : item.fieldType === 'dropdown' ? (
                                        <DropdownField
                                            item={item}
                                            handleInputChange={(name, value) => handleInputChange(item.name, value)}
                                            carInfo={carInfo}
                                        />
                                    ) : item.fieldType === 'textarea' ? (
                                        <TextArea
                                            item={item}
                                            handleInputChange={(name, value) => handleInputChange(item.name, value)}
                                            carInfo={carInfo}
                                        />
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="font-medium text-xl my-6">Features</h2>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-1'>
                            {features.features.map((item, index) => (
                                <div key={index} className='flex gap-1 items-center'>
                                    <Checkbox
                                        onChange={(e) => handleFeatureChange(item.name, e.target.checked)}
                                        checked={!!featuresData?.[item.name]} // Ensure boolean
                                    />
                                    <h2>{item.label}</h2>
                                </div>
                            ))}
                        </div>
                    </div>

                    <UploadImages triggerUploadImages={triggerUploadImages} mode={mode} carInfo={carInfo} />

                    <div className='mt-10 flex justify-end'>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddListing;
