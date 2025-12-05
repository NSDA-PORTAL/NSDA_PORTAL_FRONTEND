import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Root Page Imports (based on your structure)
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Import Route Guard Component (assuming this is in src/components)
import PrivateRoute from './components/PrivateRoute'; 

function App() {
  return (
    <BrowserRouter>
      {/* AuthProvider wraps everything to enable state access for Navbar/Footer */}
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar /> 
          
          <main className="flex-grow"> 
            <Routes>
              
              {/* PUBLIC ROUTES */}
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              
              {/* 1. PROTECTED STUDENT DASHBOARD */}
              {/* Wraps StudentDashboardPage, requires 'student' role. */}
              <Route element={<PrivateRoute requiredRole="student" />}>
                <Route path="/dashboard/*" element={<StudentDashboardPage />} />
              </Route>

              {/* 2. PROTECTED ADMIN DASHBOARD */}
              {/* Wraps AdminDashboardPage, requires 'admin' role. PrivateRoute logic handles 'superadmin' access too. */}
              <Route element={<PrivateRoute requiredRole="admin" />}>
                <Route path="/admin/*" element={<AdminDashboardPage />} />
              </Route>
              
              {/* FALLBACK ROUTE: 404 Not Found */}
              <Route path="*" element={<h1 className="text-center pt-24 text-red-900 text-4xl font-bold min-h-screen">404 Page Not Found</h1>} />

            </Routes>
          </main>
          
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;