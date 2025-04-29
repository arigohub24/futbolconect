import { motion } from "framer-motion";

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
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-blue-900 mb-4"
          >
            Futbol Conect Webinars
          </motion.h1>
          <p className="text-lg text-blue-800 max-w-2xl mx-auto">
            Learn from industry experts through our interactive online sessions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {upcomingWebinars.map((webinar) => (
            <motion.div
              key={webinar.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100"
            >
              <div className="bg-blue-600 p-4">
                <span className="text-white font-medium">{webinar.category}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">{webinar.title}</h3>
                <div className="flex items-center text-blue-800 mb-3">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {webinar.date} • {webinar.time}
                </div>
                <div className="flex items-center text-blue-700 mb-4">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Hosted by {webinar.speaker}
                </div>
                <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Register Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Past Webinar Recordings</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {['Tactical Analysis Basics', 'Nutrition for Footballers', 'Injury Prevention'].map((title, index) => (
              <motion.div 
                key={index}
                whileHover={{ x: 5 }}
                className="flex items-center p-4 border border-blue-200 rounded-lg cursor-pointer"
              >
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-blue-800">{title}</h3>
                  <p className="text-sm text-blue-600">Watch recording</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Webinars;