import { motion } from 'framer-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { LogOut, User, Briefcase } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { data: user, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const res = await fetch('/api/auth/me', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include cookies for session
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
        // Invalidate the authUser query to force refetch
        await queryClient.invalidateQueries({ queryKey: ['authUser'] });
        // Optionally, set authUser to null immediately
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
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="sm:ml-6 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-blue-900">{user?.name}</h2>
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
                  { label: 'Full Name', value: user?.name || 'Not provided' },
                  { label: 'Email', value: user?.email },
                  { label: 'Country', value: user?.country || 'Not provided' },
                  { label: 'Club/Organization', value: user?.club || 'Not provided' },
                ].map((item, index) => (
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
                <Briefcase className="w-5 h-5 mr-2 text-blue-600" /> Account Settings
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Account Type', value: user?.role || 'user' },
                  { label: 'Member Since', value: new Date(user?.createdAt).toLocaleDateString() },
                  { label: 'Plan', value: user?.plan || 'Not subscribed' },
                ].map((item, index) => (
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

        <motion.div variants={itemVariants} className="flex justify-end">
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