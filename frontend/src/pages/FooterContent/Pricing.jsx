import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      features: ['Player Networking', 'Community Hub', 'Basic Match Analysis'],
      cta: 'Get Started',
    },
    {
      name: 'Pro',
      price: '$9.99/mo',
      features: ['All Basic Features', 'Advanced Match Analysis', 'Career Opportunities', 'Priority Support'],
      cta: 'Choose Pro',
    },
    {
      name: 'Elite',
      price: '$19.99/mo',
      features: ['All Pro Features', 'Exclusive Webinars', 'Personalized Coaching', 'Premium Networking'],
      cta: 'Choose Elite',
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
          <h2 className="text-4xl font-bold text-blue-600 mb-4">Pricing Plans</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that best fits your needs and start connecting with the football world today.
          </p>
        </motion.section>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">{plan.name}</h3>
              <p className="text-3xl font-bold text-gray-800 mb-4">{plan.price}</p>
              <ul className="mb-6 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-gray-600 mb-2">✔ {feature}</li>
                ))}
              </ul>
              <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </motion.div>
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

export default Pricing;