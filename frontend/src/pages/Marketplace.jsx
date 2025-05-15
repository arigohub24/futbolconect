import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, ChevronRight, Globe, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Marketplace = () => {
  const [activeLeague, setActiveLeague] = useState(null);
  const [dealStats, setDealStats] = useState({ totalDeals: 0 });
  
  const leagues = [
    { name: "Premier League", country: "England", clubs: 20, logo: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", color: "bg-blue-100" },
    { name: "MLS", country: "USA/Canada", clubs: 29, logo: "🇺🇸", color: "bg-red-100" },
    { name: "Liga MX", country: "Mexico", clubs: 18, logo: "🇲🇽", color: "bg-green-100" },
    { name: "J-League", country: "Japan", clubs: 20, logo: "🇯🇵", color: "bg-purple-100" },
    { name: "Ligue 1", country: "France", clubs: 18, logo: "🇫🇷", color: "bg-indigo-100" },
    { name: "Superliga", country: "Denmark", clubs: 12, logo: "🇩🇰", color: "bg-pink-100" },
    { name: "Serie A", country: "Italy", clubs: 20, logo: "🇮🇹", color: "bg-teal-100" },
    { name: "La Liga", country: "Spain", clubs: 20, logo: "🇪🇸", color: "bg-orange-100" },
    { name: "Bundesliga", country: "Germany", clubs: 18, logo: "🇩🇪", color: "bg-gray-100" },
    { name: "Eredivisie", country: "Netherlands", clubs: 18, logo: "🇳🇱", color: "bg-amber-100" },
    { name: "Primeira Liga", country: "Portugal", clubs: 18, logo: "🇵🇹", color: "bg-emerald-100" },
    { name: "Saudi Pro League", country: "Saudi Arabia", clubs: 18, logo: "🇸🇦", color: "bg-lime-100" },
    { name: "Brasileirão", country: "Brazil", clubs: 20, logo: "🇧🇷", color: "bg-yellow-100" },
    { name: "A-League", country: "Australia", clubs: 12, logo: "🇦🇺", color: "bg-cyan-100" },
    { name: "K League 1", country: "South Korea", clubs: 12, logo: "🇰🇷", color: "bg-violet-100" },
    { name: "Chinese Super League", country: "China", clubs: 16, logo: "🇨🇳", color: "bg-rose-100" }
  ];
  
  const stats = [
    { value: "800+", label: "Clubs", icon: <Users size={20} /> },
    { value: "128", label: "Leagues", icon: <Globe size={20} /> },
    { value: "7,500+", label: "Deals", icon: <TrendingUp size={20} /> }
  ];

  useEffect(() => {
    let count = 0;
    const target = 7500;
    const increment = 75;
    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }
      setDealStats({ totalDeals: count });
    }, 30);
    
    return () => clearInterval(timer);
  }, []);

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
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-800">futbol conect Marketplace</h1>
        <div className="flex space-x-2">
          <Link to="/browse-leagues">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow text-gray-700 flex items-center"
            >
              <span>Browse All Leagues</span>
              <ChevronRight size={16} className="ml-1" />
            </motion.button>
          </Link>
          <Link to="/connect-clubs">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:shadow hover:bg-blue-700 flex items-center"
            >
              <span>Connect With Clubs</span>
              <ChevronRight size={16} className="ml-1" />
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
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
        className="mb-8 bg-white rounded-xl shadow-sm p-6 overflow-x-auto"
      >
        <h2 className="text-2xl font-semibold mb-6">Top Leagues on futbol conect</h2>
        <div className="flex space-x-4 pb-4">
          {leagues.map((league, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                scale: 1.03
              }}
              onClick={() => setActiveLeague(activeLeague === index ? null : index)}
              className={`${league.color} p-5 rounded-xl text-center cursor-pointer transition-all min-w-[200px] ${activeLeague === index ? 'ring-2 ring-blue-500' : ''}`}
            >
              <div className="text-3xl mb-2">{league.logo}</div>
              <h3 className="font-medium text-gray-800">{league.name}</h3>
              <p className="text-gray-600 text-sm">{league.country}</p>
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: activeLeague === index ? 'auto' : 0,
                  opacity: activeLeague === index ? 1 : 0
                }}
                className="mt-2 overflow-hidden"
              >
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="font-medium">{league.clubs} clubs</p>
                  <Link to="/browse-leagues">
                    <button className="mt-2 text-xs text-blue-600 hover:text-blue-700">
                      View Details
                    </button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Deals Facilitated on futbol conect</h2>
          <div className="text-3xl font-bold text-blue-600">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {dealStats.totalDeals.toLocaleString()}+
            </motion.span>
          </div>
        </div>
        
        <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-end justify-around px-4 pb-4">
            {[0.3, 0.5, 0.4, 0.7, 0.6, 0.8, 0.75, 0.9].map((height, i) => (
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
                className="w-12 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md"
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
              <span className="text-sm">Quarterly growth (2022-2024)</span>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-4 flex justify-center space-x-6">
          <Link to="/view-stats">
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
            >
              View All Stats
            </motion.button>
          </Link>
          <Link to="/join">
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
            >
              Join futbol conect
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Marketplace;