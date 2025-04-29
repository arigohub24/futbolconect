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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gray-50 text-gray-800"
    >
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 flex justify-between items-center"
        >
          <h1 className="text-2xl font-bold">Futbol Conect</h1>
          <nav className="flex space-x-4">
            {["Home", "Features", "Press"].map((item, index) => (
              <motion.div 
                key={index} 
                whileHover={{ scale: 1.1 }} 
                className="hover:underline"
              >
                <Link to={`/${item.toLowerCase()}`}>{item}</Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <motion.h2 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.6 }} 
          className="text-4xl font-bold text-blue-600 text-center mb-8"
        >
          Press & Media
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 gap-8"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2 }}
        >
          {pressReleases.map((release, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-blue-600">{release.title}</h3>
              <p className="text-gray-600">{release.date}</p>
              <p className="text-gray-600 mt-2">{release.excerpt}</p>
              <a href={release.link} className="text-blue-600 hover:underline font-medium mt-3 block">
                Read More
              </a>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Press;
