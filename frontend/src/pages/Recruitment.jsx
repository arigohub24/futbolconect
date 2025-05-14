import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
    {
      id: 6,
      name: "Rotimi Nicol",
      position: "Attacking Midfielder",
      age: 19,
      club: "Okaka FC",
      nationality: "Nigeria",
      flag: "🇳🇬",
      status: "Available",
      contractEnd: "2025-06-30",
      enquiries: 15,
      starred: true,
      stats: {
        goals: 45,
        assists: 30,
        rating: 9.2
      },
      image: "/rotimi.png",
      contact: {
        email: "rotimi.nicol@okakafc.com",
        phone: "+234 678 901 2345",
        location: "Lagos, Nigeria"
      }
    },
    {
      id: 4,
      name: "Chisom Agbodike",
      position: "Attacking Midfielder",
      age: 17,
      club: "Okaka FC",
      nationality: "Nigeria",
      flag: "🇳🇬",
      status: "Available",
      contractEnd: "2025-06-30",
      enquiries: 8,
      starred: true,
      stats: {
        goals: 7,
        assists: 12,
        rating: 8.2
      },
      image: "/player1.png",
      contact: {
        email: "chisom.agbodike@okakafc.com",
        phone: "+234 456 789 0123",
        location: "Lagos, Nigeria"
      }
    },
    {
      id: 5,
      name: "Emmanuell Bright",
      position: "Striker",
      age: 14,
      club: "Okaka FC",
      nationality: "Nigeria",
      flag: "🇳🇬",
      status: "Available",
      contractEnd: "2025-06-30",
      enquiries: 12,
      starred: true,
      stats: {
        goals: 15,
        assists: 4,
        rating: 8.5
      },
      image: "/player2.png",
      contact: {
        email: "emmanuell.bright@okakafc.com",
        phone: "+234 567 890 1234",
        location: "Lagos, Nigeria"
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        delay: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 w-full"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-between items-center py-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4 sm:mb-0">
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="p-3 rounded-lg bg-blue-50 inline-block mb-4">
                <benefit.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Available Players Section */}
        <motion.div variants={containerVariants}>
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-blue-900">
                Available Players
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/available-players')}
                className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors flex items-center"
              >
                View All
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {players.slice(0, 3).map((player) => (
                <motion.div
                  key={player.id}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    boxShadow: "0 10px 20px rgba(0, 91, 234, 0.15)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-blue-200 transition-all group"
                >
                  <div className="relative">
                    <div className="h-48 bg-white relative overflow-hidden flex items-center justify-center">
                      <div className="h-full w-full flex items-center justify-center">
                        <img 
                          src={player.image} 
                          alt={player.name}
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${player.name.replace(' ', '+')}&background=random&size=400`;
                          }}
                        />
                      </div>
                    </div>
                    <div className="absolute -bottom-10 left-4">
                      <div className="w-20 h-20 bg-white rounded-full border-4 border-white flex items-center justify-center text-blue-600 font-bold text-xl relative overflow-hidden">
                        <div className="h-full w-full flex items-center justify-center">
                          <img 
                            src={player.image} 
                            alt={player.name} 
                            className="h-full w-full object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${player.name.replace(' ', '+')}&background=random&size=400`;
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-12 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">{player.name}</h3>
                      <span className="text-2xl">{player.flag}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <span className="mr-3">{player.position}</span>
                      <span className="mr-3">•</span>
                      <span>{player.age} years</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        {player.club}
                      </span>
                      <span className="px-2 py-1 bg-gray-50 text-gray-700 rounded-full text-xs font-medium">
                        {player.nationality}
                      </span>
                      <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                        {player.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Goals</div>
                        <div className="font-bold text-blue-600">{player.stats.goals || 0}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Assists</div>
                        <div className="font-bold text-blue-600">{player.stats.assists || 0}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Rating</div>
                        <div className="font-bold text-blue-600">{player.stats.rating?.toFixed(1) || 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Recruitment;