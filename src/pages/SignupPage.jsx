import React, { useState } from 'react'; 
import { Link, useNavigate } from "react-router-dom"; // <-- Import useNavigate
import { registerUser } from '../services/authService'; // <-- Import API function
// Note: We don't use useAuth here, we just redirect to login

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState(null); // <-- Add error state
  const [loading, setLoading] = useState(false); // <-- Add loading state
  const navigate = useNavigate(); // <-- Initialize navigation

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => { // <-- Made function async
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirm) {
        setError("Passwords do not match.");
        return;
    }

    setLoading(true);
    try {
        // 1. Call the backend registration API
        await registerUser(form.name, form.email, form.password);
        
        // 2. On success, redirect to the login page
        alert("Registration successful! Please log in.");
        navigate('/login');

    } catch (err) {
        // 3. Handle and display errors
        setError(err.message || "Registration failed. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className=" pt-18 min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        
        {/* Error Display */}
        {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm mb-4 text-center">
                {error}
            </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Hamza Musa"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="hamza3452@gmail.com"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Choose a strong password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              placeholder="Confirm your password"
              value={form.confirm}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading} // <-- Disable button when loading
            className="w-full py-2 rounded-lg text-white bg-amber-500 hover:bg-amber-600 transition disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-amber-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}