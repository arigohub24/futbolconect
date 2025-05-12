import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { FiArrowRight } from "react-icons/fi";
import { useEffect, useState } from "react";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000); // Confetti stops after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-blue-600 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Welcome to <span className="text-blue-800">FutbolConnect</span>!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 mb-6"
        >
          Youre now part of the ultimate football community platform. Connect with players, clubs, and agents worldwide.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Pricing Information</h3>
          <p className="text-gray-600">
            Our premium service is priced at <span className="font-bold">$5,000</span>. This includes full access to our global football marketplace, exclusive features, and 24/7 support.
          </p>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => navigate("/dashboard")}
          className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-blue-800 text-white font-medium shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 transition-all duration-200 text-base"
        >
          Proceed to Dashboard <FiArrowRight className="ml-2" />
        </motion.button>
      </motion.div>
      <div className="absolute bottom-6 right-6 flex items-center text-white text-sm">
        <div className="mr-1 font-bold">Futbol</div>
        <div className="text-blue-300">Connect</div>
      </div>
    </div>
  );
};

export default WelcomePage;