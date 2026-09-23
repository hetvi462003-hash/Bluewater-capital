import React from 'react';
import { Globe, Landmark, TrendingUp, Sun, Heart, Compass, CheckCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function AboutCayman({ onBookConsultation }) {
  const points = [
    {
      title: "Globally Connected",
      desc: "A leading international financial centre with strong connections to global capital markets.",
      icon: Globe
    },
    {
      title: "Strong Regulatory Framework",
      desc: "A well-established legal and regulatory environment supporting international business and compliance.",
      icon: Landmark
    },
    {
      title: "Business-Friendly Environment",
      desc: "A jurisdiction that continues to attract entrepreneurs, investors, companies, and skilled professionals.",
      icon: TrendingUp
    },
    {
      title: "Exceptional Quality of Life",
      desc: "A safe, vibrant community offering a world-class standard of living in a unique Caribbean setting.",
      icon: Sun
    },
    {
      title: "A Place to Build",
      desc: "Whether establishing a venture, pursuing a career or making Cayman your permanent home, the Islands offer unparalleled opportunities.",
      icon: Heart
    }
  ];

  return (
    <section id="about-cayman" className="section-padding" style={{
      backgroundColor: 'var(--soft-silver)',
      position: 'relative'
    }}>
      <div className="container">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 54px' }}>
            <div className="badge-accent" style={{ marginBottom: '16px' }}>
              About Cayman
            </div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', color: 'var(--deep-navy)', marginBottom: '18px' }}>
              Discover the <span style={{ color: 'var(--executive-blue)' }}>Cayman Islands</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
              The Cayman Islands is a unique community with a rich history, distinctive culture, and internationally respected business environment.
            </p>
          </div>
        </ScrollReveal>

        {/* Content Box */}
        <div style={{
          backgroundColor: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          padding: '48px',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '54px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            <ScrollReveal direction="left">
              <div>
                <h3 style={{ fontSize: '1.85rem', color: 'var(--deep-navy)', marginBottom: '20px' }}>
                  Welcome to the Cayman Islands
                </h3>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.8 }}>
                  The Cayman Islands is a globally recognized financial centre and a thriving international business destination, known for its strong regulatory framework, political and economic stability, and exceptional quality of life.
                </p>
                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '28px', lineHeight: 1.7 }}>
                  As a Cayman-based consultancy, <strong>Blu Consultancy</strong> understands that navigating Cayman is about more than completing forms or meeting deadlines. It requires local knowledge, an understanding of the regulatory environment, and a practical approach to getting things done.
                </p>

                <div style={{
                  backgroundColor: 'var(--deep-navy)',
                  color: 'var(--white)',
                  padding: '24px 28px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <Compass size={32} color="var(--light-blue)" style={{ flexShrink: 0 }} />
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--light-blue)' }}>
                    "Cayman is home. We understand how things work here."
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={150}>
              <div 
                className="animated-card"
                style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <img 
                  src="/images/downstairs - website photo.jpg" 
                  alt="Cayman Business Environment" 
                  style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Why Cayman Grid */}
          <div style={{ marginTop: '54px', borderTop: '1px solid var(--border-light)', paddingTop: '44px' }}>
            <ScrollReveal direction="up">
              <h3 style={{ fontSize: '1.6rem', color: 'var(--deep-navy)', marginBottom: '32px', textAlign: 'center' }}>
                Why Choose the Cayman Islands?
              </h3>
            </ScrollReveal>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px'
            }}>
              {points.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <ScrollReveal key={idx} direction="up" delay={idx * 100}>
                    <div className="animated-card tilt-card" style={{
                      padding: '28px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--light-blue)',
                      border: '1px solid rgba(22,75,122,0.15)',
                      height: '100%'
                    }}>
                      <Icon size={26} color="var(--executive-blue)" style={{ marginBottom: '14px' }} />
                      <h4 style={{ fontSize: '1.15rem', color: 'var(--deep-navy)', marginBottom: '10px' }}>{p.title}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          <ScrollReveal direction="up" delay={200}>
            <div style={{
              marginTop: '44px',
              textAlign: 'center',
              backgroundColor: 'var(--deep-navy)',
              color: 'var(--white)',
              padding: '40px',
              borderRadius: 'var(--radius-md)'
            }}>
              <h4 style={{ fontSize: '1.5rem', color: 'var(--white)', marginBottom: '12px' }}>
                Considering Cayman? Let Blu Help You Navigate the Way Forward.
              </h4>
              <p style={{ fontSize: '1rem', color: 'var(--light-blue)', maxWidth: '720px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                From immigration and corporate services to compliance and business support, our team provides practical, professional solutions designed around your needs.
              </p>
              <button onClick={onBookConsultation} className="btn-primary" style={{ backgroundColor: 'var(--executive-blue)' }}>
                Book a Consultation
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
