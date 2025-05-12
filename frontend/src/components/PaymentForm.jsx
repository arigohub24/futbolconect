import { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import {  ArrowLeft, CreditCard } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch authUser
  const { data: authUser } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/auth/me', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong');
        }
        return data;
      } catch (error) {
        return null;
      }
    },
    retry: false,
  });

  const [name, setName] = useState(authUser?.name || '');
  const [email, setEmail] = useState(authUser?.email || '');
  const [cardType, setCardType] = useState('Unknown');
  const [paymentError, setPaymentError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Determine plan from URL
  const isPremium = location.pathname.includes('premium');
  const plan = isPremium
    ? {
        name: 'Premium',
        price: '£10,000',
        description: 'Complete transfer management solution',
        amount: 10000, // In GBP
      }
    : {
        name: 'Basic',
        price: '£5,000',
        description: 'Essential tools for player transfers',
        amount: 5000, // In GBP
      };

  // Detect card type
  useEffect(() => {
    if (!elements) return;

    const cardElement = elements.getElement(CardElement);
    if (cardElement) {
      cardElement.on('change', (event) => {
        if (event.brand) {
          setCardType(event.brand.charAt(0).toUpperCase() + event.brand.slice(1));
        } else {
          setCardType('Unknown');
        }
      });
    }
  }, [elements]);

  // Pre-fill name and email
  useEffect(() => {
    if (authUser) {
      setName(authUser.name || '');
      setEmail(authUser.email || '');
    }
  }, [authUser]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
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
        type: 'spring',
        stiffness: 150,
        damping: 15,
      },
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !authUser) {
      setPaymentError('Stripe or user data not initialized.');
      toast.error('Please try again or log in.');
      return;
    }

    setIsProcessing(true);
    setPaymentError('');

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name,
        email,
      },
    });

    if (error) {
      setPaymentError(error.message);
      toast.error(error.message);
      setIsProcessing(false);
      return;
    }

    try {
      // Call backend to create payment intent
      const response = await fetch('/api/payments/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          amount: plan.amount,
          userId: authUser._id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      // Confirm the payment
      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        setPaymentError(confirmError.message);
        toast.error(confirmError.message);
        setIsProcessing(false);
        return;
      }

      // Payment successful
      toast.success('Payment successful!');
      setIsProcessing(false);
      navigate('/payment/success', { state: { plan } });
    } catch (error) {
      setPaymentError(error.message || 'An error occurred. Please try again.');
      toast.error(error.message || 'Payment failed. Please try again.');
      setIsProcessing(false);
    }
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
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8"
      >
        {/* Back Button */}
        <motion.button
          variants={itemVariants}
          onClick={() => navigate('/pricing')}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Pricing
        </motion.button>

        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {plan.name} Plan
          </h1>
          <p className="text-gray-600 mb-6">{plan.description}</p>
          <div className="bg-blue-50 p-4hoe  rounded-lg mb-6">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">{plan.price}</span>
              <span className="ml-2 text-gray-600">per year</span>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <motion.div variants={containerVariants} className="space-y-6">
            {/* Full Name */}
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <motion.input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
                whileFocus={{ scale: 1.01 }}
                placeholder="John Doe"
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <motion.input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
                whileFocus={{ scale: 1.01 }}
                placeholder="john.doe@example.com"
              />
            </motion.div>

            {/* Card Details */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Details
              </label>
              <motion.div
                className="border border-gray-300 rounded-lg p-4 bg-white"
                whileHover={{ borderColor: '#3B82F6' }}
              >
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#1F2937',
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
              <div className="mt-2 flex items-center text-sm text-gray-600">
                <CreditCard className="h-5 w-5 mr-2" />
                Card Type: <span className="ml-1 font-medium">{cardType}</span>
              </div>
            </motion.div>

            {/* Error Message */}
            {paymentError && (
              <motion.div
                variants={itemVariants}
                className="text-red-600 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {paymentError}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={!stripe || isProcessing || !authUser}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full bg-blue-600 text-white font-medium py-3 rounded-lg transition-all ${
                  isProcessing || !authUser ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
              >
                {isProcessing ? 'Processing...' : `Pay ${plan.price}`}
              </motion.button>
            </motion.div>
          </motion.div>
        </form>

        {/* Terms */}
        <motion.div variants={itemVariants} className="mt-6 text-sm text-gray-500 text-center">
          By subscribing, you agree to our{' '}
          <a href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>.
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentForm;