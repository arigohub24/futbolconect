import { Navigate, Route, Routes } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

import LandingPage from './components/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedLayout from './components/ProtectedLayout';

// TransferRoom Pages
import Dashboard from './pages/Dashboard';
import Recruitment from './pages/Recruitment';
import Outplacement from './pages/Outplacement';
import PlayerProfile from './components/PlayerProfile';
import Marketplace from './pages/Marketplace';
import Events from './pages/Events';
import Pricing from './pages/Pricing';
import Profile from './pages/Profile';
import EditProfile from './components/EditProfile';
import PaymentForm from './components/PaymentForm';
import PaymentSuccess from './components/PaymentSuccess';
import Okaka from './pages/Okaka';
import Settings from './pages/Settings';

// Footer Content
import Features from './pages/FooterContent/Features';
import UseCases from './pages/FooterContent/UseCases';
import Integration from './pages/FooterContent/Integration';
import AboutUs from './pages/FooterContent/AboutUs';
import Careers from './pages/FooterContent/Careers';
import Press from './pages/FooterContent/Press';
import Blog from './pages/FooterContent/Blog';
import HelpCenter from './pages/FooterContent/HelpCenter';
import Documentation from './pages/FooterContent/Documentation';
import Webinars from './pages/FooterContent/Webinars';
import Status from './pages/FooterContent/Status';
import Terms from './pages/FooterContent/Terms';
import PrivacyPolicy from './pages/FooterContent/Privacy';
import Cookies from './pages/FooterContent/Cookies';
import CookieConsent from './components/CookieConsent';
import Join from './components/Join';

import Activity from './pages/Activity';
import ClubsStats from './pages/Stats/Clubs';
import DealsStats from './pages/Stats/Deals';
import PlayersStats from './pages/Stats/Players';
import CreateSearchAdvert from './components/CreateSearchAdvert';
import ViewStats from './components/ViewStats';
import BrowseLeagues from './components/BrowseLeagues';
import ConnectClubs from './components/ConnectClubs';
import MakePlayerAvailable from './components/MakePlayerAvailable';
import AvailablePlayers from './components/AvailablePlayer';
import EventDetails from './pages/events/[eventId]';
import MeetingSchedule from './components/MeetingSchedule';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your test publishable key
const stripePromise = loadStripe('pk_test_your_publishable_key_here');

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
              path="/okaka"
              element={authUser ? <Okaka /> : <Navigate to="/login" />}
            />
            <Route
              path="/settings"
              element={authUser ? <Settings /> : <Navigate to="/login" />}
            />
            <Route
              path="/player/:id"
              element={authUser ? <PlayerProfile /> : <Navigate to="/login" />}
            />
            <Route
              path="/make-player-available"
              element={authUser ? <MakePlayerAvailable /> : <Navigate to="/login" />}
            />
            <Route
              path="/available-players"
              element={authUser ? <AvailablePlayers /> : <Navigate to="/login" />}
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
              path="/events/:eventId"
              element={authUser ? <EventDetails /> : <Navigate to="/login" />}
            />
            <Route
              path="/meeting-schedule"
              element={authUser ? <MeetingSchedule /> : <Navigate to="/login" />}
            />
            <Route
              path="/pricing"
              element={authUser ? <Pricing /> : <Navigate to="/login" />}
            />
            <Route
              path="/payment/premium"
              element={
                authUser ? (
                  <Elements stripe={stripePromise}>
                    <PaymentForm />
                  </Elements>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/payment/basic"
              element={
                authUser ? (
                  <Elements stripe={stripePromise}>
                    <PaymentForm />
                  </Elements>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/payment/success"
              element={
                authUser ? (
                  <Elements stripe={stripePromise}>
                    <PaymentSuccess />
                  </Elements>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/profile"
              element={authUser ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile/edit"
              element={authUser ? <EditProfile /> : <Navigate to="/login" />}
            />
            <Route
              path="/activity"
              element={authUser ? <Activity /> : <Navigate to="/login" />}
            />
            <Route
              path="/stats/clubs"
              element={authUser ? <ClubsStats /> : <Navigate to="/login" />}
            />
            <Route
              path="/stats/deals"
              element={authUser ? <DealsStats /> : <Navigate to="/login" />}
            />
            <Route
              path="/stats/players"
              element={authUser ? <PlayersStats /> : <Navigate to="/login" />}
            />
            <Route
              path="/create-search-advert"
              element={authUser ? <CreateSearchAdvert /> : <Navigate to="/login" />}
            />
            <Route
              path="/browse-leagues"
              element={authUser ? <BrowseLeagues /> : <Navigate to="/login" />}
            />
            <Route
              path="/connect-clubs"
              element={authUser ? <ConnectClubs /> : <Navigate to="/login" />}
            />
            <Route
              path="/view-stats"
              element={authUser ? <ViewStats /> : <Navigate to="/login" />}
            />
            <Route
              path="/join"
              element={authUser ? <Join /> : <Navigate to="/login" />}
            />
          </Route>

          {/* Footer Content - Public Routes */}
          <Route path="/features" element={<Features />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/integrations" element={<Integration />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/press" element={<Press />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/status" element={<Status />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<Cookies />} />

          {/* Catch-all Route */}
          <Route
            path="*"
            element={<Navigate to={authUser ? '/dashboard' : '/'} />}
          />
        </Routes>
      </AnimatePresence>
      <CookieConsent />
      <Toaster />
    </div>
     
  );
}

export default App;