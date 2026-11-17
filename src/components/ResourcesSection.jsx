import React, { useState } from 'react';
import { BookOpen, FileText, ChevronDown, ChevronUp, HelpCircle, AlertCircle, Info, Download, FileDown } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function ResourcesSection({ isHomePage = false, onViewAll }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [faqSearchQuery, setFaqSearchQuery] = useState('');

  const guides = [
    {
      id: 'immigration-guides',
      title: 'Immigration Guides',
      desc: 'Official guidance and helpful information for individuals navigating Cayman immigration matters, Permanent Residence points, work permit procedures, and citizenship pathways.',
      badge: 'PDF • 8.1 MB',
      files: [
        {
          fileName: 'Cayman-Protection-Act-Immigration-Guide.pdf',
          label: 'Download Guide',
          size: '8.1 MB'
        }
      ]
    },
    {
      id: 'business-guides',
      title: 'Business Guides',
      desc: 'Practical guidance for entrepreneurs, investors and companies establishing operations, trade & business licensing, relocation and corporate structures in Grand Cayman.',
      badge: 'Coming Soon',
      files: []
    },
    {
      id: 'compliance-resources',
      title: 'Compliance Resources',
      desc: 'Official CIMA guidance notes covering AML/CFT/CPF policies, Customer Due Diligence (CDD), risk management, and regulatory compliance frameworks.',
      badge: 'PDF • 3.4 MB',
      files: [
        {
          fileName: 'CIMA-AML-Compliance-Guidance-Notes.pdf',
          label: 'Download Guide',
          size: '3.4 MB'
        }
      ]
    },
    {
      id: 'cayman-guides',
      title: 'Cayman Guides',
      desc: 'Comprehensive visitor and living information covering Grand Cayman history, culture, civic institutions, business environment, beaches, and island life.',
      badge: '2 Guides Available',
      files: [
        {
          fileName: 'Grand-Cayman-Visitor-Guide.pdf',
          label: 'Visitor Guide',
          size: '474 KB'
        },
        {
          fileName: 'Cayman-Islands-Travel-Business-Guide.pdf',
          label: 'Travel & Island Guide',
          size: '1.7 MB'
        }
      ]
    }
  ];

  const faqs = [
    {
      q: "What services does Blue Water Capital provide?",
      a: "Blue Water Capital provides practical professional solutions in Immigration & Residency support, AML & Compliance advisory, Corporate & Business setup, Caymanian History & Culture training, and turnkey business document templates."
    },
    {
      q: "How does the Blue Business Library work?",
      a: "The Blue Business Library provides instant access to professionally prepared business templates, policies, and contracts. You can browse individual templates, submit a request, or subscribe to a Blue Membership for ongoing unlimited downloads."
    },
    {
      q: "Who should take the Caymanian History & Culture training?",
      a: "Our training is designed for individuals preparing for Permanent Residence in the Cayman Islands, as well as anyone looking to deepen their understanding of Cayman history, heritage, culture, and government."
    },
    {
      q: "What is included in your AML & Compliance services?",
      a: "We offer AML Officer designation, AML policy and procedure drafting, Customer Due Diligence (CDD) reviews, AML remediation, FATCA/CRS support, and annual compliance monitoring."
    },
    {
      q: "Where is Blue Water Capital located in Grand Cayman?",
      a: "Our office is located at 80 Shedden Road, Elizabethan Square, Eden House, 4th Floor, Suite 4, George Town, Grand Cayman. Our office hours are Monday through Friday from 10:00 AM to 3:00 PM."
    }
  ];

  const allFilteredFaqs = faqs.filter(f =>
    f.q.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
    f.a.toLowerCase().includes(faqSearchQuery.toLowerCase())
  );

  const filteredFaqs = isHomePage ? allFilteredFaqs.slice(0, 3) : allFilteredFaqs;

  return (
    <section id="resources" className="section-padding" style={{
      backgroundColor: 'var(--white)',
      position: 'relative'
    }}>
      <div className="container">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 54px' }}>
            <div className="badge-accent" style={{ marginBottom: '16px' }}>
              Knowledge Centre
            </div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', color: 'var(--deep-navy)', marginBottom: '18px' }}>
              Resources & <span style={{ color: 'var(--executive-blue)' }}>Guidance</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
              The Cayman regulatory and business environment is constantly evolving. Our resources section provides practical information, guides, and educational content.
            </p>
          </div>
        </ScrollReveal>

        {/* Guides Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: '28px',
          marginBottom: '64px'
        }}>
          {guides.map((g, idx) => (
            <ScrollReveal key={g.id} direction="up" delay={idx * 100}>
              <div
                id={g.id}
                className="animated-card responsive-card"
                style={{
                  backgroundColor: 'var(--soft-silver)',
                  borderRadius: 'var(--radius-md)',
                  padding: '32px',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxSizing: 'border-box'
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--light-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <BookOpen size={24} color="var(--executive-blue)" />
                    </div>
                    <span style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: g.files.length > 0 ? 'var(--executive-blue)' : 'var(--text-muted)',
                      backgroundColor: g.files.length > 0 ? 'var(--light-blue)' : 'rgba(0, 32, 91, 0.05)',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      border: g.files.length > 0 ? '1px solid rgba(0, 102, 204, 0.18)' : '1px solid var(--border-silver)',
                      letterSpacing: '0.3px'
                    }}>
                      {g.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', color: 'var(--deep-navy)', marginBottom: '12px' }}>{g.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, textAlign: 'justify', marginBottom: '24px' }}>
                    {g.desc}
                  </p>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '18px', borderTop: '1px solid rgba(0, 32, 91, 0.08)' }}>
                  {g.files.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {g.files.map((file, fIdx) => (
                        <a
                          key={fIdx}
                          href={`/documents/${file.fileName}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            width: '100%',
                            padding: '10px 14px',
                            fontSize: '0.86rem',
                            fontWeight: 600,
                            borderRadius: 'var(--radius-sm)',
                            textDecoration: 'none',
                            boxSizing: 'border-box',
                            transition: 'all 0.25s ease'
                          }}
                        >
                          <Download size={15} />
                          <span>{file.label} <span style={{ opacity: 0.75, fontSize: '0.78rem', fontWeight: 500 }}>({file.size})</span></span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '11px 14px',
                      fontSize: '0.84rem',
                      color: 'var(--text-muted)',
                      backgroundColor: 'rgba(0, 32, 91, 0.03)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px dashed var(--border-silver)',
                      fontStyle: 'italic',
                      textAlign: 'center'
                    }}>
                      <span>Guides coming soon</span>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* FAQ Accordion Section */}
        <ScrollReveal direction="up" delay={200}>
          <div id="faqs" className="responsive-card" style={{
            maxWidth: '880px',
            margin: '0 auto 54px',
            backgroundColor: 'var(--white)',
            borderRadius: 'var(--radius-lg)',
            padding: '48px',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '28px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <HelpCircle size={32} color="var(--executive-blue)" />
                <h3 style={{ fontSize: '1.75rem', color: 'var(--deep-navy)' }}>Frequently Asked Questions</h3>
              </div>

              {/* Live FAQ Quick Search Input (Rendered on dedicated page) */}
              {!isHomePage && (
                <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                  <input
                    type="text"
                    placeholder="Quick search questions..."
                    value={faqSearchQuery}
                    onChange={(e) => setFaqSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 36px',
                      borderRadius: '20px',
                      border: '1px solid var(--border-silver)',
                      backgroundColor: 'var(--soft-silver)',
                      fontSize: '0.85rem',
                      color: 'var(--text-dark)',
                      outline: 'none'
                    }}
                  />
                  <HelpCircle size={16} color="var(--executive-blue)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`faq-item-glow ${isOpen ? 'active-faq' : ''}`}
                      style={{
                        borderRadius: 'var(--radius-sm)',
                        border: isOpen ? '1px solid var(--executive-blue)' : '1px solid var(--border-light)',
                        backgroundColor: isOpen ? 'var(--light-blue)' : 'var(--white)',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                        style={{
                          width: '100%',
                          padding: '18px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 600,
                          fontSize: '1.02rem',
                          color: 'var(--deep-navy)'
                        }}
                      >
                        <span>{faq.q}</span>
                        {isOpen ? <ChevronUp size={22} color="var(--executive-blue)" style={{ flexShrink: 0 }} /> : <ChevronDown size={22} color="var(--executive-blue)" style={{ flexShrink: 0 }} />}
                      </button>

                      {isOpen && (
                        <div style={{
                          padding: '0 20px 20px 20px',
                          color: 'var(--text-muted)',
                          fontSize: '0.95rem',
                          lineHeight: 1.7,
                          textAlign: 'justify'
                        }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                  No matching questions found for "{faqSearchQuery}".
                </div>
              )}
            </div>

            {/* View All FAQs CTA on Home Page */}
            {isHomePage && onViewAll && (
              <div style={{ textAlign: 'center', marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--soft-silver)' }}>
                <button
                  onClick={onViewAll}
                  className="btn-primary"
                  style={{ padding: '12px 28px', fontSize: '0.95rem' }}
                >
                  <span>Explore Knowledge Centre & All FAQs</span>
                </button>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Resource Disclaimer */}
        <ScrollReveal direction="up" delay={300}>
          <div style={{
            maxWidth: '850px',
            margin: '0 auto',
            textAlign: 'left',
            fontSize: '0.875rem',
            color: 'var(--text-light)',
            fontStyle: 'italic',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <Info size={18} style={{ flexShrink: 0, marginTop: '3px' }} />
            <span>Important: Information provided through our resources is for general educational purposes and should not be treated as legal, immigration or regulatory advice.</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
