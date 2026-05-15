import React, { useState, useEffect } from "react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleScroll();
    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const navLinks = [
    { id: "about",           label: "About" },
    { id: "education",       label: "Education" },
    { id: "experience",      label: "Experience" },
    { id: "skills",          label: "Skills" },
    { id: "projects",        label: "Projects" },
    { id: "coding-profiles", label: "Profiles" },
  ];

  return (
    <>
      <style>{`
        .nav-link-item {
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-size: 0.9375rem;
          font-weight: 500;
          font-family: 'Neue Machina', sans-serif;
          letter-spacing: 0.2px;
          padding: 0.35rem 0;
          position: relative;
          transition: color 0.25s ease;
          cursor: pointer;
        }
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1.5px;
          background: #e05a1c;
          transition: width 0.25s ease;
        }
        .nav-link-item:hover { color: #fff; }
        .nav-link-item:hover::after { width: 100%; }

        .nav-cta {
          padding: 0.55rem 1.4rem;
          background: #e05a1c;
          color: #fff;
          border: none;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          white-space: nowrap;
        }
        .nav-cta:hover {
          background: #c44d15;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(224,90,28,0.45);
        }

        .hamburger-btn {
          background: none;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s ease;
        }
        .hamburger-btn:hover { border-color: rgba(255,255,255,0.45); }

        .mobile-menu {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 100vh;
          background: rgba(5,5,5,0.97);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 998;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .mobile-menu.hidden {
          opacity: 0;
          pointer-events: none;
          transform: translateY(-12px);
        }
        .mobile-menu.visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }
        .mobile-nav-link {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          font-size: 1.6rem;
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
          transition: color 0.2s ease;
        }
        .mobile-nav-link:hover { color: #e05a1c; }
      `}</style>

      <nav style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 999,
        padding: "1.2rem 4rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease",
        background: scrolled
          ? "rgba(5,5,5,0.88)"
          : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.06)" : "none",
        paddingBlock: scrolled ? "0.9rem" : "1.2rem",
        paddingInline: isMobile ? "1.25rem" : "4rem",
      }} aria-label="Main navigation">

        {/* Logo */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.6rem",
          textDecoration: "none", cursor: "pointer"
        }} onClick={(e) => handleNavClick(e, "hero")}>
          <div style={{
            width: 34, height: 34,
            background: "linear-gradient(135deg, #e05a1c, #ff8c42)",
            borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1rem", fontWeight: 900, color: "#fff",
            fontFamily: "'Outfit', sans-serif",
            boxShadow: "0 4px 12px rgba(224,90,28,0.4)",
          }}>A</div>
          <span style={{
            fontSize: "1.1rem", fontWeight: 700, color: "#fff",
            fontFamily: "'Outfit', sans-serif", letterSpacing: "0.2px"
          }}>Avinash Jha</span>
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{
            display: "flex", alignItems: "center", gap: "2rem",
            position: "absolute", left: "50%", transform: "translateX(-50%)"
          }}>
            {navLinks.map((lnk) => (
              <a
                key={lnk.id}
                href={`#${lnk.id}`}
                className="nav-link-item"
                onClick={(e) => handleNavClick(e, lnk.id)}
              >
                {lnk.label}
              </a>
            ))}
          </div>
        )}

        {/* Desktop CTA */}
        {!isMobile && (
          <a
            href="https://drive.google.com/file/d/1wf3vZNyKhdNjGOcV7okkZttKeg-0hWkW/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            Resume ↗
          </a>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen((s) => !s)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{ zIndex: 1001 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              {menuOpen ? (
                <g stroke="white" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18" /><path d="M6 6L18 18" />
                </g>
              ) : (
                <g stroke="white" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" />
                </g>
              )}
            </svg>
          </button>
        )}
      </nav>

      {/* Mobile menu overlay */}
      {isMobile && (
        <div className={`mobile-menu ${menuOpen ? "visible" : "hidden"}`} role="dialog" aria-modal="true">
          {navLinks.map((lnk) => (
            <a
              key={lnk.id}
              href={`#${lnk.id}`}
              className="mobile-nav-link"
              onClick={(e) => handleNavClick(e, lnk.id)}
            >
              {lnk.label}
            </a>
          ))}
          <a
            href="https://drive.google.com/file/d/1wf3vZNyKhdNjGOcV7okkZttKeg-0hWkW/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
            style={{ marginTop: "1rem" }}
          >
            Download Resume ↗
          </a>
        </div>
      )}
    </>
  );
};