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
          width: 26px;
          height: 20px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 3px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          padding: 3px;
        }
        .id-chip-cell {
          background: rgba(255,255,255,0.1);
          border-radius: 1px;
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
              I’m <strong>Avinash Jha</strong>, an <strong>Associate Developer</strong> based in <strong>New Delhi</strong>, passionate about
              building <strong>scalable full-stack applications</strong> and crafting <strong>modern, user-friendly web experiences</strong>.
              I work primarily with the <strong>MERN stack</strong> and enjoy turning complex ideas into clean, reliable
              products with smooth UI interactions and responsive design.
              <br /><br />
              I’ve worked on enterprise-grade <strong>Workday Extend</strong> applications, <strong>AI automation solutions</strong>, and
              <strong>real-time platforms</strong>, while also exploring practical <strong>Generative AI</strong> integrations using tools
              like the <strong>Gemini API</strong>. Alongside application development, I’m deeply interested in <strong>system design</strong>,
              <strong>backend architecture</strong>, and building maintainable systems that scale efficiently.
              <br /><br />
              I continuously strengthen my problem-solving skills through <strong>Data Structures &amp; Algorithms</strong> and
              love learning new technologies that help create impactful digital experiences.
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
                  </div>

                  <div className="id-avatar">AJ</div>
                  <div className="id-name">Avinash Jha</div>
                  <div className="id-role-badge">Associate Developer</div>
                </div>

                {/* Body */}
                <div className="id-card-body">
                  <div className="id-field">
                    <div className="id-field-label">Stack</div>
                    <div className="id-field-value">MERN · Gen AI · DSA</div>
                  </div>
                  <div className="id-divider" />
                  <div className="id-field">
                    <div className="id-field-label">Location</div>
                    <div className="id-field-value">New Delhi, India</div>
                  </div>
                  <div className="id-divider" />
                  <div className="id-field">
                    <div className="id-field-label">Available For</div>
                    <div className="id-field-value">Full-time · Freelance</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="id-card-footer">
                  <div className="id-status">
                    <div className="id-status-dot" />
                    Open to Work
                  </div>
                  <div className="id-barcode" aria-hidden="true">
                    {BARCODE_HEIGHTS.map((h, i) => (
                      <div
                        key={i}
                        className="id-bar"
                        style={{
                          width: h <= 3 ? '2px' : '3px',
                          height: `${h * 3 + 4}px`,
                        }}
                      />
                    ))}
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