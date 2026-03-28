const mongoose = require('mongoose');

const resumeAnalysisSchema = new mongoose.Schema({
  originalFileName: {
    type: String,
    required: true,
  },
  extractedText: {
    type: String,
    required: true,
  },
  analysisResult: {
    type: Object, // Structured JSON response from OpenAI
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ResumeAnalysis', resumeAnalysisSchema);
