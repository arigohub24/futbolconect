import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const PricingCard = ({ plan, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`relative rounded-2xl overflow-hidden ${plan.popular ? 'border-2 border-blue-500' : 'border border-gray-200'}`}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
          MOST POPULAR
        </div>
      )}
      
      <div className="p-8 bg-white">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
          <p className="text-gray-600">{plan.tagline}</p>
        </div>
        
        <div className="mb-8">
          <div className="flex items-end">
            <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
            <span className="text-lg text-gray-600 ml-2">{plan.period}</span>
          </div>
          {plan.note && (
            <p className="text-sm text-gray-500 mt-2">{plan.note}</p>
          )}
        </div>
        
        <Link
          to={plan.route}
          className={`w-full block text-center py-3 px-6 rounded-lg font-medium transition-all ${
            plan.popular 
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300'
          }`}
        >
          {plan.cta}
        </Link>
      </div>
      
      <div className="border-t border-gray-200 bg-gray-50 p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
        <ul className="space-y-3">
          {plan.features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="flex items-start"
            >
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default PricingCard;