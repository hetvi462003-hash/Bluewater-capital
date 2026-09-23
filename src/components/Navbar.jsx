import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Calendar, BookOpen, ShieldCheck, Building2, GraduationCap, Award, HelpCircle, FileText } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenConsultation }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [resourcesDropdown, setResourcesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (tabId, serviceSub = null) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    setResourcesDropdown(false);
    if (serviceSub) {
      setTimeout(() => {
        const el = document.getElementById(serviceSub);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 900,
      backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'var(--white)',
      backdropFilter: 'blur(10px)',
      boxShadow: isScrolled ? 'var(--shadow-md)' : '0 2px 10px rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '12px',
        paddingBottom: '12px'
      }}>
        {/* Logo */}
        <div 
          onClick={() => navigateTo('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}
        >
          <img 
            src="/images/bw1.png" 
            alt="Blue Water Capital Logo" 
            style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
          />
        </div>

        {/* Desktop Navigation */}
        <nav style={{ display: 'none', gap: '10px', alignItems: 'center' }} className="desktop-nav">
          <button 
            onClick={() => navigateTo('home')}
            style={navBtnStyle(activeTab === 'home')}
          >
            HOME
          </button>

          <button 
            onClick={() => navigateTo('about')}
            style={navBtnStyle(activeTab === 'about')}
          >
            ABOUT
          </button>

          {/* Services Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setServicesDropdown(true)}
            onMouseLeave={() => setServicesDropdown(false)}
          >
            <button 
              onClick={() => navigateTo('services')}
              style={{ ...navBtnStyle(activeTab === 'services'), display: 'flex', alignItems: 'center', gap: '3px' }}
            >
              SERVICES <ChevronDown size={12} />
            </button>

            {servicesDropdown && (
              <div style={dropdownMenuContainer}>
                <div 
                  onClick={() => navigateTo('services', 'immigration')}
                  style={dropdownItemStyle}
                >
                  <ShieldCheck size={18} color="var(--executive-blue)" />
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--deep-navy)' }}>Immigration & Residency</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Work Permits, PR, Visas & Status</div>
                  </div>
                </div>

                <div 
                  onClick={() => navigateTo('services', 'history-culture')}
                  style={dropdownItemStyle}
                >
                  <GraduationCap size={18} color="var(--executive-blue)" />
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--deep-navy)' }}>Caymanian History & Culture</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PR Exam Preparation & Civics</div>
                  </div>
                </div>

                <div 
                  onClick={() => navigateTo('services', 'aml-compliance')}
                  style={dropdownItemStyle}
                >
                  <Award size={18} color="var(--executive-blue)" />
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--deep-navy)' }}>AML & Compliance</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AML Officers, Risk & Remediation</div>
                  </div>
                </div>

                <div 
                  onClick={() => navigateTo('services', 'corporate-business')}
                  style={dropdownItemStyle}
                >
                  <Building2 size={18} color="var(--executive-blue)" />
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--deep-navy)' }}>Corporate & Business Services</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Incorporation, Trade Licensing & Admin</div>
                  </div>
                </div>

                <div 
                  onClick={() => navigateTo('services', 'training')}
                  style={dropdownItemStyle}
                >
                  <BookOpen size={18} color="var(--executive-blue)" />
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--deep-navy)' }}>Training & Development</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AML, Fraud Prevention & Compliance</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={() => navigateTo('library')}
            style={navBtnStyle(activeTab === 'library')}
          >
            BUSINESS LIBRARY
            <span style={{
              backgroundColor: 'var(--executive-blue)',
              color: 'white',
              fontSize: '0.55rem',
              padding: '2px 5px',
              borderRadius: '8px',
              marginLeft: '4px'
            }}>NEW</span>
          </button>

          <button 
            onClick={() => navigateTo('membership')}
            style={navBtnStyle(activeTab === 'membership')}
          >
            MEMBERSHIP
          </button>

          {/* Resources Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setResourcesDropdown(true)}
            onMouseLeave={() => setResourcesDropdown(false)}
          >
            <button 
              onClick={() => navigateTo('resources')}
              style={{ ...navBtnStyle(activeTab === 'resources'), display: 'flex', alignItems: 'center', gap: '3px' }}
            >
              RESOURCES <ChevronDown size={12} />
            </button>

            {resourcesDropdown && (
              <div style={dropdownMenuContainer}>
                <div onClick={() => navigateTo('resources', 'immigration-guides')} style={dropdownItemStyle}>
                  <FileText size={16} color="var(--executive-blue)" />
                  <span style={{ fontWeight: 600, color: 'var(--deep-navy)' }}>Immigration Guides</span>
                </div>
                <div onClick={() => navigateTo('resources', 'business-guides')} style={dropdownItemStyle}>
                  <FileText size={16} color="var(--executive-blue)" />
                  <span style={{ fontWeight: 600, color: 'var(--deep-navy)' }}>Business Guides</span>
                </div>
                <div onClick={() => navigateTo('resources', 'compliance-resources')} style={dropdownItemStyle}>
                  <FileText size={16} color="var(--executive-blue)" />
                  <span style={{ fontWeight: 600, color: 'var(--deep-navy)' }}>Compliance Resources</span>
                </div>
                <div onClick={() => navigateTo('resources', 'cayman-guides')} style={dropdownItemStyle}>
                  <FileText size={16} color="var(--executive-blue)" />
                  <span style={{ fontWeight: 600, color: 'var(--deep-navy)' }}>Cayman Guides</span>
                </div>
                <div onClick={() => navigateTo('resources', 'faqs')} style={dropdownItemStyle}>
                  <HelpCircle size={16} color="var(--executive-blue)" />
                  <span style={{ fontWeight: 600, color: 'var(--deep-navy)' }}>Frequently Asked Questions</span>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={() => navigateTo('about-cayman')}
            style={navBtnStyle(activeTab === 'about-cayman')}
          >
            ABOUT CAYMAN
          </button>

          <button 
            onClick={() => navigateTo('why-choose-blue')}
            style={navBtnStyle(activeTab === 'why-choose-blue')}
          >
            WHY BLUE
          </button>

          <button 
            onClick={() => navigateTo('contact')}
            style={navBtnStyle(activeTab === 'contact')}
          >
            CONTACT
          </button>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <button 
            onClick={onOpenConsultation}
            className="btn-primary"
            style={{
              padding: '9px 16px',
              fontSize: '0.8rem',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 15px rgba(22, 75, 122, 0.4)'
            }}
          >
            <Calendar size={14} />
            <span>BOOK A CONSULTATION</span>
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle-btn"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--deep-navy)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px'
            }}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--deep-navy)',
          color: 'var(--white)',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <button onClick={() => navigateTo('home')} style={mobileLinkStyle}>HOME</button>
          <button onClick={() => navigateTo('about')} style={mobileLinkStyle}>ABOUT BLUE WATER</button>
          <button onClick={() => navigateTo('services')} style={mobileLinkStyle}>SERVICES</button>
          <button onClick={() => navigateTo('library')} style={mobileLinkStyle}>BLUE BUSINESS LIBRARY</button>
          <button onClick={() => navigateTo('membership')} style={mobileLinkStyle}>BLUE MEMBERSHIP</button>
          <button onClick={() => navigateTo('resources')} style={mobileLinkStyle}>RESOURCES / FAQS</button>
          <button onClick={() => navigateTo('about-cayman')} style={mobileLinkStyle}>ABOUT CAYMAN</button>
          <button onClick={() => navigateTo('why-choose-blue')} style={mobileLinkStyle}>WHY CHOOSE BLUE</button>
          <button onClick={() => navigateTo('contact')} style={mobileLinkStyle}>CONTACT US</button>
        </div>
      )}

      {/* Embedded CSS for Navbar layout responsiveness */}
      <style>{`
        @media (min-width: 1100px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle-btn { display: none !important; }
        }
        @media (max-width: 1099px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

const navBtnStyle = (isActive) => ({
  background: 'none',
  border: 'none',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '0.775rem',
  fontWeight: isActive ? 700 : 600,
  color: isActive ? 'var(--executive-blue)' : 'var(--deep-navy)',
  cursor: 'pointer',
  padding: '6px 3px',
  borderBottom: isActive ? '2px solid var(--executive-blue)' : '2px solid transparent',
  transition: 'all 0.2s ease',
  letterSpacing: '0.01em',
  whiteSpace: 'nowrap'
});

const dropdownMenuContainer = {
  position: 'absolute',
  top: '100%',
  left: 0,
  minWidth: '280px',
  backgroundColor: 'var(--white)',
  borderRadius: 'var(--radius-md)',
  boxShadow: 'var(--shadow-lg)',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  zIndex: 1000,
  border: '1px solid var(--soft-silver)'
};

const dropdownItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '10px 12px',
  borderRadius: 'var(--radius-sm)',
  cursor: 'pointer',
  transition: 'background 0.2s ease',
  textDecoration: 'none'
};

const mobileLinkStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--white)',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '1rem',
  fontWeight: 600,
  textAlign: 'left',
  padding: '8px 0',
  cursor: 'pointer',
  borderBottom: '1px solid rgba(255,255,255,0.08)'
};
