import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Integration = () => {
  const integrations = [
    {
      title: 'Wearable Devices',
      description: 'Sync with wearables like smartwatches to track performance metrics in real-time.',
      icon: '⌚',
    },
    {
      title: 'Video Platforms',
      description: 'Integrate with video analysis tools to upload and review match footage seamlessly.',
      icon: '🎥',
    },
    {
      title: 'Social Media',
      description: 'Share highlights and connect with fans directly through social media integrations.',
      icon: '📱',
    },
    {
      title: 'Club Management',
      description: 'Connect with club software for streamlined communication and scheduling.',
      icon: '🏟️',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Futbol Conect</h1>
          <nav>
            <Link to="/" className="mr-4 hover:underline">Home</Link>
            <Link to="/features" className="mr-4 hover:underline">Features</Link>
            <Link to="/pricing" className="mr-4 hover:underline">Pricing</Link>
            <Link to="/integration" className="hover:underline">Integration</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <motion.section
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-blue-600 mb-4">Integrations</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enhance your Futbol Conect experience with seamless integrations to your favorite tools.
          </p>
        </motion.section>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <div className="text-4xl mb-4">{integration.icon}</div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{integration.title}</h3>
              <p className="text-gray-600">{integration.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Futbol Conect. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link to="/about" className="hover:underline">About Us</Link>
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Integration;