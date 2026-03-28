import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import Loader from '../components/Loader';
import { analyzeResume } from '../services/api';
import { Sparkles, FileText, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileSelect = async (file) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeResume(file);
      navigate('/result', { state: { analysis: result.data, fileId: result.id, fileName: file.name } });
    } catch (err) {
      setError(err.message || 'Something went wrong during analysis');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-brand-100 selection:text-brand-900">
      <nav className="border-b border-slate-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">AI Resume Analyzer</span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        {isAnalyzing ? (
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100">
            <Loader />
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                Unlock your resume's <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-emerald-400">full potential</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our AI analyzes your resume against industry standards to provide actionable feedback, skill gap analysis, and personalized job role recommendations.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-400 to-emerald-400" />
               <FileUpload onFileSelect={handleFileSelect} />
               
               {error && (
                 <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-center">
                   {error}
                 </div>
               )}
            </div>

            <div className="grid md:grid-cols-3 gap-8 pt-8">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-800">Smart Extraction</h3>
                <p className="text-sm text-slate-500">Accurately parses PDF and DOCX files to understand your experience natively.</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-brand-50 text-brand-500 rounded-2xl flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-800">AI Analysis</h3>
                <p className="text-sm text-slate-500">Uses advanced language models to evaluate your skills and suggest role fits.</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-800">Actionable Feedback</h3>
                <p className="text-sm text-slate-500">Get a detailed plan on missing skills and improvements to land interviews.</p>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Home;
