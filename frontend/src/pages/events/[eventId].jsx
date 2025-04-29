// src/pages/events/EventDetails.jsx
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Video } from 'lucide-react';

const EventDetails = () => {
  const { eventId } = useParams();

  const eventsData = {
    'summit-istanbul-2024': {
      id: 'summit-istanbul-2024',
      type: 'Summit',
      title: 'TR Summit Istanbul 2024',
      description: 'Supercharge your global network in just 2 days',
      date: 'October 15-16, 2024',
      location: 'Istanbul, Turkey',
      stats: [
        { label: 'Club attendees', value: '300+' },
        { label: 'Expected deals per club', value: '1.9' },
      ],
      features: [
        'Meet hundreds of club decision makers face to face',
        '20+ focused 15 minute meetings',
        'Save time and money while growing your network',
      ],
      agenda: [
        { time: '09:00', activity: 'Registration & Welcome Coffee' },
        { time: '10:00', activity: 'Opening Keynote' },
        { time: '11:00', activity: 'Networking Sessions Begin' },
        { time: '18:00', activity: 'Closing Remarks & Cocktail Reception' },
      ],
      icon: Calendar,
    },
    'virtual-deal-days': {
      id: 'virtual-deal-days',
      type: 'Virtual',
      title: 'Virtual Deal Days',
      description: 'Get weeks of business done in one afternoon',
      date: 'November 8, 2024',
      location: 'Online',
      stats: [
        { label: 'Club attendees', value: '200+' },
        { label: 'Expected deals per agency', value: '1.3' },
      ],
      features: [
        '15 minute meetings with decision makers',
        'No travel required',
        'Accelerate transfer talks',
      ],
      schedule: [
        { round: 1, club: 'FC Copenhagen', role: 'Sporting Director', time: '14:15' },
        { round: 1, club: 'Kashima Antlers', role: 'Director of Football', time: '14:30' },
        { round: 2, club: 'Houston Dynamo', role: 'Technical Director', time: '15:30' },
      ],
      icon: Video,
    },
  };

  const event = eventsData[eventId];

  if (!event) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center p-6"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-6">The event youre looking for doesnt exist or has been moved.</p>
          <Link to="/events">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              Back to All Events
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };


  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen p-8 bg-white text-gray-900"
    >
      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
      <p className="mb-4 text-lg text-gray-600">{event.description}</p>
      <div className="mb-6">
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Location:</strong> {event.location}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Key Stats</h2>
        <ul className="list-disc list-inside">
          {event.stats?.map((stat, index) => (
            <li key={index}>{stat.label}: {stat.value}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Features</h2>
        <ul className="list-disc list-inside">
          {event.features?.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      {event.agenda && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Agenda</h2>
          <ul className="list-disc list-inside">
            {event.agenda.map((item, idx) => (
              <li key={idx}>{item.time} - {item.activity}</li>
            ))}
          </ul>
        </div>
      )}

      {event.schedule && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Schedule</h2>
          <ul className="list-disc list-inside">
            {event.schedule.map((item, idx) => (
              <li key={idx}>
                {item.time} - {item.club} ({item.role})
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default EventDetails;
