import React from 'react';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { Button } from '@/components/ui/button'; // Keep only one import

function Pricing({ carDetail }) {
  return (
    <div className='p-10 rounded-xl border shadow-md'>
      <h2>Our Price</h2>
      <h2 className='font-bold text-4xl'>${carDetail.sellingPrice}</h2>
      <Button className='w-full mt-7'>
        <MdOutlineLocalOffer className='text-lg mr-2' />
        Make AN Offer Price
      </Button>
    </div>
  );
}

export default Pricing;
