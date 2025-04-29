import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PieChart, ArrowLeft, Users, Globe } from 'lucide-react';

const ClubsStats = () => {
  const navigate = useNavigate();

  const leagues = [
    { name: "Premier League", clubs: 20, country: "England" },
    { name: "La Liga", clubs: 20, country: "Spain" },
    { name: "Bundesliga", clubs: 18, country: "Germany" },
    { name: "Serie A", clubs: 20, country: "Italy" },
    { name: "Ligue 1", clubs: 20, country: "France" },
    { name: "MLS", clubs: 29, country: "USA/Canada" },
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
              <PieChart className="text-indigo-500" size={28} />
              Clubs Using Platform
            </h1>
            <p className="text-gray-600">Detailed breakdown of clubs and leagues</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-indigo-600">800+</div>
            <div className="text-gray-500 text-sm">Total Clubs</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Users className="text-indigo-500" size={20} />
              </div>
              <h3 className="text-lg font-semibold">Top Leagues</h3>
            </div>
            <div className="space-y-4">
              {leagues.slice(0, 3).map((league, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{league.name}</p>
                    <p className="text-gray-500 text-sm">{league.country}</p>
                  </div>
                  <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                    {league.clubs} clubs
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Globe className="text-indigo-500" size={20} />
              </div>
              <h3 className="text-lg font-semibold">Global Distribution</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Europe</span>
                <span className="font-medium">72%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>

              <div className="flex justify-between">
                <span>Americas</span>
                <span className="font-medium">18%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-400 h-2 rounded-full" style={{ width: '18%' }}></div>
              </div>

              <div className="flex justify-between">
                <span>Asia</span>
                <span className="font-medium">7%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-300 h-2 rounded-full" style={{ width: '7%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Users className="text-indigo-500" size={20} />
              </div>
              <h3 className="text-lg font-semibold">Recent Additions</h3>
            </div>
            <div className="space-y-4">
              {['Celtic FC', 'Flamengo', 'Al Hilal', 'LA Galaxy'].map((club, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-sm font-medium">
                    {club.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{club}</p>
                    <p className="text-gray-500 text-sm">Joined 2 weeks ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">All Leagues</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">League</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clubs</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Deals</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leagues.map((league, index) => (
                  <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{league.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{league.country}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{league.clubs}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{Math.floor(Math.random() * 50) + 10}</td>
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

export default ClubsStats;