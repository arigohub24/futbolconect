import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Careers = () => {
  const jobOpenings = [
    { title: 'Frontend Developer', description: 'Build intuitive and responsive interfaces.', location: 'Remote', type: 'Full-Time' },
    { title: 'Data Analyst', description: 'Analyze match and player data for insights.', location: 'Remote', type: 'Full-Time' },
    { title: 'Community Manager', description: 'Engage with football enthusiasts worldwide.', location: 'Remote', type: 'Part-Time' },
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
            {["Home", "Features", "Careers"].map((item) => (
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
          Join Our Team
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2 }}
        >
          {jobOpenings.map((job, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-blue-600">{job.title}</h3>
              <p className="text-gray-600 mt-2">{job.description}</p>
              <p className="text-blue-600 mt-2"><strong>Location:</strong> {job.location}</p>
              <p className="text-blue-600 mb-4"><strong>Type:</strong> {job.type}</p>
              <motion.button 
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                whileHover={{ scale: 1.05 }}
              >
                Apply Now
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Careers;
