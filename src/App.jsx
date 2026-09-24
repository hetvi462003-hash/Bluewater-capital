import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeTicker from './components/MarqueeTicker';
import StatsCounterSection from './components/StatsCounterSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import BusinessLibrary from './components/BusinessLibrary';
import MembershipSection from './components/MembershipSection';
import ResourcesSection from './components/ResourcesSection';
import AboutCayman from './components/AboutCayman';
import WhyChooseBlue from './components/WhyChooseBlue';
import ContactConsultation from './components/ContactConsultation';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';
import ResourceModal from './components/ResourceModal';
import CaymanCalculator from './components/CaymanCalculator';
import FloatingActionHub from './components/FloatingActionHub';
import ScrollReveal from './components/ScrollReveal';
import { ArrowRight, Sparkles, ShieldCheck, BookOpen, Award, Building, Phone, Calendar } from 'lucide-react';


import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeTab = pathname === '/' ? 'home' : pathname.replace('/', '');
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationInitialService, setConsultationInitialService] = useState('');
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleTabChange = (tab) => {
    window.scrollTo(0, 0);
    const path = tab === 'home' ? '/' : `/${tab}`;
    navigate(path);
  };

  React.useEffect(() => {
    // Force browser to start at top on reload/navigation so scroll-reveals always trigger on scroll
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenConsultation = (serviceName = '') => {
    setConsultationInitialService(serviceName);
    setIsConsultationModalOpen(true);
    showToast(`Initializing consultation for ${serviceName || 'General Enquiry'}...`);
  };

  const handleRequestResource = (resource) => {
    setSelectedResource(resource);
    setIsResourceModalOpen(true);
    showToast(`Opening preview for ${resource.title}...`);
  };

  const handleJoinMembership = (planName) => {
    handleOpenConsultation(`Blue Membership - ${planName} Plan`);
  };


  // Page Banner Component for dedicated pages with executive hero layout
  const PageBanner = ({ badge, title, subtitle, bgImage }) => (
    <div style={{
      position: 'relative',
      minHeight: '44vh',
      display: 'flex',
      alignItems: 'center',
      padding: '100px 0 70px',
      background: bgImage 
        ? `linear-gradient(135deg, rgba(11, 31, 58, 0.95) 0%, rgba(22, 75, 122, 0.90) 100%), url("${bgImage}")`
        : 'linear-gradient(135deg, var(--deep-navy) 0%, #0D2647 60%, var(--executive-blue) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'var(--white)',
      textAlign: 'center',
      boxShadow: 'var(--shadow-md)',
      overflow: 'hidden'
    }}>
      {/* Glow Effect */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '700px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(220, 234, 245, 0.18) 0%, rgba(11, 31, 58, 0) 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <ScrollReveal immediate direction="up">
          {badge && (
            <div className="badge-accent animate-pop" style={{
              marginBottom: '18px',
              backgroundColor: 'rgba(220, 234, 245, 0.15)',
              color: 'var(--light-blue)',
              border: '1px solid rgba(220, 234, 245, 0.3)',
              display: 'inline-flex'
            }}>
              <Sparkles size={14} />
              <span>{badge}</span>
            </div>
          )}
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
            color: 'var(--white)',
            fontWeight: 800,
            marginBottom: '16px',
            letterSpacing: '-0.02em',
            lineHeight: 1.15
          }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{
              fontSize: '1.15rem',
              color: 'var(--light-blue)',
              maxWidth: '750px',
              margin: '0 auto',
              lineHeight: 1.65,
              fontWeight: 500
            }}>
              {subtitle}
            </p>
          )}
        </ScrollReveal>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Reading Scroll Progress Line */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollProgress}%`,
        height: '3px',
        backgroundColor: 'var(--light-blue)',
        boxShadow: '0 0 10px var(--light-blue)',
        zIndex: 99999,
        transition: 'width 0.1s ease-out',
        pointerEvents: 'none'
      }} />

      {/* Top Bar Contact Header */}
      <TopBar />

      {/* Main Sticky Header Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        onOpenConsultation={() => handleOpenConsultation()} 
      />

      {/* Dynamic View Sections */}
      <main style={{ flex: 1 }}>
        <Routes>
        {/* PAGE 1: HOME */}
        <Route path="/" element={
          <>
            <Hero 
              onExploreServices={() => handleTabChange('services')}
              onBookConsultation={() => handleOpenConsultation()}
            />

            {/* Continuous Marquee Ticker */}
            <MarqueeTicker />

            {/* Animated Stats Counter Bar */}
            <StatsCounterSection />

            <AboutSection onBookConsultation={() => handleOpenConsultation()} />
            <ServicesSection onBookConsultation={(service) => handleOpenConsultation(service)} />
            <CaymanCalculator onBookConsultation={(goalTitle) => handleOpenConsultation(goalTitle)} />
            <BusinessLibrary 
              onRequestResource={handleRequestResource} 
              isHomePage={true} 
              onViewAll={() => handleTabChange('library')}
            />
            <MembershipSection onJoinMembership={handleJoinMembership} />
            <ResourcesSection 
              isHomePage={true} 
              onViewAll={() => handleTabChange('resources')}
            />
            <WhyChooseBlue onBookConsultation={() => handleOpenConsultation()} />

            {/* Premium CTA Banner - Home Page */}
            <section style={{
              background: 'linear-gradient(135deg, rgba(5, 18, 35, 0.82) 0%, rgba(11, 31, 58, 0.78) 100%), url("/images/Group 1 - website photo.jpg") no-repeat center center / cover',
              padding: '100px 0',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative glow */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px', height: '600px',
                background: 'radial-gradient(circle, rgba(57,142,203,0.12) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />

              <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <ScrollReveal direction="up">
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '6px 20px',
                      borderRadius: '999px',
                      border: '1px solid rgba(57, 142, 203, 0.5)',
                      backgroundColor: 'rgba(57, 142, 203, 0.12)',
                      color: 'var(--light-blue)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom: '24px'
                    }}>Get Started Today</span>
                  </div>

                  <h2 style={{
                    fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                    color: 'var(--white)',
                    fontWeight: 800,
                    lineHeight: 1.2,
                    marginBottom: '20px',
                    maxWidth: '800px',
                    margin: '0 auto 20px'
                  }}>
                    Ready to Begin?{' '}
                    <span style={{ color: 'var(--light-blue)' }}>Let's Talk.</span>
                  </h2>

                  <p style={{
                    fontSize: '1.15rem',
                    color: 'rgba(255,255,255,0.8)',
                    maxWidth: '600px',
                    margin: '0 auto 48px',
                    lineHeight: 1.75
                  }}>
                    Whether you're navigating immigration, setting up a business, or reviewing compliance — our team is ready to help you move forward with confidence.
                  </p>

                  <div style={{ display: 'flex', gap: '18px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => handleOpenConsultation()}
                      className="btn-primary"
                      style={{ padding: '16px 36px', fontSize: '1rem', boxShadow: '0 8px 28px rgba(57,142,203,0.35)' }}
                    >
                      <Calendar size={18} />
                      <span>Book a Consultation</span>
                    </button>
                    <button
                      onClick={() => handleTabChange('contact')}
                      style={{
                        padding: '16px 36px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-sm)',
                        border: '1.5px solid rgba(255,255,255,0.35)',
                        background: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(10px)',
                        color: 'var(--white)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.25s'
                      }}
                    >
                      <Phone size={18} />
                      <span>Contact Us</span>
                    </button>
                  </div>
                </ScrollReveal>
              </div>
            </section>

          } />

        {/* PAGE 2: ABOUT */}
        <Route path="/about" element={
          <>
            <PageBanner 
              badge="About Blue Water Capital"
              title="Expertise You Can Rely On. Solutions You Can Understand."
              subtitle="Practical professional consulting for individuals, entrepreneurs, and established businesses navigating the Cayman Islands."
              bgImage="/images/office picture -  website photo.jpg"
            />
            <MarqueeTicker />
            <AboutSection onBookConsultation={() => handleOpenConsultation()} />
            <StatsCounterSection />
            
            {/* Real Office Gallery */}
            <section style={{ padding: '60px 0', backgroundColor: 'var(--soft-silver)' }}>
              <div className="container">
                <ScrollReveal direction="up">
                  <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div className="badge-accent" style={{ marginBottom: '10px' }}>Grand Cayman Presence</div>
                    <h2 style={{ fontSize: '2rem', color: 'var(--deep-navy)' }}>Our Office & Dedicated Team</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Located in the heart of George Town at Elizabethan Square, Eden House.</p>
                  </div>
                </ScrollReveal>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '20px'
                }}>
                  {[
                    { src: "/images/office waiting area - website.jpg", alt: "Waiting Area" },
                    { src: "/images/employee - website.jpg", alt: "Our Professionals" },
                    { src: "/images/downstairs - website photo.jpg", alt: "Building Exterior" },
                    { src: "/images/Group 1 - website photo.jpg", alt: "Executive Team" }
                  ].map((imgItem, idx) => (
                    <ScrollReveal key={idx} direction="up" delay={idx * 120}>
                      <img 
                        src={imgItem.src} 
                        alt={imgItem.alt} 
                        className="animated-card tilt-card" 
                        style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }} 
                      />
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            <WhyChooseBlue onBookConsultation={() => handleOpenConsultation()} />
          } />

        {/* PAGE 3: SERVICES */}
        <Route path="/services" element={
          <>
            <PageBanner 
              badge="Practice Areas"
              title="Solutions Designed Around Your Needs"
              subtitle="Immigration & Residency • Caymanian History & Culture • AML & Compliance • Corporate Setup • Professional Training"
              bgImage="/images/employee - website.jpg"
            />
            <MarqueeTicker />
            <ServicesSection onBookConsultation={(service) => handleOpenConsultation(service)} />
            <CaymanCalculator onBookConsultation={(goalTitle) => handleOpenConsultation(goalTitle)} />
          } />

        {/* PAGE 4: BUSINESS LIBRARY */}
        <Route path="/library" element={
          <>
            <PageBanner 
              badge="Blue Business Library"
              title="Professional Documents Without Starting from a Blank Page"
              subtitle="Browse ready-to-use business templates, HR agreements, AML compliance manuals, and Cayman business checklists."
              bgImage="/images/downstairs - website photo.jpg"
            />
            <MarqueeTicker />
            <BusinessLibrary onRequestResource={handleRequestResource} />
          } />

        {/* PAGE 5: MEMBERSHIP */}
        <Route path="/membership" element={
          <>
            <PageBanner 
              badge="Blue Membership Plans"
              title="Your Business Documentation, Simplified"
              subtitle="Why purchase one document when you can have ongoing access to the documents your business needs?"
              bgImage="/images/Group - website photo.jpg"
            />
            <MarqueeTicker />
            <MembershipSection onJoinMembership={handleJoinMembership} />
          } />

        {/* PAGE 6: RESOURCES */}
        <Route path="/resources" element={
          <>
            <PageBanner 
              badge="Knowledge Centre & FAQs"
              title="Cayman Regulatory Guides & Educational Resources"
              subtitle="Answers to common immigration, business setup, AML compliance, and residency questions."
              bgImage="/images/office waiting area - website.jpg"
            />
            <MarqueeTicker />
            <ResourcesSection />
          } />

        {/* PAGE 7: ABOUT CAYMAN */}
        <Route path="/about-cayman" element={
          <>
            <PageBanner 
              badge="About Cayman"
              title="Discover the Cayman Islands"
              subtitle="A globally recognized financial centre, strong regulatory environment, and exceptional quality of life."
              bgImage="/images/downstairs - website photo.jpg"
            />
            <MarqueeTicker />
            <AboutCayman onBookConsultation={() => handleOpenConsultation()} />
            <CaymanCalculator onBookConsultation={(goalTitle) => handleOpenConsultation(goalTitle)} />
          } />

        {/* PAGE 8: WHY CHOOSE BLUE */}
        <Route path="/why-choose-blue" element={
          <>
            <PageBanner 
              badge="Our Differentiators"
              title="Why Choose Blue Water Capital?"
              subtitle="Cayman-Focused Expertise • Professional Experience • Practical Guidance • Personalised Service • Integrity Matters"
              bgImage="/images/Team building - website photo.jpg"
            />
            <MarqueeTicker />
            <WhyChooseBlue onBookConsultation={() => handleOpenConsultation()} />
          } />

        {/* PAGE 9: CONTACT */}
        <Route path="/contact" element={
          <>
            <PageBanner 
              badge="Get In Touch"
              title="Let’s Talk. Tell Us What You Need Help With."
              subtitle="Visit our Elizabethan Square office in George Town or schedule a direct consultation with our advisory team."
              bgImage="/images/office picture -  website photo.jpg"
            />
            <MarqueeTicker />
            <ContactConsultation selectedService={consultationInitialService} />
          } />
        </Routes>
      </main>

      {/* Floating Action Quick Hub */}
      <FloatingActionHub onOpenConsultation={() => handleOpenConsultation()} />

      {/* Footer */}
      <Footer onNavigate={handleTabChange} />

      {/* Global Popup Modals */}
      <ConsultationModal 
        isOpen={isConsultationModalOpen} 
        onClose={() => setIsConsultationModalOpen(false)} 
        initialService={consultationInitialService}
      />

      <ResourceModal 
        isOpen={isResourceModalOpen} 
        onClose={() => setIsResourceModalOpen(false)} 
        resource={selectedResource}
      />

      {/* Glassmorphic Action Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          backgroundColor: 'rgba(11, 31, 58, 0.94)',
          color: 'var(--white)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(220, 234, 245, 0.3)',
          padding: '14px 22px',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.35)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '0.9rem',
          fontWeight: 600,
          animation: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <Sparkles size={18} color="var(--light-blue)" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

