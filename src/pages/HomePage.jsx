import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import LearningTracksSection from '../components/LearningTracksSection';
import AboutUsSection from '../components/AboutUsSection'; 
import ContactSection from '../components/ContactSection'; 

const HomePage = () => {
    return (
        <>
      <HeroSection />
      {/* Announcements removed from public homepage per request */}
      <FeaturesSection />
      <LearningTracksSection />
      <AboutUsSection />
      <ContactSection />
    </>
    )
}

export default HomePage;