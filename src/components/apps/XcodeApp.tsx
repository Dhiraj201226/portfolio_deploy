import React, { useState } from 'react';
import { PROFILE_DATA, ProjectEntry } from '../../data/profile';
import {
  Folder,
  FileCode,
  FileText,
  Image,
  ExternalLink,
  Github,
  Play,
  Square,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

export const XcodeApp: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROFILE_DATA.projects[0].id);
  const [selectedFile, setSelectedFile] = useState<'readme' | 'image' | 'link'>('readme');
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({
    finintel: true,
    'fake-my-voice': true,
    neuraleye: true
  });

  const activeProject =
    PROFILE_DATA.projects.find((p) => p.id === selectedProjectId) || PROFILE_DATA.projects[0];

  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e24] text-[#dedee3] font-sans">
      {/* Xcode Top Toolbar */}
      <div className="h-10 bg-[#2b2b36] border-b border-[#18181f] flex items-center justify-between px-3 select-none text-xs">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            title="Build and Run"
            className="w-6 h-6 rounded flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10"
          >
            <Play size={12} fill="currentColor" />
          </button>
          <button
            type="button"
            title="Stop"
            className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10"
          >
            <Square size={11} fill="currentColor" />
          </button>
          <div className="h-4 w-[1px] bg-white/15 mx-1" />
          <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-[#18181f] rounded border border-white/10 text-gray-200">
            <span className="font-semibold text-[11px]">{activeProject.title.split('–')[0].trim()}</span>
            <span className="text-[10px] text-gray-400">&gt; My Mac</span>
          </div>
        </div>

        {/* Action Button: "View source on GitHub" linking to the repository */}
        <a
          href={activeProject.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-1.5 bg-[#007aff] hover:bg-[#0069d9] text-white px-3 py-1 rounded text-xs font-medium transition-colors shadow-xs"
        >
          <Github size={13} />
          <span>View source on GitHub</span>
        </a>
      </div>

      {/* Main Xcode Workspace: Sidebar + Editor + Details Panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Navigator (File Tree) */}
        <aside className="w-60 bg-[#25252e] border-r border-[#18181f] flex flex-col shrink-0 select-none overflow-y-auto">
          <div className="p-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center justify-between border-b border-white/5">
            <span>Project Navigator</span>
          </div>

          <div className="p-2 space-y-1">
            {PROFILE_DATA.projects.map((project) => {
              const isSelected = selectedProjectId === project.id;
              const isExpanded = !!expandedProjects[project.id];

              return (
                <div key={project.id} className="text-xs">
                  {/* Project Folder Header */}
                  <div
                    onClick={() => {
                      setSelectedProjectId(project.id);
                      toggleProject(project.id);
                    }}
                    className={`flex items-center space-x-1.5 px-2 py-1.5 rounded cursor-pointer transition-colors ${
                      isSelected && selectedFile === 'readme'
                        ? 'bg-blue-600/30 text-white font-medium'
                        : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                    <Folder size={14} className="text-[#007aff]" />
                    <span className="truncate">{project.title.split('–')[0].trim()}</span>
                  </div>

                  {/* Nested Files: readme.md, image.png, project.link */}
                  {isExpanded && (
                    <div className="pl-6 space-y-0.5 mt-0.5 border-l border-white/10 ml-3">
                      <div
                        onClick={() => {
                          setSelectedProjectId(project.id);
                          setSelectedFile('readme');
                        }}
                        className={`flex items-center space-x-2 px-2 py-1 rounded cursor-pointer ${
                          isSelected && selectedFile === 'readme'
                            ? 'bg-[#007aff] text-white font-medium'
                            : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                        }`}
                      >
                        <FileText size={13} className="text-gray-300" />
                        <span>readme.md</span>
                      </div>

                      <div
                        onClick={() => {
                          setSelectedProjectId(project.id);
                          setSelectedFile('image');
                        }}
                        className={`flex items-center space-x-2 px-2 py-1 rounded cursor-pointer ${
                          isSelected && selectedFile === 'image'
                            ? 'bg-[#007aff] text-white font-medium'
                            : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                        }`}
                      >
                        <Image size={13} className="text-emerald-400" />
                        <span>preview.png</span>
                      </div>

                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-2 px-2 py-1 rounded text-gray-400 hover:text-gray-200 hover:bg-white/5"
                      >
                        <ExternalLink size={13} className="text-sky-400" />
                        <span>project.link</span>
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Center Editor Area */}
        <main className="flex-1 overflow-y-auto bg-[#1e1e24] p-6 flex flex-col">
          {/* Breadcrumb Tab Bar */}
          <div className="flex items-center space-x-2 text-xs text-gray-400 mb-6 border-b border-white/10 pb-3">
            <span>{activeProject.title.split('–')[0].trim()}</span>
            <span>/</span>
            <span className="text-white font-medium">
              {selectedFile === 'readme' ? 'readme.md' : 'preview.png'}
            </span>
          </div>

          {selectedFile === 'readme' ? (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  {activeProject.title}
                </h1>
                <div className="text-xs text-gray-400 mt-1 font-mono">
                  Duration: {activeProject.period}
                </div>
                {activeProject.id === 'fake-my-voice' && (
                  <div className="mt-3 p-3 bg-purple-950/40 border border-purple-500/30 rounded-xl flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText size={18} />
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-purple-200">
                          Published Research Paper: IJERT (June 2026)
                        </span>
                        <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded text-[10px] font-mono">
                          Peer-Reviewed
                        </span>
                      </div>
                      <p className="text-gray-300 mt-1">
                        "FakeMyVoice: A Hybrid Multi-Stage Deep Learning Pipeline for Low-Resource Speaker-Conditioned Voice Cloning with Adversarial Robustness and Ethical Safeguards"
                      </p>
                      <div className="text-[11px] text-gray-400 mt-1 font-mono">
                        Reg No: IJERTV15IS060623 | ISSN: 2278-0181 | DOI: 10.17577
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-2">
                {activeProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-[#2e2e38] text-sky-300 border border-sky-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Verbatim 3 Bullets */}
              <div className="space-y-3 pt-2">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Project Highlights & Impact
                </h2>
                <ul className="space-y-3">
                  {activeProject.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="text-sm leading-relaxed text-gray-200 flex items-start space-x-3 bg-white/[0.02] p-3 rounded-lg border border-white/5"
                    >
                      <span className="text-[#007aff] font-bold text-base leading-none">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 border border-dashed border-white/15 rounded-xl bg-black/20 text-center">
              <Image size={48} className="text-gray-500 mb-3" />
              <div className="text-sm font-semibold text-gray-200">{activeProject.title}</div>
              <p className="text-xs text-gray-400 mt-1 max-w-sm">
                Architecture and neural system diagram for {activeProject.title}.
              </p>
              <a
                href={activeProject.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 text-xs text-[#007aff] hover:underline flex items-center space-x-1"
              >
                <span>View project repository assets</span>
                <ExternalLink size={12} />
              </a>
            </div>
          )}
        </main>

        {/* Right Details Panel (replaces fake Xcode "Build settings" panel) */}
        <aside className="w-64 bg-[#23232c] border-l border-[#18181f] p-4 select-none shrink-0 overflow-y-auto">
          <h2 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
            Details
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                Tech Stack
              </div>
              <div className="text-gray-200 font-medium mt-1">
                {activeProject.technologies.join(', ')}
              </div>
            </div>

            <div>
              <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                Duration
              </div>
              <div className="text-gray-200 font-mono mt-1">
                {activeProject.period}
              </div>
            </div>

            <div>
              <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                Repository
              </div>
              <a
                href={activeProject.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#007aff] hover:underline font-mono text-[11px] break-all block mt-1"
              >
                {activeProject.repoUrl}
              </a>
            </div>

            <div className="pt-4 border-t border-white/10">
              <a
                href={activeProject.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 bg-white/10 hover:bg-white/15 text-white rounded text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Github size={13} />
                <span>View source on GitHub</span>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
