import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import * as FaIcons from "react-icons/fa";

const Home = () => {
  const footerRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='home flex flex-col w-screen h-screen text-white bg-inu_orange bg-cover font-anton text-3xl'>
      <Navbar />
      <div className='flex flex-col justify-center items-center px-4'>
        <div className='text-center text-4xl sm:text-6xl mt-8 sm:mt-16'>
          <h1 className="drop-shadow">Create & Customize Your Ideal Classroom</h1>
        </div>
        <div className='buttons flex my-8 sm:mb-32'>
          <button
            onClick={scrollToFooter}
            className='flex items-center border-2 rounded-3xl border-solid border-white py-1 px-4 sm:py-2 sm:px-8 bg-inu_darkorange text-2xl sm:text-4xl mr-1 sm:mr-4 hover:bg-[#FF905D] ease-in-out duration-300'
          >
            <FaIcons.FaPaw className='mr-2'/>Get Started for Free
          </button>
          <button
            className='border-2 rounded-3xl border-solid border-white py-1 px-4 text-2xl sm:text-4xl hover:bg-inu_darkorange ease-in-out duration-300'
          >
            Learn More
          </button>
        </div>
      </div>
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
