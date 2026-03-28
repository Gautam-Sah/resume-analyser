import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SuggestionsList = ({ title, items, icon: Icon = CheckCircle, colorClass = "text-brand-500" }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
      <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Icon className={`w-5 h-5 ${colorClass}`} />
        {title}
      </h4>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3"
          >
            <ArrowRight className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <span className="text-slate-600 leading-relaxed">{item}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsList;
