import { motion } from 'framer-motion';
import Image from 'next/image';

const ClubCard = ({ name, members, events, imageUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 max-w-sm"
    >
      {/* Club Image with gradient overlay */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl || '/default-club.jpg'}
          alt={name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-blue-400/30" />
        
        {/* Club name badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm"
        >
          <h3 className="font-bold text-blue-800 text-lg">{name}</h3>
        </motion.div>
      </div>

      {/* Club details */}
      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <motion.div 
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-1 text-blue-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
            </svg>
            <span className="font-medium">{members}+ Members</span>
          </motion.div>
          
          <motion.div 
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-1 text-green-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{events} Events</span>
          </motion.div>
        </div>

        {/* Join button with animated hover effect */}
        <motion.button
          whileHover={{ 
            scale: 1.02,
            backgroundColor: '#3B82F6',
            color: 'white'
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="w-full py-2 px-4 rounded-lg bg-blue-50 text-blue-600 font-semibold border border-blue-200 flex items-center justify-center space-x-2"
        >
          <span>View Club</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.span>
        </motion.button>
      </div>

      {/* Decorative corner element */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute top-0 right-0 w-16 h-16 overflow-hidden"
      >
        <div className="absolute -right-8 -top-8 w-16 h-16 bg-green-500/10 rounded-full"></div>
      </motion.div>
    </motion.div>
  );
};

ClubCard.defaultProps = {
  name: 'Tech Innovators',
  members: 42,
  events: 5,
  imageUrl: '/default-club.jpg'
};

export default ClubCard;