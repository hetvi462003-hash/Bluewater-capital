const mongoose = require('mongoose');

const resourceRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  organization: { type: String },
  requestedDocument: { type: String, required: true },
  requestDetails: { type: String },
  status: { type: String, default: 'Pending' }
}, {
  timestamps: true
});

module.exports = mongoose.model('ResourceRequest', resourceRequestSchema);
