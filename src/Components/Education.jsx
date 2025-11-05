import React, { useState, useEffect } from 'react';

export const Education = () => {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const content = [
    { type: 'prompt', text: 'Avinash@MacBook-Pro ~ % ', color: '#22c55e' },
    { type: 'command', text: 'ls education', color: '#fbbf24', speed: 100 },
    { type: 'blank' },
    { type: 'text', text: 'B.Tech in Computer Science Engineering', color: '#fff', speed: 60 },
    { type: 'text', text: '━━ Guru Gobind Singh Indraprastha University (2021 – 2025)', color: '#94a3b8', speed: 50 },
    { type: 'highlight', text: 'CGPA: ', value: '8.69', color: '#fff', highlightColor: '#fbbf24', speed: 70 },
    { type: 'blank' },
    { type: 'text', text: 'Senior Secondary (Class XII)', color: '#fff', speed: 60 },
    { type: 'text', text: '━━ CBSE Board (2019 – 2020)', color: '#94a3b8', speed: 50 },
    { type: 'highlight', text: 'Percentage: ', value: '75%', color: '#fff', highlightColor: '#fbbf24', speed: 70 },
    { type: 'blank' },
    { type: 'text', text: 'Secondary (Class X)', color: '#fff', speed: 60 },
    { type: 'text', text: '━━ CBSE Board (2017 – 2018)', color: '#94a3b8', speed: 50 },
    { type: 'highlight', text: 'Percentage: ', value: '76.4%', color: '#fff', highlightColor: '#fbbf24', speed: 70 },
    { type: 'blank' },
    { type: 'email', text: '# For transcripts or verification, email at ', email: 'avinashjha19@outlook.com', color: '#64748b', speed: 50 },
    { type: 'blank' },
    { type: 'prompt', text: 'Avinash@MacBook-Pro ~ % ', color: '#22c55e' },
    { type: 'command', text: 'echo "Code is poetry written in logic 📚"', color: '#fbbf24', speed: 100 },
  ];

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor(prev => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  // Typing effect
  useEffect(() => {
    if (currentLine >= content.length) return;

    const line = content[currentLine];

    // Handle instant lines (prompt, blank)
    if (line.type === 'prompt' || line.type === 'blank') {
      setLines(prev => [...prev, line]);
      setCurrentLine(prev => prev + 1);
      return;
    }

    // Get full text to type
    const fullText = line.type === 'highlight' ? line.text + line.value :
                     line.type === 'email' ? line.text + line.email :
                     line.text;

    // Type character by character
    if (currentText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => fullText.substring(0, prev.length + 1));
      }, line.speed || 50);
      return () => clearTimeout(timeout);
    } else {
      // Line complete
      setLines(prev => [...prev, { ...line, completed: true }]);
      setCurrentText('');
      setTimeout(() => setCurrentLine(prev => prev + 1), 200);
    }
  }, [currentLine, currentText, content]);

  return (
    <section id="education" className="relative min-h-screen py-20 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#000000]"></div>

      <div className="relative max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-[#00ed64]">
              Education
            </span>
          </h2>
          <div className="w-32 h-1 bg-[#00ed64] mx-auto rounded-full"></div>
        </div>

        {/* Terminal Container */}
        <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-[#333333]">
          {/* Terminal Header */}
          <div className="bg-[#2d2d30] px-4 py-3 flex items-center gap-2 border-b border-[#333333]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <span className="text-gray-400 text-sm font-mono ml-4">education-terminal</span>
          </div>

          {/* Terminal Content */}
          <div className="bg-[#1e1e1e] p-8 font-mono text-base min-h-[600px]">
            {lines.map((line, i) => (
              <div key={i} className="mb-2">
                {line.type === 'blank' ? (
                  <br />
                ) : line.type === 'highlight' ? (
                  <div>
                    <span style={{ color: line.color }}>{line.text}</span>
                    <span style={{ color: line.highlightColor, fontWeight: 'bold' }}>{line.value}</span>
                  </div>
                ) : line.type === 'email' ? (
                  <div>
                    <span style={{ color: line.color }}>{line.text}</span>
                    <a href={`mailto:${line.email}`} className="text-[#60a5fa] hover:underline">
                      {line.email}
                    </a>
                  </div>
                ) : (
                  <span style={{ color: line.color }}>{line.text}</span>
                )}
              </div>
            ))}
            
            {/* Currently typing line */}
            {currentLine < content.length && currentText && (
              <div className="mb-2 inline-flex">
                <span style={{ color: content[currentLine].color }}>{currentText}</span>
                <span 
                  className="inline-block w-2 h-5 ml-1"
                  style={{
                    backgroundColor: '#22c55e',
                    opacity: 1
                  }}
                />
              </div>
            )}
            
            {/* Cursor when not typing */}
            {currentLine < content.length && !currentText && (
              <span 
                className="inline-block w-2 h-5 align-middle"
                style={{
                  backgroundColor: '#22c55e',
                  opacity: showCursor ? 1 : 0
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
