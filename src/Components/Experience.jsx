import React, { useState, useRef, useEffect } from 'react';

export const Experience = () => {
  const [isExecuted, setIsExecuted] = useState(false);
  const sectionRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 720, y: 400 });

  useEffect(() => {
    const onMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const experiences = [
    {
      role: 'Associate Software Developer',
      company: 'Makse Services Pvt Ltd.',
      duration: 'October 2025 – Present',
      details: [
        'Working on Workday — extending applications and integrating features.',
        'Completed onboarding trainings and technical certifications.',
        'Building internal apps and contributing to platform improvements.',
      ],
    },
    {
      role: 'Developer Intern',
      company: 'Infoedge India Pvt Ltd.',
      duration: 'Jan 2025 – July 2025',
      details: [
        'Designed an image moderation & duplicate detection system using Python, OpenCV, Gemini 2.0 Flash, SSIM & pHash — reduced duplicate detection effort by 60%+.',
        'Developed web scrapers for 15 State RERA websites, extracting & structuring project data.',
        'Automated sales productivity analysis, delivering insights that boosted team efficiency.',
        'Built an AI-powered property review pipeline with Python, OpenAI API & Gemini API — achieved 75% accuracy.',
        'Built a real estate project-to-bank mapping tool across 14 loan-approving banks, ensuring audit compliance.',
      ],
    },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '8rem 2rem',
        overflow: 'hidden',
        background: '#000',
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        /* ── Dot-matrix grid ── */
        .exp-dotgrid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          z-index: 0;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 100%);
        }

        /* ── Scattered larger accent dots ── */
        .exp-accentdots {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle, rgba(224,90,28,0.18) 1.5px, transparent 1.5px),
            radial-gradient(circle, rgba(224,90,28,0.10) 1px, transparent 1px);
          background-size: 112px 112px, 56px 56px;
          background-position: 14px 14px, 42px 42px;
          pointer-events: none;
          z-index: 0;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 85%);
        }

        /* ── Diagonal cross-hatch (very faint) ── */
        .exp-hatch {
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              rgba(255,255,255,0.012) 40px,
              rgba(255,255,255,0.012) 41px
            );
          pointer-events: none;
          z-index: 0;
        }

        /* ── Ambient glow blobs ── */
        @keyframes blobDrift {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(30px,-20px) scale(1.06); }
          70%      { transform: translate(-15px,15px) scale(0.97); }
        }
        .exp-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(110px);
          pointer-events: none;
          animation: blobDrift 20s ease-in-out infinite;
        }

        /* ── Editor card ── */
        .exp-editor {
          position: relative;
          z-index: 2;
          max-width: 1000px;
          margin: 0 auto;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(8,8,8,0.82);
          backdrop-filter: blur(20px);
          box-shadow: 0 0 0 1px rgba(224,90,28,0.06), 0 32px 80px rgba(0,0,0,0.7);
        }

        /* ── Editor top bar ── */
        .exp-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.5rem;
          background: rgba(12,12,12,0.95);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .exp-topbar-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .exp-trafficlight {
          width: 10px; height: 10px; border-radius: 50%;
        }
        .exp-filename {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.06em;
          margin-left: 6px;
        }
        .exp-filename span { color: rgba(224,90,28,0.8); }

        /* ── Run button ── */
        .exp-run-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0.4rem 1.1rem;
          border-radius: 8px;
          border: 1px solid rgba(224,90,28,0.35);
          background: rgba(224,90,28,0.10);
          color: #e05a1c;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .exp-run-btn:hover {
          background: rgba(224,90,28,0.22);
          border-color: rgba(224,90,28,0.6);
          box-shadow: 0 0 20px rgba(224,90,28,0.2);
        }
        .exp-run-btn .run-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #e05a1c;
          box-shadow: 0 0 6px rgba(224,90,28,0.8);
        }

        /* ── Code area ── */
        .exp-code {
          padding: 1.5rem 1.75rem;
          font-family: 'DM Mono', monospace;
          font-size: 12.5px;
          line-height: 1.9;
          background: rgba(6,6,6,0.7);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .exp-code .kw  { color: #60a5fa; }
        .exp-code .col { color: #86efac; }
        .exp-code .tbl { color: rgba(255,255,255,0.75); }
        .exp-code .str { color: #fbbf24; }
        .exp-code .dim { color: rgba(255,255,255,0.28); }

        /* ── Hint ── */
        .exp-hint {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(224,90,28,0.6);
          margin-top: 1rem;
          display: flex;
          align-items: center;
          gap: 8px;
          letter-spacing: 0.05em;
        }
        .exp-hint-pulse {
          width: 6px; height: 6px; border-radius: 50%;
          background: #e05a1c;
          animation: hintPulse 1.8s ease-in-out infinite;
        }
        @keyframes hintPulse {
          0%,100% { opacity: 0.3; }
          50%      { opacity: 1; box-shadow: 0 0 8px rgba(224,90,28,0.8); }
        }

        /* ── Empty state ── */
        .exp-empty {
          padding: 5rem 2rem;
          text-align: center;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.12);
          letter-spacing: 0.12em;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        /* ── Results ── */
        .exp-results {
          border-top: 1px solid rgba(255,255,255,0.06);
          animation: fadeSlideIn 0.4s ease forwards;
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Results header ── */
        .exp-results-head {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 2fr;
          padding: 0.6rem 1.75rem;
          background: rgba(14,14,14,0.9);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .exp-results-head span {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0 0.5rem;
        }

        /* ── Result rows ── */
        .exp-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 2fr;
          padding: 1.4rem 1.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.2s ease;
        }
        .exp-row:hover {
          background: rgba(224,90,28,0.04);
        }
        .exp-row:last-child { border-bottom: none; }

        .exp-cell {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.65);
          padding: 0 0.5rem;
          line-height: 1.7;
        }
        .exp-cell-role {
          color: rgba(255,255,255,0.88);
          font-weight: 500;
          font-size: 11.5px;
        }
        .exp-cell-company {
          color: #e05a1c;
          opacity: 0.85;
        }
        .exp-cell-duration {
          color: rgba(255,255,255,0.38);
          font-size: 10.5px;
        }
        .exp-detail-line {
          display: flex;
          gap: 8px;
          margin-bottom: 6px;
          font-size: 10.5px;
          line-height: 1.65;
          color: rgba(255,255,255,0.5);
        }
        .exp-detail-line:last-child { margin-bottom: 0; }
        .exp-arrow { color: #22c55e; flex-shrink: 0; margin-top: 1px; }

        /* ── Status bar ── */
        .exp-statusbar {
          padding: 0.55rem 1.75rem;
          background: rgba(10,10,10,0.95);
          border-top: 1px solid rgba(255,255,255,0.06);
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(34,197,94,0.7);
          letter-spacing: 0.06em;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .exp-statusbar::before {
          content: '';
          width: 5px; height: 5px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px rgba(34,197,94,0.7);
          flex-shrink: 0;
        }
      `}</style>

      {/* ── Background layers ── */}

      {/* Dot matrix */}
      <div className="exp-dotgrid" />

      {/* Accent orange dots */}
      <div className="exp-accentdots" />

      {/* Cross-hatch */}
      <div className="exp-hatch" />

      {/* Ambient blobs */}
      <div className="exp-blob" style={{ width: 700, height: 700, background: 'rgba(224,90,28,0.11)', top: '-15%', left: '-8%', animationDuration: '22s' }} />
      <div className="exp-blob" style={{ width: 500, height: 500, background: 'rgba(160,50,10,0.09)', bottom: '-12%', right: '-6%', animationDuration: '17s', animationDelay: '6s' }} />

      {/* Mouse spotlight */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `radial-gradient(520px circle at ${mouse.x}px ${mouse.y}px, rgba(224,90,28,0.08), transparent 65%)`,
      }} />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 110% 90% at 50% 50%, transparent 35%, rgba(0,0,0,0.75) 100%)',
      }} />

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1000, margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#e05a1c',
            marginBottom: 14,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ width: 28, height: 1, background: '#e05a1c', opacity: 0.6 }} />
            Career Path
          </div>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 'clamp(2.2rem,4.5vw,3.4rem)',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            margin: 0,
          }}>
            Work <span style={{ color: '#e05a1c' }}>Experience</span>
          </h2>
        </div>

        {/* SQL Editor */}
        <div className="exp-editor">

          {/* Top bar */}
          <div className="exp-topbar">
            <div className="exp-topbar-left">
              <div className="exp-trafficlight" style={{ background: '#ff5f57' }} />
              <div className="exp-trafficlight" style={{ background: '#febc2e' }} />
              <div className="exp-trafficlight" style={{ background: '#28c840' }} />
              <span className="exp-filename">SQL Editor — <span>work_experience.db</span></span>
            </div>
            <button className="exp-run-btn" onClick={() => setIsExecuted(!isExecuted)}>
              <span className="run-dot" />
              {isExecuted ? 'RESET' : 'RUN ▶'}
            </button>
          </div>

          {/* Query code */}
          <div className="exp-code">
            <div><span className="kw">SELECT</span> <span className="col">wx.role</span><span className="dim">, </span><span className="col">co.company_name</span><span className="dim">, </span><span className="col">wx.duration</span><span className="dim">, </span><span className="col">wx.details</span></div>
            <div><span className="kw">FROM</span> <span className="tbl">work_experience</span> <span className="kw">AS</span> <span className="tbl">wx</span></div>
            <div><span className="kw">JOIN</span> <span className="tbl">companies</span> <span className="kw">AS</span> <span className="tbl">co</span> <span className="kw">ON</span> <span className="col">wx.company_id</span> <span className="dim">=</span> <span className="col">co.id</span></div>
            <div><span className="kw">WHERE</span> <span className="col">LOWER(wx.role)</span> <span className="dim">LIKE</span> <span className="str">"%developer%"</span> <span className="dim">OR</span> <span className="col">LOWER(wx.role)</span> <span className="dim">LIKE</span> <span className="str">"%intern%"</span><span className="dim">;</span></div>

            {!isExecuted && (
              <div className="exp-hint">
                <span className="exp-hint-pulse" />
                Click RUN ▶ to execute the query
              </div>
            )}
          </div>

          {/* Results */}
          {isExecuted && (
            <div className="exp-results">
              <div className="exp-results-head">
                <span style={{ color: '#60a5fa' }}>role</span>
                <span style={{ color: '#86efac' }}>company_name</span>
                <span style={{ color: '#fbbf24' }}>duration</span>
                <span style={{ color: '#f472b6' }}>details</span>
              </div>
              <div style={{ maxHeight: 520, overflowY: 'auto' }}>
                {experiences.map((exp, i) => (
                  <div key={i} className="exp-row">
                    <div className="exp-cell exp-cell-role">{exp.role}</div>
                    <div className="exp-cell exp-cell-company">{exp.company}</div>
                    <div className="exp-cell exp-cell-duration">{exp.duration}</div>
                    <div className="exp-cell">
                      {exp.details.map((line, j) => (
                        <div key={j} className="exp-detail-line">
                          <span className="exp-arrow">▸</span>
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="exp-statusbar">
                Query executed successfully — {experiences.length} row(s) returned in 0.{String(Math.floor(Math.random() * 90) + 10)}ms
              </div>
            </div>
          )}

          {/* Empty state */}
          {!isExecuted && (
            <div className="exp-empty">— execute query to see results —</div>
          )}
        </div>
      </div>
    </section>
  );
};