import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Context
const AuthContext = createContext(null);

// Custom hook to use the Auth context (used in components)
export const useAuth = () => useContext(AuthContext);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    // Check localStorage for initial user state on load
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            return null;
        }
    });

    // Check localStorage for initial token
    // 🎯 FIX 1: Change retrieval key from 'authToken' to 'token'
    const [token, setToken] = useState(() => localStorage.getItem('token')); 

    // --- Authentication Functions ---
    
    // 1. Function called after successful login
    const login = (userData, authToken) => {
        // Store data in state
        setUser(userData);
        setToken(authToken);

        // Store data in persistent storage
        localStorage.setItem('user', JSON.stringify(userData));
        // 🎯 FIX 2: Change saving key from 'authToken' to 'token'
        localStorage.setItem('token', authToken); 
    };

    // 2. Function called upon logout
    const logout = () => {
        setUser(null);
        setToken(null);

        // Remove data from persistent storage
        localStorage.removeItem('user');
        // 🎯 FIX 3: Change removal key from 'authToken' to 'token'
        localStorage.removeItem('token'); 
    };
    
    // --- Context Value ---
    // The 'user' object must contain the MongoDB ID as 'id' or '_id'
    const value = {
        // user object will look like: { id: '...', role: 'student' }
        user, 
        token,
        login,
        logout,
        isAuthenticated: !!token,
        // The student ID needed for TasksPage.jsx
        // 🎯 FIX 4 (If necessary): Ensure your user object has an 'id' property. 
        // If your MongoDB user model uses '_id', you may need to use user._id here 
        // or ensure your backend maps _id to id upon login. Assuming 'id' is correct for now.
        studentId: user ? user.id : null, 
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};