import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import LearningTracksSection from '../components/LearningTracksSection';
import AboutUsSection from '../components/AboutUsSection'; 
import ContactSection from '../components/ContactSection'; 
import AnnouncementsList from '../components/AnnouncementsList';

const HomePage = () => {
    return (
        <>
      <HeroSection />
      <div className="max-w-4xl mx-auto mt-6 px-4">
        <AnnouncementsList limit={3} />
      </div>
      <FeaturesSection />
      <LearningTracksSection />
      <AboutUsSection />
      <ContactSection />
    </>
    )
}

export default HomePage;