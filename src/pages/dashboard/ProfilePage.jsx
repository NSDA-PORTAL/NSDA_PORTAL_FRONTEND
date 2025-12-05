import React, { useState, useEffect } from "react";
import axios from "axios"; 

// Base URLs for the API
const API_PROFILE_URL = "http://localhost:5000/api/profile/me";
// NOTE: Use the correct endpoint for password change when implemented on the backend
const API_PASSWORD_URL = "http://localhost:5000/api/auth/password"; 
const AVATAR_URL = "https://i.ibb.co/L50F69W/placeholder-avatar.png";

// Placeholder data for initial load
const initialData = {
  // User Model fields
  name: "Loading...",
  email: "loading@example.com",
  // Profile Model fields
  phone: "",
  school: "",
  address: "",
  bio: "",
  // Other fields
  track: "N/A",
  role: "user",
};

// Function to get the JWT token from localStorage
const getToken = () => localStorage.getItem('token'); 

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(initialData);
  const [profileForm, setProfileForm] = useState(initialData); // State for editable fields
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // --- Utility Functions ---
  const showStatusMessage = (type, message) => {
    if (type === 'success') {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(null), 3000);
    } else if (type === 'error') {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  // Function to create the Axios config with Authorization header
  const getAuthConfig = () => {
    const token = getToken();
    if (!token) {
        showStatusMessage('error', "Authentication failed. Please log in.");
        return null;
    }
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
  };

  // --- Data Fetching ---
  useEffect(() => {
    const fetchProfile = async () => {
      const config = getAuthConfig();
      if (!config) {
        setIsLoading(false);
        return;
      }
      
      try {
        // GET request with Authorization header
        const res = await axios.get(API_PROFILE_URL, config);
        const fetchedProfile = res.data;
        
        // Merge User (populated) and Profile data
        const mergedData = {
          name: fetchedProfile.user.name || "N/A",
          email: fetchedProfile.user.email || "N/A",
          track: fetchedProfile.user.track || "N/A",
          role: fetchedProfile.user.role || "user",
          phone: fetchedProfile.phone || "",
          school: fetchedProfile.school || "",
          address: fetchedProfile.address || "",
          bio: fetchedProfile.bio || "",
        };

        setProfileData(mergedData);
        setProfileForm(mergedData); // Initialize form with fetched data
        setIsLoading(false);

      } catch (error) {
        const msg = error.response?.data?.message || error.message || "Failed to load profile data. Check if server is running.";
        showStatusMessage('error', msg);
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // --- Form Handlers ---
  
  // Handle change for general profile inputs
  const handleProfileChange = (e) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value,
    });
  };
  
  // Handle Save Profile Submission
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    
    const config = getAuthConfig();
    if (!config) return;

    // Only send the fields controlled by the Profile model (as defined in your backend controller)
    const updatePayload = {
      phone: profileForm.phone,
      school: profileForm.school,
      address: profileForm.address,
      bio: profileForm.bio,
    };

    try {
      // PUT request with Authorization header
      const res = await axios.put(API_PROFILE_URL, updatePayload, config);
      
      // Update the main display state with the new values
      setProfileData((prevData) => ({
        ...prevData,
        ...updatePayload, // Only update the profile fields
      }));

      showStatusMessage('success', res.data.message || "Profile updated successfully!");
    } catch (error) {
        const msg = error.response?.data?.message || "Error updating profile.";
        showStatusMessage('error', msg);
    }
  };

  // Handle Change Password Submission (Placeholder)
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      return showStatusMessage('error', "New password and confirmation must match.");
    }

    const config = getAuthConfig();
    if (!config) return;

    try {
        // NOTE: Replace this with an actual backend call once the changePassword route is implemented
        // await axios.patch(API_PASSWORD_URL, passwordForm, config);
        
        showStatusMessage('success', "Password change submitted (Requires backend route implementation)");
        setPasswordForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    } catch (error) {
        const msg = error.response?.data?.message || "Error changing password.";
        showStatusMessage('error', msg);
    }
  };


  // Input field common classes based on design principles
  const inputClass =
    "mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 text-gray-900 focus:ring-blue-900 focus:border-blue-900 transition disabled:bg-gray-100 disabled:text-gray-500";

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex items-center space-x-3 mb-8">
          <h1 className="text-xl font-bold text-blue-900">My Profile</h1>
          {isLoading && <span className="text-gray-500">(Loading...)</span>}
        </header>

        {/* Profile Card - Personal Info & Editable Fields */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transition-colors duration-300">
          
          {/* Avatar and Name Section (User model data) */}
          <div className="flex flex-col items-center border-b pb-6 mb-6 border-gray-100 ">
            <img
              src={AVATAR_URL}
              alt="User Avatar"
              className="w-28 h-28 rounded-full object-cover mb-4 shadow-md"
            />
            <h2 className="text-2xl font-semibold text-blue-900 ">
              {profileData.name}
            </h2>
            <p className="text-gray-500 text-sm mb-1">{profileData.email}</p>
            <p className="text-amber-600 text-sm font-medium">Track: {profileData.track} | Role: {profileData.role}</p>

            {/* Accent/CTA Button for Upload Image (Placeholder) */}
            <button className="flex items-center space-x-2 mt-3 px-4 py-2 bg-amber-500/10 text-amber-500 rounded-lg hover:bg-amber-500/20 transition text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5.5 13a1.5 1.5 0 01-1.5-1.5v-6a1.5 1.5 0 011.5-1.5h6a1.5 1.5 0 011.5 1.5v2.5a.5.5 0 001 0V7.5a2.5 2.5 0 00-2.5-2.5h-6A2.5 2.5 0 003 7.5v6A2.5 2.5 0 005.5 16h6a2.5 2.5 0 002.5-2.5v-2.5a.5.5 0 00-1 0v2.5a1.5 1.5 0 01-1.5 1.5h-6z" /><path fillRule="evenodd" d="M16 5a1 1 0 00-1 1v2a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /><path fillRule="evenodd" d="M12.44 6.786l2.122 2.121a1 1 0 001.414-1.414l-2.121-2.122a1 1 0 00-1.414 1.414zM10 7a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
              <span>Change Avatar (Placeholder)</span>
            </button>
          </div>

          <form onSubmit={handleSaveProfile}>
            <h3 className="text-lg font-bold text-blue-900 mb-4">
              Contact & School Information
            </h3>

            {/* Display-Only Fields (from User model) */}
            <div className="grid grid-cols-2 gap-4">
                <div className="block mb-4">
                    <span className="text-sm font-medium text-gray-700 ">Full Name (User)</span>
                    {/* Display text instead of disabled input */}
                    <div className="mt-1 block w-full py-3 px-3 text-gray-900 border-b border-gray-200 font-semibold">
                        {profileData.name}
                    </div>
                </div>
                <div className="block mb-4">
                    <span className="text-sm font-medium text-gray-700 ">Email Address (User)</span>
                    {/* Display text instead of disabled input */}
                    <div className="mt-1 block w-full py-3 px-3 text-gray-900 border-b border-gray-200 font-semibold">
                        {profileData.email}
                    </div>
                </div>
            </div>
            
            {/* Editable Fields (from Profile model) */}
            <label className="block mb-4">
              <span className="text-sm font-medium text-gray-700 ">Phone Number</span>
              <input
                type="tel"
                name="phone"
                value={profileForm.phone}
                onChange={handleProfileChange}
                placeholder="e.g., +251 912345678"
                className={inputClass}
                disabled={isLoading}
              />
            </label>
            
            <label className="block mb-4">
              <span className="text-sm font-medium text-gray-700 ">School / University</span>
              <input
                type="text"
                name="school"
                value={profileForm.school}
                onChange={handleProfileChange}
                placeholder="e.g., Addis Ababa University"
                className={inputClass}
                disabled={isLoading}
              />
            </label>

            <label className="block mb-4">
              <span className="text-sm font-medium text-gray-700 ">Address</span>
              <input
                type="text"
                name="address"
                value={profileForm.address}
                onChange={handleProfileChange}
                placeholder="e.g., Bole, Addis Ababa"
                className={inputClass}
                disabled={isLoading}
              />
            </label>

            <label className="block mb-6">
              <span className="text-sm font-medium text-gray-700 ">Bio / Short Description</span>
              <textarea
                name="bio"
                rows="3"
                value={profileForm.bio}
                onChange={handleProfileChange}
                placeholder="Tell us a little about yourself..."
                className={`${inputClass} resize-none`}
                disabled={isLoading}
              ></textarea>
            </label>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 disabled:opacity-50"
                disabled={isLoading}
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 transition-colors duration-300">
          <h3 className="text-lg font-bold text-blue-900 mb-4">
            Change Password
          </h3>

          <form onSubmit={handleChangePassword}>
            <label className="block mb-4">
              <span className="sr-only">Current Password</span>
              <input
                type="password"
                name="currentPassword"
                placeholder="Enter your current password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                className={inputClass}
              />
            </label>

            <label className="block mb-4">
              <span className="sr-only">New Password</span>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                className={inputClass}
              />
            </label>

            <label className="block mb-6">
              <span className="sr-only">Confirm New Password</span>
              <input
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm new password"
                value={passwordForm.confirmNewPassword}
                onChange={(e) => setPasswordForm({...passwordForm, confirmNewPassword: e.target.value})}
                className={inputClass}
              />
            </label>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 disabled:opacity-50"
                disabled={isLoading}
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Status Messages */}
      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-100 text-green-700 py-3 px-6 rounded-xl shadow-xl font-semibold transition-opacity duration-300">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="fixed bottom-4 right-4 bg-red-100 text-red-700 py-3 px-6 rounded-xl shadow-xl font-semibold transition-opacity duration-300">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;