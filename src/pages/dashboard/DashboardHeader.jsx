import React from 'react';

const DashboardHeader = () => {
  return (
    // This header spans the width of the main content area (right side)
    <header className="flex justify-end items-center bg-white p-4 shadow-sm h-16 sticky top-0 z-10">
      {/* The main logo/title is in the Sidebar, so this is minimal. */}
      
      {/* User Avatar Placeholder (as seen in image_972fcd.png) */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
          <span className="text-xl">👤</span>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;