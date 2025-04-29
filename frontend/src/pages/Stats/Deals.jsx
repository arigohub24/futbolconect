import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BarChart, ArrowLeft, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const DealsStats = () => {
  const navigate = useNavigate();

  const deals = [
    { id: 1, player: "Marcus Johnson", from: "Ajax", to: "Leicester City", status: "completed", value: "€15M" },
    { id: 2, player: "David Silva", from: "Real Sociedad", to: "Inter Miami", status: "completed", value: "Free" },
    { id: 3, player: "Luka Modric", from: "Real Madrid", to: "AC Milan", status: "pending", value: "€8M" },
    { id: 4, player: "Erling Haaland", from: "Dortmund", to: "Man City", status: "completed", value: "€60M" },
    { id: 5, player: "Kylian Mbappé", from: "PSG", to: "Real Madrid", status: "pending", value: "€120M" },
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
              <BarChart className="text-emerald-500" size={28} />
              Deals Facilitated
            </h1>
            <p className="text-gray-600">Detailed breakdown of transfers and negotiations</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-emerald-600">7,500+</div>
            <div className="text-gray-500 text-sm">Total Deals</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <TrendingUp className="text-emerald-500" size={20} />
              </div>
              <h3 className="text-lg font-semibold">Monthly Growth</h3>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-emerald-600">+12%</div>
              <p className="text-gray-500">Compared to last month</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <CheckCircle className="text-emerald-500" size={20} />
              </div>
              <h3 className="text-lg font-semibold">Completed Deals</h3>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-emerald-600">6,240</div>
              <p className="text-gray-500">83% success rate</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '83%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Clock className="text-emerald-500" size={20} />
              </div>
              <h3 className="text-lg font-semibold">Average Duration</h3>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-emerald-600">14 days</div>
              <p className="text-gray-500">From initial contact to completion</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Deals</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {deals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{deal.player}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{deal.from}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{deal.to}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{deal.value}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        deal.status === 'completed' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {deal.status}
                      </span>
                    </td>
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

export default DealsStats;