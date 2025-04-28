import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const controls = useAnimation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Background animation with a vibrant gradient
  useEffect(() => {
    controls.start({
      background: [
        'linear-gradient(90deg, #ffffff 0%, #e0f2fe 100%)',
        'linear-gradient(90deg, #e0f2fe 0%, #f0f9ff 100%)',
        'linear-gradient(90deg, #f0f9ff 0%, #ffffff 100%)',
      ],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    });
  }, [controls]);

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (res.ok) {
        // Invalidate the authUser query to force refetch
        await queryClient.invalidateQueries({ queryKey: ['authUser'] });
        // Optionally, set authUser to null immediately
        queryClient.setQueryData(['authUser'], null);
        navigate('/login', { replace: true });
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to log out. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Animation variants for buttons
  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: '0 6px 20px rgba(59, 130, 246, 0.3)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  // Animation for logo
  const logoVariants = {
    hover: {
      scale: 1.1,
      color: '#3b82f6',
      transition: { duration: 0.3 },
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity },
    },
  };

  // Mobile menu variants
  const mobileMenuVariants = {
    closed: { opacity: 0, y: '100%' },
    open: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  };

  return (
    <motion.nav
      animate={controls}
      className="sticky top-0 z-50 px-4 sm:px-6 py-4 backdrop-blur-lg bg-white/90 shadow-xl"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <motion.div
          variants={logoVariants}
          whileHover="hover"
          animate="pulse"
          onClick={() => navigate('/dashboard')}
          className="cursor-pointer flex items-center space-x-3"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }}
            className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <span className="text-white font-bold text-sm">FC</span>
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-green-500">
            Futbol Connect
          </h1>
        </motion.div>

        {/* Desktop Navigation */}
        {!isMobile ? (
          <div className="flex items-center space-x-6">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate('/profile')}
              className="relative text-gray-700 hover:text-blue-600 font-medium text-sm px-5 py-2.5 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-100/30 hover:bg-blue-50 transition-colors duration-300 overflow-hidden"
            >
              <span className="relative z-10">Profile</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-blue-100/30 rounded-xl"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`relative text-gray-700 hover:text-red-600 font-medium text-sm px-5 py-2.5 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-100/30 hover:bg-red-50 transition-colors duration-300 overflow-hidden ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="relative z-10">{isLoggingOut ? 'Logging Out...' : 'Logout'}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-200/30 to-red-100/30 rounded-xl"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          </div>
        ) : (
          /* Mobile Hamburger Button */
          <motion.button
            onClick={toggleMenu}
            className="p-2 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-100/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              className="w-6 h-6 flex flex-col justify-center items-center gap-1.5"
            >
              <motion.span
                className="w-5 h-0.5 bg-gray-700 rounded-full"
                animate={{ y: isOpen ? 4 : 0, rotate: isOpen ? 45 : 0 }}
              />
              <motion.span
                className="w-5 h-0.5 bg-gray-700 rounded-full"
                animate={{ opacity: isOpen ? 0 : 1 }}
              />
              <motion.span
                className="w-5 h-0.5 bg-gray-700 rounded-full"
                animate={{ y: isOpen ? -4 : 0, rotate: isOpen ? -45 : 0 }}
              />
            </motion.div>
          </motion.button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <motion.div
          variants={mobileMenuVariants}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          className="fixed inset-x-0 bottom-0 bg-gradient-to-t from-blue-50 to-white shadow-2xl border-t border-blue-100"
        >
          <div className="p-6 space-y-4">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                navigate('/profile');
                setIsOpen(false);
              }}
              className="w-full text-gray-700 hover:text-blue-600 font-medium text-base py-4 px-6 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100/30 hover:bg-blue-50 transition-colors duration-300"
            >
              Profile
            </motion.button>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`w-full text-gray-700 hover:text-red-600 font-medium text-base py-4 px-6 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100/30 hover:bg-red-50 transition-colors duration-300 ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoggingOut ? 'Logging Out...' : 'Logout'}
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;