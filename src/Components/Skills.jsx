import React, { useState, useRef, useEffect } from 'react';

const skillsData = [
  {
    id: 'languages',
    name: 'Programming Languages',
    color: '#e05a1c',
    skills: [
      {
        name: 'C / C++',
        method: 'GET',
        endpoint: '/skills/cpp',
        status: 200,
        statusText: 'OK',
        experience: '2+ years',
        response: {
          description: 'Strong foundation in systems programming and competitive programming',
          projects: ['Data Structures Implementation', 'Algorithm Problems', 'System-level Programming'],
          strengths: ['Memory Management', 'STL', 'Problem Solving'],
        },
      },
      {
        name: 'Java',
        method: 'GET',
        endpoint: '/skills/java',
        status: 200,
        statusText: 'OK',
        experience: '2+ years',
        response: {
          description: 'Object-oriented programming with strong understanding of core concepts',
          projects: ['OOP Projects', 'DSA Implementation', 'College Projects'],
          strengths: ['OOP Concepts', 'Collections Framework', 'Exception Handling'],
        },
      },
      {
        name: 'JavaScript',
        method: 'GET',
        endpoint: '/skills/javascript',
        status: 200,
        statusText: 'OK',
        experience: '2+ years',
        response: {
          description: 'Modern JavaScript (ES6+) for full-stack web development',
          projects: ['Web Applications', 'REST APIs', 'Real-time Apps'],
          strengths: ['Async/Await', 'DOM Manipulation', 'ES6+ Features'],
        },
      },
      {
        name: 'Python',
        method: 'GET',
        endpoint: '/skills/python',
        status: 200,
        statusText: 'OK',
        experience: '1+ years',
        response: {
          description: 'Scripting, automation, and problem-solving with Python',
          projects: ['Automation Scripts', 'Data Analysis', 'Algorithm Implementation'],
          strengths: ['Libraries', 'Data Structures', 'Problem Solving'],
        },
      },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend Technologies',
    color: '#e05a1c',
    skills: [
      {
        name: 'React.js',
        method: 'GET',
        endpoint: '/skills/react',
        status: 200,
        statusText: 'OK',
        experience: '1.5+ years',
        response: {
          description: 'Building modern, interactive UIs with hooks, context, and component architecture',
          projects: ['Portfolio Website', 'E-commerce Platform', 'Dashboard Applications'],
          strengths: ['Component Design', 'State Management', 'Hooks', 'Performance Optimization'],
        },
      },
      {
        name: 'HTML & CSS',
        method: 'GET',
        endpoint: '/skills/html-css',
        status: 200,
        statusText: 'OK',
        experience: '2+ years',
        response: {
          description: 'Semantic HTML5 and modern CSS3 for responsive web design',
          projects: ['All Web Projects', 'Responsive Layouts', 'Landing Pages'],
          strengths: ['Semantic HTML', 'Flexbox', 'Grid', 'Responsive Design'],
        },
      },
      {
        name: 'Tailwind CSS',
        method: 'GET',
        endpoint: '/skills/tailwind',
        status: 200,
        statusText: 'OK',
        experience: '1+ years',
        response: {
          description: 'Utility-first CSS framework for rapid UI development',
          projects: ['Portfolio', 'Modern Web Apps', 'Component Libraries'],
          strengths: ['Utility Classes', 'Custom Themes', 'Responsive Design'],
        },
      },
      {
        name: 'Bootstrap',
        method: 'GET',
        endpoint: '/skills/bootstrap',
        status: 200,
        statusText: 'OK',
        experience: '1.5+ years',
        response: {
          description: 'CSS framework for building responsive and mobile-first websites',
          projects: ['College Projects', 'Responsive Websites', 'Quick Prototypes'],
          strengths: ['Grid System', 'Components', 'Responsive Utilities'],
        },
      },
    ],
  },
  {
    id: 'backend',
    name: 'Backend & Database',
    color: '#e05a1c',
    skills: [
      {
        name: 'Node.js',
        method: 'GET',
        endpoint: '/skills/nodejs',
        status: 200,
        statusText: 'OK',
        experience: '1.5+ years',
        response: {
          description: 'Building scalable server-side applications and RESTful APIs',
          projects: ['REST APIs', 'Authentication Systems', 'Real-time Applications'],
          strengths: ['API Development', 'Async Programming', 'Event-Driven Architecture'],
        },
      },
      {
        name: 'Express.js',
        method: 'GET',
        endpoint: '/skills/express',
        status: 200,
        statusText: 'OK',
        experience: '1.5+ years',
        response: {
          description: 'Web application framework for building robust APIs and servers',
          projects: ['E-commerce Backend', 'User Management', 'API Servers'],
          strengths: ['Routing', 'Middleware', 'Error Handling', 'Authentication'],
        },
      },
      {
        name: 'MongoDB',
        method: 'GET',
        endpoint: '/skills/mongodb',
        status: 200,
        statusText: 'OK',
        experience: '1.5+ years',
        response: {
          description: 'NoSQL database for flexible and scalable data storage',
          projects: ['User Management', 'Content Management', 'E-commerce Data'],
          strengths: ['Schema Design', 'CRUD Operations', 'Aggregation', 'Indexing'],
        },
      },
      {
        name: 'MySQL',
        method: 'GET',
        endpoint: '/skills/mysql',
        status: 200,
        statusText: 'OK',
        experience: '1+ years',
        response: {
          description: 'Relational database management with SQL queries',
          projects: ['Database Design', 'CRUD Applications', 'Data Analysis'],
          strengths: ['SQL Queries', 'Joins', 'Normalization', 'Transactions'],
        },
      },
    ],
  },
  {
    id: 'core',
    name: 'Core Skills',
    color: '#e05a1c',
    skills: [
      {
        name: 'Data Structures & Algorithms',
        method: 'GET',
        endpoint: '/skills/dsa',
        status: 200,
        statusText: 'OK',
        experience: '2+ years',
        response: {
          description: 'Strong foundation in DSA with competitive programming experience',
          projects: ['CodeChef (Global Rank 157)', 'LeetCode Problems', 'Algorithm Challenges'],
          strengths: ['Problem Solving', 'Time Complexity', 'Space Optimization', 'Algorithm Design'],
        },
      },
      {
        name: 'Web Development',
        method: 'GET',
        endpoint: '/skills/webdev',
        status: 200,
        statusText: 'OK',
        experience: '2+ years',
        response: {
          description: 'Full-stack web development with modern technologies',
          projects: ['Multiple Web Applications', 'E-commerce Platform', 'Real-time Apps'],
          strengths: ['MERN Stack', 'RESTful APIs', 'Responsive Design', 'Authentication'],
        },
      },
      {
        name: 'Object-Oriented Programming',
        method: 'GET',
        endpoint: '/skills/oop',
        status: 200,
        statusText: 'OK',
        experience: '2+ years',
        response: {
          description: 'Strong understanding of OOP principles and design patterns',
          projects: ['Java Projects', 'C++ Applications', 'System Design'],
          strengths: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Design Patterns'],
        },
      },
    ],
  },
  {
    id: 'tools',
    name: 'Developer Tools',
    color: '#e05a1c',
    skills: [
      {
        name: 'GitHub',
        method: 'GET',
        endpoint: '/skills/github',
        status: 200,
        statusText: 'OK',
        experience: '2+ years',
        response: {
          description: 'Version control, collaboration, and project management',
          projects: ['All Projects', 'Open Source', 'Team Collaborations'],
          strengths: ['Git Commands', 'Branching', 'Pull Requests', 'GitHub Actions'],
        },
      },
      {
        name: 'VS Code',
        method: 'GET',
        endpoint: '/skills/vscode',
        status: 200,
        statusText: 'OK',
        experience: '2+ years',
        response: {
          description: 'Primary code editor with extensions and customization',
          projects: ['Daily Development', 'All Projects'],
          strengths: ['Extensions', 'Shortcuts', 'Debugging', 'IntelliSense'],
        },
      },
      {
        name: 'Postman',
        method: 'GET',
        endpoint: '/skills/postman',
        status: 200,
        statusText: 'OK',
        experience: '1+ years',
        response: {
          description: 'API development and testing platform',
          projects: ['API Testing', 'Backend Development', 'API Documentation'],
          strengths: ['API Testing', 'Collections', 'Environment Variables', 'Automation'],
        },
      },
    ],
  },
];

const BASE_URL = 'https://skills.avinash.dev';

const Skills = () => {
  const sectionRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 720, y: 400 });
  const [expandedFolders, setExpandedFolders] = useState(['languages']);
  const defaultSkill = { ...skillsData[0].skills[0] };
  const [selectedSkill, setSelectedSkill] = useState(defaultSkill);
  const [urlInput, setUrlInput] = useState(`${BASE_URL}${defaultSkill.endpoint}`);
  const [isSending, setIsSending] = useState(false);
  const [showResponse, setShowResponse] = useState(true);

  useEffect(() => {
    const onMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const toggleFolder = (id) =>
    setExpandedFolders((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  const selectSkill = (skill) => {
    setSelectedSkill(skill);
    setUrlInput(`${BASE_URL}${skill.endpoint}`);
    setShowResponse(false);
  };

  const handleSend = () => {
    setIsSending(true);
    setShowResponse(false);
    setTimeout(() => {
      setIsSending(false);
      setShowResponse(true);
    }, 800);
  };

  const mono = "'DM Mono', 'Courier New', monospace";
  const display = "'Neue Machina', 'Helvetica Neue', Helvetica, Arial, sans-serif";

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '8rem 2rem',
        overflow: 'hidden',
        background: '#040406',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap');

        @keyframes skillBlobDrift {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(35px,-25px) scale(1.06); }
          70%      { transform: translate(-18px,18px) scale(0.97); }
        }
        @keyframes skillFadeIn {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes skillSpin {
          to { transform: rotate(360deg); }
        }
        .skill-fade-in { animation: skillFadeIn 0.35s ease forwards; }
        .skill-folder-btn:hover { background: rgba(255,255,255,0.04) !important; }
        .skill-item-btn:hover   { background: rgba(224,90,28,0.06) !important; }
        .skill-send-btn:hover   { background: rgba(224,90,28,0.28) !important; border-color: rgba(224,90,28,0.7) !important; }
        .skill-tab:hover        { color: rgba(255,255,255,0.6) !important; }
        .skill-strength:hover   { background: rgba(224,90,28,0.18) !important; }
        .skill-row:hover        { background: rgba(255,255,255,0.02) !important; }
      `}</style>

      {/* ── Background (Updated Pattern) ── */}

      {/* Blueprint Engineering Grid Layer */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
      }} />

      {/* High-Tech Horizontal Grid Rules */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(224,90,28,0.03) 1px, transparent 1px)',
        backgroundSize: '100% 120px',
      }} />

      {/* Interactive Laser Tech Crosshair tracking mouse coordinates */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(to right, rgba(224,90,28,0.15) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(224,90,28,0.15) 1px, transparent 1px)
        `,
        backgroundPosition: `${mouse.x}px ${mouse.y}px`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        maskImage: 'radial-gradient(circle 180px at center, transparent 15%, black 40%)',
        maskPosition: `${mouse.x - 400}px ${mouse.y - 400}px`, // Tracks the mouse center
        maskSize: '800px 800px',
        maskRepeat: 'no-repeat',
        opacity: 0.65,
      }} />

      {/* Ambient blobs */}
      <div style={{
        position: 'absolute', width: 700, height: 700, borderRadius: '50%',
        background: 'rgba(224,90,28,0.10)', top: '-18%', left: '-10%',
        filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0,
        animation: 'skillBlobDrift 22s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: 'rgba(160,50,10,0.08)', bottom: '-14%', right: '-8%',
        filter: 'blur(110px)', pointerEvents: 'none', zIndex: 0,
        animation: 'skillBlobDrift 18s ease-in-out infinite',
        animationDelay: '6s',
      }} />

      {/* Mouse spotlight */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `radial-gradient(500px circle at ${mouse.x}px ${mouse.y}px, rgba(224,90,28,0.07), transparent 65%)`,
      }} />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 110% 90% at 50% 50%, transparent 30%, rgba(0,0,0,0.8) 100%)',
      }} />

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{
            fontFamily: mono, fontSize: 10, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: '#e05a1c',
            marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ width: 28, height: 1, background: '#e05a1c', opacity: 0.6, display: 'inline-block' }} />
            API Explorer
          </div>
          <h2 style={{
            fontFamily: display,
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            fontWeight: 400,
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.06,
            margin: 0,
            textTransform: 'capitalize',
          }}>
            Skills <span style={{ color: '#e05a1c' }}>API</span>
          </h2>
        </div>

        {/* Main layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem' }}>

          {/* ── Left panel — Collections ── */}
          <div style={{
            borderRadius: 14, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(8,8,8,0.88)',
            boxShadow: '0 0 0 1px rgba(224,90,28,0.05)',
          }}>
            {/* Panel header */}
            <div style={{
              padding: '0.75rem 1.1rem',
              background: 'rgba(224,90,28,0.07)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e05a1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
              </svg>
              <span style={{ fontFamily: mono, fontSize: 11, color: '#e05a1c', letterSpacing: '0.1em', fontWeight: 500 }}>
                Collections
              </span>
            </div>

            {/* Folder list */}
            <div style={{ padding: '0.75rem', maxHeight: 680, overflowY: 'auto' }}>
              {skillsData.map((folder) => {
                const isOpen = expandedFolders.includes(folder.id);
                return (
                  <div key={folder.id} style={{ marginBottom: 6 }}>
                    {/* Folder toggle */}
                    <button
                      className="skill-folder-btn"
                      onClick={() => toggleFolder(folder.id)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: 7,
                        padding: '0.45rem 0.6rem', borderRadius: 8,
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                    >
                      <svg width="9" height="9" viewBox="0 0 9 9" style={{ flexShrink: 0, transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: 'rgba(255,255,255,0.28)' }}>
                        <path d="M2 1l5 3.5L2 8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill={isOpen ? 'rgba(224,90,28,0.3)' : 'none'} stroke="#e05a1c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
                      </svg>
                      <span style={{ fontFamily: mono, fontSize: 11, color: 'rgba(255,255,255,0.75)', flex: 1, textAlign: 'left', letterSpacing: '0.02em' }}>
                        {folder.name}
                      </span>
                      <span style={{ fontFamily: mono, fontSize: 9, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.06em' }}>
                        {folder.skills.length}
                      </span>
                    </button>

                    {/* Skills list */}
                    {isOpen && (
                      <div style={{ marginLeft: 22, marginTop: 2 }}>
                        {folder.skills.map((skill, idx) => {
                          const isActive = selectedSkill?.name === skill.name;
                          return (
                            <button
                              key={idx}
                              className="skill-item-btn"
                              onClick={() => selectSkill(skill)}
                              style={{
                                width: '100%', display: 'flex', alignItems: 'center', gap: 7,
                                padding: '0.4rem 0.6rem', borderRadius: 7, border: 'none',
                                background: isActive ? 'rgba(224,90,28,0.12)' : 'transparent',
                                borderLeft: isActive ? '2px solid #e05a1c' : '2px solid transparent',
                                cursor: 'pointer', transition: 'all 0.18s', marginBottom: 2,
                              }}
                            >
                              <span style={{
                                fontFamily: mono, fontSize: 9, fontWeight: 600,
                                padding: '2px 6px', borderRadius: 4,
                                background: 'rgba(16,185,129,0.12)', color: '#10b981',
                                letterSpacing: '0.08em', flexShrink: 0,
                              }}>GET</span>
                              <span style={{
                                fontFamily: mono, fontSize: 10.5,
                                color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                                flex: 1, textAlign: 'left',
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                              }}>
                                {skill.name}
                              </span>
                              <span style={{ fontFamily: mono, fontSize: 9, color: '#10b981' }}>200</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right panel — Request / Response ── */}
          <div style={{
            borderRadius: 14, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(8,8,8,0.88)',
            boxShadow: '0 0 0 1px rgba(224,90,28,0.05)',
            display: 'flex', flexDirection: 'column',
          }}>

            {/* URL bar */}
            <div style={{
              padding: '0.9rem 1.25rem',
              background: 'rgba(12,12,12,0.98)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              {/* Traffic lights */}
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                {['#ff5f57','#febc2e','#28c840'].map((c, i) => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                ))}
              </div>

              {/* Method badge */}
              <span style={{
                fontFamily: mono, fontSize: 10, fontWeight: 600,
                padding: '3px 8px', borderRadius: 5,
                background: 'rgba(16,185,129,0.12)', color: '#10b981',
                letterSpacing: '0.1em', flexShrink: 0,
              }}>GET</span>

              {/* URL input */}
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 8, padding: '0.38rem 0.9rem',
                  fontFamily: mono, fontSize: 11.5,
                  color: 'rgba(255,255,255,0.65)',
                  outline: 'none', letterSpacing: '0.02em',
                }}
              />

              {/* Send button */}
              <button
                className="skill-send-btn"
                onClick={handleSend}
                disabled={isSending}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '0.38rem 1.1rem', borderRadius: 8,
                  border: '1px solid rgba(224,90,28,0.35)',
                  background: 'rgba(224,90,28,0.10)',
                  color: '#e05a1c', fontFamily: mono,
                  fontSize: 11, fontWeight: 500, letterSpacing: '0.08em',
                  cursor: isSending ? 'not-allowed' : 'pointer',
                  opacity: isSending ? 0.6 : 1,
                  transition: 'all 0.22s', outline: 'none', flexShrink: 0,
                }}
              >
                {isSending ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" style={{ animation: 'skillSpin 0.8s linear infinite' }}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="30 60" />
                  </svg>
                ) : (
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e05a1c', boxShadow: '0 0 6px rgba(224,90,28,0.8)', display: 'inline-block' }} />
                )}
                {isSending ? 'Sending…' : 'Send'}
              </button>
            </div>

            {/* Tabs */}
            <div style={{
              display: 'flex', gap: 0,
              background: 'rgba(10,10,10,0.9)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '0 1.25rem',
              overflowX: 'auto',
            }}>
              {['Params', 'Authorization', 'Headers (6)', 'Body', 'Scripts', 'Settings'].map((tab) => {
                const active = tab === 'Body';
                return (
                  <button
                    key={tab}
                    className="skill-tab"
                    style={{
                      fontFamily: mono, fontSize: 10.5,
                      color: active ? '#e05a1c' : 'rgba(255,255,255,0.3)',
                      padding: '0.65rem 0.85rem', border: 'none', background: 'transparent',
                      borderBottom: active ? '2px solid #e05a1c' : '2px solid transparent',
                      cursor: 'pointer', letterSpacing: '0.04em',
                      whiteSpace: 'nowrap', transition: 'color 0.18s',
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Body type row */}
            <div style={{
              padding: '0.6rem 1.25rem',
              background: 'rgba(8,8,8,0.6)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
            }}>
              {['none', 'form-data', 'x-www-form-urlencoded', 'raw', 'binary', 'GraphQL'].map((type) => (
                <label key={type} style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
                  <input
                    type="radio" name="bodyType" defaultChecked={type === 'raw'}
                    style={{ accentColor: '#e05a1c' }}
                  />
                  <span style={{ fontFamily: mono, fontSize: 10, color: type === 'raw' ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
                    {type}
                  </span>
                </label>
              ))}
              <select style={{
                marginLeft: 'auto', background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6,
                padding: '2px 8px', fontFamily: mono, fontSize: 10,
                color: '#60a5fa', outline: 'none',
              }}>
                <option>JSON</option>
                <option>JavaScript</option>
                <option>HTML</option>
              </select>
            </div>

            {/* Response area */}
            <div style={{ flex: 1, padding: '1.5rem 1.5rem', overflowY: 'auto', maxHeight: 560 }}>

              {isSending && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem', gap: 16 }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" style={{ animation: 'skillSpin 0.8s linear infinite' }}>
                    <circle cx="12" cy="12" r="10" stroke="#e05a1c" strokeWidth="2.5" fill="none" strokeDasharray="40 60" />
                  </svg>
                  <span style={{ fontFamily: mono, fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>
                    Sending request…
                  </span>
                </div>
              )}

              {!isSending && !showResponse && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem', gap: 12 }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(224,90,28,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                  </svg>
                  <span style={{ fontFamily: mono, fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>
                    Click Send to execute request
                  </span>
                </div>
              )}

              {!isSending && showResponse && selectedSkill && (
                <div className="skill-fade-in">

                  {/* Skill name + meta */}
                  <div style={{ marginBottom: '1.2rem', paddingBottom: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontFamily: display, fontSize: 26, fontWeight: 400, color: '#fff', letterSpacing: '-0.02em', marginBottom: 10, textTransform: 'capitalize' }}>
                      {selectedSkill.name}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                      <span style={{
                        fontFamily: mono, fontSize: 10, fontWeight: 600,
                        padding: '3px 10px', borderRadius: 20,
                        background: 'rgba(16,185,129,0.12)', color: '#10b981',
                        letterSpacing: '0.06em',
                      }}>
                        {selectedSkill.status} {selectedSkill.statusText}
                      </span>
                      <span style={{ fontFamily: mono, fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>
                        ⏱ 42ms
                      </span>
                      <span style={{ fontFamily: mono, fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>
                        📦 1.2 KB
                      </span>
                      <span style={{ fontFamily: mono, fontSize: 10, color: '#e05a1c', letterSpacing: '0.06em', marginLeft: 'auto' }}>
                        {selectedSkill.experience}
                      </span>
                    </div>
                  </div>

                  {/* JSON response block */}
                  <div style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 10, padding: '1.1rem 1.25rem',
                    fontFamily: mono, fontSize: 11.5, lineHeight: 1.85,
                    marginBottom: '1.5rem', overflowX: 'auto',
                  }}>
                    <div style={{ color: 'rgba(255,255,255,0.22)', marginBottom: 6, fontSize: 10 }}>// Response Body — JSON</div>
                    <div><span style={{ color: 'rgba(255,255,255,0.35)' }}>{'{'}</span></div>
                    <div style={{ paddingLeft: 16 }}>
                      <span style={{ color: '#f472b6' }}>"skill"</span><span style={{ color: 'rgba(255,255,255,0.3)' }}>: </span>
                      <span style={{ color: '#86efac' }}>"{selectedSkill.name}"</span><span style={{ color: 'rgba(255,255,255,0.3)' }}>,</span>
                    </div>
                    <div style={{ paddingLeft: 16 }}>
                      <span style={{ color: '#f472b6' }}>"status"</span><span style={{ color: 'rgba(255,255,255,0.3)' }}>: </span>
                      <span style={{ color: '#86efac' }}>"active"</span><span style={{ color: 'rgba(255,255,255,0.3)' }}>,</span>
                    </div>
                    <div style={{ paddingLeft: 16 }}>
                      <span style={{ color: '#f472b6' }}>"experience"</span><span style={{ color: 'rgba(255,255,255,0.3)' }}>: </span>
                      <span style={{ color: '#86efac' }}>"{selectedSkill.experience}"</span><span style={{ color: 'rgba(255,255,255,0.3)' }}>,</span>
                    </div>
                    <div style={{ paddingLeft: 16 }}>
                      <span style={{ color: '#f472b6' }}>"description"</span><span style={{ color: 'rgba(255,255,255,0.3)' }}>: </span>
                      <span style={{ color: '#fbbf24' }}>"{selectedSkill.response.description}"</span><span style={{ color: 'rgba(255,255,255,0.3)' }}>,</span>
                    </div>
                    <div style={{ paddingLeft: 16 }}>
                      <span style={{ color: '#f472b6' }}>"projects"</span><span style={{ color: 'rgba(255,255,255,0.3)' }}>: [</span>
                      {selectedSkill.response.projects.map((p, i) => (
                        <div key={i} style={{ paddingLeft: 16 }}>
                          <span style={{ color: '#86efac' }}>"{p}"</span>
                          {i < selectedSkill.response.projects.length - 1 && <span style={{ color: 'rgba(255,255,255,0.3)' }}>,</span>}
                        </div>
                      ))}
                      <span style={{ color: 'rgba(255,255,255,0.3)' }}>],</span>
                    </div>
                    <div style={{ paddingLeft: 16 }}>
                      <span style={{ color: '#f472b6' }}>"strengths"</span><span style={{ color: 'rgba(255,255,255,0.3)' }}>: [</span>
                      {selectedSkill.response.strengths.map((s, i) => (
                        <div key={i} style={{ paddingLeft: 16 }}>
                          <span style={{ color: '#86efac' }}>"{s}"</span>
                          {i < selectedSkill.response.strengths.length - 1 && <span style={{ color: 'rgba(255,255,255,0.3)' }}>,</span>}
                        </div>
                      ))}
                      <span style={{ color: 'rgba(255,255,255,0.3)' }}>]</span>
                    </div>
                    <div><span style={{ color: 'rgba(255,255,255,0.35)' }}>{'}'}</span></div>
                  </div>

                  {/* Strengths pills */}
                  <div>
                    <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 10 }}>
                      Key Strengths
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {selectedSkill.response.strengths.map((s, i) => (
                        <span
                          key={i}
                          className="skill-strength"
                          style={{
                            fontFamily: mono, fontSize: 10.5,
                            padding: '5px 12px', borderRadius: 20,
                            border: '1px solid rgba(224,90,28,0.28)',
                            background: 'rgba(224,90,28,0.07)',
                            color: '#e05a1c', letterSpacing: '0.04em',
                            transition: 'background 0.18s', cursor: 'default',
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;