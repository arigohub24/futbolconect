import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Blog = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    hover: { scale: 1.03, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <motion.header
        className="bg-blue-600 text-white py-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Futbol Conect Blog</h1>
          <p className="mt-2 text-lg">Stay updated with the latest news and insights</p>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main
        className="container mx-auto px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog Post Card 1 */}
          <motion.div
            className="bg-white rounded-lg shadow-lg overflow-hidden"
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
              <h2 className="text-xl font-semibold text-gray-800">The Future of Football Networking</h2>
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
            className="bg-white rounded-lg shadow-lg overflow-hidden"
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
              <h2 className="text-xl font-semibold text-gray-800">Tips for Aspiring Footballers</h2>
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
            className="bg-white rounded-lg shadow-lg overflow-hidden"
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
              <h2 className="text-xl font-semibold text-gray-800">Why Community Matters in Football</h2>
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
        className="bg-blue-600 text-white py-6"
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