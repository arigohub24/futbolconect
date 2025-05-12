import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const ClubCard = ({ name, members, events, imageUrl, tags }) => {
  const controls = useAnimation();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Animation sequence on mount
  useEffect(() => {
    const sequence = async () => {
      await controls.start({ opacity: 0, y: 20 });
      await controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
    };
    sequence();
  }, [controls]);

  const handleFavorite = async (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    await controls.start({
      scale: [1, 1.3, 1],
      transition: { duration: 0.4 }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      whileHover={{ 
        y: -8,
        boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25)',
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 max-w-sm w-full hover:z-10"
    >
      {/* Club Image with parallax effect */}
      <motion.div 
        className="relative h-56 overflow-hidden"
        animate={{
          scale: isHovered ? 1.05 : 1,
          transition: { duration: 0.5 }
        }}
      >
        <Image
          src={imageUrl || '/default-club.jpg'}
          alt={name}
          fill
          className="object-cover"
          quality={100}
          priority
        />
        
        {/* Gradient overlay with animation */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0.7 }}
          animate={{
            background: isHovered 
              ? 'linear-gradient(to top, rgba(37, 99, 235, 0.9), rgba(59, 130, 246, 0.6)' 
              : 'linear-gradient(to top, rgba(37, 99, 235, 0.8), rgba(59, 130, 246, 0.3))',
            transition: { duration: 0.4 }
          }}
        />
        
        {/* Favorite button */}
        <motion.button
          onClick={handleFavorite}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm bg-white/80 shadow-sm"
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill={isFavorited ? "#ef4444" : "none"}
            viewBox="0 0 24 24"
            stroke={isFavorited ? "#ef4444" : "currentColor"}
            strokeWidth={2}
            animate={{
              scale: isFavorited ? [1, 1.3, 1] : 1,
              transition: { duration: 0.3 }
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </motion.svg>
        </motion.button>
        
        {/* Club name with animated underline */}
        <div className="absolute bottom-4 left-4">
          <h3 className="font-bold text-white text-2xl mb-1">{name}</h3>
          <motion.div 
            className="h-1 bg-white"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? '100%' : '50%' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Club details with staggered animations */}
      <div className="p-6">
        {/* Tags with pop-in animation */}
        {tags && (
          <motion.div 
            className="flex flex-wrap gap-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {tags.map((tag, index) => (
              <motion.span
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        )}
        
        {/* Stats with icon animations */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50"
          >
            <motion.div 
              animate={{ 
                rotate: isHovered ? [0, 10, -10, 0] : 0,
                transition: { duration: 0.6 }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
              </svg>
            </motion.div>
            <div>
              <p className="text-sm text-gray-500">Members</p>
              <p className="font-bold text-blue-800">{members}+</p>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 p-3 rounded-lg bg-green-50"
          >
            <motion.div
              animate={{
                y: isHovered ? [0, -3, 0] : 0,
                transition: { duration: 0.6 }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </motion.div>
            <div>
              <p className="text-sm text-gray-500">Events</p>
              <p className="font-bold text-green-800">{events}</p>
            </div>
          </motion.div>
        </div>
        
        {/* Action buttons with complex hover animations */}
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ 
              scale: 1.03,
              backgroundColor: '#3B82F6',
              color: 'white',
              boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)'
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="flex-1 py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold flex items-center justify-center space-x-2"
          >
            <span>Join Club</span>
            <motion.span
              animate={{ 
                x: isHovered ? [0, 4, 0] : 0,
                transition: { 
                  duration: 1,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.span>
          </motion.button>
          
          <motion.button
            whileHover={{ 
              backgroundColor: '#F3F4F6',
              borderColor: '#9CA3AF'
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="p-3 rounded-xl border border-gray-200 flex items-center justify-center"
            aria-label="More options"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Decorative elements with subtle animations */}
      <motion.div 
        className="absolute top-0 right-0 w-20 h-20 overflow-hidden"
        animate={{
          rotate: isHovered ? 10 : 0,
          transition: { duration: 0.6 }
        }}
      >
        <motion.div 
          className="absolute -right-10 -top-10 w-20 h-20 bg-blue-500/10 rounded-full"
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1,
            transition: { duration: 4, repeat: Infinity }
          }}
        />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-4 left-4 w-12 h-12 opacity-20"
        animate={{
          x: isHovered ? [0, -5, 5, 0] : 0,
          transition: { duration: 3, repeat: Infinity }
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4C13.0609 4 14.0783 4.42143 14.8284 5.17157C15.5786 5.92172 16 6.93913 16 8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12C10.9391 12 9.92172 11.5786 9.17157 10.8284C8.42143 10.0783 8 9.06087 8 8C8 6.93913 8.42143 5.92172 9.17157 5.17157C9.92172 4.42143 10.9391 4 12 4ZM12 6C11.4696 6 10.9609 6.21071 10.5858 6.58579C10.2107 6.96086 10 7.46957 10 8C10 8.53043 10.2107 9.03914 10.5858 9.41421C10.9609 9.78929 11.4696 10 12 10C12.5304 10 13.0391 9.78929 13.4142 9.41421C13.7893 9.03914 14 8.53043 14 8C14 7.46957 13.7893 6.96086 13.4142 6.58579C13.0391 6.21071 12.5304 6 12 6Z" fill="currentColor"/>
          <path d="M12 13C14.67 13 20 14.33 20 17V20H4V17C4 14.33 9.33 13 12 13ZM12 14.9C9.03 14.9 5.9 16.36 5.9 17V18.1H18.1V17C18.1 16.36 14.97 14.9 12 14.9Z" fill="currentColor"/>
        </svg>
      </motion.div>
    </motion.div>
  );
};

ClubCard.defaultProps = {
  name: 'Tech Innovators',
  members: 42,
  events: 5,
  imageUrl: '/default-club.jpg',
  tags: ['Technology', 'Workshops', 'Networking']
};

export default ClubCard;