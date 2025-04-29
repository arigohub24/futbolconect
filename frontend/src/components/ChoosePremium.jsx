import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChoosePremium = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  const [duration, setDuration] = useState(24);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const plan = {
    name: "Premium",
    durations: [
      { months: 24, price: "£16,700", note: "1st year" },
      { months: 36, price: "£12,600", note: "1st year", save: "Save £4,100" }
    ],
    note: "All contracts include a 15% annual price increase"
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delay: 0.2
      }
    }
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
        damping: 15
      }
    }
  };

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.5
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentError('');

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: name,
        email: email,
      },
    });

    if (error) {
      setPaymentError(error.message);
      setIsProcessing(false);
      return;
    }

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={successVariants}
        className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4"
      >
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.8, repeat: 2 }}
          >
            <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
          </motion.div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Welcome to TransferRoom Premium. Your account is ready to go!
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all"
          >
            Go to Dashboard
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4"
    >
      <motion.div 
        variants={itemVariants}
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8"
      >
        <motion.button
          variants={itemVariants}
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-500 hover:text-blue-600 mb-6 font-semibold text-lg"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Pricing
        </motion.button>

        <motion.div variants={itemVariants}>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Unlock Premium
          </h1>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl">
            Join Futbol conect Premium with your subscription details below.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Choose Your Plan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {plan.durations.map((option) => (
              <motion.button
                key={option.months}
                variants={itemVariants}
                onClick={() => setDuration(option.months)}
                whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(59, 130, 246, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  duration === option.months
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="font-semibold text-gray-900 text-xl">{option.months} months</div>
                <div className="text-3xl font-bold text-blue-600 mt-1">{option.price}</div>
                <div className="text-sm text-gray-500 mt-2">{option.note}</div>
                {option.save && (
                  <div className="text-sm text-green-600 font-semibold mt-3">{option.save}</div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <motion.div variants={containerVariants} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <motion.input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                required
                whileFocus={{ scale: 1.01 }}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <motion.input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                required
                whileFocus={{ scale: 1.01 }}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Details
              </label>
              <motion.div 
                className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm"
                whileHover={{ borderColor: "#3B82F6" }}
              >
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#1F2937',
                        backgroundColor: '#FFFFFF',
                        '::placeholder': {
                          color: '#9CA3AF',
                        },
                      },
                      invalid: {
                        color: '#DC2626',
                      },
                    },
                  }}
                />
              </motion.div>
            </motion.div>

            {paymentError && (
              <motion.div 
                variants={itemVariants}
                className="text-red-600 text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {paymentError}
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="pt-2">
              <motion.button
                type="submit"
                disabled={!stripe || isProcessing}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-md ${
                  isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? 'Processing...' : `Pay ${duration === 24 ? '£16,700' : '£12,600'}`}
              </motion.button>
            </motion.div>
          </motion.div>
        </form>

        <motion.div variants={itemVariants} className="mt-8 text-sm text-gray-500 text-center">
          <p>{plan.note}</p>
          <p className="mt-3">
            By subscribing, you agree to our{' '}
            <a href="/terms" className="text-blue-500 hover:underline">Terms of Service</a> and{' '}
            <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ChoosePremium;