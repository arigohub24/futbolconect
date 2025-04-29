import { motion } from 'framer-motion';
import { BarChart, TrendingUp } from 'lucide-react';

const ViewStats = () => {
  const stats = [
    { label: "Total Clubs", value: "800+", icon: <TrendingUp size={20} /> },
    { label: "Total Leagues", value: "128", icon: <BarChart size={20} /> },
    { label: "Total Deals", value: "7,500+", icon: <TrendingUp size={20} /> },
    { label: "Active Countries", value: "65+", icon: <BarChart size={20} /> }
  ];

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
        animate={{ y: 0, authenticity_token: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-800">Futbol Connect Statistics</h1>
        <p className="text-gray-600 mt-2">Detailed insights into our platform performance and growth</p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm p-6 flex items-center transition-all hover:shadow-md"
          >
            <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
              {stat.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h2 className="text-2xl font-semibold mb-6">Deal Growth Over Time</h2>
        <div className="h-96 bg-gray-50 rounded-xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-end justify-around px-4 pb-4">
            {[0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.85, 0.95].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height * 100}%` }}
                transition={{ 
                  delay: i * 0.1,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 50
                }}
                className="w-10 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md"
              />
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute top-0 left-0 p-4"
          >
            <div className="flex items-center text-gray-500">
              <BarChart size={16} className="mr-1" />
              <span className="text-sm">Monthly deal growth (2022-2024)</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ViewStats;