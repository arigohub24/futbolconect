import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Activity = () => {
  const navigate = useNavigate();
  
  const activities = [
    { id: 1, action: "New player added", target: "Marcus Johnson", time: "5 minutes ago", status: "success" },
    { id: 2, action: "Negotiation started", target: "FC Barcelona", time: "2 hours ago", status: "pending" },
    { id: 3, action: "Contract proposal", target: "Milan AC", time: "Yesterday", status: "warning" },
    { id: 4, action: "Deal completed", target: "Bayern Munich", time: "2 days ago", status: "success" },
    { id: 5, action: "Player scouted", target: "Luka Modric", time: "3 days ago", status: "success" },
    { id: 6, action: "Transfer rejected", target: "PSG", time: "1 week ago", status: "warning" },
    { id: 7, action: "Offer received", target: "Chelsea FC", time: "1 week ago", status: "pending" }
  ];

  const statusColors = {
    success: 'bg-green-100 text-green-800',
    pending: 'bg-blue-100 text-blue-800',
    warning: 'bg-amber-100 text-amber-800'
  };

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
            <h1 className="text-3xl font-bold text-gray-800">Activity Log</h1>
            <p className="text-gray-600">All recent activities in your network</p>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header - Hide on mobile */}
          <div className="hidden md:grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-100 text-sm font-medium text-gray-500">
            <div className="col-span-1">Status</div>
            <div className="col-span-5">Activity</div>
            <div className="col-span-4">Target</div>
            <div className="col-span-2">Time</div>
          </div>
          
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => navigate(`/activity/${activity.id}`)}
            >
              {/* Mobile Layout */}
              <div className="md:hidden space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' : 
                      activity.status === 'pending' ? 'bg-blue-500' : 'bg-amber-500'
                    }`}></div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[activity.status]}`}>
                      {activity.status}
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm">{activity.time}</span>
                </div>
                <div className="font-medium text-gray-800">{activity.action}</div>
                <div className="text-gray-600">{activity.target}</div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid grid-cols-12 items-center">
                <div className="col-span-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' : 
                      activity.status === 'pending' ? 'bg-blue-500' : 'bg-amber-500'
                    }`}></div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[activity.status]}`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
                <div className="col-span-5 font-medium text-gray-800">{activity.action}</div>
                <div className="col-span-4 text-gray-600">{activity.target}</div>
                <div className="col-span-2 text-gray-500 text-sm">{activity.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Activity;