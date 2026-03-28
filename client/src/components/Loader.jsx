import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
        }}
        className="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center shadow-lg"
      >
        <Sparkles className="w-8 h-8 text-white" />
      </motion.div>
      <motion.h3
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="mt-6 text-xl font-semibold text-slate-700"
      >
        Analyzing your resume with AI...
      </motion.h3>
      <p className="mt-2 text-slate-500 text-sm">This might take a few seconds.</p>
    </div>
  );
};

export default Loader;
