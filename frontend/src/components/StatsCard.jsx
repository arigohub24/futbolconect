import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const StatsCard = ({ title, value, additional, delay = 0, icon, color = "blue" }) => {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState([]);
  const controls = useAnimation();
  const cardRef = useRef(null);

  // Parse value as number if possible
  const numericValue = parseFloat(value);
  const isNumeric = !isNaN(numericValue);

  // Enhanced color schemes with dynamic gradients
  const colorSchemes = {
    blue: {
      bgGradient: "from-blue-100 via-blue-50 to-white",
      iconBg: "bg-blue-200/50",
      iconColor: "text-blue-700",
      accentColor: "bg-blue-600",
      textColor: "text-blue-950",
      subText: "text-blue-800",
      borderColor: "border-blue-200/50",
      glowColor: "bg-blue-400/30",
      particleColor: "bg-blue-500"
    },
    green: {
      bgGradient: "from-green-100 via-green-50 to-white",
      iconBg: "bg-green-200/50",
      iconColor: "text-green-700",
      accentColor: "bg-green-600",
      textColor: "text-green-950",
      subText: "text-green-800",
      borderColor: "border-green-200/50",
      glowColor: "bg-green-400/30",
      particleColor: "bg-green-500"
    },
    purple: {
      bgGradient: "from-purple-100 via-purple-50 to-white",
      iconBg: "bg-purple-200/50",
      iconColor: "text-purple-700",
      accentColor: "bg-purple-600",
      textColor: "text-purple-950",
      subText: "text-purple-800",
      borderColor: "border-purple-200/50",
      glowColor: "bg-purple-400/30",
      particleColor: "bg-purple-500"
    }
  };

  const scheme = colorSchemes[color] || colorSchemes.blue;

  // Animation variants with enhanced effects
  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        delay,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.1
      }
    },
    hover: { 
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 }
  };

  // Particle effect for numeric changes
  const createParticle = () => ({
    id: Math.random(),
    x: Math.random() * 100,
    y: Math.random() * 100,
    scale: Math.random() * 0.5 + 0.5
  });

  // Count-up animation with particle effects
  useEffect(() => {
    if (isNumeric && count < numericValue) {
      const interval = setInterval(() => {
        setCount(prevCount => {
          const increment = Math.max(1, Math.floor(numericValue / 20));
          const nextCount = prevCount + increment;
          
          // Add particles on significant updates
          if (Math.random() > 0.7) {
            setParticles(prev => [...prev, createParticle()].slice(-5));
          }
          
          return nextCount > numericValue ? numericValue : nextCount;
        });
      }, 40);

      return () => clearInterval(interval);
    }
  }, [count, numericValue, isNumeric]);

  // Reset counter and particles when value changes
  useEffect(() => {
    setCount(0);
    setParticles([]);
  }, [value]);

  // Default icons
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
      ref={cardRef}
      variants={cardVariants}
      initial="initial"
      animate={controls}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative bg-gradient-to-br ${scheme.bgGradient} p-6 rounded-2xl shadow-lg border ${scheme.borderColor} overflow-hidden backdrop-blur-sm`}
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 ${scheme.glowColor}`}
        animate={{
          opacity: isHovered ? 0.3 : 0,
          transition: { duration: 0.5 }
        }}
      />

      {/* Particle effects */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className={`absolute w-2 h-2 rounded-full ${scheme.particleColor}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`
          }}
          initial={{ scale: particle.scale, opacity: 1 }}
          animate={{ 
            scale: 0,
            opacity: 0,
            y: -50
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}

      {/* Decorative accent line with animation */}
      <motion.div 
        className={`absolute top-0 left-0 h-full w-1.5 ${scheme.accentColor}`}
        initial={{ height: 0 }}
        animate={{ height: '100%' }}
        transition={{ duration: 0.8, delay: delay }}
      />

      <div className="flex justify-between items-start relative z-10">
        <motion.div variants={contentVariants}>
          <h3 className="text-gray-600 text-sm font-medium tracking-wide uppercase">{title}</h3>
          <div className="flex items-baseline mt-2">
            <motion.p 
              className={`text-4xl font-extrabold ${scheme.textColor}`}
              animate={{ 
                scale: isHovered ? 1.05 : 1,
                transition: { duration: 0.3 }
              }}
            >
              {isNumeric ? count : value}
            </motion.p>
            {additional && (
              <motion.span 
                variants={contentVariants}
                className={`ml-3 text-sm ${scheme.subText}`}
              >
                {additional}
              </motion.span>
            )}
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.15, rotate: 8 }}
          whileTap={{ scale: 0.95 }}
          className={`${scheme.iconBg} ${scheme.iconColor} p-3 rounded-xl shadow-sm`}
        >
          {icon || getDefaultIcon()}
        </motion.div>
      </div>

      {/* Enhanced progress bar */}
      {isNumeric && (
        <motion.div 
          className="w-full h-1.5 bg-gray-100/50 rounded-full mt-5 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
        >
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (count / numericValue) * 100)}%` }}
            className={`h-full ${scheme.accentColor} relative overflow-hidden`}
            transition={{ duration: 1.5, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <div className={`absolute inset-0 ${scheme.glowColor} animate-pulse`} />
          </motion.div>
        </motion.div>
      )}

      {/* Enhanced hover effect */}
      {isHovered && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 2, opacity: 0.2 }}
          transition={{ 
            repeat: Infinity,
            duration: 2,
            ease: "easeOut"
          }}
          className={`absolute -right-8 -bottom-8 w-24 h-24 rounded-full ${scheme.accentColor}`}
        />
      )}
    </motion.div>
  );
};

export default StatsCard;