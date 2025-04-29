import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Calendar, Footprints, Target } from 'lucide-react';

const CreateSearchAdvert = () => {
  const [formData, setFormData] = useState({
    position: '',
    ageMin: '',
    ageMax: '',
    preferredFoot: '',
    availability: '',
    requirements: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the formData to an API
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      position: '',
      ageMin: '',
      ageMax: '',
      preferredFoot: '',
      availability: '',
      requirements: ''
    });
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
      className="min-h-screen bg-gray-50 p-6 md:p-8"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div 
          variants={itemVariants}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
            Create Player Search Advert
          </h1>
          <p className="text-gray-600">
            Find the perfect player for your team by specifying your requirements.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100 hover:shadow-md transition-shadow duration-300"
        >
          <form onSubmit={handleSubmit}>
            <motion.div variants={containerVariants} className="space-y-6">
              {/* Position */}
              <motion.div variants={itemVariants}>
                <label className="flex items-center text-sm font-medium text-blue-900 mb-2">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Position
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  required
                >
                  <option value="">Select position</option>
                  <option value="Goalkeeper">Goalkeeper</option>
                  <option value="Defender">Defender</option>
                  <option value="Midfielder">Midfielder</option>
                  <option value="Forward">Forward</option>
                </select>
              </motion.div>

              {/* Age Range */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
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
                    className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </motion.div>

              {/* Preferred Foot */}
              <motion.div variants={itemVariants}>
                <label className="flex items-center text-sm font-medium text-blue-900 mb-2">
                  <Footprints className="w-5 h-5 mr-2 text-blue-600" />
                  Preferred Foot
                </label>
                <select
                  name="preferredFoot"
                  value={formData.preferredFoot}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">Any</option>
                  <option value="Left">Left</option>
                  <option value="Right">Right</option>
                  <option value="Both">Both</option>
                </select>
              </motion.div>

              {/* Availability */}
              <motion.div variants={itemVariants}>
                <label className="flex items-center text-sm font-medium text-blue-900 mb-2">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Availability
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  required
                >
                  <option value="">Select availability</option>
                  <option value="Loan">Loan</option>
                  <option value="Sale">Sale</option>
                  <option value="Loan/Sale">Loan/Sale</option>
                  <option value="Free Agent">Free Agent</option>
                </select>
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
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
                  rows="4"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="flex justify-end">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 10px rgba(0, 91, 234, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium flex items-center hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Post Advert
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