import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  ChevronRight, Globe, Medal, Search, Star, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConnectClubs = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.12,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const headerVariants = {
    hidden: { y: -40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 80, 
        delay: 0.2 
      }
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const floatingBadgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        delay: 1.2
      }
    }
  };

  const featuredClubs = [
    { id: 1, name: "FC Barcelona", country: "Spain", logo: "/api/placeholder/60/60", tier: "Premium" },
    { id: 2, name: "Manchester United", country: "England", logo: "/api/placeholder/60/60", tier: "Elite" },
    { id: 3, name: "Bayern Munich", country: "Germany", logo: "/api/placeholder/60/60", tier: "Premium" },
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'discover':
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full z-0"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg mr-4">
                    <Search size={24} className="text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Find Clubs</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Search for clubs by league, country, or specific needs. Connect directly with decision-makers and explore new opportunities.
                </p>
                <Link to="/join">
                  <motion.button
                    whileHover={{ scale: 1.03, backgroundColor: "#2563EB" }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-3 bg-blue-600 text-white rounded-lg flex items-center font-medium shadow-md"
                  >
                    Start Connecting
                    <ChevronRight size={18} className="ml-2" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full z-0"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg mr-4">
                    <Globe size={24} className="text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Network</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Join our exclusive global network to access opportunities and collaborate with top clubs from around the world.
                </p>
                <Link to="/join">
                  <motion.button
                    whileHover={{ scale: 1.03, backgroundColor: "#2563EB" }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-3 bg-blue-600 text-white rounded-lg flex items-center font-medium shadow-md"
                  >
                    Join Now
                    <ChevronRight size={18} className="ml-2" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full z-0"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg mr-4">
                    <Medal size={24} className="text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Elite Access</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Unlock premium features with our Elite membership. Get priority introductions and exclusive event invitations.
                </p>
                <Link to="/elite">
                  <motion.button
                    whileHover={{ scale: 1.03, backgroundColor: "#2563EB" }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-3 bg-blue-600 text-white rounded-lg flex items-center font-medium shadow-md"
                  >
                    Learn More
                    <ChevronRight size={18} className="ml-2" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full z-0"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg mr-4">
                    <Activity size={24} className="text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Opportunities</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Find player transfers, coaching positions, and partnerships with clubs that match your profile and goals.
                </p>
                <Link to="/opportunities">
                  <motion.button
                    whileHover={{ scale: 1.03, backgroundColor: "#2563EB" }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-3 bg-blue-600 text-white rounded-lg flex items-center font-medium shadow-md"
                  >
                    Explore
                    <ChevronRight size={18} className="ml-2" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        );
      
      case 'featured':
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-4"
          >
            {featuredClubs.map((club) => (
              <motion.div
                key={club.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-100 flex items-center justify-between"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                    <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{club.name}</h3>
                    <p className="text-gray-500 text-sm">{club.country}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 text-xs rounded-full mr-3 ${
                    club.tier === 'Elite' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {club.tier}
                  </span>
                  <Link to={`/club/${club.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm"
                    >
                      Connect
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
            <motion.div
              variants={itemVariants}
              className="mt-4"
            >
              <Link to="/clubs">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 border border-blue-600 text-blue-600 bg-white rounded-lg flex items-center justify-center font-medium"
                >
                  View All Clubs
                  <ChevronRight size={16} className="ml-1" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen"
    >
      <motion.div 
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8 relative"
      >
        <h1 className="text-4xl font-bold text-gray-800">Connect With Clubs</h1>
        <p className="text-gray-600 mt-2 max-w-2xl">Build meaningful relationships with football clubs worldwide through Futbol Connect exclusive network</p>
        
        <motion.div
          variants={floatingBadgeVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="absolute -top-2 -right-2 md:top-0 md:right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center"
        >
          <Star size={16} className="mr-2 text-yellow-300" />
          <span className="font-medium">New Elite Features</span>
        </motion.div>
      </motion.div>
      
      <motion.div
        variants={tabVariants}
        initial="hidden"
        animate="visible"
        className="flex space-x-4 mb-8 border-b border-gray-200 pb-2"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('discover')}
          className={`px-4 py-2 font-medium rounded-lg transition-colors ${
            activeTab === 'discover' 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Discover
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('featured')}
          className={`px-4 py-2 font-medium rounded-lg transition-colors ${
            activeTab === 'featured' 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Featured Clubs
        </motion.button>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mt-12 bg-white p-6 rounded-xl shadow-md border border-gray-100"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Get Started Today</h2>
        <p className="text-gray-600 mb-4">Complete your profile and start connecting with football clubs worldwide.</p>
        <div className="flex flex-wrap gap-4">
          <Link to="/profile/complete">
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: "#2563EB" }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-3 bg-blue-600 text-white rounded-lg flex items-center font-medium shadow-md"
            >
              Complete Profile
              <ChevronRight size={18} className="ml-2" />
            </motion.button>
          </Link>
          <Link to="/events">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-3 border border-blue-600 text-blue-600 bg-white rounded-lg flex items-center font-medium"
            >
              Upcoming Events
              <ChevronRight size={18} className="ml-2" />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConnectClubs;