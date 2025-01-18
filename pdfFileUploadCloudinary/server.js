// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Initialize Express
const app = express();
app.use(express.json());

// MongoDB Model
const pdfSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});
const PdfModel = mongoose.model('Pdf', pdfSchema);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Configure Multer for File Uploads
const upload = multer({ dest: 'uploads/' });

// File Upload Endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'raw',
      folder: 'uploads', // Raw for non-media files like PDFs
    });

    // Save metadata to MongoDB
    const pdfData = new PdfModel({
      filename: req.file.originalname,
      url: result.secure_url,
    });
    await pdfData.save();

    // Remove the uploaded file from the server
    await fs.unlink(req.file.path);

    res.status(200).json({ message: 'File uploaded successfully', url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
