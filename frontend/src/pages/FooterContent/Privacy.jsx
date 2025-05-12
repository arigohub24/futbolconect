import { motion } from "framer-motion";
import { ShieldCheck, Lock, User, RefreshCcw, Share, Info } from "lucide-react";

const icons = [User, Lock, Share, ShieldCheck, RefreshCcw, Info];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const Privacy = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: "We collect personal information you provide when registering, including name, email, and payment details. We also automatically collect usage data through cookies and similar technologies.",
    },
    {
      title: "How We Use Your Information",
      content: "Your information is used to provide and improve our services, process transactions, communicate with you, and for security and fraud prevention purposes.",
    },
    {
      title: "Data Sharing",
      content: "We do not sell your personal data. We may share information with trusted third-party service providers who assist us in operating our platform, conducting our business, or serving our users.",
    },
    {
      title: "Data Security",
      content: "We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.",
    },
    {
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal data. You may also object to or restrict certain processing activities.",
    },
    {
      title: "Changes to This Policy",
      content: "We may update this Privacy Policy periodically. We will notify you of any changes by posting the new policy on this page.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 py-14 px-6 sm:px-10"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold text-blue-900 drop-shadow-sm mb-4">
            Privacy Policy
          </h1>
          <p className="text-md sm:text-lg text-blue-700">
            Effective Date: May 15, 2023
          </p>
        </motion.div>

        <div className="grid gap-10">
          {sections.map((section, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                className="bg-white/70 backdrop-blur-md border border-blue-100 rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="text-blue-700 w-6 h-6" />
                  <h2 className="text-xl font-semibold text-blue-900">{section.title}</h2>
                </div>
                <p className="text-blue-800 text-sm sm:text-base leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-14 bg-blue-100/50 rounded-xl p-6 sm:p-8 border border-blue-200 shadow-sm"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-3">
            GDPR Compliance
          </h3>
          <p className="text-blue-800 mb-2 text-sm sm:text-base">
            For users in the European Union, we comply with the General Data Protection Regulation (GDPR). You have specific rights regarding your personal data under GDPR.
          </p>
          <p className="text-blue-800 text-sm sm:text-base">
            To exercise your rights or for any privacy-related inquiries, contact our Data Protection Officer at{" "}
            <a href="mailto:dpo@futbolconect.com" className="text-blue-700 underline hover:text-blue-900">dpo@futbolconect.com</a>.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Privacy;
