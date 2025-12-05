import React from 'react';

const TrackCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
    <div className="text-4xl text-blue-900 mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);


const LearningTracksSection = () => {
  // Define the actual learning tracks
  const tracks = [
    {
      icon: "🌱", // Beginner Track
      title: "Beginner Track",
      description: "Start your journey with programming fundamentals and core computer science concepts."
    },
    {
      icon: "🌐", // Node/Backend Track
      title: "Node.js/Backend Track",
      description: "Master server-side development, APIs, and database management using Node.js."
    },
    {
      icon: "📱", // Flutter Track
      title: "Flutter Mobile Development",
      description: "Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase."
    },
    {
      icon: "⚛️", // React Track
      title: "React Frontend Development",
      description: "Learn to build modern, fast, and scalable user interfaces using the React library."
    }
  ];

  return (
    <section id="tracks" className="container mx-auto px-4 py-12 md:py-20 bg-gray-50">
      {/* Section Title */}
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">NSDA Learning Tracks</h2>
      
      {/* Grid for Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {tracks.map((track, index) => (
          <TrackCard 
            key={index}
            icon={track.icon}
            title={track.title}
            description={track.description}
          />
        ))}
      </div>
    </section>
  );
};

export default LearningTracksSection;