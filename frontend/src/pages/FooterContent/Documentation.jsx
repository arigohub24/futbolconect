import { motion } from "framer-motion";

const Documentation = () => {
  const sections = [
    {
      title: "Getting Started",
      items: [
        "Introduction to Futbol Conect",
        "Creating Your First Project",
        "Understanding the Dashboard"
      ]
    },
    {
      title: "API Reference",
      items: [
        "Authentication",
        "Player Endpoints",
        "Match Statistics",
        "Webhook Integration"
      ]
    },
    {
      title: "Tutorials",
      items: [
        "Building Your First App",
        "Data Visualization",
        "Performance Optimization"
      ]
    },
    {
      title: "Best Practices",
      items: [
        "Security Guidelines",
        "Rate Limiting",
        "Error Handling"
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-blue-900 mb-4"
          >
            Documentation
          </motion.h1>
          <p className="text-lg text-blue-800 max-w-2xl mx-auto">
            Comprehensive guides and references for the Futbol Conect platform.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-blue-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <motion.li 
                      key={itemIndex}
                      whileHover={{ x: 5 }}
                      className="text-blue-800 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Search Documentation</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full px-6 py-4 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16"
            />
            <button className="absolute right-3 top-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">API</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Authentication</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Tutorials</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">SDK</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Documentation;