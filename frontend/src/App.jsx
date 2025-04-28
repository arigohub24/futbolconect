// App.jsx
import { Navigate, Route, Routes } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

import LandingPage from './components/LandingPage';
import LoginPage from './pages/auth/login/LoginPage';
import SignUpPage from './pages/auth/signup/SignUpPage';
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
        return null;
      }
    },
    retry: false,
    refetchOnMount: 'always',
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
            element={authUser ? <Navigate to="/dashboard" /> : <LandingPage />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/dashboard" />}
          />

          {/* Protected Routes */}
          <Route element={<ProtectedLayout />}>
            <Route
              path="/dashboard"
              element={authUser ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/recruitment"
              element={authUser ? <Recruitment /> : <Navigate to="/login" />}
            />
            <Route
              path="/outplacement"
              element={authUser ? <Outplacement /> : <Navigate to="/login" />}
            />
            <Route
              path="/marketplace"
              element={authUser ? <Marketplace /> : <Navigate to="/login" />}
            />
            <Route
              path="/events"
              element={authUser ? <Events /> : <Navigate to="/login" />}
            />
            <Route
              path="/pricing"
              element={authUser ? <Pricing /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={authUser ? <Profile /> : <Navigate to="/login" />}
            />
          </Route>

          {/* Catch-all Route */}
          <Route
            path="*"
            element={<Navigate to={authUser ? '/dashboard' : '/'} />}
          />
        </Routes>
      </AnimatePresence>

      <Toaster />
    </div>
  );
}

export default App;
