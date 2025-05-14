import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Shield, Users, Globe } from 'lucide-react';

const Join = () => {
  const [hovered, setHovered] = useState(null);
  
  const plans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        { icon: <Globe size={16} />, text: "Access to league listings" },
        { icon: <Users size={16} />, text: "Basic club search" },
        { icon: <Shield size={16} />, text: "Limited connections" },
      ],
      cta: "Join Free",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      recommended: false
    },
    {
      name: "Pro",
      price: "Contact Us",
      features: [
        { icon: <Globe size={16} />, text: "Full club search" },
        { icon: <Users size={16} />, text: "Unlimited connections" },
        { icon: <Shield size={16} />, text: "Priority support" },
        { icon: <Star size={16} />, text: "Exclusive events" },
      ],
      cta: "Get Started",
      color: "bg-gradient-to-br from-blue-600 to-indigo-700",
      recommended: true
    }
  ];

  const fadeInUpVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const backgroundVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 50, 
        damping: 15 
      }
    }
  };

  const cardVariants = (index) => ({
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 15,
        delay: 0.2 + (index * 0.15)
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  });

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="py-12 relative overflow-hidden"
    >
      {/* Background elements */}
      <motion.div 
        variants={backgroundVariants}
        className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-50 to-gray-100"
      />
      <motion.div 
        variants={backgroundVariants}
        className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-blue-100 opacity-70 blur-3xl" 
      />
      <motion.div 
        variants={backgroundVariants}
        className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-indigo-100 opacity-70 blur-3xl" 
      />

      {/* Content container */}
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Hero section */}
        <motion.div 
          variants={fadeInUpVariants}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <Star size={12} className="mr-1" /> Get Connected Today
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Join <span className="text-blue-600">futbol conect</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Become part of the worlds leading football networking platform and start connecting with clubs today
          </motion.p>
        </motion.div>

        {/* Plans section */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants(index)}
              whileHover="hover"
              onHoverStart={() => setHovered(index)}
              onHoverEnd={() => setHovered(null)}
              className={`bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 relative ${plan.recommended ? 'ring-2 ring-blue-500' : ''}`}
            >
              {plan.recommended && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (index * 0.15) }}
                  className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-bl-lg"
                >
                  Recommended
                </motion.div>
              )}
              
              <div className={`h-2 w-full ${plan.color}`}></div>
              
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h2>
                <p className="text-3xl font-extrabold text-gray-900 mb-6">{plan.price}</p>
                
                <motion.ul 
                  variants={containerVariants}
                  className="text-gray-600 mb-8 space-y-4"
                >
                  {plan.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      variants={featureVariants}
                      custom={i}
                      className="flex items-center"
                    >
                      <motion.span 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8 + (i * 0.1) }}
                        className="text-blue-600 mr-2"
                      >
                        {feature.icon}
                      </motion.span>
                      {feature.text}
                    </motion.li>
                  ))}
                </motion.ul>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full px-6 py-3 text-white rounded-lg font-medium flex items-center justify-center ${plan.color} transition-all duration-300`}
                >
                  {plan.cta}
                  <motion.div
                    animate={{ x: hovered === index ? 5 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ChevronRight size={18} className="ml-1" />
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div
          variants={fadeInUpVariants}
          className="mt-16 text-center"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-gray-600 mb-4"
          >
            Not sure which plan is right for you?
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium"
          >
            Compare Plans
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Join;