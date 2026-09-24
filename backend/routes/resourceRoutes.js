const express = require('express');
const router = express.Router();
const ResourceRequest = require('../models/ResourceRequest');
const emailService = require('../utils/emailService');

// @route   POST /api/resources
// @desc    Submit a new resource request
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, organization, requestedDocument, requestDetails } = req.body;

    const newResourceRequest = new ResourceRequest({
      name,
      email,
      phone,
      organization,
      requestedDocument,
      requestDetails
    });

    const savedResourceRequest = await newResourceRequest.save();

    // Send email notifications asynchronously
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      emailService.sendAdminNotification('resource', savedResourceRequest);
      emailService.sendClientConfirmation('resource', savedResourceRequest);
    }

    res.status(201).json({ success: true, data: savedResourceRequest });
  } catch (error) {
    console.error('Error saving resource request:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   GET /api/resources
// @desc    Get all resource requests (admin)
router.get('/', async (req, res) => {
  try {
    const requests = await ResourceRequest.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    console.error('Error fetching resource requests:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
