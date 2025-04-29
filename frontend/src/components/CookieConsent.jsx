import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookies, setCookies] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else {
      try {
        const savedCookies = JSON.parse(consent);
        setCookies(savedCookies);
      } catch (e) {
        // Handle error if needed
      }
    }
  }, []);

  const acceptAll = () => {
    const allCookies = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    localStorage.setItem('cookieConsent', JSON.stringify(allCookies));
    setCookies(allCookies);
    setShowBanner(false);
  };

  const savePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(cookies));
    setShowBanner(false);
  };

  const toggleCookie = (type) => {
    setCookies(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50"
        >
          <div className="max-w-6xl mx-auto">
            {!showSettings ? (
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm md:text-base">
                  We use cookies to enhance your experience. See our <a href="/cookies" className="text-blue-400 hover:underline">Cookie Policy</a> for details.
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-sm font-medium transition-colors"
                  >
                    Preferences
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Cookie Preferences</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Necessary Cookies</p>
                      <p className="text-sm text-gray-300">Essential for the website to function</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cookies.necessary}
                        className="sr-only peer"
                        disabled
                      />
                      <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Analytics Cookies</p>
                      <p className="text-sm text-gray-300">Help us improve our website</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cookies.analytics}
                        onChange={() => toggleCookie('analytics')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Cookies</p>
                      <p className="text-sm text-gray-300">Used for personalized ads</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cookies.marketing}
                        onChange={() => toggleCookie('marketing')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-sm font-medium transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={savePreferences}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;