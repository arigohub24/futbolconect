"use client";

import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { Save, ArrowLeft } from 'lucide-react';

const EditProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const { data: user, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const res = await fetch('/api/auth/me', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch user data');
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
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update profile');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      navigate('/profile');
    },
    onError: (error) => {
      alert(`Failed to update profile: ${error.message}`);
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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="min-h-screen bg-gray-50 p-6 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div variants={itemVariants} className="flex items-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/profile')}
            className="mr-4 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900">Edit Profile</h1>
        </motion.div>

        <motion.form
          variants={containerVariants}
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100 hover:shadow-md transition-shadow duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={containerVariants}>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Personal Information</h3>
              {[
                { label: 'First Name', name: 'firstName', type: 'text', required: true },
                { label: 'Last Name', name: 'lastName', type: 'text', required: true },
                { label: 'Email', name: 'email', type: 'email', required: true },
                { label: 'Country', name: 'country', type: 'text' },
                { label: 'Phone Number', name: 'phoneNumber', type: 'tel' },
                user?.role === 'player' && { label: 'Date of Birth', name: 'dateOfBirth', type: 'date' },
              ].filter(Boolean).map((field, index) => (
                <motion.div key={index} variants={itemVariants} className="mb-4">
                  <label className="block text-gray-600 text-sm font-medium mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors[field.name] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required={field.required}
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={containerVariants}>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Professional Information</h3>
              {[
                user?.role === 'player' && { label: 'Current Club', name: 'currentClub', type: 'text' },
                user?.role === 'scout' && { label: 'Club/Organization', name: 'club', type: 'text' },
                user?.role === 'club_staff' && { label: 'Organization', name: 'organizationName', type: 'text' },
                user?.role === 'club_staff' && { label: 'Job Title', name: 'jobTitle', type: 'text' },
                user?.role === 'coach' && { label: 'Coaching License', name: 'coachingLicense', type: 'text' },
                user?.role === 'coach' && { label: 'Years of Experience', name: 'yearsExperience', type: 'number' },
                user?.role === 'agent' && { label: 'Agency Name', name: 'agencyName', type: 'text' },
                user?.role === 'agent' && { label: 'License Number', name: 'licenseNumber', type: 'text' },
              ].filter(Boolean).map((field, index) => (
                <motion.div key={index} variants={itemVariants} className="mb-4">
                  <label className="block text-gray-600 text-sm font-medium mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex justify-end gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => navigate('/profile')}
              className="bg-gray-200 text-gray-800 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 4px 10px rgba(30, 144, 255, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={updateProfileMutation.isLoading}
              className={`bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center ${
                updateProfileMutation.isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Save className="w-5 h-5 mr-2" />
              {updateProfileMutation.isLoading ? 'Saving...' : 'Save Changes'}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default EditProfile;