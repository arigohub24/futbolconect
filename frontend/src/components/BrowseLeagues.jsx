import { motion } from 'framer-motion';
import {  ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BrowseLeagues = () => {
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
        <h1 className="text-4xl font-bold text-gray-800">Browse All Leagues</h1>
        <p className="text-gray-600 mt-2">Explore football leagues from around the world on Futbol Connect</p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {leagues.map((league, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ 
              y: -5, 
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              scale: 1.03
            }}
            className={`${league.color} p-6 rounded-xl shadow-sm transition-all`}
          >
            <div className="flex items-center mb-4">
              <div className="text-4xl mr-3">{league.logo}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{league.name}</h3>
                <p className="text-gray-600">{league.country}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{league.clubs} clubs</p>
            <Link to="/connect-clubs">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center">
                Connect with Clubs
                <ChevronRight size={16} className="ml-1" />
              </button>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default BrowseLeagues;