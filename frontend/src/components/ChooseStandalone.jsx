import { useState, } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowLeft, CreditCard, Calendar, Lock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChooseStandalone = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  const [duration, setDuration] = useState(24);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const plan = {
    name: "Pro Standalone",
    durations: [
      { months: 24, price: "£8,700", note: "1st year", monthly: "£362.50/mo" },
      { months: 36, price: "£6,600", note: "1st year", save: "Save £2,100", monthly: "£183.30/mo" }
    ],
    note: "All contracts include a 15% annual price increase"
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentError('');

    // In a real app, you would create a payment intent on your server
    // and use the client secret here
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

    // Simulate successful payment
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      // In a real app, you would redirect to success page or dashboard
    }, 2000);
  };

  // Progress indicator for the payment process
  const ProgressBar = () => {
    return (
      <div className="w-full mb-6">
        <div className="relative">
          {/* Base line */}
          <div className="h-1 w-full bg-gray-200 rounded-full"></div>
          
          {/* Progress line */}
          <motion.div 
            className="h-1 bg-blue-600 rounded-full absolute top-0 left-0"
            initial={{ width: "0%" }}
            animate={{ width: step === 1 ? "50%" : "100%" }}
            transition={{ duration: 0.5 }}
          ></motion.div>

          {/* Step circles */}
          <div className="absolute top-0 left-0 transform -translate-y-1/2 flex justify-between w-full">
            <div className="flex flex-col items-center">
              <motion.div 
                className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                initial={false}
                animate={{ scale: step === 1 ? 1.1 : 1 }}
              >
                1
              </motion.div>
              <span className="text-xs mt-1 font-medium text-gray-600">Plan</span>
            </div>
            
            <div className="flex flex-col items-center">
              <motion.div 
                className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                initial={false}
                animate={{ scale: step === 2 ? 1.1 : 1 }}
              >
                2
              </motion.div>
              <span className="text-xs mt-1 font-medium text-gray-600">Payment</span>
            </div>
            
            <div className="flex flex-col items-center">
              <motion.div 
                className={`w-6 h-6 rounded-full flex items-center justify-center ${paymentSuccess ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                initial={false}
                animate={{ scale: paymentSuccess ? 1.1 : 1 }}
              >
                {paymentSuccess ? <CheckCircle className="h-4 w-4" /> : '3'}
              </motion.div>
              <span className="text-xs mt-1 font-medium text-gray-600">Confirm</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (paymentSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-6"
      >
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center border border-gray-100">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.2
            }}
            className="mb-6"
          >
            <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            Payment Successful!
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 mb-8"
          >
            Thank you for subscribing to Futbol conect Pro Standalone. Your account is now active.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg transition shadow-md hover:shadow-lg flex items-center justify-center"
            >
              Proceed to Dashboard
              <ChevronRight className="h-5 w-5 ml-1" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6"
    >
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 group"
        >
          <motion.div whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
            <ArrowLeft className="h-5 w-5 mr-1 group-hover:text-blue-800" />
          </motion.div>
          <span className="font-medium">Back to Pricing</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-blue-600 p-4 md:p-6 text-white">
            <h1 className="text-xl md:text-2xl font-bold">
              Futbol conect Pro Standalone
            </h1>
            <p className="text-blue-100 text-sm md:text-base">
              Complete your subscription setup
            </p>
          </div>
          
          <div className="p-6 md:p-8">
            <ProgressBar />
            
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div variants={itemVariants}>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Select Your Plan Duration</h2>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {plan.durations.map((option) => (
                      <motion.button
                        key={option.months}
                        onClick={() => setDuration(option.months)}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-5 rounded-xl border relative ${
                          duration === option.months
                            ? 'border-blue-600 bg-blue-50 shadow-md'
                            : 'border-gray-300 hover:border-gray-400 hover:shadow'
                        } transition-all duration-300`}
                      >
                        {option.save && (
                          <div className="absolute -top-3 -right-2 bg-green-500 text-white text-xs py-1 px-2 rounded-full font-bold shadow-sm">
                            {option.save}
                          </div>
                        )}
                        <div className="font-medium text-gray-900">{option.months} months</div>
                        <div className="text-2xl font-bold text-blue-600 mt-1">{option.price}</div>
                        <div className="text-sm text-gray-500">{option.note}</div>
                        <div className="text-sm text-gray-600 mt-2 font-medium">{option.monthly}</div>
                      </motion.button>
                    ))}
                  </motion.div>

                  <motion.div variants={itemVariants} className="mt-8">
                    <button
                      onClick={() => setStep(2)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg transition shadow-md hover:shadow-lg flex items-center justify-center"
                    >
                      Continue to Payment
                      <ChevronRight className="h-5 w-5 ml-1" />
                    </button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.form
                  key="step2"
                  onSubmit={handleSubmit}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div variants={itemVariants} className="mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex">
                      <div className="mr-4">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {duration}-month plan - {duration === 24 ? '£8,700' : '£6,600'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          First year payment • {plan.note}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Your Information</h2>
                  </motion.div>

                  <motion.div variants={itemVariants} className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h2>
                  </motion.div>

                  <motion.div variants={itemVariants} className="mb-6">
                    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                      <div className="flex items-center mb-4">
                        <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Card Information</span>
                      </div>
                      <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: '16px',
                              color: '#424770',
                              '::placeholder': {
                                color: '#aab7c4',
                              },
                              padding: '10px 0',
                            },
                            invalid: {
                              color: '#9e2146',
                            },
                          },
                        }}
                      />
                    </div>
                  </motion.div>

                  {paymentError && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm p-3 bg-red-50 border border-red-100 rounded-lg mb-4"
                    >
                      {paymentError}
                    </motion.div>
                  )}

                  <motion.div 
                    variants={itemVariants} 
                    className="flex justify-between items-center mb-6"
                  >
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back
                    </button>
                    
                    <button
                      type="submit"
                      disabled={!stripe || isProcessing}
                      className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg flex items-center ${
                        isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          Pay {duration === 24 ? '£8,700' : '£6,600'}
                        </>
                      )}
                    </button>
                  </motion.div>

                  <motion.div variants={itemVariants} className="mt-8 text-xs text-gray-500 bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Lock className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="font-medium text-gray-600">Secure Payment</span>
                    </div>
                    <p>{plan.note}</p>
                    <p className="mt-2">
                      By subscribing, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChooseStandalone;