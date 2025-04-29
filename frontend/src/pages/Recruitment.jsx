import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PlayerCard from '../components/PlayerCard';
import { Users, Clock, Globe } from 'lucide-react';

const Recruitment = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      title: "Access to 800+ clubs",
      description: "And 500 agencies worldwide",
      icon: Globe
    },
    {
      title: "Real-time information",
      description: "About 10,000 players",
      icon: Clock
    },
    {
      title: "Maximum market access",
      description: "Find better players for better prices",
      icon: Users
    }
  ];

  const players = [
    { id: 1, name: "Right Back", age: 24, club: "Top Tier Club", availability: "Loan/Sale" },
    { id: 2, name: "Creative Midfielder", age: 22, club: "European Club", availability: "Sale" },
    { id: 3, name: "Young Striker", age: 19, club: "Academy", availability: "Loan" }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="min-h-screen bg-gray-50 p-6 md:p-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 md:mb-0">
            Player Recruitment
          </h1>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 4px 10px rgba(0, 91, 234, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/create-search-advert')}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Create Search Advert
          </motion.button>
        </motion.div>

        {/* Benefits Section */}
        <motion.div 
          variants={containerVariants}
          className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8 border border-gray-100 hover:shadow-md transition-shadow duration-300"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-xl md:text-2xl font-semibold text-blue-900 mb-4"
          >
            Benefits of TransferRoom Recruitment
          </motion.h2>
          <motion.ul 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {benefits.map((benefit, index) => (
              <motion.li 
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 6px 12px rgba(0, 91, 234, 0.1)",
                  backgroundColor: "#EBF5FF"
                }}
                className="p-4 bg-blue-50 rounded-lg flex items-start transition-colors"
              >
                <benefit.icon className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Available Players Section */}
        <motion.div variants={containerVariants}>
          <motion.h2 
            variants={itemVariants}
            className="text-xl md:text-2xl font-semibold text-blue-900 mb-4"
          >
            Available Players
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {players.map((player, index) => (
              <motion.div 
                key={player.id}
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: "0 10px 20px rgba(0, 91, 234, 0.15)" }}
              >
                <PlayerCard 
                  player={player}
                  delay={index * 0.2}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Recruitment;