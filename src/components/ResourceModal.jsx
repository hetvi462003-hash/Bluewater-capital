import React, { useState } from 'react';
import { X, FileText, ShoppingBag, CheckCircle2, Tag } from 'lucide-react';

export default function ResourceModal({ isOpen, onClose, resource }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    comments: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !resource) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.company, // mapped to organization in backend
        requestedDocument: resource.title,
        requestDetails: formData.comments // mapped to requestDetails in backend
      };

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error('Failed to submit resource request');
      
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'var(--light-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FileText size={22} color="var(--executive-blue)" />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--executive-blue)', textTransform: 'uppercase' }}>
                  {resource.category}
                </span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--deep-navy)' }}>{resource.title}</h3>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--soft-silver)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Applicable Price</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--deep-navy)' }}>{resource.price}</div>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--executive-blue)', fontWeight: 600 }}>
                Request-based Checkout
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Complete your information below to submit a document request for <strong>{resource.title}</strong>. Blue Water Capital will issue your invoice and template package upon processing.
            </p>

            <div>
              <label style={labelStyle}>Full Name *</label>
              <input 
                type="text" 
                required 
                placeholder="Jane Smith"
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
                  placeholder="jane@company.ky"
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
                  placeholder="345-925-4722"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Business / Company Name</label>
              <input 
                type="text" 
                placeholder="Company Name Ltd."
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Additional Comments / Instructions</label>
              <textarea 
                rows={2}
                placeholder="Any specific customization required..."
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            {error && <div style={{ color: 'red', fontSize: '0.85rem', marginTop: '4px' }}>{error}</div>}

            <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '12px', justifyContent: 'center', marginTop: '8px', opacity: loading ? 0.7 : 1 }}>
              <ShoppingBag size={16} />
              <span>{loading ? 'Submitting Order...' : 'Submit Document Order Request'}</span>
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle2 size={48} color="var(--executive-blue)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.4rem', color: 'var(--deep-navy)', marginBottom: '8px' }}>Order Request Received!</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Thank you, {formData.name}. We have received your purchase request for <strong>{resource.title} ({resource.price})</strong>. Our team will send your document package and invoice details via email shortly.
            </p>
            <button onClick={handleClose} className="btn-primary" style={{ padding: '10px 24px' }}>
              Back to Library
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
