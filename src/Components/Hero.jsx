import React, { useState, useEffect } from 'react';
import { GridScan } from './GridScan';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

export const Hero = () => {
  const [copied, setCopied] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(0);
  
  const titles = [
    { text: 'Software Engineer', color: '#3e94fd' },
    { text: 'Full Stack Developer', color: '#00d4ff' },
    { text: 'Gen AI Enthusiast', color: '#00C8FF' }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000); // Change every 3 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('avinashjha19@outlook.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh',
      position: 'relative',
      background: 'linear-gradient(135deg, #041b5c 0%, #05279b 50%, #3e94fd 100%)'
    }}>
      {/* GridScan Background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <GridScan
          sensitivity={0}
          lineThickness={1}
          linesColor="#3e94fd"
          gridScale={0.1}
          scanColor="#3e94fd"
          scanOpacity={0.6}
          enablePost
          bloomIntensity={0.8}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>

      {/* Hero Content */}
      <div className="hero-content" style={{
        position: 'relative',
        zIndex: 10,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 2rem',
        textAlign: 'center'
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1.5rem',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '50px',
          color: '#fff',
          fontSize: '0.9rem',
          marginBottom: '2rem'
        }}>
          <span style={{ fontSize: '1.6rem' }}>👨‍💻</span>
          <span style={{ color: '#ff8c42' }}>Software Engineer</span>
        </div>

        {/* Main Heading */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: '700',
          color: '#fff',
          lineHeight: '1.2',
          marginBottom: '2rem',
          maxWidth: '900px',
          animation: 'zoomFromDepth 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          opacity: 0,
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}>
          Hi, I'm <span style={{ color: '#00ed64' }}>Avinash Jha</span>
          <br />
          <span key={currentTitle} style={{
            display: 'inline-block',
            animation: 'fadeInSlide 0.6s ease-out',
            color: titles[currentTitle].color,
            textShadow: `0 0 20px ${titles[currentTitle].color}40`
          }}>
            {titles[currentTitle].text}
          </span>
        </h1>
        <style>{`
          @keyframes zoomFromDepth {
            0% {
              opacity: 0;
              transform: translateZ(-1000px) scale(0.1);
              filter: blur(10px);
            }
            50% {
              opacity: 0.5;
              filter: blur(5px);
            }
            80% {
              transform: translateZ(50px) scale(1.05);
              filter: blur(0px);
            }
            100% {
              opacity: 1;
              transform: translateZ(0) scale(1);
              filter: blur(0px);
            }
          }
          @keyframes fadeInSlide {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .email-button:hover:not(.copied) {
            background: #3e94fd !important;
            color: #fff !important;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(62, 148, 253, 0.4);
          }
          .email-button.copied {
            background: #22c55e !important;
            color: #fff !important;
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4) !important;
          }
          .resume-button:hover {
            background: rgba(62, 148, 253, 0.3) !important;
            border-color: rgba(62, 148, 253, 0.6) !important;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(62, 148, 253, 0.4);
          }

          /* Push content a bit lower on medium and small screens */
          @media (max-width: 1024px) {
            .hero-content { padding-top: 10vh; }
          }
          @media (max-width: 768px) {
            .hero-content { padding-top: 14vh; }
          }
          @media (max-width: 640px) {
            .hero-content { padding-top: 18vh; }
          }
        `}</style>

        {/* Buttons */}
        <div className="hero-buttons" style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '1rem'
        }}>
          <button 
            onClick={handleCopyEmail}
            className={`email-button ${copied ? 'copied' : ''}`}
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1rem',
              fontWeight: '500',
              color: copied ? '#fff' : '#041b5c',
              background: copied ? '#22c55e' : '#fff',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: copied ? '0 4px 15px rgba(34, 197, 94, 0.4)' : '0 4px 15px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
            <span>avinashjha19@outlook.com</span>
            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
          </button>
          {/*
            Resume link: replace the `href` below with a shareable Drive file link
            (Open the file in Drive → Share → Get link → set to "Anyone with the link" → Copy link).
            The current href points to the Drive home. Replace with your file's share URL so users see the resume directly.
          */}
          <a
            className="resume-button"
            href="https://drive.google.com/file/d/1wf3vZNyKhdNjGOcV7okkZttKeg-0hWkW/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            style={{
              padding: '1.2rem 3rem',
              fontSize: '1.1rem',
              fontWeight: '500',
              color: '#fff',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none'
            }}
          >
            Resume
          </a>
        </div>
      </div>
    </div>
  );
};
