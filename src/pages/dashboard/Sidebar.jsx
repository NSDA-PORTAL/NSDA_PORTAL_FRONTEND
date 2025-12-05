// frontend/src/pages/dashboard/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

// Simple SVG Icons
const IconUser = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>);
const IconChart = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 3a1 1 0 011-1h2a1 1 0 011 1v13a1 1 0 01-1 1h-2a1 1 0 01-1-1V3z" /></svg>);
const IconTasks = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>);

const SidebarLink = ({ to, icon: Icon, label }) => {
  const dashboardBasePath = "/dashboard";
  return (
    <NavLink 
      to={`${dashboardBasePath}${to}`}
      className={({ isActive }) => 
        `flex items-center p-3 text-white rounded-lg transition-colors duration-200
         text-sm sm:text-base
         ${isActive ? 'bg-blue-600 shadow-inner' : 'hover:bg-blue-700'}`
      }
    >
      <div className="mr-3 w-5 h-5 flex items-center justify-center">
        <Icon />
      </div>
      <span className="font-medium">{label}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    // Responsive Sidebar
    <div className="
        fixed top-0 left-0 
        h-full 
        w-full sm:w-72 md:w-64 
        bg-blue-900 
        flex flex-col justify-between
        z-40
     "
    >
      
      {/* Top Section */}
      <div className="p-4">
        <div className="flex items-center mb-10 pt-2">
          <span className="text-3xl sm:text-4xl text-white mr-2">📚</span>
          <h1 className="text-lg sm:text-xl font-bold text-white">
            NSDA SkillHub
          </h1>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-3">
          <SidebarLink to="/profile" icon={IconUser} label="Student Profile" />
          <SidebarLink to="/progress" icon={IconChart} label="Progress" />
          <SidebarLink to="/tasks" icon={IconTasks} label="Tasks" />
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-blue-700/50">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
