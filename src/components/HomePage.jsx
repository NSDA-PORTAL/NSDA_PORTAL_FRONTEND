import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import LearningTracksSection from '../components/LearningTracksSection';
import AboutUsSection from './AboutUsSection'; 
import ContactSection from './ContactSection'; 

const HomePage = () => {
    return (
        <>
      <HeroSection />
      <FeaturesSection />
      <LearningTracksSection />
      <AboutUsSection />
      <ContactSection />
    </>
    )
}

export default HomePage;