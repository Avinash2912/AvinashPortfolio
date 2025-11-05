import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faChartLine, faTrophy, faFire } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const CodingProfiles = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

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
    <section id="coding-profiles" className="relative min-h-screen py-20 px-6 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#0a0a0a] to-[#000000]"></div>
      
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-gradient-to-r from-[#FFA116]/20 to-[#2F8D46]/20 rounded-full border border-[#FFA116]/30">
            <FontAwesomeIcon icon={faTrophy} className="text-[#FFA116] text-xl" />
            <span className="text-gray-300 font-mono text-sm">Competitive Programmer</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#FFA116] via-[#2F8D46] to-[#ffffff] bg-clip-text text-transparent">
              Coding Profiles
            </span>
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-[#FFA116] via-[#2F8D46] to-[#ffffff] mx-auto rounded-full mb-6"></div>
          
          <p className="text-gray-400 text-lg font-mono max-w-2xl mx-auto">
            Explore my competitive programming journey across multiple platforms
          </p>
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {profiles.map((profile) => (
            <a
              key={profile.id}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredCard(profile.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative"
            >
              {/* Card Container */}
              <div className={`
                relative bg-[#0d0d0d] rounded-2xl border-2 overflow-hidden
                transition-all duration-500 transform
                ${hoveredCard === profile.id 
                  ? 'scale-105 shadow-2xl' 
                  : 'scale-100 hover:scale-102'
                }
              `}
              style={{
                borderColor: hoveredCard === profile.id ? profile.color : 'rgba(255,255,255,0.1)',
                boxShadow: hoveredCard === profile.id 
                  ? `0 20px 60px ${profile.color}40` 
                  : '0 10px 30px rgba(0,0,0,0.3)'
              }}>
                
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${profile.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Logo */}
                  <div className="mb-6 flex justify-center">
                    <div className={`
                      w-24 h-24 rounded-2xl flex items-center justify-center
                      bg-[#1a1a1a] border-2 transition-all duration-500
                      ${hoveredCard === profile.id ? 'scale-110 rotate-3' : 'scale-100'}
                    `}
                    style={{
                      borderColor: hoveredCard === profile.id ? profile.color : 'rgba(255,255,255,0.1)'
                    }}>
                      {profile.id === 'github' ? (
                        <FontAwesomeIcon 
                          icon={faGithub} 
                          className="text-5xl"
                          style={{ color: profile.color }}
                        />
                      ) : (
                        <img 
                          src={profile.logo} 
                          alt={profile.name}
                          className="w-16 h-16 object-contain"
                          style={{
                            filter: profile.id === 'leetcode' ? 'brightness(0) invert(1)' : 'none'
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Platform Name */}
                  <h3 className="text-2xl font-bold text-white mb-2 text-center">
                    {profile.name}
                  </h3>

                  {/* Username */}
                  <div className="mb-4 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] rounded-lg border border-white/10">
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
                  <p className="text-gray-400 text-sm font-mono mb-4 text-center">
                    {profile.description}
                  </p>

                  {/* Badge */}
                  <div className="flex items-center justify-center gap-2 mb-6">
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
                  <div className="text-center">
                    <div className={`
                      inline-flex items-center gap-2 px-6 py-3 rounded-lg
                      font-mono text-sm font-bold transition-all duration-300
                      ${hoveredCard === profile.id 
                        ? 'scale-105' 
                        : 'scale-100'
                      }
                    `}
                    style={{
                      backgroundColor: hoveredCard === profile.id ? profile.color : 'rgba(255,255,255,0.05)',
                      color: hoveredCard === profile.id ? '#000' : '#fff',
                      border: `2px solid ${hoveredCard === profile.id ? profile.color : 'rgba(255,255,255,0.1)'}`
                    }}>
                      <span>Visit Profile</span>
                      <span className="text-lg">→</span>
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
        <div className="bg-gradient-to-r from-[#FFA116]/10 via-[#2F8D46]/10 to-[#ffffff]/10 rounded-2xl p-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[#FFA116] mb-2">500+</div>
              <div className="text-gray-400 font-mono text-sm">Problems Solved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#2F8D46] mb-2">DSA Expert</div>
              <div className="text-gray-400 font-mono text-sm">Data Structures & Algorithms</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">Active</div>
              <div className="text-gray-400 font-mono text-sm">Daily Practice</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodingProfiles;
