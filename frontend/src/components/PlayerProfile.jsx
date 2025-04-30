import { motion } from 'framer-motion';
import { useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, User, Calendar, MapPin, Activity, Mail, Trophy, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const PlayerProfile = () => {
  // Get player data from location state or params
  const { id } = useParams();
  const { state } = useLocation();

  // Fallback player data matching Outplacement structure with additional details
  const player = state?.player || {
    id: id,
    name: "John Doe",
    position: "Forward",
    age: 24,
    club: "City Strikers",
    status: "Available",
    enquiries: 5,
    nationality: "British",
    height: "185 cm",
    weight: "78 kg",
    preferredFoot: "Right",
    contractEnd: "June 2025",
    bio: "A dynamic forward with a keen eye for goal, John has consistently performed at a high level in competitive leagues. Known for his speed, agility, and clinical finishing.",
    achievements: ["League Top Scorer 2023", "Player of the Month - March 2024"],
    stats: {
      appearances: 45,
      goals: 22,
      assists: 8
    }
  };

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
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between mb-8"
        >
          <Link to="/outplacement">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Outplacement
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 4px 10px rgba(0, 91, 234, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Contact Player
          </motion.button>
        </motion.div>

        {/* Player Info Section */}
        <motion.div
          variants={containerVariants}
          className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100 hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
            <motion.div
              variants={itemVariants}
              className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6"
            >
              <span className="text-blue-600 text-3xl font-semibold">
                {player.name.charAt(0)}
              </span>
            </motion.div>
            <div>
              <motion.h1
                variants={itemVariants}
                className="text-2xl md:text-3xl font-bold text-blue-900"
              >
                {player.name}
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-gray-600 text-sm md:text-base"
              >
                {player.position} | {player.club}
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="mt-2"
              >
                <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                  {player.status}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Player Details */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6"
          >
            <motion.div variants={itemVariants} className="flex items-center">
              <User className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium text-blue-900">{player.age}</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center">
              <MapPin className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Nationality</p>
                <p className="font-medium text-blue-900">{player.nationality}</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center">
              <Calendar className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Contract Ends</p>
                <p className="font-medium text-blue-900">{player.contractEnd}</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center">
              <Activity className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Preferred Foot</p>
                <p className="font-medium text-blue-900">{player.preferredFoot}</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center">
              <User className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Height</p>
                <p className="font-medium text-blue-900">{player.height}</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center">
              <User className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Weight</p>
                <p className="font-medium text-blue-900">{player.weight}</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center">
              <Mail className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Enquiries</p>
                <p className="font-medium text-blue-900">{player.enquiries}</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center">
              <Shield className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Current Club</p>
                <p className="font-medium text-blue-900">{player.club}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="mt-8"
          >
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Player Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-500">Appearances</p>
                <p className="font-medium text-blue-900">{player.stats?.appearances || 'N/A'}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-500">Goals</p>
                <p className="font-medium text-blue-900">{player.stats?.goals || 'N/A'}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-500">Assists</p>
                <p className="font-medium text-blue-900">{player.stats?.assists || 'N/A'}</p>
              </div>
            </div>
          </motion.div>

          {/* Achievements Section */}
          {player.achievements && player.achievements.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mt-8"
            >
              <h2 className="text-xl font-semibold text-blue-900 mb-4">Achievements</h2>
              <ul className="space-y-2">
                {player.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-center">
                    <Trophy className="h-5 w-5 text-blue-600 mr-3" />
                    <p className="text-gray-600">{achievement}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Bio Section */}
          <motion.div
            variants={itemVariants}
            className="mt-8"
          >
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Player Bio</h2>
            <p className="text-gray-600 leading-relaxed">{player.bio}</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PlayerProfile;