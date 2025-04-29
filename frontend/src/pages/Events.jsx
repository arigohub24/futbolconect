import { motion } from 'framer-motion';
import MeetingSchedule from '../components/MeetingSchedule';
import { Calendar, Video, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Events = () => {
  const events = [
    {
      type: "Summit",
      title: "TR Summit Istanbul 2024",
      description: "Supercharge your global network in just 2 days",
      stats: [
        { label: "Club attendees", value: "300+" },
        { label: "Expected deals per club", value: "1.9" }
      ],
      features: [
        "Meet hundreds of club decision makers face to face",
        "20+ focused 15 minute meetings",
        "Save time and money while growing your network"
      ],
      icon: Calendar
    },
    {
      type: "Virtual",
      title: "Virtual Deal Days",
      description: "Get weeks of business done in one afternoon",
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
      icon: Video
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
      className="min-h-screen bg-gray-50 p-6 md:p-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-blue-900 mb-8"
        >
          Upcoming Events
        </motion.h1>

        {events.map((event, index) => (
          <motion.div 
            key={index}
            variants={containerVariants}
            className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8 border border-gray-100 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex flex-col md:flex-row items-start justify-between mb-6">
              <div className="flex items-start">
                <event.icon className="w-10 h-10 text-blue-600 mr-4 mt-1" />
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
                    className="text-gray-600 max-w-xl"
                  >
                    {event.description}
                  </motion.p>
                </div>
              </div>
              <Link href={`/events/${event.id}`} passHref>
                <motion.a
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 10px rgba(0, 91, 234, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Register Now
                </motion.a>
              </Link>
            </div>

            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6"
            >
              {event.stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, backgroundColor: "#EBF5FF" }}
                  className="bg-blue-50 p-4 rounded-lg text-center transition-colors"
                >
                  <p className="text-2xl md:text-3xl font-bold text-blue-600">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              variants={containerVariants}
              className="mb-6"
            >
              <motion.h3 
                variants={itemVariants}
                className="text-lg font-semibold text-blue-900 mb-3"
              >
                Key Features
              </motion.h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {event.features.map((feature, i) => (
                  <motion.li 
                    key={i}
                    variants={itemVariants}
                    whileHover={{ x: 8, color: "#005BEA" }}
                    className="flex items-start text-gray-700"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {event.schedule && (
              <motion.div variants={itemVariants}>
                <MeetingSchedule schedule={event.schedule} />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Events;