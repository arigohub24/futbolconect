import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, PieChart, Target, X, Check, ChevronDown, ChevronUp, Cookie } from 'lucide-react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDetails, setShowDetails] = useState({
    necessary: false,
    analytics: false,
    marketing: false
  });
  const [cookies, setCookies] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Small delay for better UX
    const timer = setTimeout(() => {
      const consent = localStorage.getItem('cookieConsent');
      if (!consent) {
        setShowBanner(true);
      } else {
        try {
          const savedCookies = JSON.parse(consent);
          setCookies(savedCookies);
        } catch (e) {
          console.error("Error parsing cookie consent:", e);
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const acceptAll = () => {
    const allCookies = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    localStorage.setItem('cookieConsent', JSON.stringify(allCookies));
    setCookies(allCookies);
    
    // Close with animation
    animateClose();
  };

  const animateClose = () => {
    // We'll set this to false after animation completes
    setTimeout(() => {
      setShowBanner(false);
    }, 500);
  };

  const savePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(cookies));
    animateClose();
  };

  const toggleCookie = (type) => {
    setCookies(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const toggleDetails = (type) => {
    setShowDetails(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Icons for each cookie type
  const cookieIcons = {
    necessary: <Shield size={20} />,
    analytics: <PieChart size={20} />,
    marketing: <Target size={20} />
  };

  // Cookie type details
  const cookieDetails = {
    necessary: {
      title: "Necessary Cookies",
      description: "Essential for the website to function properly. These cookies enable basic functions like page navigation and access to secure areas of the website.",
      examples: ["Session cookies", "Security cookies", "CSRF tokens"]
    },
    analytics: {
      title: "Analytics Cookies",
      description: "Help us understand how visitors interact with our website. These cookies collect information that is used to improve our website and services.",
      examples: ["Google Analytics", "Hotjar", "Session recordings"]
    },
    marketing: {
      title: "Marketing Cookies",
      description: "Used to track visitors across websites to display relevant advertisements. These cookies may collect information about your online activity.",
      examples: ["Facebook Pixel", "Google Ads", "Retargeting cookies"]
    }
  };

  // Animation variants
  const bannerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    },
    exit: { 
      opacity: 0, 
      y: 100,
      transition: { 
        duration: 0.5,
        ease: "easeInOut" 
      }
    }
  };

  const settingsVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { 
        duration: 0.3 
      }
    }
  };

  const detailsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: { 
        duration: 0.3,
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { 
        duration: 0.3,
        ease: "easeIn" 
      }
    }
  };

  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { 
      rotate: 20,
      scale: 1.1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 md:p-6 shadow-lg border-t border-gray-700">
            <div className="max-w-6xl mx-auto">
              <AnimatePresence mode="wait">
                {!showSettings ? (
                  <motion.div
                    key="banner"
                    variants={settingsVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col md:flex-row items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        variants={iconVariants}
                        initial="initial"
                        whileHover="hover"
                        className="text-blue-400"
                      >
                        <Cookie size={24} />
                      </motion.div>
                      <div className="text-sm md:text-base">
                        <p className="font-medium mb-1">We value your privacy</p>
                        <p className="text-gray-300">We use cookies to enhance your browsing experience, serve personalized ads, and analyze our traffic. See our <a href="/cookies" className="text-blue-400 hover:underline">Cookie Policy</a> for details.</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowSettings(true)}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors border border-gray-600 flex items-center gap-2"
                      >
                        <span>Customize</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={acceptAll}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors shadow-md flex items-center gap-2"
                      >
                        <Check size={16} />
                        <span>Accept All</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="settings"
                    variants={settingsVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6 relative"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowSettings(false)}
                      className="absolute right-0 top-0 p-1 hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <X size={20} />
                    </motion.button>
                    
                    <div>
                      <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                        <Cookie size={20} className="text-blue-400" />
                        Cookie Preferences
                      </h3>
                      <p className="text-sm text-gray-300 mb-4">
                        Control which cookies you allow us to use. Some cookies are necessary for the website to function properly.
                      </p>
                    </div>
                    
                    <motion.div
                      variants={staggerItems}
                      initial="hidden"
                      animate="visible"
                      className="space-y-4"
                    >
                      {/* Necessary Cookies */}
                      <motion.div
                        variants={itemVariants}
                        className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500 bg-opacity-20 rounded-lg text-blue-400">
                              {cookieIcons.necessary}
                            </div>
                            <div>
                              <p className="font-medium">{cookieDetails.necessary.title}</p>
                              <p className="text-sm text-gray-300">Essential for the website to function</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <label className="relative inline-flex items-center cursor-not-allowed">
                              <input
                                type="checkbox"
                                checked={cookies.necessary}
                                className="sr-only peer"
                                disabled
                              />
                              <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleDetails('necessary')}
                              className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                            >
                              {showDetails.necessary ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </motion.button>
                          </div>
                        </div>
                        
                        <AnimatePresence>
                          {showDetails.necessary && (
                            <motion.div
                              variants={detailsVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="mt-4 pt-4 border-t border-gray-700"
                            >
                              <p className="text-sm text-gray-300 mb-3">
                                {cookieDetails.necessary.description}
                              </p>
                              <div className="bg-gray-700 p-3 rounded-md">
                                <p className="text-xs font-medium mb-2">Examples:</p>
                                <ul className="text-xs text-gray-300 pl-4 list-disc">
                                  {cookieDetails.necessary.examples.map((example, index) => (
                                    <li key={index}>{example}</li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      
                      {/* Analytics Cookies */}
                      <motion.div
                        variants={itemVariants}
                        className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-500 bg-opacity-20 rounded-lg text-green-400">
                              {cookieIcons.analytics}
                            </div>
                            <div>
                              <p className="font-medium">{cookieDetails.analytics.title}</p>
                              <p className="text-sm text-gray-300">Help us improve our website</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={cookies.analytics}
                                onChange={() => toggleCookie('analytics')}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleDetails('analytics')}
                              className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                            >
                              {showDetails.analytics ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </motion.button>
                          </div>
                        </div>
                        
                        <AnimatePresence>
                          {showDetails.analytics && (
                            <motion.div
                              variants={detailsVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="mt-4 pt-4 border-t border-gray-700"
                            >
                              <p className="text-sm text-gray-300 mb-3">
                                {cookieDetails.analytics.description}
                              </p>
                              <div className="bg-gray-700 p-3 rounded-md">
                                <p className="text-xs font-medium mb-2">Examples:</p>
                                <ul className="text-xs text-gray-300 pl-4 list-disc">
                                  {cookieDetails.analytics.examples.map((example, index) => (
                                    <li key={index}>{example}</li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      
                      {/* Marketing Cookies */}
                      <motion.div
                        variants={itemVariants}
                        className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500 bg-opacity-20 rounded-lg text-purple-400">
                              {cookieIcons.marketing}
                            </div>
                            <div>
                              <p className="font-medium">{cookieDetails.marketing.title}</p>
                              <p className="text-sm text-gray-300">Used for personalized ads</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={cookies.marketing}
                                onChange={() => toggleCookie('marketing')}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleDetails('marketing')}
                              className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                            >
                              {showDetails.marketing ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </motion.button>
                          </div>
                        </div>
                        
                        <AnimatePresence>
                          {showDetails.marketing && (
                            <motion.div
                              variants={detailsVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="mt-4 pt-4 border-t border-gray-700"
                            >
                              <p className="text-sm text-gray-300 mb-3">
                                {cookieDetails.marketing.description}
                              </p>
                              <div className="bg-gray-700 p-3 rounded-md">
                                <p className="text-xs font-medium mb-2">Examples:</p>
                                <ul className="text-xs text-gray-300 pl-4 list-disc">
                                  {cookieDetails.marketing.examples.map((example, index) => (
                                    <li key={index}>{example}</li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>
                    
                    <div className="pt-4 flex justify-end gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowSettings(false)}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors border border-gray-600"
                      >
                        Back
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={savePreferences}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors shadow-md flex items-center gap-2"
                      >
                        <Check size={16} />
                        <span>Save Preferences</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;