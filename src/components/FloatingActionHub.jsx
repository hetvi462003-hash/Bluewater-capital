import React, { useState, useEffect } from 'react';
import { Phone, Calendar, ArrowUp, MessageSquare } from 'lucide-react';

export default function FloatingActionHub({ onOpenConsultation }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 990,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      alignItems: 'flex-end'
    }}>
      {/* Phone Call Quick Link */}
      <a 
        href="tel:925-4722"
        title="Call Blue Water Capital (925-4722)"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: 'var(--deep-navy)',
          color: 'var(--white)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(11, 31, 58, 0.3)',
          border: '2px solid rgba(220, 234, 245, 0.4)',
          transition: 'transform 0.2s ease',
          textDecoration: 'none'
        }}
      >
        <Phone size={20} color="var(--light-blue)" />
      </a>

      {/* Instant Consultation Trigger Floating Badge */}
      <button
        onClick={() => onOpenConsultation()}
        className="animate-pulse-glow"
        style={{
          backgroundColor: 'var(--executive-blue)',
          color: 'var(--white)',
          padding: '12px 20px',
          borderRadius: '30px',
          border: '2px solid rgba(255, 255, 255, 0.4)',
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          fontSize: '0.85rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 10px 25px rgba(22, 75, 122, 0.5)',
          transition: 'transform 0.2s ease'
        }}
      >
        <Calendar size={16} />
        <span>Book Consultation</span>
      </button>

      {/* Back to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--white)',
            color: 'var(--deep-navy)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-md)',
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
