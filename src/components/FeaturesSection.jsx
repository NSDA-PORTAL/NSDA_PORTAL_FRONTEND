import React from 'react';

// Reusable component for a single card (same as before)
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
    <div className="text-4xl text-blue-900 mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FeaturesSection = () => {
    const features = [
    {
      icon: "⚙️", // Placeholder for Portal Tools/Settings
      title: "Comprehensive Dashboard",
      description: "Track your progress, monitor lecture history, and manage your certificates all in one place."
    },
    {
      icon: "📣", // Placeholder for Announcements/Updates
      title: "Real-Time Updates",
      description: "Receive instant announcements on deadlines, new courses, and community events."
    },
    {
      icon: "📁", // Placeholder for Task/Assignment Management
      title: "Task Submission & Review",
      description: "Easily upload assignments and receive timely, constructive feedback from mentors."
    }
  ];

  return (
    <section id="features" className="container mx-auto px-4 py-12 md:py-20">
      {/* Updated Section Title */}
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Portal Features</h2>
      
      {/* Grid for Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard 
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;