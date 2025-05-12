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

  const bounceAnimation = {
    initial: { y: -5 },
    animate: { y: [0, -5, 0], transition: { duration: 1.5, repeat: Infinity } }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-blue-900"
          >
            System Status
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg text-blue-800"
          >
            Real-time information about Futbol Conect services and uptime.
          </motion.p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Service Status</h2>

          <div className="space-y-4">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.02 }}
                {...bounceAnimation}
                className="flex justify-between items-center p-4 border border-blue-100 rounded-lg shadow-md"
              >
                <div className="text-blue-900 font-medium">{service.name}</div>
                <div className="flex items-center">
                  <motion.div 
                    className={`w-3 h-3 rounded-full ${statusColors[service.status]}`}
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                  <span className="ml-2 capitalize">{service.status}</span>
                </div>
                <div className="text-blue-700">{service.uptime} uptime</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Status;
