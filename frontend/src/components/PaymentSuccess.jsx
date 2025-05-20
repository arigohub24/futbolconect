import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, message, transactionRef } = location.state || {
    message: "Transaction initiated! Please complete the bank transfer within 10 minutes.",
    plan: { name: "Unknown", priceNGN: "N/A" },
    transactionRef: "N/A",
  };

  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          localStorage.setItem("onboardingCompleted", "true");
          navigate("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delay: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 15 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4 sm:p-8"
    >
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-lg w-full text-center"
      >
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5, repeat: 1 }}>
          <Loader2 className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-spin" />
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Transaction in Progress
        </h2>
        <p className="text-gray-600 mb-4">{message}</p>
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-600">
            <strong>Plan:</strong> {plan.name}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Amount:</strong> {plan.priceNGN}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Transaction Reference:</strong> {transactionRef}
          </p>
          <p className="text-sm text-red-500 mt-2">
            Time remaining to complete transfer: {formatTime(timeLeft)}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            localStorage.setItem("onboardingCompleted", "true");
            navigate("/dashboard");
          }}
          className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-all"
        >
          Go to Dashboard
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default PaymentSuccess;