import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Join = () => {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      features: ["Access to league listings", "Basic club search", "Limited connections"],
      cta: "Join Free"
    },
    {
      name: "Pro",
      price: "Contact Us",
      features: ["Full club search", "Unlimited connections", "Priority support", "Exclusive events"],
      cta: "Get Started"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 bg-gray-50 min-h-screen"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold text-gray-800">Join Futbol Connect</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Become part of the world leading football networking platform and start connecting with clubs today
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
      >
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm p-6 text-center"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{plan.name}</h2>
            <p className="text-3xl font-bold text-gray-800 mb-6">{plan.price}</p>
            <ul className="text-gray-600 mb-6 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center mx-auto"
            >
              {plan.cta}
              <ChevronRight size={16} className="ml-1" />
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Join;