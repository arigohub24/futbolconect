import { motion } from 'framer-motion';
import PricingCard from '../components/PricingCard';
import { Quote, Star, Check, Zap, Shield } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Premium',
      tagline: 'Complete transfer management solution',
      price: '£5,000',
      period: 'per year',
      cta: 'Get Premium',
      popular: true,
      features: [
        'Unlimited player transfers',
        'Access to 850+ clubs worldwide',
        'Advanced player analytics',
        'Priority support 24/7',
        '4 in-person networking events',
        'Dedicated account manager',
        'Market intelligence reports',
        'Contract negotiation support',
      ],
      note: '15% discount for multi-year contracts',
      route: '/payment/premium',
    },
    {
      name: 'Basic',
      tagline: 'Essential tools for player transfers',
      price: '£2,500',
      period: 'per year',
      cta: 'Get Started',
      features: [
        'Up to 20 player transfers',
        'Access to 300+ clubs',
        'Basic player analytics',
        'Business hours support',
        '2 virtual networking events',
        'Monthly market updates',
        'Standard contract templates',
      ],
      note: '10% discount for multi-year contracts',
      route: '/payment/basic',
    },
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: 'Instant Connections',
      description: 'Direct access to decision-makers at top clubs worldwide',
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: 'Secure Platform',
      description: 'End-to-end encrypted communications for sensitive negotiations',
    },
    {
      icon: <Check className="w-6 h-6 text-blue-600" />,
      title: 'Verified Profiles',
      description: 'All clubs and agents are thoroughly vetted before joining',
    },
  ];

  const testimonials = [
    {
      quote: 'futbol conect has revolutionized how we connect with clubs globally.',
      author: 'John Smith',
      role: 'Sporting Director, FC Elite',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&auto=format'
    },
    {
      quote: 'The platform saves us weeks of work in the transfer market.',
      author: 'Emma Johnson',
      role: 'Technical Director, Global United',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&auto=format'
    },
    {
      quote: 'An essential tool for modern football management.',
      author: 'Carlos Mendez',
      role: 'Head Scout, City Strikers',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&auto=format'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your needs. Scale up as your transfer business grows.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <PricingCard plan={plan} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div variants={containerVariants} className="mb-20">
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Why Choose futbol conect
          </motion.h2>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="bg-blue-600 p-8 rounded-xl shadow-sm border border-blue-500 text-center text-white"
              >
                <div className="flex justify-center mb-4 text-white">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          variants={containerVariants}
          className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Trusted by Football Professionals
          </motion.h2>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                }}
                className="bg-gray-50 p-6 rounded-lg relative"
              >
                <Quote className="absolute top-4 left-4 h-5 w-5 text-gray-300" />
                <p className="text-gray-700 italic mb-6 pl-8">{testimonial.quote}</p>
                <div className="border-t border-gray-200 pt-4 flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${testimonial.author}&background=random`;
                    }}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <div className="flex mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Pricing;