import React from 'react';
import { Sparkles, Shield, Award, Building, BookOpen } from 'lucide-react';

export default function MarqueeTicker() {
  const items = [
    { text: "IMMIGRATION & RESIDENCY SUPPORT", icon: Shield },
    { text: "CAYMANIAN HISTORY & CULTURE TRAINING", icon: BookOpen },
    { text: "AML & COMPLIANCE OFFICERS", icon: Award },
    { text: "CORPORATE INCORPORATION & LICENSING", icon: Building },
    { text: "BLUE BUSINESS LIBRARY TEMPLATES", icon: Sparkles },
    { text: "GRAND CAYMAN CONSULTANCY SERVICES", icon: Shield }
  ];

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <span key={idx} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginRight: '36px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: 'var(--light-blue)'
            }}>
              <Icon size={14} color="var(--executive-blue)" />
              <span>{item.text}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
