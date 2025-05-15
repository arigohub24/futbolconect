// src/pages/events/EventDetails.jsx
import { useState } from 'react';
import { useParams, Link,  } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Video, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle,
  CreditCard,
  Award,
  User,
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

  const EventDetails = () => {
    const { eventId } = useParams();
  
    const [registrationOpen, setRegistrationOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [expandedFaqs, setExpandedFaqs] = useState([]);

    const toggleFaq = (index) => {
      if (expandedFaqs.includes(index)) {
        setExpandedFaqs(expandedFaqs.filter(i => i !== index));
      } else {
        setExpandedFaqs([...expandedFaqs, index]);
      }
    };

  const eventsData = {
    'summit-istanbul-2024': {
      id: 'summit-istanbul-2024',
      type: 'Summit',
      title: 'TR Summit Istanbul 2024',
      description: 'Supercharge your global network in just 2 days',
      date: 'October 15-16, 2024',
      time: '09:00 - 18:00',
      location: 'Istanbul Convention Center, Turkey',
      stats: [
        { label: 'Club attendees', value: '300+' },
        { label: 'Expected deals per club', value: '1.9' },
        { label: 'Total meetings', value: '4,500+' },
      ],
      features: [
        'Meet hundreds of club decision makers face to face',
        '20+ focused 15 minute meetings',
        'Save time and money while growing your network',
        'Direct access to exclusive networking events',
        'Personalized meeting scheduler',
      ],
      agenda: [
        { time: '09:00', activity: 'Registration & Welcome Coffee' },
        { time: '10:00', activity: 'Opening Keynote' },
        { time: '11:00', activity: 'Networking Sessions Begin' },
        { time: '13:00', activity: 'Lunch Break & Featured Presentations' },
        { time: '14:30', activity: 'Scheduled Meetings Continue' },
        { time: '18:00', activity: 'Closing Remarks & Cocktail Reception' },
      ],
      speakers: [
        { 
          name: 'Alessandro Del Piero', 
          role: 'Former Player & Ambassador', 
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Alessandro_Del_Piero_2012.jpg/800px-Alessandro_Del_Piero_2012.jpg'
        },
        { 
          name: 'Emma Hayes', 
          role: 'USWNT Head Coach', 
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Emma_Hayes_%28cropped%29.jpg/800px-Emma_Hayes_%28cropped%29.jpg'
        },
        { 
          name: 'Florentino Pérez', 
          role: 'Real Madrid President', 
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Florentino_P%C3%A9rez_2019.jpg/800px-Florentino_P%C3%A9rez_2019.jpg'
        },
      ],
      attendees: [
        { name: 'Manchester United', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg', website: 'https://www.manutd.com' },
        { name: 'FC Barcelona', logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg', website: 'https://www.fcbarcelona.com' },
        { name: 'Bayern Munich', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg', website: 'https://fcbayern.com' },
        { name: 'PSG', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg', website: 'https://en.psg.fr' },
        { name: 'Inter Milan', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg', website: 'https://www.inter.it' },
        { name: 'Flamengo', logo: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Flamengo_logo.svg', website: 'https://www.flamengo.com.br' },
        { name: 'Ajax', logo: 'https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_Amsterdam.svg', website: 'https://www.ajax.nl' },
        { name: 'Celtic', logo: 'https://upload.wikimedia.org/wikipedia/en/1/12/Celtic_FC.svg', website: 'https://www.celticfc.com' }
      ],
      registrationFee: '€999',
      icon: Calendar,
      faqs: [
        { 
          question: 'What is included in the registration fee?', 
          answer: 'The registration fee includes full access to the event, all meetings, networking sessions, lunches, coffee breaks, and the evening reception. Hotel and travel arrangements are not included.' 
        },
        { 
          question: 'How many meetings can I schedule?', 
          answer: 'Our platform allows you to schedule up to 20 meetings over the two-day event. The scheduling system will open one week before the event.' 
        },
        { 
          question: 'Is there a dress code?', 
          answer: 'Business casual attire is recommended for the main event. For the evening reception, smart casual is appropriate.' 
        }
      ]
    },
    'virtual-deal-days': {
      id: 'virtual-deal-days',
      type: 'Virtual',
      title: 'Virtual Deal Days',
      description: 'Get weeks of business done in one afternoon',
      date: 'November 8, 2024',
      time: '14:00 - 18:00',
      location: 'Online',
      stats: [
        { label: 'Club attendees', value: '200+' },
        { label: 'Expected deals per agency', value: '1.3' },
        { label: 'Meetings per attendee', value: 'Up to 12' },
      ],
      features: [
        '15 minute meetings with decision makers',
        'No travel required',
        'Accelerate transfer talks',
        'AI-powered matchmaking',
        'HD video conferencing platform',
      ],
      schedule: [
        { round: 1, club: 'FC Copenhagen', role: 'Sporting Director', time: '14:15' },
        { round: 1, club: 'Kashima Antlers', role: 'Director of Football', time: '14:30' },
        { round: 2, club: 'Houston Dynamo', role: 'Technical Director', time: '15:30' },
        { round: 3, club: 'Celtic FC', role: 'Head of Recruitment', time: '16:15' },
        { round: 3, club: 'AS Monaco', role: 'Chief Scout', time: '16:30' },
        { round: 4, club: 'Boca Juniors', role: 'Sporting Director', time: '17:15' },
      ],
      icon: Video,
      registrationFee: '€399',
      techRequirements: [
        'Stable internet connection (minimum 5 Mbps)',
        'Chrome or Firefox browser (latest version)',
        'Webcam and microphone',
        'Quiet environment for meetings'
      ],
      attendees: [
        { name: 'Ajax', logo: 'https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_Amsterdam.svg', website: 'https://www.ajax.nl' },
        { name: 'Porto', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f1/FC_Porto.svg', website: 'https://www.fcporto.pt' },
        { name: 'Lyon', logo: 'https://upload.wikimedia.org/wikipedia/en/8/81/Olympique_Lyonnais.svg', website: 'https://www.ol.fr' },
        { name: 'Sevilla', logo: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg', website: 'https://www.sevillafc.es' },
        { name: 'Zenit', logo: 'https://upload.wikimedia.org/wikipedia/en/8/8d/FC_Zenit_Saint_Petersburg_logo.svg', website: 'https://fc-zenit.ru' },
        { name: 'Palmeiras', logo: 'https://upload.wikimedia.org/wikipedia/en/1/10/Palmeiras_logo.svg', website: 'https://www.palmeiras.com.br' },
        { name: 'Club América', logo: 'https://upload.wikimedia.org/wikipedia/en/8/8b/Club_Am%C3%A9rica_logo.svg', website: 'https://www.clubamerica.com.mx' },
        { name: 'Seattle Sounders', logo: 'https://upload.wikimedia.org/wikipedia/en/7/72/Seattle_Sounders_FC.svg', website: 'https://www.soundersfc.com' }
      ],
      faqs: [
        { 
          question: 'How do I join the virtual meetings?', 
          answer: 'You will receive a unique access link 24 hours before the event. This link will take you to our virtual platform where all your scheduled meetings will be organized.' 
        },
        { 
          question: 'What if I experience technical issues?', 
          answer: 'We have a dedicated technical support team available throughout the event. Contact information will be provided with your access details.' 
        },
        { 
          question: 'Can I record my meetings?', 
          answer: 'Recording is possible but requires consent from all participants. The platform has a built-in request system for this purpose.' 
        }
      ]
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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleRegister = () => {
    setRegistrationOpen(true);
  };

  const closeRegistration = () => {
    setRegistrationOpen(false);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-100"
    >
      {/* Hero Section */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12 px-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-blue-900 opacity-20 z-0" />
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <Link to="/events" className="text-blue-200 hover:text-white mb-4 inline-flex items-center">
            <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
            Back to Events
          </Link>
          
          <div className="flex flex-col md:flex-row items-start justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center mb-3">
                <event.icon className="h-6 w-6 mr-2" />
                <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                  {event.type} Event
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-3">{event.title}</h1>
              <p className="text-xl text-blue-100 max-w-2xl mb-6">{event.description}</p>
              
              <div className="flex flex-wrap gap-4 text-blue-100">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRegister}
              className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold shadow-lg hover:bg-blue-50 transition-colors"
            >
              Register Now
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {event.stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.15)" }}
                className="bg-white bg-opacity-10 p-4 rounded-lg text-center backdrop-blur-sm"
              >
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-blue-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white shadow-md rounded-lg mt-6 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTab('overview')}
                className={`whitespace-nowrap py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'overview' 
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              {event.agenda && (
                <button
                  onClick={() => setActiveTab('agenda')}
                  className={`whitespace-nowrap py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'agenda' 
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Agenda
                </button>
              )}
              {event.schedule && (
                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`whitespace-nowrap py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'schedule' 
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Meeting Schedule
                </button>
              )}
              <button
                onClick={() => setActiveTab('participants')}
                className={`whitespace-nowrap py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'participants' 
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Participants
              </button>
              <button
                onClick={() => setActiveTab('faqs')}
                className={`whitespace-nowrap py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'faqs' 
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                FAQs
              </button>
            </nav>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Highlights</h2>
                      <ul className="space-y-3 mb-8">
                        {event.features.map((feature, index) => (
                          <motion.li 
                            key={index}
                            whileHover={{ x: 5 }}
                            className="flex items-start"
                          >
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {event.speakers && (
                        <div className="mb-8">
                          <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Speakers</h2>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {event.speakers.map((speaker, idx) => (
                              <motion.div
                                key={idx}
                                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center"
                              >
                                <img 
                                  src={speaker.image} 
                                  alt={speaker.name} 
                                  className="w-16 h-16 rounded-full object-cover mr-3"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://placehold.co/64x64/1a365d/ffffff?text=' + speaker.name.charAt(0);
                                  }}
                                />
                                <div>
                                  <h3 className="font-medium text-gray-900">{speaker.name}</h3>
                                  <p className="text-sm text-gray-500">{speaker.role}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {event.techRequirements && (
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800 mb-4">Technical Requirements</h2>
                          <ul className="space-y-2 mb-8">
                            {event.techRequirements.map((req, index) => (
                              <motion.li 
                                key={index}
                                whileHover={{ x: 5 }}
                                className="flex items-start"
                              >
                                <CheckCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{req}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-1">
                      <div className="bg-blue-50 rounded-xl p-6 mb-6">
                        <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                          <CreditCard className="w-5 h-5 mr-2" />
                          Registration Details
                        </h3>
                        <div className="mb-4">
                          <p className="text-gray-700 mb-1">Registration Fee</p>
                          <p className="text-2xl font-bold text-blue-700">{event.registrationFee}</p>
                        </div>
                        <div className="mb-4">
                          <p className="text-gray-700 mb-1">Registration Closes</p>
                          <p className="font-medium">7 days before event</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleRegister}
                          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                          Register Now
                        </motion.button>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                          <Award className="w-5 h-5 mr-2" />
                          Benefits
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">Direct contact with key decision makers</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">Efficient meeting scheduling system</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">Post-event contact information</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'agenda' && event.agenda && (
                <motion.div
                  key="agenda"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Agenda</h2>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 z-0"></div>
                    
                    {/* Timeline items */}
                    <div className="space-y-8">
                      {event.agenda.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="relative pl-12"
                        >
                          {/* Timeline dot */}
                          <div className="absolute left-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center z-10">
                            <Clock className="w-4 h-4 text-white" />
                          </div>
                          
                          <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <p className="text-blue-600 font-bold">{item.time}</p>
                            <p className="text-gray-800 font-medium">{item.activity}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'schedule' && event.schedule && (
                <motion.div
                  key="schedule"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Meeting Schedule</h2>
                  <div className="overflow-hidden shadow-sm border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Round</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Club</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {event.schedule.map((meeting, idx) => (
                          <motion.tr 
                            key={idx}
                            initial={{ opacity: 0, backgroundColor: "#f3f9ff" }}
                            animate={{ opacity: 1, backgroundColor: "#ffffff" }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ backgroundColor: "#f0f9ff" }}
                            className="hover:bg-blue-50"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Round {meeting.round}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{meeting.time}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{meeting.club}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meeting.role}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'participants' && (
                <motion.div
                  key="participants"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    <Users className="inline-block w-6 h-6 mr-2 text-blue-500" />
                    Participating Clubs
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {event.attendees.map((club, idx) => (
                      <motion.a
                        key={idx}
                        href={club.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                        className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center text-center hover:border-blue-200 transition-all"
                      >
                        <div className="w-16 h-16 mb-3 relative">
                          <img 
                            src={club.logo} 
                            alt={`${club.name} logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://placehold.co/64x64/1a365d/ffffff?text=' + club.name.charAt(0);
                            }}
                          />
                        </div>
                        <p className="font-medium text-gray-800">{club.name}</p>
                        <span className="text-blue-600 text-sm mt-1">Visit Website</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'faqs' && (
                <motion.div
                  key="faqs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {event.faqs.map((faq, idx) => (
                      <motion.div 
                        key={idx}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                        >
                          <span className="font-medium text-gray-900">{faq.question}</span>
                          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedFaqs.includes(idx) ? 'transform rotate-180' : ''}`} />
                        </button>
                        
                        {expandedFaqs.includes(idx) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-6 py-4 bg-gray-50 border-t border-gray-200"
                          >
                            <p className="text-gray-600">{faq.answer}</p>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {registrationOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Register for {event.title}</h3>
                <button 
                  onClick={closeRegistration}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-900">Registration Details</h4>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {event.type} Event
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-600 mb-1">Date & Time</p>
                    <p className="font-medium">{event.date} • {event.time}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-600 mb-1">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-600 mb-1">Registration Fee</p>
                    <p className="text-xl font-bold text-blue-700">{event.registrationFee}</p>
                  </div>
                </div>
                
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organization/Club
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your organization or club"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position/Role
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your position or role"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        I agree to the terms and conditions and privacy policy
                      </span>
                    </label>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={closeRegistration}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      onClick={() => {
                        closeRegistration();
                        // Here you could add success notification logic
                      }}
                    >
                      Complete Registration
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EventDetails;