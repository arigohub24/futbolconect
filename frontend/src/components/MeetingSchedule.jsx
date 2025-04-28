import { useState } from 'react';
import { motion } from 'framer-motion';

const MeetingSchedule = ({ schedule }) => {
  const [expandedRound, setExpandedRound] = useState(null);
  
  // Group by round
  const rounds = schedule.reduce((acc, meeting) => {
    if (!acc[meeting.round]) acc[meeting.round] = [];
    acc[meeting.round].push(meeting);
    return acc;
  }, {});

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };
  
  const roundVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const meetingVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      className="rounded-xl bg-gradient-to-br from-blue-50 to-white p-6 shadow-lg border border-blue-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
        <h3 className="text-xl font-bold text-blue-800">Meeting Schedule</h3>
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {Object.entries(rounds).map(([round, meetings]) => {
          const isExpanded = expandedRound === round;
          
          return (
            <motion.div 
              key={round}
              variants={roundVariants}
              className="bg-white rounded-xl overflow-hidden shadow-md border border-blue-50 hover:shadow-lg transition-shadow duration-300"
            >
              <motion.div
                whileHover={{ backgroundColor: "#EFF6FF" }}
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={() => setExpandedRound(isExpanded ? null : round)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3 font-semibold">
                    R{round}
                  </div>
                  <h4 className="font-semibold text-blue-900">Club Meetings - Round {round}</h4>
                </div>
                
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-50 text-blue-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={false}
                animate={{ 
                  height: isExpanded ? 'auto' : 0,
                  opacity: isExpanded ? 1 : 0
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <motion.div variants={containerVariants} initial="hidden" animate={isExpanded ? "visible" : "hidden"} className="divide-y divide-blue-50">
                  {meetings.map((meeting, i) => (
                    <motion.div
                      key={i}
                      variants={meetingVariants}
                      whileHover={{ backgroundColor: "#F0F9FF" }}
                      className="p-4 flex justify-between items-center"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-full">
                          <div className={`w-2 h-2 mt-2 rounded-full ${getStatusColor(meeting.time)}`}></div>
                        </div>
                        <div>
                          <p className="font-medium text-blue-900">{meeting.club}</p>
                          <p className="text-blue-600 text-sm">{meeting.role}</p>
                          
                          {meeting.location && (
                            <div className="flex items-center mt-1 text-xs text-gray-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {meeting.location}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getTimeClass(meeting.time)}`}
                        >
                          {meeting.time}
                        </motion.span>
                        
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 15 }}
                          className="ml-3 text-blue-400 hover:text-blue-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Green action button at bottom of expanded section */}
                {isExpanded && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-3 bg-blue-50 flex justify-end"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-400 text-white text-sm font-medium rounded-full shadow-sm hover:shadow flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Meeting
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Summary indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100"
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
            {Object.values(rounds).flat().length}
          </div>
          <span className="ml-3 text-blue-800 font-medium">Total Meetings</span>
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center text-sm text-blue-600 hover:underline cursor-pointer"
        >
          View Calendar
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Helper functions for styling based on time
const getTimeClass = (time) => {
  if (time.includes('AM')) {
    return 'bg-blue-100 text-blue-800';
  } else if (time.includes('PM') && parseInt(time) < 5) {
    return 'bg-green-100 text-green-800';
  } else {
    return 'bg-purple-100 text-purple-800';
  }
};

const getStatusColor = (time) => {
  if (time.includes('AM')) {
    return 'bg-blue-500';
  } else if (time.includes('PM') && parseInt(time) < 5) {
    return 'bg-green-500';
  } else {
    return 'bg-purple-500';
  }
};

export default MeetingSchedule;