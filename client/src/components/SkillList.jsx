import React from 'react';
import { motion } from 'framer-motion';

const SkillList = ({ title, skills, type }) => {
  if (!skills || skills.length === 0) return null;

  const isMissing = type === 'missing';
  
  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-slate-800 mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`px-3 py-1 text-sm font-medium rounded-full ${
              isMissing 
                ? 'bg-red-50 text-red-600 border border-red-200' 
                : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
            }`}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default SkillList;
