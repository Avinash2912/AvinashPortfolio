
import React, { useState, useEffect, useRef } from "react";

const ROLES = [
  "Software Engineer",
  "Full Stack Developer",
  "Gen AI Enthusiast",
];

export const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef(null);

  // Cycle roles with fade-slide animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);

      timeoutRef.current = setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % ROLES.length);
        setAnimating(false);
      }, 350);
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      id="hero"
      className="hero-shell"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "0 1.5rem",
        isolation: "isolate",
      }}
    >
      <style>{`

        /* ───────── Keyframes ───────── */

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes roleOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-14px);
          }
        }

        @keyframes roleIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes sunGlow {
          0%, 100% {
            opacity: 0.65;
            transform: translateX(-50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) scale(1.06);
          }
        }

        @keyframes raysPulse {
          0%, 100% {
            opacity: 0.65;
          }
          50% {
            opacity: 0.95;
          }
        }

        @keyframes badgePulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(224, 90, 28, 0.35);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(224, 90, 28, 0);
          }
        }

        /* ───────── Background Diagonal Lines ───────── */

        .hero-shell::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;

          background-image:
            repeating-linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.05) 0 1px,
              transparent 1px 80px
            ),
            repeating-linear-gradient(
              -45deg,
              rgba(255, 255, 255, 0.04) 0 1px,
              transparent 1px 80px
            );

          -webkit-mask-image: radial-gradient(
            ellipse at center,
            #000 30%,
            transparent 78%
          );

          mask-image: radial-gradient(
            ellipse at center,
            #000 30%,
            transparent 78%
          );

          opacity: 0.9;
        }

        /* ───────── Cinematic Sun Rays ───────── */

        .hero-shell::after {
          content: "";
          position: absolute;
          inset: -10%;
          z-index: 2;
          pointer-events: none;

          background:
            linear-gradient(
              118deg,
              transparent 15%,
              rgba(255, 130, 55, 0.025) 25%,
              rgba(255, 130, 55, 0.10) 32%,
              rgba(255, 160, 90, 0.035) 40%,
              transparent 52%
            ),
            linear-gradient(
              125deg,
              transparent 28%,
              rgba(224, 90, 28, 0.07) 38%,
              rgba(255, 150, 80, 0.035) 45%,
              transparent 58%
            ),
            linear-gradient(
              110deg,
              transparent 40%,
              rgba(224, 90, 28, 0.045) 49%,
              transparent 62%
            );

          filter: blur(22px);
          opacity: 0.85;
          animation: raysPulse 8s ease-in-out infinite;
        }

        /* ───────── Ambient Orange Sun Glow ───────── */

        .hero-glow {
          position: absolute;
          top: -18%;
          left: 50%;

          width: 1000px;
          height: 750px;

          border-radius: 50%;

          background: radial-gradient(
            ellipse at center,
            rgba(180, 55, 10, 0.32) 0%,
            rgba(140, 38, 5, 0.20) 25%,
            rgba(100, 25, 3, 0.10) 48%,
            transparent 72%
          );

          filter: blur(35px);

          animation: sunGlow 8s ease-in-out infinite;

          pointer-events: none;
          z-index: 1;
        }

        /* ───────── Main Content ───────── */

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

          animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* ───────── Badge ───────── */

        .hero-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;

          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;

          color: #f3c19d;

          background: rgba(224, 90, 28, 0.06);
          border: 1px solid rgba(224, 90, 28, 0.28);

          border-radius: 999px;
          padding: 0.55rem 1rem;
          margin-bottom: 1.6rem;

          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02);

          animation: badgePulse 3s ease-in-out infinite;

          font-family: 'SFMono-Regular', 'Consolas', 'Monaco', monospace;
        }

        .hero-badge .dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;
          background: #e05a1c;

          display: inline-block;

          box-shadow: 0 0 10px rgba(224, 90, 28, 0.7);
        }

        /* ───────── Headline ───────── */

        .hero-h1 {
          font-size: clamp(2.6rem, 5.5vw, 3.75rem);
          font-weight: 400;
          line-height: 1.12;

          color: #ffffff;
          letter-spacing: -0.01em;

          margin-bottom: 1.5rem;

          font-family: 'Neue Machina', sans-serif;
        }

        .hero-h1 .name-highlight {
          color: #e05a1c;
        }

        .role-box-wrapper {
          display: inline-block;
          position: relative;
        }

        .role-box {
          display: inline-block;

          border: 1.5px solid rgba(224, 90, 28, 0.45);
          background: rgba(224, 90, 28, 0.06);

          border-radius: 12px;
          padding: 0.08em 0.52em;

          line-height: inherit;
          position: relative;

          box-shadow: inset 0 0 0 1px rgba(224, 90, 28, 0.08);
        }

        .role-text {
          display: inline-block;
          animation: roleIn 0.35s ease both;
        }

        .role-text.exit {
          animation: roleOut 0.35s ease both;
        }

        /* ───────── Subtitle ───────── */

        .hero-sub {
          font-size: clamp(1rem, 1.8vw, 1.125rem);
          font-weight: 400;

          color: #b3b3b3;

          max-width: 640px;
          line-height: 1.75;

          margin-bottom: 2rem;

          animation: fadeUp 1.1s 0.2s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* ───────── CTA Buttons ───────── */

        .hero-ctas {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;

          animation: fadeUp 1.1s 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
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

          transition:
            background 0.25s ease,
            transform 0.2s ease,
            box-shadow 0.25s ease;

          box-shadow: 0 6px 28px rgba(224, 90, 28, 0.45);
        }

        .btn-primary:hover {
          background: #c44d15;
          transform: translateY(-2px);

          box-shadow: 0 10px 36px rgba(224, 90, 28, 0.55);
        }

        .btn-secondary {
          padding: 0.85rem 2.2rem;

          background: transparent;
          color: rgba(255, 255, 255, 0.75);

          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 50px;

          font-size: 1rem;
          font-weight: 600;
          font-family: 'Neue Machina', sans-serif;

          cursor: pointer;
          text-decoration: none;

          display: inline-flex;
          align-items: center;
          gap: 0.5rem;

          transition:
            border-color 0.25s ease,
            color 0.25s ease,
            transform 0.2s ease,
            background 0.25s ease;
        }

        .btn-secondary:hover {
          border-color: rgba(255, 255, 255, 0.5);
          color: #fff;

          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
        }

        .btn-primary:focus-visible,
        .btn-secondary:focus-visible {
          outline: 2px solid #ffd0a8;
          outline-offset: 3px;
        }

        /* ───────── Responsive ───────── */

        @media (max-width: 768px) {
          .hero-h1 {
            letter-spacing: -0.01em;
          }

          .hero-inner {
            gap: 0;
          }

          .hero-glow {
            width: 650px;
            height: 520px;
          }
        }

        @media (max-width: 480px) {
          .hero-ctas {
            flex-direction: column;
            align-items: center;
            width: 100%;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .hero-glow {
            width: 420px;
            height: 420px;
            top: -8%;
          }

          .hero-sub {
            max-width: 340px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-glow,
          .hero-inner,
          .hero-badge,
          .hero-sub,
          .hero-ctas,
          .role-text,
          .hero-shell::after {
            animation: none !important;
          }
        }

      `}</style>

      {/* Ambient Orange Sunlight */}
      <div className="hero-glow" aria-hidden="true" />

      {/* Main Content */}
      <div className="hero-inner">

        {/* Badge */}
        <div
          className="hero-badge"
          aria-label="Code build get hired"
        >
          <span className="dot" />
          <span>&gt; code.build().getHired()</span>
          <span className="dot" />
        </div>

        {/* Headline */}
        <h1 className="hero-h1">
          Hi, I'm{" "}
          <span className="name-highlight">
            Avinash Jha
          </span>

          <br />

          <span className="role-box-wrapper">
            <span className="role-box">
              <span
                className={`role-text${animating ? " exit" : ""}`}
              >
                {ROLES[currentRole]}
              </span>
            </span>
          </span>

          <br />

          building products that scale.
        </h1>

        {/* Subtitle */}
        <p className="hero-sub">
          Building scalable applications, intelligent automation, and impactful software solutions.
        </p>

        {/* CTA Buttons */}
        <div className="hero-ctas">

          <button
            className="btn-primary"
            onClick={() => scrollToSection("projects")}
            id="hero-view-work-btn"
            aria-label="View My Work"
          >
            View My Work →
          </button>

          <a
            href="https://drive.google.com/file/d/1wf3vZNyKhdNjGOcV7okkZttKeg-0hWkW/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            id="hero-resume-btn"
            aria-label="Download Resume"
          >
            Download Resume ↗
          </a>

        </div>
      </div>
    </div>
  );
};
