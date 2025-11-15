import React, { useState, useEffect } from "react";

export const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  useEffect(() => {
    // Update viewport and a broad mobile flag for legacy checks
    const check = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setViewport({ w, h });
      setIsMobile(w <= 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // prevent body scroll when mobile menu open
  useEffect(() => {
    if (isMobile && menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, menuOpen]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // close mobile menu after navigation
    if (isMobile) setMenuOpen(false);
  };

  const navLinks = [
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "coding-profiles", label: "Profiles" },
  ];

  // Responsive behavior tuned for tablets and hubs
  const isPhone = viewport.w <= 640;
  const isTablet = viewport.w > 640 && viewport.w <= 1024;
  const isShortLandscape = viewport.h <= 600 && viewport.w >= 800; // Nest Hub class
  // Use hamburger on phones and very short landscape screens; tablets get pill layout
  const useHamburger = isPhone || isTablet || isShortLandscape;
  const navWidth = useHamburger ? "94vw" : "70vw";

  return (
    <nav
      style={{
        position: "fixed",
        top: useHamburger ? "0.75rem" : "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        width: navWidth,
        maxWidth: "1200px",
        boxSizing: "border-box",
        paddingInline: useHamburger ? "0.25rem" : undefined,
      }}
      aria-label="Main navigation"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: useHamburger ? "0.6rem" : "3rem",
          padding: useHamburger ? "0.5rem 0.75rem" : "0.9rem 1.6rem",
          // Darker glass to reduce background bleed-through
          background:
            "linear-gradient(135deg, rgba(14,32,74,0.72) 0%, rgba(18,46,102,0.62) 100%)",
          backdropFilter: "blur(16px) saturate(160%)",
          WebkitBackdropFilter: "blur(16px) saturate(160%)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          borderRadius: "50px",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.2), 0 10px 30px rgba(0, 0, 0, 0.35)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontSize: "1.2rem",
            fontWeight: "700",
            color: "#fff",
            letterSpacing: "0.5px",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            
          }}
        >
          
          Avinash Jha
        </div>

        {/* Desktop / larger screens: pill links */}
        {!useHamburger && (
          <div
            style={{
              display: "flex",
              columnGap: "0.75rem",
              rowGap: "0.5rem",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: isTablet ? "flex-start" : "flex-end",
              maxWidth: "100%",
            }}
          >
            {navLinks.map((lnk) => (
              <a
                key={lnk.id}
                href={`#${lnk.id}`}
                onClick={(e) => handleNavClick(e, lnk.id)}
                style={{
                  color: "#EAF2FF",
                  textDecoration: "none",
                  fontSize: isTablet ? "1rem" : "0.98rem",
                  transition:
                    "background 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 120ms ease",
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: isTablet ? "10px 16px" : "8px 14px",
                  borderRadius: 9999,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.06))",
                  border: "1px solid rgba(255,255,255,0.28)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 16px rgba(0,0,0,0.25)",
                }}
                aria-label={lnk.label}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(180deg, rgba(78,168,248,0.25), rgba(78,168,248,0.12))";
                  e.currentTarget.style.borderColor = "rgba(78,168,248,0.6)";
                  e.currentTarget.style.color = "#E6F3FF";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "inset 0 1px 0 rgba(255,255,255,0.35), 0 8px 24px rgba(78,168,248,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.06))";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
                  e.currentTarget.style.color = "#EAF2FF";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow =
                    "inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 16px rgba(0,0,0,0.25)";
                }}
              >
                {lnk.label}
              </a>
            ))}
          </div>
        )}

        {/* Mobile: hamburger button */}
        {useHamburger && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={() => setMenuOpen((s) => !s)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: 14,
                border: "none",
                background: "rgba(255,255,255,0.04)",
                cursor: "pointer",
                padding: 6,
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <g stroke="white" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18" />
                    <path d="M6 6L18 18" />
                  </g>
                ) : (
                  <g stroke="white" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 6h18" />
                    <path d="M3 12h18" />
                    <path d="M3 18h18" />
                  </g>
                )}
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Mobile menu overlay / slide-down */}
      {useHamburger && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            top: menuOpen ? "78px" : "-10vh",
            left: "50%",
            transform: "translateX(-50%)",
            width: useHamburger ? "94vw" : "88vw",
            maxWidth: 520,
            transition: "top 220ms ease, opacity 220ms ease",
            opacity: menuOpen ? 1 : 0,
            zIndex: 999,
            pointerEvents: menuOpen ? "auto" : "none",
            maxHeight: "calc(100vh - 110px)",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div
            style={{
              position: "relative",
              background: "rgba(13, 28, 54, 0.50)",
              backgroundImage:
                "radial-gradient(120% 140% at 10% -10%, rgba(255,255,255,0.18), rgba(255,255,255,0) 40%), radial-gradient(120% 140% at 100% 0%, rgba(78,168,248,0.18), rgba(78,168,248,0) 35%)",
              backdropFilter: "blur(20px) saturate(160%)",
              WebkitBackdropFilter: "blur(20px) saturate(160%)",
              border: "1px solid rgba(78, 168, 248, 0.28)",
              borderRadius: 18,
              padding: "0.9rem",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.25), 0 14px 40px rgba(0,0,0,0.55)",
            }}
          >
            {/* glossy highlight */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "34%",
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0.08) 45%, rgba(255,255,255,0) 100%)",
                pointerEvents: "none",
              }}
            />

            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {navLinks.map((lnk) => (
                <a
                  key={lnk.id}
                  href={`#${lnk.id}`}
                  onClick={(e) => handleNavClick(e, lnk.id)}
                  style={{
                    color: "#EAF2FF",
                    textDecoration: "none",
                    fontSize: "1rem",
                    transition:
                      "background 140ms ease, color 140ms ease, transform 120ms ease, box-shadow 140ms ease",
                    fontWeight: 700,
                    cursor: "pointer",
                    padding: "0.9rem 1rem",
                    borderRadius: 9999,
                    width: "100%",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05))",
                    border: "1px solid rgba(255,255,255,0.25)",
                    textAlign: "center",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 24px rgba(0,0,0,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(180deg, rgba(78,168,248,0.25), rgba(78,168,248,0.10))";
                    e.currentTarget.style.borderColor = "rgba(78,168,248,0.55)";
                    e.currentTarget.style.color = "#E6F3FF";
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "inset 0 1px 0 rgba(255,255,255,0.35), 0 12px 30px rgba(78,168,248,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05))";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                    e.currentTarget.style.color = "#EAF2FF";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow =
                      "inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 24px rgba(0,0,0,0.35)";
                  }}
                >
                  {lnk.label}
                </a>
              ))}
            </nav>
            <div style={{ height: 8 }} />
            <div
              style={{
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.65)",
                padding: "0 0.6rem 0.6rem",
                textAlign: "center",
              }}
            >
              Tap a link to navigate.
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
