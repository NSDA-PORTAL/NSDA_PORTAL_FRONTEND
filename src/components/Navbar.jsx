import React from 'react';

import { Link } from 'react-router-dom'; // Keep this import for Login/Signup



const Navbar = () => {

  return (

    <header className="fixed top-0 left-0 w-full z-50 bg-blue-900 shadow-md">

      <nav className="container mx-auto flex justify-between items-center h-16">



        {/* 1. Logo/Site Name (Left Side) - Use <a> for scrolling to top */}

        <div className="flex items-center">

          {/* Change Link to <a> with href="#" */}

          <a href="#" className="flex items-center">

            <img src="/NSDA-logo.jpg" alt="NSDA Logo" className="h-10 w-auto" />

            <span className="ml-2 text-2xl font-bold text-white hidden sm:block">NSDA PORTAL</span>

          </a>

        </div>



        {/* 2. Navigation Links & Buttons (Right Side) */}

        <div className="flex items-center space-x-4 ">



          {/* Main Navigation Links */}

          <div className="hidden md:flex items-center space-x-6">

            {/* 💡 FIX: CONVERT TO <a> TAGS WITH #ANCHORS FOR SCROLLING */}

           <a href="/#" className="text-white hover:text-yellow transition">Home</a>

            <a href="/#features" className="text-white hover:text-yellow transition">Features</a>

            <a href="/#about" className="text-white hover:text-yellow transition">About Us</a>

            <a href="/#contact" className="text-white hover:text-yellow transition">Contact</a>


          </div>



          {/* Action Buttons: Login and Sign Up */}

          {/* 💡 FIX: CONVERT BUTTONS TO <Link> TAGS FOR PAGE ROUTING */}

          <Link

            to="/login"

            className="text-white border border-white hover:bg-white/10 px-4 py-1.5 rounded-lg transition text-sm font-medium"

          >

            Login

          </Link>
          
          


          {/* Mobile Menu Icon Placeholder */}

          <button className="md:hidden text-white hover:text-yellow-400">

            <span className="text-2xl">☰</span>

          </button>

        </div>

      </nav>

    </header>

  );

};



export default Navbar;