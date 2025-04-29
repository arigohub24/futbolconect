import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, delayChildren: 0.3, duration: 0.6 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const Webinars = () => {
  const upcomingWebinars = [
    {
      id: 1,
      title: "Advanced Football Analytics",
      date: "June 15, 2023",
      time: "2:00 PM GMT",
      speaker: "Dr. Maria Sanchez",
      category: "Analytics"
    },
    {
      id: 2,
      title: "Youth Football Development",
      date: "June 22, 2023",
      time: "4:00 PM GMT",
      speaker: "Coach James Wilson",
      category: "Training"
    },
    {
      id: 3,
      title: "Tech in Modern Football",
      date: "July 5, 2023",
      time: "1:00 PM GMT",
      speaker: "Tech Director Liam Brown",
      category: "Technology"
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-14">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl font-extrabold text-blue-900 mb-3"
          >
            Futbol Conect Webinars
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-blue-800 max-w-xl mx-auto"
          >
            Learn from industry experts through our interactive online sessions.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {upcomingWebinars.map((webinar) => (
            <motion.div
              key={webinar.id}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100 transition-all"
            >
              <div className="bg-blue-600 p-4">
                <span className="text-white font-semibold uppercase tracking-wide text-sm">
                  {webinar.category}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-blue-900">{webinar.title}</h3>
                <div className="flex items-center text-blue-800 text-sm">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {webinar.date} • {webinar.time}
                </div>
                <div className="flex items-center text-blue-700 text-sm">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Hosted by {webinar.speaker}
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ backgroundColor: "#2563eb" }}
                  className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition duration-200"
                >
                  Register Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Past Webinar Recordings
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {["Tactical Analysis Basics", "Nutrition for Footballers", "Injury Prevention"].map(
              (title, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center p-4 border border-blue-200 rounded-lg cursor-pointer transition-all"
                >
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800">{title}</h3>
                    <p className="text-sm text-blue-600">Watch recording</p>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Webinars;
