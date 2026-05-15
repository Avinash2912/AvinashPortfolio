/**
 * SectionBackground — unique textured backgrounds per section
 *
 * variants:
 *   "dots"      → Education:      dot grid + indigo glow
 *   "scanlines" → Experience:     horizontal lines + amber glow
 *   "circuit"   → Skills:         square grid + teal glow
 *   "rings"     → Projects:       concentric rings + purple glow
 *   "noise"     → CodingProfiles: grain noise + orange glow
 */

const configs = {
  dots: {
    glowColor:  'rgba(224, 90, 28, 0.28)',
    glowColor2: 'rgba(160, 55, 10, 0.12)',
    glowTop: '35%', glowLeft: '70%',
    glowW: '700px', glowH: '420px',
    animDuration: '10s',
    texture: (
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          zIndex: 0, pointerEvents: 'none', opacity: 0.18,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
          </pattern>
          <radialGradient id="dotsMask" cx="50%" cy="50%" r="55%">
            <stop offset="0%"   stopColor="black" />
            <stop offset="45%"  stopColor="black" stopOpacity="0.3" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>
          <mask id="dotFade">
            <rect width="100%" height="100%" fill="white" />
            <rect width="100%" height="100%" fill="url(#dotsMask)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" mask="url(#dotFade)" />
      </svg>
    ),
  },

  scanlines: {
    glowColor:  'rgba(200, 72, 18, 0.30)',
    glowColor2: 'rgba(130, 42, 8, 0.13)',
    glowTop: '50%', glowLeft: '18%',
    glowW: '650px', glowH: '400px',
    animDuration: '9s',
    texture: (
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          zIndex: 0, pointerEvents: 'none', opacity: 0.10,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="scanlines" x="0" y="0" width="100%" height="22" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="10000" y2="0" stroke="white" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#scanlines)" />
        {/* Diagonal accent */}
        <line x1="0" y1="100%" x2="40%" y2="0" stroke="white" strokeWidth="0.5" opacity="0.5"/>
        <line x1="0" y1="80%"  x2="30%" y2="0" stroke="white" strokeWidth="0.3" opacity="0.3"/>
      </svg>
    ),
  },

  circuit: {
    glowColor:  'rgba(224, 90, 28, 0.24)',
    glowColor2: 'rgba(140, 50, 10, 0.10)',
    glowTop: '45%', glowLeft: '55%',
    glowW: '720px', glowH: '450px',
    animDuration: '11s',
    texture: (
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          zIndex: 0, pointerEvents: 'none', opacity: 0.12,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="circuit" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            {/* Outer rect */}
            <rect x="0.5" y="0.5" width="59" height="59" fill="none" stroke="white" strokeWidth="0.6" />
            {/* Inner cross */}
            <line x1="30" y1="0"  x2="30" y2="60" stroke="white" strokeWidth="0.3" />
            <line x1="0"  y1="30" x2="60" y2="30" stroke="white" strokeWidth="0.3" />
            {/* Corner dots */}
            <circle cx="0"  cy="0"  r="2" fill="white" />
            <circle cx="60" cy="0"  r="2" fill="white" />
            <circle cx="0"  cy="60" r="2" fill="white" />
            <circle cx="60" cy="60" r="2" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    ),
  },

  rings: {
    glowColor:  'rgba(210, 78, 20, 0.28)',
    glowColor2: 'rgba(130, 44, 8, 0.12)',
    glowTop: '50%', glowLeft: '50%',
    glowW: '750px', glowH: '480px',
    animDuration: '13s',
    texture: (
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          zIndex: 0, pointerEvents: 'none', opacity: 0.13,
        }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Concentric rings from center */}
        {[120,240,360,480,600,720,840,960].map((r, i) => (
          <circle
            key={i}
            cx="720" cy="450" r={r}
            fill="none"
            stroke="white"
            strokeWidth={i === 0 ? '0.9' : '0.5'}
            opacity={Math.max(0.1, 1 - i * 0.1)}
          />
        ))}
        {/* Radial lines */}
        {[0,45,90,135].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x2 = 720 + 1000 * Math.cos(rad);
          const y2 = 450 + 1000 * Math.sin(rad);
          const x3 = 720 - 1000 * Math.cos(rad);
          const y3 = 450 - 1000 * Math.sin(rad);
          return (
            <line key={i} x1={x2} y1={y2} x2={x3} y2={y3}
              stroke="white" strokeWidth="0.4" opacity="0.35" />
          );
        })}
      </svg>
    ),
  },

  noise: {
    glowColor:  'rgba(224, 90, 28, 0.30)',
    glowColor2: 'rgba(140, 50, 8, 0.13)',
    glowTop: '40%', glowLeft: '35%',
    glowW: '680px', glowH: '420px',
    animDuration: '8s',
    texture: (
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          zIndex: 0, pointerEvents: 'none', opacity: 0.085,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.68"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        {/* Subtle diagonal accent */}
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="0.6" opacity="0.4"/>
        <line x1="100%" y1="15%" x2="15%" y2="100%" stroke="white" strokeWidth="0.35" opacity="0.25"/>
      </svg>
    ),
  },
};

export default function SectionBackground({ variant }) {
  const c = configs[variant];
  if (!c) return null;

  return (
    <>
      <style>{`
        @keyframes bgGlow_${variant} {
          0%,100% { opacity:0.85; transform:translate(-50%,-50%) scale(1);    }
          50%      { opacity:1;    transform:translate(-50%,-50%) scale(1.07); }
        }
        .sbg-glow-${variant} {
          position: absolute;
          top: ${c.glowTop}; left: ${c.glowLeft};
          transform: translate(-50%,-50%);
          width: ${c.glowW}; height: ${c.glowH};
          border-radius: 50%;
          background: radial-gradient(ellipse at center,
            ${c.glowColor}  0%,
            ${c.glowColor2} 40%,
            transparent     75%
          );
          filter: blur(40px);
          pointer-events: none;
          z-index: 0;
          animation: bgGlow_${variant} ${c.animDuration} ease-in-out infinite;
        }
      `}</style>

      {/* Ambient glow */}
      <div className={`sbg-glow-${variant}`} aria-hidden="true" />

      {/* Texture */}
      {c.texture}
    </>
  );
}
