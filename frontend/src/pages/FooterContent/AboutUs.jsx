import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Dr Arinze Madueke',
      role: 'Founder & CEO',
      description: 'Passionate about football and technology, Dr Arinze started Futbol Conect to unite the global football community.',
    },
    {
      name: 'Rotimi Nicol',
      role: 'Software Developer',
      description: 'Rotimi leads our tech team, ensuring seamless integrations and innovative features.',
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
            <Link to="/about" className="hover:underline">About Us</Link>
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
          <h2 className="text-4xl font-bold text-blue-600 mb-4">About Futbol Conect</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Futbol Conect is dedicated to connecting the global football community through innovative technology and passionate collaboration.
          </p>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Our Mission</h3>
          <p className="text-gray-600 max-w-3xl mx-auto text-center">
            We aim to empower players, coaches, scouts, and fans by providing a platform that fosters networking, growth, and opportunity in the world of football.
          </p>
        </motion.section>

        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-2xl font-semibold text-blue-600 mb-6 text-center col-span-full">Our Team</h3>
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <h4 className="text-xl font-semibold text-blue-600 mb-2">{member.name}</h4>
              <p className="text-gray-600 font-medium mb-2">{member.role}</p>
              <p className="text-gray-600">{member.description}</p>
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

export default AboutUs;