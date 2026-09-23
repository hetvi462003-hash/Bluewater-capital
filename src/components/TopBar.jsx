import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function TopBar() {
  return (
    <div style={{
      backgroundColor: 'var(--deep-navy)',
      color: 'rgba(255, 255, 255, 0.85)',
      fontSize: '0.85rem',
      padding: '8px 0',
      borderBottom: '1px solid rgba(22, 75, 122, 0.4)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Left Side: Contact Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <a href="tel:925-4722" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Phone size={14} color="var(--light-blue)" />
            <span>925-4722</span>
          </a>
          <a href="mailto:BluConsultancy@outlook.com" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Mail size={14} color="var(--light-blue)" />
            <span>BluConsultancy@outlook.com</span>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={14} color="var(--light-blue)" />
            <span>80 Shedden Road, Elizabethan Square, George Town, Grand Cayman</span>
          </div>
        </div>

        {/* Right Side: Hours */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Clock size={14} color="var(--light-blue)" />
          <span>Mon – Fri: 10am – 3pm</span>
        </div>
      </div>
    </div>
  );
}


