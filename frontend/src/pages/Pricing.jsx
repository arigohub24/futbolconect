import { motion } from 'framer-motion';
import PricingCard from '../components/PricingCard';
import { Quote, Star } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Premium",
      durations: [
        { months: 24, price: "£16,700", note: "1st year", save: null },
        { months: 36, price: "£12,600", note: "1st year", save: "Save £4,100" }
      ],
      features: {
        transfersOut: [
          "Make players available",
          "Pitch players to clubs' real-time requirements",
          "Full visibility of ads - maximum pitching opportunities"
        ],
        transfersIn: [
          "Create adverts and receive pitches",
          "Search for players globally",
          "See restricted player availability"
        ],
        network: [
          "Direct access to decision makers at 850+ clubs",
          "1 in-person & 3 virtual events per year",
          "Dedicated 1:1 meetings"
        ]
      },
      note: "All contracts include a 15% annual price increase"
    },
    {
      name: "Pro Standalone",
      durations: [
        { months: 24, price: "£8,700", note: "1st year", save: null },
        { months: 36, price: "£6,600", note: "1st year", save: "Save £2,100" }
      ],
      features: {
        transfersOut: [
          "Make players available",
          "Pitch players to clubs' real-time requirements",
          "Limited access to club ads for pitching opportunities"
        ],
        transfersIn: [
          "Create adverts and receive pitches",
          "Search for players globally",
          "See restricted player availability"
        ],
        network: [
          "Direct access to decision makers at 850+ clubs",
          "Attend Virtual Deal Days - 2 events per year",
          "Access to the Friendly Marketplace",
          "Dedicated account manager"
        ]
      },
      note: "All contracts include a 15% annual price increase"
    }
  ];

  const testimonials = [
    {
      quote: "futbol connect has revolutionized how we connect with clubs globally.",
      author: "John Smith, Sporting Director, FC Elite",
      rating: 5
    },
    {
      quote: "The platform saves us weeks of work in the transfer market.",
      author: "Emma Johnson, Technical Director, Global United",
      rating: 4
    },
    {
      quote: "An essential tool for modern football management.",
      author: "Carlos Mendez, Head Scout, City Strikers",
      rating: 5
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="min-h-screen bg-gray-50 p-6 md:p-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-blue-900 mb-8"
        >
          Pricing Plans
        </motion.h1>

        {/* Pricing Plans */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10"
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: "0 10px 20px rgba(0, 91, 234, 0.15)" }}
            >
              <PricingCard 
                plan={plan}
                delay={index * 0.2}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Section */}
        <motion.div 
          variants={containerVariants}
          className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-xl md:text-2xl font-semibold text-blue-900 mb-6"
          >
            What Club Decision Makers Say
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03, 
                  backgroundColor: "#EBF5FF",
                  transition: { duration: 0.2 }
                }}
                className="bg-blue-50 p-6 rounded-lg text-center relative"
              >
                <Quote className="h-6 w-6 text-blue-600 absolute top-4 left-4 opacity-50" />
                <p className="text-gray-700 italic mb-4">{testimonial.quote}</p>
                <p className="text-sm font-medium text-blue-900">{testimonial.author}</p>
                <div className="flex justify-center mt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-green-500 fill-green-500" />
                  ))}
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