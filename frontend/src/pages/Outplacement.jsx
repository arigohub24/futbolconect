import { motion } from 'framer-motion';
import { Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Outplacement = () => {
  const benefits = [
    {
      title: "Appeal to many buyers",
      description: "Maximize exposure for your players",
      icon: Users
    },
    {
      title: "Receive direct enquiries",
      description: "From interested clubs",
      icon: ArrowRight
    },
    {
      title: "Market demand insights",
      description: "Understand what clubs are looking for",
      icon: CheckCircle
    },
    {
      title: "Pitch directly",
      description: "To club decision-makers",
      icon: Users
    }
  ];

  const players = [
    {
      id: 1,
      name: "John Doe",
      position: "Forward",
      age: 24,
      club: "City Strikers",
      status: "Available",
      enquiries: 5
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Midfielder",
      age: 22,
      club: "Global United",
      status: "Available",
      enquiries: 3
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "Defender",
      age: 27,
      club: "FC Elite",
      status: "Available",
      enquiries: 7
    }
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
            Player Outplacement
          </h1>
          <Link to="/make-player-available">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 4px 10px rgba(0, 91, 234, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Make Player Available
            </motion.button>
          </Link>
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
          Futbol Conect Player Outplacement
        </motion.h2>
          <motion.ul 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {benefits.map((benefit, index) => (
              <motion.li 
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03, 
                  backgroundColor: "#EBF5FF",
                  transition: { duration: 0.2 }
                }}
                className="p-4 bg-blue-50 rounded-lg flex items-start"
              >
                <benefit.icon className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Player Listing Section */}
        <motion.div 
          variants={containerVariants}
          className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100 hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex justify-between items-center mb-4">
            <motion.h2 
              variants={itemVariants}
              className="text-xl md:text-2xl font-semibold text-blue-900"
            >
              Available Players
            </motion.h2>
            <Link to="/available-players">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View All
              </motion.button>
            </Link>
          </div>
          <motion.div 
            variants={containerVariants}
            className="space-y-4"
          >
            {players.map((player) => (
              <motion.div
                key={player.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -4, 
                  boxShadow: "0 6px 12px rgba(0, 91, 234, 0.1)",
                  backgroundColor: "#F9FAFB"
                }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold">
                      {player.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">{player.name}</p>
                    <p className="text-sm text-gray-600">
                      {player.position} | {player.age} | {player.club}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                      {player.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">{player.enquiries} Enquiries</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Outplacement;