import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { BarChart } from 'lucide-react';
import StatsCard from './StatsCard';

const ViewStats = () => {
  const [hoveredBar, setHoveredBar] = useState(null);
  const controls = useAnimation();

  const stats = [
    { label: "Total Clubs", value: "800+", additional: "+12% MoM", color: "blue", icon: <BarChart size={20} /> },
    { label: "Total Leagues", value: "128", additional: "+8% MoM", color: "green", icon: <BarChart size={20} /> },
    { label: "Total Deals", value: "7500+", additional: "+15% MoM", color: "purple", icon: <BarChart size={20} /> },
    { label: "Active Countries", value: "65+", additional: "+5% MoM", color: "blue", icon: <BarChart size={20} /> }
  ];

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  // Animation variants for chart bars
  const barVariants = {
    initial: { height: 0, opacity: 0 },
    animate: (i) => ({
      height: `${i * 100}%`,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }),
    hover: {
      scaleY: 1.05,
      transition: { duration: 0.2 }
    }
  };

  // Chart data
  const chartData = [
    { month: "Jan", value: 0.2, deals: 500 },
    { month: "Feb", value: 0.3, deals: 750 },
    { month: "Mar", value: 0.4, deals: 1000 },
    { month: "Apr", value: 0.5, deals: 1250 },
    { month: "May", value: 0.6, deals: 1500 },
    { month: "Jun", value: 0.7, deals: 1750 },
    { month: "Jul", value: 0.8, deals: 2000 },
    { month: "Aug", value: 0.9, deals: 2250 },
    { month: "Sep", value: 0.85, deals: 2125 },
    { month: "Oct", value: 0.95, deals: 2375 }
  ];

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen"
    >
      {/* Header Section */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="mb-12 text-center"
      >
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          futbol conect Insights
        </h1>
        <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
          Real-time analytics showcasing our platform growth and performance
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.label}
            value={stat.value}
            additional={stat.additional}
            delay={index * 0.2}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </motion.div>

      {/* Chart Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
      >
        <motion.h2 
          variants={containerVariants}
          className="text-2xl font-semibold text-gray-900 mb-6"
        >
          Deal Growth Over Time
        </motion.h2>
        <div className="h-[400px] bg-gray-50 rounded-xl relative overflow-hidden">
          <motion.div 
            className="absolute inset-0 flex items-end justify-around px-4 pb-4"
            variants={containerVariants}
          >
            {chartData.map((data, i) => (
              <motion.div
                key={i}
                custom={data.value}
                variants={barVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                onHoverStart={() => setHoveredBar(i)}
                onHoverEnd={() => setHoveredBar(null)}
                className="w-12 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md relative cursor-pointer"
              >
                {/* Tooltip */}
                {hoveredBar === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -10 }}
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg"
                  >
                    <span>{data.month}: {data.deals} deals</span>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 border-4 border-transparent border-t-gray-800" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
          
          {/* Chart Legend */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute top-4 left-4"
          >
            <div className="flex items-center text-gray-600 bg-white/80 rounded-lg px-3 py-1.5 backdrop-blur-sm">
              <BarChart size={16} className="mr-1.5" />
              <span className="text-sm font-medium">Monthly deal growth (2022-2024)</span>
            </div>
          </motion.div>

          {/* Grid Lines */}
          <div className="absolute inset-0">
            {[0.25, 0.5, 0.75].map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 0.5 }}
                className="absolute w-full border-t border-gray-200"
                style={{ bottom: `${line * 100}%` }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ViewStats;