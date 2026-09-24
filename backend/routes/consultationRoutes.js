const express = require('express');
const router = express.Router();
const Consultation = require('../models/Consultation');
const emailService = require('../utils/emailService');

// @route   POST /api/consultations
// @desc    Submit a new consultation request
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, service, preferredDate, preferredTime, details } = req.body;

    const newConsultation = new Consultation({
      name,
      email,
      phone,
      company,
      service,
      preferredDate,
      preferredTime,
      details
    });

    const savedConsultation = await newConsultation.save();
    
    // Send email notifications
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await Promise.allSettled([
        emailService.sendAdminNotification('consultation', savedConsultation),
        emailService.sendClientConfirmation('consultation', savedConsultation)
      ]);
    }
    
    res.status(201).json({ success: true, data: savedConsultation });
  } catch (error) {
    console.error('Error saving consultation:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   GET /api/consultations
// @desc    Get all consultation requests (admin)
router.get('/', async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: consultations });
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
