import React, { useState } from 'react';
import { X, Calendar, Send, CheckCircle2 } from 'lucide-react';

export default function ConsultationModal({ isOpen, onClose, initialService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: initialService || 'Immigration & Residency',
    preferredTime: 'Morning (10am - 12pm)',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        service: initialService || 'Immigration & Residency'
      }));
    }
  }, [isOpen, initialService]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/consultations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Failed to submit consultation request');
      
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '560px',
          padding: '36px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <button 
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          <X size={24} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <Calendar size={24} color="var(--executive-blue)" />
              <h3 style={{ fontSize: '1.4rem', color: 'var(--deep-navy)' }}>Book a Consultation</h3>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Speak directly with our Blue Water Capital consultants.
            </p>

            <div>
              <label style={labelStyle}>Full Name *</label>
              <input 
                type="text" 
                required 
                placeholder="John Doe" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input 
                  type="email" 
                  required 
                  placeholder="john@example.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Phone Number *</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="e.g. 345-925-4722" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Service Required *</label>
              <select 
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                style={inputStyle}
              >
                <option value="Immigration & Residency">Immigration & Residency Support</option>
                <option value="Caymanian History & Culture Training">Caymanian History & Culture Training</option>
                <option value="AML & Compliance Services">AML & Compliance Services</option>
                <option value="Corporate & Business Services">Corporate & Business Services</option>
                <option value="Training & Professional Development">Training & Professional Development</option>
                <option value="Blue Business Library Resources">Blue Business Library Resource Enquiry</option>
                <option value="General Consultation">General Consultation</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Brief Details *</label>
              <textarea 
                rows={3} 
                required 
                placeholder="Tell us what you need help with..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            {error && <div style={{ color: 'red', fontSize: '0.85rem', marginTop: '4px' }}>{error}</div>}
            
            <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '12px', justifyContent: 'center', marginTop: '8px', opacity: loading ? 0.7 : 1 }}>
              <Send size={16} />
              <span>{loading ? 'Submitting...' : 'Confirm & Book Consultation'}</span>
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle2 size={48} color="var(--executive-blue)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.4rem', color: 'var(--deep-navy)', marginBottom: '8px' }}>Booking Submitted!</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Thank you, {formData.name}. We have logged your consultation request for {formData.service}. Our team will contact you shortly.
            </p>
            <button onClick={handleClose} className="btn-primary" style={{ padding: '10px 24px' }}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 700,
  color: 'var(--deep-navy)',
  marginBottom: '4px'
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-light)',
  fontFamily: "'Inter', sans-serif",
  fontSize: '0.9rem',
  outline: 'none'
};
