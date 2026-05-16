import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowUp, 
  faCircle, 
  faCompass, 
  faNetworkWired, 
  faShieldHalved,
  faArrowUpRightFromSquare
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'About Me', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Profiles', href: '#coding-profiles' }
  ];

  const socials = [
    { name: 'GitHub', url: 'https://github.com/Avinash2912', icon: faGithub, color: 'hover:text-white hover:border-white/40 hover:bg-white/[0.02]' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/avinash-jha', icon: faLinkedin, color: 'hover:text-[#0077B5] hover:border-[#0077B5]/40 hover:bg-[#0077B5]/5' },
    { name: 'LeetCode', url: 'https://leetcode.com/u/Avinash_1912/', icon: faNetworkWired, color: 'hover:text-[#FFA116] hover:border-[#FFA116]/40 hover:bg-[#FFA116]/5' }
  ];

  return (
    <footer className="relative bg-[#030305] text-white border-t border-white/[0.05] overflow-hidden py-28 px-8 sm:px-16 lg:px-24">
      
      {/* High-End Ambient Lighting (Dynamic Space Depth) */}
      <div className="absolute -top-60 -left-60 w-[500px] h-[500px] bg-[#e05a1c]/[0.04] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-20 w-[400px] h-[400px] bg-[#e05a1c]/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Structured Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black_100%)] pointer-events-none" />

      {/* Max Width Expanded to 7xl for Premium Screen Distribution */}
      <div className="relative max-w-7xl mx-auto z-10 space-y-16">
        
        {/* UPPER DASHBOARD GRID: Massive Spacing Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 pb-16 border-b border-white/[0.08]">
          
          {/* Brand Panel (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#e05a1c]/20 to-black border border-[#e05a1c]/40 shadow-[0_0_20px_rgba(224,90,28,0.2)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e05a1c] animate-pulse" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Avinash Jha
              </span>
            </div>
            
            <p className="text-base text-gray-400 font-sans leading-relaxed max-w-md">
              Engineering high-fidelity web experiences, modular micro-systems, and highly optimized frontend interfaces. Focused on performance, scale, and clean architecture.
            </p>

            <div className="flex items-center gap-6 text-xs font-mono text-gray-500 pt-2 tracking-wider">
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faShieldHalved} className="text-[#e05a1c]/70 text-sm" />
                SECURE_NODE // DELHI, IN
              </span>
              <span className="flex items-center gap-2 text-emerald-400 font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                STATUS: ACTIVE
              </span>
            </div>
          </div>

          {/* Navigation Index (3 Columns) */}
          <div className="lg:col-span-3 space-y-6 lg:pl-8">
            <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-gray-500 uppercase">
              <FontAwesomeIcon icon={faCompass} className="text-gray-600 text-xs" />
              Index Routing
            </div>
            <ul className="grid grid-cols-1 gap-y-4 text-base">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group font-sans"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e05a1c] opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-50 group-hover:scale-100" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connection Gateways (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="text-xs font-mono tracking-widest text-gray-500 uppercase">
              // Connection Gateways
            </div>
            <div className="flex flex-col gap-4">
              <a 
                href="mailto:avinashjha19@outlook.com"
                className="group flex items-center justify-between p-4 rounded-xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.05] hover:border-[#e05a1c]/30 transition-all duration-300"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">SECURE_MAIL_ENDPOINT</span>
                  <span className="text-base font-sans text-gray-300 group-hover:text-white transition-colors">avinashjha19@outlook.com</span>
                </div>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-sm text-gray-600 group-hover:text-[#e05a1c] transition-colors duration-300 mr-2" />
              </a>
              
              {/* Grid System for Social Modules */}
              <div className="grid grid-cols-3 gap-3">
                {socials.map((soc, i) => (
                  <a
                    key={i}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center py-4 px-3 rounded-xl bg-white/[0.01] border border-white/[0.05] transition-all duration-300 text-gray-400 ${soc.color} group gap-2`}
                  >
                    <FontAwesomeIcon icon={soc.icon} className="text-lg group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-mono tracking-wider text-gray-500 mt-0.5">{soc.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* SYSTEM ANALYTICS COMPONENT BAR (Un-cluttered Matrix) */}
        <div className="p-6 rounded-xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-md grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 text-xs font-mono text-gray-400">
          <div className="flex flex-col gap-1.5 pl-2">
            <span className="text-gray-600 font-bold text-[10px] tracking-widest uppercase">// Runtime Env</span>
            <span className="text-sm text-gray-300 font-sans">React 19 + Tailwind CSS + Vite</span>
          </div>
          <div className="flex flex-col gap-1.5 border-t sm:border-t-0 sm:border-x border-white/[0.06] pt-4 sm:pt-0 sm:px-6">
            <span className="text-gray-600 font-bold text-[10px] tracking-widest uppercase">// System Health</span>
            <span className="text-sm text-gray-300 font-sans flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" /> All systems operational
            </span>
          </div>
          <div className="flex flex-col gap-1.5 pt-4 sm:pt-0 sm:pl-6">
            <span className="text-gray-600 font-bold text-[10px] tracking-widest uppercase">// Compilation</span>
            <span className="text-sm text-gray-300 font-sans">Build production-v2.6 deployed</span>
          </div>
        </div>

        {/* BOTTOM METADATA TRACK BAR */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 text-sm text-gray-500 gap-6">
          <div className="font-sans text-gray-400 text-base">
            © {currentYear} <span className="font-bold text-white tracking-wide">Avinash Jha</span>. All rights reserved.
          </div>
          
          <div className="flex items-center gap-8 font-mono text-xs">
            <span className="text-gray-600 hidden md:inline tracking-wider">LATENCY: 24ms // PACKETS: 0_DROP</span>
            
            {/* Elegant Large Scroll Action */}
            <button
              onClick={scrollToTop}
              className="group flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.02] hover:bg-[#e05a1c] border border-white/[0.08] hover:border-transparent transition-all duration-300 shadow-md hover:shadow-[#e05a1c]/20"
              title="Return to top"
            >
              <FontAwesomeIcon 
                icon={faArrowUp} 
                className="text-gray-400 group-hover:text-black group-hover:-translate-y-1 transition-all duration-300 text-sm" 
              />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
