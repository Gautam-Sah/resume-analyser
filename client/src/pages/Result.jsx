import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, Target, Briefcase, Award } from 'lucide-react';
import RoleCard from '../components/RoleCard';
import SkillList from '../components/SkillList';
import SuggestionsList from '../components/SuggestionsList';
import { motion } from 'framer-motion';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysis, fileName } = location.state || {};

  useEffect(() => {
    if (!analysis) {
      navigate('/');
    }
  }, [analysis, navigate]);

  if (!analysis) return null;

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-brand-100 selection:text-brand-900 pb-20">
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 hidden sm:block">AI Resume Analyzer</span>
            </div>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="text-sm font-medium text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-4 py-2 rounded-full transition-colors"
          >
            Analyze Another
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 pt-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 mb-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h1 className="text-2xl font-bold text-slate-900 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Analysis Results</h1>
            <p className="text-slate-500 mt-1">Showing insights for <span className="font-medium text-slate-700">{fileName}</span></p>
          </div>
          {analysis.ats_score !== undefined && (
            <div className="flex items-center gap-4 bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600 font-bold text-xl">
                {analysis.ats_score}
              </div>
              <div>
                <h3 className="text-emerald-800 font-semibold leading-tight">Est. ATS Score</h3>
                <p className="text-emerald-600 text-sm">Out of 100</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 text-slate-700 leading-relaxed text-lg"
        >
          {analysis.summary}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Roles */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-200 pb-2">
                <Briefcase className="w-6 h-6 text-brand-500" />
                Recommended Roles
              </h2>
              <div className="space-y-4">
                {analysis.recommended_roles?.map((role, idx) => (
                  <RoleCard key={idx} {...role} delay={idx * 0.1} />
                ))}
              </div>
            </section>

            {/* Suggestions */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-200 pb-2">
                <Target className="w-6 h-6 text-brand-500" />
                Action Plan & Feedback
              </h2>
              <SuggestionsList 
                title="Resume Improvements" 
                items={analysis.resume_improvements} 
              />
              <SuggestionsList 
                title="Additional Roles to Target" 
                items={analysis.additional_roles_to_target} 
                icon={Award}
                colorClass="text-purple-500"
              />
            </section>
          </div>

          <div className="space-y-8">
            {/* Skills */}
            <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-200 pb-2">
                <Sparkles className="w-6 h-6 text-brand-500" />
                Skill Analysis
              </h2>
              <SkillList title="Strong Skills" skills={analysis.strong_skills} type="strong" />
              <SkillList title="Missing/Weak Skills" skills={analysis.missing_skills} type="missing" />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Result;
