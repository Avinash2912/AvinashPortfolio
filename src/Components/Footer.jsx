import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faMapMarkerAlt, 
  faPhone,
  faHeart,
  faCode,
  faArrowUp
} from '@fortawesome/free-solid-svg-icons';
import { 
  faGithub, 
  faLinkedin, 
  faTwitter,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: faGithub,
      url: 'https://github.com/Avinash2912',
      color: '#ffffff'
    },
    {
      name: 'LinkedIn',
      icon: faLinkedin,
      url: 'https://linkedin.com/in/avinash-jha',
      color: '#0077B5'
    },
    {
      name: 'LeetCode',
      icon: faCode,
      url: 'https://leetcode.com/u/Avinash_1912/',
      color: '#FFA116'
    },
    {
      name: 'Email',
      icon: faEnvelope,
      url: 'mailto:avinashjha19@outlook.com',
      color: '#00D9FF'
    }
  ];

  const quickLinks = [
    { name: 'About Me', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Profiles', href: '#coding-profiles' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="relative bg-[#000000] border-t border-white/10 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#000000]"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFA116] to-[#FF6C37] flex items-center justify-center">
                <FontAwesomeIcon icon={faCode} className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-white">Avinash Jha</h3>
            </div>
            <p className="text-gray-400 font-mono text-sm leading-relaxed">
              Full Stack Developer & Competitive Programmer passionate about building 
              innovative solutions and solving complex problems.
            </p>
            <div className="flex items-center gap-2 text-gray-500 text-sm font-mono">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#FF6C37]" />
              <span>Delhi, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-[#FFA116] to-[#FF6C37] rounded-full"></div>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-gray-400 hover:text-[#FFA116] font-mono text-sm transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#FFA116] transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-[#00D9FF] to-[#2F8D46] rounded-full"></div>
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:avinashjha19@outlook.com"
                  className="text-gray-400 hover:text-[#00D9FF] font-mono text-sm transition-colors duration-300 flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#00D9FF]/10 flex items-center justify-center group-hover:bg-[#00D9FF]/20 transition-colors">
                    <FontAwesomeIcon icon={faEnvelope} className="text-[#00D9FF]" />
                  </div>
                  <span className="break-all">avinashjha19@outlook.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Avinash2912"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white font-mono text-sm transition-colors duration-300 flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <FontAwesomeIcon icon={faGithub} className="text-white" />
                  </div>
                  <span>github.com/Avinash2912</span>
                </a>
              </li>
              
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-[#FF6C37] to-[#FFA116] rounded-full"></div>
              Connect
            </h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  title={social.name}
                >
                  <div 
                    className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-transparent"
                    style={{
                      boxShadow: `0 0 0 0 ${social.color}00`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = social.color + '20';
                      e.currentTarget.style.boxShadow = `0 0 20px ${social.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#1a1a1a';
                      e.currentTarget.style.boxShadow = `0 0 0 0 ${social.color}00`;
                    }}
                  >
                    <FontAwesomeIcon 
                      icon={social.icon} 
                      className="text-lg transition-colors"
                      style={{ color: social.color }}
                    />
                  </div>
                </a>
              ))}
            </div>
            <div className="p-4 bg-gradient-to-br from-[#FFA116]/10 to-[#FF6C37]/10 rounded-xl border border-[#FFA116]/20">
              <p className="text-gray-400 font-mono text-xs leading-relaxed">
                Open to exciting opportunities and collaborations. Let's build something amazing together!
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400 font-mono text-sm">
            <span>© {currentYear} Avinash Jha. Made with</span>
            <FontAwesomeIcon icon={faHeart} className="text-red-500 animate-pulse" />
            <span>and</span>
            <FontAwesomeIcon icon={faCode} className="text-[#FFA116]" />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-500 font-mono text-xs">Built with React + Vite + Tailwind</span>
            
            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="group w-10 h-10 rounded-lg bg-linear-to-br from-[#FFA116] to-[#FF6C37] flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-[#FFA116]/50"
              title="Back to top"
            >
              <FontAwesomeIcon 
                icon={faArrowUp} 
                className="text-white group-hover:-translate-y-0.5 transition-transform duration-300" 
              />
            </button>
          </div>
        </div>

        {/* Tech Stack Badge */}
        
      </div>
    </footer>
  );
};

export default Footer;
