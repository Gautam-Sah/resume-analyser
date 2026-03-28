import React from 'react';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RoleCard = ({ role, fit_score, reason, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-800 mb-2">{role}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{reason}</p>
        </div>
        <div className="w-16 h-16 shrink-0">
          <CircularProgressbar
            value={fit_score}
            text={`${fit_score}%`}
            styles={buildStyles({
              textSize: '24px',
              pathColor: fit_score >= 80 ? '#10b981' : fit_score >= 60 ? '#f59e0b' : '#ef4444',
              textColor: '#334155',
              trailColor: '#f1f5f9',
            })}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default RoleCard;
