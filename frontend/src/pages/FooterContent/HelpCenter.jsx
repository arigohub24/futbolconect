import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

const HelpCenter = () => {
  const navigate = useNavigate();
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

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 py-16 px-6 relative"
    >
      {/* Back Button */}
      <motion.button
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-6 left-6 flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
      >
        <i className="fas fa-arrow-left mr-2" />
        Back
      </motion.button>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold text-blue-900 drop-shadow-md"
          >
            Help Center
          </motion.h1>
          <p className="text-lg text-blue-800 mt-3">
            Find answers to your questions or reach out to our support team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl p-8 border border-blue-100"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">FAQs</h2>
            <div>
              {faqs.map((faq, index) => (
                <div key={index} className="mb-6">
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full text-left focus:outline-none"
                  >
                    <motion.h3
                      className="text-lg font-semibold text-blue-800 flex justify-between items-center"
                      whileHover={{ scale: 1.01 }}
                    >
                      {faq.question}
                      <span>{openIndex === index ? "−" : "+"}</span>
                    </motion.h3>
                  </button>
                  <motion.div
                    initial={false}
                    animate={openIndex === index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden text-blue-700 mt-2"
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl p-8 border border-blue-100 mt-8"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Contact Us</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <a href="mailto:support@futbolconect.com" className="text-blue-800 hover:text-blue-600">
                  support@futbolconect.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800">+234 905 7403294</span>
              </div>
              <p className="text-gray-600 mt-4">
                Our support team is available Monday to Friday, 9:00 AM - 6:00 PM GMT.
              </p>
            </div>
          </motion.div>

          {/* Resources & Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl p-8 border border-blue-100"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Resources</h2>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {resources.map((resource, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-blue-50 hover:bg-blue-100 transition rounded-xl text-center py-4 cursor-pointer shadow-sm"
                >
                  <div className="text-3xl">{resource.icon}</div>
                  <h3 className="mt-2 font-medium text-blue-800">{resource.name}</h3>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Still need help?</h3>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Describe your issue..."
                  rows="4"
                  className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
                >
                  Submit Request
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HelpCenter;