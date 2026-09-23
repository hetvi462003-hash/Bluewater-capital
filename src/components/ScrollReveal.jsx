import React, { useEffect, useRef } from 'react';

export default function ScrollReveal({ children, direction = 'up', delay = 0, style = {}, immediate = false }) {
  const domRef = useRef();

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    if (immediate) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (el) el.classList.add('reveal-active');
        });
      });
      return;
    }

    // Reset reveal-active on mount so refreshed/remounted elements start hidden
    el.classList.remove('reveal-active');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                if (entry.target) entry.target.classList.add('reveal-active');
              });
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [immediate]);

  const getDirectionClass = () => {
    if (direction === 'left') return 'reveal-left';
    if (direction === 'right') return 'reveal-right';
    return '';
  };

  return (
    <div
      ref={domRef}
      className={`reveal ${getDirectionClass()}`}
      style={{
        transitionDelay: `${delay}ms`,
        ...style
      }}
    >
      {children}
    </div>
  );
}


