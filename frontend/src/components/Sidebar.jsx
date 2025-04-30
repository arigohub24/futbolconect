import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: 'fas fa-home' },
    { path: '/recruitment', name: 'Recruitment', icon: 'fas fa-search' },
    { path: '/outplacement', name: 'Outplacement', icon: 'fas fa-sign-out-alt' },
    { path: '/marketplace', name: 'Marketplace', icon: 'fas fa-store' },
    { path: '/events', name: 'Events', icon: 'fas fa-calendar' },
    { path: '/pricing', name: 'Pricing', icon: 'fas fa-credit-card' },
    { path: '/profile', name: 'Profile', icon: 'fas fa-user' },
  ];

  useEffect(() => {
    if (!isMobile) setIsOpen(true);
    else setIsOpen(false);
  }, [isMobile]);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, isMobile]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {isMobile ? (
        <>
          {/* Mobile Toggle Button - Hamburger Icon */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="fixed top-4 left-4 z-50 w-12 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg"
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <motion.i
              className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-white text-2xl`}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />
            )}
          </AnimatePresence>

          {/* Mobile Sidebar */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 overflow-y-auto"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              >
                <div className="px-5 py-6">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-gray-800">Navigation</h2>
                    <motion.button
                      onClick={() => setIsOpen(false)}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className="fas fa-times text-gray-500 text-lg" />
                    </motion.button>
                  </div>
                  <nav className="space-y-1">
                    {navItems.map((item) => (
                      <motion.div
                        key={item.path}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <NavLink
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                            isActive(item.path)
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <i
                            className={`${item.icon} mr-3 ${
                              isActive(item.path) ? 'text-blue-600' : 'text-gray-500'
                            }`}
                          />
                          <span className="font-medium">{item.name}</span>
                          {isActive(item.path) && (
                            <motion.div
                              className="ml-auto w-1.5 h-5 bg-blue-600 rounded-full"
                              layoutId="activeIndicator"
                              transition={{ type: 'spring', damping: 25 }}
                            />
                          )}
                        </NavLink>
                      </motion.div>
                    ))}
                  </nav>
                  <div className="mt-10">
                    <div className="h-px bg-gray-200 my-4" />
                    <motion.div
                      className="flex items-center px-4 py-3 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg cursor-pointer"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsOpen(false)}
                    >
                      <NavLink to="/help-center" className="flex items-center">
                        <i className="fas fa-headset mr-3" />
                        Need help? Contact support
                      </NavLink>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <motion.div
          className="w-64 bg-white shadow-md h-screen fixed left-0 top-0 border-r border-gray-100 z-40 overflow-y-auto"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 25 }}
        >
          <div className="px-5 py-10">
            <motion.h2
              className="text-xl font-bold text-gray-800 mb-10 px-4 flex items-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="w-1 h-6 bg-blue-600 rounded-full mr-3"
                animate={{ height: [24, 28, 24] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              Futbol Conect
            </motion.h2>
            <nav className="space-y-1">
              <AnimatePresence>
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <NavLink
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-lg transition-all relative overflow-hidden ${
                        isActive(item.path)
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {isActive(item.path) && (
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"
                          layoutId="activeSidebar"
                          transition={{ type: 'spring', damping: 25 }}
                        />
                      )}
                      <i
                        className={`${item.icon} mr-3 ${
                          isActive(item.path) ? 'text-blue-600' : 'text-gray-500'
                        }`}
                      />
                      <span className="font-medium">{item.name}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </AnimatePresence>
            </nav>
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="h-px bg-gray-200 my-6" />
              <motion.div
                className="flex items-center px-4 py-3 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg cursor-pointer"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <NavLink to="/help-center" className="flex items-center">
                  <i className="fas fa-headset mr-3" />
                  Need help? Contact support
                </NavLink>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Sidebar;