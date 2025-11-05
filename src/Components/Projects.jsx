import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay,
  faStop,
  faStar, 
  faCodeFork, 
  faExternalLinkAlt,
  faClock,
  faCircle,
  faLayerGroup,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faDocker } from '@fortawesome/free-brands-svg-icons';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [runningContainers, setRunningContainers] = useState([]);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [displayCount, setDisplayCount] = useState(6);
  const PROJECTS_PER_LOAD = 5;

  useEffect(() => {
    fetchGitHubProjects();
  }, []);

  const fetchGitHubProjects = async () => {
    try {
      const response = await fetch('https://api.github.com/users/Avinash2912/repos?sort=updated&per_page=100');
      const data = await response.json();
      
      const filteredProjects = data
        .filter(repo => !repo.fork && !repo.private)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .map((repo, index) => ({
          id: repo.id,
          containerName: repo.name.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
          name: repo.name,
          image: `${repo.name.toLowerCase()}:latest`,
          description: repo.description || 'No description available',
          language: repo.language || 'Unknown',
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          url: repo.html_url,
          homepage: repo.homepage,
          topics: repo.topics || [],
          size: `${Math.floor(Math.random() * 500) + 50}MB`,
          port: Math.floor(Math.random() * 9000) + 3000,
          status: Math.random() > 0.7 ? 'running' : 'exited',
          uptime: Math.random() > 0.5 ? `${Math.floor(Math.random() * 48)}h ago` : `${Math.floor(Math.random() * 30)}d ago`,
          updated: new Date(repo.updated_at).toLocaleDateString(),
          created: new Date(repo.created_at).toLocaleDateString()
        }));
      
      setProjects(filteredProjects);
      setRunningContainers(filteredProjects.filter(p => p.status === 'running').map(p => p.id));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const toggleContainer = (projectId) => {
    setRunningContainers(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const getLanguageColor = (lang) => {
    const colors = {
      JavaScript: '#f7df1e',
      Python: '#3776ab',
      TypeScript: '#3178c6',
      Java: '#007396',
      'C++': '#00599c',
      HTML: '#e34c26',
      CSS: '#264de4',
      React: '#61dafb',
      Vue: '#42b883',
      Go: '#00add8',
      Rust: '#dea584',
      Ruby: '#cc342d',
      PHP: '#777bb4',
      Swift: '#fa7343',
      Kotlin: '#7f52ff',
      Dart: '#0175c2',
      Shell: '#89e051',
      Unknown: '#8b949e'
    };
    return colors[lang] || '#8b949e';
  };

  const loadMoreProjects = () => {
    setDisplayCount(prev => prev + PROJECTS_PER_LOAD);
  };

  const displayedProjects = projects.slice(0, displayCount);
  const hasMoreProjects = displayCount < projects.length;

  return (
    <section id="projects" className="relative min-h-screen py-20 px-6 overflow-hidden">
      {/* Docker Blue Background */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0d1117] via-[#0d1b2a] to-[#000000]"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 flex items-center justify-center gap-4">
            <FontAwesomeIcon icon={faDocker} className="text-[#2496ed]" />
            <span className="bg-linear-to-r from-[#2496ed] to-[#1d7dc2] bg-clip-text text-transparent">
              Project Containers
            </span>
          </h2>
          <div className="w-32 h-1 bg-linear-to-r from-[#2496ed] to-[#1d7dc2] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg font-mono">docker ps -a --format table</p>
        </div>

        {/* Docker Stats Bar */}
        <div className="bg-[#0d1117] border border-[#2496ed]/30 rounded-lg p-4 mb-6 flex flex-wrap gap-6 justify-center font-mono text-sm">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCircle} className="text-green-400 text-xs" />
            <span className="text-gray-400">Running:</span>
            <span className="text-white font-bold">{runningContainers.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCircle} className="text-gray-500 text-xs" />
            <span className="text-gray-400">Stopped:</span>
            <span className="text-white font-bold">{projects.length - runningContainers.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faLayerGroup} className="text-[#2496ed]" />
            <span className="text-gray-400">Displayed:</span>
            <span className="text-white font-bold">{displayedProjects.length}/{projects.length}</span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <FontAwesomeIcon icon={faDocker} className="text-6xl text-[#2496ed] mb-4 animate-pulse" />
            <p className="text-gray-400 mt-4 font-mono">Pulling containers from registry...</p>
          </div>
        )}

        {/* Docker Container Grid */}
        {!loading && projects.length > 0 && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {displayedProjects.map((project) => {
              const isRunning = runningContainers.includes(project.id);
              
              return (
                <div
                  key={project.id}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={`bg-[#0d1117] border-2 rounded-lg overflow-hidden transition-all duration-300 ${
                    isRunning 
                      ? 'border-[#2496ed] shadow-[0_0_20px_rgba(36,150,237,0.3)]' 
                      : 'border-[#30363d] hover:border-[#2496ed]/50'
                  }`}
                >
                  {/* Container Header */}
                  <div className={`px-4 py-3 border-b flex items-center justify-between ${
                    isRunning ? 'bg-[#2496ed]/10 border-[#2496ed]/30' : 'bg-[#161b22] border-[#30363d]'
                  }`}>
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon 
                        icon={faDocker} 
                        className={`text-2xl ${isRunning ? 'text-[#2496ed]' : 'text-gray-500'}`} 
                      />
                      <div>
                        <div className="font-bold text-white font-mono">{project.containerName}</div>
                        <div className="text-xs text-gray-400 font-mono">{project.image}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center gap-1 text-xs font-mono px-2 py-1 rounded ${
                        isRunning 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        <FontAwesomeIcon icon={faCircle} className="text-[8px]" />
                        {isRunning ? 'UP' : 'EXITED'}
                      </span>
                    </div>
                  </div>

                  {/* Container Body */}
                  <div className="p-4">
                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-4 min-h-[40px]">
                      {project.description}
                    </p>

                    {/* Container Info Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4 font-mono text-xs">
                      <div className="bg-[#161b22] rounded p-2">
                        <div className="text-gray-500 mb-1">LANGUAGE</div>
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getLanguageColor(project.language) }}
                          ></span>
                          <span className="text-white">{project.language}</span>
                        </div>
                      </div>
                      <div className="bg-[#161b22] rounded p-2">
                        <div className="text-gray-500 mb-1">SIZE</div>
                        <div className="text-white">{project.size}</div>
                      </div>
                      <div className="bg-[#161b22] rounded p-2">
                        <div className="text-gray-500 mb-1">PORT</div>
                        <div className="text-[#2496ed]">{project.port}</div>
                      </div>
                      <div className="bg-[#161b22] rounded p-2">
                        <div className="text-gray-500 mb-1">UPTIME</div>
                        <div className="text-white">{project.uptime}</div>
                      </div>
                    </div>

                    {/* Tags */}
                    {project.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.topics.slice(0, 4).map((topic, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 bg-[#161b22] text-[#2496ed] text-xs font-mono rounded border border-[#30363d]"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4 font-mono">
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                        <span>{project.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faCodeFork} />
                        <span>{project.forks}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faClock} />
                        <span>{project.updated}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleContainer(project.id)}
                        className={`flex-1 font-bold py-2 px-4 rounded font-mono text-sm transition-all ${
                          isRunning
                            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50'
                            : 'bg-[#2496ed] text-white hover:bg-[#1d7dc2]'
                        }`}
                      >
                        <FontAwesomeIcon icon={isRunning ? faStop : faPlay} className="mr-2" />
                        {isRunning ? 'STOP' : 'RUN'}
                      </button>
                      
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#161b22] hover:bg-[#21262d] text-white font-bold py-2 px-4 rounded font-mono text-sm transition-colors border border-[#30363d] hover:border-[#2496ed]"
                        title="View on GitHub"
                      >
                        <FontAwesomeIcon icon={faGithub} />
                      </a>
                      
                      {project.homepage && (
                        <a
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#161b22] hover:bg-[#21262d] text-white font-bold py-2 px-4 rounded font-mono text-sm transition-colors border border-[#30363d] hover:border-[#2496ed]"
                          title="Live Demo"
                        >
                          <FontAwesomeIcon icon={faExternalLinkAlt} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {hasMoreProjects && (
            <div className="text-center mt-8">
              <button
                onClick={loadMoreProjects}
                className="bg-[#2496ed] hover:bg-[#1d7dc2] text-white font-bold py-3 px-8 rounded-lg font-mono text-sm transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(36,150,237,0.5)] transform hover:scale-105"
              >
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                LOAD MORE CONTAINERS ({Math.min(PROJECTS_PER_LOAD, projects.length - displayCount)} more)
              </button>
            </div>
          )}
        </>
        )}
      </div>
    </section>
  );
};

export default Projects;
