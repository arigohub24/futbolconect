"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Menu,
  X,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight,
  Mail,
  Phone,
  Users,
  Globe,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";

// Sample data (replace with actual data from your project)
const features = [
  {
    id: 1,
    title: "Global Player Network",
    description: "Access a database of over 35,000 players worldwide.",
    icon: <Globe className="h-8 w-8 text-blue-600" />,
  },
  {
    id: 2,
    title: "Direct Club Connections",
    description: "Negotiate directly with clubs, bypassing intermediaries.",
    icon: <Users className="h-8 w-8 text-blue-600" />,
  },
  {
    id: 3,
    title: "Advanced Analytics",
    description: "Leverage data-driven insights for smarter transfers.",
    icon: <Trophy className="h-8 w-8 text-blue-600" />,
  },
];

const stats = [
  { id: 1, value: "800+", label: "Clubs" },
  { id: 2, value: "35K+", label: "Players" },
  { id: 3, value: "£1.2B+", label: "Transfer Value" },
  { id: 4, value: "180+", label: "Countries" },
];

const testimonials = [
  {
    id: 1,
    quote: "futbol conect streamlined our transfer process, saving us time and money.",
    name: "John Smith",
    role: "Club Director, London",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    stars: 5,
  },
  {
    id: 2,
    quote: "The analytics tools helped us identify the perfect players for our team.",
    name: "Maria Gonzalez",
    role: "Scout, Madrid",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    stars: 5,
  },
  {
    id: 3,
    quote: "A game-changer for agents looking to expand their network globally.",
    name: "Ahmed Khan",
    role: "Agent, Dubai",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    stars: 5,
  },
];

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fallback images
  const fallbackImages = {
    product: "/placeholder.svg?height=500&width=500",
    user: "/placeholder.svg?height=100&width=100",
    logo: "/placeholder.svg?height=50&width=100",
  };

  // Navigation items
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const logoVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5 
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  const mobileMenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: { 
      height: 0, 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const mobileItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      x: -20, 
      opacity: 0,
      transition: { duration: 0.1 }
    }
  };

  const buttonHoverEffect = {
    scale: 1.03,
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 }
  };

    // Handle logo click to reload the page
    const handleLogoClick = () => {
      window.location.reload();
    };
    
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
        <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
              <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={logoVariants}
            className="cursor-pointer"
            onClick={handleLogoClick}
          >
            <motion.span 
              className="text-2xl font-bold tracking-tight flex items-center" 
              whileHover={{ scale: 1.05 }}
            >
              <motion.span 
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-lg mr-1" 
                whileHover={{ 
                  boxShadow: "0 0 8px rgba(59, 130, 246, 0.6)", 
                  scale: 1.05 
                }} 
                whileTap={{ scale: 0.98 }}
              >
                Futbol
              </motion.span>
              <span className={`${scrolled ? 'text-blue-600' : 'text-white'} transition-colors duration-300`}>
                Conect
              </span>
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {navItems.map((item, i) => (
                <motion.li 
                  key={item.name}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                >
                  <motion.a
                    href={item.href}
                    className={`font-medium transition-colors duration-300 ${
                      scrolled ? "text-slate-700" : "text-white"
                    }`}
                    whileHover={{ 
                      color: '#3b82f6', 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
            <div className="flex space-x-4">
              <motion.a
                href="/login"
                className={`border px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  scrolled
                    ? "border-blue-600 text-blue-600 hover:bg-blue-50"
                    : "border-white text-white hover:bg-white/10"
                }`}
                whileHover={buttonHoverEffect}
                whileTap={{ scale: 0.95 }}
              >
                Log in
              </motion.a>
              <motion.a
                href="/signup"
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0px 8px 20px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 focus:outline-none p-2 rounded-full"
              whileHover={{ 
                backgroundColor: scrolled ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.1)'
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} className={scrolled ? "text-slate-800" : "text-white"} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} className={scrolled ? "text-slate-800" : "text-white"} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden bg-white shadow-lg rounded-b-2xl"
            >
              <div className="px-4 pt-3 pb-5 space-y-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    variants={mobileItemVariants}
                    custom={i}
                  >
                    <motion.a
                      href={item.href}
                      className="block py-3 px-4 text-slate-700 font-medium hover:bg-blue-50 rounded-xl flex items-center justify-between"
                      onClick={() => setMobileMenuOpen(false)}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{item.name}</span>
                      <ChevronRight size={16} className="text-blue-500" />
                    </motion.a>
                  </motion.div>
                ))}
                <div className="pt-4 space-y-3">
                  <motion.a
                    href="/login"
                    className="block border border-blue-600 text-blue-600 py-3 px-4 rounded-xl text-center font-medium hover:bg-blue-50 transition-colors"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    variants={mobileItemVariants}
                  >
                    Log in
                  </motion.a>
                  <motion.a
                    href="/signup"
                    className="block bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-4 rounded-xl text-center font-medium shadow-md"
                    whileHover={{ 
                      scale: 1.02, 
                      y: -2,
                      boxShadow: "0px 8px 15px rgba(59, 130, 246, 0.3)" 
                    }}
                    whileTap={{ scale: 0.98 }}
                    variants={mobileItemVariants}
                  >
                    Get Started
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
        <div
              id="home"
              className="relative flex items-center justify-center min-h-screen bg-slate-900 overflow-hidden"
            >
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: "url(https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/80"></div>
              </div>

              {/* Content Container */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 md:py-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-start w-full"
                >
                  {/* Badge */}
                  <div className="inline-flex items-center bg-blue-900/40 px-4 py-2 rounded-full text-blue-300 mb-6">
                    <span className="bg-blue-500 w-2 h-2 rounded-full mr-2"></span>
                    <span>Revolutionizing Football Transfers</span>
                  </div>

                  {/* Main Heading */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                    Connect Directly with{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400">
                      Clubs Worldwide
                    </span>
                  </h1>

                  {/* Subheading */}
                  <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed">
                    FutbolConect.com is a global platform built to revolutionize how footballers, scouts, and clubs connect. Our goal is to break down barriers and make football opportunities accessible to talents everywhere, regardless of geography or background.
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-16">
                    <motion.a
                      href="/signup"
                      className="flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Started <ArrowRight size={20} className="ml-2" />
                    </motion.a>
                    <motion.button
                      onClick={() => setShowDemoModal(true)}
                      className="flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-white border border-white hover:bg-white/10 transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Watch Demo
                    </motion.button>
                  </div>

                  {/* Stats */}
                  <div className="w-full pt-8 border-t border-slate-700/50 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                      <motion.div
                        key={stat.id}
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: stat.id * 0.1 }}
                      >
                        <p className="text-3xl md:text-4xl font-bold text-white mb-2">
                          {stat.value}
                        </p>
                        <p className="text-slate-400 text-sm md:text-base">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

      {/* Features Section */}
      <div
        id="features"
        className="py-16 sm:py-24 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Powerful Tools for{" "}
              <span className="text-blue-600">Football Professionals</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Our platform provides everything you need to streamline transfers,
              discover talent, and connect with global football clubs.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100 bg-blue-50 relative overflow-hidden"
              >
                <motion.div
                  className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-blue-200 opacity-10"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100 border border-blue-100 shadow-inner"
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                  <Link
                    to="/features"
                    className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>


      {/* How It Works Section */}
      <div
        id="how-it-works"
        className="py-16 sm:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                How{" "}
                <span className="text-blue-600">futbol conect</span> Works
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Our platform streamlines the entire transfer process from initial
                discovery to final agreement, making transfers faster and more
                efficient.
              </p>
              <div className="space-y-8">
                {[
                  {
                    number: "01",
                    title: "Create your profile",
                    description:
                      "Set up your club or agency profile with all relevant information including transfer requirements and player availability.",
                  },
                  {
                    number: "02",
                    title: "Connect with clubs",
                    description:
                      "Browse and connect with clubs and agencies worldwide based on your specific requirements and interests.",
                  },
                  {
                    number: "03",
                    title: "Negotiate transfers",
                    description:
                      "Use our secure platform to negotiate transfers directly, with built-in tools for contracts and agreements.",
                  },
                  {
                    number: "04",
                    title: "Complete transactions",
                    description:
                      "Finalize deals with confidence using our comprehensive transaction support and documentation.",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={step.number}
                    className="flex"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="mr-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                        {step.number}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-slate-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 bg-slate-50 rounded-2xl p-8"
            >
              <div className="relative h-64 md:h-80 mb-8 overflow-hidden rounded-xl">
                <img
                  src="https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Football stadium"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImages.product;
                  }}
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Key Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "No intermediary fees",
                  "Direct club-to-club communication",
                  "Secure and confidential",
                  "Global reach",
                  "Time-efficient process",
                  "",
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    <span className="text-slate-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>


      {/* Stats Section */}
      <div className="py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Global Network and Impact</h2>
            <p className="max-w-2xl mx-auto text-blue-100">
              futbol conect has become the leading platform for clubs worldwide,
              facilitating transfers across all levels of professional football.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                className="text-center p-6 bg-blue-700/30 rounded-xl"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: stat.id * 0.1 }}
              >
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-blue-200">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>


      {/* Testimonials Section */}
      <div
        id="testimonials"
        className="py-16 sm:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Trusted by{" "}
              <span className="text-blue-600">Football Professionals</span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Hear from clubs, scouts, and agents who have transformed their
              recruitment process.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100 bg-blue-50 relative overflow-hidden group"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 0.1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute -right-4 -top-4 text-gray-300 z-0"
                >
                  <svg
                    className="h-24 w-24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </motion.div>
                <div className="relative z-10">
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <motion.svg
                        key={i}
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 10,
                          delay: i * 0.1,
                        }}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </motion.div>
                  <motion.div whileHover={{ x: 5 }} className="mt-4 relative pl-4">
                    <motion.div
                      className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-full"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <p className="text-gray-600 text-sm md:text-base italic">
                      {testimonial.quote}
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                    className="mt-6 flex items-center p-3 rounded-lg bg-white bg-opacity-30 backdrop-blur-sm transition-all duration-300"
                  >
                    <motion.div whileHover={{ scale: 1.1 }} className="relative">
                      <img
                        className="h-10 w-10 rounded-full border-2 border-white shadow-sm"
                        src={testimonial.image}
                        alt={testimonial.name}
                        onError={(e) => {
                          e.currentTarget.src = fallbackImages.user;
                        }}
                      />
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"
                      />
                    </motion.div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>


      {/* CTA Section */}
      <div
        id="contact"
        className="py-20 bg-slate-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Transform Your{" "}
              <span className="text-blue-400">Transfer Strategy?</span>
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join over 800 clubs worldwide that are already using futbol conect
              to revolutionize their transfer approach.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-800 p-8 rounded-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">For Clubs</h3>
                  <ul className="space-y-3">
                    {[
                      "Access to global player availability",
                      "Direct negotiations with other clubs",
                      "Reduced intermediary costs",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        whileHover={{ x: 5 }}
                      >
                        <span className="bg-blue-500 rounded-full w-5 h-5 mr-3 flex items-center justify-center text-xs mt-1">
                          ✓
                        </span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">For Scouts & Agents</h3>
                  <ul className="space-y-3">
                    {[
                      "Expanded network and connections",
                      "Advanced player analytics",
                      "Streamlined communication tools",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        whileHover={{ x: 5 }}
                      >
                        <span className="bg-blue-500 rounded-full w-5 h-5 mr-3 flex items-center justify-center text-xs mt-1">
                          ✓
                        </span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
              <form className="max-w-lg mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Club or Organization"
                    className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="mb-6">
                  <select className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none">
                    <option value="" disabled selected>
                      Select your role
                    </option>
                    <option value="club_director">Club Director</option>
                    <option value="scout">Scout</option>
                    <option value="agent">Agent</option>
                    <option value="agent">Club Representative</option>
                    <option value="coach">Coach</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg text-base font-medium hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Request Demo
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>


      {/* Footer */}
      <footer className="bg-gradient-to-b from-slate-900 to-slate-800 text-gray-300 py-12 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-blue-500 opacity-10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-500 opacity-10 blur-3xl"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8"
          >
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              <motion.span
                whileHover={{ scale: 1.02 }}
                className="text-blue-500 text-2xl font-bold tracking-tight inline-flex items-center"
              >
                <motion.span
                  whileHover={{ rotate: 5 }}
                  className="bg-blue-600 text-white px-2 py-1 rounded-lg mr-1"
                >
                  Futbol
                </motion.span>
                Connect
              </motion.span>
              <p className="text-gray-400 max-w-xs">
                Revolutionizing football transfers with direct club-to-club
                connections and advanced player intelligence globally.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">
                    info@futbolconect.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">+234 905 7403294</span>
                </div>
              </div>
              <div className="flex space-x-4 pt-2">
                {[
                  { icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com/futbolconect" },
                  { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com/futbolconect" },
                  { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com/futbolconect" },
                  { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/company/futbolconect" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -3, scale: 1.1, color: "#ffffff" }}
                    whileTap={{ scale: 0.95 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-800 p-2 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
            {[
              {
                title: "Product",
                links: [
                  { name: "Features", href: "/features" },
                  { name: "Pricing", href: "/pricing" },
                  { name: "Use Cases", href: "/use-cases" },
                  { name: "Integrations", href: "/integrations" },
                ]                
              },
              {
                title: "Company",
                links: [
                  { name: "About Us", href: "/about" },
                  { name: "Careers", href: "/careers" },
                  { name: "Press", href: "/press" },
                  { name: "Blog", href: "/blog" },
                ]
              },
              {
                title: "Resources",
                links: [
                  { name: "Help Center", href: "/help-center" },
                  { name: "Documentation", href: "/docs" },
                  { name: "Webinars", href: "/webinars" },
                  { name: "Status", href: "/status" },
                ]
                
              },
              {
                title: "Legal",
                links: [
                  { name: "Terms of Service", href: "/terms" },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Cookies", href: "/cookies" },
                  { name: "GDPR", href: "/gdpr" },
                ]                
              },
            ].map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
                  <motion.span
                    className="w-2 h-2 bg-blue-500 rounded-full mr-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                      >
                        <motion.span
                          className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100"
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: linkIndex * 0.2,
                          }}
                        />
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-gray-400"
          >
            <p>© {new Date().getFullYear()} futbol conect. All rights reserved.</p>
            <p className="mt-1 text-blue-400">
              Developed by{" "}
              <a
                href="https://arigotechnologies.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors duration-200"
              >
                Arigo Technologies
              </a>
            </p>
          </motion.div>
        </div>
      </footer>


      {/* Demo Modal */}
      {showDemoModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-xl max-w-4xl w-full p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Platform Demo</h3>
              <button
                onClick={() => setShowDemoModal(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="aspect-video bg-slate-100 rounded-lg mb-4">
              <video 
                width="100%" 
                height="100%" 
                controls 
                className="rounded-lg"
              >
                <source src="/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <motion.button
              onClick={() => setShowDemoModal(false)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg text-base font-medium hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default LandingPage;