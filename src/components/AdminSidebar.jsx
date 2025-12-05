import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    IconUsersGroup, IconListCheck, IconClipboardList, 
    IconLayoutDashboard, IconBellRinging, IconLogout 
} from '@tabler/icons-react';

const AdminSidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/admin/overview', icon: IconLayoutDashboard }, 
        { name: 'Student Management', path: '/admin/students', icon: IconUsersGroup },
        { name: 'Task & Resources', path: '/admin/tasks', icon: IconListCheck },
        { name: 'Announcements', path: '/admin/announcements', icon: IconBellRinging },
        { name: 'Progress & Attendance', path: '/admin/progress', icon: IconClipboardList },
    ];

    return (
        <div
            className="
                w-full sm:w-72 md:w-64
                bg-blue-900 
                flex flex-col justify-between 
                h-full 
                fixed top-0 left-0 
                z-50
            "
        >
            
            {/* Logo/Header */}
            <div
                className="
                    p-4 
                    flex items-center 
                    h-16 
                    border-b border-blue-800
                    text-center sm:text-left
                "
            >
                <span className="text-xl sm:text-2xl font-extrabold text-amber-500">
                    Admin Portal
                </span>
            </div>

            {/* Navigation Links */}
            <nav className="p-4 space-y-2 text-base sm:text-lg">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => 
                            `flex items-center p-3 rounded-lg font-medium transition duration-200 ${
                                isActive 
                                    ? 'bg-amber-500 text-blue-900 shadow-md'
                                    : 'text-gray-200 hover:bg-blue-800'
                            }`
                        }
                    >
                        <item.icon size={20} className="mr-3" />
                        {item.name}
                    </NavLink>
                ))}
            </nav>

        </div>
    );
};

export default AdminSidebar;
