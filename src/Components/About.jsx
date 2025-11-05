import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  const [typedCommands, setTypedCommands] = useState([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [autoExecute, setAutoExecute] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(null);
  const [manualCommand, setManualCommand] = useState('');
  const [manualExecutedCommands, setManualExecutedCommands] = useState([]);

  const redisCommands = [
    { 
      command: 'HGETALL developer:avinash',
      description: 'Get all profile information (name, role, university, etc.)',
      response: [
        '"name" "Avinash Jha"',
        '"role" "Computer Science Engineering Student"',
        '"university" "Bhagwan Parshuram Institute of Technology, GGSIPU, Delhi"',
        '"passion" "Software Development, Problem-solving, Full-stack Development"',
        '"stack" "MERN Stack"'
      ]
    },
    {
      command: 'LRANGE achievements:avinash 0 -1',
      description: 'List all achievements and competition rankings',
      response: [
        '1) "AIR 26 - ZS Campus Beats Hackathon"',
        '2) "Global Rank 157 - CodeChef Starters 132"',
        '3) "Active Peer Mentoring & Collaboration"',
        '4) "Building Scalable Solutions"'
      ]
    },
    {
      command: 'GET developer:avinash:experience',
      description: 'Get experience summary',
      response: ['"Practical experience through projects, internships, and competitions"']
    },
    {
      command: 'SMEMBERS developer:avinash:values',
      description: 'View core values and principles',
      response: [
        '1) "Collaboration"',
        '2) "Mentorship"',
        '3) "Continuous Learning"',
        '4) "Meaningful Impact"'
      ]
    },
    {
      command: 'GET developer:avinash:looking_for',
      description: 'See what opportunities I\'m seeking',
      response: ['"Software Development Engineering & Full Stack Development opportunities to build impactful projects"']
    }
  ];

  const copyCommand = (command) => {
    navigator.clipboard.writeText(command).then(() => {
      setCopiedCommand(command);
      setTimeout(() => setCopiedCommand(null), 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      // Fallback method
      const textArea = document.createElement('textarea');
      textArea.value = command;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedCommand(command);
        setTimeout(() => setCopiedCommand(null), 2000);
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      document.body.removeChild(textArea);
    });
  };

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => setShowCursor(prev => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  // Auto-execute commands with delay
  useEffect(() => {
    if (autoExecute && currentCommandIndex < redisCommands.length) {
      const timer = setTimeout(() => {
        setTypedCommands(prev => [...prev, redisCommands[currentCommandIndex]]);
        setCurrentCommandIndex(prev => prev + 1);
      }, currentCommandIndex === 0 ? 500 : 1500);
      
      return () => clearTimeout(timer);
    }
  }, [currentCommandIndex, redisCommands, autoExecute]);

  const handleExecuteCommands = () => {
    setAutoExecute(true);
    setTypedCommands([]);
    setCurrentCommandIndex(0);
  };

  const handleManualCommand = (e) => {
    e.preventDefault();
    const trimmedCommand = manualCommand.trim();
    if (!trimmedCommand) return;

    // Find matching command
    const foundCommand = redisCommands.find(cmd => cmd.command === trimmedCommand);
    
    if (foundCommand) {
      setManualExecutedCommands(prev => [...prev, foundCommand]);
      setManualCommand('');
    } else {
      setManualExecutedCommands(prev => [...prev, {
        command: trimmedCommand,
        response: ['(error) ERR unknown command `' + trimmedCommand + '`']
      }]);
      setManualCommand('');
    }
  };

  return (
    <section id="about" className="relative min-h-screen py-20 px-6 overflow-hidden">
      {/* Redis Red Background */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0f0f0f] via-[#1a0a0a] to-[#000000]"></div>

      <div className="relative max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 flex items-center justify-center gap-4">
            <FontAwesomeIcon icon={faDatabase} className="text-[#dc382d]" />
            <span className="text-[#dc382d]">About Me</span>
          </h2>
          <div className="w-32 h-1 bg-[#dc382d] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg font-mono mb-4">redis-cli --connect developer:avinash</p>
          
          {/* Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {!autoExecute && (
              <button
                onClick={handleExecuteCommands}
                className="bg-[#dc382d] hover:bg-[#b92d23] text-white font-bold py-3 px-8 rounded-lg font-mono text-sm transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(220,56,45,0.5)] transform hover:scale-105"
              >
                ▶ EXECUTE ALL COMMANDS
              </button>
            )}
            <button
              onClick={() => setShowCommands(!showCommands)}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg font-mono text-sm transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              {showCommands ? '✕ HIDE' : '📖 SHOW'} AVAILABLE COMMANDS
            </button>
          </div>
        </div>

        {/* Command Reference Panel */}
        {showCommands && (
          <div className="mb-8 bg-[#0a0a0a] rounded-lg border-2 border-[#dc382d]/30 overflow-hidden shadow-2xl">
            <div className="bg-[#dc382d]/20 px-6 py-3 border-b border-[#dc382d]/30">
              <h3 className="text-[#dc382d] font-mono font-bold text-lg">📚 Available Redis Commands</h3>
              <p className="text-gray-400 text-xs mt-1">Click any command to copy it to clipboard</p>
            </div>
            <div className="p-6 space-y-4">
              {redisCommands.map((cmd, index) => (
                <div 
                  key={index}
                  onClick={() => copyCommand(cmd.command)}
                  className="bg-[#1a1a1a] p-4 rounded-lg border border-[#dc382d]/20 hover:border-[#dc382d]/50 transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#00ff00] font-mono text-sm font-bold">{cmd.command}</span>
                        {copiedCommand === cmd.command && (
                          <span className="text-xs text-[#dc382d] font-mono animate-pulse">✓ Copied!</span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{cmd.description}</p>
                    </div>
                    <div className="text-gray-500 group-hover:text-[#dc382d] hover:scale-110 transition-all text-xl">
                      📋
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#dc382d]/10 px-6 py-3 border-t border-[#dc382d]/30">
              <p className="text-gray-500 text-xs font-mono">
                💡 <span className="text-[#dc382d]">Tip:</span> Copy any command and paste it into the terminal below, or click "EXECUTE ALL COMMANDS" to run them automatically!
              </p>
            </div>
          </div>
        )}

        {/* Redis CLI Terminal */}
        <div className="bg-[#0a0a0a] rounded-lg overflow-hidden shadow-2xl border-2 border-[#dc382d]/30">
          {/* Terminal Header */}
          <div className="bg-[#dc382d] px-4 py-2 flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-white/80"></div>
              <div className="w-3 h-3 rounded-full bg-white/80"></div>
              <div className="w-3 h-3 rounded-full bg-white/80"></div>
            </div>
            <span className="text-white font-mono text-sm font-bold">Redis CLI - developer:avinash</span>
          </div>

          {/* Terminal Content */}
          <div className="p-6 font-mono text-sm min-h-[600px] max-h-[700px] overflow-y-auto">
            {/* Connection Message */}
            <div className="mb-6">
              <div className="text-gray-500">Connected to Redis server</div>
              <div className="text-gray-500">Redis version: 7.2.0</div>
              <div className="text-[#dc382d]">127.0.0.1:6379&gt;</div>
            </div>

            {/* Waiting State */}
            {!autoExecute && typedCommands.length === 0 && manualExecutedCommands.length === 0 && (
              <div className="text-center py-20">
                <FontAwesomeIcon icon={faDatabase} className="text-6xl text-[#dc382d]/30 mb-4 animate-pulse" />
                <p className="text-gray-500 mb-2">Waiting for commands...</p>
                <p className="text-gray-600 text-xs">Click the button above to execute Redis queries or paste commands below</p>
              </div>
            )}

            {/* Manual Executed Commands */}
            {manualExecutedCommands.map((cmd, index) => (
              <div key={`manual-${index}`} className="mb-6">
                <div className="mb-2">
                  <span className="text-[#dc382d]">127.0.0.1:6379&gt; </span>
                  <span className="text-[#00ff00]">{cmd.command}</span>
                </div>
                <div className="ml-4">
                  {cmd.response.map((line, i) => (
                    <div key={i} className={`mb-1 ${line.includes('error') ? 'text-red-400' : 'text-[#ffcc00]'}`}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Typed Commands */}
            {typedCommands.map((cmd, index) => (
              <div key={index} className="mb-6">
                {/* Command */}
                <div className="mb-2">
                  <span className="text-[#dc382d]">127.0.0.1:6379&gt; </span>
                  <span className="text-[#00ff00]">{cmd.command}</span>
                </div>
                
                {/* Response */}
                <div className="ml-4">
                  {cmd.response.map((line, i) => (
                    <div key={i} className="text-[#ffcc00] mb-1">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Cursor */}
            {autoExecute && currentCommandIndex < redisCommands.length && (
              <div>
                <span className="text-[#dc382d]">127.0.0.1:6379&gt; </span>
                <span 
                  className="inline-block w-2 h-4 bg-[#dc382d] align-middle"
                  style={{ opacity: showCursor ? 1 : 0 }}
                ></span>
              </div>
            )}

            {/* Manual Command Input */}
            {!autoExecute && (
              <form onSubmit={handleManualCommand} className="flex items-center gap-2">
                <span className="text-[#dc382d]">127.0.0.1:6379&gt;</span>
                <input
                  type="text"
                  value={manualCommand}
                  onChange={(e) => setManualCommand(e.target.value)}
                  placeholder="Paste command here and press Enter..."
                  className="flex-1 bg-transparent border-none outline-none text-[#00ff00] font-mono text-sm placeholder-gray-600"
                  autoFocus
                />
              </form>
            )}

            {/* All commands executed */}
            {autoExecute && currentCommandIndex >= redisCommands.length && (
              <div>
                <div className="mb-4">
                  <span className="text-[#dc382d]">127.0.0.1:6379&gt; </span>
                  <span className="text-gray-500">// All data retrieved successfully ✓</span>
                </div>
                <div className="mt-6 p-4 bg-[#dc382d]/10 border-l-4 border-[#dc382d] rounded">
                  <div className="text-[#dc382d] font-bold mb-2">💡 Key Takeaway:</div>
                  <div className="text-gray-300">
                    I'm a passionate developer ready to turn innovative ideas into scalable solutions. 
                    Currently seeking <span className="text-[#00ff00] font-bold">SDE opportunities</span> to make meaningful impact!
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Terminal Footer */}
          <div className="bg-[#dc382d]/20 px-4 py-2 border-t border-[#dc382d]/30">
            <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
              <span>📡 Connected</span>
              <span>•</span>
              <span>⚡ {typedCommands.length}/{redisCommands.length} commands executed</span>
              <span>•</span>
              <span>🔴 Redis Mode: READ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
