import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Careers = () => {
  const jobOpenings = [
    {
      title: 'Frontend Developer',
      description: 'Join our team to build intuitive and responsive interfaces for football enthusiasts.',
      location: 'Remote',
      type: 'Full-Time',
    },
    {
      title: 'Data Analyst',
      description: 'Analyze match and player data to provide actionable insights for our users.',
      location: 'Remote',
      type: 'Full-Time',
    },
    {
      title: 'Community Manager',
      description: 'Engage with our global football community and foster meaningful connections.',
      location: 'Remote',
      type: 'Part-Time',
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
            <Link to="/careers" className="hover:underline">Careers</Link>
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
          <h2 className="text-4xl font-bold text-blue-600 mb-4">Careers at Futbol Conect</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our team to shape the future of football connectivity and make a global impact.
          </p>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Why Work With Us?</h3>
          <p className="text-gray-600 max-w-3xl mx-auto text-center">
            At Futbol Conect, we’re passionate about football and technology. Work remotely, collaborate with a global team, and contribute to a platform that empowers the football community.
          </p>
        </motion.section>

        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-2xl font-semibold text-blue-600 mb-6 text-center col-span-full">Open Positions</h3>
          {jobOpenings.map((job, index) => (
            <motion.div
              key={index}
              className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <h4 className="text-xl font-semibold text-blue-600 mb-2">{job.title}</h4>
              <p className="text-gray-600 mb-2">{job.description}</p>
              <p className="text-gray-600 mb-2"><strong>Location:</strong> {job.location}</p>
              <p className="text-gray-600 mb-4"><strong>Type:</strong> {job.type}</p>
              <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                Apply Now
              </button>
            </motion.div>
          ))}
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

export default Careers;