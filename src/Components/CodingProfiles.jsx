import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faChartLine, faTrophy, faFire } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const CodingProfiles = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [spotlightOn, setSpotlightOn] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSpotlightOn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const profiles = [
    {
      id: 'leetcode',
      name: 'LeetCode',
      username: 'Avinash_1912',
      url: 'https://leetcode.com/u/Avinash_1912/',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png',
      color: '#FFA116',
      bgGradient: 'from-[#FFA116]/20 to-[#FF8C00]/10',
      stats: {
        label: 'Problems Solved',
        icon: faChartLine
      },
      description: 'Competitive Programming Platform',
      badge: 'Active Solver'
    },
    {
      id: 'gfg',
      name: 'GeeksforGeeks',
      username: 'avinashjha832',
      url: 'https://www.geeksforgeeks.org/user/avinashjha832/',
      logo: 'https://media.geeksforgeeks.org/gfg-gg-logo.svg',
      color: '#2F8D46',
      bgGradient: 'from-[#2F8D46]/20 to-[#1F6B35]/10',
      stats: {
        label: 'Practice & Learn',
        icon: faCode
      },
      description: 'DSA & Interview Prep',
      badge: 'Problem Solver'
    },
    {
      id: 'github',
      name: 'GitHub',
      username: 'Avinash2912',
      url: 'https://github.com/Avinash2912',
      logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      color: '#ffffff',
      bgGradient: 'from-[#ffffff]/20 to-[#cccccc]/10',
      stats: {
        label: 'Open Source',
        icon: faFire
      },
      description: 'Code Repository & Projects',
      badge: 'Active Developer'
    }
  ];

  return (
    <section ref={sectionRef} id="coding-profiles" className="relative min-h-screen bg-black py-24 px-4 sm:px-6 overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

        /* About-style background glow */
        .cp-glow {
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
          animation: cpGlowPulse 8s ease-in-out infinite;
        }
        @keyframes cpGlowPulse {
          0%,100% { opacity: 0.8; transform: translate(-50%,-50%) scale(1); }
          50%     { opacity: 1;   transform: translate(-50%,-50%) scale(1.06); }
        }

        /* Spotlight overlay (replaces beams/rays) */
        .cp-spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: var(--cpSpotOpacity, 0);
          transition: opacity 1800ms cubic-bezier(.16,1,.3,1);
          transition-delay: 120ms;

          --cpSpotShiftX: -90px;
          --cpSpotShiftY: -70px;
          --cpSpotRotate: -8deg;
          --cpSpotScale: 0.92;
        }
        .cp-spotlight.is-on {
          --cpSpotOpacity: 0.95;
          --cpSpotShiftX: 0px;
          --cpSpotShiftY: 0px;
          --cpSpotRotate: 0deg;
          --cpSpotScale: 1;
        }

        /* Mirrored spotlight from top-right */
        .cp-spotlight.cp-right {
          --cpSpotOpacity: 0;
          --cpSpotShiftX: 90px;
          --cpSpotShiftY: -70px;
          --cpSpotRotate: 8deg;
          --cpSpotScale: 0.92;
        }
        .cp-spotlight.cp-right.is-on {
          --cpSpotOpacity: 0.95;
          --cpSpotShiftX: 0px;
          --cpSpotShiftY: 0px;
          --cpSpotRotate: 0deg;
          --cpSpotScale: 1;
        }
        .cp-spotlight.cp-right::before {
          left: 94%;
          top: -28%;
          width: 1400px;
          height: 1200px;
          background:
            conic-gradient(
              from 210deg at 50% 18%,
              transparent 0deg,
              rgba(224,90,28,0.00) 18deg,
              rgba(224,90,28,0.22) 34deg,
              rgba(224,90,28,0.10) 54deg,
              rgba(224,90,28,0.00) 74deg,
              transparent 360deg
            );
        }
        .cp-spotlight.cp-right::after {
          left: 92%;
          top: -22%;
          width: 820px;
          height: 820px;
          background:
            radial-gradient(
              closest-side at 50% 28%,
              rgba(224,90,28,0.32) 0%,
              rgba(224,90,28,0.18) 18%,
              rgba(224,90,28,0.08) 32%,
              rgba(255,255,255,0.00) 62%
            );
          opacity: 0.85;
        }
        .cp-spotlight::before {
          content: '';
          position: absolute;
          left: 6%;
          top: -36%;
          width: 1400px;
          height: 1200px;
          transform:
            translateX(-50%)
            translate(var(--cpSpotShiftX), var(--cpSpotShiftY))
            rotate(var(--cpSpotRotate))
            scale(var(--cpSpotScale));
          background:
            conic-gradient(
              from 128deg at 50% 18%,
              transparent 0deg,
              rgba(224,90,28,0.00) 18deg,
              rgba(224,90,28,0.22) 34deg,
              rgba(224,90,28,0.10) 54deg,
              rgba(224,90,28,0.00) 74deg,
              transparent 360deg
            );
          filter: blur(10px);
          mix-blend-mode: screen;
          transform-origin: 50% 18%;
          transition: transform 2200ms cubic-bezier(.16,1,.3,1);
          transition-delay: 120ms;
        }
        .cp-spotlight::after {
          content: '';
          position: absolute;
          left: 8%;
          top: -30%;
          width: 820px;
          height: 820px;
          transform:
            translateX(-50%)
            translate(calc(var(--cpSpotShiftX) * 0.7), calc(var(--cpSpotShiftY) * 0.7))
            rotate(calc(var(--cpSpotRotate) * 0.75))
            scale(calc(var(--cpSpotScale) * 1.02));
          background:
            radial-gradient(
              closest-side at 50% 28%,
              rgba(224,90,28,0.32) 0%,
              rgba(224,90,28,0.18) 18%,
              rgba(224,90,28,0.08) 32%,
              rgba(255,255,255,0.00) 62%
            );
          filter: blur(18px);
          opacity: 0.85;
          transform-origin: 50% 28%;
          transition: transform 2200ms cubic-bezier(.16,1,.3,1);
          transition-delay: 120ms;
        }

        /* subtle sweep after it appears */
        .cp-spotlight.is-on::before {
          animation: cpSpotSweep 7.5s ease-in-out infinite;
          animation-delay: 1800ms;
        }
        .cp-spotlight.is-on::after {
          animation: cpSpotSweep2 7.5s ease-in-out infinite;
          animation-delay: 1800ms;
        }

        .cp-spotlight.cp-right.is-on::before {
          animation-name: cpSpotSweepR;
        }
        .cp-spotlight.cp-right.is-on::after {
          animation-name: cpSpotSweep2R;
        }
        @keyframes cpSpotSweep {
          0%,100% { transform: translateX(-50%) translate(0px, 0px) rotate(0deg) scale(1); }
          50% { transform: translateX(-50%) translate(14px, 10px) rotate(1.5deg) scale(1.01); }
        }
        @keyframes cpSpotSweep2 {
          0%,100% { transform: translateX(-50%) translate(0px, 0px) rotate(0deg) scale(1.02); }
          50% { transform: translateX(-50%) translate(10px, 8px) rotate(1deg) scale(1.03); }
        }
        @keyframes cpSpotSweepR {
          0%,100% { transform: translateX(-50%) translate(0px, 0px) rotate(0deg) scale(1); }
          50% { transform: translateX(-50%) translate(-14px, 10px) rotate(-1.5deg) scale(1.01); }
        }
        @keyframes cpSpotSweep2R {
          0%,100% { transform: translateX(-50%) translate(0px, 0px) rotate(0deg) scale(1.02); }
          50% { transform: translateX(-50%) translate(-10px, 8px) rotate(-1deg) scale(1.03); }
        }

        @media (prefers-reduced-motion: reduce) {
          .cp-spotlight,
          .cp-spotlight::before,
          .cp-spotlight::after {
            transition: none !important;
            animation: none !important;
          }
        }

        @media (max-width: 640px) {
          .cp-spotlight::before {
            left: 0%;
            width: 980px;
            height: 900px;
            top: -38%;
            filter: blur(12px);
            opacity: 0.95;
          }
          .cp-spotlight::after {
            left: 2%;
            width: 660px;
            height: 660px;
            top: -34%;
          }

          .cp-spotlight.cp-right::before {
            left: 100%;
            width: 980px;
            height: 900px;
            top: -32%;
          }
          .cp-spotlight.cp-right::after {
            left: 98%;
            width: 660px;
            height: 660px;
            top: -28%;
          }
        }

        /* Layout */
        .cp-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 4px;
          position: relative;
          z-index: 1;
        }

        /* About-style header */
        .cp-header {
          text-align: center;
          margin-bottom: 3.6rem;
        }
        .cp-eyebrow {
          font-size: 0.7rem;
          font-family: 'Manrope', sans-serif;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #e05a1c;
          margin-bottom: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
        }
        .cp-eyebrow::before,
        .cp-eyebrow::after {
          content: '';
          display: inline-block;
          width: 28px;
          height: 1px;
          background: #e05a1c;
          opacity: 0.55;
        }
        .cp-heading {
          font-size: clamp(2.6rem, 5vw, 3.9rem);
          font-weight: 400;
          color: #fff;
          font-family: 'Neue Machina', sans-serif;
          letter-spacing: -0.02em;
          line-height: 1.06;
          margin: 0;
        }
        .cp-heading span { color: #e05a1c; }
        .cp-divider {
          margin: 1rem auto 0;
          width: 44px;
          height: 2px;
          background: linear-gradient(90deg, #e05a1c 0%, transparent 100%);
          border-radius: 2px;
        }
        .cp-sub {
          margin-top: 1rem;
          font-size: 0.95rem;
          font-family: 'Manrope', sans-serif;
          color: rgba(255,255,255,0.55);
          line-height: 1.8;
        }

        /* Cards */
        .cp-card {
          position: relative;
          background: rgba(10,10,10,0.82);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 20px 65px rgba(0,0,0,0.55);
          transform: translateY(0);
          transition: transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .cp-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(1000px 420px at 20% 0%, rgba(255,255,255,0.08), transparent 55%);
          opacity: 0.7;
          pointer-events: none;
        }
        .group:hover .cp-card { transform: translateY(-8px); }
        .cp-card-content { position: relative; }
        .cp-logo {
          width: 72px;
          height: 72px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          overflow: hidden;
        }
        .cp-chip {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .cp-title {
          font-family: 'Neue Machina', sans-serif;
          font-weight: 400;
          letter-spacing: -0.01em;
        }
        .cp-desc {
          font-family: 'Manrope', sans-serif;
          color: rgba(255,255,255,0.58);
        }
        .cp-cta {
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.04);
          transition: transform 220ms ease, background 220ms ease, border-color 220ms ease;
        }
        .group:hover .cp-cta {
          transform: translateY(-1px);
          border-color: rgba(255,255,255,0.18);
        }
        .cp-footer {
          width: 100%;
          margin-top: 16px;
        }
        .cp-cta {
          height: 46px;
        }

        /* Stats banner */
        .cp-banner {
          margin-top: 3rem;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.03);
          overflow: hidden;
        }
        .cp-banner-topstrip {
          height: 2px;
          background: linear-gradient(90deg, #e05a1c 0%, rgba(224,90,28,0.15) 45%, transparent 100%);
        }
        .cp-stat-num {
          font-family: 'Neue Machina', sans-serif;
          font-weight: 400;
          letter-spacing: -0.01em;
          color: #e05a1c;
        }
      `}</style>

      <div className={`cp-spotlight cp-left ${spotlightOn ? 'is-on' : ''}`} aria-hidden="true" />
      <div className={`cp-spotlight cp-right ${spotlightOn ? 'is-on' : ''}`} aria-hidden="true" />
      <div className="cp-glow" aria-hidden="true" />

      <div className="cp-inner">
        {/* Header */}
        <div className="cp-header">
          <div className="cp-eyebrow">Competitive Profiles</div>
          <h2 className="cp-heading">Coding <span>Profiles</span></h2>
          <div className="cp-divider" />
          <p className="cp-sub">Explore my competitive programming journey across multiple platforms.</p>
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 md:mb-14">
          {profiles.map((profile) => (
            <a
              key={profile.id}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredCard(profile.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative block w-full max-w-[420px] mx-auto md:max-w-none"
            >
              {/* Card Container */}
              <div
                className="cp-card"
                style={{
                  borderColor:
                    hoveredCard === profile.id
                      ? "rgba(224,90,28,0.55)"
                      : "rgba(255,255,255,0.10)",
                  boxShadow:
                    hoveredCard === profile.id
                      ? "0 28px 90px rgba(224,90,28,0.18)"
                      : "0 20px 65px rgba(0,0,0,0.55)",
                }}
              >
                
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-linear-to-br ${profile.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="cp-card-content p-7 md:p-8 flex flex-col items-center text-center gap-3">
                  {/* Logo */}
                  <div className="mt-1">
                    <div
                      className={`cp-logo transition-all duration-500 ${hoveredCard === profile.id ? 'scale-110 rotate-2' : 'scale-100'}`}
                      style={{
                        borderColor: hoveredCard === profile.id ? profile.color : 'rgba(255,255,255,0.10)'
                      }}
                    >
                      {profile.id === 'github' ? (
                        <FontAwesomeIcon 
                          icon={faGithub} 
                          className="text-3xl leading-none"
                          style={{ color: profile.color }}
                        />
                      ) : (
                        <img 
                          src={profile.logo} 
                          alt={profile.name}
                          className="w-12 h-12 object-contain"
                          style={{
                            filter: profile.id === 'leetcode' ? 'brightness(0) invert(1)' : 'none'
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Platform Name */}
                  <h3 className="cp-title text-2xl text-white">
                    {profile.name}
                  </h3>

                  {/* Username */}
                  <div>
                    <span className="cp-chip">
                      <span className="text-gray-500 font-mono text-sm">@</span>
                      <span 
                        className="font-mono text-sm font-bold"
                        style={{ color: profile.color }}
                      >
                        {profile.username}
                      </span>
                    </span>
                  </div>

                  {/* Description */}
                  <p className="cp-desc text-sm">
                    {profile.description}
                  </p>

                  {/* Badge */}
                  <div className="flex items-center justify-center gap-2">
                    <div 
                      className="px-3 py-1 rounded-full text-xs font-bold font-mono"
                      style={{
                        backgroundColor: `${profile.color}20`,
                        color: profile.color,
                        border: `1px solid ${profile.color}40`
                      }}
                    >
                      <FontAwesomeIcon icon={profile.stats.icon} className="mr-2" />
                      {profile.badge}
                    </div>
                  </div>

                  {/* Visit Button */}
                  <div className="cp-footer">
                    <div
                      className="cp-cta w-full inline-flex items-center justify-center gap-2 px-6 font-mono text-sm font-bold transition-all duration-300"
                      style={{
                        backgroundColor: hoveredCard === profile.id ? profile.color : 'rgba(255,255,255,0.05)',
                        color: hoveredCard === profile.id ? '#000' : '#fff',
                        border: `2px solid ${hoveredCard === profile.id ? profile.color : 'rgba(255,255,255,0.1)'}`
                      }}
                    >
                      <span>Visit Profile</span>
                      <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Corner Accent */}
                <div 
                  className={`
                    absolute top-0 right-0 w-32 h-32 rounded-bl-full
                    transition-opacity duration-500
                    ${hoveredCard === profile.id ? 'opacity-20' : 'opacity-0'}
                  `}
                  style={{ backgroundColor: profile.color }}
                ></div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Stats Banner */}
        <div className="cp-banner">
          <div className="cp-banner-topstrip" />
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-6 text-center">
            <div>
              <div className="cp-stat-num text-3xl mb-2">500+</div>
              <div className="text-gray-400 font-mono text-sm">Problems Solved</div>
            </div>
            <div>
              <div className="cp-stat-num text-3xl mb-2">DSA</div>
              <div className="text-gray-400 font-mono text-sm">Data Structures &amp; Algorithms</div>
            </div>
            <div>
              <div className="cp-stat-num text-3xl mb-2">Active</div>
              <div className="text-gray-400 font-mono text-sm">Daily Practice</div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodingProfiles;
