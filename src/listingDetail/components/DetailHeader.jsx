import React from 'react';
import { HiCalendarDays } from 'react-icons/hi2'; // Ensure the correct import for the calendar icon
import { BsSpeedometer2 } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import { RiGasStationFill } from "react-icons/ri";




function DetailHeader({ carDetail }) {
  return (
    <div>
        <div>
            {/* Title Section */}
            <h2 className="font-bold text-3xl">{carDetail?.listingTitle}</h2>
            <p className="text-sm">{carDetail?.tagline}</p>

            {/* Year Section */}
            <div className='flex gap-2 mt-2'>
                <div className="flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3">
                    <HiCalendarDays className="h-7 w-7 bg-blue-50 rounded-full text-primary" />
                    <h2 className="text-primary text-sm">{carDetail?.year}</h2>
                </div>
                <div className="flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3">
                    <BsSpeedometer2 className="h-7 w-7 bg-blue-50 rounded-full text-primary" />
                    <h2 className="text-primary text-sm">{carDetail?.mileage}</h2>
                </div>
                <div className="flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3">
                    <GiGearStickPattern className="h-7 w-7 bg-blue-50 rounded-full text-primary" />
                    <h2 className="text-primary text-sm">{carDetail?.transmission}</h2>
                </div>
                <div className="flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3">
                    <RiGasStationFill className="h-7 w-7 bg-blue-50 rounded-full text-primary" />
                    <h2 className="text-primary text-sm">{carDetail?.fuelType}</h2>
                </div>
            </div>
       </div>
       

      {/* Additional Details */}
      
    </div>
  );
}

export default DetailHeader;
