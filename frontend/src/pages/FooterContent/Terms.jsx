import { motion } from "framer-motion";

const Terms = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using the Futbol Conect platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service."
    },
    {
      title: "2. User Responsibilities",
      content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account."
    },
    {
      title: "3. Prohibited Uses",
      content: "You may not use the service for any illegal or unauthorized purpose. You must not violate any laws in your jurisdiction when using the service."
    },
    {
      title: "4. Intellectual Property",
      content: "The service and its original content, features, and functionality are owned by Futbol Conect and are protected by international copyright, trademark, and other intellectual property laws."
    },
    {
      title: "5. Termination",
      content: "We may terminate or suspend your account immediately, without prior notice, for any reason whatsoever, including without limitation if you breach the Terms."
    },
    {
      title: "6. Changes to Terms",
      content: "We reserve the right to modify these terms at any time. Your continued use of the service after any such changes constitutes your acceptance of the new Terms."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-blue-900 mb-4"
          >
            Terms of Service
          </motion.h1>
          <p className="text-lg text-blue-800">
            Last Updated: May 15, 2023
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-blue max-w-none">
            <p className="text-blue-900 mb-8">
              Welcome to Futbol Conect. These Terms of Service govern your use of our platform and services. Please read them carefully before using our services.
            </p>

            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-8"
              >
                <h2 className="text-xl font-bold text-blue-900 mb-3">{section.title}</h2>
                <p className="text-blue-800">{section.content}</p>
              </motion.div>
            ))}

            <div className="mt-12 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Contact Us</h3>
              <p className="text-blue-800">
                If you have any questions about these Terms, please contact us at legal@futbolconect.com.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Terms;