import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFolder, 
  faFolderOpen, 
  faChevronRight,
  faChevronDown,
  faCheck,
  faClock,
  faCode
} from '@fortawesome/free-solid-svg-icons';

const Skills = () => {
  const BASE_URL = 'https://skills.avinash.dev';

  const skillsData = [
    {
      id: 'languages',
      name: 'Programming Languages',
      color: '#E74C3C',
      skills: [
        {
          name: 'C /C++',
          method: 'GET',
          endpoint: '/skills/cpp',
          status: 200,
          statusText: 'OK',
          experience: '2+ years',
          response: {
            description: 'Strong foundation in systems programming and competitive programming',
            projects: ['Data Structures Implementation', 'Algorithm Problems', 'System-level Programming'],
            strengths: ['Memory Management', 'STL', 'Problem Solving']
          }
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
            strengths: ['OOP Concepts', 'Collections Framework', 'Exception Handling']
          }
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
            strengths: ['Async/Await', 'DOM Manipulation', 'ES6+ Features']
          }
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
            strengths: ['Libraries', 'Data Structures', 'Problem Solving']
          }
        }
      ]
    },
    {
      id: 'frontend',
      name: 'Frontend Technologies',
      color: '#FF6C37',
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
            strengths: ['Component Design', 'State Management', 'Hooks', 'Performance Optimization']
          }
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
            strengths: ['Semantic HTML', 'Flexbox', 'Grid', 'Responsive Design']
          }
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
            strengths: ['Utility Classes', 'Custom Themes', 'Responsive Design']
          }
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
            strengths: ['Grid System', 'Components', 'Responsive Utilities']
          }
        }
      ]
    },
    {
      id: 'backend',
      name: 'Backend & Database',
      color: '#48BB78',
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
            strengths: ['API Development', 'Async Programming', 'Event-Driven Architecture']
          }
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
            strengths: ['Routing', 'Middleware', 'Error Handling', 'Authentication']
          }
        },
        {
          name: 'Socket.io',
          method: 'GET',
          endpoint: '/skills/socketio',
          status: 200,
          statusText: 'OK',
          experience: '6+ months',
          response: {
            description: 'Real-time bidirectional event-based communication',
            projects: ['Chat Applications', 'Real-time Notifications', 'Collaborative Tools'],
            strengths: ['WebSockets', 'Real-time Events', 'Broadcasting']
          }
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
            strengths: ['Schema Design', 'CRUD Operations', 'Aggregation', 'Indexing']
          }
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
            strengths: ['SQL Queries', 'Joins', 'Normalization', 'Transactions']
          }
        }
      ]
    },
    {
      id: 'core',
      name: 'Core Skills',
      color: '#9B59B6',
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
            strengths: ['Problem Solving', 'Time Complexity', 'Space Optimization', 'Algorithm Design']
          }
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
            strengths: ['MERN Stack', 'RESTful APIs', 'Responsive Design', 'Authentication']
          }
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
            strengths: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Design Patterns']
          }
        }
      ]
    },
    {
      id: 'tools',
      name: 'Developer Tools',
      color: '#4299E1',
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
            strengths: ['Git Commands', 'Branching', 'Pull Requests', 'GitHub Actions']
          }
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
            strengths: ['Extensions', 'Shortcuts', 'Debugging', 'IntelliSense']
          }
        },
        {
          name: 'Cursor AI',
          method: 'GET',
          endpoint: '/skills/cursor',
          status: 200,
          statusText: 'OK',
          experience: '6+ months',
          response: {
            description: 'AI-powered code editor for enhanced productivity',
            projects: ['Modern Projects', 'AI-Assisted Development'],
            strengths: ['AI Code Generation', 'Code Understanding', 'Refactoring']
          }
        },
        {
          name: 'GitHub Copilot',
          method: 'GET',
          endpoint: '/skills/copilot',
          status: 200,
          statusText: 'OK',
          experience: '1+ years',
          response: {
            description: 'AI pair programmer for faster and smarter coding',
            projects: ['All Recent Projects', 'Rapid Development'],
            strengths: ['Code Suggestions', 'Documentation', 'Code Completion']
          }
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
            strengths: ['API Testing', 'Collections', 'Environment Variables', 'Automation']
          }
        }
      ]
    }
  ];

  // Initialize with first skill selected
  const defaultSkill = skillsData[0].skills[0];
  const [expandedFolders, setExpandedFolders] = useState(['languages']);
  const [selectedSkill, setSelectedSkill] = useState({ 
    ...defaultSkill, 
    folderColor: skillsData[0].color 
  });
  const [urlInput, setUrlInput] = useState(`${BASE_URL}${defaultSkill.endpoint}`);
  const [isSending, setIsSending] = useState(false);
  const [showResponse, setShowResponse] = useState(true);

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const selectSkill = (folder, skill) => {
    setSelectedSkill({ ...skill, folderColor: folder.color });
    setUrlInput(`${BASE_URL}${skill.endpoint}`);
    setShowResponse(false);
  };

  const handleSendRequest = () => {
    setIsSending(true);
    setShowResponse(false);
    
    // Simulate API request with delay
    setTimeout(() => {
      setIsSending(false);
      setShowResponse(true);
    }, 800);
  };

  const getMethodColor = (method) => {
    const colors = {
      GET: '#10B981',
      POST: '#F59E0B',
      PUT: '#3B82F6',
      PATCH: '#8B5CF6',
      DELETE: '#EF4444'
    };
    return colors[method] || '#6B7280';
  };

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return '#10B981';
    if (status >= 300 && status < 400) return '#3B82F6';
    return '#6B7280';
  };

  return (
    <section id="skills" className="relative min-h-screen py-20 px-6 overflow-hidden">
      {/* Postman Orange Background */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0f0f0f] via-[#1a0f0a] to-[#000000]"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 flex items-center justify-center gap-4">
            <FontAwesomeIcon icon={faCode} className="text-[#FF6C37]" />
            <span className="text-[#FF6C37]">Skills API</span>
          </h2>
          <div className="w-32 h-1 bg-[#FF6C37] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg font-mono"></p>
        </div>

        {/* Postman Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Collections */}
          <div className="lg:col-span-1">
            <div className="bg-[#0a0a0a] rounded-lg border-2 border-[#FF6C37]/30 overflow-hidden shadow-2xl">
              {/* Collections Header */}
              <div className="bg-[#FF6C37]/20 px-4 py-3 border-b border-[#FF6C37]/30">
                <h3 className="text-[#FF6C37] font-mono font-bold flex items-center gap-2">
                  <FontAwesomeIcon icon={faFolder} />
                  Collections
                </h3>
              </div>

              {/* Collections List */}
              <div className="p-4 max-h-[700px] overflow-y-auto">
                <div className="space-y-2">
                  {skillsData.map((folder) => (
                    <div key={folder.id} className="mb-4">
                      {/* Folder */}
                      <button
                        onClick={() => toggleFolder(folder.id)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-[#1a1a1a] transition-colors text-left"
                      >
                        <FontAwesomeIcon 
                          icon={expandedFolders.includes(folder.id) ? faChevronDown : faChevronRight} 
                          className="text-gray-500 text-xs"
                        />
                        <FontAwesomeIcon 
                          icon={expandedFolders.includes(folder.id) ? faFolderOpen : faFolder} 
                          style={{ color: folder.color }}
                        />
                        <span className="text-white font-mono text-sm">{folder.name}</span>
                        <span className="ml-auto text-gray-500 text-xs">({folder.skills.length})</span>
                      </button>

                      {/* Skills in Folder */}
                      {expandedFolders.includes(folder.id) && (
                        <div className="ml-6 mt-2 space-y-1">
                          {folder.skills.map((skill, index) => (
                            <button
                              key={index}
                              onClick={() => selectSkill(folder, skill)}
                              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-left transition-all ${
                                selectedSkill?.name === skill.name
                                  ? 'bg-[#FF6C37]/20 border-l-2 border-[#FF6C37]'
                                  : 'hover:bg-[#1a1a1a]'
                              }`}
                            >
                              <span 
                                className="px-2 py-0.5 rounded text-[10px] font-bold font-mono"
                                style={{ 
                                  backgroundColor: `${getMethodColor(skill.method)}20`,
                                  color: getMethodColor(skill.method)
                                }}
                              >
                                {skill.method}
                              </span>
                              <span className="text-gray-300 font-mono text-xs flex-1 truncate">
                                {skill.name}
                              </span>
                              <span 
                                className="text-xs font-mono"
                                style={{ color: getStatusColor(skill.status) }}
                              >
                                {skill.status}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Request/Response */}
          <div className="lg:col-span-2">
            <div className="bg-[#0a0a0a] rounded-lg border-2 border-[#FF6C37]/30 overflow-hidden shadow-2xl">
              {selectedSkill ? (
                <>
                  {/* Request URL Bar */}
                  <div className="bg-[#1a1a1a] px-4 py-4 border-b border-[#FF6C37]/30">
                    <div className="flex items-center gap-2 mb-4">
                      <select 
                        className="bg-[#0d0d0d] border border-[#FF6C37]/30 rounded px-3 py-2 font-mono text-sm font-bold outline-none"
                        style={{ color: getMethodColor(selectedSkill.method) }}
                        value={selectedSkill.method}
                        disabled
                      >
                        <option>{selectedSkill.method}</option>
                      </select>
                      <input
                        type="text"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="Enter URL or paste text"
                        className="flex-1 bg-[#0d0d0d] border border-[#FF6C37]/30 rounded px-4 py-2 text-gray-300 font-mono text-sm outline-none focus:border-[#FF6C37] transition-colors"
                      />
                      <button 
                        onClick={handleSendRequest}
                        disabled={isSending}
                        className="bg-[#4A90E2] hover:bg-[#3a7bc8] text-white px-6 py-2 rounded font-mono text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isSending ? (
                          <>
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          'Send'
                        )}
                      </button>
                      <button className="bg-transparent hover:bg-[#0d0d0d] text-gray-400 px-3 py-2 rounded transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Tabs - Params, Authorization, Headers, Body, etc */}
                  <div className="bg-[#0d0d0d] px-4 border-b border-[#FF6C37]/30">
                    <div className="flex gap-6 overflow-x-auto">
                      <button className="text-gray-500 font-mono text-xs py-3 hover:text-gray-300 whitespace-nowrap">
                        Params
                      </button>
                      <button className="text-gray-500 font-mono text-xs py-3 hover:text-gray-300 whitespace-nowrap">
                        Authorization
                      </button>
                      <button className="text-gray-500 font-mono text-xs py-3 hover:text-gray-300 whitespace-nowrap">
                        Headers <span className="text-[#FF6C37]">(6)</span>
                      </button>
                      <button className="text-[#FF6C37] font-mono text-xs py-3 font-bold border-b-2 border-[#FF6C37] whitespace-nowrap">
                        Body
                      </button>
                      <button className="text-gray-500 font-mono text-xs py-3 hover:text-gray-300 whitespace-nowrap">
                        Scripts
                      </button>
                      <button className="text-gray-500 font-mono text-xs py-3 hover:text-gray-300 whitespace-nowrap">
                        Settings
                      </button>
                    </div>
                  </div>

                  {/* Body Type Options */}
                  <div className="bg-[#0a0a0a] px-4 py-3 border-b border-[#FF6C37]/30">
                    <div className="flex items-center gap-4 flex-wrap text-xs font-mono">
                      <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                        <input type="radio" name="bodyType" className="text-[#FF6C37]" />
                        <span>none</span>
                      </label>
                      <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                        <input type="radio" name="bodyType" className="text-[#FF6C37]" />
                        <span>form-data</span>
                      </label>
                      <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                        <input type="radio" name="bodyType" className="text-[#FF6C37]" />
                        <span>x-www-form-urlencoded</span>
                      </label>
                      <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                        <input type="radio" name="bodyType" defaultChecked className="text-[#FF6C37]" />
                        <span>raw</span>
                      </label>
                      <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                        <input type="radio" name="bodyType" className="text-[#FF6C37]" />
                        <span>binary</span>
                      </label>
                      <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                        <input type="radio" name="bodyType" className="text-[#FF6C37]" />
                        <span>GraphQL</span>
                      </label>
                      <select className="ml-auto bg-[#0d0d0d] border border-[#FF6C37]/30 rounded px-2 py-1 text-[#4A90E2] text-xs outline-none">
                        <option>JSON</option>
                        <option>JavaScript</option>
                        <option>HTML</option>
                        <option>XML</option>
                      </select>
                    </div>
                  </div>

                  {/* Response Body */}
                  <div className="p-6 max-h-[600px] overflow-y-auto">
                    {isSending ? (
                      // Loading State
                      <div className="flex flex-col items-center justify-center py-20">
                        <svg className="animate-spin h-12 w-12 text-[#FF6C37] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-gray-400 font-mono text-lg">Sending request...</p>
                        <p className="text-gray-600 font-mono text-sm mt-2">Waiting for response</p>
                      </div>
                    ) : showResponse ? (
                      <>
                        {/* Skill Header Info */}
                        <div className="mb-4 pb-4 border-b border-[#FF6C37]/20">
                          <div className="text-2xl font-bold text-white mb-2">{selectedSkill.name}</div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <FontAwesomeIcon icon={faClock} className="text-gray-500" />
                              <span className="text-gray-400 font-mono">{selectedSkill.experience}</span>
                            </div>
                          </div>
                        </div>

                    {/* Status */}
                    <div className="mb-6 flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-mono text-sm">Status:</span>
                        <span 
                          className="px-3 py-1 rounded font-bold font-mono text-sm"
                          style={{ 
                            backgroundColor: `${getStatusColor(selectedSkill.status)}20`,
                            color: getStatusColor(selectedSkill.status)
                          }}
                        >
                          {selectedSkill.status} {selectedSkill.statusText}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-mono text-sm">Time:</span>
                        <span className="text-green-400 font-mono text-sm">42ms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-mono text-sm">Size:</span>
                        <span className="text-blue-400 font-mono text-sm">1.2 KB</span>
                      </div>
                    </div>

                    {/* JSON Response */}
                    <div className="bg-[#0d0d0d] rounded-lg p-4 font-mono text-sm">
                      <div className="text-gray-500 mb-2">// Response Body (JSON)</div>
                      <pre className="text-gray-300 overflow-x-auto">
                        <code>{`{
  "skill": "${selectedSkill.name}",
  "status": "active",
  "experience": "${selectedSkill.experience}",
  "description": "${selectedSkill.response.description}",
  "projects": [
${selectedSkill.response.projects.map(p => `    "${p}"`).join(',\n')}
  ],
  "strengths": [
${selectedSkill.response.strengths.map(s => `    "${s}"`).join(',\n')}
  ],
  "timestamp": "${new Date().toISOString()}"
}`}</code>
                      </pre>
                    </div>

                    {/* Strengths */}
                    <div className="mt-6">
                      <h4 className="text-white font-mono font-bold mb-3 flex items-center gap-2">
                        <FontAwesomeIcon icon={faCheck} className="text-green-400" />
                        Key Strengths
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSkill.response.strengths.map((strength, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1 bg-[#1a1a1a] text-[#FF6C37] text-sm font-mono rounded border border-[#FF6C37]/30"
                          >
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>
                      </>
                    ) : (
                      // Empty State - Click Send
                      <div className="p-20 text-center">
                        <FontAwesomeIcon icon={faCode} className="text-6xl text-[#FF6C37]/30 mb-4" />
                        <p className="text-gray-400 font-mono text-lg">Ready to send request</p>
                        <p className="text-gray-600 font-mono text-sm mt-2">Click the "Send" button to see the response</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                // Empty State - No Skill Selected
                <div className="p-20 text-center">
                  <FontAwesomeIcon icon={faCode} className="text-6xl text-[#FF6C37]/30 mb-4" />
                  <p className="text-gray-500 font-mono">Select a skill from the collection to view details</p>
                  <p className="text-gray-600 font-mono text-sm mt-2">Click any API endpoint on the left</p>
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
