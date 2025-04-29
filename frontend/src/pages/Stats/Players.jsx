import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LineChart, ArrowLeft, User, Target, Award } from 'lucide-react';

const PlayersStats = () => {
  const navigate = useNavigate();

  const positions = [
    { name: "Goalkeeper", count: 1200, percentage: "12%" },
    { name: "Defender", count: 3200, percentage: "32%" },
    { name: "Midfielder", count: 3500, percentage: "35%" },
    { name: "Forward", count: 2100, percentage: "21%" },
  ];

  const topPlayers = [
    { name: "Kylian Mbappé", age: 24, position: "Forward", value: "€180M" },
    { name: "Erling Haaland", age: 23, position: "Forward", value: "€170M" },
    { name: "Vinicius Junior", age: 23, position: "Forward", value: "€150M" },
    { name: "Jude Bellingham", age: 20, position: "Midfielder", value: "€120M" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <LineChart className="text-amber-500" size={28} />
              Players Available
            </h1>
            <p className="text-gray-600">Detailed breakdown of player database</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-amber-600">10,000+</div>
            <div className="text-gray-500 text-sm">Total Players</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-50 rounded-lg">
                <User className="text-amber-500" size={20} />
              </div>
              <h3 className="text-lg font-semibold">By Position</h3>
            </div>
            <div className="space-y-3">
              {positions.map((pos, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span>{pos.name}</span>
                    <span className="font-medium">{pos.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-amber-500 h-2 rounded-full" 
                      style={{ width: pos.percentage }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-50 rounded-lg">
                <Target className="text-amber-500" size={20} />
              </div>
              <h3 className="text-lg font-semibold">Top Targets</h3>
            </div>
            <div className="space-y-4">
              {topPlayers.map((player, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-sm font-medium">
                    {player.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{player.name}</p>
                    <p className="text-gray-500 text-sm">{player.position}, {player.age} years</p>
                  </div>
                  <div className="font-bold text-amber-600">{player.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-50 rounded-lg">
                <Award className="text-amber-500" size={20} />
              </div>
              <h3 className="text-lg font-semibold">Market Value</h3>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-amber-600">€4.2B</div>
              <p className="text-gray-500">Total estimated value</p>
              <div className="flex justify-between text-sm mt-4">
                <div>
                  <div className="font-medium">Average</div>
                  <div className="text-amber-600">€420K</div>
                </div>
                <div>
                  <div className="font-medium">Highest</div>
                  <div className="text-amber-600">€180M</div>
                </div>
                <div>
                  <div className="font-medium">Median</div>
                  <div className="text-amber-600">€2.5M</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Recently Added Players</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Club</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { name: "Marcus Johnson", age: 22, position: "Midfielder", club: "Ajax", value: "€15M" },
                  { name: "Luka Modric", age: 37, position: "Midfielder", club: "Real Madrid", value: "€8M" },
                  { name: "Erling Haaland", age: 23, position: "Forward", club: "Man City", value: "€170M" },
                  { name: "Virgil van Dijk", age: 32, position: "Defender", club: "Liverpool", value: "€45M" },
                ].map((player, index) => (
                  <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{player.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{player.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{player.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{player.club}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-amber-600">{player.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlayersStats;