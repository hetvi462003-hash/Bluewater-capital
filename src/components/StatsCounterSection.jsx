import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, FileCheck, Star, MapPin } from 'lucide-react';

function CounterNumber({ targetNumber, suffix = '' }) {
  const [count, setCount] = useState(0);
  const domRef = useRef();

  useEffect(() => {
    let startTime;
    let animationFrame;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const duration = 2000;
        const animate = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          setCount(Math.floor(progress * targetNumber));
          if (progress < 1) {
            animationFrame = requestAnimationFrame(animate);
          }
        };
        animationFrame = requestAnimationFrame(animate);
      }
    }, { threshold: 0.2 });

    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, [targetNumber]);

  return <span ref={domRef}>{count}{suffix}</span>;
}

export default function StatsCounterSection() {
  const stats = [
    {
      numeric: 100,
      suffix: "%",
      label: "Confidentiality & Compliance",
      subText: "Strictly aligned with CIMA & Cayman laws",
      icon: ShieldCheck
    },
    {
      numeric: 25,
      suffix: "+",
      label: "Business Library Templates",
      subText: "Instant HR, AML, & Corporate Documents",
      icon: FileCheck
    },
    {
      isText: true,
      displayVal: "5-Star",
      label: "Client Satisfaction",
      subText: "Practical guidance from start to finish",
      icon: Star
    },
    {
      isText: true,
      displayVal: "George Town",
      label: "Grand Cayman Headquarters",
      subText: "80 Shedden Road, Elizabethan Square",
      icon: MapPin
    }
  ];

  return (
    <section style={{
      padding: '80px 0',
      backgroundColor: 'var(--deep-navy)',
      color: 'var(--white)',
      borderTop: '1px solid rgba(220, 234, 245, 0.15)',
      borderBottom: '1px solid rgba(220, 234, 245, 0.15)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(22, 75, 122, 0.35) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px'
        }}>
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="animated-card tilt-card"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: 'var(--radius-md)',
                  padding: '32px 28px',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    fontFamily: "'Outfit', sans-serif",
                    background: 'linear-gradient(90deg, #FFFFFF 0%, #DCEAF5 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {item.isText ? (
                      item.displayVal
                    ) : (
                      <CounterNumber targetNumber={item.numeric} suffix={item.suffix} />
                    )}
                  </div>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(22, 75, 122, 0.5)',
                    border: '1px solid rgba(220, 234, 245, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={24} color="var(--light-blue)" />
                  </div>
                </div>

                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--white)' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
                  {item.subText}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
