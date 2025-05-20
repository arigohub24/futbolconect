import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Users, Building2, Briefcase, UserCircle, Search, Filter, MapPin, Star, MessageCircle, X, Mail, Phone, MessageSquare } from 'lucide-react';
import { useState } from 'react';

const Outplacement = () => {
  const [activeTab, setActiveTab] = useState('clubs');
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [selectedContactEntity, setSelectedContactEntity] = useState(null);

  const tabs = [
    { id: 'players', label: 'Players', icon: Users },
    { id: 'clubs', label: 'Clubs', icon: Building2 },
    { id: 'agents', label: 'Agents', icon: Briefcase },
    { id: 'staff', label: 'Staff', icon: UserCircle },
    { id: 'scouts', label: 'Scouts', icon: Search }
  ];

  const players = [
    {
      id: 1,
      name: "Chisom Agbodike",
      position: "Attacking Midfielder",
      number: 8,
      age: 17,
      nationality: "Nigeria",
      flag: "🇳🇬",
      height: "1.88m",
      weight: "80kg",
      joined: "2023",
      contract: "2025",
      dateOfBirth: "2006-07-01",
      stats: {
        appearances: 26,
        goals: 2,
        assists: 1,
        cleanSheets: 13,
        rating: 7.9
      },
      image: "/player5.png",
      bio: "Strong and commanding center-back who leads the defensive line. Known for his aerial ability and tactical awareness.",
      club: "Okaka FC"
    },
    {
      id: 2,
      name: "Chucks Peter",
      position: "Defender",
      number: 5,
      age: 17,
      nationality: "Nigeria",
      flag: "🇳🇬",
      height: "1.80m",
      weight: "73kg",
      joined: "2023",
      contract: "2025",
      dateOfBirth: "2006-10-04",
      stats: {
        appearances: 25,
        goals: 1,
        assists: 1,
        cleanSheets: 12,
        rating: 8.2
      },
      image: "/player1.png",
      bio: "Strong and commanding center-back who leads the defensive line. Known for his aerial ability and tactical awareness.",
      club: "Okaka FC"
    },
    {
      id: 3,
      name: "Bamidele Sunday",
      position: "Right Back",
      number: 2,
      age: 14,
      nationality: "Nigeria",
      flag: "🇳🇬",
      height: "1.78m",
      weight: "68kg",
      joined: "2023",
      contract: "2025",
      dateOfBirth: "2006-12-16",
      stats: {
        appearances: 20,
        goals: 2,
        assists: 8,
        cleanSheets: 10,
        rating: 8.5
      },
      image: "/player2.png",
      bio: "Dynamic right-back with excellent pace and crossing ability. Known for his defensive solidity and attacking contributions.",
      club: "Okaka FC"
    },
    {
      id: 4,
      name: "Adebayo Sodiq",
      position: "Defensive Midfielder",
      number: 6,
      age: 18,
      nationality: "Nigeria",
      flag: "🇳🇬",
      height: "1.85m",
      weight: "78kg",
      joined: "2023",
      contract: "2025",
      dateOfBirth: "2005-12-17",
      stats: {
        appearances: 22,
        goals: 3,
        assists: 12,
        cleanSheets: 11,
        rating: 7.8
      },
      image: "/player3.png",
      bio: "Strong defensive midfielder with excellent tackling and positioning. Provides solid protection for the backline.",
      club: "Okaka FC"
    },
    {
      id: 5,
      name: "Emmanuel Bright",
      position: "Striker",
      number: 9,
      age: 17,
      nationality: "Nigeria",
      flag: "🇳🇬",
      height: "1.78m",
      weight: "72kg",
      joined: "2023",
      contract: "2025",
      dateOfBirth: "2009-12-13",
      stats: {
        appearances: 24,
        goals: 18,
        assists: 7,
        rating: 8.7
      },
      image: "/player4.png",
      bio: "Young and prolific striker with exceptional finishing ability. Despite his age, he has shown remarkable composure and goal-scoring instincts.",
      club: "Okaka FC"
    },
  ];

  const clubs = [
    {
      id: 1,
      name: "Okaka FC",
      country: "Nigeria",
      flag: "🇳🇬",
      division: "Premier League",
      status: "Active",
      players: 25,
      image: "https://placehold.co/400x400/1a365d/ffffff?text=Okaka+FC"
    },
    {
      id: 2,
      name: "Lagos United",
      country: "Nigeria",
      flag: "🇳🇬",
      division: "Premier League",
      status: "Active",
      players: 28,
      image: "https://placehold.co/400x400/1a365d/ffffff?text=Lagos+United"
    },
    {
      id: 3,
      name: "Port Harcourt Stars",
      country: "Nigeria",
      flag: "🇳🇬",
      division: "First Division",
      status: "Active",
      players: 22,
      image: "https://placehold.co/400x400/1a365d/ffffff?text=PH+Stars"
    },
    {
      id: 4,
      name: "Abuja Warriors",
      country: "Nigeria",
      flag: "🇳🇬",
      division: "Premier League",
      status: "Active",
      players: 26,
      image: "https://placehold.co/400x400/1a365d/ffffff?text=Abuja+Warriors"
    },
    {
      id: 5,
      name: "Kano Lions",
      country: "Nigeria",
      flag: "🇳🇬",
      division: "First Division",
      status: "Active",
      players: 24,
      image: "https://placehold.co/400x400/1a365d/ffffff?text=Kano+Lions"
    },
    {
      id: 6,
      name: "Enugu Rangers",
      country: "Nigeria",
      flag: "🇳🇬",
      division: "Premier League",
      status: "Active",
      players: 27,
      image: "https://placehold.co/400x400/1a365d/ffffff?text=Enugu+Rangers"
    }
  ];

  const agents = [
    {
      id: 1,
      name: "John Smith",
      agency: "Global Sports Management",
      country: "England",
      flag: "🇬🇧",
      status: "Active",
      clients: 15,
      image: "https://i.pravatar.cc/400?img=1"
    },
    {
      id: 2,
      name: "Maria Garcia",
      agency: "Elite Football Agency",
      country: "Spain",
      flag: "🇪🇸",
      status: "Active",
      clients: 12,
      image: "https://i.pravatar.cc/400?img=2"
    },
    {
      id: 3,
      name: "David Okafor",
      agency: "African Stars Management",
      country: "Nigeria",
      flag: "🇳🇬",
      status: "Active",
      clients: 18,
      image: "https://i.pravatar.cc/400?img=3"
    },
    {
      id: 4,
      name: "Sarah Johnson",
      agency: "Premier Sports Group",
      country: "USA",
      flag: "🇺🇸",
      status: "Active",
      clients: 14,
      image: "https://i.pravatar.cc/400?img=4"
    },
    {
      id: 5,
      name: "Pierre Dubois",
      agency: "European Football Partners",
      country: "France",
      flag: "🇫🇷",
      status: "Active",
      clients: 16,
      image: "https://i.pravatar.cc/400?img=5"
    },
    {
      id: 6,
      name: "Ahmed Hassan",
      agency: "Middle East Sports Management",
      country: "Egypt",
      flag: "🇪🇬",
      status: "Active",
      clients: 13,
      image: "https://i.pravatar.cc/400?img=6"
    }
  ];

  const staff = [
    {
      id: 1,
      name: "Michael Brown",
      role: "Head Coach",
      club: "Okaka FC",
      country: "England",
      flag: "🇬🇧",
      status: "Active",
      experience: "15 years",
      image: "https://i.pravatar.cc/400?img=7"
    },
    {
      id: 2,
      name: "James Wilson",
      role: "Fitness Coach",
      club: "Okaka FC",
      country: "Nigeria",
      flag: "🇳🇬",
      status: "Active",
      experience: "8 years",
      image: "https://i.pravatar.cc/400?img=8"
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "Physiotherapist",
      club: "Okaka FC",
      country: "USA",
      flag: "🇺🇸",
      status: "Active",
      experience: "10 years",
      image: "https://i.pravatar.cc/400?img=9"
    },
    {
      id: 4,
      name: "Carlos Rodriguez",
      role: "Technical Director",
      club: "Okaka FC",
      country: "Spain",
      flag: "🇪🇸",
      status: "Active",
      experience: "12 years",
      image: "https://i.pravatar.cc/400?img=10"
    },
    {
      id: 5,
      name: "Aisha Mohammed",
      role: "Youth Development Coach",
      club: "Okaka FC",
      country: "Nigeria",
      flag: "🇳🇬",
      status: "Active",
      experience: "6 years",
      image: "https://i.pravatar.cc/400?img=11"
    },
    {
      id: 6,
      name: "Kwame Mensah",
      role: "Goalkeeper Coach",
      club: "Okaka FC",
      country: "Ghana",
      flag: "🇬🇭",
      status: "Active",
      experience: "9 years",
      image: "https://i.pravatar.cc/400?img=12"
    }
  ];

  const scouts = [
    {
      id: 1,
      name: "Robert Taylor",
      region: "West Africa",
      country: "England",
      flag: "🇬🇧",
      status: "Active",
      discoveries: 25,
      image: "https://i.pravatar.cc/400?img=13"
    },
    {
      id: 2,
      name: "Fatima Ahmed",
      region: "North Africa",
      country: "Egypt",
      flag: "🇪🇬",
      status: "Active",
      discoveries: 18,
      image: "https://i.pravatar.cc/400?img=14"
    },
    {
      id: 3,
      name: "Lucas Silva",
      region: "South America",
      country: "Brazil",
      flag: "🇧🇷",
      status: "Active",
      discoveries: 22,
      image: "https://i.pravatar.cc/400?img=15"
    },
    {
      id: 4,
      name: "Yuki Tanaka",
      region: "Asia",
      country: "Japan",
      flag: "🇯🇵",
      status: "Active",
      discoveries: 15,
      image: "https://i.pravatar.cc/400?img=16"
    },
    {
      id: 5,
      name: "Marcus Johnson",
      region: "Europe",
      country: "Germany",
      flag: "🇩🇪",
      status: "Active",
      discoveries: 20,
      image: "https://i.pravatar.cc/400?img=17"
    },
    {
      id: 6,
      name: "Omar Hassan",
      region: "Middle East",
      country: "Saudi Arabia",
      flag: "🇸🇦",
      status: "Active",
      discoveries: 17,
      image: "https://i.pravatar.cc/400?img=18"
    }
  ];

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const getFilteredData = () => {
    const searchLower = searchQuery.toLowerCase();
    
    switch (activeTab) {
      case 'players':
        return players.filter(player => 
          player.name.toLowerCase().includes(searchLower) ||
          player.club.toLowerCase().includes(searchLower) ||
          player.nationality.toLowerCase().includes(searchLower) ||
          player.position.toLowerCase().includes(searchLower)
        );
      case 'clubs':
        return clubs.filter(club =>
          club.name.toLowerCase().includes(searchLower) ||
          club.division.toLowerCase().includes(searchLower) ||
          club.country.toLowerCase().includes(searchLower)
        );
      case 'agents':
        return agents.filter(agent =>
          agent.name.toLowerCase().includes(searchLower) ||
          agent.agency.toLowerCase().includes(searchLower)
        );
      case 'staff':
        return staff.filter(member =>
          member.name.toLowerCase().includes(searchLower) ||
          member.role.toLowerCase().includes(searchLower)
        );
      case 'scouts':
        return scouts.filter(scout =>
          scout.name.toLowerCase().includes(searchLower) ||
          scout.region.toLowerCase().includes(searchLower) ||
          scout.country.toLowerCase().includes(searchLower)
        );
      default:
        return [];
    }
  };

  const filteredData = getFilteredData();

  const handleContact = (entity) => {
    setSelectedContactEntity(entity);
    setShowContactOptions(true);
  };

  const handleContactMethod = async (method) => {
    const entity = selectedContactEntity;
    let contactInfo = '';

    switch (activeTab) {
      case 'players':
        contactInfo = `Player: ${entity.name}\nPosition: ${entity.position}\nClub: ${entity.club}`;
        break;
      case 'clubs':
        contactInfo = `Club: ${entity.name}\nDivision: ${entity.division}\nLocation: ${entity.country}`;
        break;
      case 'agents':
        contactInfo = `Agent: ${entity.name}\nAgency: ${entity.agency}\nCountry: ${entity.country}`;
        break;
      case 'staff':
        contactInfo = `Staff: ${entity.name}\nRole: ${entity.role}\nClub: ${entity.club}`;
        break;
      case 'scouts':
        contactInfo = `Scout: ${entity.name}\nRegion: ${entity.region}\nCountry: ${entity.country}`;
        break;
    }

    try {
      switch (method) {
        case 'email':
          window.location.href = `mailto:contact@futbolconnect.com?subject=Contact Request for ${entity.name}&body=${encodeURIComponent(contactInfo)}`;
          break;
        case 'phone':
          alert('Phone contact information will be provided through email.');
          break;
        case 'message':
          alert('Messaging system will be available soon.');
          break;
      }
    } catch (error) {
      console.error('Error contacting:', error);
      alert('Failed to initiate contact. Please try again.');
    }
    setShowContactOptions(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'players':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((player) => (
              <motion.div
                key={player.id}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 91, 234, 0.15)" }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-blue-200 transition-all"
              >
                <div className="relative">
                  <div className="h-48 bg-white relative overflow-hidden flex items-center justify-center">
                    <div className="h-full w-full flex items-center justify-center">
                      <img 
                        src={player.image} 
                        alt={player.name}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${player.name.replace(' ', '+')}&background=random&size=400`;
                        }}
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-10 left-4">
                    <div className="w-20 h-20 bg-white rounded-full border-4 border-white flex items-center justify-center text-blue-600 font-bold text-xl relative overflow-hidden">
                      <div className="h-full w-full flex items-center justify-center">
                        <img 
                          src={player.image} 
                          alt={player.name} 
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${player.name.replace(' ', '+')}&background=random&size=400`;
                          }}
                        />
                      </div>
                    </div>
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
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Goals</div>
                      <div className="font-bold text-blue-600">{player.stats.goals || 0}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Assists</div>
                      <div className="font-bold text-blue-600">{player.stats.assists || 0}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Rating</div>
                      <div className="font-bold text-blue-600">{player.stats.rating?.toFixed(1) || 'N/A'}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => handleContact(player)} 
                      className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors flex items-center"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Contact
                    </button>
                    <button className="text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Save
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredData.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="col-span-full bg-white rounded-xl shadow-sm p-8 text-center"
              >
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No players found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search</p>
                <motion.button 
                  onClick={() => setSearchQuery('')}
                  className="text-blue-600 hover:text-blue-800 flex items-center justify-center mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear search
                </motion.button>
              </motion.div>
            )}
          </div>
        );
      case 'clubs':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((club) => (
              <motion.div
                key={club.id}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 91, 234, 0.15)" }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-blue-200 transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img src={club.image} alt={club.name} className="w-16 h-16 rounded-lg mr-4" />
                    <div>
                      {club.name === "Okaka FC" ? (
                        <NavLink to="/okaka" className="font-semibold text-lg text-gray-900 hover:text-blue-600">
                          {club.name}
                        </NavLink>
                      ) : (
                        <h3 className="font-semibold text-lg text-gray-900">{club.name}</h3>
                      )}
                      <div className="flex items-center text-gray-500 text-sm">
                        <span className="mr-2">{club.division}</span>
                        <span className="mr-2">•</span>
                        <span>{club.country}</span>
                        <span className="ml-2">{club.flag}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-500">Players</div>
                      <div className="font-medium">{club.players}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Location</div>
                      <div className="font-medium flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {club.country}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Status</div>
                    <div className="font-medium">{club.status}</div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    {club.name === "Okaka FC" ? (
                      <NavLink 
                        to="/okaka" 
                        className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors flex items-center"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        View Profile
                      </NavLink>
                    ) : (
                      <button 
                        onClick={() => handleContact(club)} 
                        className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors flex items-center"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Contact
                      </button>
                    )}
                    <button className="text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Save
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredData.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="col-span-full bg-white rounded-xl shadow-sm p-8 text-center"
              >
                <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No clubs found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search</p>
                <motion.button 
                  onClick={() => setSearchQuery('')}
                  className="text-blue-600 hover:text-blue-800 flex items-center justify-center mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear search
                </motion.button>
              </motion.div>
            )}
          </div>
        );
      case 'agents':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((agent) => (
              <motion.div
                key={agent.id}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 91, 234, 0.15)" }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-blue-200 transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img src={agent.image} alt={agent.name} className="w-16 h-16 rounded-full mr-4" />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{agent.name}</h3>
                      <div className="text-gray-500 text-sm">{agent.agency}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-500">Clients</div>
                      <div className="font-medium">{agent.clients}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Country</div>
                      <div className="font-medium">{agent.country}</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Status</div>
                    <div className="font-medium">{agent.status}</div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => handleContact(agent)} 
                      className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors flex items-center"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Contact
                    </button>
                    <button className="text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Save
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredData.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="col-span-full bg-white rounded-xl shadow-sm p-8 text-center"
              >
                <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No agents found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search</p>
                <motion.button 
                  onClick={() => setSearchQuery('')}
                  className="text-blue-600 hover:text-blue-800 flex items-center justify-center mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear search
                </motion.button>
              </motion.div>
            )}
          </div>
        );
      case 'staff':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((member) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 91, 234, 0.15)" }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-blue-200 transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full mr-4" />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{member.name}</h3>
                      <div className="text-gray-500 text-sm">{member.role}</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Experience</div>
                    <div className="font-medium">{member.experience}</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Club</div>
                    <div className="font-medium">{member.club}</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Country</div>
                    <div className="font-medium">{member.country}</div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => handleContact(member)} 
                      className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors flex items-center"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Contact
                    </button>
                    <button className="text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Save
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredData.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="col-span-full bg-white rounded-xl shadow-sm p-8 text-center"
              >
                <UserCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No staff found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search</p>
                <motion.button 
                  onClick={() => setSearchQuery('')}
                  className="text-blue-600 hover:text-blue-800 flex items-center justify-center mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear search
                </motion.button>
              </motion.div>
            )}
          </div>
        );
      case 'scouts':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((scout) => (
              <motion.div
                key={scout.id}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 91, 234, 0.15)" }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-blue-200 transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img src={scout.image} alt={scout.name} className="w-16 h-16 rounded-full mr-4" />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{scout.name}</h3>
                      <div className="text-gray-500 text-sm">{scout.region}</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Discoveries</div>
                    <div className="font-medium">{scout.discoveries}</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Country</div>
                    <div className="font-medium">{scout.country}</div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => handleContact(scout)} 
                      className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors flex items-center"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Contact
                    </button>
                    <button className="text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Save
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredData.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="col-span-full bg-white rounded-xl shadow-sm p-8 text-center"
              >
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No scouts found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search</p>
                <motion.button 
                  onClick={() => setSearchQuery('')}
                  className="text-blue-600 hover:text-blue-800 flex items-center justify-center mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear search
                </motion.button>
              </motion.div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">Football Network</h1>
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              {searchQuery && (
                <motion.button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-5 w-5" />
                </motion.button>
              )}
            </div>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 border-b-2 font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {renderContent()}
      </div>

      {showContactOptions && selectedContactEntity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-96"
          >
            <h3 className="text-lg font-semibold mb-4">Contact {selectedContactEntity.name}</h3>
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => handleContactMethod('email')}
                className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Send Email
              </button>
              <button
                onClick={() => handleContactMethod('phone')}
                className="flex items-center justify-center gap-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Phone Contact
              </button>
              <button
                onClick={() => handleContactMethod('message')}
                className="flex items-center justify-center gap-2 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                Send Message
              </button>
            </div>
            <button
              onClick={() => setShowContactOptions(false)}
              className="mt-4 w-full p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Outplacement;