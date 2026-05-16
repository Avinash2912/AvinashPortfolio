import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay,
  faStop,
  faStar, 
  faCodeFork, 
  faExternalLinkAlt,
  faTerminal,
  faCircle,
  faLayerGroup,
  faDownload,
  faServer,
  faCube,
  faSlidersH
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faDocker } from '@fortawesome/free-brands-svg-icons';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [runningContainers, setRunningContainers] = useState([]);
  const [displayCount, setDisplayCount] = useState(6);
  const PROJECTS_PER_LOAD = 6;

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
        .map((repo) => {
          const sizeNum = Math.floor(Math.random() * 450) + 50; 
          return {
            id: repo.id,
            containerName: repo.name.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
            name: repo.name,
            image: `${repo.name.toLowerCase()}:latest`,
            description: repo.description || 'No system breakdown manifest supplied.',
            language: repo.language || 'Unknown',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            url: repo.html_url,
            homepage: repo.homepage,
            topics: repo.topics || [],
            sizeValue: sizeNum, 
            size: `${sizeNum}MB`,
            port: Math.floor(Math.random() * 9000) + 3000,
            status: Math.random() > 0.6 ? 'running' : 'exited',
            uptime: Math.random() > 0.5 ? `${Math.floor(Math.random() * 48)}h ago` : `${Math.floor(Math.random() * 30)}d ago`,
            updated: new Date(repo.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          };
        });
      
      setProjects(filteredProjects);
      setRunningContainers(filteredProjects.filter(p => p.status === 'running').map(p => p.id));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching engines:', error);
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
      JavaScript: '#f7df1e', Python: '#3776ab', TypeScript: '#3178c6',
      Java: '#007396', 'C++': '#00599c', HTML: '#e34c26', CSS: '#264de4',
      React: '#61dafb', Vue: '#42b883', Go: '#00add8', Rust: '#dea584',
      Shell: '#89e051', Unknown: '#4f5b66'
    };
    return colors[lang] || '#6f7a85';
  };

  const displayedProjects = projects.slice(0, displayCount);
  const hasMoreProjects = displayCount < projects.length;

  return (
    <section id="projects" className="relative min-h-screen bg-[#080b10] py-20 px-4 md:px-8 text-slate-100 font-mono selection:bg-[#2496ed] selection:text-black">
      {/* Structural Subtle Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-10">
        
        {/* TOP COMPONENT HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 text-[#2496ed] font-bold tracking-widest text-xs uppercase mb-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              System Environment // Production
            </div>
            <h2 className="text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <FontAwesomeIcon icon={faDocker} className="text-[#2496ed]" /> Cluster Nodes
            </h2>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 flex items-center gap-3 text-xs text-slate-400">
            <FontAwesomeIcon icon={faTerminal} className="text-emerald-400" />
            <span>docker engine service --status=active</span>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 space-y-4 border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
            <FontAwesomeIcon icon={faDocker} className="text-5xl text-[#2496ed] animate-spin [animation-duration:3s]" />
            <div className="text-xs tracking-widest uppercase text-slate-500 animate-pulse">Synchronizing remote clusters...</div>
          </div>
        )}

        {/* MAIN DASHBOARD STRUCTURE */}
        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
            {/* SIDEBAR DOCKER MONITOR MATRIX */}
            <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-8">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 backdrop-blur-md space-y-6">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <FontAwesomeIcon icon={faSlidersH} className="text-[#2496ed]" /> Cluster Metrics
                </div>
                
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-900">
                    <span className="text-xs text-slate-400 flex items-center gap-2">
                      <FontAwesomeIcon icon={faCircle} className="text-emerald-400 text-[10px]" /> Healthy
                    </span>
                    <span className="text-sm font-bold text-emerald-400">{runningContainers.length}</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-900">
                    <span className="text-xs text-slate-400 flex items-center gap-2">
                      <FontAwesomeIcon icon={faCircle} className="text-slate-600 text-[10px]" /> Standby
                    </span>
                    <span className="text-sm font-bold text-slate-400">{projects.length - runningContainers.length}</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-900">
                    <span className="text-xs text-slate-400 flex items-center gap-2">
                      <FontAwesomeIcon icon={faLayerGroup} className="text-amber-500 text-[10px]" /> Map Load
                    </span>
                    <span className="text-sm font-bold text-amber-500">{displayedProjects.length} / {projects.length}</span>
                  </div>
                </div>

                <div className="border-t border-slate-800/80 pt-4 text-[11px] text-slate-500 leading-relaxed">
                  Nodes mapped dynamically via personal GitHub registers. Terminating/Initializing containers represents visual state management overrides.
                </div>
              </div>
            </div>

            {/* MAIN CONTAINERS GRID WORKSPACE */}
            <div className="lg:col-span-3 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayedProjects.map((project) => {
                  const isRunning = runningContainers.includes(project.id);
                  
                  return (
                    <div
                      key={project.id}
                      className={`group relative bg-[#0d121a] border rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                        isRunning 
                          ? 'border-[#2496ed]/50 shadow-[0_0_25px_rgba(36,150,237,0.06)]' 
                          : 'border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      {/* Top Action Visual Bar */}
                      <div className={`h-[3px] w-full transition-all duration-300 ${isRunning ? 'bg-[#2496ed]' : 'bg-slate-800'}`} />

                      <div className="p-5 space-y-4 flex-grow">
                        {/* Container Card Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1 min-w-0">
                            <h3 className="font-bold text-base text-slate-100 truncate tracking-tight group-hover:text-[#2496ed] transition-colors">
                              {project.containerName}
                            </h3>
                            <div className="text-[11px] text-slate-500 truncate flex items-center gap-1.5">
                              <FontAwesomeIcon icon={faCube} className="text-xs text-slate-600" />
                              {project.image}
                            </div>
                          </div>
                          
                          <span className={`shrink-0 text-[10px] font-bold tracking-widest px-2 py-0.5 rounded border ${
                            isRunning 
                              ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' 
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}>
                            {isRunning ? 'ONLINE' : 'EXITED'}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 h-8">
                          {project.description}
                        </p>

                        {/* Custom Structural Resource Matrix Visual */}
                        <div className="bg-slate-950/80 border border-slate-900 rounded-lg p-3 space-y-2.5 text-[11px]">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getLanguageColor(project.language) }} />
                              {project.language}
                            </span>
                            <span className="text-slate-400 text-right">PORT: <span className="text-[#2496ed] font-bold">{project.port}</span></span>
                          </div>
                          
                          {/* Simulated System Memory/Size Bar */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-600">
                              <span>DISK SIZE ALLOC</span>
                              <span>{project.size}</span>
                            </div>
                            <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-500 ${isRunning ? 'bg-[#2496ed]' : 'bg-slate-700'}`} 
                                style={{ width: `${Math.min(100, (project.sizeValue / 500) * 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Topics/Badges */}
                        {project.topics.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {project.topics.slice(0, 3).map((topic, i) => (
                              <span key={i} className="px-2 py-0.5 bg-slate-900 text-slate-400 border border-slate-800 rounded text-[10px]">
                                #{topic}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Card Footer Integration Panel */}
                      <div className="p-4 bg-slate-950/40 border-t border-slate-900 flex items-center gap-2">
                        <button
                          onClick={() => toggleContainer(project.id)}
                          className={`flex-1 flex items-center justify-center gap-2 font-bold py-1.5 px-3 rounded-md text-xs tracking-wider transition-all cursor-pointer ${
                            isRunning
                              ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30'
                              : 'bg-slate-100 text-slate-950 hover:bg-white'
                          }`}
                        >
                          <FontAwesomeIcon icon={isRunning ? faStop : faPlay} className="text-[10px]" />
                          {isRunning ? 'SHUTDOWN' : 'INITIALIZE'}
                        </button>
                        
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-md border border-slate-800 transition-colors"
                          title="Source Registry"
                        >
                          <FontAwesomeIcon icon={faGithub} className="text-sm" />
                        </a>
                        
                        {project.homepage && (
                          <a
                            href={project.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-[#2496ed] rounded-md border border-slate-800 transition-colors"
                            title="Live Container Endpoint"
                          >
                            <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* PAGINATION MATRIX ACTIONS */}
              {hasMoreProjects && (
                <div className="text-center pt-4">
                  <button
                    onClick={() => setDisplayCount(prev => prev + PROJECTS_PER_LOAD)}
                    className="group px-6 py-3 border border-slate-800 hover:border-[#2496ed] bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white rounded-xl text-xs tracking-widest font-bold transition-all duration-300 inline-flex items-center gap-3 shadow-md cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faDownload} className="text-slate-500 group-hover:text-[#2496ed] transition-colors" />
                    FETCH NEXT STORAGE BLOCK ({Math.min(PROJECTS_PER_LOAD, projects.length - displayCount)} UNITS)
                  </button>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;