import React, { useRef, useEffect, useState } from "react";

const entries = [
  {
    years: ["2021", "–", "2025"],
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
    years: ["2019", "–", "2020"],
    label: "Senior Secondary · Class XII",
    degree: "Senior Secondary (Class XII)",
    school: "CBSE Board",
    pills: [
      { text: "75%", accent: true },
      { text: "CBSE" },
    ],
  },
  {
    years: ["2017", "–", "2018"],
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
      // a handful of hexes get a faint orange tint — purely static
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

      {/* All hex outlines — uniform very low opacity */}
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

      {/* Sparse vertex dots — barely visible */}
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

      {/* Vignette — pulls edges to black so hex fades out gracefully */}
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

        /* Diagonal stripe texture */
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

      {/* Diagonal stripes */}
      <div className="edu-stripes" />

      {/* Hexagonal mesh */}
      <HexMesh />

      {/* Floating particles */}
      <DataParticles />

      {/* Content */}
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
          Academic Record
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Neue Machina', sans-serif",
            fontSize: "clamp(2.5rem,5vw,4rem)",
            fontWeight: 400,
            color: "#fff",
            lineHeight: 1.05,
            marginBottom: "4rem",
            letterSpacing: "-0.04em",
          }}
        >
          Edu<em style={{ fontStyle: "italic", color: "#e05a1c" }}>cation</em>
        </h2>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 78, top: 0, bottom: 0, width: 1,
              background: "linear-gradient(to bottom, rgba(224,90,28,0.45), rgba(255,255,255,0.08))",
            }}
          />
          {entries.map((entry, i) => (
            <TimelineCard key={i} entry={entry} isLast={i === entries.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ entry, isLast }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "70px 1fr",
        gap: "0 2.5rem",
        position: "relative",
        paddingBottom: !isLast ? "2.8rem" : 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Years */}
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          color: "rgba(255,255,255,0.28)",
          lineHeight: 1.7,
          textAlign: "right",
          paddingTop: 8,
          letterSpacing: "0.08em",
        }}
      >
        {entry.years.map((year, idx) => (
          <div key={idx}>{year}</div>
        ))}
      </div>

      {/* Timeline dot */}
      <div
        style={{
          position: "absolute",
          left: 73, top: 12,
          width: 12, height: 12,
          borderRadius: "50%",
          background: hovered ? "#e05a1c" : "#000",
          border: "1px solid rgba(224,90,28,0.6)",
          transition: "all 0.35s ease",
          boxShadow: hovered ? "0 0 20px rgba(224,90,28,0.75)" : "none",
          zIndex: 2,
        }}
      />

      {/* Card */}
      <div
        style={{
          position: "relative",
          background: hovered ? "rgba(18,18,18,0.88)" : "rgba(10,10,10,0.75)",
          border: hovered
            ? "1px solid rgba(224,90,28,0.28)"
            : "1px solid rgba(255,255,255,0.07)",
          borderRadius: 24,
          padding: "1.9rem",
          backdropFilter: "blur(24px)",
          overflow: "hidden",
          transition: "all 0.35s ease",
          transform: hovered ? "translateY(-6px)" : "translateY(0px)",
          boxShadow: hovered
            ? "0 12px 48px rgba(224,90,28,0.14), 0 0 0 1px rgba(224,90,28,0.06)"
            : "none",
        }}
      >
        {/* Inner corner accent — top-left hex motif */}
        <svg
          aria-hidden="true"
          style={{ position: "absolute", top: 0, right: 0, opacity: hovered ? 0.35 : 0.12, transition: "opacity 0.35s ease" }}
          width="80" height="80" viewBox="0 0 80 80"
        >
          <path
            d="M 80 0 L 80 38 L 62 48 L 44 38 L 44 18 L 62 8 Z"
            fill="none"
            stroke="rgba(224,90,28,0.8)"
            strokeWidth="0.8"
          />
          <path
            d="M 80 16 L 80 54 L 58 66 L 36 54 L 36 30 L 58 18 Z"
            fill="none"
            stroke="rgba(224,90,28,0.4)"
            strokeWidth="0.5"
          />
        </svg>

        {/* Glow */}
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: hovered
              ? "radial-gradient(circle at top right, rgba(224,90,28,0.10), transparent 50%)"
              : "transparent",
            transition: "0.35s ease",
          }}
        />

        {/* Label */}
        <div
          style={{
            position: "relative",
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.22)",
            marginBottom: 8,
          }}
        >
          {entry.label}
        </div>

        {/* Degree */}
        <div
          style={{
            position: "relative",
            fontFamily: "'DM Serif Display', serif",
            fontSize: 24,
            lineHeight: 1.25,
            color: "#fff",
            marginBottom: 6,
            letterSpacing: "-0.02em",
          }}
        >
          {entry.degree}
        </div>

        {/* School */}
        <div
          style={{
            position: "relative",
            fontFamily: "'Manrope', sans-serif",
            fontSize: 14,
            color: "rgba(255,255,255,0.42)",
            marginBottom: 18,
          }}
        >
          {entry.school}
        </div>

        {/* Pills */}
        <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: 10 }}>
          {entry.pills.map((pill, idx) => (
            <span
              key={idx}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.05em",
                padding: "6px 13px",
                borderRadius: 999,
                border: pill.accent
                  ? "1px solid rgba(224,90,28,0.32)"
                  : "1px solid rgba(255,255,255,0.1)",
                background: pill.accent ? "rgba(224,90,28,0.08)" : "transparent",
                color: pill.accent ? "#e05a1c" : "rgba(255,255,255,0.5)",
              }}
            >
              {pill.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}