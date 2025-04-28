import { motion } from 'framer-motion';

const PricingCard = ({ plan, delay = 0 }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay, 
        duration: 0.6, 
        ease: 'easeOut' 
      }
    },
    hover: {
      y: -10,
      boxShadow: '0 10px 20px rgba(59, 130, 246, 0.2)',
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.03, 
      backgroundColor: '#1d4ed8',
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bg-white rounded-xl shadow-lg overflow-hidden transform-gpu max-w-sm mx-auto"
      style={{ border: '1px solid rgba(59, 130, 246, 0.1)' }}
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-800 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)'
        }} />
        <h2 className="text-2xl font-bold tracking-tight relative z-10">{plan.name}</h2>
      </div>
      
      <div className="p-6 bg-gray-50">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {plan.durations.map((duration, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, backgroundColor: '#ffffff' }}
              className="border border-blue-100 rounded-lg p-4 bg-white shadow-sm transition-colors duration-200"
            >
              <p className="font-medium text-blue-800">{duration.months} months</p>
              <p className="text-2xl font-bold text-gray-900 my-2">{duration.price}</p>
              <p className="text-gray-500 text-sm">{duration.note}</p>
              {duration.save && (
                <p className="text-green-600 text-sm font-medium mt-1">{duration.save}</p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg text-blue-900 mb-3">Transfers Out</h3>
          <ul className="space-y-3">
            {plan.features.transfersOut.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex items-start"
              >
                <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg text-blue-900 mb-3">Transfers In</h3>
          <ul className="space-y-3">
            {plan.features.transfersIn.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex items-start"
              >
                <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg text-blue-900 mb-3">Grow your global network</h3>
          <ul className="space-y-3">
            {plan.features.network.map((feature, i) => (
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                key={i}
                className="flex items-start"
              >
                <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <p className="text-gray-500 text-sm mb-6">{plan.note}</p>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          Choose {plan.name}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PricingCard;