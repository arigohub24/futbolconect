import { motion } from "framer-motion";

const Privacy = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: "We collect personal information you provide when registering, including name, email, and payment details. We also automatically collect usage data through cookies and similar technologies."
    },
    {
      title: "How We Use Your Information",
      content: "Your information is used to provide and improve our services, process transactions, communicate with you, and for security and fraud prevention purposes."
    },
    {
      title: "Data Sharing",
      content: "We do not sell your personal data. We may share information with trusted third-party service providers who assist us in operating our platform, conducting our business, or serving our users."
    },
    {
      title: "Data Security",
      content: "We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure."
    },
    {
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal data. You may also object to or restrict certain processing activities."
    },
    {
      title: "Changes to This Policy",
      content: "We may update this Privacy Policy periodically. We will notify you of any changes by posting the new policy on this page."
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
            Privacy Policy
          </motion.h1>
          <p className="text-lg text-blue-800">
            Effective Date: May 15, 2023
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-blue max-w-none">
            <p className="text-blue-900 mb-8">
              At Futbol Conect, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
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
              <h3 className="text-lg font-semibold text-blue-900 mb-3">GDPR Compliance</h3>
              <p className="text-blue-800 mb-2">
                For users in the European Union, we comply with the General Data Protection Regulation (GDPR). You have specific rights regarding your personal data under GDPR.
              </p>
              <p className="text-blue-800">
                To exercise your rights or for any privacy-related inquiries, please contact our Data Protection Officer at dpo@futbolconect.com.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Privacy; 