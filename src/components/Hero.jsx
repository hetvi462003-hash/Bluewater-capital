import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Award, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Hero({ onExploreServices, onBookConsultation }) {
  return (
    <section style={{
      position: 'relative',
      minHeight: '82vh',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F4F8FC 40%, #DCEAF5 100%)',
      color: 'var(--text-dark)',
      padding: '80px 0',
      overflow: 'hidden',
      borderBottom: '1px solid var(--border-silver)'
    }}>
      {/* Subtle Background Glow */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '700px',
        height: '700px',
        background: 'radial-gradient(circle, rgba(220, 234, 245, 0.6) 0%, rgba(255, 255, 255, 0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      {/* Cayman Animated Ocean Wave Vector Background */}
      <div className="animate-wave-motion" style={{
        position: 'absolute',
        bottom: 0,
        left: '-10%',
        width: '120%',
        height: '200px',
        opacity: 0.75,
        pointerEvents: 'none',
        zIndex: 1
      }}>
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <path fill="rgba(22, 75, 122, 0.18)" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,150,768,203,864,218.7C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path fill="rgba(220, 234, 245, 0.45)" d="M0,192L60,202.7C120,213,240,235,360,229.3C480,224,600,192,720,181.3C840,171,960,181,1080,197.3C1200,213,1320,235,1380,245.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
          gap: '54px',
          alignItems: 'center'
        }}>
          {/* Hero Left Content */}
          <ScrollReveal direction="left">
            <div>
              <div className="badge-accent" style={{
                marginBottom: '20px',
                backgroundColor: 'var(--light-blue)',
                color: 'var(--executive-blue)',
                border: '1px solid rgba(22, 75, 122, 0.25)',
                fontWeight: 700
              }}>
                <ShieldCheck size={16} color="var(--executive-blue)" />
                <span>Cayman Islands Advisory & Consultancy</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
                color: 'var(--deep-navy)',
                letterSpacing: '-0.02em',
                marginBottom: '18px',
                fontWeight: 800,
                lineHeight: 1.15
              }}>
                Navigate Cayman <br />
                <span style={{
                  background: 'linear-gradient(90deg, #164B7A 0%, #0B1F3A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  With Confidence
                </span>
              </h1>

              <div style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--executive-blue)',
                marginBottom: '20px',
                letterSpacing: '0.02em'
              }}>
                Immigration. Compliance. Business. Training.
              </div>

              <p style={{
                fontSize: '1.05rem',
                color: 'var(--text-muted)',
                marginBottom: '16px',
                maxWidth: '620px',
                lineHeight: 1.75
              }}>
                At <strong style={{ color: 'var(--deep-navy)' }}>Blue Water Capital</strong>, we provide practical professional solutions for individuals, entrepreneurs and businesses navigating the Cayman Islands. We simplify the processes when establishing, operating and building your future in Cayman.
              </p>

              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-light)',
                marginBottom: '28px',
                maxWidth: '600px',
                lineHeight: 1.7
              }}>
                From immigration and permanent residence support to AML compliance, business formation, licensing, corporate services, professional training, and essential business documentation.
              </p>

              <div style={{
                fontStyle: 'italic',
                fontWeight: 600,
                color: 'var(--executive-blue)',
                marginBottom: '36px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{ height: '2px', width: '28px', backgroundColor: 'var(--executive-blue)', display: 'inline-block' }}></span>
                Professional Guidance. Practical Solutions. Cayman Expertise.
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button 
                  onClick={onExploreServices}
                  className="btn-primary"
                  style={{ padding: '16px 36px', fontSize: '1rem', boxShadow: '0 8px 25px rgba(22, 75, 122, 0.25)' }}
                >
                  <span>Explore Our Services</span>
                  <ArrowRight size={18} className="animate-bounce-x" />
                </button>

              </div>
            </div>
          </ScrollReveal>

          {/* Hero Right Visual Card */}
          <ScrollReveal direction="right" delay={200}>
            <div className="animate-float-slow animated-card" style={{
              backgroundColor: 'var(--white)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px',
              border: '1px solid var(--border-silver)',
              boxShadow: '0 24px 60px rgba(11, 31, 58, 0.12)',
              position: 'relative'
            }}>
              <div style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                marginBottom: '24px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                position: 'relative'
              }}>
                <img 
                  src="/images/Group - website photo.jpg" 
                  alt="Blue Water Capital Team" 
                  style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }}
                />
                
                {/* Floating Star Rating Badge Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(11, 31, 58, 0.88)',
                  color: 'var(--white)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  padding: '6px 14px',
                  borderRadius: '24px',
                  border: '1px solid rgba(220, 234, 245, 0.4)',
                  fontSize: '0.775rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
                  zIndex: 10
                }}>
                  <Sparkles size={13} color="#F59E0B" />
                  <span>Premier Advisory Service</span>
                </div>
              </div>

              <h3 style={{ color: 'var(--deep-navy)', fontSize: '1.3rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={22} color="var(--executive-blue)" />
                <span>Why Leading Clients Choose Us</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.925rem', color: 'var(--text-dark)' }}>
                  <CheckCircle2 size={18} color="#164B7A" />
                  <span>Cayman-focused local regulatory expertise</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.925rem', color: 'var(--text-dark)' }}>
                  <CheckCircle2 size={18} color="#164B7A" />
                  <span>End-to-end support for business & residency</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.925rem', color: 'var(--text-dark)' }}>
                  <CheckCircle2 size={18} color="#164B7A" />
                  <span>Full AML Officers & Compliance Frameworks</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.925rem', color: 'var(--text-dark)' }}>
                  <CheckCircle2 size={18} color="#164B7A" />
                  <span>Turnkey Blue Business Library Templates</span>
                </div>
              </div>

              <div style={{
                marginTop: '24px',
                paddingTop: '20px',
                borderTop: '1px solid var(--soft-silver)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--deep-navy)' }}>100%</div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Confidentiality</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--deep-navy)' }}>Grand Cayman</div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Elizabethan Square HQ</div>
                </div>
                <Award size={32} color="var(--executive-blue)" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
