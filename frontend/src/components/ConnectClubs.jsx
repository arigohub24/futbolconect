import { motion } from 'framer-motion';
import { Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConnectClubs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 bg-gray-50 min-h-screen"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-800">Connect With Clubs</h1>
        <p className="text-gray-600 mt-2">Build relationships with football clubs worldwide through Futbol Connect</p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center mb-4">
            <Users size={24} className="text-blue-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Find Clubs</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Search for clubs by league, country, or specific needs. Connect directly with decision-makers.
          </p>
          <Link to="/join">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              Start Connecting
              <ChevronRight size={16} className="ml-1" />
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center mb-4">
            <Users size={24} className="text-blue-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Network</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Join our exclusive network to access opportunities and collaborate with top clubs.
          </p>
          <Link to="/join">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              Join Now
              <ChevronRight size={16} className="ml-1" />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ConnectClubs;