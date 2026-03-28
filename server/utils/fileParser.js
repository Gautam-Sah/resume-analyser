const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs');

/**
 * Parses a file (PDF or DOCX) and extracts its text.
 * @param {Object} file - The uploaded multer file object
 * @returns {Promise<string>} The extracted text
 */
const extractTextFromFile = async (file) => {
  if (!file) {
    throw new Error('No file provided');
  }

  const { path: filePath, mimetype } = file;

  try {
    let extractedText = '';

    if (mimetype === 'application/pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      extractedText = data.text;
    } else if (
      mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimetype === 'application/msword'
    ) {
      const result = await mammoth.extractRawText({ path: filePath });
      extractedText = result.value;
    } else {
      throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
    }

    // Clean up temporary file from uploads directory
    try {
      fs.unlinkSync(filePath);
    } catch (cleanupError) {
      console.error(`Failed to delete temporary file ${filePath}:`, cleanupError);
    }

    return extractedText.trim();
  } catch (error) {
    // Attempt cleanup on error
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (cleanupError) {
      console.error(`Failed to clean up file ${filePath} after error:`, cleanupError);
    }
    throw error;
  }
};

module.exports = { extractTextFromFile };
