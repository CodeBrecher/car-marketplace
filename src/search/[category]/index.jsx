import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams for dynamic segments
import { Header } from './../../components/ui/header';
import { db } from './../../../configs';
import { CarListing, CarImages } from './../../../configs/schema';
import { eq } from 'drizzle-orm';
import CarItem from './../../components/ui/CarItem';
import Service from './../../Data/Service';

const { FormatResult } = Service;
function SearchByCategory() {
  const { category } = useParams(); // Get dynamic 'category' from the URL path
  const [carList, setCarList] = useState([]); // State to hold the list of cars
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state

  // Log the value of category to debug if it's valid
  useEffect(() => {
    console.log('Category from URL:', category); // Log the category from URL
    if (category) {
      GetCarList(); // Fetch car list whenever category changes
    }
  }, [category]); // Dependency on category

  // Get car list from the database
  const GetCarList = async () => {
    if (!category) {
      console.log('No category provided, skipping fetch');
      setIsLoading(false);
      return;
    }
  
    setIsLoading(true);
    console.log('Fetching car list with condition:', category); // Log condition
    try {
      const result = await db
        .select()
        .from(CarListing)
        .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(eq(CarListing.category, category)); // Use category in your query
  
      console.log('Query result:', result); // Log the result from the query
      const resp = FormatResult(result);
      console.log('Formatted Results:', resp); // Log formatted results
      setCarList(resp); // Save the fetched results to the state
    } catch (error) {
      console.error('Error fetching car listings:', error); // Log errors
    } finally {
      setIsLoading(false); // Set loading state to false after fetching data
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <br></br><br></br><br></br><br></br>
      <div className="p-10 md:px-20">
        {/* Left align the category heading */}
        <h2 className="font-bold text-4xl mb-5 text-left">{category.toUpperCase()} Cars</h2>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        ) : carList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {carList.map((item) => (
              <CarItem key={item.id} car={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-500">No cars found in this category.</p>
        )}
      </div>
    </div>
  );
}

export default SearchByCategory;
