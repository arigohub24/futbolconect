import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Blog = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    hover: {
      scale: 1.05,
      rotate: 2,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <motion.header
        className="bg-blue-600 text-white py-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl font-extrabold tracking-tight text-white"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Futbol Conect Blog
          </motion.h1>
          <motion.p
            className="mt-4 text-xl text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Stay updated with the latest news and insights in the football world
          </motion.p>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main
        className="container mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog Post Card 1 */}
          <motion.div
            className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-transform hover:scale-105"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <img
              src="https://via.placeholder.com/400x200"
              alt="Blog post"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                The Future of Football Networking
              </h2>
              <p className="mt-2 text-gray-600">
                Discover how Futbol Conect is revolutionizing the way players and coaches connect.
              </p>
              <Link
                to="/blog/future-of-football"
                className="mt-4 inline-block text-blue-600 font-medium hover:underline"
              >
                Read More
              </Link>
            </div>
          </motion.div>

          {/* Blog Post Card 2 */}
          <motion.div
            className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-transform hover:scale-105"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <img
              src="https://via.placeholder.com/400x200"
              alt="Blog post"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                Tips for Aspiring Footballers
              </h2>
              <p className="mt-2 text-gray-600">
                Expert advice to help you take your football career to the next level.
              </p>
              <Link
                to="/blog/tips-for-footballers"
                className="mt-4 inline-block text-blue-600 font-medium hover:underline"
              >
                Read More
              </Link>
            </div>
          </motion.div>

          {/* Blog Post Card 3 */}
          <motion.div
            className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-transform hover:scale-105"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <img
              src="https://via.placeholder.com/400x200"
              alt="Blog post"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                Why Community Matters in Football
              </h2>
              <p className="mt-2 text-gray-600">
                Learn how building a strong community can enhance your football journey.
              </p>
              <Link
                to="/blog/community-in-football"
                className="mt-4 inline-block text-blue-600 font-medium hover:underline"
              >
                Read More
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.main>

      {/* Footer */}
      <motion.footer
        className="bg-blue-600 text-white py-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Futbol Conect. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Blog;
