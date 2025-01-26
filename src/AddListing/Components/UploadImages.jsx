import React, { useState, useEffect } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { supabase } from './../../../configs/supabaseClient';
import { SUPABASE_URL, SUPABASE_STORAGE_BUCKET } from './../../../configs/supabaseClient';
import { db } from './../../../configs';
import { CarImages } from './../../../configs/schema';
import { eq } from 'drizzle-orm';

function UploadImages({ triggerUploadImages, carInfo, mode }) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [list, setList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadErrors, setUploadErrors] = useState([]);

    useEffect(() => {
        if (mode === 'edit' && carInfo?.images) {
            const existingImages = carInfo.images.map((image) => image?.imageUrl);
            setList(existingImages);
        }
    }, [mode, carInfo]);

    useEffect(() => {
        if (triggerUploadImages) uploadImages();
    }, [triggerUploadImages]);

    const onFieldSelected = (event) => {
        const files = event.target.files;
        setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
    };

    const onImageRemove = async (imageUrl) => {
        try {
            const fileName = imageUrl.split('/').pop();

            const { error: storageError } = await supabase
                .storage
                .from(SUPABASE_STORAGE_BUCKET)
                .remove([fileName]);  // Corrected template string

            if (storageError) {
                console.error('Error deleting image from storage:', storageError.message);
                return;
            }

            const deleteResponse = await db.delete(CarImages).where({
                imageUrl: imageUrl
            });

            if (deleteResponse.error) {
                console.error('Error deleting image from the database:', deleteResponse.error.message);
            } else {
                setList((prev) => prev.filter((img) => img !== imageUrl));
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const onImageRemoveFromDB = async (image, index) => {
        try {
            const imageId = carInfo?.images[index]?.id;

            if (!imageId) {
                console.error('Invalid image ID');
                return;
            }

            console.log('Deleting image ID:', imageId);

            const deleteResponse = await db.delete(CarImages)
                .where(eq(CarImages.id, imageId))
                .returning({ id: CarImages.id });

            if (deleteResponse.length === 0) {
                console.error('Error deleting image from the database: No rows returned');
                return;
            }

            setList((prev) => prev.filter((img) => img !== image));
        } catch (error) {
            console.error('Error removing image from DB:', error);
        }
    };

    const uploadImages = async () => {
        if (!triggerUploadImages || selectedFiles.length === 0) {
            console.error("No images selected or triggerUploadImages is false.");
            return;
        }
    
        setUploading(true);
        setUploadSuccess(false);
        const uploadedFiles = [];
        const errors = [];
    
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const fileName = `car-image-${Date.now()}-${i}.jpg`;  // Corrected template string
    
            const { error: uploadError } = await supabase
                .storage
                .from(SUPABASE_STORAGE_BUCKET)
                .upload(fileName, file);
    
            if (uploadError) {
                console.error("Upload error:", uploadError.message);
                errors.push(uploadError.message);
            } else {
                const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_STORAGE_BUCKET}/${fileName}`;
                uploadedFiles.push({ fileName, url: imageUrl });
            }
        }
    
        setUploading(false);
        setUploadErrors(errors);
    
        if (uploadedFiles.length > 0) {
            try {
                console.log('Attempting to insert images into the database...');
    
                const insertResponse = await db.insert(CarImages).values(
                    uploadedFiles.map(file => ({
                        imageUrl: file.url,
                        carListingId: carInfo?.id || triggerUploadImages,
                    }))
                );
    
                if (insertResponse?.error) {
                    console.error('Error inserting into the database:', insertResponse.error.message);
                } else {
                    setList((prev) => [...prev, ...uploadedFiles.map(file => file.url)]);
                    setSelectedFiles([]); // Clear after successful upload
                }
            } catch (error) {
                console.error("Error linking images to database:", error);
            }
        }
    
        if (errors.length > 0) alert("Some images failed to upload.");
        else setUploadSuccess(true);
    };

    useEffect(() => {
        console.log('Uploaded Images:', list);
    }, [list]);

    return (
        <div className="p-5">
            <h2 className="font-medium text-xl my-3">Upload Car Images</h2>

            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                {list.map((image, index) => (
                    <div key={index} className="relative group">
                        <IoMdCloseCircle 
                            className="absolute top-2 right-2 text-2xl text-red-500 cursor-pointer opacity-75 group-hover:opacity-100 transition"
                            onClick={() => onImageRemoveFromDB(image, index)}
                        />
                        <img src={image} className="w-full h-[150px] object-cover rounded-xl shadow-md" alt={`car-${index}`} />
                    </div>
                ))}

                {selectedFiles.map((image, index) => (
                    <div key={index} className="relative group">
                        <IoMdCloseCircle 
                            className="absolute top-2 right-2 text-2xl text-red-500 cursor-pointer opacity-75 group-hover:opacity-100 transition"
                            onClick={() => setSelectedFiles(prev => prev.filter((_, idx) => idx !== index))}
                        />
                        <img src={URL.createObjectURL(image)} className="w-full h-[150px] object-cover rounded-xl shadow-md" alt={`uploaded-${index}`} />
                    </div>
                ))}

                <label htmlFor="upload-images">
                    <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-10 cursor-pointer hover:shadow-md flex items-center justify-center">
                        <h2 className="text-3xl text-center text-primary">+</h2>
                    </div>
                </label>
            </div>

            <input
                onChange={onFieldSelected}
                type="file"
                multiple
                id="upload-images"
                className="hidden"
            />

            {uploading && <p className="mt-2 text-blue-500">Uploading images...</p>}
            {uploadSuccess && <p className="mt-2 text-green-500">All images uploaded successfully!</p>}
            {uploadErrors.length > 0 && <p className="mt-2 text-red-500">Error uploading some images. Check the console for details.</p>}
        </div>
    );
}

export default UploadImages;
