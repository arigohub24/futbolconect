import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Press = () => {
  const pressReleases = [
    {
      title: 'Futbol Conect Launches Global Networking Platform',
      date: 'March 15, 2025',
      excerpt: 'Futbol Conect unveils its innovative platform to connect players, coaches, and fans worldwide.',
      link: '#',
    },
    {
      title: 'Futbol Conect Partners with Top Football Academies',
      date: 'January 10, 2025',
      excerpt: 'New partnerships enable seamless integration with leading academies for talent scouting.',
      link: '#',
    },
    {
      title: 'Futbol Conect Hits 1 Million Users',
      date: 'November 20, 2024',
      excerpt: 'The platform celebrates a major milestone in uniting the global football community.',
      link: '#',
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
            <Link to="/press" className="hover:underline">Press</Link>
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
          <h2 className="text-4xl font-bold text-blue-600 mb-4">Press & Media</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news and announcements from Futbol Conect.
          </p>
        </motion.section>

        <motion.section
          className="grid grid-cols-1 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {pressReleases.map((release, index) => (
            <motion.div
              key={index}
              className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{release.title}</h3>
              <p className="text-gray-600 mb-2"><strong>{release.date}</strong></p>
              <p className="text-gray-600 mb-4">{release.excerpt}</p>
              <a
                href={release.link}
                className="text-blue-600 hover:underline font-medium"
              >
                Read More
              </a>
            </motion.div>
          ))}
        </motion.section>

        <motion.section
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Media Inquiries</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            For press kits, interviews, or other media requests, please contact our team.
          </p>
          <a
            href="mailto:press@futbolconect.com"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Contact Us
          </a>
        </motion.section>
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

export default Press;