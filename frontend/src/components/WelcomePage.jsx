import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const WelcomePage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delay: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-8"
    >
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-lg w-full text-center"
      >
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5, repeat: 1 }}>
          <FiArrowRight className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Welcome to futbol conect!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for joining futbol conect. We’re excited to help you connect with football opportunities worldwide.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/pricing")}
          className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-all"
        >
          Proceed to Pricing
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default WelcomePage;