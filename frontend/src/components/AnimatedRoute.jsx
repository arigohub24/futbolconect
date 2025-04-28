// components/AnimatedRoute.jsx
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AnimatedRoute = ({ children }) => {
  const router = useRouter();
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for back

  useEffect(() => {
    const handleRouteChange = (url) => {
      // Determine navigation direction by comparing path depth
      const currentDepth = router.asPath.split('/').length;
      const newDepth = url.split('/').length;
      setDirection(newDepth >= currentDepth ? 1 : -1);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  // Animation variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <motion.div
      key={router.asPath}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      }}
    >
      {/* Decorative animated elements */}
      <motion.div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          background: 'linear-gradient(90deg, #3b82f6 0%, #10b981 50%, #3b82f6 100%)',
          zIndex: 50,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      />
      
      {/* Main content */}
      <div style={{
        padding: '2rem',
        position: 'relative',
        zIndex: 10,
      }}>
        {children}
      </div>
      
      {/* Floating decorative elements */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0) 70%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default AnimatedRoute;