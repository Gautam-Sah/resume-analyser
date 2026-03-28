const { extractTextFromFile } = require('../utils/fileParser');
const { analyzeResumeWithAI } = require('../services/aiService');
const ResumeAnalysis = require('../models/ResumeAnalysis');

const analyzeResume = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No resume file uploaded' });
    }

    // 1. Extract text
    const extractedText = await extractTextFromFile(file);

    if (!extractedText || extractedText.trim() === '') {
      return res.status(400).json({ error: 'Failed to extract text or empty resume' });
    }

    // 2. Analyze with AI
    let analysisResult;
    try {
      analysisResult = await analyzeResumeWithAI(extractedText);
    } catch (aiError) {
      console.error(aiError);
      return res.status(500).json({ error: 'AI Analysis failed. Please try again.', details: aiError.message });
    }

    // 3. Save to MongoDB
    const resumeDoc = new ResumeAnalysis({
      originalFileName: file.originalname,
      extractedText,
      analysisResult,
    });

    await resumeDoc.save();

    // 4. Return result
    return res.status(200).json({
      message: 'Resume analyzed successfully',
      data: analysisResult,
      id: resumeDoc._id,
    });

  } catch (error) {
    console.error('Error analyzing resume:', error);
    return res.status(500).json({ error: 'Internal server error while processing the resume', details: error.message });
  }
};

module.exports = { analyzeResume };
