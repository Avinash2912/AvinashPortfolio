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

export default function About() {
  const [inView,     setInView]     = useState(false);
  const [macOpen,    setMacOpen]    = useState(false);
  const [typed,      setTyped]      = useState('');
  const [typedRole,  setTypedRole]  = useState('');
  const [showRole,   setShowRole]   = useState(false);
  const [showStack,  setShowStack]  = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Open mac when section enters view
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setMacOpen(true), 400);
    return () => clearTimeout(t);
  }, [inView]);

  // Type name after mac opens
  useEffect(() => {
    if (!macOpen) return;
    const NAME = 'Avinash Jha';
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setTyped(NAME.slice(0, i));
        if (i >= NAME.length) { clearInterval(iv); setShowRole(true); }
      }, 75);
      return () => clearInterval(iv);
    }, 1700);
    return () => clearTimeout(t);
  }, [macOpen]);

  // Type role
  useEffect(() => {
    if (!showRole) return;
    const ROLE = 'Associate Developer';
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setTypedRole(ROLE.slice(0, i));
        if (i >= ROLE.length) { clearInterval(iv); setShowStack(true); }
      }, 55);
      return () => clearInterval(iv);
    }, 350);
    return () => clearTimeout(t);
  }, [showRole]);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ background: '#000', padding: '7rem 2rem', position: 'relative', overflow: 'hidden' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

        /* ═══════════════════════════════════════
           BACKGROUND
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
        @keyframes borderGlow {
          0%,100% { box-shadow: 0 0 0 1px rgba(224,90,28,0.12), 0 20px 50px rgba(0,0,0,0.5); }
          50%      { box-shadow: 0 0 0 1px rgba(224,90,28,0.28), 0 28px 64px rgba(0,0,0,0.6); }
        }
        @keyframes dotPulse {
          0%,100% { box-shadow: 0 0 5px rgba(74,222,128,0.5); }
          50%      { box-shadow: 0 0 16px rgba(74,222,128,1);  }
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
           RIGHT COL — MACBOOK
        ═══════════════════════════════════════ */
        .about-right {
          opacity: 0;
        }
        .about-right.in {
          animation: revealRight 0.9s 0.32s cubic-bezier(0.22,1,0.36,1) forwards;
        }

        /* MacBook 3D — Space Gray */
        .macbook-scene {
          perspective: 1600px;
          perspective-origin: 50% -20%;
          padding-top: 1rem;
        }
        .macbook-3d {
          width: 100%;
          max-width: 440px;
          margin: 0 auto;
          transform-style: preserve-3d;
          transform: rotateX(6deg);
        }

        /* ── LID ── */
        .mac-lid {
          position: relative;
          background: linear-gradient(170deg,
            #4a4a4a 0%, #3a3a3a 30%,
            #2e2e2e 70%, #252525 100%
          );
          border-radius: 12px 12px 2px 2px;
          padding: 8px 8px 5px;
          transform-origin: bottom center;
          transform: rotateX(86deg);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.12),
            inset 0 -1px 0 rgba(0,0,0,0.4),
            0 -4px 20px rgba(0,0,0,0.5);
          z-index: 2;
        }
        .mac-lid.open {
          animation: macLidOpen 1.5s 0.4s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes macLidOpen {
          0%   { transform: rotateX(86deg); }
          100% { transform: rotateX(-22deg); }
        }

        /* Apple logo hint */
        .mac-logo {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 28px; height: 28px;
          opacity: 0.12;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
          border-radius: 50%;
        }

        /* Screen bezel */
        .mac-bezel {
          background: #0d0d0d;
          border-radius: 6px;
          aspect-ratio: 16 / 10;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.04);
        }
        /* Screen glow */
        .mac-bezel::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 60%,
            rgba(224,90,28,0.06) 0%,
            transparent 65%
          );
          pointer-events: none;
          z-index: 0;
        }
        /* Subtle screen glare */
        .mac-bezel::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 35%;
          background: linear-gradient(to bottom,
            rgba(255,255,255,0.025) 0%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 0;
          border-radius: 6px 6px 0 0;
        }

        /* Camera */
        .mac-camera {
          position: absolute;
          top: -16px; left: 50%; transform: translateX(-50%);
          width: 6px; height: 6px;
          background: #222;
          border-radius: 50%;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.05);
        }

        /* Screen content */
        .mac-screen-content {
          position: relative;
          z-index: 1;
          opacity: 0;
          padding: 1rem 1.3rem;
          height: 100%;
          box-sizing: border-box;
        }
        .mac-lid.open .mac-screen-content {
          animation: screenFadeIn 0.6s 1.8s ease forwards;
        }
        @keyframes screenFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .mac-line {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          color: rgba(255,255,255,0.28);
          font-size: 0.7rem;
          font-family: 'Manrope', sans-serif;
          margin-bottom: 0.25rem;
        }
        .mac-prompt { color: #e05a1c; font-weight: 600; }
        .mac-output-name {
          font-family: 'Neue Machina', sans-serif;
          font-size: clamp(1.3rem, 2.5vw, 1.6rem);
          font-weight: 400;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 0.15rem;
          min-height: 1.9rem;
          text-shadow: 0 0 20px rgba(224,90,28,0.3);
        }
        .mac-output-role {
          font-size: 0.78rem;
          font-family: 'Manrope', sans-serif;
          color: #e05a1c;
          min-height: 1.1rem;
          margin-bottom: 0.1rem;
        }
        .mac-output-stack {
          font-size: 0.68rem;
          font-family: 'Manrope', sans-serif;
          color: rgba(255,255,255,0.35);
          margin-top: 0.5rem;
          letter-spacing: 0.05em;
        }
        .mac-cursor {
          display: inline-block;
          width: 1.5px; height: 0.9em;
          background: #e05a1c;
          margin-left: 1px;
          vertical-align: middle;
          animation: cursorBlink 0.85s step-end infinite;
        }
        @keyframes cursorBlink {
          0%,100% { opacity: 1; } 50% { opacity: 0; }
        }

        /* ── HINGE ── */
        .mac-hinge {
          height: 4px;
          background: linear-gradient(to bottom, #1a1a1a, #141414);
          position: relative;
          z-index: 3;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.03),
            0 -1px 0 rgba(0,0,0,0.6);
        }

        /* ── BASE / KEYBOARD ── */
        .mac-base {
          background: linear-gradient(180deg,
            #3e3e3e 0%, #353535 40%,
            #2d2d2d 100%
          );
          border-radius: 0 0 10px 10px;
          position: relative;
          padding: 10px 14px 7px;
          box-shadow:
            0 14px 50px rgba(0,0,0,0.8),
            0 4px 16px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }
        /* Keyboard rows */
        .mac-kbd-rows {
          display: flex;
          flex-direction: column;
          gap: 3px;
          opacity: 0.25;
          margin-bottom: 5px;
        }
        .mac-kbd-row {
          display: flex;
          gap: 2.5px;
          justify-content: center;
        }
        .mac-key {
          height: 5px;
          background: rgba(255,255,255,0.15);
          border-radius: 1.5px;
          flex: 1;
          max-width: 22px;
        }
        .mac-key.wide  { max-width: 36px; }
        .mac-key.space { max-width: 100px; }
        /* Trackpad */
        .mac-trackpad {
          width: 80px; height: 8px;
          background: rgba(255,255,255,0.07);
          border-radius: 3px;
          margin: 0 auto;
          border: 1px solid rgba(255,255,255,0.04);
        }
        /* Base glow */
        .mac-glow-bottom {
          width: 70%; height: 18px;
          margin: 0 auto;
          background: radial-gradient(ellipse,
            rgba(224,90,28,0.18) 0%, transparent 70%
          );
          filter: blur(6px);
          margin-top: 2px;
        }
        .terminal-card {
          background: #080808;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          overflow: hidden;
          animation: borderGlow 5s ease-in-out infinite;
        }
        .terminal-bar {
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 0.85rem 1.4rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .tbar-dot {
          width: 11px; height: 11px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .tbar-title {
          font-size: 0.72rem;
          font-family: 'Manrope', sans-serif;
          font-weight: 400;
          color: rgba(255,255,255,0.25);
          margin-left: auto;
          letter-spacing: 0.04em;
        }
        .terminal-tabs {
          display: flex;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 0 1.4rem;
        }
        .term-tab {
          font-size: 0.74rem;
          font-family: 'Manrope', sans-serif;
          font-weight: 400;
          color: rgba(255,255,255,0.32);
          padding: 0.7rem 1rem;
          cursor: pointer;
          border: none;
          border-bottom: 2px solid transparent;
          background: none;
          transition: color 0.22s, border-color 0.22s;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }
        .term-tab:hover { color: rgba(255,255,255,0.58); }
        .term-tab.active { color: #e05a1c; border-bottom-color: #e05a1c; }

        .terminal-body {
          padding: 1.5rem 1.7rem;
          font-family: 'Manrope', sans-serif;
          font-size: 0.8rem;
          font-weight: 400;
          line-height: 1;
          min-height: 220px;
        }
        .term-prompt { color: rgba(224,90,28,0.7); user-select: none; }
        .term-cmd    { color: rgba(255,255,255,0.38); }
        .term-row {
          display: flex;
          gap: 1.2rem;
          padding: 0.55rem 0.5rem;
          border-radius: 6px;
          transition: background 0.2s;
        }
        .term-row:hover { background: rgba(255,255,255,0.03); }
        .term-key { color: rgba(255,255,255,0.26); min-width: 100px; flex-shrink: 0; }
        .term-val { color: #cfb98a; }

        .terminal-footer {
          background: rgba(224,90,28,0.04);
          border-top: 1px solid rgba(224,90,28,0.09);
          padding: 0.7rem 1.7rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.7rem;
          font-family: 'Manrope', sans-serif;
          font-weight: 400;
          color: rgba(255,255,255,0.25);
        }
        .footer-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #4ade80;
          flex-shrink: 0;
          animation: dotPulse 2.2s ease-in-out infinite;
        }
      `}</style>

      {/* ── Background warm glow ── */}
      <div className="about-glow" aria-hidden="true" />

      {/* ── X-lines at top edge ── */}
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

      {/* ── Radial light rays ── */}
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

          {/* ── Left ── */}
          <div className={`about-left${inView ? ' in' : ''}`}>
            <p className="about-bio">
              Hi there! 👋 I’m <strong>Avinash Jha</strong>, an <strong>Associate Developer</strong> based in{' '}
              <strong>New Delhi</strong>. I build full-stack web applications with the <strong>MERN stack</strong> and enjoy
              turning complex requirements into clean, reliable, user-friendly products. I care about
              <strong> modern UI</strong> craftsmanship—responsive layouts, smooth interactions, and thoughtful
              details that make interfaces feel premium.
              <br />
              <br />
              Beyond the frontend, I work comfortably with APIs, databases, and performance tuning to
              keep systems scalable. I’m also excited by practical <strong>Generative AI</strong> and have integrated
              tools like <strong>Google’s Gemini API</strong> to create smarter features that solve real problems.
              My experience includes enterprise work on <strong>Workday Extend</strong> as well as building real-time
              platforms such as video calling solutions.
              <br />
              <br />
              I keep sharpening my fundamentals through <strong>Data Structures and Algorithms</strong> and aim to
              write readable code that’s easy to maintain. If you’re building something impactful, I’d
              love to collaborate. I’m always learning, open to feedback, and enjoy partnering with
              teams to ship value fast.
            </p>

          </div>

          {/* ── Right — MacBook ── */}
          <div className={`about-right${inView ? ' in' : ''}`}>
            <div className="macbook-scene">
              <div className="macbook-3d">

                {/* LID */}
                <div className={`mac-lid${macOpen ? ' open' : ''}`}>
                  <div className="mac-logo" />
                  <div className="mac-camera" />
                  <div className="mac-bezel">
                    <div className="mac-screen-content">

                      <div className="mac-line">
                        <span className="mac-prompt">$</span>
                        <span>whoami</span>
                      </div>
                      <div className="mac-output-name">
                        {typed}{typed.length < 11 && <span className="mac-cursor" />}
                      </div>

                      {showRole && (
                        <>
                          <div className="mac-line" style={{ marginTop: '0.65rem' }}>
                            <span className="mac-prompt">$</span>
                            <span>cat role.txt</span>
                          </div>
                          <div className="mac-output-role">
                            {typedRole}{!showStack && <span className="mac-cursor" />}
                          </div>
                        </>
                      )}

                      {showStack && (
                        <>
                          <div className="mac-line" style={{ marginTop: '0.65rem' }}>
                            <span className="mac-prompt">$</span>
                            <span>echo $STACK</span>
                          </div>
                          <div className="mac-output-stack">MERN · Gen AI · DSA</div>
                          <div className="mac-line" style={{ marginTop: '0.65rem' }}>
                            <span className="mac-prompt">$</span>
                            <span className="mac-cursor" />
                          </div>
                        </>
                      )}

                    </div>
                  </div>
                </div>

                {/* HINGE */}
                <div className="mac-hinge" />

                {/* BASE with keyboard rows */}
                <div className="mac-base">
                  <div className="mac-kbd-rows">
                    {[
                      [14,14,14,14,14,14,14,14,14,14,14,14],
                      [14,14,14,14,14,14,14,14,14,14,'wide'],
                      [14,14,14,14,14,14,14,14,14,14],
                    ].map((row, ri) => (
                      <div className="mac-kbd-row" key={ri}>
                        {row.map((w, ki) => (
                          <div key={ki} className={`mac-key${w === 'wide' ? ' wide' : ''}`} />
                        ))}
                      </div>
                    ))}
                    <div className="mac-kbd-row">
                      <div className="mac-key wide" />
                      <div className="mac-key space" />
                      <div className="mac-key wide" />
                    </div>
                  </div>
                  <div className="mac-trackpad" />
                </div>

                <div className="mac-glow-bottom" />

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}