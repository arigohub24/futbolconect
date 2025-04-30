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

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const res = await fetch('/api/auth/me', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log('Auth Error:', data);
        throw new Error(data.error || 'Failed to fetch user data');
      }
      console.log('User Data:', data);
      setFormData({
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
      });
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
        console.log('Update Response Status:', res.status);
        console.log('Update Response Body:', text);
        throw new Error(`Failed to update profile: ${text}`);
      }
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    },
    onError: (error) => {
      console.error('Update Profile Error:', error);
      setErrors({ form: error.message || 'Failed to update profile' });
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4,
        ease: "backOut"
      } 
    },
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      } 
    },
    exit: { opacity: 0, x: -20 }
  };

  const professionalFields = [
    { label: 'Current Club', name: 'currentClub', type: 'text' },
    { label: 'Club/Organization', name: 'club', type: 'text' },
    { label: 'Organization', name: 'organizationName', type: 'text' },
    { label: 'Job Title', name: 'jobTitle', type: 'text' },
    { label: 'Coaching License', name: 'coachingLicense', type: 'text' },
    { 
      label: 'Years of Experience', 
      name: 'yearsExperience', 
      type: 'number',
      min: 0,
      max: 50
    },
    { label: 'Agency Name', name: 'agencyName', type: 'text' },
    { label: 'License Number', name: 'licenseNumber', type: 'text' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="text-blue-600"
        >
          <Loader2 className="w-12 h-12" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500">Error: {error.message}. Please log in again.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4"
        >
          <div className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/profile')}
              className="mr-4 text-blue-600 hover:text-blue-800 bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Edit Profile</h1>
              <p className="text-gray-500">Update your personal and professional information</p>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 flex items-center"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
            <span className="font-medium text-gray-700 capitalize">{user?.role?.replace('_', ' ') || 'Unknown Role'}</span>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-inner border border-gray-200 max-w-md">
            {['personal', 'professional'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSection(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex-1 ${
                  activeSection === tab
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Info
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center"
            >
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-green-700">{successMessage}</span>
            </motion.div>
          )}
          
          {errors.form && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center"
            >
              <XCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700">{errors.form}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          variants={containerVariants}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100 hover:shadow-md transition-all duration-300"
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
                <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center">
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
                      animate={errors[field.name] && shake ? "shake" : "visible"}
                      className="mb-4"
                    >
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                          errors[field.name] ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        required={field.required}
                      />
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
                <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  Professional Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {professionalFields.map((field, index) => (
                    <motion.div 
                      key={index} 
                      variants={itemVariants}
                      className="mb-4"
                    >
                      <label className="block text-gray-600 text-sm font-medium mb-1">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        min={field.min}
                        max={field.max}
                        className="w-full p-3 border rounded-xl border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col-reverse md:flex-row justify-end gap-4 mt-10 pt-6 border-t border-gray-100"
          >
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: '#e5e7eb' }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => navigate('/profile')}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all flex items-center justify-center"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ 
                scale: 1.03, 
                boxShadow: '0 4px 14px rgba(30, 144, 255, 0.3)',
                backgroundColor: '#1a73e8'
              }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={updateProfileMutation.isLoading}
              className={`bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center ${
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