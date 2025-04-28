// App.jsx
import { Navigate, Route, Routes } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

import LandingPage from './components/LandingPage';
import LoginPage from './pages/auth/login/LoginPage';
import SignUpPage from './pages/auth/signup/SignUpPage';
import EmailVerification from './components/Verification';
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedLayout from './components/ProtectedLayout';

// TransferRoom Pages
import Dashboard from './pages/Dashboard';
import Recruitment from './pages/Recruitment';
import Outplacement from './pages/Outplacement';
import Marketplace from './pages/Marketplace';
import Events from './pages/Events';
import Pricing from './pages/Pricing';
import Profile from './pages/Profile';

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/auth/me', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong');
        }
        return data;
      } catch (error) {
        return null; // Return null on error to treat as unauthenticated
      }
    },
    retry: false, // Disable retries
    refetchOnMount: 'always', // Ensure refetch on mount
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="w-full h-screen overflow-y-auto">
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={authUser ? <Navigate to={authUser.isVerified ? "/dashboard" : "/verify"} /> : <LandingPage />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to={authUser.isVerified ? "/dashboard" : "/verify"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to={authUser.isVerified ? "/dashboard" : "/verify"} />}
          />
          <Route
            path="/verify"
            element={
              authUser ? (
                authUser.isVerified ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <EmailVerification />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Protected Routes */}
          <Route element={<ProtectedLayout />}>
            <Route
              path="/dashboard"
              element={authUser ? (authUser.isVerified ? <Dashboard /> : <Navigate to="/verify" />) : <Navigate to="/login" />}
            />
            <Route
              path="/recruitment"
              element={authUser ? (authUser.isVerified ? <Recruitment /> : <Navigate to="/verify" />) : <Navigate to="/login" />}
            />
            <Route
              path="/outplacement"
              element={authUser ? (authUser.isVerified ? <Outplacement /> : <Navigate to="/verify" />) : <Navigate to="/login" />}
            />
            <Route
              path="/marketplace"
              element={authUser ? (authUser.isVerified ? <Marketplace /> : <Navigate to="/verify" />) : <Navigate to="/login" />}
            />
            <Route
              path="/events"
              element={authUser ? (authUser.isVerified ? <Events /> : <Navigate to="/verify" />) : <Navigate to="/login" />}
            />
            <Route
              path="/pricing"
              element={authUser ? (authUser.isVerified ? <Pricing /> : <Navigate to="/verify" />) : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={authUser ? (authUser.isVerified ? <Profile /> : <Navigate to="/verify" />) : <Navigate to="/login" />}
            />
          </Route>

          {/* Catch-all route */}
          <Route
            path="*"
            element={<Navigate to={authUser ? (authUser.isVerified ? '/dashboard' : '/verify') : '/'} />}
          />
        </Routes>
      </AnimatePresence>

      <Toaster />
    </div>
  );
}

export default App;