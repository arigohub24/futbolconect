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

  if (paymentSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center p-6"
      >
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for subscribing to TransferRoom Premium. Your account is now active.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Proceed to Dashboard
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 p-6"
    >
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Pricing
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Complete Your Premium Subscription
            </h1>
            <p className="text-gray-600 mb-6">
              Fill in your details and payment information to get started.
            </p>

            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-3">Select Duration</h2>
              <div className="grid grid-cols-2 gap-4">
                {plan.durations.map((option) => (
                  <button
                    key={option.months}
                    onClick={() => setDuration(option.months)}
                    className={`p-4 rounded-lg border ${
                      duration === option.months
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    } transition`}
                  >
                    <div className="font-medium text-gray-900">{option.months} months</div>
                    <div className="text-lg font-bold text-blue-600">{option.price}</div>
                    <div className="text-sm text-gray-500">{option.note}</div>
                    {option.save && (
                      <div className="text-xs text-green-600 mt-1">{option.save}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Details
                  </label>
                  <div className="border border-gray-300 rounded-lg p-3">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                              color: '#aab7c4',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                {paymentError && (
                  <div className="text-red-600 text-sm">{paymentError}</div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition ${
                      isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isProcessing ? 'Processing...' : `Pay ${duration === 24 ? '£16,700' : '£12,600'}`}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-8 text-xs text-gray-500">
              <p>{plan.note}</p>
              <p className="mt-2">
                By subscribing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChoosePremium;