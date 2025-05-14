import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  ArrowLeft, 
  ChevronDown, 
  Star, 
  MessageCircle,
  ExternalLink,
  X,
  Plus,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AvailablePlayers = () => {
  // Sample data with added contact information
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: "John Doe",
      position: "Forward",
      age: 24,
      club: "City Strikers",
      nationality: "England",
      flag: "🇬🇧",
      status: "Available",
      contractEnd: "2025-06-30",
      enquiries: 5,
      starred: false,
      stats: {
        goals: 12,
        assists: 8,
        rating: 7.8
      },
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      contact: {
        email: "john.doe@soccerpro.com",
        phone: "+44 123 456 7890",
        location: "London, England"
      }
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Midfielder",
      age: 22,
      club: "Global United",
      nationality: "USA",
      flag: "🇺🇸",
      status: "Available",
      contractEnd: "2024-12-31",
      enquiries: 3,
      starred: false,
      stats: {
        goals: 5,
        assists: 15,
        rating: 8.2
      },
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      contact: {
        email: "jane.smith@soccerpro.com",
        phone: "+1 234 567 8901",
        location: "New York, USA"
      }
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "Defender",
      age: 27,
      club: "FC Elite",
      nationality: "France",
      flag: "🇫🇷",
      status: "Available",
      contractEnd: "2025-05-15",
      enquiries: 7,
      starred: true,
      stats: {
        goals: 2,
        assists: 4,
        rating: 7.5
      },
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      contact: {
        email: "mike.johnson@soccerpro.com",
        phone: "+33 345 678 9012",
        location: "Paris, France"
      }
    },
    {
      id: 4,
      name: "Sophie Chen",
      position: "Goalkeeper",
      age: 25,
      club: "Eastern Dragons",
      nationality: "China",
      flag: "🇨🇳",
      status: "Available",
      contractEnd: "2025-08-01",
      enquiries: 2,
      starred: false,
      stats: {
        cleanSheets: 14,
        saves: 87,
        rating: 8.0
      },
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      contact: {
        email: "sophie.chen@soccerpro.com",
        phone: "+86 456 789 0123",
        location: "Shanghai, China"
      }
    },
    {
      id: 5,
      name: "Carlos Mendez",
      position: "Midfielder",
      age: 23,
      club: "Madrid Stars",
      nationality: "Spain",
      flag: "🇪🇸",
      status: "Available",
      contractEnd: "2025-01-15",
      enquiries: 8,
      starred: true,
      stats: {
        goals: 9,
        assists: 11,
        rating: 8.4
      },
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      contact: {
        email: "carlos.mendez@soccerpro.com",
        phone: "+34 567 890 1234",
        location: "Madrid, Spain"
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    position: '',
    ageMin: '',
    ageMax: '',
    nationality: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState('enquiries');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filtered and sorted players
  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.nationality.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPosition = !filters.position || player.position === filters.position;
    const matchesAgeMin = !filters.ageMin || player.age >= parseInt(filters.ageMin);
    const matchesAgeMax = !filters.ageMax || player.age <= parseInt(filters.ageMax);
    const matchesNationality = !filters.nationality || 
                              player.nationality.toLowerCase().includes(filters.nationality.toLowerCase());
    
    return matchesSearch && matchesPosition && matchesAgeMin && matchesAgeMax && matchesNationality;
  }).sort((a, b) => {
    if (sortOption === 'enquiries') return b.enquiries - a.enquiries;
    if (sortOption === 'age') return a.age - b.age;
    if (sortOption === 'name') return a.name.localeCompare(b.name);
    if (sortOption === 'rating') return (b.stats.rating || 0) - (a.stats.rating || 0);
    return 0;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const toggleStarPlayer = (id) => {
    setPlayers(players.map(player => 
      player.id === id ? {...player, starred: !player.starred} : player
    ));
  };

  const openContactModal = (player) => {
    setSelectedPlayer(player);
  };

  const closeContactModal = () => {
    setSelectedPlayer(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 91, 234, 0.1), 0 10px 10px -5px rgba(0, 91, 234, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const starVariants = {
    initial: { scale: 1 },
    animate: { scale: [1, 1.2, 1], transition: { duration: 0.4 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  const positions = ["Forward", "Midfielder", "Defender", "Goalkeeper"];
  const nationalities = ["England", "USA", "France", "Spain", "China", "Germany", "Brazil", "Argentina"];

  // Loading skeleton
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 p-4 md:p-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          
          <div className="h-10 w-64 bg-gray-200 rounded-lg mb-8 animate-pulse"></div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="h-40 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded mb-6 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-between items-center mb-6"
        >
          <Link 
            to="/" 
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
          >
            <motion.div 
              whileHover={{ x: -2 }}
              className="flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to Dashboard</span>
            </motion.div>
          </Link>
          <Link 
            to="/make-player-available" 
            className="relative overflow-hidden group"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Make Player Available
              <motion.span 
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </Link>
        </motion.div>

        <motion.h1 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-gray-900 mb-6"
        >
          Available <span className="text-blue-600">Players</span>
        </motion.h1>

        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100 backdrop-blur-sm bg-opacity-80"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <motion.input
                type="text"
                placeholder="Search players, clubs, nationalities..."
                className="pl-10 w-full border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                whileFocus={{ 
                  boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
                  borderColor: "transparent"
                }}
              />
              {searchTerm && (
                <motion.button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-5 w-5" />
                </motion.button>
              )}
            </div>
            <div className="flex gap-2">
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
                <ChevronDown className={`w-5 h-5 ml-1 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
              </motion.button>
              <motion.select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                whileFocus={{ 
                  boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
                  borderColor: "transparent"
                }}
              >
                <option value="enquiries">Sort by: Enquiries</option>
                <option value="rating">Sort by: Rating</option>
                <option value="age">Sort by: Age</option>
                <option value="name">Sort by: Name</option>
              </motion.select>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="mt-4 pt-4 border-t border-gray-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <select
                      name="position"
                      value={filters.position}
                      onChange={handleFilterChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Positions</option>
                      {positions.map(pos => (
                        <option key={pos} value={pos}>{pos}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Age</label>
                    <input
                      type="number"
                      name="ageMin"
                      value={filters.ageMin}
                      onChange={handleFilterChange}
                      placeholder="Min"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Age</label>
                    <input
                      type="number"
                      name="ageMax"
                      value={filters.ageMax}
                      onChange={handleFilterChange}
                      placeholder="Max"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                    <select
                      name="nationality"
                      value={filters.nationality}
                      onChange={handleFilterChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Nationalities</option>
                      {nationalities.map(nat => (
                        <option key={nat} value={nat}>{nat}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <motion.button
                    onClick={() => setFilters({position: '', ageMin: '', ageMax: '', nationality: ''})}
                    className="text-gray-600 hover:text-gray-800 mr-4"
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear Filters
                  </motion.button>
                  <motion.button
                    onClick={() => setShowFilters(false)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Apply Filters
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-4"
        >
          Showing <span className="font-semibold text-blue-600">{filteredPlayers.length}</span> available players
        </motion.p>

        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPlayers.map(player => (
              <motion.div
                key={player.id}
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                layout
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-blue-200 transition-all group"
              >
                <div className="relative">
                  <div className="h-40 bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden">
                    <img 
                      src={player.image} 
                      alt={player.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${player.name.replace(' ', '+')}&background=random&size=400`;
                      }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.2 }}
                    />
                  </div>
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <motion.button 
                      onClick={() => toggleStarPlayer(player.id)}
                      className={`p-1.5 rounded-full ${player.starred ? 'bg-yellow-400 text-white' : 'bg-white text-gray-400 hover:bg-gray-100'}`}
                      variants={starVariants}
                      initial="initial"
                      animate={player.starred ? "animate" : "initial"}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Star className="h-4 w-4" fill={player.starred ? "currentColor" : "none"} />
                    </motion.button>
                  </div>
                  <div className="absolute -bottom-10 left-4">
                    <motion.div 
                      className="w-20 h-20 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center text-blue-600 font-bold text-xl relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img 
                        src={player.image} 
                        alt={player.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${player.name.replace(' ', '+')}&background=random&size=400`;
                        }}
                      />
                      <motion.div 
                        className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.1 }}
                      />
                    </motion.div>
                  </div>
                </div>
                
                <div className="pt-12 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">{player.name}</h3>
                    <span className="text-2xl">{player.flag}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <span className="mr-3">{player.position}</span>
                    <span className="mr-3">•</span>
                    <span>{player.age} years</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                      {player.club}
                    </span>
                    <span className="px-2 py-1 bg-gray-50 text-gray-700 rounded-full text-xs font-medium">
                      {player.nationality}
                    </span>
                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                      {player.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {player.position === 'Goalkeeper' ? (
                      <>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Clean Sheets</div>
                          <div className="font-bold text-blue-600">{player.stats.cleanSheets || 0}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Saves</div>
                          <div className="font-bold text-blue-600">{player.stats.saves || 0}</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Goals</div>
                          <div className="font-bold text-blue-600">{player.stats.goals || 0}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Assists</div>
                          <div className="font-bold text-blue-600">{player.stats.assists || 0}</div>
                        </div>
                      </>
                    )}
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Rating</div>
                      <div className="font-bold text-blue-600">{player.stats.rating?.toFixed(1) || 'N/A'}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <div>Contract ends: {new Date(player.contractEnd).toLocaleDateString()}</div>
                    <div className="font-medium text-blue-600 flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {player.enquiries}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <motion.button 
                      onClick={() => openContactModal(player)}
                      className="flex-1 flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact
                    </motion.button>
                    <motion.button 
                      className="flex items-center justify-center bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Contact Modal */}
        <AnimatePresence>
          {selectedPlayer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={closeContactModal}
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-xl p-6 max-w-md w-full mx-4 relative"
                onClick={e => e.stopPropagation()}
              >
                <motion.button
                  onClick={closeContactModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-6 w-6" />
                </motion.button>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Contact {selectedPlayer.name}
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900 font-medium">{selectedPlayer.contact.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900 font-medium">{selectedPlayer.contact.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-900 font-medium">{selectedPlayer.contact.location}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-2">
                  <motion.button
                    onClick={closeContactModal}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close
                  </motion.button>
                  <motion.button
                    onClick={() => window.location.href = `mailto:${selectedPlayer.contact.email}`}
                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Email
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredPlayers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white rounded-xl shadow-sm p-8 text-center"
          >
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No players found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
            <motion.button 
              onClick={() => {setSearchTerm(''); setFilters({position: '', ageMin: '', ageMax: '', nationality: ''});}}
              className="text-blue-600 hover:text-blue-800 flex items-center justify-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-4 h-4 mr-1" />
              Clear all filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AvailablePlayers;
