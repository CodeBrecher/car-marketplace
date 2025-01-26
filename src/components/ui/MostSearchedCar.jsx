import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CarItem from './CarItem';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { db } from './../../../configs';
import { CarImages, CarListing } from './../../../configs/schema'; 
import { desc, eq } from 'drizzle-orm';
import Service from './../../Data/service.jsx';

const { FormatResult } = Service;

function MostSearchedCar() {
  const [carList, setCarList] = useState([]);
  const { id } = useParams(); // The car ID from the URL
  const navigate = useNavigate();

  // Fetch the list of cars
  const fetchCarList = async () => {
    try {
      const result = await db.select().from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .orderBy(desc(CarListing.id))
        .limit(10);

      const resp = FormatResult(result);
      setCarList(resp);
    } catch (error) {
      console.error("Error fetching car list:", error);
    }
  };

  // Fetch car list when component mounts
  useEffect(() => {
    fetchCarList();
  }, []);

  // Function to handle car item click (navigate to details page)
  const handleCarClick = (carId) => {
    // Navigate to the details page with scrollToTop state
    navigate(`/listing-details/${carId}`, { state: { scrollToTop: true } });
  };

  return (
    <div className="mx-24">
      <h2 className="font-bold text-3xl text-center my-16">Most Searched Car</h2>

      <Carousel>
        <CarouselPrevious>◀</CarouselPrevious>
        <CarouselContent>
          {carList.length > 0 ? (
            carList.map((car) => (
              <CarouselItem
                key={car.id}
                className="basis-1/4"
                onClick={() => handleCarClick(car.id)}
              >
                <CarItem car={car} />
              </CarouselItem>
            ))
          ) : (
            <p className="text-center text-gray-500">No cars found.</p>
          )}
        </CarouselContent>
        <CarouselNext>▶</CarouselNext>
      </Carousel>
    </div>
  );
}

export default MostSearchedCar;
