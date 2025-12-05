import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

// This component checks if the user is authenticated and has the required role
const PrivateRoute = ({ requiredRole }) => {
    const { isAuthenticated, user } = useAuth();
    
    if (!isAuthenticated) {
        // Not logged in, redirect to login
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user && user.role !== requiredRole) {
        // Logged in but wrong role, redirect to unauthorized page or their own dashboard
        alert("Access Denied: You do not have the required role.");
        return <Navigate to="/" replace />; // Redirect to home or another page
    }

    // User is logged in and has the correct role (or no role required)
    return <Outlet />;
};

export default PrivateRoute;