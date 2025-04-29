import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  ArrowLeft, 
  ChevronDown, 
  Star, 
  MessageCircle,
  ExternalLink 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AvailablePlayers = () => {
  // Sample data - in a real app, would come from API or context
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: "John Doe",
      position: "Forward",
      age: 24,
      club: "City Strikers",
      nationality: "England",
      status: "Available",
      contractEnd: "2025-06-30",
      enquiries: 5,
      starred: false,
      image: null
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Midfielder",
      age: 22,
      club: "Global United",
      nationality: "USA",
      status: "Available",
      contractEnd: "2024-12-31",
      enquiries: 3,
      starred: false,
      image: null
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "Defender",
      age: 27,
      club: "FC Elite",
      nationality: "France",
      status: "Available",
      contractEnd: "2025-05-15",
      enquiries: 7,
      starred: true,
      image: null
    },
    {
      id: 4,
      name: "Sophie Chen",
      position: "Goalkeeper",
      age: 25,
      club: "Eastern Dragons",
      nationality: "China",
      status: "Available",
      contractEnd: "2025-08-01",
      enquiries: 2,
      starred: false,
      image: null
    },
    {
      id: 5,
      name: "Carlos Mendez",
      position: "Midfielder",
      age: 23,
      club: "Madrid Stars",
      nationality: "Spain",
      status: "Available",
      contractEnd: "2025-01-15",
      enquiries: 8,
      starred: true,
      image: null
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const positions = ["Forward", "Midfielder", "Defender", "Goalkeeper"];
  const nationalities = ["England", "USA", "France", "Spain", "China", "Germany", "Brazil", "Argentina"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 p-4 md:p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
          <Link 
            to="/make-player-available" 
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Make Player Available
          </Link>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Available Players</h1>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search players, clubs, nationalities..."
                className="pl-10 w-full border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
                <ChevronDown className={`w-5 h-5 ml-1 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
              </button>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="enquiries">Sort by: Enquiries</option>
                <option value="age">Sort by: Age</option>
                <option value="name">Sort by: Name</option>
              </select>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
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
                <button
                  onClick={() => setFilters({position: '', ageMin: '', ageMax: '', nationality: ''})}
                  className="text-gray-600 hover:text-gray-800 mr-4"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-4">Showing {filteredPlayers.length} available players</p>

        {/* Player Cards */}
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
              whileHover={{ 
                y: -5, 
                boxShadow: "0 12px 24px rgba(0, 91, 234, 0.1)",
              }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-blue-200 transition-all"
            >
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button 
                    onClick={() => toggleStarPlayer(player.id)}
                    className={`p-1.5 rounded-full ${player.starred ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                  >
                    <Star className="h-4 w-4" />
                  </button>
                </div>
                <div className="absolute -bottom-10 left-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center text-blue-600 font-bold text-xl">
                    {player.image ? (
                      <img 
                        src={player.image} 
                        alt={player.name} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      player.name.charAt(0)
                    )}
                  </div>
                </div>
              </div>
              
              <div className="pt-12 p-4">
                <h3 className="font-semibold text-lg text-blue-900">{player.name}</h3>
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <span className="mr-3">{player.position}</span>
                  <span className="mr-3">|</span>
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

                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <div>Contract ends: {new Date(player.contractEnd).toLocaleDateString()}</div>
                  <div className="font-medium text-blue-600">{player.enquiries} Enquiries</div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact
                  </button>
                  <button className="flex items-center justify-center bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredPlayers.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No players found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
            <button 
              onClick={() => {setSearchTerm(''); setFilters({position: '', ageMin: '', ageMax: '', nationality: ''});}}
              className="text-blue-600 hover:text-blue-800"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AvailablePlayers;