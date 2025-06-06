import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MakePlayerAvailable = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    position: 'Forward',
    age: '',
    club: '',
    nationality: '',
    contractEnd: '',
    asking: '',
    notes: '',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', // Default image
    flag: '🏳️', // Default flag
    status: 'Available',
    enquiries: 0,
    starred: false,
    stats: {
      goals: 0,
      assists: 0,
      rating: 0
    },
    contact: {
      email: '',
      phone: '',
      location: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const navigateBack = () => {
    navigate('/available-players');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.club.trim()) newErrors.club = 'Current club is required';
    if (!formData.nationality.trim()) newErrors.nationality = 'Nationality is required';
    if (!formData.contractEnd) newErrors.contractEnd = 'Contract end date is required';
    if (!formData.contact.email) newErrors.email = 'Email is required';
    if (!formData.contact.phone) newErrors.phone = 'Phone is required';
    if (!formData.contact.location) newErrors.location = 'Location is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Create a new player object
    const newPlayer = {
      id: Date.now(), // Generate a unique ID
      ...formData,
      stats: {
        goals: parseInt(formData.stats.goals) || 0,
        assists: parseInt(formData.stats.assists) || 0,
        rating: parseFloat(formData.stats.rating) || 0
      }
    };

    // Get existing players from localStorage
    const existingPlayers = JSON.parse(localStorage.getItem('availablePlayers') || '[]');
    
    // Add new player to the list
    const updatedPlayers = [...existingPlayers, newPlayer];
    
    // Save to localStorage
    localStorage.setItem('availablePlayers', JSON.stringify(updatedPlayers));

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Player successfully added to available list!');
      navigate('/available-players');
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center mb-6"
        >
          <button
            onClick={navigateBack}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Outplacement
          </button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-6"
          >
            Make Player Available
          </motion.h1>

          <motion.form
            variants={containerVariants}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Player Name */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Player Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </motion.div>

              {/* Position */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Position*
                </label>
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Forward">Forward</option>
                  <option value="Midfielder">Midfielder</option>
                  <option value="Defender">Defender</option>
                  <option value="Goalkeeper">Goalkeeper</option>
                </select>
              </motion.div>

              {/* Age */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Age*
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="15"
                  max="45"
                  value={formData.age}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.age ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Player's age"
                />
                {errors.age && (
                  <p className="mt-1 text-sm text-red-500">{errors.age}</p>
                )}
              </motion.div>

              {/* Current Club */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="club"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Current Club*
                </label>
                <input
                  type="text"
                  id="club"
                  name="club"
                  value={formData.club}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.club ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Player's current club"
                />
                {errors.club && (
                  <p className="mt-1 text-sm text-red-500">{errors.club}</p>
                )}
              </motion.div>

              {/* Nationality */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="nationality"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nationality*
                </label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.nationality ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Player's nationality"
                />
                {errors.nationality && (
                  <p className="mt-1 text-sm text-red-500">{errors.nationality}</p>
                )}
              </motion.div>

              {/* Contract End */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="contractEnd"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contract End Date*
                </label>
                <input
                  type="date"
                  id="contractEnd"
                  name="contractEnd"
                  value={formData.contractEnd}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.contractEnd ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.contractEnd && (
                  <p className="mt-1 text-sm text-red-500">{errors.contractEnd}</p>
                )}
              </motion.div>

              {/* Asking Price */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="asking"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Asking Price (€)
                </label>
                <input
                  type="text"
                  id="asking"
                  name="asking"
                  value={formData.asking}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 2,500,000"
                />
              </motion.div>
            </div>

            {/* Additional Notes */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any additional information about the player..."
              ></textarea>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex justify-end gap-4 pt-4"
            >
              <motion.button
                type="button"
                onClick={navigateBack}
                className="flex items-center px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <X className="h-5 w-5 mr-2" />
                Cancel
              </motion.button>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center px-6 py-2.5 ${
                  isSubmitting
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white rounded-lg font-medium`}
                whileHover={
                  isSubmitting
                    ? {}
                    : { scale: 1.02, boxShadow: '0 4px 10px rgba(0, 91, 234, 0.2)' }
                }
                whileTap={isSubmitting ? {} : { scale: 0.98 }}
              >
                <Save className="h-5 w-5 mr-2" />
                {isSubmitting ? 'Processing...' : 'Make Available'}
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MakePlayerAvailable;