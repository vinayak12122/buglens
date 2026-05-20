import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import DashboardPage from './pages/dashboard/DashboardPage';
import LandingPage from './pages/landing/LandingPage';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

import { useAuth } from './context/AuthContext';
import ProjectDashboardPage from './pages/dashboard/ProjectDashboardPage';
import UserLogDetails from './components/layout/dashboard/UserLogDetails';
import Docs from './pages/landing/Docs';
import Feature from './pages/landing/Feature';
import Scalability from './pages/landing/Scalability';
import LandingLayout from './components/layout/LandingLayout';
import LiveDemo from './pages/landing/LiveDemo';

const App = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-xl font-medium text-app-text after:content-[''] after:animate-loading-dots">
          Buglens loading
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-bg text-app-text transition-colors duration-300 font-poppins">

      <BrowserRouter>

        <Routes>

          <Route path="/" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LandingLayout><LandingPage /></LandingLayout>
          } />

          <Route path="/page/docs" element={<LandingLayout><Docs /></LandingLayout>} />
          <Route path="/page/features" element={<LandingLayout><Feature /></LandingLayout>} />
          <Route path="/page/scalability" element={<LandingLayout><Scalability /></LandingLayout>} />
          <Route path="/page/live-demo" element={<LandingLayout><LiveDemo/></LandingLayout>} />

          <Route
            path="/dashboard/:projectId"
            element={
              isAuthenticated
                ? <ProjectDashboardPage />
                : <Navigate to="/auth/login" />
            }
          />
          <Route
            path="/dashboard/:projectId/:logId"
            element={
              isAuthenticated
                ? <UserLogDetails />
                : <Navigate to="/auth/login" />
            }
          />

          <Route
            path="/auth/login"
            element={
              isAuthenticated
                ? <Navigate to="/dashboard" />
                : <Login />
            }
          />

          <Route
            path="/auth/signup"
            element={
              isAuthenticated
                ? <Navigate to="/dashboard" />
                : <SignUp />
            }
          />

          <Route
            path="/dashboard"
            element={
              isAuthenticated
                ? <DashboardPage />
                : <Navigate to="/auth/login" />
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

      </BrowserRouter>

    </div>
  );
};

export default App