import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    // Set a minimum height, use the dark blue background, and center the content
    <div 
  className="relative min-h-screen pt-20 flex items-center justify-center text-center p-4 bg-cover bg-center"
  style={{ backgroundImage: "url('/hero.jpg')" }}
>
      {/* Dark overlay for text readability (optional, but good practice) */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
      
      {/* Content Container (z-10 brings it above the overlay) */}
      <div className="relative z-10 max-w-2xl text-white">
        
        {/* Main Heading from design */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
          Seek Knowledge. Empower Your Ummah.
        </h1>
        
        {/* Subtitle/Description */}
        <p className="text-xl font-light mb-8">
          Your gateway to professional skills and continuous learning.
        </p>
        
        {/* CTA Button (Matching the prominent Yellow accent) */}
        
        <Link
         to="signup" className="bg-yellow-400 hover:bg-yellow-500 text-nsda-blue text-lg font-bold px-8 py-3 rounded-xl shadow-lg transition duration-300 transform hover:scale-105">
        Sign up
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;