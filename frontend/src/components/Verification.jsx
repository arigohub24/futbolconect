import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Verification = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    phoneNumber: '',
    role: '',
    heardAboutUs: '',
    agreeToPolicy: false,
    clubDetails: '',
    agencyDetails: '',
    dateOfBirth: '',
    licenseNumber: '',
    coachingLevel: '',
    scoutingRegion: '',
    staffPosition: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission and navigation
  const handleSubmit = () => {
    // Optional: Add form validation logic here
    if (!formData.agreeToPolicy) {
      alert('Please agree to the Privacy Policy.');
      return;
    }
    // Navigate to dashboard
    navigate('/dashboard');
  };

  // Football-themed color palette
  const colors = {
    primary: 'bg-[#3a5fe5]',
    primaryHover: 'hover:bg-[#2a4fd5]',
    secondary: 'bg-[#ff6b35]',
    accent: 'bg-[#00a896]',
    light: 'bg-[#f7f9fc]',
    dark: 'bg-[#1a1a2e]',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: 'beforeChildren',
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10

      },
    },
  };

  const RoleSpecificFields = () => {
    switch (formData.role) {
      case 'player':
        return (
          <>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4"
            >
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor="clubDetails"
              >
                Club Details
              </label>
              <input
                className={`shadow appearance-none border-2 border-[#3a5fe5] rounded-lg w-full py-3 px-4 text-white ${colors.dark} leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent`}
                id="clubDetails"
                name="clubDetails"
                type="text"
                placeholder="Current club name"
                value={formData.clubDetails}
                onChange={handleChange}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor="agencyDetails"
              >
                Agency Details
              </label>
              <input
                className={`shadow appearance-none border-2 border-[#3a5fe5] rounded-lg w-full py-3 px-4 text-white ${colors.dark} leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent`}
                id="agencyDetails"
                name="agencyDetails"
                type="text"
                placeholder="Agency/Representative name"
                value={formData.agencyDetails}
                onChange={handleChange}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor="dateOfBirth"
              >
                Date of Birth
              </label>
              <input
                className={`shadow appearance-none border-2 border-[#3a5fe5] rounded-lg w-full py-3 px-4 text-white ${colors.dark} leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent`}
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </motion.div>
          </>
        );
      case 'coach':
        return (
          <>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4"
            >
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor="licenseNumber"
              >
                License Number
              </label>
              <input
                className={`shadow appearance-none border-2 border-[#3a5fe5] rounded-lg w-full py-3 px-4 text-white ${colors.dark} leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent`}
                id="licenseNumber"
                name="licenseNumber"
                type="text"
                placeholder="Coaching license number"
                value={formData.licenseNumber}
                onChange={handleChange}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor="coachingLevel"
              >
                Coaching Level
              </label>
              <select
                className={`shadow appearance-none border-2 border-[#3a5fe5] rounded-lg w-full py-3 px-4 text-white ${colors.dark} leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent`}
                id="coachingLevel"
                name="coachingLevel"
                value={formData.coachingLevel}
                onChange={handleChange}
              >
                <option value="">Select coaching level</option>
                <option value="UEFA A">UEFA A</option>
                <option value="UEFA B">UEFA B</option>
                <option value="UEFA Pro">UEFA Pro</option>
                <option value="National A">National A</option>
                <option value="Other">Other</option>
              </select>
            </motion.div>
          </>
        );
      case 'scout':
        return (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4"
          >
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor="scoutingRegion"
            >
              Scouting Region
            </label>
            <input
              className={`shadow appearance-none border-2 border-[#3a5fe5] rounded-lg w-full py-3 px-4 text-white ${colors.dark} leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent`}
              id="scoutingRegion"
              name="scoutingRegion"
              type="text"
              placeholder="Primary scouting region/country"
              value={formData.scoutingRegion}
              onChange={handleChange}
            />
          </motion.div>
        );
      case 'staff':
        return (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4"
          >
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor="staffPosition"
            >
              Staff Position
            </label>
            <input
              className={`shadow appearance-none border-2 border-[#3a5fe5] rounded-lg w-full py-3 px-4 text-white ${colors.dark} leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent`}
              id="staffPosition"
              name="staffPosition"
              type="text"
              placeholder="Your position in the club"
              value={formData.staffPosition}
              onChange={handleChange}
            />
          </motion.div>
        );
      case 'agent':
        return (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4"
          >
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor="agencyDetails"
            >
              Agency Details
            </label>
            <input
              className={`shadow appearance-none border-2 border-[#3a5fe5] rounded-lg w-full py-3 px-4 text-white ${colors.dark} leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent`}
              id="agencyDetails"
              name="agencyDetails"
              type="text"
              placeholder="Agency name and registration details"
              value={formData.agencyDetails}
              onChange={handleChange}
            />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] py-12 px-4 sm:px-6 lg:px-8`}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className={`max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl ${colors.dark} border-2 border-[#3a5fe5]`}
      >
        {/* Header with football pattern */}
        <div
          className={`relative py-6 px-8 ${colors.primary} bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzYTVmZTUiLz48cGF0aCBkPSJNMCAwTDIwIDIwTTQwIDBMNjAgMjBNODAgMEwxMDAgMjBNMTIwIDBMMTQwIDIwTTE2MCAwTDE4MCAyME0yMDAgMEwyMjAgMjAiIHN0cm9rZT0iIzAwYTg5NiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+')]`}
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <div className="ml-3">
              <h1 className="text-3xl font-bold text-white">Football Connect</h1>
              <motion.h2
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-1 text-lg font-medium text-[#a5d8ff]"
              >
                Player Verification Portal
              </motion.h2>
            </div>
          </motion.div>
          <div className="absolute bottom-0 right-0 opacity-20">
            <svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M3 12H5M19 12H21M12 3V5M12 19V21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-8"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className={`shadow appearance-none border-2 border-[#3a5fe5] rounded-lg w-full py-3 px-4 text-white ${colors.dark} leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent`}
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className={`shadow appearance-none border-2 border-[#3a5fe5] rounded-lg w-full py-3 px-4 text-white ${colors.dark} leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent`}
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor="country"
            >
              Country
            </label>
            <select
              className={`shadow appearance-none border-2 border-[#3a5fe5] rounded-lg w-full py-3 px-4 text-white ${colors.dark} leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent`}
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="" className="text-gray-400">
                Select your country
              </option>
              <option value="USA" className="text-white">
                United States
              </option>
              <option value="UK" className="text-white">
                United Kingdom
              </option>
              <option value="Germany" className="text-white">
                Germany
              </option>
              <option value="Spain" className="text-white">
                Spain
              </option>
              <option value="France" className="text-white">
                France
              </option>
              <option value="Italy" className="text-white">
                Italy
              </option>
              <option value="Brazil" className="text-white">
                Brazil
              </option>
              <option value="Other" className="text-white">
                Other
              </option>
            </select>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              className={`shadow appearance-none border-2 border-[#3a5fe5] rounded-lg w-full py-3 px-4 text-white ${colors.dark} leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent`}
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor="role"
            >
              Your Role
            </label>
            <select
              className={`shadow appearance-none border-2 border-[#3a5fe5] rounded-lg w-full py-3 px-4 text-white ${colors.dark} leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent`}
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="" className="text-gray-400">
                Select your role
              </option>
              <option value="player" className="text-white">
                Player
              </option>
              <option value="coach" className="text-white">
                Coach
              </option>
              <option value="agent" className="text-white">
                Agent
              </option>
              <option value="staff" className="text-white">
                Club Staff
              </option>
              <option value="scout" className="text-white">
                Scout
              </option>
            </select>
          </motion.div>

          <AnimatePresence>
            {formData.role && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-6"
              >
                <div className="border-l-4 border-[#ff6b35] pl-4">
                  <RoleSpecificFields />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div variants={itemVariants} className="mb-6">
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor="heardAboutUs"
            >
              How did you hear about us?
            </label>
            <select
              className={`shadow appearance-none border-2 border-[#3a5fe5] rounded-lg w-full py-3 px-4 text-white ${colors.dark} leading-tight focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent`}
              id="heardAboutUs"
              name="heardAboutUs"
              value={formData.heardAboutUs}
              onChange={handleChange}
            >
              <option value="" className="text-gray-400">
                Select an option
              </option>
              <option value="friend" className="text-white">
                Friend/Colleague
              </option>
              <option value="social" className="text-white">
                Social Media
              </option>
              <option value="search" className="text-white">
                Search Engine
              </option>
              <option value="event" className="text-white">
                Football Event
              </option>
              <option value="other" className="text-white">
                Other
              </option>
            </select>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToPolicy"
                  name="agreeToPolicy"
                  type="checkbox"
                  className={`h-5 w-5 rounded border-2 border-[#3a5fe5] ${colors.dark} focus:ring-2 focus:ring-[#ff6b35]`}
                  checked={formData.agreeToPolicy}
                  onChange={handleChange}
                />
              </div>
              <label
                htmlFor="agreeToPolicy"
                className="ml-3 block text-sm text-white"
              >
                I agree to the{' '}
                <a
                  href="#"
                  className="text-[#00a896] hover:underline font-semibold"
                >
                  Privacy Policy
                </a>
                . By checking this box, you confirm that all information provided
                is accurate.
              </label>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              className={`w-full ${colors.primary} ${colors.primaryHover} text-white font-bold py-4 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff6b35] transition-all duration-200 shadow-lg`}
              type="button"
              onClick={handleSubmit} // Add onClick handler
            >
              Complete Verification
              <svg
                className="w-5 h-5 ml-2 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Verification;