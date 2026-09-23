import React from 'react';
import { Target, Compass, Sparkles, Check } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function AboutSection({ onBookConsultation }) {
  return (
    <section id="about" style={{
      padding: '100px 0',
      backgroundColor: 'var(--white)',
      position: 'relative'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left Column: Office & Team Photos */}
          <ScrollReveal direction="left">
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '4px solid var(--white)'
              }} className="animated-card">
                <img 
                  src="/images/office picture -  website photo.jpg" 
                  alt="Blue Water Capital Offices" 
                  style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Overlapping Secondary Card */}
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                right: '-20px',
                backgroundColor: 'var(--deep-navy)',
                color: 'var(--white)',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                maxWidth: '280px',
                boxShadow: '0 15px 35px rgba(11, 31, 58, 0.25)',
                border: '1px solid rgba(22, 75, 122, 0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Sparkles size={20} color="var(--light-blue)" />
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Practical Solutions</div>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--light-blue)', lineHeight: 1.5 }}>
                  Clear advice grounded in real-world Cayman regulatory requirements.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Text & Philosophy */}
          <ScrollReveal direction="right" delay={150}>
            <div>
              <div className="badge-accent" style={{ marginBottom: '16px' }}>
                About Blue Water Capital
              </div>

              <h2 style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                color: 'var(--deep-navy)',
                marginBottom: '20px',
                lineHeight: 1.2
              }}>
                Expertise You Can Rely On. <br />
                <span style={{ color: 'var(--executive-blue)' }}>Solutions You Can Understand.</span>
              </h2>

              <p style={{
                fontSize: '1.05rem',
                color: 'var(--text-muted)',
                marginBottom: '16px',
                lineHeight: 1.7
              }}>
                Navigating Cayman’s regulatory, immigration and business environment can be complex. <strong>Blue Water Capital (Blu Consultancy)</strong> was created to make that journey simpler. We provide professional consulting services to individuals, entrepreneurs, companies and organisations seeking to establish, operate, grow or remain compliant in the Cayman Islands.
              </p>

              <p style={{
                fontSize: '1rem',
                color: 'var(--text-muted)',
                marginBottom: '28px',
                lineHeight: 1.7
              }}>
                Our approach is straightforward: understand your situation, identify the requirements, explain your options and help you move forward with confidence. Whether you are applying for Caymanian status, establishing a business, strengthening your AML framework or preparing for a regulatory requirement, Blu Consultancy provides practical support from start to finish.
              </p>

              {/* Core Highlight Quote */}
              <div style={{
                backgroundColor: 'var(--light-blue)',
                borderLeft: '4px solid var(--executive-blue)',
                padding: '20px 24px',
                borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                marginBottom: '32px'
              }}>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--deep-navy)',
                  fontStyle: 'italic',
                  lineHeight: 1.4
                }}>
                  "We don’t just process applications. We help our clients understand the process."
                </p>
              </div>


            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
