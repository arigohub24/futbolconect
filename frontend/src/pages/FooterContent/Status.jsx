import { motion } from "framer-motion";

const Status = () => {
  const services = [
    { name: "API Services", status: "operational", uptime: "99.98%" },
    { name: "Database", status: "operational", uptime: "99.95%" },
    { name: "Authentication", status: "degraded", uptime: "98.76%" },
    { name: "Media Processing", status: "operational", uptime: "99.89%" },
    { name: "Payment Gateway", status: "maintenance", uptime: "99.92%" },
  ];

  const statusColors = {
    operational: "bg-green-500",
    degraded: "bg-yellow-500",
    maintenance: "bg-blue-500",
    outage: "bg-red-500"
  };

  const incidents = [
    {
      date: "May 10, 2023",
      title: "Authentication Service Interruption",
      status: "resolved",
      description: "Some users experienced delays in authentication services between 14:00-15:30 GMT."
    },
    {
      date: "April 28, 2023",
      title: "Scheduled Maintenance",
      status: "completed",
      description: "Routine database maintenance performed with minimal downtime."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-blue-900 mb-4"
          >
            System Status
          </motion.h1>
          <p className="text-lg text-blue-800">
            Real-time information about Futbol Conect services and uptime.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-blue-900">Service Status</h2>
            <div className="text-sm text-blue-700">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
          
          <div className="space-y-4">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.01 }}
                className="grid grid-cols-3 items-center p-4 border border-blue-100 rounded-lg"
              >
                <div className="font-medium text-blue-900">{service.name}</div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${statusColors[service.status]} mr-2`}></div>
                  <span className="capitalize">{service.status}</span>
                </div>
                <div className="text-right text-blue-700">{service.uptime} uptime</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Recent Incidents</h2>
          <div className="space-y-6">
            {incidents.map((incident, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-l-4 border-blue-500 pl-4"
              >
                <div className="text-sm text-blue-600 mb-1">{incident.date}</div>
                <h3 className="text-lg font-semibold text-blue-900 mb-1">{incident.title}</h3>
                <p className="text-blue-800">{incident.description}</p>
                <div className="mt-2 text-sm text-blue-700 capitalize">
                  Status: <span className="font-medium">{incident.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Status;