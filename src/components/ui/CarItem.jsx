import React, { useState } from 'react';
import { LuFuel } from "react-icons/lu";
import { TbBrandSpeedtest } from "react-icons/tb";
import { GiGearStickPattern } from "react-icons/gi";
import { MdOpenInNew } from "react-icons/md";
import { Separator } from './../ui/separator';
import { Link } from 'react-router-dom';

function CarItem({ car }) {
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true); // Handle image error
  };

  const imageUrl = car?.images?.[0]?.imageUrl || "https://via.placeholder.com/400"; // Fallback image URL

  return (
    <Link 
      to={'/listing-details/' + car?.id} 
      className="no-underline text-black"
    >
      <div className="rounded-xl bg-white border hover:shadow-md cursor-auto overflow-hidden">
        <div className="w-full h-[150px]">
          <img
            src={imgError ? "https://via.placeholder.com/400" : imageUrl} // Use placeholder on error
            className="w-full h-full object-cover"
            alt="Car Image"
            onError={handleImageError}
          />
        </div>
        <div className="p-4">
          <h2 className="font-bold text-black text-lg mb-2">{car?.listingTitle || "No Title"}</h2>
          <Separator className="border-t border-gray-200 my-2" />
          <div className="grid grid-cols-3 mt-5">
            <div className="flex flex-col items-center">
              <LuFuel className="text-lg mb-2" />
              <h2>{car?.fuelType || "N/A"}</h2>
            </div>
            <div className="flex flex-col items-center">
              <TbBrandSpeedtest className="text-lg mb-2" />
              <h2>{car?.range || "N/A"} Miles</h2>
            </div>
            <div className="flex flex-col items-center">
              <GiGearStickPattern className="text-lg mb-2" />
              <h2>{car?.transmission || "N/A"}</h2>
            </div>
          </div>

          <Separator className="border-t border-gray-200 my-2" />
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">${car?.sellingPrice || "N/A"}</h2>
            <h2 className="text-primary text-sm flex gap-2 items-center cursor-pointer">
              View Details
              <MdOpenInNew />
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CarItem;
