import React from 'react';

const Footer = () => {
  return (
    // Use the same dark blue color as the Navbar and Hero Section
    <footer className="bg-blue-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Links (Optional, but good practice) */}
        <div className="flex justify-center space-x-6 mb-4 border-b border-white/20 pb-4">
          <a href="#" className="text-sm hover:text-yellow-400 transition">Privacy Policy</a>
          <a href="#" className="text-sm hover:text-yellow-400 transition">Terms of Service</a>
          <a href="#" className="text-sm hover:text-yellow-400 transition">Contact Us</a>
        </div>
        
        {/* Bottom Section: Copyright and Branding */}
        <div className="text-center">
          {/* Logo and Name from Navbar */}
          <div className="flex justify-center items-center mb-2">
            {/* The logo image isn't typically used in a footer, but we'll use the text name */}
            <span className="text-lg font-bold">NSDA Portal</span>
          </div>
          
          {/* Copyright Information */}
          <p className="text-sm text-white/75">
            © {new Date().getFullYear()} NSDA portal. All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;