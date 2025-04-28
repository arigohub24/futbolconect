"use client";

import { motion } from 'framer-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { LogOut, User, Briefcase, Edit2 } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { data: user, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const res = await fetch('/api/auth/me', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch user data');
      return data;
    },
  });

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (res.ok) {
        await queryClient.invalidateQueries({ queryKey: ['authUser'] });
        queryClient.setQueryData(['authUser'], null);
        navigate('/login', { replace: true });
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to log out. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
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
        <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
          Your Profile
        </motion.h1>

        <motion.div
          variants={containerVariants}
          className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-6 border border-gray-100 hover:shadow-md transition-shadow duration-300"
        >
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold mb-4 sm:mb-0">
              {user?.firstName?.charAt(0).toUpperCase()}
            </div>
            <div className="sm:ml-6 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-blue-900">{`${user?.firstName} ${user?.lastName}`}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={containerVariants}>
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" /> Personal Information
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'First Name', value: user?.firstName || 'Not provided' },
                  { label: 'Last Name', value: user?.lastName || 'Not provided' },
                  { label: 'Email', value: user?.email },
                  { label: 'Country', value: user?.country || 'Not provided' },
                  { label: 'Phone Number', value: user?.phoneNumber || 'Not provided' },
                  user?.role === 'player' && { label: 'Date of Birth', value: user?.dateOfBirth || 'Not provided' },
                ].filter(Boolean).map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <p className="text-gray-500 text-sm">{item.label}</p>
                    <p className="font-medium text-gray-800">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={containerVariants}>
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-blue-600" /> Professional Information
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Role', value: user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1).replace("_", " ") : 'Not provided' },
                  user?.role === 'scout' && { label: 'Scouting For', value: user?.scoutType ? user.scoutType.charAt(0).toUpperCase() + user.scoutType.slice(1) + 's' : 'Not provided' },
                  user?.role === 'scout' && { label: 'Club/Organization', value: user?.club ? user.club.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") : 'Not provided' },
                  user?.role === 'player' && { label: 'Current Club', value: user?.currentClub || 'Not provided' },
                  user?.role === 'club_staff' && { label: 'Organization', value: user?.organizationName || 'Not provided' },
                  user?.role === 'club_staff' && { label: 'Job Title', value: user?.jobTitle || 'Not provided' },
                  user?.role === 'coach' && { label: 'Coaching License', value: user?.coachingLicense || 'Not provided' },
                  user?.role === 'coach' && { label: 'Years of Experience', value: user?.yearsExperience || 'Not provided' },
                  user?.role === 'agent' && { label: 'Agency Name', value: user?.agencyName || 'Not provided' },
                  user?.role === 'agent' && { label: 'License Number', value: user?.licenseNumber || 'Not provided' },
                  { label: 'Referral Source', value: user?.referral ? user.referral.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") : 'Not provided' },
                  { label: 'Member Since', value: new Date(user?.createdAt).toLocaleDateString() },
                  { label: 'Plan', value: user?.plan || 'Not subscribed' },
                ].filter(Boolean).map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <p className="text-gray-500 text-sm">{item.label}</p>
                    <p className="font-medium text-gray-800 capitalize">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-end gap-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 4px 10px rgba(30, 144, 255, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEditProfile}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
          >
            <Edit2 className="w-5 h-5 mr-2" /> Edit Profile
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 4px 10px rgba(239, 68, 68, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <LogOut className="w-5 h-5 mr-2" /> {isLoggingOut ? 'Logging Out...' : 'Log Out'}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;