import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      title: 'Player Networking',
      description: 'Connect with players, coaches, and scouts globally to build your football network.',
      icon: '🤝',
    },
    {
      title: 'Match Analysis',
      description: 'Access advanced analytics to improve performance with detailed match insights.',
      icon: '📊',
    },
    {
      title: 'Career Opportunities',
      description: 'Discover job openings and trials with clubs and academies worldwide.',
      icon: '💼',
    },
    {
      title: 'Community Hub',
      description: 'Join forums and groups to share experiences and grow your football passion.',
      icon: '🌐',
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
            <Link to="/pricing" className="hover:underline">Pricing</Link>
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
          <h2 className="text-4xl font-bold text-blue-600 mb-4">Our Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the tools and services that make Futbol Conect the ultimate platform for football enthusiasts.
          </p>
        </motion.section>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Futbol Conect. All rights reserved.</p>
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

export default Features;