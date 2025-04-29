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
        staggerChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-6 shadow-lg"
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wide">Futbol Conect</h1>
          <nav className="space-x-4">
            <Link to="/" className="hover:underline transition-opacity">Home</Link>
            <Link to="/features" className="hover:underline transition-opacity">Features</Link>
            <Link to="/pricing" className="hover:underline transition-opacity">Pricing</Link>
            <Link to="/use-cases" className="hover:underline transition-opacity font-semibold underline">Use Cases</Link>
          </nav>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-blue-600 mb-4 tracking-tight">Use Cases</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how Futbol Conect empowers everyone in the football ecosystem — from players to fans.
          </p>
        </motion.section>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="group bg-white p-6 rounded-2xl border border-blue-100 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{useCase.icon}</div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2 group-hover:text-blue-800 transition-colors">
                {useCase.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{useCase.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-8"
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2025 Futbol Conect. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6 text-sm">
            <Link to="/about" className="hover:underline">About Us</Link>
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default UseCases;
