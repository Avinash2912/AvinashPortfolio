import React, { useState, useEffect, useRef } from 'react';

const ROLES = [
  'Software Engineer',
  'Full Stack Developer',
  'Gen AI Enthusiast',
];

export const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef(null);

  // Cycle roles with fade-slide animation
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % ROLES.length);
        setAnimating(false);
      }, 350);
    }, 2800);
    return () => clearInterval(intervalRef.current);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '0 1.5rem',
      }}
    >
      <style>{`
        /* ── Keyframes ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes roleOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-14px); }
        }
        @keyframes roleIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Warm radial glow ── */
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.55; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 0.72; transform: translate(-50%, -50%) scale(1.05); }
        }
        .hero-glow {
          position: absolute;
          top: 46%; left: 50%;
          width: 760px; height: 440px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center,
            rgba(100, 22, 5, 0.72) 0%,
            rgba(70, 14, 3, 0.40) 35%,
            rgba(35, 7, 2, 0.12) 65%,
            transparent 80%
          );
          animation: pulseGlow 6s ease-in-out infinite;
          pointer-events: none;
          z-index: 1;
        }
        @keyframes avatarPop {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes badgePulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(224,90,28,0.35); }
          50%      { box-shadow: 0 0 0 6px rgba(224,90,28,0); }
        }


        /* ── Content wrapper ── */
        .hero-inner {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 860px;
          width: 100%;
          gap: 0;
          animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* ── Badge ── */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #e05a1c;
          margin-bottom: 1.6rem;
          animation: badgePulse 3s ease-in-out infinite;
        }
        .hero-badge .dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #e05a1c;
          display: inline-block;
        }

        /* ── Headline ── */
        .hero-h1 {
          font-size: clamp(2.6rem, 5.5vw, 3.75rem);
          font-weight: 400;
          line-height: 1.12;
          color: #ffffff;
          letter-spacing: -0.01em;
          margin-bottom: 1.5rem;
          font-family: 'Neue Machina', sans-serif;
          text-transform: capitalize;
        }
        .hero-h1 .name-highlight {
          color: #e05a1c;
        }
        /* Boxed/outlined role word */
        .role-box-wrapper {
          display: inline-block;
          position: relative;
        }
        .role-box {
          display: inline-block;
          border: 2px solid rgba(255,255,255,0.55);
          border-radius: 6px;
          padding: 0 0.35em;
          line-height: inherit;
          position: relative;
        }
        .role-text {
          display: inline-block;
          animation: roleIn 0.35s ease both;
        }
        .role-text.exit {
          animation: roleOut 0.35s ease both;
        }

        /* ── Sub-text ── */
        .hero-sub {
          font-size: clamp(1rem, 1.8vw, 1.125rem);
          font-weight: 400;
          color: rgba(255,255,255,0.52);
          max-width: 580px;
          line-height: 1.75;
          margin-bottom: 2rem;
          animation: fadeUp 1.1s 0.2s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* ── Social proof strip ── */
        .hero-social-proof {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 2.2rem;
          animation: fadeUp 1.1s 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }
        .avatar-stack {
          display: flex;
        }
        .avatar-item {
          width: 34px; height: 34px;
          border-radius: 50%;
          border: 2px solid #050505;
          object-fit: cover;
          margin-left: -10px;
          animation: avatarPop 0.4s ease both;
          background: #1a1a1a;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 700; color: #fff;
          flex-shrink: 0;
          overflow: hidden;
        }
        .avatar-item:first-child { margin-left: 0; }
        .social-proof-text {
          font-size: 0.9375rem;
          color: rgba(255,255,255,0.65);
          font-weight: 400;
        }
        .social-proof-text strong {
          color: #e05a1c;
          font-weight: 700;
        }

        /* ── CTA buttons ── */
        .hero-ctas {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          animation: fadeUp 1.1s 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        .btn-primary {
          padding: 0.85rem 2.2rem;
          background: #e05a1c;
          color: #fff;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 700;
          font-family: 'Neue Machina', sans-serif;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          letter-spacing: 0.01em;
          transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
          box-shadow: 0 6px 28px rgba(224,90,28,0.45);
        }
        .btn-primary:hover {
          background: #c44d15;
          transform: translateY(-2px);
          box-shadow: 0 10px 36px rgba(224,90,28,0.55);
        }
        .btn-secondary {
          padding: 0.85rem 2.2rem;
          background: transparent;
          color: rgba(255,255,255,0.75);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          font-family: 'Neue Machina', sans-serif;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: border-color 0.25s ease, color 0.25s ease, transform 0.2s ease, background 0.25s ease;
        }
        .btn-secondary:hover {
          border-color: rgba(255,255,255,0.5);
          color: #fff;
          background: rgba(255,255,255,0.05);
          transform: translateY(-2px);
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hero-h1 { letter-spacing: -0.01em; }
          .hero-inner { gap: 0; }
        }
        @media (max-width: 480px) {
          .hero-ctas { flex-direction: column; align-items: center; }
          .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
          .hero-glow { width: 420px; height: 320px; }
        }
      `}</style>

      {/* Warm glow */}
      <div className="hero-glow" aria-hidden="true" />

      {/* SVG: diagonal X-lines through center */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          zIndex: 2, pointerEvents: 'none', opacity: 0.11,
        }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0"    y1="0"   x2="1440" y2="900" stroke="white" strokeWidth="0.7"/>
        <line x1="1440" y1="0"   x2="0"    y2="900" stroke="white" strokeWidth="0.7"/>
        <line x1="0"    y1="150" x2="1290" y2="900" stroke="white" strokeWidth="0.45"/>
        <line x1="150"  y1="0"   x2="1440" y2="750" stroke="white" strokeWidth="0.45"/>
        <line x1="1440" y1="150" x2="150"  y2="900" stroke="white" strokeWidth="0.45"/>
        <line x1="1290" y1="0"   x2="0"    y2="750" stroke="white" strokeWidth="0.45"/>
      </svg>

      {/* Main content */}
      <div className="hero-inner">

        {/* Badge */}
        <div className="hero-badge">
          <span className="dot" />
          CODE.&nbsp; BUILD.&nbsp; GET HIRED.
          <span className="dot" />
        </div>

        {/* Headline */}
        <h1 className="hero-h1">
          Hi, I'm{' '}
          <span className="name-highlight">Avinash Jha</span>
          <br />
          The{' '}
          <span className="role-box-wrapper">
            <span className="role-box">
              <span className={`role-text${animating ? ' exit' : ''}`}>
                {ROLES[currentRole]}
              </span>
            </span>
          </span>
          <br />
          Companies Want To Hire!
        </h1>

        {/* Sub-text */}
        <p className="hero-sub">
          Building scalable web apps and intelligent systems — with a passion
          for clean code, great UX, and real-world impact.
        </p>

        {/* Social proof */}
        <div className="hero-social-proof">
          <div className="avatar-stack" aria-hidden="true">
            {/* Placeholder avatars with initials */}
            {[
              { bg: '#1a3a6e', initials: 'RK' },
              { bg: '#3a1a6e', initials: 'SP' },
              { bg: '#1a6e3a', initials: 'AM' },
              { bg: '#6e3a1a', initials: 'VN' },
            ].map((av, i) => (
              <div
                key={i}
                className="avatar-item"
                style={{
                  background: av.bg,
                  animationDelay: `${0.5 + i * 0.08}s`,
                }}
              >
                {av.initials}
              </div>
            ))}
          </div>
          <p className="social-proof-text">
            <strong>Open to Work</strong> · Available for full-time &amp; freelance roles
          </p>
        </div>

        {/* CTA buttons */}
        <div className="hero-ctas">
          <button
            className="btn-primary"
            onClick={() => scrollToSection('projects')}
            id="hero-view-work-btn"
          >
            View My Work →
          </button>
          <a
            href="https://drive.google.com/file/d/1wf3vZNyKhdNjGOcV7okkZttKeg-0hWkW/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            id="hero-resume-btn"
          >
            Download Resume ↗
          </a>
        </div>
      </div>
    </div>
  );
};
