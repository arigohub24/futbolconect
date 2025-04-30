import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Video, MapPin, CheckCircle, ArrowRight, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Events = () => {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  
  const events = [
    {
      id: 'summit-istanbul-2024',
      type: "Summit",
      title: "TR Summit Istanbul 2024",
      description: "Supercharge your global network in just 2 days",
      date: "October 15-16, 2024",
      location: "Istanbul Convention Center, Turkey",
      stats: [
        { label: "Club attendees", value: "300+" },
        { label: "Expected deals per club", value: "1.9" }
      ],
      features: [
        "Meet hundreds of club decision makers face to face",
        "20+ focused 15 minute meetings",
        "Save time and money while growing your network"
      ],
      icon: Calendar,
      bgColor: "from-blue-800 to-blue-600",
      registrationFee: "€999"
    },
    {
      id: 'virtual-deal-days',
      type: "Virtual",
      title: "Virtual Deal Days",
      description: "Get weeks of business done in one afternoon",
      date: "November 8, 2024",
      location: "Online",
      stats: [
        { label: "Club attendees", value: "200+" },
        { label: "Expected deals per agency", value: "1.3" }
      ],
      features: [
        "15 minute meetings with decision makers",
        "No travel required",
        "Accelerate transfer talks"
      ],
      schedule: [
        { round: 1, club: "FC Copenhagen", role: "Sporting Director", time: "14:15" },
        { round: 1, club: "Kashima Antlers", role: "Director of Football", time: "14:30" },
        { round: 2, club: "Houston Dynamo", role: "Technical Director", time: "15:30" }
      ],
      icon: Video,
      bgColor: "from-indigo-800 to-indigo-600",
      registrationFee: "€399"
    }
  ];

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
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6 md:p-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          variants={itemVariants}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-blue-900 mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Upcoming Events
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Connect with top clubs and decision makers at our exclusive events
          </motion.p>
        </motion.div>

        {events.map((event, index) => (
          <motion.div 
            key={index}
            variants={containerVariants}
            onHoverStart={() => setHoveredEvent(event.id)}
            onHoverEnd={() => setHoveredEvent(null)}
            className={`relative overflow-hidden bg-white rounded-xl shadow-md mb-12 border border-gray-100 hover:shadow-xl transition-all duration-300 ${hoveredEvent === event.id ? 'scale-[1.01]' : ''}`}
          >
            {/* Background gradient accent */}
            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${event.bgColor}`}></div>
            
            <div className="p-6 md:p-8">
              <div className="flex flex-col lg:flex-row items-start justify-between mb-8">
                <div className="flex items-start mb-6 lg:mb-0">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${event.bgColor} text-white mr-5 flex-shrink-0`}>
                    <event.icon className="w-8 h-8" />
                  </div>
                  
                  <div>
                    <motion.span 
                      variants={itemVariants}
                      className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-3"
                    >
                      {event.type} Event
                    </motion.span>
                    <motion.h2 
                      variants={itemVariants}
                      className="text-2xl md:text-3xl font-bold text-blue-900 mb-2"
                    >
                      {event.title}
                    </motion.h2>
                    <motion.p 
                      variants={itemVariants}
                      className="text-gray-600 max-w-xl mb-4"
                    >
                      {event.description}
                    </motion.p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-blue-500" />
                        <span>{event.stats[0].value} Attendees</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="text-right mb-4">
                    <p className="text-sm text-gray-500">Registration Fee</p>
                    <p className="text-2xl font-bold text-blue-700">{event.registrationFee}</p>
                  </div>
                  
                  <Link to={`/events/${event.id}`} className="block">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 4px 10px rgba(0, 91, 234, 0.2)" }}
                      whileTap={{ scale: 0.95 }}
                      className={`bg-gradient-to-r ${event.bgColor} text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center min-w-[160px]`}
                    >
                      Register Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.button>
                  </Link>
                </div>
              </div>

              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
              >
                {event.stats.map((stat, i) => (
                  <motion.div 
                    key={i}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03, backgroundColor: "#EBF5FF" }}
                    className="bg-blue-50 p-4 rounded-lg transition-colors"
                  >
                    <p className="text-2xl font-bold text-blue-700">{stat.value}</p>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
                
                {/* Spots left counter */}
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  className="bg-amber-50 p-4 rounded-lg transition-colors"
                >
                  <p className="text-2xl font-bold text-amber-600">15</p>
                  <p className="text-gray-600 text-sm">Spots remaining</p>
                </motion.div>
                
                {/* Time counter */}
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  className="bg-emerald-50 p-4 rounded-lg transition-colors flex items-center"
                >
                  <Clock className="w-8 h-8 text-emerald-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Registration closes in</p>
                    <p className="font-medium text-emerald-600">5 days</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div 
                variants={containerVariants}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <motion.h3 
                  variants={itemVariants}
                  className="text-lg font-semibold text-blue-900 mb-4"
                >
                  Event Highlights
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {event.features.map((feature, i) => (
                    <motion.div 
                      key={i}
                      variants={itemVariants}
                      whileHover={{ x: 8, color: "#005BEA" }}
                      className="flex items-start text-gray-700"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {event.schedule && (
                <motion.div 
                  variants={itemVariants}
                  className="mt-6 text-center"
                >
                  <Link to={`/events/${event.id}`} className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center">
                    View detailed schedule and meeting information
                    <ArrowRight className="ml-1 w-5 h-5" />
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Events;