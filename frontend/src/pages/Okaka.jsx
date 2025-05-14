import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search,  Trophy, Users, Calendar, MapPin, Share2, Twitter, Facebook, Linkedin, Link } from 'lucide-react';
import OkakaPlayerProfile from '../components/OkakaPlayerProfile';

const Okaka = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [sharePlayer, setSharePlayer] = useState(null);

  const teamInfo = {
    name: "Okaka FC",
    founded: 2010,
    stadium: "Okaka Stadium",
    capacity: "25,000",
    location: "Lagos, Nigeria",
    manager: "John Smith",
    achievements: [
      "League Champions 2022",
      "Cup Winners 2021",
      "Super Cup 2023"
    ]
  };

  const players = [
    {
      id: 1,
      name: "Rotimi Nicol",
      position: "Attacking Midfielder",
      number: 10,
      age: 19,
      nationality: "Nigeria",
      flag: "🇳🇬",
      height: "1.82m",
      weight: "75kg",
      joined: "2023",
      contract: "2025",
      dateOfBirth: "2004-09-27",
      stats: {
        appearances: 28,
        goals: 45,
        assists: 30,
        rating: 9.2
      },
      image: "/rotimi2.png",
      bio: "Creative attacking midfielder with exceptional vision and technical ability. Controls the tempo of the game and provides key assists."
    },
    {
      id: 2,
      name: "Chucks Peter",
      position: "Center Back",
      number: 5,
      age: 17,
      nationality: "Nigeria",
      flag: "🇳🇬",
      height: "1.80m",
      weight: "73kg",
      joined: "2023",
      contract: "2025",
      dateOfBirth: "2006-07-01",
      stats: {
        appearances: 25,
        goals: 1,
        assists: 1,
        cleanSheets: 12,
        rating: 8.2
      },
      image: "/player1.png",
      bio: "Strong and commanding center-back who leads the defensive line. Known for his aerial ability and tactical awareness."
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
      dateOfBirth: "2009-12-13",
      stats: {
        appearances: 20,
        goals: 2,
        assists: 8,
        cleanSheets: 10,
        rating: 8.5
      },
      image: "/player2.png",
      bio: "Dynamic right-back with excellent pace and crossing ability. Known for his defensive solidity and attacking contributions."
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
      bio: "Strong defensive midfielder with excellent tackling and positioning. Provides solid protection for the backline."
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
      dateOfBirth: "2006-12-16",
      stats: {
        appearances: 24,
        goals: 18,
        assists: 7,
        rating: 8.7
      },
      image: "/player4.png",
      bio: "Young and prolific striker with exceptional finishing ability. Despite his age, he has shown remarkable composure and goal-scoring instincts."
    },
    {
      id: 6,
      name: "Chisom Agbodike",
      position: "Center Back",
      number: 4,
      age: 17,
      nationality: "Nigeria",
      flag: "🇳🇬",
      height: "1.88m",
      weight: "80kg",
      joined: "2023",
      contract: "2025",
      dateOfBirth: "2006-10-04",
      stats: {
        appearances: 26,
        goals: 2,
        assists: 1,
        cleanSheets: 13,
        rating: 7.9
      },
      image: "/player5.png",
      bio: "Strong and commanding center-back who leads the defensive line. Known for his aerial ability and tactical awareness."
    },
    {
      id: 7,
      name: "Victor Osimhen",
      position: "Goalkeeper",
      number: 1,
      age: 16,
      nationality: "Nigeria",
      flag: "🇳🇬",
      height: "1.90m",
      weight: "82kg",
      joined: "2023",
      contract: "2025",
      dateOfBirth: "2007-05-15",
      stats: {
        appearances: 18,
        cleanSheets: 8,
        saves: 45,
        rating: 8.1
      },
      image: "/assets/players/victor-osimhen.jpg",
      bio: "Promising young goalkeeper with excellent reflexes and shot-stopping ability. Shows great potential for his age."
    },
    {
      id: 8,
      name: "Ibrahim Musa",
      position: "Left Back",
      number: 3,
      age: 18,
      nationality: "Nigeria",
      flag: "🇳🇬",
      height: "1.80m",
      weight: "74kg",
      joined: "2023",
      contract: "2025",
      dateOfBirth: "2005-08-22",
      stats: {
        appearances: 23,
        goals: 2,
        assists: 6,
        rating: 7.7
      },
      image: "/assets/players/ibrahim-musa.jpg",
      bio: "Attacking left-back with good pace and crossing ability. Provides width and defensive cover on the left flank."
    },
    {
      id: 9,
      name: "Daniel Johnson",
      position: "Center Back",
      number: 5,
      age: 17,
      nationality: "Nigeria",
      flag: "🇳🇬",
      height: "1.86m",
      weight: "79kg",
      joined: "2023",
      contract: "2025",
      dateOfBirth: "2006-03-10",
      stats: {
        appearances: 21,
        goals: 1,
        assists: 2,
        rating: 7.6
      },
      image: "/assets/players/daniel-johnson.jpg",
      bio: "Solid center-back with good positioning and tackling ability. Forms a strong partnership with the defensive line."
    },
    {
      id: 10,
      name: "Samuel Okon",
      position: "Central Midfielder",
      number: 7,
      age: 18,
      nationality: "Nigeria",
      flag: "🇳🇬",
      height: "1.83m",
      weight: "76kg",
      joined: "2023",
      contract: "2025",
      dateOfBirth: "2005-11-30",
      stats: {
        appearances: 25,
        goals: 4,
        assists: 9,
        rating: 7.8
      },
      image: "/assets/players/samuel-okon.jpg",
      bio: "Versatile central midfielder with good passing range and work rate. Controls the tempo of the game effectively."
    },
    {
      id: 11,
      name: "Michael Adebayo",
      position: "Winger",
      number: 11,
      age: 16,
      nationality: "Nigeria",
      flag: "🇳🇬",
      height: "1.79m",
      weight: "71kg",
      joined: "2023",
      contract: "2025",
      dateOfBirth: "2007-07-14",
      stats: {
        appearances: 19,
        goals: 6,
        assists: 7,
        rating: 7.9
      },
      image: "/assets/players/michael-adebayo.jpg",
      bio: "Explosive winger with excellent pace and dribbling skills. Creates chances and scores important goals."
    },
    {
      id: 12,
      name: "David Okonkwo",
      position: "Striker",
      number: 14,
      age: 17,
      nationality: "Nigeria",
      flag: "🇳🇬",
      height: "1.84m",
      weight: "77kg",
      joined: "2023",
      contract: "2025",
      dateOfBirth: "2006-09-25",
      stats: {
        appearances: 22,
        goals: 12,
        assists: 3,
        rating: 8.0
      },
      image: "/assets/players/david-okonkwo.jpg",
      bio: "Clinical striker with good movement and finishing ability. Provides strong competition for the starting spot."
    },
    {
      id: 13,
      name: "James Okafor",
      position: "Goalkeeper",
      number: 13,
      age: 16,
      nationality: "Nigeria",
      flag: "🇳🇬",
      height: "1.88m",
      weight: "80kg",
      joined: "2023",
      contract: "2025",
      dateOfBirth: "2007-02-18",
      stats: {
        appearances: 12,
        cleanSheets: 5,
        saves: 32,
        rating: 7.5
      },
      image: "/assets/players/james-okafor.jpg",
      bio: "Promising young goalkeeper with good shot-stopping ability. Provides strong competition for the number one spot."
    },
    {
      id: 14,
      name: "Peter Obi",
      position: "Defensive Midfielder",
      number: 15,
      age: 17,
      nationality: "Nigeria",
      flag: "🇳🇬",
      height: "1.81m",
      weight: "75kg",
      joined: "2023",
      contract: "2025",
      dateOfBirth: "2006-06-08",
      stats: {
        appearances: 18,
        goals: 2,
        assists: 4,
        rating: 7.4
      },
      image: "/assets/players/peter-obi.jpg",
      bio: "Hard-working defensive midfielder with good tackling and positioning. Provides solid cover for the backline."
    },
    {
      id: 15,
      name: "John Okonkwo",
      position: "Winger",
      number: 17,
      age: 16,
      nationality: "Nigeria",
      flag: "🇳🇬",
      height: "1.77m",
      weight: "70kg",
      joined: "2023",
      contract: "2025",
      dateOfBirth: "2007-04-12",
      stats: {
        appearances: 15,
        goals: 5,
        assists: 6,
        rating: 7.6
      },
      image: "/assets/players/john-okonkwo.jpg",
      bio: "Skilled winger with good pace and technical ability. Creates chances and provides attacking options."
    },
    {
      id: 16,
      name: "Emmanuel Okafor",
      position: "Center Back",
      number: 16,
      age: 17,
      nationality: "Nigeria",
      flag: "🇳🇬",
      height: "1.87m",
      weight: "81kg",
      joined: "2023",
      contract: "2025",
      dateOfBirth: "2006-08-19",
      stats: {
        appearances: 14,
        goals: 1,
        assists: 1,
        rating: 7.3
      },
      image: "/assets/players/emmanuel-okafor.jpg",
      bio: "Strong center-back with good aerial ability and tackling. Provides depth in the defensive line."
    }
  ];

  const positions = [
    { id: 'all', label: 'All Positions' },
    { id: 'forward', label: 'Forwards' },
    { id: 'midfielder', label: 'Midfielders' },
    { id: 'defender', label: 'Defenders' },
    { id: 'goalkeeper', label: 'Goalkeepers' }
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

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPosition = selectedPosition === 'all' || player.position.toLowerCase() === selectedPosition;
    return matchesSearch && matchesPosition;
  });

  const handleShare = (player) => {
    setSharePlayer(player);
    setShowShareOptions(true);
  };

  const shareProfile = async (method) => {
    const player = sharePlayer;
    const shareText = `Check out ${player.name}'s profile at Okaka FC! Position: ${player.position}, Age: ${player.age}, Rating: ${player.stats.rating}`;
    const shareUrl = `${window.location.origin}/player/${player.id}`;

    try {
      switch (method) {
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
          break;
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
          break;
        case 'copy':
          await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
          alert('Profile link copied to clipboard!');
          break;
      }
    } catch (error) {
      console.error('Error sharing profile:', error);
      alert('Failed to share profile. Please try again.');
    }
    setShowShareOptions(false);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Team Header */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900 mb-2">{teamInfo.name}</h1>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Founded {teamInfo.founded}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {teamInfo.location}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Manager: {teamInfo.manager}
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center gap-2 text-yellow-500">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">Recent Achievements</span>
              </div>
              <ul className="mt-2 text-sm text-gray-600">
                {teamInfo.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <div className="flex gap-2">
            {positions.map((position) => (
              <button
                key={position.id}
                onClick={() => setSelectedPosition(position.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPosition === position.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {position.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Players Grid */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player) => (
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
              
              <div className="pt-12 p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{player.name}</h3>
                    <div className="flex items-center text-gray-500 text-sm">
                      <span className="mr-2">#{player.number}</span>
                      <span className="mr-2">•</span>
                      <span>{player.position}</span>
                    </div>
                  </div>
                  <span className="text-2xl">{player.flag}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 my-4">
                  <div>
                    <div className="text-xs text-gray-500">Age</div>
                    <div className="font-medium">{player.age}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Height</div>
                    <div className="font-medium">{player.height}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Weight</div>
                    <div className="font-medium">{player.weight}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Joined</div>
                    <div className="font-medium">{player.joined}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">Season Stats</div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Apps</div>
                      <div className="font-bold text-blue-600">{player.stats.appearances}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Goals</div>
                      <div className="font-bold text-blue-600">{player.stats.goals}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Assists</div>
                      <div className="font-bold text-blue-600">{player.stats.assists}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Rating</div>
                      <div className="font-bold text-blue-600">{player.stats.rating}</div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  {player.bio}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => setSelectedPlayer(player)}
                    className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
                  >
                    View Full Profile
                  </button>
                  <button 
                    onClick={() => handleShare(player)}
                    className="text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors flex items-center"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Share Profile
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Player Profile Modal */}
      {selectedPlayer && (
        <OkakaPlayerProfile
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      )}

      {/* Share Options Modal */}
      {showShareOptions && sharePlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-96"
          >
            <h3 className="text-lg font-semibold mb-4">Share {sharePlayer.name}Profile</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => shareProfile('twitter')}
                className="flex items-center justify-center gap-2 p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
                Twitter
              </button>
              <button
                onClick={() => shareProfile('facebook')}
                className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
                Facebook
              </button>
              <button
                onClick={() => shareProfile('linkedin')}
                className="flex items-center justify-center gap-2 p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </button>
              <button
                onClick={() => shareProfile('copy')}
                className="flex items-center justify-center gap-2 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Link className="w-5 h-5" />
                Copy Link
              </button>
            </div>
            <button
              onClick={() => setShowShareOptions(false)}
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

export default Okaka; 