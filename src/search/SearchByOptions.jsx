import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // For handling query parameters
import { db } from './../../configs'; // Database configuration
import { CarListing, CarImages } from './../../configs/schema'; // Database schema
import { eq, and, lte } from 'drizzle-orm'; // ORM for query building, including the 'lte' (less than or equal to) operator
import { Header } from '@/components/ui/header'; // Header component
import { Search } from '@/components/ui/Search'; // Search component
import CarItem from '@/components/ui/CarItem'; // CarItem component for rendering car details
import Service from './../Data/Service';

const { FormatResult } = Service;

function SearchByOptions() {
  const [searchParam] = useSearchParams(); // To get query parameters from URL
  const [carList, setCarList] = useState([]); // State to hold the list of cars
  const [isLoading, setIsLoading] = useState(true); // Loading state to show skeleton while fetching data

  // Extracting query parameters
  const condition = searchParam.get('cars');
  const make = searchParam.get('make');
  const price = searchParam.get('price'); // Get the price parameter

  // Debugging query parameters
  useEffect(() => {
    console.log('abcd');
    GetCarList();  // Fetch the car list whenever query parameters change
  }, [searchParam]);

  const GetCarList = async () => {
    setIsLoading(true); // Start loading
  
    // Start building the base query
    const query = db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId));
  
    const conditions = [];
  
    if (condition) {
      console.log(`Condition: ${condition}`);
      conditions.push(eq(CarListing.condition, condition)); // Ensure this matches exactly what's in DB
    }
  
    if (make) {
      console.log(`Make: ${make}`);
      conditions.push(eq(CarListing.make, make)); // Ensure this matches exactly what's in DB
    }

    if (price) {
      console.log(`Price: ${price}`);
      const priceNumber = parseFloat(price);
      if (!isNaN(priceNumber)) {
        // Use the 'lte' operator to filter cars where the price is less than or equal to the provided value
        conditions.push(lte(CarListing.selling_price, priceNumber));  // Updated column name to 'selling_price'
        console.log(`Filtering cars with price <= ${priceNumber}`);
      } else {
        console.log('Invalid price parameter');
      }
    }
  
    if (conditions.length > 0) {
      // Combine conditions and apply to the query
      query.where(and(...conditions));
      console.log('Query built with conditions:', conditions);
    } else {
      console.log('No conditions applied; fetching all cars.');
    }
  
    try {
      // Execute the query
      const res = await query;
      console.log('Database Response:', res);
  
      const resp = FormatResult(res);
      setCarList(resp);
      console.log('Formatted Car List:', resp);
    } catch (error) {
      console.error('Error fetching car list:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  
  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <div className="p-16 bg-black flex justify-center">
        <Search />
      </div>
      <div className="p-10 md:px-20">
        <h2 className="font-bold text-4xl mb-5">Search Results</h2>

        {/* List of CarList */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeletons
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[320px] rounded-xl bg-slate-200 animate-pulse"
              ></div>
            ))
          ) : carList?.length > 0 ? (
            // Render the list of cars if available
            carList.map((item, index) => (
              <div key={index}>
                <CarItem car={item} />
              </div>
            ))
          ) : (
            // If no cars found
            <p className="text-gray-500 text-center mt-10">
              No cars found in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchByOptions;
