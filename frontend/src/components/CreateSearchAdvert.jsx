import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Calendar, Footprints, Target, MapPin, Flag, Building,  MessageCircle } from 'lucide-react';

const CreateSearchAdvert = () => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    ageMin: '',
    ageMax: '',
    preferredFoot: '',
    availability: '',
    club: '',
    nationality: '',
    contractEnd: '',
    asking: '',
    stats: {
      goals: '',
      assists: '',
      rating: ''
    },
    contact: {
      email: '',
      phone: '',
      location: ''
    },
    requirements: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormData({
        name: '',
        position: '',
        ageMin: '',
        ageMax: '',
        preferredFoot: '',
        availability: '',
        club: '',
        nationality: '',
        contractEnd: '',
        asking: '',
        stats: {
          goals: '',
          assists: '',
          rating: ''
        },
        contact: {
          email: '',
          phone: '',
          location: ''
        },
        requirements: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-8"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div 
          variants={itemVariants}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
            Create Player Search Advert
          </h1>
          <p className="text-gray-700 text-lg">
            Find the perfect player for your team by specifying your requirements.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
        >
          <form onSubmit={handleSubmit}>
            <motion.div variants={containerVariants} className="space-y-8">
              {/* Basic Information */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-blue-900 mb-2">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Player Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    placeholder="Enter player name"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-blue-900 mb-2">
                    <Building className="w-5 h-5 mr-2 text-blue-600" />
                    Club
                  </label>
                  <input
                    type="text"
                    name="club"
                    value={formData.club}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    placeholder="Enter club name"
                    required
                  />
                </div>
              </motion.div>

              {/* Position and Nationality */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-blue-900 mb-2">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Position
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                    required
                  >
                    <option value="">Select position</option>
                    <option value="Goalkeeper">Goalkeeper</option>
                    <option value="Defender">Defender</option>
                    <option value="Midfielder">Midfielder</option>
                    <option value="Forward">Forward</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-blue-900 mb-2">
                    <Flag className="w-5 h-5 mr-2 text-blue-600" />
                    Nationality
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    placeholder="Enter nationality"
                    required
                  />
                </div>
              </motion.div>

              {/* Age Range */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-blue-900 mb-2">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    Minimum Age
                  </label>
                  <input
                    type="number"
                    name="ageMin"
                    value={formData.ageMin}
                    onChange={handleChange}
                    min="16"
                    max="40"
                    placeholder="e.g., 18"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-blue-900 mb-2">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    Maximum Age
                  </label>
                  <input
                    type="number"
                    name="ageMax"
                    value={formData.ageMax}
                    onChange={handleChange}
                    min="16"
                    max="40"
                    placeholder="e.g., 30"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    required
                  />
                </div>
              </motion.div>

              {/* Preferred Foot and Availability */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-blue-900 mb-2">
                    <Footprints className="w-5 h-5 mr-2 text-blue-600" />
                    Preferred Foot
                  </label>
                  <select
                    name="preferredFoot"
                    value={formData.preferredFoot}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                  >
                    <option value="">Any</option>
                    <option value="Left">Left</option>
                    <option value="Right">Right</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-blue-900 mb-2">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    Availability
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                    required
                  >
                    <option value="">Select availability</option>
                    <option value="Loan">Loan</option>
                    <option value="Sale">Sale</option>
                    <option value="Loan/Sale">Loan/Sale</option>
                    <option value="Free Agent">Free Agent</option>
                  </select>
                </div>
              </motion.div>

              {/* Contract and Asking Price */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-blue-900 mb-2">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    Contract End Date
                  </label>
                  <input
                    type="date"
                    name="contractEnd"
                    value={formData.contractEnd}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-blue-900 mb-2">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    Asking Price (€)
                  </label>
                  <input
                    type="text"
                    name="asking"
                    value={formData.asking}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    placeholder="e.g., 2,500,000"
                    required
                  />
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Performance Stats</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-2">Goals</label>
                    <input
                      type="number"
                      name="stats.goals"
                      value={formData.stats.goals}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                      placeholder="Enter goals"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-2">Assists</label>
                    <input
                      type="number"
                      name="stats.assists"
                      value={formData.stats.assists}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                      placeholder="Enter assists"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-2">Rating</label>
                    <input
                      type="number"
                      name="stats.rating"
                      value={formData.stats.rating}
                      onChange={handleChange}
                      step="0.1"
                      min="0"
                      max="10"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                      placeholder="Enter rating (0-10)"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center text-sm font-medium text-blue-900 mb-2">
                      <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="contact.email"
                      value={formData.contact.email}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center text-sm font-medium text-blue-900 mb-2">
                      <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="contact.phone"
                      value={formData.contact.phone}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center text-sm font-medium text-blue-900 mb-2">
                      <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                      Location
                    </label>
                    <input
                      type="text"
                      name="contact.location"
                      value={formData.contact.location}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                      placeholder="Enter location"
                      required
                    />
                  </div>
                </div>
              </motion.div>

              {/* Additional Requirements */}
              <motion.div variants={itemVariants}>
                <label className="flex items-center text-sm font-medium text-blue-900 mb-2">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Additional Requirements
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="Specify any additional requirements (e.g., playing style, experience level, etc.)"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y shadow-sm"
                  rows="4"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="flex justify-end">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 10px rgba(0, 91, 234, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                  className={`px-6 py-3 rounded-lg font-medium flex items-center transition-colors ${
                    isSubmitting
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="animate-spin mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                  ) : (
                    <Send className="w-5 h-5 mr-2" />
                  )}
                  {isSubmitting ? "Submitting..." : "Post Advert"}
                </motion.button>
              </motion.div>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CreateSearchAdvert;