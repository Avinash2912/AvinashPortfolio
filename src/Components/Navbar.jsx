import React from 'react';

export const Navbar = () => {
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
      top: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      width: '50vw',
      maxWidth: '1200px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '3rem',
        padding: '1rem 2rem',
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
          gap: '2rem',
          alignItems: 'center'
        }}>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, 'about')}
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '1rem',
              transition: 'opacity 0.2s, color 0.2s',
              fontWeight: '500',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => { e.target.style.opacity = '0.7'; e.target.style.color = 'blue'; }}
            onMouseLeave={(e) => { e.target.style.opacity = '1'; e.target.style.color = '#fff'; }}
          >About </a>
          <a
            href="#education"
            onClick={(e) => handleNavClick(e, 'education')}
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '1rem',
              transition: 'opacity 0.2s, color 0.2s',
              fontWeight: '500',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => { e.target.style.opacity = '0.7'; e.target.style.color = 'blue'; }}
            onMouseLeave={(e) => { e.target.style.opacity = '1'; e.target.style.color = '#fff'; }}
          >Education</a>
          <a
            href="#experience"
            onClick={(e) => handleNavClick(e, 'experience')}
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '1rem',
              transition: 'opacity 0.2s, color 0.2s',
              fontWeight: '500',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => { e.target.style.opacity = '0.7'; e.target.style.color = 'blue'; }}
            onMouseLeave={(e) => { e.target.style.opacity = '1'; e.target.style.color = '#fff'; }}
          >Experience</a>
          <a
            href="#skills"
            onClick={(e) => handleNavClick(e, 'skills')}
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '1rem',
              transition: 'opacity 0.2s, color 0.2s',
              fontWeight: '500',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => { e.target.style.opacity = '0.7'; e.target.style.color = 'blue'; }}
            onMouseLeave={(e) => { e.target.style.opacity = '1'; e.target.style.color = '#fff'; }}
          >Skills</a>
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, 'projects')}
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '1rem',
              transition: 'opacity 0.2s, color 0.2s',
              fontWeight: '500',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => { e.target.style.opacity = '0.7'; e.target.style.color = 'blue'; }}
            onMouseLeave={(e) => { e.target.style.opacity = '1'; e.target.style.color = '#fff'; }}
          >Projects</a>
          <a
            href="#coding-profiles"
            onClick={(e) => handleNavClick(e, 'coding-profiles')}
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '1rem',
              transition: 'opacity 0.2s, color 0.2s',
              fontWeight: '500',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => { e.target.style.opacity = '0.7'; e.target.style.color = 'blue'; }}
            onMouseLeave={(e) => { e.target.style.opacity = '1'; e.target.style.color = '#fff'; }}
          >Profiles</a>
        </div>
      </div>
    </nav>
  );
};
