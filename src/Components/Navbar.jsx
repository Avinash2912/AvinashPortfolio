import React, { useState, useEffect } from 'react';

export const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      top: isMobile ? '1rem' : '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      width: isMobile ? '90vw' : '50vw',
      maxWidth: '1200px',
      boxSizing: 'border-box',
      paddingInline: isMobile ? '0.25rem' : undefined
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: isMobile ? '1rem' : '3rem',
        padding: isMobile ? '0.6rem 1rem' : '1rem 2rem',
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '50px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{
          fontSize: '1.3rem',
          fontWeight: 'bold',
          color: '#fff',
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '1.5rem' }}></span>
          Portfolio
        </div>
        <div style={{
          display: 'flex',
          gap: isMobile ? '0.75rem' : '2rem',
          alignItems: 'center',
          overflowX: isMobile ? 'auto' : 'visible',
          WebkitOverflowScrolling: isMobile ? 'touch' : undefined,
          paddingBottom: isMobile ? '0.25rem' : undefined
        }}>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, 'about')}
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: isMobile ? '0.95rem' : '1rem',
              transition: 'opacity 0.2s, color 0.2s',
              fontWeight: '500',
              cursor: 'pointer',
              padding: isMobile ? '0.6rem 0.75rem' : undefined,
              borderRadius: '8px'
            }}
            aria-label="About"
            onMouseEnter={(e) => { e.target.style.opacity = '0.7'; e.target.style.color = '#4EA8F8'; }}
            onMouseLeave={(e) => { e.target.style.opacity = '1'; e.target.style.color = '#fff'; }}
          >About </a>
          <a
            href="#education"
            onClick={(e) => handleNavClick(e, 'education')}
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: isMobile ? '0.95rem' : '1rem',
              transition: 'opacity 0.2s, color 0.2s',
              fontWeight: '500',
              cursor: 'pointer',
              padding: isMobile ? '0.6rem 0.75rem' : undefined,
              borderRadius: '8px'
            }}
            aria-label="Education"
            onMouseEnter={(e) => { e.target.style.opacity = '0.7'; e.target.style.color = '#4EA8F8'; }}
            onMouseLeave={(e) => { e.target.style.opacity = '1'; e.target.style.color = '#fff'; }}
          >Education</a>
          <a
            href="#experience"
            onClick={(e) => handleNavClick(e, 'experience')}
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: isMobile ? '0.95rem' : '1rem',
              transition: 'opacity 0.2s, color 0.2s',
              fontWeight: '500',
              cursor: 'pointer',
              padding: isMobile ? '0.6rem 0.75rem' : undefined,
              borderRadius: '8px'
            }}
            aria-label="Experience"
            onMouseEnter={(e) => { e.target.style.opacity = '0.7'; e.target.style.color = '#4EA8F8'; }}
            onMouseLeave={(e) => { e.target.style.opacity = '1'; e.target.style.color = '#fff'; }}
          >Experience</a>
          <a
            href="#skills"
            onClick={(e) => handleNavClick(e, 'skills')}
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: isMobile ? '0.95rem' : '1rem',
              transition: 'opacity 0.2s, color 0.2s',
              fontWeight: '500',
              cursor: 'pointer',
              padding: isMobile ? '0.6rem 0.75rem' : undefined,
              borderRadius: '8px'
            }}
            aria-label="Skills"
            onMouseEnter={(e) => { e.target.style.opacity = '0.7'; e.target.style.color = '#4EA8F8'; }}
            onMouseLeave={(e) => { e.target.style.opacity = '1'; e.target.style.color = '#fff'; }}
          >Skills</a>
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, 'projects')}
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: isMobile ? '0.95rem' : '1rem',
              transition: 'opacity 0.2s, color 0.2s',
              fontWeight: '500',
              cursor: 'pointer',
              padding: isMobile ? '0.6rem 0.75rem' : undefined,
              borderRadius: '8px'
            }}
            aria-label="Projects"
            onMouseEnter={(e) => { e.target.style.opacity = '0.7'; e.target.style.color = '#4EA8F8'; }}
            onMouseLeave={(e) => { e.target.style.opacity = '1'; e.target.style.color = '#fff'; }}
          >Projects</a>
          <a
            href="#coding-profiles"
            onClick={(e) => handleNavClick(e, 'coding-profiles')}
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: isMobile ? '0.95rem' : '1rem',
              transition: 'opacity 0.2s, color 0.2s',
              fontWeight: '500',
              cursor: 'pointer',
              padding: isMobile ? '0.6rem 0.75rem' : undefined,
              borderRadius: '8px'
            }}
            aria-label="Profiles"
            onMouseEnter={(e) => { e.target.style.opacity = '0.7'; e.target.style.color = '#4EA8F8'; }}
            onMouseLeave={(e) => { e.target.style.opacity = '1'; e.target.style.color = '#fff'; }}
          >Profiles</a>
        </div>
      </div>
    </nav>
  );
};
