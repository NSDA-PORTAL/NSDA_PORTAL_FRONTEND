import React from 'react';

const AboutUsSection = () => {
  return (
    // Add padding-top (pt-24) to clear the fixed Navbar (h-16)
    <section id="about" className="container mx-auto px-4 py-12 md:py-20 pt-24 min-h-screen">
      
      {/* Page Title */}
      <h1 className="text-5xl font-extrabold text-blue-900 text-center mb-4">
        Our Mission at NSDA
      </h1>
      
      {/* Subtitle */}
      <p className="text-xl text-gray-600 text-center mb-12">
        Empowering a generation through practical, skill-based education.
      </p>
      
      {/* Content Placeholder */}
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Who We Are</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          NSDA Portal is dedicated to bridging the skills gap by offering high-quality, mentor-led learning tracks in cutting-edge technology. We believe in building not just coders, but community leaders.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Our methodology focuses on hands-on tasks, real-world projects, and continuous feedback to ensure our students are job-ready from day one.
        </p>
      </div>
      
    </section>
  );
};

export default AboutUsSection;