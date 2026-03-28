import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, CheckCircle, X, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const FileUpload = ({ onFileSelect }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    setError(null);
    if (fileRejections.length > 0) {
      setError('Invalid file type or size. Please upload a PDF or DOCX file (Max 10MB).');
      return;
    }
    
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc']
    },
    maxFiles: 1,
    maxSize: 10485760, // 10MB
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onFileSelect(file);
    }
  };

  const clearFile = (e) => {
    e.stopPropagation();
    setFile(null);
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-brand-500 bg-brand-50' : 'border-slate-300 hover:border-brand-400 bg-white hover:bg-slate-50'
        }`}
      >
        <input {...getInputProps()} />
        
        {!file ? (
          <div className="flex flex-col items-center justify-center space-y-4 pointer-events-none">
            <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mb-2">
              <UploadCloud className="w-10 h-10 text-brand-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Drag & drop your resume here</h3>
            <p className="text-slate-500 text-sm">Supports PDF, DOCX (Max 10MB)</p>
            <div className="mt-6 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-full transition-colors pointer-events-auto">
              Browse Files
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 relative">
              <FileText className="w-8 h-8 text-emerald-600" />
              <button onClick={clearFile} className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100 pointer-events-auto">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <h3 className="text-lg font-bold text-slate-800 break-all">{file.name}</h3>
            <p className="text-sm text-slate-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            <div className="flex items-center gap-2 mt-4 text-emerald-600 font-medium bg-emerald-50 px-4 py-2 rounded-full cursor-default">
              <CheckCircle className="w-5 h-5" />
              Ready to analyze
            </div>
          </motion.div>
        )}
      </div>

      {error && (
        <p className="mt-4 text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>
      )}

      {file && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            <Sparkles className="w-5 h-5" />
            Analyze Resume
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload;
