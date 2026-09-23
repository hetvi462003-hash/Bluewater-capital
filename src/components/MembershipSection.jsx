import React from 'react';
import { Check, Shield, Star, Crown, Zap } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function MembershipSection({ onJoinMembership }) {
  const tiers = [
    {
      name: 'Essential',
      tagline: 'Ideal for small startups & sole proprietors',
      price: '$99',
      period: '/month',
      icon: Shield,
      featured: false,
      features: [
        'Access to 5 templates per month',
        'Standard Business Library access',
        'Email document support',
        '10% discount on advisory add-ons'
      ]
    },
    {
      name: 'Professional',
      tagline: 'Best for growing business teams & firms',
      price: '$199',
      period: '/month',
      icon: Star,
      featured: true,
      features: [
        'Unlimited template library downloads',
        'Full HR & Compliance template suite',
        'Monthly compliance updates & checklists',
        '20% discount on custom document drafting',
        'Priority email & phone support'
      ]
    },
    {
      name: 'Executive',
      tagline: 'For established enterprises & financial entities',
      price: '$399',
      period: '/month',
      icon: Crown,
      featured: false,
      features: [
        'Complete Business Library unlimited access',
        'Tailored policy customization support',
        'Dedicated compliance advisory desk',
        'Quarterly AML & regulatory review calls',
        'Free attendance to selected training webinars'
      ]
    }
  ];

  return (
    <section id="membership" className="section-padding" style={{
      backgroundColor: 'var(--soft-silver)',
      position: 'relative',
      borderTop: '1px solid var(--border-silver)',
      borderBottom: '1px solid var(--border-silver)'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 54px' }}>
            <div className="badge-accent" style={{ marginBottom: '16px' }}>
              Blue Membership Plans
            </div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', color: 'var(--deep-navy)', marginBottom: '18px' }}>
              Your Business Documentation, <span style={{ color: 'var(--executive-blue)' }}>Simplified</span>
            </h2>
            <p style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--deep-navy)' }}>
              Why purchase one document when you can have ongoing access to the documents your business needs?
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '36px',
          alignItems: 'stretch'
        }}>
          {tiers.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <ScrollReveal key={tier.name} direction="up" delay={idx * 150}>
                <div 
                  className="animated-card"
                  style={{
                    backgroundColor: 'var(--white)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '44px 36px',
                    border: tier.featured ? '2px solid var(--executive-blue)' : '1px solid var(--border-light)',
                    boxShadow: tier.featured ? '0 20px 50px rgba(22, 75, 122, 0.22)' : 'var(--shadow-sm)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transform: tier.featured ? 'scale(1.03)' : 'none',
                    zIndex: tier.featured ? 2 : 1,
                    height: '100%'
                  }}
                >
                  {tier.featured && (
                    <div style={{
                      position: 'absolute',
                      top: '-14px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'var(--executive-blue)',
                      color: 'var(--white)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '5px 20px',
                      borderRadius: '20px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase'
                    }}>
                      MOST POPULAR
                    </div>
                  )}

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--light-blue)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon size={24} color="var(--executive-blue)" />
                      </div>
                      <h3 style={{ fontSize: '1.6rem', color: 'var(--deep-navy)' }}>{tier.name}</h3>
                    </div>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '28px', lineHeight: 1.6 }}>
                      {tier.tagline}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '28px' }}>
                      <span style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--deep-navy)', fontFamily: "'Outfit', sans-serif" }}>{tier.price}</span>
                      <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{tier.period}</span>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '24px', marginBottom: '36px' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--deep-navy)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Included Benefits:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {tier.features.map((feat, fIdx) => (
                          <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                            <Check size={18} color="var(--executive-blue)" style={{ flexShrink: 0 }} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => onJoinMembership(tier.name)}
                    className={tier.featured ? "btn-primary" : "btn-secondary"}
                    style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                  >
                    <Zap size={18} />
                    <span>JOIN BLUE MEMBERSHIP</span>
                  </button>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
