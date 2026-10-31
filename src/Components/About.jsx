import React, { useState, useEffect, useRef } from 'react';

const TABS = {
  profile: [
    { key: 'name',       val: '"Avinash Jha"'               },
    { key: 'role',       val: '"Associate Developer"'        },
    { key: 'university', val: '"GGSIPU, Delhi"'              },
    { key: 'stack',      val: '"MERN · Gen AI · DSA"'        },
    { key: 'status',     val: '"Open to Work 🟢"'             },
  ],
  values: [
    { key: '0', val: '"Collaboration"'       },
    { key: '1', val: '"Continuous Learning"' },
    { key: '2', val: '"Meaningful Impact"'   },
    { key: '3', val: '"Mentorship"'          },
  ],
  goals: [
    { key: 'seeking',   val: '"SDE & Full Stack Roles"'     },
    { key: 'passion',   val: '"Building Scalable Products"' },
    { key: 'available', val: '"Full-time & Freelance"'      },
  ],
};

const BARCODE_HEIGHTS = [3, 5, 2, 4, 3, 2, 5, 3, 4, 2, 3, 5, 2, 4, 3];

export default function About() {
  const [inView,    setInView]    = useState(false);
  const [cardReady, setCardReady] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setCardReady(true), 500);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ background: '#000', padding: '7rem 2rem', position: 'relative', overflow: 'hidden' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

        /* ═══════════════════════════════════════
           BACKGROUND GLOW
        ═══════════════════════════════════════ */
        .about-glow {
          position: absolute;
          top: 40%; left: 60%;
          transform: translate(-50%, -50%);
          width: 800px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center,
            rgba(100,22,5,0.45) 0%,
            rgba(65,12,3,0.22)  38%,
            rgba(30,6,1,0.08)   65%,
            transparent 80%
          );
          filter: blur(32px);
          pointer-events: none;
          z-index: 0;
          animation: aboutGlowPulse 8s ease-in-out infinite;
        }
        @keyframes aboutGlowPulse {
          0%,100% { opacity: 0.8; transform: translate(-50%,-50%) scale(1);    }
          50%      { opacity: 1;   transform: translate(-50%,-50%) scale(1.06); }
        }

        /* ═══════════════════════════════════════
           KEYFRAMES
        ═══════════════════════════════════════ */
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(48px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes revealLeft {
          from { opacity: 0; transform: translateX(-52px); }
          to   { opacity: 1; transform: translateX(0);      }
        }
        @keyframes revealRight {
          from { opacity: 0; transform: translateX(52px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        @keyframes dotPulse {
          0%,100% { box-shadow: 0 0 5px rgba(74,222,128,0.5); }
          50%      { box-shadow: 0 0 16px rgba(74,222,128,1);  }
        }
        @keyframes swing {
          0%,100% { transform: rotate(-2deg); }
          50%      { transform: rotate(2deg);  }
        }
        @keyframes cardDropIn {
          from { opacity: 0; transform: translateY(-40px) rotate(-2deg); }
          to   { opacity: 1; transform: translateY(0)     rotate(-2deg); }
        }
        @keyframes lanyardDrop {
          from { opacity: 0; transform: scaleY(0); transform-origin: top; }
          to   { opacity: 1; transform: scaleY(1); transform-origin: top; }
        }
        @keyframes statusPulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }

        /* ═══════════════════════════════════════
           LAYOUT
        ═══════════════════════════════════════ */
        .about-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 4rem;
          align-items: start;
        }
        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr; gap: 3rem; }
        }

        /* ═══════════════════════════════════════
           HEADER
        ═══════════════════════════════════════ */
        .about-header {
          margin-bottom: 3.8rem;
          opacity: 0;
        }
        .about-header.in {
          animation: revealUp 0.85s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .about-eyebrow {
          font-size: 0.7rem;
          font-family: 'Manrope', sans-serif;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #e05a1c;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .about-eyebrow::before, .about-eyebrow::after {
          content: '';
          display: inline-block;
          width: 28px; height: 1px;
          background: #e05a1c; opacity: 0.55;
        }
        .about-heading {
          font-size: clamp(2.5rem, 4.8vw, 3.6rem);
          font-weight: 400;
          color: #fff;
          font-family: 'Neue Machina', sans-serif;
          letter-spacing: -0.02em;
          margin-bottom: 0.8rem;
          text-transform: capitalize;
          line-height: 1.08;
        }
        .about-heading span { color: #e05a1c; }
        .about-divider {
          width: 44px; height: 2px;
          background: linear-gradient(90deg, #e05a1c 0%, transparent 100%);
          border-radius: 2px;
        }

        /* ═══════════════════════════════════════
           LEFT COL
        ═══════════════════════════════════════ */
        .about-left {
          opacity: 0;
        }
        .about-left.in {
          animation: revealLeft 0.9s 0.18s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .about-bio {
          font-size: 0.9rem;
          font-family: 'Manrope', sans-serif;
          font-weight: 400;
          color: rgba(255,255,255,0.52);
          line-height: 1.9;
          margin-bottom: 1.8rem;
        }
        .about-bio strong {
          color: rgba(255,255,255,0.88);
          font-weight: 600;
        }

        /* ═══════════════════════════════════════
           RIGHT COL — ID CARD
        ═══════════════════════════════════════ */
        .about-right {
          opacity: 0;
        }
        .about-right.in {
          animation: revealRight 0.9s 0.32s cubic-bezier(0.22,1,0.36,1) forwards;
        }

        /* ── Lanyard wrapper ── */
        .id-scene {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 0;
          margin-top: -88px;
        }

        /* Lanyard string */
        .lanyard-strings {
          display: flex;
          gap: 18px;
          animation: lanyardDrop 0.6s 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        .lanyard-string {
          width: 1.5px;
          height: 44px;
          background: linear-gradient(to bottom, rgba(224,90,28,0.6), rgba(224,90,28,0.15));
        }

        /* Lanyard clip */
        .lanyard-clip {
          width: 20px;
          height: 10px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 3px;
          margin: 0 auto;
          animation: lanyardDrop 0.6s 0.4s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* Lanyard top bar */
        .lanyard-bar {
          width: 80px;
          height: 6px;
          background: linear-gradient(90deg, #c0391a, #e05a1c, #c0391a);
          border-radius: 3px;
          margin-bottom: 2px;
          animation: lanyardDrop 0.5s 0.3s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* ── The Card ── */
        .id-card {
          width: 280px;
          margin-top: 0;
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          overflow: hidden;
          animation: cardDropIn 0.8s 0.7s cubic-bezier(0.16,1,0.3,1) both,
                     swing 5s 1.5s ease-in-out infinite;
          transform-origin: top center;
          box-shadow:
            0 2px 0 rgba(224,90,28,0.2),
            0 20px 60px rgba(0,0,0,0.7),
            0 0 0 1px rgba(224,90,28,0.05);
        }

        /* Card top accent strip */
        .id-card-topstrip {
          height: 3px;
          background: linear-gradient(90deg, #e05a1c 0%, #c0391a 50%, transparent 100%);
        }

        /* Card header */
        .id-card-header {
          background: #111;
          padding: 1.25rem 1.25rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          position: relative;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        /* Org label */
        .id-org {
          font-size: 0.6rem;
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          align-self: flex-start;
        }

        /* Avatar */
        .id-avatar {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: #1a1a1a;
          border: 2px solid rgba(224,90,28,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          font-family: 'Manrope', sans-serif;
          color: #e05a1c;
          position: relative;
        }
        .id-avatar::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1px solid rgba(224,90,28,0.15);
        }

        /* Name */
        .id-name {
          font-size: 1.15rem;
          font-family: 'Neue Machina', sans-serif;
          font-weight: 400;
          color: #fff;
          letter-spacing: -0.01em;
          text-align: center;
        }

        /* Role badge */
        .id-role-badge {
          background: rgba(224,90,28,0.12);
          border: 1px solid rgba(224,90,28,0.25);
          border-radius: 20px;
          padding: 0.2rem 0.75rem;
          font-size: 0.65rem;
          font-family: 'Manrope', sans-serif;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #e05a1c;
        }

        /* Chip */
        .id-chip {
          position: absolute;
          top: 1.1rem;
          right: 1.1rem;
          width: 28px;
          height: 24px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 3px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          padding: 3px;
        }
        .id-chip-cell {
          background: rgba(255,255,255,0.1);
          border-radius: 1px;
        }
        .id-chip-cell:first-child {
          background: transparent;
          border: 0;
        }

        /* Card body */
        .id-card-body {
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }
        .id-field {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .id-field-label {
          font-size: 0.58rem;
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.22);
        }
        .id-field-value {
          font-size: 0.8rem;
          font-family: 'Manrope', sans-serif;
          font-weight: 500;
          color: rgba(255,255,255,0.78);
        }
        .id-chip-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.45rem;
          margin-top: 0.15rem;
        }
        .id-chip-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(224,90,28,0.28);
          background: rgba(224,90,28,0.08);
          color: #f2b38d;
          padding: 0.26rem 0.58rem;
          font-size: 0.64rem;
          font-family: 'Manrope', sans-serif;
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: 0.01em;
          min-height: 24px;
        }
        .id-chip-badge.primary {
          width: 100%;
          justify-content: center;
          padding: 0.38rem 0.75rem;
          background: rgba(224,90,28,0.14);
          border-color: rgba(224,90,28,0.34);
          min-height: 28px;
        }
        .id-chip-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.38rem;
          width: 100%;
        }
        .id-chip-row .id-chip-badge {
          width: 100%;
        }
        .id-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin: 0.1rem 0;
        }

        /* Card footer */
        .id-card-footer {
          background: rgba(255,255,255,0.02);
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 0.7rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .id-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.68rem;
          font-family: 'Manrope', sans-serif;
          font-weight: 600;
          color: #4ade80;
          letter-spacing: 0.03em;
        }
        .id-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4ade80;
          animation: statusPulse 2s ease-in-out infinite;
          box-shadow: 0 0 6px rgba(74,222,128,0.6);
        }

        .id-profile-links {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }
        .id-profile-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          color: #f0a56f;
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }
        .id-profile-link:hover,
        .id-profile-link:focus-visible {
          transform: translateY(-1px);
          border-color: rgba(224,90,28,0.32);
          background: rgba(224,90,28,0.06);
          outline: none;
        }
        .id-profile-link svg {
          width: 13px;
          height: 13px;
          fill: currentColor;
        }

        /* Barcode */
        .id-barcode {
          display: flex;
          gap: 1.5px;
          align-items: flex-end;
          height: 22px;
        }
        .id-bar {
          background: rgba(255,255,255,0.2);
          border-radius: 1px;
        }

      `}</style>

      <div className="about-glow" aria-hidden="true" />

      {/* Animated X lines */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          zIndex: 0, pointerEvents: 'none',
        }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="xline-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="white" stopOpacity="0.10" />
            <stop offset="35%"  stopColor="white" stopOpacity="0.03" />
            <stop offset="65%"  stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="xline-mask">
            <rect width="100%" height="100%" fill="url(#xline-fade)" />
          </mask>
        </defs>
        <g mask="url(#xline-mask)">
          <line x1="0"    y1="0"   x2="1440" y2="900" stroke="white" strokeWidth="0.8"/>
          <line x1="1440" y1="0"   x2="0"    y2="900" stroke="white" strokeWidth="0.8"/>
          <line x1="0"    y1="150" x2="1290" y2="900" stroke="white" strokeWidth="0.45"/>
          <line x1="150"  y1="0"   x2="1440" y2="750" stroke="white" strokeWidth="0.45"/>
          <line x1="1440" y1="150" x2="150"  y2="900" stroke="white" strokeWidth="0.45"/>
          <line x1="1290" y1="0"   x2="0"    y2="750" stroke="white" strokeWidth="0.45"/>
        </g>
      </svg>

      {/* Radial light rays */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          zIndex: 0, pointerEvents: 'none',
        }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="ray-fade" cx="62%" cy="40%" r="70%">
            <stop offset="0%"   stopColor="white" stopOpacity="0"    />
            <stop offset="30%"  stopColor="white" stopOpacity="0.07" />
            <stop offset="70%"  stopColor="white" stopOpacity="0.04" />
            <stop offset="100%" stopColor="white" stopOpacity="0"    />
          </radialGradient>
          <mask id="ray-mask">
            <rect width="100%" height="100%" fill="url(#ray-fade)" />
          </mask>
        </defs>
        <g mask="url(#ray-mask)" stroke="white" strokeWidth="0.6" opacity="0.9">
          {Array.from({ length: 24 }, (_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            const ox = 900, oy = 360;
            const len = 1400;
            return (
              <line
                key={i}
                x1={ox} y1={oy}
                x2={ox + len * Math.cos(angle)}
                y2={oy + len * Math.sin(angle)}
              />
            );
          })}
        </g>
      </svg>

      <div className="about-inner">

        {/* Header */}
        <div className={`about-header${inView ? ' in' : ''}`}>
          <div className="about-eyebrow">Who I Am</div>
          <h2 className="about-heading">About <span>Me</span></h2>
          <div className="about-divider" />
        </div>

        <div className="about-grid">

          {/* Left — Bio */}
          <div className={`about-left${inView ? ' in' : ''}`}>
            <p className="about-bio">
              I’m <strong>Avinash Jha</strong>, a <strong>software developer</strong> focused on building scalable web applications and
              practical digital products that solve real problems. My work spans <strong>full-stack development</strong>,
              <strong>AI-powered solutions</strong>, and <strong>enterprise application engineering</strong>, with an emphasis on building
              reliable systems that are both technically strong and user-friendly.
              <br /><br />
              I have hands-on experience with the <strong>MERN stack</strong>, <strong>Python</strong>, <strong>Workday Extend</strong>, and
              modern web technologies, helping build efficient interfaces, robust backend systems, and business-impactful features. I enjoy
              working across the full product lifecycle—from understanding requirements and designing solutions to shipping and improving
              production-ready software.
              <br /><br />
              I continuously strengthen my fundamentals in <strong>Data Structures &amp; Algorithms</strong>, <strong>system design</strong>,
              and backend architecture so I can contribute effectively to fast-moving engineering teams and build software that scales with
              real-world demand.
            </p>
          </div>

          {/* Right — ID Card */}
          <div className={`about-right${inView ? ' in' : ''}`}>
            <div className="id-scene">

              {/* Lanyard top bar */}
              <div className="lanyard-bar" />

              {/* Lanyard clip */}
              <div className="lanyard-clip" />

              {/* Lanyard strings */}
              <div className="lanyard-strings">
                <div className="lanyard-string" />
                <div className="lanyard-string" />
              </div>

              {/* ID Card */}
              <div className="id-card">

                {/* Top accent */}
                <div className="id-card-topstrip" />

                {/* Header */}
                <div className="id-card-header">
                  <div className="id-org">Developer</div>

                  {/* Chip (top-right corner) */}
                  <div className="id-chip" aria-hidden="true">
                    <div className="id-chip-cell" />
                    <div className="id-chip-cell" />
                    <div className="id-chip-cell" />
                    <div className="id-chip-cell" />
                    <div className="id-chip-cell" />
                    <div className="id-chip-cell" />
                    <div className="id-chip-cell" />
                    <div className="id-chip-cell" />
                    <div className="id-chip-cell" />
                  </div>

                  <div className="id-avatar">
                    <img
                      src="/PIC.jpeg"
                      alt="Avinash Jha"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        display: 'block',
                        borderRadius: '50%'
                      }}
                    />
                  </div>
                  <div className="id-name">Avinash Jha</div>
                  <div className="id-role-badge">Associate Developer</div>
                </div>

                {/* Body */}
                <div className="id-card-body">
                  <div className="id-field">
                    <div className="id-field-label">Stack</div>
                    <div className="id-chip-group">
                      <span className="id-chip-badge primary">Full Stack Development</span>
                      <div className="id-chip-row">
                        <span className="id-chip-badge">Agentic AI</span>
                        <span className="id-chip-badge">Gen AI</span>
                        <span className="id-chip-badge">Workday Extend</span>
                        <span className="id-chip-badge">Python</span>
                        <span className="id-chip-badge">MERN</span>
                        <span className="id-chip-badge">DSA</span>
                      </div>
                    </div>
                  </div>
                  <div className="id-divider" />
                  <div className="id-field">
                    <div className="id-field-label">Location</div>
                    <div className="id-field-value">New Delhi, India</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="id-card-footer">
                  <div className="id-status">
                    <div className="id-status-dot" />
                    Open to Work
                  </div>

                  <div className="id-profile-links" aria-label="Profile links">
                    <a
                      className="id-profile-link"
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn profile"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.4a1.56 1.56 0 0 1 0 3.1ZM5.5 9.83h2.9v9.67H5.5V9.83Zm5.2 0h2.78v1.32h.04c.39-.74 1.34-1.52 2.76-1.52 2.95 0 3.49 1.94 3.49 4.46v6.41h-2.9v-6c0-1.43-.03-3.28-2-3.28-2 0-2.31 1.56-2.31 3.17v6.11H10.7V9.83Z"/>
                      </svg>
                    </a>
                    <a
                      className="id-profile-link"
                      href="https://github.com/Avinash2912"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub profile"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 .5A12 12 0 0 0 8.21 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.26 1.84 1.26 1.07 1.83 2.8 1.3 3.47.99.11-.78.42-1.3.77-1.6-2.66-.3-5.46-1.33-5.46-5.92 0-1.31.46-2.38 1.22-3.22-.12-.3-.53-1.54.12-3.2 0 0 1-.32 3.3 1.23a11.3 11.3 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.9.12 3.2.76.84 1.22 1.91 1.22 3.22 0 4.6-2.81 5.61-5.49 5.91.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"/>
                      </svg>
                    </a>
                    <a
                      className="id-profile-link"
                      href="https://leetcode.com/u/Avinash_1912/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LeetCode profile"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.3 2.13a1.2 1.2 0 0 1 1.67 0l3.92 3.98a1.2 1.2 0 0 1-.04 1.72l-2.02 1.8a1.2 1.2 0 0 1-1.64.02l-1.43-1.2-1.44 1.3a1.2 1.2 0 0 1-1.66-.02L7.46 7.84a1.2 1.2 0 0 1-.05-1.72l3.88-3.99Zm-2.17 8.2 1.15 1.04-1.15 1.02a1.2 1.2 0 0 0 0 1.72l1.15 1.02-1.15 1.02a1.2 1.2 0 0 0 0 1.72l1.15 1.02-1.15 1.02a1.2 1.2 0 0 0 0 1.72l1.57 1.38a1.2 1.2 0 0 0 1.66 0l4.86-4.3a1.2 1.2 0 0 0 0-1.72l-4.89-4.33a1.2 1.2 0 0 0-1.64 0l-1.56 1.38a1.2 1.2 0 0 0 0 1.72Zm5.35 1.59 1.16 1.04-1.16 1.03-1.15-1.03 1.15-1.04Zm-1.15 4.11 1.15 1.03-1.15 1.04-1.16-1.04 1.16-1.03Z"/>
                      </svg>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}