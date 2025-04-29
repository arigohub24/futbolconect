import { motion } from "framer-motion";

const sectionVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

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
      className="min-h-screen bg-gradient-to-br from-blue-100 to-white py-16 px-6 sm:px-10 lg:px-24 overflow-y-auto"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h1 className="text-5xl font-extrabold text-blue-900 tracking-tight drop-shadow-sm">
            Terms of Service
          </h1>
          <p className="text-base mt-4 text-blue-700">Last Updated: May 15, 2023</p>
        </motion.div>

        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-blue-100 backdrop-blur-sm">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-blue-900 mb-10 leading-relaxed"
          >
            Welcome to Futbol Conect. These Terms of Service govern your use of our platform and services. Please read them carefully before using our services.
          </motion.p>

          {sections.map((section, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mb-10"
            >
              <h2 className="text-2xl font-semibold text-blue-900 mb-2">{section.title}</h2>
              <p className="text-blue-800 text-base leading-7">{section.content}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 p-6 bg-blue-50 rounded-xl border border-blue-100"
          >
            <h3 className="text-xl font-bold text-blue-900 mb-2">Contact Us</h3>
            <p className="text-blue-800">
              If you have any questions about these Terms, please contact us at <a className="underline text-blue-600" href="mailto:legal@futbolconect.com">legal@futbolconect.com</a>.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Terms;
