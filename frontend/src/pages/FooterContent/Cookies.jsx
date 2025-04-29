import { motion } from "framer-motion";

const Cookies = () => {
  const cookieTypes = [
    {
      name: "Essential Cookies",
      purpose: "Necessary for the website to function properly",
      example: "Authentication, security features"
    },
    {
      name: "Performance Cookies",
      purpose: "Help us understand how visitors interact with our site",
      example: "Analytics cookies"
    },
    {
      name: "Functionality Cookies",
      purpose: "Enable enhanced features and personalization",
      example: "Language preferences"
    },
    {
      name: "Targeting/Advertising Cookies",
      purpose: "Used to deliver relevant ads",
      example: "Tracking across websites"
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
            Cookies & GDPR
          </motion.h1>
          <p className="text-lg text-blue-800">
            Information about our use of cookies and GDPR compliance
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Cookie Policy</h2>
          
          <div className="space-y-6">
            {cookieTypes.map((cookie, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.01 }}
                className="border border-blue-100 rounded-lg p-5"
              >
                <h3 className="text-lg font-semibold text-blue-800 mb-2">{cookie.name}</h3>
                <p className="text-blue-700 mb-1"><span className="font-medium">Purpose:</span> {cookie.purpose}</p>
                <p className="text-blue-700"><span className="font-medium">Example:</span> {cookie.example}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-5 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Managing Cookies</h3>
            <p className="text-blue-800 mb-4">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and set most browsers to prevent them from being placed.
            </p>
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Manage Cookie Preferences
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">GDPR Compliance</h2>
          <div className="prose prose-blue">
            <p className="text-blue-800 mb-4">
              Futbol Conect is fully compliant with the General Data Protection Regulation (GDPR). This regulation gives EU citizens more control over their personal data.
            </p>
            <h3 className="text-xl font-semibold text-blue-900 mt-6 mb-3">Your Rights Under GDPR</h3>
            <ul className="list-disc pl-5 text-blue-800 space-y-2 mb-6">
              <li>Right to access your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure (right to be forgotten)</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>
            <p className="text-blue-800">
              To exercise any of these rights, please contact our Data Protection Officer at <span className="font-medium">dpo@futbolconect.com</span>.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cookies;