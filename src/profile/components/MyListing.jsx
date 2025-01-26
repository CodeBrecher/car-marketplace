import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from "./../../../configs";
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { CarImages, CarListing } from './../../../configs/schema';
import { desc, eq } from 'drizzle-orm';
import Service from './../../Data/Service';

const { FormatResult } = Service;import { FaTrashAlt } from "react-icons/fa";
import CarItem from '@/components/ui/CarItem';
import { toast } from 'react-toastify';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog";

function MyListing() {
    const { user } = useUser();
    const [carList, setCarList] = useState([]);
    const [selectedCarId, setSelectedCarId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false); // Track deletion status

    const GetUserCarListing = async () => {
        if (user) {
            const result = await db.select()
                .from(CarListing)
                .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
                .where(eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(CarListing.id));

            const resp = FormatResult(result);
            setCarList(resp);
        }
    };

    const handleDelete = async () => {
        if (!selectedCarId) return;

        setIsDeleting(true); // Set loading state to true before deletion

        try {
            // First, delete related car images
            await db.delete(CarImages).where(eq(CarImages.carListingId, selectedCarId));

            // Then, delete the car listing
            await db.delete(CarListing).where(eq(CarListing.id, selectedCarId));

            toast.success("Listing and related images deleted successfully!");
            GetUserCarListing(); // Refresh the listings after deletion
        } catch (error) {
            console.error("Error deleting listing:", error);
            toast.error("Error deleting listing! Please try again.");
        } finally {
            setIsDeleting(false); // Reset loading state after the operation
            setSelectedCarId(null); // Reset the selected car ID
        }
    };

    useEffect(() => {
        user && GetUserCarListing();
    }, [user]);

    return (
        <div className='mt-6'>
            <div className='px-0 my-10'>
                <div className='flex justify-start items-center'>
                    <h2 className='font-bold text-4xl text-left'>My Listing</h2>
                    <Link to="/add-listing" className="ml-auto">
                        <Button>+ Add New Listing</Button>
                    </Link>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5'>
                    {carList.map((item, index) => (
                        <div key={index}>
                            <CarItem car={item} />
                            <div className='p-2 bg-gray-50 rounded-lg flex justify-between'>
                                <Link to={`/add-listing?mode=edit&id=${item?.id}`} className="w-4/5">
                                    <Button variant="outline" className='w-full'>Edit</Button>
                                </Link>

                                {/* Alert Dialog for Delete Confirmation */}
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button 
                                            variant="destructive" 
                                            className='w-1/5 flex justify-center' 
                                            onClick={() => setSelectedCarId(item.id)}
                                        >
                                            {isDeleting ? (
                                                <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin"></div> // Loader
                                            ) : (
                                                <FaTrashAlt />
                                            )}
                                        </Button>
                                    </AlertDialogTrigger>

                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Listing</AlertDialogTitle>
                                        </AlertDialogHeader>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete this listing? This action cannot be undone.
                                        </AlertDialogDescription>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                                                {isDeleting ? "Deleting..." : "Delete"}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyListing;
