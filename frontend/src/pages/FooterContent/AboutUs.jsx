import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const teamMembers = [
  {
    name: 'Dr Arinze Madueke',
    role: 'Founder & CEO',
    description: 'Passionate about football and technology, Dr Arinze started Futbol Conect to unite the global football community.',
    image: '/assets/team/arinze.jpg' // Add team member images
  },
  {
    name: 'Rotimi Nicol',
    role: 'Software Developer',
    description: 'Rotimi leads our tech team, ensuring seamless integrations and innovative features.',
    image: '/assets/team/rotimi.jpg'
  },
];

const AboutUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.h1 
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Futbol Conect
          </motion.h1>
          <nav className="space-x-6">
            <Link to="/" className="hover:text-blue-200 transition-colors duration-300">Home</Link>
            <Link to="/features" className="hover:text-blue-200 transition-colors duration-300">Features</Link>
            <Link to="/about" className="hover:text-blue-200 transition-colors duration-300">About Us</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <motion.section
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-5xl font-bold text-blue-600 mb-6 relative">
            About Futbol Conect
            <div className="absolute w-24 h-1 bg-blue-600 bottom-0 left-1/2 transform -translate-x-1/2 mt-2"></div>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            FutbolConect.com is a global platform built to revolutionize how footballers, scouts, and clubs connect. Our goal is to break down barriers and make football opportunities accessible to talent everywhere, regardless of geography or background.
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            We provide a professional space where players can showcase their skills, scouts can discover promising talents, and clubs can recruit the right players to strengthen their squads. Whether you're an aspiring footballer seeking visibility, a scout looking for fresh talent, or a club searching for the next big star, FutbolConect.com brings the entire football community to your fingertips.
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            We believe football is a universal language — and through technology, we are making it easier, faster, and smarter for talent and opportunity to meet on a global scale.
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            FutbolConect.com – Where Talent Meets Opportunity.
          </p>
        </motion.section>

        <motion.section
          className="mb-16 bg-white rounded-2xl shadow-xl p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-semibold text-blue-600 mb-8 text-center">Our Mission</h3>
          <p className="text-gray-600 max-w-4xl mx-auto text-center text-lg leading-relaxed">
            We aim to empower players, coaches, scouts, and fans by providing a platform that fosters networking, growth, and opportunity in the world of football.
          </p>
        </motion.section>

        <motion.section
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h3 className="text-3xl font-semibold text-blue-600 mb-10 text-center col-span-full">Our Team</h3>
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-blue-100 mb-6 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                </div>
                <h4 className="text-2xl font-semibold text-blue-600 mb-3">{member.name}</h4>
                <p className="text-lg text-blue-500 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 text-center leading-relaxed">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold mb-4">Futbol Conect</h4>
              <p className="text-blue-100">Connecting the football world</p>
            </div>
            <div className="text-center">
              <p>© 2025 Futbol Conect. All rights reserved.</p>
            </div>
            <div className="flex justify-center md:justify-end space-x-6">
              <Link to="/about" className="hover:text-blue-200 transition-colors duration-300">About Us</Link>
              <Link to="/privacy" className="hover:text-blue-200 transition-colors duration-300">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-blue-200 transition-colors duration-300">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;