import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, ArrowUp, ChevronRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      backgroundColor: 'var(--deep-navy)',
      color: 'var(--white)',
      paddingTop: '60px',
      paddingBottom: '30px',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid rgba(220, 234, 245, 0.15)'
    }}>
      {/* Top Animated Gradient Accent Bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, transparent 0%, var(--executive-blue) 30%, var(--light-blue) 50%, var(--executive-blue) 70%, transparent 100%)',
        boxShadow: '0 0 15px rgba(220, 234, 245, 0.5)'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px' }}>
        <ScrollReveal direction="up">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px',
            marginBottom: '36px'
          }}>
            {/* Col 1: Brand Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  <img 
                    src="/images/bw1.png" 
                    alt="Blue Water Capital" 
                    style={{ height: '34px', width: 'auto', objectFit: 'contain' }}
                  />
                </div>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.6, marginBottom: '16px' }}>
                Practical professional solutions for individuals, entrepreneurs and businesses navigating the Cayman Islands.
              </p>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(22, 75, 122, 0.35)',
                border: '1px solid rgba(220, 234, 245, 0.2)',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.775rem',
                color: 'var(--light-blue)',
                fontWeight: 600
              }}>
                <ShieldCheck size={14} color="var(--light-blue)" />
                <span>Blu Consultancy • Grand Cayman</span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 style={{
                color: 'var(--white)',
                fontSize: '1rem',
                marginBottom: '16px',
                position: 'relative',
                display: 'inline-block'
              }}>
                Quick Navigation
                <span style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: 0,
                  width: '30px',
                  height: '2px',
                  backgroundColor: 'var(--light-blue)',
                  borderRadius: '2px'
                }} />
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { name: 'Home', key: 'home' },
                  { name: 'About Blue Water', key: 'about' },
                  { name: 'Services Overview', key: 'services' },
                  { name: 'Blue Business Library', key: 'library' },
                  { name: 'Blue Membership', key: 'membership' },
                  { name: 'Resources & FAQs', key: 'resources' },
                  { name: 'About Cayman', key: 'about-cayman' },
                  { name: 'Why Choose Blue', key: 'why-choose-blue' }
                ].map((item, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => onNavigate(item.key)} 
                    className="footer-nav-link"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255, 255, 255, 0.75)',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.85rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '2px 0',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <ChevronRight size={12} color="var(--light-blue)" style={{ opacity: 0.7 }} />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Col 3: Services */}
            <div>
              <h4 style={{
                color: 'var(--white)',
                fontSize: '1rem',
                marginBottom: '16px',
                position: 'relative',
                display: 'inline-block'
              }}>
                Our Practice Areas
                <span style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: 0,
                  width: '30px',
                  height: '2px',
                  backgroundColor: 'var(--light-blue)',
                  borderRadius: '2px'
                }} />
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.825rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                {[
                  'Immigration & Residency Support',
                  'Caymanian History & Culture Integration',
                  'AML & Compliance Risk Management',
                  'Corporate & Business Services',
                  'Training & Professional Development',
                  'Custom Document & SOP Drafting'
                ].map((service, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--light-blue)',
                      boxShadow: '0 0 6px var(--light-blue)'
                    }} />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 4: Contact Details */}
            <div>
              <h4 style={{
                color: 'var(--white)',
                fontSize: '1rem',
                marginBottom: '16px',
                position: 'relative',
                display: 'inline-block'
              }}>
                Cayman HQ Office
                <span style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: 0,
                  width: '30px',
                  height: '2px',
                  backgroundColor: 'var(--light-blue)',
                  borderRadius: '2px'
                }} />
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.825rem' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(220, 234, 245, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MapPin size={15} color="var(--light-blue)" />
                  </div>
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.4 }}>
                    80 Shedden Road, Elizabethan Square, Eden House, 4th Floor, Suite 4, George Town, Grand Cayman
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(220, 234, 245, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Phone size={15} color="var(--light-blue)" />
                  </div>
                  <a href="tel:925-4722" style={{ color: 'var(--white)', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>
                    925-4722
                  </a>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(220, 234, 245, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Mail size={15} color="var(--light-blue)" />
                  </div>
                  <a href="mailto:BluConsultancy@outlook.com" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none' }}>
                    BluConsultancy@outlook.com
                  </a>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(220, 234, 245, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Clock size={15} color="var(--light-blue)" />
                  </div>
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Mon – Fri: 10:00 AM – 3:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Disclaimer & Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          alignItems: 'center',
          textAlign: 'center',
          fontSize: '0.775rem',
          color: 'rgba(255, 255, 255, 0.6)'
        }}>
          <p style={{ maxWidth: '850px', lineHeight: 1.5 }}>
            Legal Disclaimer: Blu Consultancy / Blue Water Capital templates and website resources are provided as general business resources. They do not constitute legal or formal regulatory advice.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            borderTop: '1px dashed rgba(255, 255, 255, 0.08)',
            paddingTop: '14px'
          }}>
            <div>
              © {new Date().getFullYear()} Blue Water Capital (Blu Consultancy). All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}



