const express = require('express');
const multer = require('multer');
const { analyzeResume } = require('../controllers/resumeController');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Configure multer
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.mimetype === 'application/msword'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and DOCX are allowed.'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  }
});

router.post('/analyze-resume', upload.single('resume'), analyzeResume);

module.exports = router;
