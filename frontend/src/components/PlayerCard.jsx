import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PlayerCard = ({ player, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -8,
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const statsVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: delay + 0.2,
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  const getAvailabilityColor = (status) => {
    if (status.toLowerCase().includes('available')) return 'bg-green-100 text-green-800 border-green-200';
    if (status.toLowerCase().includes('limited')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  // Format price with € symbol and millions
  const formatPrice = (price) => {
    if (!price) return 'Undisclosed';
    if (price >= 1000000) {
      return `€${(price / 1000000).toFixed(1)}M`;
    }
    if (price >= 1000) {
      return `€${(price / 1000).toFixed(0)}K`;
    }
    return `€${price}`;
  };

  // Generate a placeholder image URL based on player name
  const getPlayerImage = () => {
    if (player.image) return player.image;
    return `https://source.unsplash.com/random/300x300/?soccer,player,${player.name.split(' ')[0]}`;
  };

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={cardVariants}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsExpanded(true)}
        className="bg-gradient-to-b from-white to-blue-50 rounded-xl shadow-md overflow-hidden border border-blue-100 cursor-pointer transition-transform"
      >
        {/* Decorative header line */}
        <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-400"></div>

        <div className="p-5 relative">
          {/* Player avatar - now using generated image */}
          <div className="absolute right-5 top-5 w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-inner overflow-hidden border-2 border-white">
            <img 
              src={getPlayerImage()} 
              alt={player.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${player.name.replace(' ', '+')}&background=random`;
              }}
            />
          </div>

          <h3 className="text-xl font-bold text-blue-900 pr-20">{player.name}</h3>
          
          {/* Price tag - shown only if price exists */}
          {player.price && (
            <div className="mt-1 text-sm font-semibold text-blue-600">
              {formatPrice(player.price)}
            </div>
          )}

          <div className="flex flex-col mt-3 space-y-2">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Age: {player.age}</span>
            </div>

            <div className="flex items-center">
              <svg className="w-4 h-4 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">{player.club}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(player.availability)}`}>
              <span
                className={`w-2 h-2 rounded-full mr-1 ${
                  player.availability.toLowerCase().includes('available')
                    ? 'bg-green-500'
                    : player.availability.toLowerCase().includes('limited')
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
              ></span>
              {player.availability}
            </span>
          </div>

          {/* Stats that appear on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                variants={statsVariants}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, scale: 0.8 }}
                className="mt-4 grid grid-cols-3 gap-2 text-center"
              >
                {player.stats && player.stats.map((stat, idx) => (
                  <div key={idx} className="bg-white bg-opacity-60 rounded-lg p-2 shadow-sm">
                    <p className="text-xs text-blue-500">{stat.label}</p>
                    <p className="font-bold text-blue-900">{stat.value}</p>
                  </div>
                ))}

                {/* If no stats provided, show placeholders */}
                {(!player.stats || player.stats.length === 0) && (
                  <>
                    <div className="bg-white bg-opacity-60 rounded-lg p-2 shadow-sm">
                      <p className="text-xs text-blue-500">Goals</p>
                      <p className="font-bold text-blue-900">12</p>
                    </div>
                    <div className="bg-white bg-opacity-60 rounded-lg p-2 shadow-sm">
                      <p className="text-xs text-blue-500">Assists</p>
                      <p className="font-bold text-blue-900">8</p>
                    </div>
                    <div className="bg-white bg-opacity-60 rounded-lg p-2 shadow-sm">
                      <p className="text-xs text-blue-500">Rating</p>
                      <p className="font-bold text-blue-900">7.4</p>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-blue-50 px-5 py-3 flex justify-between items-center border-t border-blue-100">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="flex space-x-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-500 hover:text-blue-600"
            >
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-500 hover:text-blue-600"
            >
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#2563EB' }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm flex items-center"
          >
            View Profile
            <motion.svg
              animate={{ x: isHovered ? 4 : 0 }}
              className="ml-1 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </motion.svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Expanded Player Details Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsExpanded(false)}
                  className="absolute right-4 top-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-800 z-10"
                >
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>

                {/* Player Image */}
                <div className="h-64 bg-gradient-to-b from-blue-200 to-blue-100 flex items-center justify-center overflow-hidden relative">
                  <img
                    src={getPlayerImage()}
                    alt={player.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${player.name.replace(' ', '+')}&background=random&size=400`;
                    }}
                  />
                  {/* Price overlay */}
                  {player.price && (
                    <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {formatPrice(player.price)}
                    </div>
                  )}
                </div>

                {/* Player Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-blue-900 mb-1">{player.name}</h2>
                      <p className="text-blue-600 font-medium">{player.position || 'Not specified'}</p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(player.availability)}`}>
                      {player.availability}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 my-6">
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="font-medium text-blue-900">{player.age}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Current Club</p>
                      <p className="font-medium text-blue-900">{player.club}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nationality</p>
                      <p className="font-medium text-blue-900">{player.nationality || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Preferred Foot</p>
                      <p className="font-medium text-blue-900">{player.foot || 'Right'}</p>
                    </div>
                  </div>

                  {/* Former Clubs */}
                  {player.formerClubs && player.formerClubs.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">Former Clubs</h3>
                      <div className="flex flex-wrap gap-2">
                        {player.formerClubs.map((club, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                            {club}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Representation */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Agent/Agency</p>
                      <p className="font-medium text-blue-900">
                        {player.agency || (player.agent ? `${player.agent.name} (${player.agent.agency})` : 'Not specified')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Youth Academy</p>
                      <p className="font-medium text-blue-900">{player.academy || 'Not specified'}</p>
                    </div>
                  </div>

                  {/* Additional Stats */}
                  <div className="border-t border-gray-100 pt-4 mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Performance Stats</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {player.stats && player.stats.length > 0 ? (
                        player.stats.map((stat, idx) => (
                          <div key={idx} className="text-center bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">{stat.label}</p>
                            <p className="font-bold text-blue-900 text-xl">{stat.value}</p>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="text-center bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Goals</p>
                            <p className="font-bold text-blue-900 text-xl">12</p>
                          </div>
                          <div className="text-center bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Assists</p>
                            <p className="font-bold text-blue-900 text-xl">8</p>
                          </div>
                          <div className="text-center bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Rating</p>
                            <p className="font-bold text-blue-900 text-xl">7.4</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Player Bio</h3>
                    <p className="text-gray-600">
                      {player.bio || `${player.name} is a talented footballer who has shown exceptional performance in recent seasons. ${player.formerClubs && player.formerClubs.length > 0 ? `Previously played for ${player.formerClubs.join(', ')}.` : ''}`}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-100 sticky bottom-0">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium"
                    onClick={() => setIsExpanded(false)}
                  >
                    Close
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Contact {player.agent ? player.agent.name : 'Agent'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PlayerCard;