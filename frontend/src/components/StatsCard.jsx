import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, additional, delay = 0, icon, color = "blue" }) => {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Parse value as number if possible
  const numericValue = parseFloat(value);
  const isNumeric = !isNaN(numericValue);
  
  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay,
        ease: "easeOut"
      }
    },
    hover: { 
      y: -5,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  
  // Color scheme mapping
  const colorSchemes = {
    blue: {
      bgGradient: "from-blue-50 to-white",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      accentColor: "bg-blue-500",
      textColor: "text-blue-900",
      subText: "text-blue-700",
      borderColor: "border-blue-100"
    },
    green: {
      bgGradient: "from-green-50 to-white",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      accentColor: "bg-green-500",
      textColor: "text-green-900",
      subText: "text-green-700",
      borderColor: "border-green-100"
    },
    purple: {
      bgGradient: "from-purple-50 to-white",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      accentColor: "bg-purple-500",
      textColor: "text-purple-900",
      subText: "text-purple-700",
      borderColor: "border-purple-100"
    }
  };
  
  const scheme = colorSchemes[color] || colorSchemes.blue;
  
  // Count-up animation for numeric values
  useEffect(() => {
    if (isNumeric) {
      if (count < numericValue) {
        const interval = setInterval(() => {
          setCount(prevCount => {
            const increment = Math.max(1, Math.floor(numericValue / 20));
            const nextCount = prevCount + increment;
            return nextCount > numericValue ? numericValue : nextCount;
          });
        }, 40);
        
        return () => clearInterval(interval);
      }
    }
  }, [count, numericValue, isNumeric]);
  
  // Reset counter when value changes
  useEffect(() => {
    setCount(0);
  }, [value]);
  
  // Select appropriate icon if none provided
  const getDefaultIcon = () => {
    if (title.toLowerCase().includes('player')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    } else if (title.toLowerCase().includes('match') || title.toLowerCase().includes('game')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    } else if (title.toLowerCase().includes('win') || title.toLowerCase().includes('score') || title.toLowerCase().includes('point')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    }
    
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    );
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`bg-gradient-to-br ${scheme.bgGradient} p-6 rounded-xl shadow-md overflow-hidden border ${scheme.borderColor} relative`}
    >
      {/* Decorative accent line */}
      <div className={`absolute top-0 left-0 h-full w-1 ${scheme.accentColor}`}></div>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <div className="flex items-baseline mt-2">
            <p className={`text-3xl font-bold ${scheme.textColor}`}>
              {isNumeric ? count : value}
            </p>
            {additional && (
              <div className="ml-2">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: delay + 0.4 }}
                  className="text-gray-500 text-sm"
                >
                  {additional}
                </motion.span>
              </div>
            )}
          </div>
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`${scheme.iconBg} ${scheme.iconColor} p-3 rounded-lg`}
        >
          {icon || getDefaultIcon()}
        </motion.div>
      </div>
      
      {/* Progress bar for numeric values */}
      {isNumeric && (
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: delay + 0.2, duration: 1.2, ease: "easeOut" }}
          className="w-full h-1 bg-gray-100 rounded-full mt-4 overflow-hidden"
        >
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (count / numericValue) * 100)}%` }}
            className={`h-full ${scheme.accentColor}`}
          ></motion.div>
        </motion.div>
      )}
      
      {/* Pulsing animation when hovered */}
      {isHovered && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5,
            ease: "easeOut"
          }}
          className={`absolute right-0 bottom-0 w-16 h-16 rounded-full ${scheme.accentColor} opacity-20`}
        ></motion.div>
      )}
    </motion.div>
  );
};

export default StatsCard;