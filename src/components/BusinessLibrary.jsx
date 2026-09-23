import React, { useState } from 'react';
import { Search, FileText, Download, AlertTriangle, CheckCircle, Tag, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export const TEMPLATES_DATA = [
  // Business Essentials
  { id: 'b1', title: 'Business Plan Template', category: 'Business Essentials', price: '$49', desc: 'Comprehensive outline for business structure, financial projections, and market strategy.', popular: true },
  { id: 'b2', title: 'Invoice Template', category: 'Business Essentials', price: '$29', desc: 'Professional billing layout compliant with local business invoicing standards.' },
  { id: 'b3', title: 'Business Proposal', category: 'Business Essentials', price: '$39', desc: 'Turnkey client presentation and engagement proposal format.' },
  { id: 'b4', title: 'Company Profile', category: 'Business Essentials', price: '$35', desc: 'Executive background overview for prospective investors and partners.' },
  { id: 'b5', title: 'Meeting Agenda', category: 'Business Essentials', price: '$19', desc: 'Structured agenda framework for productive management meetings.' },
  { id: 'b6', title: 'Minutes Template', category: 'Business Essentials', price: '$19', desc: 'Standardized format for capturing key meeting decisions and action items.' },

  // HR & People
  { id: 'h1', title: 'Employment Contract', category: 'HR & People', price: '$59', desc: 'Standard Cayman-compliant employment agreement template.', popular: true },
  { id: 'h2', title: 'Employee Handbook', category: 'HR & People', price: '$89', desc: 'Complete workplace policies, code of conduct, and employee guidelines.' },
  { id: 'h3', title: 'Performance Review', category: 'HR & People', price: '$29', desc: 'Structured employee appraisal and feedback document.' },
  { id: 'h4', title: 'Disciplinary Form', category: 'HR & People', price: '$19', desc: 'Formal record keeping template for HR performance management.' },
  { id: 'h5', title: 'Leave Request Form', category: 'HR & People', price: '$15', desc: 'Standardized employee vacation, sick leave, and personal time tracking.' },
  { id: 'h6', title: 'Policies and Procedures', category: 'HR & People', price: '$69', desc: 'Operational workplace standards and procedure documentation.' },

  // AML & Compliance
  { id: 'a1', title: 'AML Remediation Plan', category: 'AML & Compliance', price: '$129', desc: 'Framework for addressing audit findings and upgrading compliance controls.', popular: true },
  { id: 'a2', title: 'AML Policy', category: 'AML & Compliance', price: '$99', desc: 'Core Anti-Money Laundering policy adapted for regulated businesses.' },
  { id: 'a3', title: 'Compliance Manual', category: 'AML & Compliance', price: '$149', desc: 'Complete operational compliance reference manual for officers.' },
  { id: 'a4', title: 'Risk Assessment Framework', category: 'AML & Compliance', price: '$79', desc: 'Business and customer risk evaluation methodology and matrix.' },
  { id: 'a5', title: 'CDD Checklist', category: 'AML & Compliance', price: '$39', desc: 'Customer Due Diligence document verification checklist.' },
  { id: 'a6', title: 'AML Training Register', category: 'AML & Compliance', price: '$29', desc: 'Log for tracking mandatory staff AML education completion.' },
  { id: 'a7', title: 'Compliance Monitoring Template', category: 'AML & Compliance', price: '$49', desc: 'Periodic review schedule and compliance testing log.' },

  // Corporate Governance
  { id: 'c1', title: 'Board Meeting Template', category: 'Corporate Governance', price: '$39', desc: 'Executive director board meeting package and agenda.' },
  { id: 'c2', title: 'Board Minutes', category: 'Corporate Governance', price: '$29', desc: 'Formal board meeting resolution and record template.' },
  { id: 'c3', title: 'Conflict of Interest Policy', category: 'Corporate Governance', price: '$49', desc: 'Governance framework for identifying and managing director conflicts.' },
  { id: 'c4', title: 'Director Declaration', category: 'Corporate Governance', price: '$39', desc: 'Standard fitness and properness declaration document.' },
  { id: 'c5', title: 'Corporate Governance Policy', category: 'Corporate Governance', price: '$89', desc: 'Board oversight and governance charter for corporate entities.' },
  { id: 'c6', title: 'Company Incorporation Templates', category: 'Corporate Governance', price: '$119', desc: 'Starter package for forming new Cayman Islands entities.' },

  // Cayman Business
  { id: 'cb1', title: 'Trade & Business Licence Checklist', category: 'Cayman Business', price: '$29', desc: 'Step-by-step document requirements for T&B licence application.', popular: true },
  { id: 'cb2', title: 'Cayman Business Start-Up Checklist', category: 'Cayman Business', price: '$39', desc: 'Turnkey launch roadmap for launching operations in Grand Cayman.' },
  { id: 'cb3', title: 'Regulatory Compliance Checklist', category: 'Cayman Business', price: '$49', desc: 'Annual regulatory filing deadlines and compliance obligation tracker.' },
  { id: 'cb4', title: 'Cayman Business Planning Resources', category: 'Cayman Business', price: '$59', desc: 'Economic statistics, licensing guidelines, and planning tools.' }
];

export default function BusinessLibrary({ onRequestResource, isHomePage = false, onViewAll }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Business Essentials', 'HR & People', 'AML & Compliance', 'Corporate Governance', 'Cayman Business'];

  // On home page, display top 6 featured templates; otherwise filter full list
  const filteredTemplates = isHomePage
    ? TEMPLATES_DATA.filter(item => item.popular || ['b1', 'h1', 'a1', 'a2', 'c1', 'cb1'].includes(item.id)).slice(0, 6)
    : TEMPLATES_DATA.filter((item) => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });

  return (
    <section id="library" className="section-padding" style={{
      backgroundColor: 'var(--white)',
      position: 'relative'
    }}>
      <div className="container">
        {/* Section Header with Employee Image */}
        <ScrollReveal direction="up">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '50px', 
            alignItems: 'center',
            marginBottom: '60px'
          }}>
            <div style={{ maxWidth: '600px' }}>
              <div className="badge-accent" style={{ marginBottom: '16px' }}>
                Blue Business Library
              </div>
              <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', color: 'var(--deep-navy)', marginBottom: '18px' }}>
                Professional Documents <span style={{ color: 'var(--executive-blue)' }}>Without Starting from a Blank Page</span>
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.7 }}>
                The Blue Business Library gives entrepreneurs, business owners and professionals access to professionally prepared, practical business templates designed to save time.
              </p>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: '1.1rem',
                color: 'var(--executive-blue)',
                letterSpacing: '0.04em'
              }}>
                Browse. Request. Put to Work.
              </div>
            </div>
            
            <div className="animated-card" style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(11, 31, 58, 0.12)',
              border: '6px solid var(--white)'
            }}>
              <img 
                src="/images/employee.jpg" 
                alt="Blue Water Capital Professional" 
                style={{ 
                  width: '100%', 
                  height: '350px', 
                  objectFit: 'cover', 
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }} 
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Search & Category Filter Bar (Hidden on Home page for crisp layout) */}
        {!isHomePage && (
          <ScrollReveal direction="up" delay={100}>
            <div style={{
              backgroundColor: 'var(--soft-silver)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px',
              marginBottom: '50px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-silver)'
            }}>
            {/* Live Search Input */}
            <div style={{ position: 'relative', width: '100%' }}>
              <Search size={22} color="var(--text-muted)" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text"
                placeholder="Search templates (e.g., AML Policy, Employment Contract, Invoice, Checklist)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 20px 16px 56px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-silver)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1rem',
                  outline: 'none',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                  backgroundColor: 'var(--white)'
                }}
              />
            </div>

            {/* Category Tabs */}
            <div style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap'
            }}>
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '12px 22px',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      border: 'none',
                      backgroundColor: isSelected ? 'var(--executive-blue)' : 'var(--white)',
                      color: isSelected ? 'var(--white)' : 'var(--deep-navy)',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: isSelected ? '0 6px 16px rgba(22,75,122,0.3)' : '0 2px 6px rgba(0,0,0,0.04)'
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
        )}

        {/* Templates Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
          gap: '32px',
          marginBottom: '64px'
        }}>
          {filteredTemplates.map((item, idx) => (
            <ScrollReveal key={`${item.id}-${selectedCategory}`} direction="up" delay={(idx % 6) * 70}>
              <div 
                className="animated-card"
                style={{
                  backgroundColor: 'var(--white)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-silver)',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                  height: '100%'
                }}
              >
                {item.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    backgroundColor: 'var(--light-blue)',
                    color: 'var(--executive-blue)',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '4px 12px',
                    borderRadius: '16px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    POPULAR
                  </div>
                )}

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                    <Tag size={15} color="var(--executive-blue)" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--executive-blue)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {item.category}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', color: 'var(--deep-navy)', marginBottom: '10px', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{
                  paddingTop: '20px',
                  borderTop: '1px solid var(--soft-silver)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>One-time price</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--deep-navy)' }}>{item.price}</div>
                  </div>

                  <button 
                    onClick={() => onRequestResource(item)}
                    className="btn-primary"
                    style={{ padding: '10px 18px', fontSize: '0.85rem' }}
                  >
                    <span>Request Document</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <ScrollReveal direction="up">
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              No document templates found matching "{searchQuery}". Try selecting another category or clear your search query.
            </div>
          </ScrollReveal>
        )}

        {/* View All CTA Button on Home Page */}
        {isHomePage && onViewAll && (
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <button 
              onClick={onViewAll}
              className="btn-primary"
              style={{
                padding: '16px 36px',
                fontSize: '1.05rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <span>Explore All 25+ Templates in Business Library</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        )}

        {/* Legal Disclaimer Box (Rendered on dedicated page) */}
        {!isHomePage && (
          <ScrollReveal direction="up">
            <div style={{
              backgroundColor: 'var(--light-blue)',
              borderRadius: 'var(--radius-md)',
              padding: '28px 32px',
              borderLeft: '4px solid var(--executive-blue)',
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
              marginTop: '40px'
            }}>
              <AlertTriangle size={26} color="var(--executive-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--deep-navy)', marginBottom: '8px' }}>Legal Disclaimer</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Blu Consultancy templates are provided as general business resources and are intended to serve as a starting point for your organisation’s documentation. Templates should be reviewed and adapted to reflect your specific business circumstances, applicable Cayman Islands laws and regulatory requirements. Purchasing a template does not constitute legal, regulatory or professional advice.
                </p>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
