import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy,  Star, Award,  } from 'lucide-react';
import { useState } from 'react';

const OkakaPlayerProfile = ({ player, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'stats', label: 'Statistics' },
    { id: 'history', label: 'History' },
    { id: 'achievements', label: 'Achievements' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="relative h-64 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-xl overflow-hidden">
          <img
            src={player.image}
            alt={player.name}
            className="w-full h-full object-cover opacity-50"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${player.name.replace(' ', '+')}&background=random&size=400`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-end gap-6">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${player.name.replace(' ', '+')}&background=random&size=400`;
                  }}
                />
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-1">{player.name}</h1>
                <div className="flex items-center gap-4 text-white/80">
                  <span className="flex items-center">
                    <span className="mr-2">#{player.number}</span>
                    <span>{player.position}</span>
                  </span>
                  <span className="flex items-center">
                    <span className="mr-2">{player.flag}</span>
                    <span>{player.nationality}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-4 border-b mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 px-1 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Age</div>
                    <div className="font-semibold">{player.age}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Height</div>
                    <div className="font-semibold">{player.height}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Weight</div>
                    <div className="font-semibold">{player.weight}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Joined</div>
                    <div className="font-semibold">{player.joined}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">About</h3>
                  <p className="text-gray-600">{player.bio}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Current Season</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-sm text-blue-600 mb-1">Appearances</div>
                      <div className="text-2xl font-bold text-blue-700">{player.stats.appearances}</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-sm text-blue-600 mb-1">Goals</div>
                      <div className="text-2xl font-bold text-blue-700">{player.stats.goals}</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-sm text-blue-600 mb-1">Assists</div>
                      <div className="text-2xl font-bold text-blue-700">{player.stats.assists}</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-sm text-blue-600 mb-1">Rating</div>
                      <div className="text-2xl font-bold text-blue-700">{player.stats.rating}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Performance Stats</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Passing Accuracy</span>
                          <span className="text-sm font-medium">85%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-blue-600 rounded-full" style={{ width: '85%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Shot Accuracy</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-blue-600 rounded-full" style={{ width: '78%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Dribbling Success</span>
                          <span className="text-sm font-medium">82%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-blue-600 rounded-full" style={{ width: '82%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Match Stats</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Minutes Played</span>
                        <span className="font-medium">3,240</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Yellow Cards</span>
                        <span className="font-medium">3</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Red Cards</span>
                        <span className="font-medium">0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Fouls Committed</span>
                        <span className="font-medium">12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Career History</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold">OK</span>
                      </div>
                      <div>
                        <div className="font-medium">Okaka FC</div>
                        <div className="text-sm text-gray-500">2020 - Present</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Joined as a key signing and quickly established himself as a fan favorite
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-600 font-bold">PC</span>
                      </div>
                      <div>
                        <div className="font-medium">Previous Club</div>
                        <div className="text-sm text-gray-500">2018 - 2020</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Made significant contributions to the teams success
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'achievements' && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Team Achievements</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        <div>
                          <div className="font-medium">League Champions</div>
                          <div className="text-sm text-gray-500">2022</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        <div>
                          <div className="font-medium">Cup Winners</div>
                          <div className="text-sm text-gray-500">2021</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Individual Awards</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-blue-500" />
                        <div>
                          <div className="font-medium">Player of the Season</div>
                          <div className="text-sm text-gray-500">2022</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <div>
                          <div className="font-medium">Top Scorer</div>
                          <div className="text-sm text-gray-500">2022</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OkakaPlayerProfile; 