import React from 'react';
import { Compass, Briefcase, Lightbulb, Users, CheckCircle, ShieldCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function WhyChooseBlue({ onBookConsultation }) {
  const differentiators = [
    {
      title: "Cayman-Focused Expertise",
      desc: "We understand the local regulatory and business environment and the realities of navigating Cayman-based processes.",
      icon: Compass
    },
    {
      title: "Professional Experience",
      desc: "Our approach is informed by extensive experience across compliance, risk management, financial services, immigration and business operations.",
      icon: Briefcase
    },
    {
      title: "Practical Guidance",
      desc: "We explain complex requirements in straightforward language so you understand what needs to be done and why.",
      icon: Lightbulb
    },
    {
      title: "Personalised Service",
      desc: "Every client and business is different. We take the time to understand your circumstances and tailor our support accordingly.",
      icon: Users
    },
    {
      title: "End-to-End Support",
      desc: "Where possible, we help you move from understanding the requirement to preparing, submitting and managing the process.",
      icon: CheckCircle
    },
    {
      title: "Integrity Matters",
      desc: "We believe professional advice should be clear, transparent and grounded in what is actually required—not promises that cannot be guaranteed.",
      icon: ShieldCheck
    }
  ];

  return (
    <section id="why-choose-blue" style={{
      padding: '110px 0',
      background: 'linear-gradient(135deg, #F0F6FB 0%, var(--light-blue) 100%)',
      position: 'relative',
      borderTop: '1px solid rgba(22, 75, 122, 0.15)',
      borderBottom: '1px solid rgba(22, 75, 122, 0.15)'
    }}>
      <div className="container">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px' }}>
            <div className="badge-accent" style={{ marginBottom: '14px' }}>
              Our Differentiators
            </div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', color: 'var(--deep-navy)', marginBottom: '16px' }}>
              Why Choose <span style={{ color: 'var(--executive-blue)' }}>Blue Water Capital?</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
              We bring clarity, professionalism, and local Cayman insight to every client engagement.
            </p>
          </div>
        </ScrollReveal>

        {/* 6 Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          marginBottom: '60px'
        }}>
          {differentiators.map((d, idx) => {
            const Icon = d.icon;
            return (
              <ScrollReveal key={idx} direction="up" delay={idx * 100}>
                <div 
                  className="animated-card"
                  style={{
                    backgroundColor: 'var(--white)',
                    borderRadius: 'var(--radius-md)',
                    padding: '32px',
                    border: '1px solid var(--border-light)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    backgroundColor: 'var(--light-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    <Icon size={26} color="var(--executive-blue)" />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--deep-navy)', marginBottom: '10px' }}>
                    {d.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {d.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Team Photo Banner */}
        <ScrollReveal direction="up" delay={200}>
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <img 
              src="/images/Team building - website photo.jpg" 
              alt="Blue Water Capital Team Building" 
              style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, rgba(11, 31, 58, 0.9) 0%, rgba(11, 31, 58, 0.5) 100%)',
              display: 'flex',
              alignItems: 'center',
              padding: '40px'
            }}>
              <div style={{ maxWidth: '600px', color: 'var(--white)' }}>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--white)', marginBottom: '12px' }}>
                  Your Goals. Our Expertise. A Clearer Path Forward.
                </h3>
                <p style={{ fontSize: '1.2rem', color: 'var(--light-blue)', marginBottom: '24px' }}>
                  Tell us what you’re trying to accomplish. We’ll help you identify the requirements, understand the process and determine the best way forward.
                </p>
                <button onClick={onBookConsultation} className="btn-primary">
                  Get Started Today →
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
