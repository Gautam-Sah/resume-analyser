require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', resumeRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  if (err instanceof require('multer').MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resume-analyzer')
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
