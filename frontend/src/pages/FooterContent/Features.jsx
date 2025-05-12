import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    { title: 'Player Networking', description: 'Connect with players, coaches, and scouts globally.', icon: '🤝' },
    { title: 'Match Analysis', description: 'Access advanced analytics to improve performance.', icon: '📊' },
    { title: 'Career Opportunities', description: 'Discover job openings and trials worldwide.', icon: '💼' },
    { title: 'Community Hub', description: 'Join forums and groups to share experiences.', icon: '🌐' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800"
    >
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-blue-600 text-white py-6"
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Futbol Conect</h1>
          <nav className="flex space-x-4">
            {["Home", "Features", "Pricing"].map((item) => (
              <motion.div whileHover={{ scale: 1.1 }} key={item}>
                <Link to={`/${item.toLowerCase()}`} className="hover:underline">{item}</Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-blue-600 text-center mb-8"
        >
          Our Features
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <motion.div
                className="text-4xl mb-4"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-blue-600">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Features;
