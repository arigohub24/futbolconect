import { motion } from 'framer-motion';
import { Clock, Users, BadgeCheck } from 'lucide-react';

const MeetingSchedule = ({ schedule }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  // Group meetings by round
  const meetingsByRound = schedule.reduce((acc, meeting) => {
    if (!acc[meeting.round]) {
      acc[meeting.round] = [];
    }
    acc[meeting.round].push(meeting);
    return acc;
  }, {});

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-blue-600" />
        Your Meeting Schedule
      </h3>

      {Object.entries(meetingsByRound).map(([round, meetings]) => (
        <motion.div 
          key={round}
          variants={itemVariants}
          className="mb-6"
        >
          <div className="flex items-center mb-3">
            <div className="bg-blue-600 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center mr-2">
              {round}
            </div>
            <h4 className="text-lg font-medium text-gray-800">Round {round}</h4>
          </div>

          <div className="space-y-3">
            {meetings.map((meeting, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02, x: 5 }}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="bg-blue-50 p-2 rounded-full mr-4">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">{meeting.club}</p>
                    <p className="text-sm text-gray-500">{meeting.role}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm font-medium">{meeting.time}</span>
                  <BadgeCheck className="h-5 w-5 text-green-500 ml-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      <motion.div
        variants={itemVariants}
        className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg"
      >
        <p className="text-sm text-blue-700">
          <strong>Pro tip:</strong> Prepare key points before each meeting to maximize your time with decision makers.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MeetingSchedule;