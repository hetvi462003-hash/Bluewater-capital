const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String },
  service: { type: String, required: true },
  preferredDate: { type: String },
  preferredTime: { type: String },
  details: { type: String, required: true },
  status: { type: String, default: 'Pending' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Consultation', consultationSchema);
