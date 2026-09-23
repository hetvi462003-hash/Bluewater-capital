import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Calendar, CheckCircle2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function ContactConsultation({ selectedService = '', onSuccessSubmitted }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: selectedService || 'Immigration & Residency',
    details: '',
    preferredTime: 'Morning (10am - 12pm)'
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      if (onSuccessSubmitted) onSuccessSubmitted(formData);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding" style={{
      background: 'linear-gradient(135deg, rgba(5, 18, 35, 0.75) 0%, rgba(11, 31, 58, 0.65) 100%), url("/images/waiting.jpg") no-repeat center center / cover',
      position: 'relative',
      color: 'var(--white)'
    }}>
      <div className="container">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 54px' }}>
            <div className="badge-accent" style={{ marginBottom: '16px', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--light-blue)' }}>
              Contact & Consultations
            </div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', color: 'var(--white)', marginBottom: '18px' }}>
              Let’s Talk. <span style={{ color: 'var(--light-blue)' }}>Tell Us What You Need Help With.</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)' }}>
              Professional Guidance Starts With a Conversation. Whether starting a business, reviewing compliance, or navigating immigration, we are here to guide you.
            </p>
          </div>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '44px',
          alignItems: 'start'
        }}>
          {/* Left Column: Contact Cards */}
          <ScrollReveal direction="left" delay={150}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div 
                className="animated-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.03))',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'var(--white)',
                  padding: '44px 36px',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 24px 40px rgba(0,0,0,0.2)'
                }}
              >
                <h3 style={{ color: 'var(--white)', fontSize: '1.5rem', marginBottom: '28px', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '14px' }}>
                  Contact Information
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <MapPin size={24} color="var(--light-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--light-blue)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Our Address</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: '2px' }}>80 Shedden Road, Elizabethan Square</div>
                      <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)' }}>Eden House, 4th Floor, Suite 4</div>
                      <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)' }}>George Town, Grand Cayman</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <Phone size={24} color="var(--light-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--light-blue)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Business Phone</div>
                      <a href="tel:925-4722" style={{ color: 'var(--white)', fontSize: '1.2rem', fontWeight: 700, textDecoration: 'none' }}>925-4722</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <Mail size={24} color="var(--light-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--light-blue)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Email Enquiry</div>
                      <a href="mailto:BluConsultancy@outlook.com" style={{ color: 'var(--white)', fontSize: '1rem', textDecoration: 'none', fontWeight: 600 }}>BluConsultancy@outlook.com</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <Clock size={24} color="var(--light-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--light-blue)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Hours of Operation</div>
                      <div style={{ fontSize: '1rem', fontWeight: 600 }}>Monday – Friday: 10:00 AM – 3:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation Promise Card */}
              <div 
                className="animated-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(57, 142, 203, 0.25), rgba(57, 142, 203, 0.08))',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  padding: '28px 32px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(57, 142, 203, 0.35)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                }}
              >
                <h4 style={{ fontSize: '1.1rem', color: 'var(--light-blue)', marginBottom: '10px', fontWeight: 700 }}>
                  📋 Book a Direct Consultation
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>
                  A consultation gives us the opportunity to understand your circumstances, answer your questions and determine whether our services are right for you.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Interactive Consultation Form */}
          <ScrollReveal direction="right" delay={250}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05))',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '48px 40px',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 24px 50px rgba(0,0,0,0.2)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              {!submitted ? (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <h3 style={{ fontSize: '1.6rem', color: 'var(--white)', marginBottom: '4px' }}>
                    Schedule Your Consultation
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', marginBottom: '12px' }}>
                    Complete the form below and tell us a little about what you're trying to accomplish.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
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
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
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
                    <div>
                      <label style={labelStyle}>Company / Business Name</label>
                      <input 
                        type="text" 
                        placeholder="Optional"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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
                      <option value="Caymanian History & Culture Training">Caymanian History & Culture Training (PR Prep)</option>
                      <option value="AML & Compliance Services">AML & Compliance Services</option>
                      <option value="Corporate & Business Services">Corporate & Business Services</option>
                      <option value="Training & Professional Development">Training & Professional Development</option>
                      <option value="Blue Business Library Templates">Blue Business Library Resource Enquiry</option>
                      <option value="General Consultation">General Consultation / Unsure</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Preferred Consultation Time</label>
                    <select 
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      style={inputStyle}
                    >
                      <option value="Morning (10am - 12pm)">Morning (10:00 AM – 12:00 PM)</option>
                      <option value="Afternoon (12pm - 3pm)">Afternoon (12:00 PM – 3:00 PM)</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Tell us about your goals / Enquiry details *</label>
                    <textarea 
                      rows={4}
                      required
                      placeholder="Briefly describe what you are trying to accomplish (e.g. applying for Permanent Residency, registering a business, AML officer services)..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>

                  {error && <div style={{ color: 'red', fontSize: '0.85rem', marginTop: '4px' }}>{error}</div>}
                  
                  <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '16px', justifyContent: 'center', fontSize: '1rem', opacity: loading ? 0.7 : 1 }}>
                    <Send size={18} />
                    <span>{loading ? 'Submitting Request...' : 'Submit Consultation Request'}</span>
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '50px 30px' }}>
                  <div style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--light-blue), var(--executive-blue))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 8px 24px rgba(57,142,203,0.4)'
                  }}>
                    <CheckCircle2 size={38} color="white" />
                  </div>
                  <h3 style={{ fontSize: '1.7rem', color: 'var(--white)', marginBottom: '14px', fontWeight: 700 }}>
                    Request Received!
                  </h3>
                  <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '32px', lineHeight: 1.7 }}>
                    Thank you, <strong style={{ color: 'var(--light-blue)' }}>{formData.name}</strong>. Our team has received your enquiry regarding <strong style={{ color: 'var(--light-blue)' }}>{formData.service}</strong>. We will contact you shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    style={{ 
                      background: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: 'white',
                      padding: '12px 28px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.82rem',
  fontWeight: 700,
  color: 'rgba(255, 255, 255, 0.9)',
  marginBottom: '7px',
  letterSpacing: '0.04em',
  textTransform: 'uppercase'
};

const inputStyle = {
  width: '100%',
  padding: '13px 16px',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  fontFamily: "'Inter', sans-serif",
  fontSize: '0.95rem',
  color: 'var(--white)',
  outline: 'none',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(8px)',
  transition: 'border-color 0.2s, background-color 0.2s',
  boxSizing: 'border-box'
};
