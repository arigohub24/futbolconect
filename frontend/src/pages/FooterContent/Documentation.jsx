import { motion } from "framer-motion";

const Documentation = () => {
  const sections = [
    { title: "Getting Started", items: ["Introduction to Futbol Conect", "Creating Your First Project", "Understanding the Dashboard"] },
    { title: "API Reference", items: ["Authentication", "Player Endpoints", "Match Statistics", "Webhook Integration"] },
    { title: "Tutorials", items: ["Building Your First App", "Data Visualization", "Performance Optimization"] },
    { title: "Best Practices", items: ["Security Guidelines", "Rate Limiting", "Error Handling"] }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-4xl font-bold text-blue-900 mb-4"
            animate={{ scale: [0.9, 1] }}
            transition={{ duration: 0.5 }}
          >
            Documentation
          </motion.h1>
          <p className="text-lg text-blue-800 max-w-2xl mx-auto">
            Comprehensive guides and references for the Futbol Conect platform.
          </p>
        </motion.div>

        {/* Documentation Sections */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2 }}
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <motion.div className="bg-blue-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              </motion.div>
              <motion.div className="p-6">
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <motion.li 
                      key={itemIndex}
                      whileHover={{ x: 5 }}
                      className="text-blue-800 hover:text-blue-600 cursor-pointer transition"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Search Documentation</h2>
          <div className="relative">
            <motion.input
              type="text"
              placeholder="What are you looking for?"
              className="w-full px-6 py-4 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16"
              animate={{ scale: [0.98, 1] }}
              transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.button 
              className="absolute right-3 top-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              whileHover={{ scale: 1.05 }}
            >
              Search
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Documentation;
