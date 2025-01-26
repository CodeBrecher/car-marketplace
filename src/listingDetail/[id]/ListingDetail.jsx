import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { db } from './../../../configs'; 
import { CarListing, CarImages } from './../../../configs/schema'; 
import { eq } from 'drizzle-orm';
import Service from './../../Data/Service';

const { FormatResult } = Service;
import { Header } from '@/components/ui/header';
import DetailHeader from '../components/DetailHeader';
import ImageGallery from '../components/ImageGallery';
import Description from '../components/Description';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import CarSpecifications from '../components/CarSpecifications';
import OwnersDetail from '../components/ownerDetail';
import Footer from '@/components/footer';
import FinancialCalculator from '../components/FinancialCalculator';
import MostSearchedCar from '@/components/ui/MostSearchedCar';

function ListingDetail() {
  const { id } = useParams();
  const location = useLocation(); // Get location object
  const [carDetail, setCarDetail] = useState(null); 

  // Force scroll to top on page load or id change
  useLayoutEffect(() => {
    if (location.state?.scrollToTop) {
      window.scrollTo(0, 0); // Scroll to top if coming from Most Searched Cars
    }
  }, [id, location.state]); // This effect runs every time the id or location state changes

  // Fetch car details when the id changes
  useEffect(() => {
    const GetCarDetail = async () => {
      try {
        const result = await db
          .select()
          .from(CarListing)
          .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
          .where(eq(CarListing.id, id));

        const res = FormatResult(result);
        if (res.length > 0) {
          setCarDetail(res[0]); 
        } else {
          console.error('No data found');
        }
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    GetCarDetail(); // Fetch data on id change
  }, [id]); // This runs every time the id changes

  return (
    <div>
      <Header />
      <br></br><br></br><br></br><br></br>
      <div className='p-10 md:px-20'>
        {carDetail ? (
          <>
            <DetailHeader carDetail={carDetail} />
            <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5'>
              <div className='md:col-span-2'>
                <ImageGallery carDetail={carDetail} />
                <Description carDetail={carDetail} />
                <Features features={carDetail?.features || []} />
                <FinancialCalculator carDetail={carDetail} />
              </div>
              <div>
                <Pricing carDetail={carDetail} /> 
                <CarSpecifications carDetail={carDetail} />
                <OwnersDetail carDetail={carDetail} />
              </div>
            </div>
          </>
        ) : (
          <div>Loading...</div> 
        )}
      </div>
      <MostSearchedCar />
      <Footer />
    </div>
  );
}

export default ListingDetail;
