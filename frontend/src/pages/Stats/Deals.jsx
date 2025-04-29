import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BarChart, ArrowLeft, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const DealsStats = () => {
  const navigate = useNavigate();
  
  const deals = [
    { player: "Marcus Johnson", from: "Ajax", to: "Leicester City", status: "completed", value: "€15M" },
    { player: "David Silva", from: "Real Sociedad", to: "Inter Miami", status: "completed", value: "Free" },
    { player: "Luka Modric", from: "Real Madrid", to: "AC Milan", status: "pending", value: "€8M" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800 p-6"
    >
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.6 }}
      >
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition">
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
      </motion.header>

      {/* Main Stats */}
      <main className="max-w-7xl mx-auto">
        {/* Animated Title */}
        <motion.h1 
          className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-4"
          initial={{ scale: 0.9 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.6 }}
        >
          <BarChart className="text-emerald-500" size={28} /> Deals Facilitated
        </motion.h1>

        {/* Animated Statistics Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Monthly Growth", value: "+12%", icon: <TrendingUp />, barWidth: '72%' },
            { title: "Completed Deals", value: "6,240", icon: <CheckCircle />, barWidth: '83%' },
            { title: "Avg Duration", value: "14 days", icon: <Clock />, barWidth: '60%' },
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-50 rounded-lg">{stat.icon}</div>
                <h3 className="text-lg font-semibold">{stat.title}</h3>
              </div>
              <div className="text-2xl font-bold text-emerald-600">{stat.value}</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <motion.div className="bg-emerald-500 h-2 rounded-full" style={{ width: stat.barWidth }} animate={{ width: [0, stat.barWidth] }} transition={{ duration: 1 }}></motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* Deals List */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Deals</h2>
          <div className="space-y-4">
            {deals.map((deal, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{deal.player}</h3>
                  <p className="text-sm text-gray-600">{deal.from} → {deal.to}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${deal.status === 'completed' ? 'text-emerald-600' : 'text-yellow-600'}`}>
                    {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                  </p>
                  <p className="text-lg font-bold">{deal.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </motion.div>
  );
};

export default DealsStats;
