import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// --- Placeholder for AdminSidebar (You must define this component) ---
const AdminSidebar = () => {
    return (
        <nav
            className="
                fixed top-0 left-0
                w-full sm:w-72 md:w-64
                h-full 
                bg-blue-900 text-white 
                p-4 shadow-xl 
                z-40
            "
        >
            <h2 className="text-2xl sm:text-3xl font-bold text-red-400 mb-8">
                Admin Console
            </h2>

            <div className="space-y-3 text-sm sm:text-base">
                <a href="/admin/overview" className="block p-2 rounded hover:bg-gray-700 transition">Overview</a>
                <a href="/admin/students" className="block p-2 rounded hover:bg-gray-700 transition">Student Management</a>
                <a href="/admin/tasks" className="block p-2 rounded hover:bg-gray-700 transition">Tasks & Resources</a>
                <a href="/admin/announcements" className="block p-2 rounded hover:bg-gray-700 transition">Announcements</a>
                <a href="/admin/attendance" className="block p-2 rounded hover:bg-gray-700 transition">Attendance</a>
            </div>
        </nav>
    );
};
// -------------------------------------------------------------------

// Import Admin Pages (Placeholders)
import AdminOverviewPage from './admin/AdminOverviewPage'; 
import StudentManagementPage from './admin/StudentManagementPage'; 
import AdminTasksResourcesPage from './admin/AdminTasksResourcesPage';
import AdminAnnouncementsPage from './admin/AdminAnnouncementsPage';
import AttendancePage from './admin/AttendancePage';

const AdminDashboardPage = () => {
    return (
        <div className="flex bg-gray-100 min-h-screen">

            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div 
                className="
                    flex flex-col flex-1 w-full
                    mt-64 sm:mt-0   /* Push content down on mobile so it doesn't hide under sidebar */
                    sm:ml-72 md:ml-64
                "
            >
                <main className="p-6 sm:p-10">
                    <Routes>
                        <Route index element={<Navigate to="overview" replace />} />
                        <Route path="overview" element={<AdminOverviewPage />} />

                        <Route path="students" element={<StudentManagementPage />} />
                        <Route path="tasks" element={<AdminTasksResourcesPage />} />
                        <Route path="announcements" element={<AdminAnnouncementsPage />} />
                        
                        <Route path="progress" element={<AdminOverviewPage />} /> 
                        <Route path="attendance" element={<AttendancePage />} />

                        <Route path="*" element={<h1 className="p-8 text-red-500">404 Admin Page Not Found</h1>} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
