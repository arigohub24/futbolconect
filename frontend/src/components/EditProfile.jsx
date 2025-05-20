"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Save, ArrowLeft, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const EditProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [activeSection, setActiveSection] = useState('personal');
  const [shake, setShake] = useState(false);
  const [formProgress, setFormProgress] = useState(0);

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const res = await fetch('/api/auth/me', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch user data');
      }
      const initialFormData = {
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        country: data.country || '',
        phoneNumber: data.phoneNumber || '',
        dateOfBirth: data.dateOfBirth || '',
        currentClub: data.currentClub || '',
        club: data.club || '',
        organizationName: data.organizationName || '',
        jobTitle: data.jobTitle || '',
        coachingLicense: data.coachingLicense || '',
        yearsExperience: data.yearsExperience || '',
        agencyName: data.agencyName || '',
        licenseNumber: data.licenseNumber || '',
      };
      setFormData(initialFormData);
      calculateFormProgress(initialFormData);
      return data;
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await fetch('/api/auth/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to update profile: ${text}`);
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => navigate('/profile'), 1500);
    },
    onError: (error) => {
      setErrors({ form: error.message || 'Failed to update profile' });
    },
  });

  const calculateFormProgress = (data) => {
    const totalFields = Object.keys(data).length;
    const filledFields = Object.values(data).filter(val => val && val.trim() !== '').length;
    setFormProgress(Math.round((filledFields / totalFields) * 100));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      calculateFormProgress(updated);
      return updated;
    });
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (Object.keys(newErrors).length > 0) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    updateProfileMutation.mutate(formData);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, when: 'beforeChildren', staggerChildren: 0.1 },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    shake: { x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.5 } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, x: -20 },
  };

  const professionalFields = [
    { label: 'Current Club', name: 'currentClub', type: 'text' },
    { label: 'Club/Organization', name: 'club', type: 'text' },
    { label: 'Organization', name: 'organizationName', type: 'text' },
    { label: 'Job Title', name: 'jobTitle', type: 'text' },
    { label: 'Coaching License', name: 'coachingLicense', type: 'text' },
    { label: 'Years of Experience', name: 'yearsExperience', type: 'number', min: 0, max: 50 },
    { label: 'Agency Name', name: 'agencyName', type: 'text' },
    { label: 'License Number', name: 'licenseNumber', type: 'text' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="text-blue-600"
        >
          <Loader2 className="w-12 h-12" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <p className="text-red-500 text-lg font-medium">Error: {error.message}. Please log in again.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8 flex items-center justify-center"
    >
      <div className="max-w-4xl w-full">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/profile')}
              className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <ArrowLeft className="w-6 h-6 text-blue-600" />
            </motion.button>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
                Edit Your Profile
              </h1>
              <p className="text-gray-500 text-lg mt-1">Personalize your account with your details</p>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
            <span className="font-medium text-gray-700 capitalize">
              {user?.role?.replace('_', ' ') || 'User'}
            </span>
          </motion.div>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          variants={itemVariants}
          className="mb-8 bg-white/50 backdrop-blur-md rounded-xl p-4 shadow-sm"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Profile Completion</span>
            <span className="text-sm font-semibold text-blue-600">{formProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div
              className="bg-blue-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${formProgress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex space-x-2 bg-white/50 backdrop-blur-md p-2 rounded-xl shadow-inner">
            {['personal', 'professional'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveSection(tab)}
                whileHover={{ scale: 1.05, backgroundColor: '#2563eb' }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  activeSection === tab
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/80'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Info
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Messages */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-green-100/80 backdrop-blur-md border border-green-300 rounded-xl flex items-center"
            >
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">{successMessage}</span>
            </motion.div>
          )}
          {errors.form && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-red-100/80 backdrop-blur-md border border-red-300 rounded-xl flex items-center"
            >
              <XCircle className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-800 font-medium">{errors.form}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <motion.form
          variants={containerVariants}
          onSubmit={handleSubmit}
          className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/30 hover:shadow-2xl transition-all duration-300"
        >
          <AnimatePresence mode="wait">
            {activeSection === 'personal' && (
              <motion.div
                key="personal"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100/50 flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'First Name', name: 'firstName', type: 'text', required: true },
                    { label: 'Last Name', name: 'lastName', type: 'text', required: true },
                    { label: 'Email', name: 'email', type: 'email', required: true },
                    { label: 'Country', name: 'country', type: 'text' },
                    { label: 'Phone Number', name: 'phoneNumber', type: 'tel' },
                    { label: 'Date of Birth', name: 'dateOfBirth', type: 'date' },
                  ].map((field, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      animate={errors[field.name] && shake ? 'shake' : 'visible'}
                      className="relative"
                    >
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        className={`peer w-full p-4 pt-6 border rounded-xl transition-all duration-300 ${
                          errors[field.name]
                            ? 'border-red-400 bg-red-50/50'
                            : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
                        } focus:ring-2 focus:ring-blue-500/20 bg-white/50 backdrop-blur-sm`}
                        required={field.required}
                        placeholder=" "
                      />
                      <label
                        className={`absolute left-4 top-4 text-gray-500 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 ${
                          formData[field.name] ? '-top-2 text-xs text-blue-600' : ''
                        } ${errors[field.name] ? 'text-red-500' : ''}`}
                      >
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {errors[field.name] && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1 flex items-center"
                        >
                          <XCircle className="w-3 h-3 mr-1" />
                          {errors[field.name]}
                        </motion.p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === 'professional' && (
              <motion.div
                key="professional"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="min-h-[200px]"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100/50 flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {professionalFields.map((field, index) => (
                    <motion.div key={index} variants={itemVariants} className="relative">
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        min={field.min}
                        max={field.max}
                        className="peer w-full p-4 pt-6 border rounded-xl border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white/50 backdrop-blur-sm"
                        placeholder=" "
                      />
                      <label
                        className={`absolute left-4 top-4 text-gray-500 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 ${
                          formData[field.name] ? '-top-2 text-xs text-blue-600' : ''
                        }`}
                      >
                        {field.label}
                      </label>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            variants={itemVariants}
            className="flex flex-col-reverse md:flex-row justify-end gap-4 mt-10 pt-6 border-t border-gray-100/50"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#f3f4f6' }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => navigate('/profile')}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all flex items-center justify-center shadow-sm"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 8px 20px rgba(37, 99, 235, 0.3)',
                backgroundColor: '#1d4ed8',
              }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={updateProfileMutation.isLoading}
              className={`bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center shadow-lg ${
                updateProfileMutation.isLoading ? 'opacity-80 cursor-not-allowed' : ''
              }`}
            >
              {updateProfileMutation.isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default EditProfile;
