import React, { useState } from 'react'; 
import { Link, useNavigate } from "react-router-dom"; 
import { loginUser } from '../services/authService'; 
import { useAuth } from '../context/AuthContext'; 

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false); 
    
    // Get the login function from AuthContext
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => { 
        e.preventDefault(); 
        setError(null);
        setLoading(true);

    try {
        // 1. Call the backend login API
        const response = await loginUser(email, password); 

        // 2. Store data
        login(response.user, response.accessToken);
        
        // 3. CRITICAL: Conditional Navigation based on Role (FIXED PATHS)
        const userRole = response.user.role; 
        
        if (userRole === 'student') {
            // FIX: Navigate directly to the default index route's path, /dashboard/tasks
            navigate('/dashboard/tasks'); 
        } else if (userRole === 'admin' || userRole === 'superadmin') {
            // FIX: Navigate directly to the default index route's path, /admin/overview
            navigate('/admin/overview'); 
        } else {
            // Fallback for unexpected roles
            navigate('/login'); 
            // Using console.error instead of alert() per best practice
            console.error('Unknown user role. Please contact support.');
        }

    } catch (err) {
            setError(err.message || 'Login failed. Check your email and password.');
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="pt-15 min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back!</h2>
        <p className="teaxt-2xl font-light text-center mb-6">sign in to your SkillHub account</p>

        {/* Error Display */}
        {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm mb-4 text-center">
                {error}
            </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              placeholder="hamza3452@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pr-12 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
              {/* NOTE: I removed the toggle button as the IconChevronUp/X were not imported, 
                    but you can add it back with proper icons if needed. */}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading} // <-- Disable button when loading
            className="w-full py-2 rounded-lg text-white bg-amber-500 hover:bg-amber-600 transition disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-amber-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}