import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';

// Import Layout Components (Adjust paths if needed)
import Sidebar from './dashboard/Sidebar'; 
import DashboardHeader from './dashboard/DashboardHeader';

// Import Content Pages
import ProfilePage from './dashboard/ProfilePage';
import ProgressPage from './dashboard/ProgressPage';
import TasksPage from './dashboard/TasksPage';

const StudentDashboardPage = () => {
    const { user } = useAuth();
    
    return (
        <div className="flex bg-gray-100 min-h-screen">

            {/* Sidebar — visible on md+ screens, hidden on mobile */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Mobile Sidebar — appears above content when screen is small */}
            <div className="block md:hidden">
                <Sidebar isMobile={true} />
            </div>
            
            {/* Main Content Area */}
            <div className="flex flex-col flex-1 w-full md:ml-64">

                {/* Top Header */}
                <DashboardHeader />

                {/* Main Content Body */}
                <main className="p-4 sm:p-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        Student Dashboard
                    </h1>

                    <p className="text-gray-600 mb-8 text-sm sm:text-base">
                        Welcome back, {user?.name || 'Student'}. Here's a summary of your current progress.
                    </p>
                    
                    {/* Routing */}
                    <Routes>
                        <Route index element={<TasksPage />} /> 
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="progress" element={<ProgressPage />} />
                        <Route path="tasks" element={<TasksPage />} />
                        <Route path="*" element={<h1 className="p-8 text-red-500">404 Dashboard Page Not Found</h1>} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default StudentDashboardPage;
