import { motion } from "framer-motion";

const HelpCenter = () => {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click the 'Sign Up' button in the top right corner and follow the registration process."
    },
    {
      question: "How can I reset my password?",
      answer: "Go to the login page and click 'Forgot Password'. You'll receive instructions via email."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers."
    },
    {
      question: "How do I contact customer support?",
      answer: "Use the contact form at the bottom of this page or email support@futbolconect.com."
    }
  ];

  const resources = [
    { name: "Getting Started Guide", icon: "📘" },
    { name: "Video Tutorials", icon: "🎥" },
    { name: "Community Forum", icon: "💬" },
    { name: "API Documentation", icon: "🔌" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-blue-900 mb-4"
          >
            Help Center
          </motion.h1>
          <p className="text-lg text-blue-800 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">FAQs</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="border-b border-blue-100 pb-4"
                >
                  <h3 className="text-lg font-semibold text-blue-800">{faq.question}</h3>
                  <p className="text-blue-700 mt-1">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Resources</h2>
            <div className="grid grid-cols-2 gap-4">
              {resources.map((resource, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-blue-50 rounded-lg p-4 text-center cursor-pointer"
                >
                  <div className="text-2xl mb-2">{resource.icon}</div>
                  <h3 className="font-medium text-blue-800">{resource.name}</h3>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Still need help?</h3>
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your email" 
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea 
                  placeholder="Describe your issue..." 
                  rows="4"
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button 
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HelpCenter;