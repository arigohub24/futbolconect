import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const UseCases = () => {
  const useCases = [
    {
      title: 'For Players',
      description: 'Build your profile, connect with scouts, and access analytics to elevate your game.',
      icon: '⚽',
    },
    {
      title: 'For Coaches',
      description: 'Discover talent, analyze team performance, and share strategies with your network.',
      icon: '📋',
    },
    {
      title: 'For Scouts',
      description: 'Find promising players, review detailed stats, and streamline recruitment processes.',
      icon: '🔍',
    },
    {
      title: 'For Fans',
      description: 'Engage in communities, follow favorite players, and stay updated with football news.',
      icon: '🎉',
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
            <Link to="/use-cases" className="hover:underline">Use Cases</Link>
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
          <h2 className="text-4xl font-bold text-blue-600 mb-4">Use Cases</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how Futbol Conect empowers everyone in the football ecosystem, from players to fans.
          </p>
        </motion.section>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <div className="text-4xl mb-4">{useCase.icon}</div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{useCase.title}</h3>
              <p className="text-gray-600">{useCase.description}</p>
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

export default UseCases;