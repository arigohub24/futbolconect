import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LineChart, PieChart, BarChart } from 'lucide-react';


const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const stats = [
    { 
      title: "Clubs Using Platform", 
      value: "800+", 
      additional: "128 leagues",
      icon: <PieChart className="text-indigo-500" />,
      color: "bg-indigo-50 border-indigo-200"
    },
    { 
      title: "Deals Facilitated", 
      value: "7,500+", 
      additional: "↑ 12% this month",
      icon: <BarChart className="text-emerald-500" />,
      color: "bg-emerald-50 border-emerald-200"
    },
    { 
      title: "Players Available", 
      value: "10,000+", 
      additional: "Updated just now",
      icon: <LineChart className="text-amber-500" />,
      color: "bg-amber-50 border-amber-200"
    }
  ];

  const activities = [
    { action: "New player added", target: "Marcus Johnson", time: "5 minutes ago", status: "success" },
    { action: "Negotiation started", target: "FC Barcelona", time: "2 hours ago", status: "pending" },
    { action: "Contract proposal", target: "Milan AC", time: "Yesterday", status: "warning" },
    { action: "Deal completed", target: "Bayern Munich", time: "2 days ago", status: "success" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: { 
      scale: [1, 1.02, 1],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror"
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 md:p-8 max-w-7xl mx-auto"
      >
        <header className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-2"
          >
            Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600"
          >
            Welcome back! Here what happening with your network.
          </motion.p>
        </header>
        
        {/* Stats Overview */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
                }}
                className={`${stat.color} border rounded-xl p-6 shadow-sm cursor-pointer`}
                onClick={() => navigate(
                  index === 0 ? '/stats/clubs' : 
                  index === 1 ? '/stats/deals' : '/stats/players'
                )}
              >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                  <p className="text-gray-500 text-sm">{stat.additional}</p>
                </div>
                <div className="p-3 rounded-full bg-white shadow-sm">
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/recruitment')}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer transition-all"
            >
              <div className="p-3 rounded-lg bg-blue-50 inline-block mb-3">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Player Recruitment</h3>
              <p className="text-gray-600">Find better players for better prices</p>
              <div className="mt-4 flex items-center text-blue-600 font-medium">
                <span>Explore</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/outplacement')}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer transition-all"
            >
              <div className="p-3 rounded-lg bg-green-50 inline-block mb-3">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Player Outplacement</h3>
              <p className="text-gray-600">Maximize exposure for your players</p>
              <div className="mt-4 flex items-center text-green-600 font-medium">
                <span>Manage</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/marketplace')}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer transition-all"
            >
              <div className="p-3 rounded-lg bg-purple-50 inline-block mb-3">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Marketplace</h3>
              <p className="text-gray-600">Connect with 800+ clubs worldwide</p>
              <div className="mt-4 flex items-center text-purple-600 font-medium">
                <span>Browse</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          variants={pulseVariants}
          initial="initial"
          animate="pulse"
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
            <button 
              onClick={() => navigate('/activity')}
              className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center border-b border-gray-100 pb-4 last:border-0"
              >
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  activity.status === 'success' ? 'bg-green-500' : 
                  activity.status === 'pending' ? 'bg-blue-500' : 'bg-amber-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-gray-700">
                    <span className="font-medium">{activity.action}</span> with <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;