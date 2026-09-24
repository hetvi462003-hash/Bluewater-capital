import React, { useState } from 'react';
import { Calculator, CheckCircle2, Clock, FileText, ArrowRight, ShieldCheck, Sparkles, Building2, UserCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function CaymanCalculator({ onBookConsultation }) {
  const [selectedGoal, setSelectedGoal] = useState('pr');

  const goalsData = {
    pr: {
      title: "Permanent Residence & Caymanian Status",
      badge: "Immigration & Residency Pathway",
      timeline: "3 – 6 Months Processing",
      recommendation: "Full Permanent Residence Support & Caymanian History & Culture PR Exam Training",
      checklist: [
        "Points Assessment & Strategy Review",
        "Cayman History & Heritage Training Modules",
        "Document Verification & Submission Prep",
        "Immigration Department Correspondence"
      ],
      ctaText: "Book Immigration Consultation",
      serviceValue: "Immigration & Residency"
    },
    business: {
      title: "Establishing a Cayman Business",
      badge: "Corporate & Licensing Pathway",
      timeline: "2 – 4 Weeks Setup",
      recommendation: "Company Incorporation, Trade & Business Licence Application & Office Registration",
      checklist: [
        "Company Structure Selection",
        "Trade & Business Licence Application",
        "Cayman Corporate Governance Setup",
        "Blue Business Library Starter Templates"
      ],
      ctaText: "Start Business Setup Consultation",
      serviceValue: "Corporate & Business Services"
    },
    aml: {
      title: "AML & Compliance Framework",
      badge: "Regulatory Readiness Pathway",
      timeline: "1 – 3 Weeks Remediation",
      recommendation: "AML Officer Designation, Risk Assessment & Compliance Policy Drafting",
      checklist: [
        "AML/CFT Risk Assessment Matrix",
        "Customer Due Diligence (CDD) Review",
        "Compliance Manual & Procedures",
        "Staff Compliance & AML Education"
      ],
      ctaText: "Book AML & Compliance Assessment",
      serviceValue: "AML & Compliance Services"
    },
    training: {
      title: "Caymanian History & Culture Training",
      badge: "PR Assessment Education",
      timeline: "Flexible Course Modules",
      recommendation: "Structured History, Civics, Identity, and Culture Exam Preparation Course",
      checklist: [
        "Caymanian Heritage & History Modules",
        "Civic Development & Government",
        "Culture, Milestones & Identity",
        "PR Exam Practice Assessment"
      ],
      ctaText: "Register for Training",
      serviceValue: "Caymanian History & Culture Training"
    }
  };

  const currentGoal = goalsData[selectedGoal];

  return (
    <section style={{
      padding: '100px 0',
      backgroundColor: 'var(--soft-silver)',
      position: 'relative',
      borderTop: '1px solid var(--border-light)',
      borderBottom: '1px solid var(--border-light)'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <ScrollReveal direction="up">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
            <div className="badge-accent" style={{ marginBottom: '14px' }}>
              <Calculator size={14} />
              <span>Interactive Cayman Advisor</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', color: 'var(--deep-navy)', marginBottom: '16px' }}>
              Find Your Path in the <span style={{ color: 'var(--executive-blue)' }}>Cayman Islands</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
              Select your goal below to view tailored advisory recommendations, estimated timelines, and required document checklists.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Selector Cards */}
        <ScrollReveal direction="up" delay={100}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '36px'
          }}>
            {[
              { id: 'pr', label: 'Permanent Residence & Status', icon: ShieldCheck },
              { id: 'business', label: 'Setup a Cayman Business', icon: Building2 },
              { id: 'aml', label: 'AML & Compliance Framework', icon: UserCheck },
              { id: 'training', label: 'History & Culture Training', icon: Sparkles }
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = selectedGoal === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedGoal(item.id)}
                  style={{
                    padding: '20px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '2px solid var(--executive-blue)' : '1px solid var(--border-silver)',
                    backgroundColor: isSelected ? 'var(--executive-blue)' : 'var(--white)',
                    color: isSelected ? 'var(--white)' : 'var(--deep-navy)',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)'
                  }}
                >
                  <Icon size={24} color={isSelected ? 'var(--light-blue)' : 'var(--executive-blue)'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Results Box */}
        <ScrollReveal direction="up" delay={200}>
          <div style={{
            backgroundColor: 'var(--white)',
            borderRadius: 'var(--radius-lg)',
            padding: '44px',
            border: '1px solid var(--border-silver)',
            boxShadow: 'var(--shadow-md)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '36px',
            alignItems: 'center'
          }}>
            <div>
              <div style={{
                backgroundColor: 'var(--light-blue)',
                color: 'var(--executive-blue)',
                fontSize: '0.78rem',
                fontWeight: 800,
                padding: '6px 14px',
                borderRadius: '20px',
                display: 'inline-block',
                marginBottom: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                {currentGoal.badge}
              </div>

              <h3 style={{ fontSize: '1.8rem', color: 'var(--deep-navy)', marginBottom: '12px' }}>
                {currentGoal.title}
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--executive-blue)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '24px' }}>
                <Clock size={18} />
                <span>Estimated Duration: {currentGoal.timeline}</span>
              </div>

              <div style={{
                backgroundColor: 'var(--light-blue)',
                padding: '22px',
                borderRadius: 'var(--radius-md)',
                borderLeft: '4px solid var(--executive-blue)',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--executive-blue)', textTransform: 'uppercase', fontWeight: 800, marginBottom: '6px' }}>
                  RECOMMENDED BLUE SOLUTION
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--deep-navy)', lineHeight: 1.5 }}>
                  {currentGoal.recommendation}
                </div>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--deep-navy)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} color="var(--executive-blue)" />
                <span>Key Deliverables & Action Steps:</span>
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                {currentGoal.checklist.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--light-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <CheckCircle2 size={16} color="var(--executive-blue)" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => onBookConsultation(currentGoal.serviceValue)}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '16px',
                  fontSize: '1rem'
                }}
              >
                <span>{currentGoal.ctaText}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

