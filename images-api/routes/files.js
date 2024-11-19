const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const db = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const File = db.File;

router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const file = await File.create({
      name: req.file.filename,
      path: req.file.path,
    });

    res.status(201).json({ message: 'File uploaded successfully', file });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    res.sendFile(path.resolve(file.path));
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving file', error });
  }
});

module.exports = router;