import React, { useState } from 'react';

export const Experience = () => {
  const [isExecuted, setIsExecuted] = useState(false);

  const experiences = [
    {
      role: 'Associate Software Developer',
      company: 'Makse Services Pvt Ltd.',
      duration: 'October 2025 - Present',
      details: (
        <>
          <span className="text-[#22c55e]">▸</span> Working on Workday — extending applications and integrating features.{'\n\n'}
          <span className="text-[#22c55e]">▸</span> Completed onboarding trainings and technical certifications.{'\n\n'}
          <span className="text-[#22c55e]">▸</span> Building internal apps and contributing to platform improvements.
        </>
      )
    },
    {
      role: 'Developer Intern',
      company: 'Infoedge India Pvt Ltd.',
      duration: 'Jan 2025 - July 2025',
      details: (
        <>
          <span className="text-[#22c55e]">▸</span> Designed an image moderation & duplicate detection system using Python, OpenCV, Gemini 2.0 Flash, SSIM & pHash — reduced duplicate detection effort by 60%+ and improved listing quality.{'\n\n'}
          <span className="text-[#22c55e]">▸</span> Developed web scrappers for 15 State RERA websites, extracting & structuring project data for better accessibility and completeness.{'\n\n'}
          <span className="text-[#22c55e]">▸</span> Automated sales productivity analysis, delivering actionable insights that boosted sales team efficiency.{'\n\n'}
          <span className="text-[#22c55e]">▸</span> Built an AI-powered property review pipeline with Python, OpenAI API & Gemini API — achieved 75% accuracy, enabling buyers to make informed investment decisions.{'\n\n'}
          <span className="text-[#22c55e]">▸</span> Built a real estate project-to-bank mapping tool across 14 loan-approving banks, strengthening data traceability & ensuring audit compliance.
        </>
      )
    }
  ];

  return (
    <section id="experience" className="relative min-h-screen py-20 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#000000]"></div>

      <div className="relative w-full mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-[#00D9FF]">
              Work Experience
            </span>
          </h2>
          <div className="w-32 h-1 bg-[#00D9FF] mx-auto rounded-full"></div>
        </div>

        {/* SQL Editor Container */}
        <div className="bg-[#000000] rounded-xl overflow-hidden shadow-2xl border border-[#333333]">
          {/* Editor Header */}
          <div className="bg-[#000000] px-6 py-3 flex items-center justify-between border-b border-[#333333]">
            <div className="flex items-center gap-2">
              <span className="text-[#ff6b6b] text-sm font-mono">SQL Editor</span>
              <span className="text-gray-500">—</span>
              <span className="text-[#4ade80] text-sm font-mono">work_experience.db</span>
            </div>
            <button
              onClick={() => setIsExecuted(!isExecuted)}
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-2 rounded-md font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-[#22c55e]/50"
            >
              Run <span>▶</span>
            </button>
          </div>

          {/* SQL Query */}
          <div className="bg-[#000000] p-6 font-mono text-sm">
            <div className="space-y-1">
              <div>
                <span className="text-[#60a5fa]">SELECT</span>{' '}
                <span className="text-[#a3e635]">wx.role</span>
                <span className="text-gray-500">, </span>
                <span className="text-[#a3e635]">co.company_name</span>
                <span className="text-gray-500">, </span>
                <span className="text-[#a3e635]">wx.duration</span>
                <span className="text-gray-500">, </span>
                <span className="text-[#a3e635]">wx.details</span>
              </div>
              <div>
                <span className="text-[#60a5fa]">FROM</span>{' '}
                <span className="text-gray-300">work_experience</span>{' '}
                <span className="text-[#60a5fa]">AS</span>{' '}
                <span className="text-gray-300">wx</span>
              </div>
              <div>
                <span className="text-[#60a5fa]">JOIN</span>{' '}
                <span className="text-gray-300">companies</span>{' '}
                <span className="text-[#60a5fa]">AS</span>{' '}
                <span className="text-gray-300">co</span>{' '}
                <span className="text-[#60a5fa]">ON</span>{' '}
                <span className="text-[#a3e635]">wx.company_id</span>{' '}
                <span className="text-gray-400">=</span>{' '}
                <span className="text-[#a3e635]">co.id</span>
              </div>
              <div>
                <span className="text-[#60a5fa]">WHERE</span>{' '}
                <span className="text-[#a3e635]">LOWER(wx.role)</span>{' '}
                <span className="text-gray-500">LIKE</span>{' '}
                <span className="text-[#fbbf24]">"%developer%"</span>{' '}
                <span className="text-gray-500">OR</span>{' '}
                <span className="text-[#a3e635]">LOWER(wx.role)</span>{' '}
                <span className="text-gray-500">LIKE</span>{' '}
                <span className="text-[#fbbf24]">"%intern%"</span>
                <span className="text-gray-500">;</span>
              </div>

              
            </div>

            {/* Hint Text */}
            {!isExecuted && (
              <div className="mt-6 flex items-center gap-2 text-[#60a5fa]">
                <span className="text-xl">💡</span>
                <span className="text-sm">Click the "Run ▶" button to execute the query!</span>
              </div>
            )}
          </div>

          {/* Results Table */}
          {isExecuted && (
            <div className="bg-[#000000] border-t border-[#333333]">
              {/* Table Header */}
              <div className="grid grid-cols-4 px-6 py-4 bg-[#000000] border-b border-[#333333] font-mono text-sm font-bold">
                <div className="text-[#60a5fa] border-r border-[#444444] pr-4 text-center">Role</div>
                <div className="text-[#a3e635] border-r border-[#444444] px-4 text-center">Company</div>
                <div className="text-[#fbbf24] border-r border-[#444444] px-4 text-center">Duration</div>
                <div className="text-[#f472b6] pl-4 text-center">Details</div>
              </div>

              {/* Table Rows */}
              <div className="max-h-[500px] overflow-y-auto">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-4 px-6 py-6 border-b border-[#333333] font-mono text-base"
                  >
                    <div className="text-gray-300 border-r border-[#444444] pr-4 text-sm text-center flex items-center justify-center">{exp.role}</div>
                    <div className="text-gray-300 border-r border-[#444444] px-4 text-sm text-center flex items-center justify-center">{exp.company}</div>
                    <div className="text-gray-300 border-r border-[#444444] px-4 text-sm text-center flex items-center justify-center">{exp.duration}</div>
                    <div className="text-gray-400 text-sm leading-relaxed pl-4 whitespace-pre-line">{exp.details}</div>
                  </div>
                ))}
              </div>

              {/* Status Footer */}
              <div className="px-6 py-3 bg-[#000000] border-t border-[#333333] text-[#22c55e] font-mono text-sm">
                Query executed successfully. Took 0.{Math.floor(Math.random() * 90) + 10}ms to execute. {experiences.length} row(s) returned.
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isExecuted && (
            <div className="bg-[#000000] border-t border-[#333333] py-32 text-center text-gray-500 font-mono">
              Execute query to see results...
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
