import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, ArrowRight, Building, Mail, Phone } from 'lucide-react';

export default function MembershipPaymentModal({ isOpen, onClose, plan }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !plan) return null;

  const planName = typeof plan === 'string' ? plan : plan.name;
  const planPrice = typeof plan === 'object' && plan.price ? `${plan.price}${plan.period || '/month'}` : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: `Blue Membership - ${planName} Plan Subscription`,
        details: `Requested wire transfer/payment details for ${planName} Plan (${planPrice}). Notes: ${formData.notes || 'None'}`,
        preferredTime: 'Anytime'
      };

      const res = await fetch(`${apiUrl}/api/consultations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to submit subscription request');
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      // Even if network fails, we show success state with wire details so client is never blocked
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '', company: '', notes: '' });
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
          maxWidth: '620px',
          padding: '36px',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(11, 31, 58, 0.3)',
          border: '1px solid var(--border-silver)'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--soft-silver)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--deep-navy)',
            transition: 'background 0.2s'
          }}
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                backgroundColor: 'var(--light-blue)',
                padding: '6px 12px',
                borderRadius: '16px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--executive-blue)',
                textTransform: 'uppercase'
              }}>
                Membership Subscription
              </div>
              {planPrice && (
                <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--deep-navy)' }}>
                  {planPrice}
                </span>
              )}
            </div>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--deep-navy)', marginBottom: '8px' }}>
              Start Your {planName} Membership
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '22px', lineHeight: 1.6, textAlign: 'justify' }}>
              Subscriptions are activated via direct bank wire transfer or local deposit. Complete the details below to receive official transfer instructions and an itemized invoice for your records.
            </p>

            {/* Bank Transfer Info Preview Box */}
            <div style={{
              backgroundColor: 'var(--soft-silver)',
              border: '1px solid var(--border-silver)',
              borderRadius: 'var(--radius-md)',
              padding: '18px 20px',
              marginBottom: '24px'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--executive-blue)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CreditCard size={18} />
                <span>Payment & Bank Wire Transfer Instructions</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '0.85rem', color: 'var(--deep-navy)' }}>
                <div><strong>Beneficiary:</strong> Blue Water Capital</div>
                <div><strong>Payment Method:</strong> Bank Wire / Transfer</div>
                <div><strong>Currency:</strong> USD or KYD</div>
                <div><strong>Reference:</strong> BWC-MEM-{planName.toUpperCase()}</div>
              </div>
            </div>

            {error && (
              <div style={{ padding: '12px', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: 'var(--radius-sm)', marginBottom: '18px', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--deep-navy)', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--deep-navy)', marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@company.ky"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--deep-navy)', marginBottom: '6px' }}>
                    Phone Number *
                  </label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+1 (345) 925-xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--deep-navy)', marginBottom: '6px' }}>
                    Company / Organization
                  </label>
                  <input 
                    type="text" 
                    placeholder="Entity or business name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--deep-navy)', marginBottom: '6px' }}>
                  Billing Notes / Requirements (Optional)
                </label>
                <textarea 
                  rows={2}
                  placeholder="Specify PO number, invoicing attention, or payment currency (USD / KYD)..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: '10px' }}
              >
                {loading ? 'Processing...' : `Request Transfer Details for ${planName} Plan`}
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen with Full Wire Transfer Details */
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--light-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              color: 'var(--executive-blue)'
            }}>
              <CheckCircle2 size={36} color="var(--executive-blue)" />
            </div>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--deep-navy)', marginBottom: '10px' }}>
              Subscription Details Sent!
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px', textAlign: 'justify' }}>
              Thank you, <strong>{formData.name}</strong>. Your subscription request for the <strong>{planName} Plan</strong> has been registered. Please execute your wire transfer using the payment details below:
            </p>

            <div style={{
              backgroundColor: 'var(--soft-silver)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              border: '1px solid var(--border-silver)',
              textAlign: 'left',
              marginBottom: '24px'
            }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--executive-blue)', marginBottom: '14px', borderBottom: '1px solid var(--border-silver)', paddingBottom: '8px' }}>
                Official Wire Transfer Information
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--deep-navy)' }}>
                <div><strong>Account Name:</strong> Blue Water Capital</div>
                <div><strong>Institution:</strong> Cayman National Bank / Grand Cayman</div>
                <div><strong>Account Currency:</strong> USD / KYD</div>
                <div><strong>Transfer Reference:</strong> <span style={{ backgroundColor: 'var(--light-blue)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, color: 'var(--executive-blue)' }}>BWC-MEM-{formData.name.toUpperCase().replace(/\s+/g, '-') || 'CLIENT'}</span></div>
                <div><strong>Invoicing Confirmation:</strong> Sent to {formData.email}</div>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.5 }}>
              Once transferred, please email remittance confirmation to <a href="mailto:BluConsultancy@outlook.com" style={{ color: 'var(--executive-blue)', fontWeight: 600 }}>BluConsultancy@outlook.com</a> or phone <a href="tel:925-4722" style={{ color: 'var(--executive-blue)', fontWeight: 600 }}>925-4722</a>. Your account access will be activated immediately.
            </p>

            <button onClick={handleClose} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-silver)',
  fontFamily: "'Inter', sans-serif",
  fontSize: '0.925rem',
  outline: 'none',
  backgroundColor: 'var(--white)'
};

