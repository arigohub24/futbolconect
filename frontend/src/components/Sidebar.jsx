import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const Sidebar = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { scrollYProgress } = useScroll();

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: '🏠', mobileIcon: 'fas fa-home' },
    { path: '/recruitment', name: 'Recruitment', icon: '🔍', mobileIcon: 'fas fa-search' },
    { path: '/outplacement', name: 'Outplacement', icon: '📤', mobileIcon: 'fas fa-sign-out-alt' },
    { path: '/marketplace', name: 'Marketplace', icon: '🏟️', mobileIcon: 'fas fa-store' },
    { path: '/events', name: 'Events', icon: '📅', mobileIcon: 'fas fa-calendar' },
    { path: '/pricing', name: 'Pricing', icon: '💳', mobileIcon: 'fas fa-credit-card' },
    { path: '/profile', name: 'Profile', icon: '👤', mobileIcon: 'fas fa-user' },
  ];

  const desktopVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', damping: 20, staggerChildren: 0.05 } },
  };

  const mobileVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 25 } },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  useEffect(() => {
    if (!isMobile) setIsOpen(true);
    else setIsOpen(false);
  }, [isMobile]);

  const activeStyle = {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    color: '#10B981',
    borderLeft: isMobile ? 'none' : '4px solid #10B981',
  };

  return (
    <>
      {isMobile ? (
        // Mobile Layout
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl z-50 border-t border-blue-100"
          variants={mobileVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="absolute -top-16 left-1/2 transform -translate-x-1/2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg"
            >
              <motion.i
                className="fas fa-plus text-xl"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
            </button>
          </motion.div>

          <motion.div
            className="flex justify-around py-4 px-2 bg-gradient-to-t from-blue-50 to-white"
            animate={{ height: isOpen ? 'auto' : 70 }}
          >
            <AnimatePresence>
              {navItems.slice(0, 5).map((item) => (
                <motion.div
                  key={item.path}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to={item.path}
                    style={location.pathname === item.path ? activeStyle : {}}
                    className="flex flex-col items-center px-2 py-2 rounded-xl text-gray-600 hover:text-blue-600 transition-all relative"
                  >
                    <motion.i
                      className={`${item.mobileIcon} text-xl`}
                      animate={{
                        color: location.pathname === item.path ? '#10B981' : hoveredItem === item.path ? '#2563EB' : '#4B5563',
                      }}
                    />
                    <motion.span
                      className="text-xs mt-1 font-medium"
                      animate={{
                        color: location.pathname === item.path ? '#10B981' : hoveredItem === item.path ? '#2563EB' : '#4B5563',
                      }}
                    >
                      {item.name}
                    </motion.span>
                    {location.pathname === item.path && (
                      <motion.div
                        className="absolute -top-1 w-2 h-2 bg-green-400 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                      />
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-blue-50 px-4 py-6"
              >
                {navItems.slice(5).map((item) => (
                  <motion.div
                    key={item.path}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-4"
                  >
                    <NavLink
                      to={item.path}
                      style={location.pathname === item.path ? activeStyle : {}}
                      className="flex items-center px-4 py-3 rounded-xl text-gray-600 hover:text-blue-600 transition-all"
                    >
                      <i className={`${item.mobileIcon} mr-3 text-lg`} />
                      <span className="font-medium">{item.name}</span>
                    </NavLink>
                  </motion.div>
                ))}
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="text-sm text-blue-500 font-medium px-4 py-2 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors">
                    Need help? Contact support
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        // Desktop Layout
        <motion.div
          className="w-80 bg-gradient-to-br from-white to-blue-50 shadow-2xl h-screen fixed left-0 top-0 pt-20 border-r border-blue-100 z-40 overflow-hidden"
          variants={desktopVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-100 opacity-0"
            animate={{ opacity: scrollYProgress.get() * 0.3 }}
          />
          
          <div className="p-8 relative">
            <motion.h2
              className="text-2xl font-bold text-blue-900 mb-10 px-4 flex items-center"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span
                className="w-3 h-8 bg-gradient-to-b from-green-400 to-blue-500 rounded-full mr-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              Navigation Hub
            </motion.h2>

            <ul className="space-y-4">
              <AnimatePresence>
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.path}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onHoverStart={() => setHoveredItem(item.path)}
                    onHoverEnd={() => setHoveredItem(null)}
                    whileHover={{
                      x: 5,
                      transition: { type: 'spring', stiffness: 400, damping: 15 },
                    }}
                  >
                    <NavLink
                      to={item.path}
                      style={location.pathname === item.path ? activeStyle : {}}
                      className="flex items-center px-6 py-4 rounded-2xl transition-all text-gray-700 hover:text-blue-600 font-medium relative overflow-hidden group"
                    >
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-green-100 to-blue-100 opacity-0 group-hover:opacity-30"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '0%' }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.span
                        className="mr-5 text-xl relative z-10"
                        whileHover={{ scale: 1.3, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {item.icon}
                      </motion.span>
                      <motion.span
                        className="relative z-10"
                        animate={{
                          color: location.pathname === item.path ? '#10B981' : hoveredItem === item.path ? '#2563EB' : '#374151',
                        }}
                      >
                        {item.name}
                      </motion.span>
                      {location.pathname === item.path && (
                        <motion.div
                          className="absolute right-6 w-3 h-3 bg-green-400 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                        />
                      )}
                    </NavLink>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <motion.div
              className="mt-12 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent my-6" />
              <motion.div
                className="text-sm text-blue-500 font-medium px-4 py-3 rounded-xl hover:bg-blue-50 cursor-pointer transition-colors"
                whileHover={{ x: 5 }}
              >
                Need help? Contact support
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Sidebar;