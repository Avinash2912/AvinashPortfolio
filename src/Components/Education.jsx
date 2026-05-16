import React, { useRef, useEffect, useState } from "react";

const entries = [
  {
    branch: "feat/undergrad-cse",
    hash: "b7ec41a",
    years: "2021 – 2025",
    label: "Undergraduate · Computer Science",
    degree: "B.Tech in Computer Science Engineering",
    school: "Guru Gobind Singh Indraprastha University",
    pills: [
      { text: "CGPA 8.69 / 10", accent: true },
      { text: "4 years" },
      { text: "GGSIPU" },
    ],
  },
  {
    branch: "feat/class-xii",
    hash: "c65e12b",
    years: "2019 – 2020",
    label: "Senior Secondary · Class XII",
    degree: "Senior Secondary (Class XII)",
    school: "CBSE Board",
    pills: [
      { text: "75%", accent: true },
      { text: "CBSE" },
    ],
  },
  {
    branch: "feat/class-x",
    hash: "a104f9e",
    years: "2017 – 2018",
    label: "Secondary · Class X",
    degree: "Secondary (Class X)",
    school: "CBSE Board",
    pills: [
      { text: "76.4%", accent: true },
      { text: "CBSE" },
    ],
  },
];

/* ─── Hexagonal mesh background — static, very subtle ─── */
function HexMesh() {
  const size = 38;
  const w = size * 2;
  const h = size * Math.sqrt(3);
  const cols = Math.ceil(1440 / (w * 0.75)) + 2;
  const rows = Math.ceil(900 / h) + 2;

  const hexPath = (cx, cy) => {
    const pts = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 180) * (60 * i);
      pts.push(`${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`);
    }
    return `M ${pts.join(" L ")} Z`;
  };

  const hexes = [];
  for (let col = -1; col < cols; col++) {
    for (let row = -1; row < rows; row++) {
      const cx = col * w * 0.75;
      const cy = row * h + (col % 2 === 0 ? 0 : h / 2);
      const skip = (col * 7 + row * 13) % 5 === 0;
      if (skip) continue;
      const isAccent = (col * 3 + row * 5) % 23 === 0;
      hexes.push({ cx, cy, isAccent, id: `h-${col}-${row}` });
    }
  }

  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        zIndex: 0, pointerEvents: "none",
      }}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="hex-vignette" cx="50%" cy="50%" r="65%">
          <stop offset="0%"   stopColor="black" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.92" />
        </radialGradient>
      </defs>

      <g>
        {hexes.map(({ cx, cy, isAccent, id }) => (
          <path
            key={id}
            d={hexPath(cx, cy)}
            fill="none"
            stroke={isAccent ? "rgba(224,90,28,0.13)" : "rgba(255,255,255,0.03)"}
            strokeWidth="0.6"
          />
        ))}
      </g>

      {hexes
        .filter((_, i) => i % 9 === 0)
        .map(({ cx, cy, id }) =>
          Array.from({ length: 6 }, (_, k) => {
            const angle = (Math.PI / 180) * (60 * k);
            return (
              <circle
                key={`dot-${id}-${k}`}
                cx={cx + size * Math.cos(angle)}
                cy={cy + size * Math.sin(angle)}
                r="1"
                fill="rgba(224,90,28,0.09)"
              />
            );
          })
        )}
      <rect x="0" y="0" width="1440" height="900" fill="url(#hex-vignette)" />
    </svg>
  );
}

/* ─── Floating data particles ─── */
function DataParticles() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: (i * 53 + 17) % 100,
    y: (i * 41 + 23) % 100,
    size: (i % 3) + 1,
    dur: 4 + (i % 6),
    delay: (i * 0.4) % 5,
    isOrange: i % 7 === 0,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0px) scale(1); opacity: 0.6; }
          50%  { transform: translateY(-18px) scale(1.3); opacity: 1; }
          100% { transform: translateY(0px) scale(1); opacity: 0.6; }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size + 1,
            height: p.size + 1,
            borderRadius: "50%",
            background: p.isOrange
              ? "rgba(224,90,28,0.7)"
              : "rgba(255,255,255,0.35)",
            boxShadow: p.isOrange
              ? "0 0 10px rgba(224,90,28,0.5)"
              : "0 0 6px rgba(255,255,255,0.1)",
            animation: `floatUp ${p.dur}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Education() {
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#000",
        padding: "8rem 2rem",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');

        @keyframes auroraShift {
          0%   { transform: translate(0,0) scale(1); }
          33%  { transform: translate(40px,-30px) scale(1.07); }
          66%  { transform: translate(-20px,20px) scale(0.96); }
          100% { transform: translate(0,0) scale(1); }
        }
        .edu-aurora {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          animation: auroraShift 20s ease-in-out infinite;
          pointer-events: none;
        }

        .edu-stripes {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 28px,
            rgba(255,255,255,0.012) 28px,
            rgba(255,255,255,0.012) 29px
          );
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      {/* Mouse spotlight */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(224,90,28,0.10), transparent 60%)`,
        }}
      />

      {/* Aurora blobs */}
      <div className="edu-aurora" style={{ width: 800, height: 800, background: "rgba(224,90,28,0.12)", top: "-20%", left: "-14%", animationDuration: "22s" }} />
      <div className="edu-aurora" style={{ width: 600, height: 600, background: "rgba(160,50,10,0.10)", bottom: "-18%", right: "-10%", animationDuration: "18s", animationDelay: "5s" }} />
      <div className="edu-aurora" style={{ width: 400, height: 400, background: "rgba(224,90,28,0.07)", top: "40%", right: "20%", animationDuration: "14s", animationDelay: "9s" }} />

      <div className="edu-stripes" />
      <HexMesh />
      <DataParticles />

      {/* Content Container */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 980, margin: "0 auto" }}>

        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#e05a1c",
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ width: 28, height: 1, background: "#e05a1c", opacity: 0.6 }} />
          git log --graph --all
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Neue Machina', sans-serif",
            fontSize: "clamp(2.5rem,5vw,4rem)",
            fontWeight: 400,
            color: "#fff",
            lineHeight: 1.05,
            marginBottom: "5rem",
            letterSpacing: "-0.04em",
          }}
        >
          Edu<em style={{ fontStyle: "italic", color: "#e05a1c" }}>cation</em>
        </h2>

        {/* Git Tree Interface */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {entries.map((entry, i) => (
            <GitNode 
              key={i} 
              entry={entry} 
              isFirst={i === 0}
              isLast={i === entries.length - 1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GitNode({ entry, isFirst, isLast }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: "0 2rem",
        position: "relative",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* LEFT COLUMN: Git Diagram Track Graphs */}
      <div style={{ position: "relative", minHeight: "180px" }}>
        
        {/* Main Branch Line (White / Pale) */}
        <div
          style={{
            position: "absolute",
            left: 30,
            top: 0,
            bottom: 0,
            width: 2,
            background: "rgba(255, 255, 255, 0.15)",
          }}
        />

        {/* Feature Branch Deviating/Merging Track Line (Orange) */}
        <svg
          style={{
            position: "absolute",
            left: 30,
            top: 0,
            width: 60,
            height: "100%",
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          {/* Branch curve path layout */}
          <path
            d={isLast 
              ? "M 0 24 Q 30 35 30 65 L 30 115 Q 30 145 0 155" 
              : "M 0 24 Q 30 35 30 65 L 30 140 Q 30 175 0 185"
            }
            fill="none"
            stroke={hovered ? "#e05a1c" : "rgba(224,90,28,0.4)"}
            strokeWidth="2"
            style={{ transition: "stroke 0.35s ease" }}
          />
        </svg>

        {/* Main Track Commit Dot */}
        <div
          style={{
            position: "absolute",
            left: 26,
            top: 20,
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#111",
            border: "2px solid rgba(255,255,255,0.4)",
            zIndex: 3,
          }}
        />

        {/* Feature Track Milestone Commit Node */}
        <div
          style={{
            position: "absolute",
            left: 55,
            top: 85,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: hovered ? "#e05a1c" : "#000",
            border: "2px solid #e05a1c",
            transition: "all 0.35s ease",
            boxShadow: hovered ? "0 0 16px #e05a1c" : "none",
            zIndex: 3,
          }}
        />
        
        {/* Branch Tags & Details vertically positioned in the timeline column */}
        <div 
          style={{
            position: "absolute",
            left: 0,
            top: 135,
            width: "120px",
            textAlign: "center",
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: hovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)",
            transition: "color 0.35s ease",
          }}
        >
          {entry.years}
        </div>
      </div>

      {/* RIGHT COLUMN: Terminal Style Commit Details */}
      <div
        style={{
          paddingTop: "12px",
          paddingBottom: "40px",
          position: "relative",
        }}
      >
        {/* Terminal Header Info Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            marginBottom: "12px",
          }}
        >
          <span style={{ color: "#e05a1c", fontWeight: 500 }}>commit {entry.hash}</span>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
          <span 
            style={{ 
              background: hovered ? "rgba(224,90,28,0.15)" : "rgba(255,255,255,0.04)",
              color: hovered ? "#e05a1c" : "rgba(255,255,255,0.45)",
              padding: "2px 8px",
              borderRadius: "4px",
              border: hovered ? "1px solid rgba(224,90,28,0.3)" : "1px solid rgba(255,255,255,0.06)",
              transition: "all 0.35s ease"
            }}
          >
            {entry.branch}
          </span>
        </div>

        {/* Text Area block without standard heavy card containers */}
        <div
          style={{
            transform: hovered ? "translateX(6px)" : "translateX(0px)",
            transition: "transform 0.35s ease",
          }}
        >
          {/* Label Metadata */}
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: 4,
            }}
          >
            {entry.label}
          </div>

          {/* Core Title */}
          <h3
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "20px",
              fontWeight: 600,
              color: hovered ? "#fff" : "rgba(255,255,255,0.9)",
              lineHeight: 1.3,
              marginBottom: 4,
              transition: "color 0.35s ease",
            }}
          >
            {entry.degree}
          </h3>

          {/* Institution Subtext */}
          <div
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 14,
              color: "rgba(255,255,255,0.45)",
              marginBottom: 16,
            }}
          >
            {entry.school}
          </div>

          {/* Interactive Metric Pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {entry.pills.map((pill, idx) => (
              <span
                key={idx}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  padding: "4px 10px",
                  borderRadius: "4px",
                  border: pill.accent
                    ? "1px solid rgba(224,90,28,0.25)"
                    : "1px solid rgba(255,255,255,0.08)",
                  background: pill.accent ? "rgba(224,90,28,0.05)" : "rgba(255,255,255,0.01)",
                  color: pill.accent ? "#e05a1c" : "rgba(255,255,255,0.4)",
                }}
              >
                {pill.accent ? "❯ " : ""}{pill.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}