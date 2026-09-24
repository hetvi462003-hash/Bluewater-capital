const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const Consultation = require('../models/Consultation');
const ResourceRequest = require('../models/ResourceRequest');

// Admin Login Route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

  if (username && username.toLowerCase() === adminUser.toLowerCase() && password === adminPass) {
    const payload = {
      user: {
        id: 'admin_user',
        role: 'admin'
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'bluewater_secret_123',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// GET all consultations
router.get('/consultations', authMiddleware, async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ createdAt: -1 });
    res.json(consultations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET all resource requests
router.get('/resources', authMiddleware, async (req, res) => {
  try {
    const resources = await ResourceRequest.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// UPDATE consultation status
router.put('/consultations/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body; // e.g., 'pending', 'contacted'
    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );
    res.json(consultation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// UPDATE resource request status
router.put('/resources/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body; // e.g., 'pending', 'sent'
    const resource = await ResourceRequest.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );
    res.json(resource);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE resource request
router.delete('/resources/:id', authMiddleware, async (req, res) => {
  try {
    await ResourceRequest.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Resource request removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE consultation request
router.delete('/consultations/:id', authMiddleware, async (req, res) => {
  try {
    await Consultation.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Consultation removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
