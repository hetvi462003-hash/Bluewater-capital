import React, { useState } from 'react';
import { Shield, BookOpen, Building, Award, GraduationCap, ArrowRight, CheckCircle2, FileText, Check } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function ServicesSection({ onBookConsultation }) {
  const [activeTab, setActiveTab] = useState('immigration');

  return (
    <section id="services" style={{
      padding: '100px 0',
      backgroundColor: 'var(--soft-silver)',
      position: 'relative',
      borderTop: '1px solid var(--border-silver)',
      borderBottom: '1px solid var(--border-silver)'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px' }}>
            <div className="badge-accent" style={{ marginBottom: '16px' }}>
              Our Solutions & Practice Areas
            </div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', color: 'var(--deep-navy)', marginBottom: '16px' }}>
              Solutions Designed <span style={{ color: 'var(--executive-blue)' }}>Around Your Needs</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
              Comprehensive advisory, compliance, corporate, and training services tailored for individuals and organisations in the Cayman Islands.
            </p>
          </div>
        </ScrollReveal>

        {/* Tab Buttons */}
        <ScrollReveal direction="up" delay={150}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '40px'
          }}>
            {[
              { id: 'immigration', label: 'Immigration & Residency', icon: Shield },
              { id: 'history-culture', label: 'Caymanian History & Culture', icon: GraduationCap },
              { id: 'aml-compliance', label: 'AML & Compliance', icon: Award },
              { id: 'corporate-business', label: 'Corporate & Business', icon: Building },
              { id: 'training', label: 'Professional Training', icon: BookOpen },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 22px',
                    borderRadius: 'var(--radius-md)',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    border: isActive ? '2px solid var(--executive-blue)' : '1px solid var(--border-light)',
                    backgroundColor: isActive ? 'var(--deep-navy)' : 'var(--white)',
                    color: isActive ? 'var(--white)' : 'var(--deep-navy)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: isActive ? 'var(--shadow-md)' : 'none'
                  }}
                >
                  <Icon size={18} color={isActive ? 'var(--light-blue)' : 'var(--executive-blue)'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Active Tab Content Card Container */}
        <div style={{
          backgroundColor: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          padding: '44px',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-light)'
        }}>

          {/* TAB 1: IMMIGRATION */}
          {activeTab === 'immigration' && (
              <div id="immigration">
                <ScrollReveal direction="up">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
                    <div>
                      <div className="badge-accent" style={{ marginBottom: '10px' }}>Your Cayman Journey. Professionally Guided.</div>
                      <h3 style={{ fontSize: '1.8rem', color: 'var(--deep-navy)' }}>Making Cayman Immigration Easier to Navigate</h3>
                    </div>
                    <button onClick={() => onBookConsultation('Immigration & Residency')} className="btn-primary">
                      Book an Immigration Consultation
                    </button>
                  </div>

                  <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.7 }}>
                    Immigration applications can be time-consuming, detailed and difficult to navigate without the right guidance. Blue Water Capital provides professional immigration support designed to help individuals, families and employers understand requirements, prepare documentation and navigate the application process with greater confidence.
                  </p>

                  <h4 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--deep-navy)' }}>Our Services Include:</h4>
                </ScrollReveal>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '24px'
                }}>
                  {[
                    { icon: Shield, title: "Work Permit & Other Applications", desc: "Support with applications and renewals relating to employment in the Cayman Islands." },
                    { icon: GraduationCap, title: "Residency, Status & Citizenship", desc: "Assistance with permanent residency, right to be Caymanian, naturalization, Caymanian Acknowledgement and other immigration applications." },
                    { icon: FileText, title: "Visa & Travel Services", desc: "Assistance with local and international visa applications, UK ESTA applications, passport applications and other related travel documentation." },
                    { icon: Award, title: "Immigration Advisory & Support", desc: "Professional guidance for individuals and businesses navigating Cayman Islands immigration requirements and processes." }
                  ].map((card, idx) => {
                    const Icon = card.icon;
                    return (
                      <ScrollReveal key={idx} direction="up" delay={idx * 90}>
                        <div style={serviceCardStyle} className="animated-card tilt-card">
                          <div style={iconBadgeStyle}><Icon size={24} color="var(--executive-blue)" /></div>
                          <h5 style={cardTitleStyle}>{card.title}</h5>
                          <p style={cardTextStyle}>{card.desc}</p>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>

                <ScrollReveal direction="up" delay={200}>
                  <div style={calloutBoxStyle}>
                    <p style={{ fontSize: '1rem', color: 'var(--deep-navy)', fontWeight: 600 }}>
                      Not sure which application or immigration pathway applies to you? Our team can help you understand your options and identify the appropriate next step.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            )}

            {/* TAB 2: CAYMANIAN HISTORY & CULTURE TRAINING */}
            {activeTab === 'history-culture' && (
              <div id="history-culture">
                <ScrollReveal direction="up">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
                    <div>
                      <div className="badge-accent" style={{ marginBottom: '10px' }}>Permanent Residence Preparation</div>
                      <h3 style={{ fontSize: '1.8rem', color: 'var(--deep-navy)' }}>Caymanian History & Culture Training</h3>
                      <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--executive-blue)', marginTop: '4px' }}>
                        Prepare With Knowledge. Participate With Confidence.
                      </div>
                    </div>
                    <button onClick={() => onBookConsultation('Caymanian History & Culture Training')} className="btn-primary">
                      Register for Training
                    </button>
                  </div>

                  <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.7 }}>
                    For individuals pursuing Permanent Residence in the Cayman Islands, understanding Caymanian history, culture and heritage can be an important part of the preparation process. Blue Water Capital offers structured Caymanian History & Culture training designed to help participants develop a stronger understanding of the Cayman Islands and prepare for the relevant assessment requirements.
                  </p>

                  <h4 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--deep-navy)' }}>Our training covers key areas including:</h4>
                </ScrollReveal>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '14px',
                  marginBottom: '32px'
                }}>
                  {[
                    "Caymanian history and heritage",
                    "Government and civic development",
                    "Caymanian culture and traditions",
                    "Important national events and milestones",
                    "People and places that shaped the Cayman Islands",
                    "Caymanian identity and community",
                    "Key areas participants should understand when preparing for the assessment"
                  ].map((item, idx) => (
                    <ScrollReveal key={idx} direction="up" delay={idx * 60}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', backgroundColor: 'var(--light-blue)', borderRadius: 'var(--radius-sm)' }}>
                        <CheckCircle2 size={18} color="var(--executive-blue)" />
                        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--deep-navy)' }}>{item}</span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                <ScrollReveal direction="up" delay={200}>
                  <div style={{
                    backgroundColor: 'var(--deep-navy)',
                    color: 'var(--white)',
                    padding: '28px',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '20px'
                  }}>
                    <div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--light-blue)', marginBottom: '6px' }}>More Than Preparation.</div>
                      <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', maxWidth: '650px' }}>
                        Our goal isn’t simply to help you prepare for an assessment. It is to help you better understand the country you live in, work in and hope to make your permanent home.
                      </p>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--white)', marginTop: '12px' }}>
                        Learn Cayman. Understand Cayman. Be Part of Cayman.
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            )}

            {/* TAB 3: AML & COMPLIANCE */}
            {activeTab === 'aml-compliance' && (
              <div id="aml-compliance">
                <ScrollReveal direction="up">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
                    <div>
                      <div className="badge-accent" style={{ marginBottom: '10px' }}>Compliance That Works in the Real World</div>
                      <h3 style={{ fontSize: '1.8rem', color: 'var(--deep-navy)' }}>AML & Compliance Services</h3>
                      <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--executive-blue)', marginTop: '4px' }}>
                        Strengthen Your Compliance. Protect Your Business.
                      </div>
                    </div>
                    <button onClick={() => onBookConsultation('AML & Compliance Services')} className="btn-primary">
                      Book a Compliance Consultation
                    </button>
                  </div>

                  <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '28px', lineHeight: 1.7 }}>
                    Effective compliance is more than meeting a regulatory requirement. It is about protecting your organisation, your clients and your reputation. Blue Water Capital provides practical AML and compliance solutions for businesses seeking to establish, strengthen or remediate their compliance frameworks.
                  </p>

                  <h4 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--deep-navy)' }}>Our Comprehensive Services Include:</h4>
                </ScrollReveal>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '12px',
                  marginBottom: '32px'
                }}>
                  {[
                    "AML Officer services",
                    "AML programme development",
                    "AML Compliance Program",
                    "AML policies and procedures",
                    "Business and AML Risk assessments",
                    "Customer Due Diligence (CDD) reviews",
                    "AML remediation projects",
                    "Compliance programme reviews",
                    "Regulatory readiness assessments",
                    "FATCA & CRS remediation",
                    "Compliance Training",
                    "Ongoing compliance support"
                  ].map((service, idx) => (
                    <ScrollReveal key={idx} direction="up" delay={(idx % 6) * 60}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 16px',
                        backgroundColor: 'var(--white)',
                        border: '1px solid var(--soft-silver)',
                        borderRadius: 'var(--radius-sm)',
                        boxShadow: 'var(--shadow-sm)'
                      }} className="animated-card tilt-card">
                        <Check size={16} color="var(--executive-blue)" />
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--deep-navy)' }}>{service}</span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                <ScrollReveal direction="up" delay={200}>
                  <div style={calloutBoxStyle}>
                    <div style={{ fontWeight: 700, color: 'var(--deep-navy)', fontSize: '1.1rem', marginBottom: '4px' }}>
                      Identify the Risk. Strengthen the Framework. Protect the Business.
                    </div>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                      We help businesses move beyond having policies on paper to developing compliance frameworks that are practical, proportionate and capable of standing up to regulatory scrutiny.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            )}

            {/* TAB 4: CORPORATE & BUSINESS SERVICES */}
            {activeTab === 'corporate-business' && (
              <div id="corporate-business">
                <ScrollReveal direction="up">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
                    <div>
                      <div className="badge-accent" style={{ marginBottom: '10px' }}>Build Your Business On A Strong Foundation</div>
                      <h3 style={{ fontSize: '1.8rem', color: 'var(--deep-navy)' }}>Corporate & Business Services</h3>
                      <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--executive-blue)', marginTop: '4px' }}>
                        From Business Idea to Business Operation.
                      </div>
                    </div>
                    <button onClick={() => onBookConsultation('Corporate & Business Services')} className="btn-primary">
                      Start Your Business
                    </button>
                  </div>

                  <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '28px', lineHeight: 1.7 }}>
                    Setting up a business in the Cayman Islands involves more than registering a company. There are licensing, regulatory and operational considerations that need to be addressed from the beginning. Blue Water Capital helps entrepreneurs and businesses navigate the administrative and regulatory requirements involved in establishing and operating a business in Cayman.
                  </p>
                </ScrollReveal>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '20px',
                  marginBottom: '32px'
                }}>
                  {[
                    { title: "Company Incorporation", desc: "Complete support for establishing new Cayman entities." },
                    { title: "Trade & Business Licensing", desc: "Guidance and submission support for local T&B licenses." },
                    { title: "Business Registration Support", desc: "Fulfilling all regulatory registry & tax requirements." },
                    { title: "Corporate Administration", desc: "Ongoing secretarial and corporate record management." },
                    { title: "Regulatory Application Support", desc: "Preparing applications for regulatory approvals." },
                    { title: "Business Documentation", desc: "Custom operational policies, agreements and contracts." }
                  ].map((item, idx) => (
                    <ScrollReveal key={idx} direction="up" delay={idx * 60}>
                      <div className="animated-card tilt-card" style={{
                        padding: '20px',
                        border: '1px solid var(--soft-silver)',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--white)',
                        height: '100%'
                      }}>
                        <Building size={20} color="var(--executive-blue)" style={{ marginBottom: '8px' }} />
                        <h5 style={{ fontSize: '1.05rem', color: 'var(--deep-navy)', marginBottom: '6px' }}>{item.title}</h5>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                <ScrollReveal direction="up" delay={200}>
                  <div style={calloutBoxStyle}>
                    <div style={{ fontWeight: 700, color: 'var(--deep-navy)', fontSize: '1.1rem' }}>
                      Build Properly. Operate Confidently. Grow Strategically.
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            )}

            {/* TAB 5: TRAINING */}
            {activeTab === 'training' && (
              <div id="training">
                <ScrollReveal direction="up">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
                    <div>
                      <div className="badge-accent" style={{ marginBottom: '10px' }}>Knowledge That Strengthens People & Businesses</div>
                      <h3 style={{ fontSize: '1.8rem', color: 'var(--deep-navy)' }}>Training & Professional Development</h3>
                    </div>
                    <button onClick={() => onBookConsultation('Training & Professional Development')} className="btn-primary">
                      Inquire About Training
                    </button>
                  </div>

                  <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '28px', lineHeight: 1.7 }}>
                    Regulatory requirements are constantly evolving. The right training helps organisations keep their teams informed, prepared and compliant. Through our professional training offerings, we provide practical education across key commercial and regulatory disciplines.
                  </p>

                  <h4 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--deep-navy)' }}>Training Areas Include:</h4>
                </ScrollReveal>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                  marginBottom: '32px'
                }}>
                  {[
                    "Anti-Money Laundering",
                    "Fraud Prevention",
                    "FATCA & CRS",
                    "Customer Service",
                    "Compliance Awareness",
                    "Regulatory Requirements",
                    "Caymanian History & Culture",
                    "Business Practices"
                  ].map((item, idx) => (
                    <ScrollReveal key={idx} direction="up" delay={idx * 60}>
                      <div className="animated-card" style={{
                        padding: '16px',
                        backgroundColor: 'var(--light-blue)',
                        borderRadius: 'var(--radius-sm)',
                        textAlign: 'center',
                        fontWeight: 700,
                        color: 'var(--deep-navy)',
                        fontSize: '0.95rem'
                      }}>
                        {item}
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                <ScrollReveal direction="up" delay={200}>
                  <div style={calloutBoxStyle}>
                    <div style={{ fontWeight: 700, color: 'var(--deep-navy)', fontSize: '1.1rem' }}>
                      Invest in Knowledge. Strengthen Your Organisation.
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Training can be delivered through scheduled programmes, customised sessions and selected online learning opportunities.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            )}

          </div>
      </div>
    </section>
  );
}

const serviceCardStyle = {
  padding: '24px',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--soft-silver)',
  backgroundColor: 'var(--white)'
};

const iconBadgeStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  backgroundColor: 'var(--light-blue)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px'
};

const cardTitleStyle = {
  fontSize: '1.1rem',
  color: 'var(--deep-navy)',
  marginBottom: '8px'
};

const cardTextStyle = {
  fontSize: '0.9rem',
  color: 'var(--text-muted)',
  lineHeight: 1.5
};

const calloutBoxStyle = {
  backgroundColor: 'var(--light-blue)',
  padding: '20px 24px',
  borderRadius: 'var(--radius-md)',
  marginTop: '32px',
  borderLeft: '4px solid var(--executive-blue)'
};
