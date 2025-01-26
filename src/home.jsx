import React from 'react';
import { Header } from './components/ui/header';
import { Hero } from './components/ui/hero';
import { Category } from './components/ui/Category';
import MostSearchedCar from './components/ui/MostSearchedCar';
import InfoSectio from './components/ui/InfoSectio';
import Footer from './components/footer';
function Home() {
  return (
    <div className="relative p-0 m-0">
      <Header />
      {/* Add padding to offset the fixed header height */}
      <div > {/* Adjust 80px to match the header height */}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
        <Hero />
        <Category />
        <MostSearchedCar/>
        <InfoSectio/>
        <Footer/>

        
      </div>
    </div>
  );
}

export default Home;
