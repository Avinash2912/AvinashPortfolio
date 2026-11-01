
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Coding Profiles", href: "#coding-profiles" },
  ];

  const socials = [
    {
      name: "GitHub",
      url: "https://github.com/Avinash2912",
      icon: faGithub,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/avinash-jha",
      icon: faLinkedin,
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="portfolio-footer">

      <style>{`

        .portfolio-footer {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #050505;
          color: #fff;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        /* Background */
        .portfolio-footer::before {
          content: "";
          position: absolute;
          width: 650px;
          height: 400px;
          top: -280px;
          left: 12%;
          border-radius: 50%;
          background: rgba(224,90,28,0.07);
          filter: blur(130px);
          pointer-events: none;
        }

        .footer-container {
          position: relative;
          z-index: 1;
          width: calc(100% - 96px);
          max-width: 1180px;
          margin: 0 auto;
          padding-top: 76px;
        }

        /* Main grid */
        .footer-main {
          display: grid;
          grid-template-columns: 1.3fr 0.65fr 1fr;
          column-gap: 90px;
          padding-bottom: 65px;
        }

        .footer-brand,
        .footer-navigation,
        .footer-contact {
          min-width: 0;
        }

        /* Brand */
        .footer-logo {
          display: inline-block;
          font-size: 27px;
          line-height: 1.3;
          font-weight: 700;
          letter-spacing: -1px;
          color: #fff;
          text-decoration: none;
        }

        .footer-logo span {
          color: #e05a1c;
        }

        .footer-description {
          max-width: 390px;
          margin-top: 20px;
          color: #929292;
          font-size: 14px;
          line-height: 1.9;
          font-weight: 400;
        }

        /* Social links */
        .footer-socials {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 25px;
        }

        .footer-social-link {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.02);
          color: #929292;
          font-size: 16px;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .footer-social-link:hover {
          color: #e05a1c;
          border-color: rgba(224,90,28,0.5);
          background: rgba(224,90,28,0.06);
          transform: translateY(-3px);
        }

        /* Section headings */
        .footer-heading {
          margin: 5px 0 25px;
          color: #777;
          font-size: 10px;
          font-family: monospace;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        /* Navigation */
        .footer-nav-list {
          display: flex;
          flex-direction: column;
          gap: 17px;
          padding: 0;
          margin: 0;
          list-style: none;
        }

        .footer-nav-link {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          width: fit-content;
          color: #999;
          font-size: 14px;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-nav-link::before {
          content: "";
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #e05a1c;
          opacity: 0;
          transform: scale(0.5);
          transition: all 0.2s ease;
        }

        .footer-nav-link:hover {
          color: #fff;
        }

        .footer-nav-link:hover::before {
          opacity: 1;
          transform: scale(1);
        }

        /* Contact */
        .footer-contact-description {
          max-width: 330px;
          margin: 0 0 22px;
          color: #929292;
          font-size: 14px;
          line-height: 1.9;
        }

        .footer-email {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 0 0 13px;
          border-bottom: 1px solid rgba(255,255,255,0.13);
          color: #d0d0d0;
          font-size: 14px;
          text-decoration: none;
          transition: border-color 0.25s ease;
        }

        .footer-email:hover {
          border-color: #e05a1c;
        }

        .footer-email-icon {
          color: #666;
          font-size: 12px;
          flex-shrink: 0;
          transition: color 0.25s ease;
        }

        .footer-email:hover .footer-email-icon {
          color: #e05a1c;
        }

        .footer-availability {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-top: 17px;
          color: #777;
          font-size: 12px;
        }

        .footer-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px rgba(16,185,129,0.5);
          flex-shrink: 0;
        }

        /* Bottom bar */
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          min-height: 76px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .footer-copyright {
          color: #777;
          font-size: 12px;
        }

        .footer-copyright strong {
          color: #d0d0d0;
          font-weight: 500;
        }

        .footer-top-button {
          display: inline-flex;
          align-items: center;
          gap: 13px;
          padding: 0;
          border: none;
          background: transparent;
          color: #777;
          font-size: 10px;
          font-family: monospace;
          letter-spacing: 0.16em;
          cursor: pointer;
          transition: color 0.25s ease;
        }

        .footer-top-button:hover {
          color: #fff;
        }

        .footer-top-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9px;
          color: #999;
          transition: all 0.25s ease;
        }

        .footer-top-button:hover .footer-top-icon {
          background: #e05a1c;
          border-color: #e05a1c;
          color: #fff;
          transform: translateY(-2px);
        }

        /* Tablet */
        @media (max-width: 900px) {
          .footer-container {
            width: calc(100% - 64px);
          }

          .footer-main {
            grid-template-columns: 1.2fr 0.8fr;
            column-gap: 55px;
            row-gap: 55px;
          }

          .footer-contact {
            grid-column: 1 / -1;
            max-width: 420px;
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .footer-container {
            width: calc(100% - 40px);
            padding-top: 55px;
          }

          .footer-main {
            grid-template-columns: 1fr 1fr;
            column-gap: 20px;
            row-gap: 45px;
            padding-bottom: 45px;
          }

          .footer-brand {
            grid-column: 1 / -1;
          }

          .footer-description {
            max-width: 100%;
          }

          .footer-navigation {
            grid-column: 1;
          }

          .footer-contact {
            grid-column: 1 / -1;
            max-width: 100%;
          }

          .footer-heading {
            margin-bottom: 20px;
          }

          .footer-bottom {
            min-height: 70px;
          }

          .footer-copyright {
            font-size: 11px;
          }
        }

        @media (max-width: 380px) {
          .footer-top-button {
            gap: 7px;
            font-size: 9px;
          }

          .footer-copyright {
            font-size: 10px;
          }
        }

      `}</style>

      <div className="footer-container">

        <div className="footer-main">

          {/* Brand */}
          <div className="footer-brand">

            <a href="#hero" className="footer-logo">
              Avinash Jha<span>.</span>
            </a>

            <p className="footer-description">
              I enjoy solving complex problems and building
              scalable applications with clean architecture,
              thoughtful engineering, and intelligent automation.
            </p>

            <div className="footer-socials">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="footer-social-link"
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>

          </div>

          {/* Navigation */}
          <div className="footer-navigation">

            <h3 className="footer-heading">
              Navigation
            </h3>

            <ul className="footer-nav-list">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="footer-nav-link"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

          </div>

          {/* Contact */}
          <div className="footer-contact">

            <h3 className="footer-heading">
              Get in touch
            </h3>

            <p className="footer-contact-description">
              Have an interesting project or opportunity?
              Let's make something meaningful together.
            </p>

            <a
              href="mailto:avinashjha19@outlook.com"
              className="footer-email"
            >
              <span>avinashjha19@outlook.com</span>

              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="footer-email-icon"
              />
            </a>

            <div className="footer-availability">
              <span className="footer-status-dot" />
              Open to interesting opportunities
            </div>

          </div>

        </div>

        {/* Copyright */}
        <div className="footer-bottom">

          <p className="footer-copyright">
            © {currentYear}{" "}
            <strong>Avinash Jha</strong>.
            All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="footer-top-button"
            aria-label="Back to top"
            title="Back to top"
          >
            BACK TO TOP

            <span className="footer-top-icon">
              <FontAwesomeIcon icon={faArrowUp} />
            </span>
          </button>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
