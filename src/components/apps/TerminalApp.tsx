import React, { useState, useRef, useEffect } from 'react';
import { PROFILE_DATA } from '../../data/profile';
import { AppId } from '../../types';

interface TerminalAppProps {
  onOpenApp?: (appId: AppId) => void;
}

interface CommandOutput {
  id: string;
  command?: string;
  output: React.ReactNode;
}

export const TerminalApp: React.FC<TerminalAppProps> = ({ onOpenApp }) => {
  const [currentPath, setCurrentPath] = useState<string>('~/Desktop');
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [outputList, setOutputList] = useState<CommandOutput[]>([
    {
      id: 'welcome-1',
      output: (
        <div className="text-gray-300">
          Last login: {new Date().toLocaleDateString()} on ttys001
          <br />
          Welcome to <span className="text-[#34c759] font-bold">Dhiraj Shirse's Terminal</span> (Darwin Kernel Version 23.4.0)
          <br />
          Type <span className="text-[#007aff] font-bold">help</span> to view available shell commands.
        </div>
      )
    }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [outputList]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let result: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        result = (
          <div className="space-y-1 text-gray-300">
            <div className="text-white font-semibold mb-1">Available commands:</div>
            <div><span className="text-[#007aff] w-28 inline-block">help</span> Show this manual</div>
            <div><span className="text-[#007aff] w-28 inline-block">ls</span> List files in current directory</div>
            <div><span className="text-[#007aff] w-28 inline-block">cd &lt;dir&gt;</span> Change directory (e.g. cd Projects, cd Certificates, cd ..)</div>
            <div><span className="text-[#007aff] w-28 inline-block">cat &lt;file&gt;</span> Output content of file (README.md, credentials.txt)</div>
            <div><span className="text-[#007aff] w-28 inline-block">pwd</span> Print current working directory</div>
            <div><span className="text-[#007aff] w-28 inline-block">whoami</span> Display profile and current role</div>
            <div><span className="text-[#007aff] w-28 inline-block">projects</span> Display technical projects</div>
            <div><span className="text-[#007aff] w-28 inline-block">certificates</span> Display verified certifications</div>
            <div><span className="text-[#007aff] w-28 inline-block">skills</span> Display technical skills</div>
            <div><span className="text-[#007aff] w-28 inline-block">contact</span> Display contact details</div>
            <div><span className="text-[#007aff] w-28 inline-block">open &lt;app&gt;</span> Launch window (projects, certificates, notes, skills, etc.)</div>
            <div><span className="text-[#007aff] w-28 inline-block">clear</span> Clear terminal buffer</div>
          </div>
        );
        break;

      case 'clear':
        setOutputList([]);
        setInputVal('');
        return;

      case 'pwd':
        result = <div className="text-gray-200">/Users/dhiraj/{currentPath.replace('~/', '')}</div>;
        break;

      case 'whoami':
        result = (
          <div className="text-gray-200">
            <div className="font-bold text-white">{PROFILE_DATA.personal.name}</div>
            <div className="text-gray-400">{PROFILE_DATA.personal.role}</div>
            <div className="mt-1 text-emerald-400">Interests: {PROFILE_DATA.personal.interests.join(', ')}</div>
          </div>
        );
        break;

      case 'cd': {
        const rawTarget = args[0] || '~';
        const target = rawTarget.replace(/\/$/, '').toLowerCase();

        if (target === '..' || target === '../') {
          if (currentPath.startsWith('~/Projects/')) {
            setCurrentPath('~/Projects');
          } else if (currentPath === '~/Projects' || currentPath === '~/Desktop' || currentPath === '~/Certificates') {
            setCurrentPath('~');
          } else {
            setCurrentPath('~');
          }
        } else if (target === '~' || target === '') {
          setCurrentPath('~');
        } else if (target === 'desktop' || target === '~/desktop') {
          setCurrentPath('~/Desktop');
        } else if (target === 'projects' || target === '~/projects' || target === 'projects.app') {
          setCurrentPath('~/Projects');
        } else if (target === 'certificates' || target === '~/certificates' || target === 'certifications' || target === 'certificates.app') {
          setCurrentPath('~/Certificates');
        } else if (
          currentPath === '~/Projects' &&
          (target === 'finintel' || target === 'fake-my-voice' || target === 'fakemyvoice' || target === 'neuraleye')
        ) {
          if (target.includes('fin')) setCurrentPath('~/Projects/FinIntel');
          else if (target.includes('fake')) setCurrentPath('~/Projects/FakeMyVoice');
          else setCurrentPath('~/Projects/NeuralEye');
        } else {
          result = <div className="text-red-400">cd: no such file or directory: {args[0]}</div>;
        }
        break;
      }

      case 'ls': {
        if (currentPath === '~/Desktop') {
          result = (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sky-300 font-mono">
              <span className="text-blue-400 font-bold">Projects/</span>
              <span className="text-blue-400 font-bold">Certificates/</span>
              <span>About.app</span>
              <span>Contacts.app</span>
              <span>Skills.app</span>
              <span>Awards.app</span>
              <span>Education.app</span>
              <span>Leadership.app</span>
              <span>Blog.app</span>
              <span className="text-emerald-400">cv.pdf</span>
              <span>Feedback.app</span>
            </div>
          );
        } else if (currentPath === '~/Projects') {
          result = (
            <div className="space-y-1">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                <span className="text-blue-400 font-bold">FinIntel/</span>
                <span className="text-blue-400 font-bold">FakeMyVoice/</span>
                <span className="text-blue-400 font-bold">NeuralEye/</span>
                <span className="text-gray-300">README.md</span>
              </div>
              <div className="text-[11px] text-gray-500 mt-1">
                Tip: Type <span className="text-[#007aff]">cd FinIntel</span> to inspect code or <span className="text-[#007aff]">open projects</span> to launch Xcode.
              </div>
            </div>
          );
        } else if (currentPath === '~/Projects/FinIntel') {
          result = (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
              <span className="text-gray-300">README.md</span>
              <span className="text-amber-300">package.json</span>
              <span className="text-blue-400 font-bold">src/</span>
              <span className="text-blue-400 font-bold">api/</span>
              <span className="text-purple-400">ChromaDB/</span>
            </div>
          );
        } else if (currentPath === '~/Projects/FakeMyVoice') {
          result = (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
              <span className="text-gray-300">README.md</span>
              <span className="text-emerald-400">pipeline.py</span>
              <span className="text-blue-400 font-bold">models/</span>
              <span className="text-blue-400 font-bold">audio/</span>
              <span className="text-purple-400 font-semibold">IJERT_Paper_Publication.pdf</span>
            </div>
          );
        } else if (currentPath === '~/Projects/NeuralEye') {
          result = (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
              <span className="text-gray-300">README.md</span>
              <span className="text-emerald-400">detector.py</span>
              <span className="text-blue-400 font-bold">weights/</span>
              <span className="text-blue-400 font-bold">CIFAKE_dataset/</span>
            </div>
          );
        } else if (currentPath === '~/Certificates') {
          result = (
            <div className="space-y-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-xs">
                <span className="text-purple-300 font-medium">ijert-fakemyvoice-publication.png</span>
                <span className="text-emerald-300 font-medium">lenovo-aicte-genai-internship.png</span>
                <span className="text-amber-300 font-medium">lenovo-skill-india-ai.png</span>
                <span className="text-gray-300">credentials.txt</span>
              </div>
              <div className="text-[11px] text-gray-500 mt-1">
                Tip: Type <span className="text-[#007aff]">cat credentials.txt</span> or <span className="text-[#007aff]">open certificates</span> to view in GUI.
              </div>
            </div>
          );
        } else {
          // Home directory ~
          result = (
            <div className="flex flex-wrap gap-4 text-sky-400 font-mono">
              <span className="text-blue-400 font-bold">Desktop/</span>
              <span className="text-blue-400 font-bold">Projects/</span>
              <span className="text-blue-400 font-bold">Certificates/</span>
              <span className="text-gray-300">.zshrc</span>
            </div>
          );
        }
        break;
      }

      case 'cat': {
        const filename = (args[0] || '').toLowerCase();
        if (!filename) {
          result = <div className="text-red-400">cat: specify a filename to read</div>;
        } else if (filename.includes('readme')) {
          if (currentPath === '~/Projects/FinIntel') {
            const p = PROFILE_DATA.projects[0];
            result = (
              <div className="space-y-1.5 text-gray-200">
                <div className="text-white font-bold text-sm"># {p.title}</div>
                <div className="text-gray-400 font-mono text-xs">Stack: {p.technologies.join(', ')} | {p.period}</div>
                <div className="text-sky-400 font-mono text-xs">Repo: {p.repoUrl}</div>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-300 mt-2">
                  {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            );
          } else if (currentPath === '~/Projects/FakeMyVoice') {
            const p = PROFILE_DATA.projects[1];
            result = (
              <div className="space-y-1.5 text-gray-200">
                <div className="text-white font-bold text-sm"># {p.title}</div>
                <div className="text-emerald-400 text-xs font-semibold">★ Research Paper Published in IJERT (Volume 15, Issue 06, June 2026)</div>
                <div className="text-gray-400 font-mono text-xs">Stack: {p.technologies.join(', ')} | {p.period}</div>
                <div className="text-sky-400 font-mono text-xs">Repo: {p.repoUrl}</div>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-300 mt-2">
                  {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            );
          } else if (currentPath === '~/Projects/NeuralEye') {
            const p = PROFILE_DATA.projects[2];
            result = (
              <div className="space-y-1.5 text-gray-200">
                <div className="text-white font-bold text-sm"># {p.title}</div>
                <div className="text-gray-400 font-mono text-xs">Stack: {p.technologies.join(', ')} | {p.period}</div>
                <div className="text-sky-400 font-mono text-xs">Repo: {p.repoUrl}</div>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-300 mt-2">
                  {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            );
          } else {
            result = (
              <div className="text-gray-200 space-y-1">
                <div className="font-bold text-white"># Technical Projects Directory</div>
                <div className="text-gray-400">1. FinIntel – AI Financial Stock Advisor</div>
                <div className="text-gray-400">2. Fake My Voice – Neural Voice Cloning System (IJERT Paper)</div>
                <div className="text-gray-400">3. NeuralEye – AI-Generated Content Detection Platform</div>
                <div className="text-xs text-sky-400 mt-1">Type "open projects" to view in Xcode IDE.</div>
              </div>
            );
          }
        } else if (filename.includes('cred') || filename.includes('cert')) {
          result = (
            <div className="space-y-2 text-gray-200">
              <div className="font-bold text-white text-sm">=== Verified Credentials ===</div>
              {PROFILE_DATA.certifications.map((c) => (
                <div key={c.id} className="border-l-2 border-emerald-400 pl-2 py-0.5 text-xs">
                  <div className="font-semibold text-white">{c.title}</div>
                  <div className="text-gray-400">{c.organization} ({c.date})</div>
                  {c.credentialId && <div className="text-emerald-400 font-mono">ID: {c.credentialId}</div>}
                </div>
              ))}
            </div>
          );
        } else if (filename.includes('about') || filename.includes('bio')) {
          result = <div className="text-gray-200 leading-relaxed">{PROFILE_DATA.personal.aboutSummary}</div>;
        } else if (filename.includes('cv') || filename.includes('resume')) {
          result = (
            <div className="text-gray-200">
              Dhiraj Shirse | Resume PDF: /Dhiraj_Resume_FINAL.pdf (Type "open pdf" to view)
            </div>
          );
        } else if (filename === '.zshrc') {
          result = (
            <div className="text-gray-400 font-mono text-xs">
              export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"<br />
              alias ll="ls -la"<br />
              alias projects="open projects"<br />
              alias certs="open certificates"
            </div>
          );
        } else {
          result = <div className="text-red-400">cat: {args[0]}: No such file or directory</div>;
        }
        break;
      }

      case 'projects':
        result = (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-1">
              <span className="font-bold text-white">Technical Projects (3)</span>
              <span className="text-xs text-sky-400">Tip: Type "open projects" to view in Xcode IDE</span>
            </div>
            {PROFILE_DATA.projects.map((p) => (
              <div key={p.id} className="border-l-2 border-[#007aff] pl-3 py-1">
                <div className="font-bold text-white">{p.title}</div>
                <div className="text-xs text-gray-400 font-mono">{p.technologies.join(', ')} ({p.period})</div>
                <div className="text-xs text-gray-300 mt-1">{p.bullets[0]}</div>
                <div className="text-xs text-sky-400 mt-0.5">{p.repoUrl}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'certificates':
      case 'certifications':
        result = (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-1">
              <span className="font-bold text-white">Verified Certifications & Credentials (3)</span>
              <span className="text-xs text-amber-400">Tip: Type "open certificates" to view in GUI</span>
            </div>
            {PROFILE_DATA.certifications.map((c) => (
              <div key={c.id} className="border-l-2 border-emerald-500 pl-3 py-1">
                <div className="font-bold text-white">{c.title}</div>
                <div className="text-xs text-gray-400">{c.organization} ({c.date})</div>
                {c.credentialId && <div className="text-xs text-emerald-400 font-mono">Credential ID: {c.credentialId}</div>}
                <div className="text-xs text-gray-300 mt-0.5">{c.description}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        result = (
          <div className="space-y-2">
            {PROFILE_DATA.skills.map((s) => (
              <div key={s.category}>
                <span className="font-bold text-white mr-2">{s.category}:</span>
                <span className="text-gray-300">{s.items.join(', ')}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        result = (
          <div className="space-y-1 text-gray-200">
            <div><span className="text-gray-400">Email:</span> {PROFILE_DATA.personal.email}</div>
            <div><span className="text-gray-400">Phone:</span> {PROFILE_DATA.personal.phone}</div>
            <div><span className="text-gray-400">LinkedIn:</span> {PROFILE_DATA.personal.linkedIn}</div>
            <div><span className="text-gray-400">GitHub:</span> {PROFILE_DATA.personal.github}</div>
          </div>
        );
        break;

      case 'open': {
        const raw = (args[0] || '').toLowerCase().replace(/\.app$/, '');
        let targetApp: AppId | null = null;

        if (
          raw === 'projects' ||
          raw === 'xcode' ||
          (raw === '.' && currentPath.includes('Projects'))
        ) {
          targetApp = 'xcode';
        } else if (
          raw === 'certificates' ||
          raw === 'certifications' ||
          (raw === '.' && currentPath.includes('Certificates'))
        ) {
          targetApp = 'certificates';
        } else if (raw === 'notes' || raw === 'about' || raw === 'about me') {
          targetApp = 'notes';
        } else if (raw === 'contacts' || raw === 'contact') {
          targetApp = 'contacts';
        } else if (raw === 'skills' || raw === 'settings') {
          targetApp = 'skills';
        } else if (raw === 'awards' || raw === 'gamecenter' || raw === 'honors') {
          targetApp = 'awards';
        } else if (raw === 'education' || raw === 'books') {
          targetApp = 'education';
        } else if (raw === 'leadership' || raw === 'textedit') {
          targetApp = 'leadership';
        } else if (raw === 'blog' || raw === 'safari') {
          targetApp = 'blog';
        } else if (raw === 'pdf' || raw === 'cv' || raw === 'cv.pdf' || raw === 'preview' || raw === 'resume') {
          targetApp = 'pdf';
        } else if (raw === 'mail' || raw === 'email') {
          targetApp = 'mail';
        } else if (raw === 'feedback' || raw === 'sus' || raw === 'evaluation') {
          targetApp = 'feedback';
        } else if (raw === 'finder') {
          targetApp = 'finder';
        }

        if (targetApp && onOpenApp) {
          onOpenApp(targetApp);
          result = <div className="text-emerald-400">Opening {targetApp}...</div>;
        } else {
          result = (
            <div className="text-gray-400">
              Usage: open &lt;app&gt; (e.g. open projects, open certificates, open notes, open skills, open awards, open pdf)
            </div>
          );
        }
        break;
      }

      default:
        result = (
          <div className="text-red-400">
            zsh: command not found: {cmd}. Type <span className="text-white underline">help</span> for available commands.
          </div>
        );
        break;
    }

    setOutputList((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: `${currentPath} $ ${cmdStr}`,
        output: result
      }
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0) {
        const nextIdx = historyIndex + 1 < history.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex flex-col h-full bg-[#1e1e24] text-white p-4 font-mono text-xs overflow-y-auto select-text"
    >
      <div className="space-y-3 flex-1">
        {outputList.map((item) => (
          <div key={item.id} className="space-y-1">
            {item.command && (
              <div className="text-[#34c759] font-semibold">
                dhiraj@mac:{item.command}
              </div>
            )}
            <div>{item.output}</div>
          </div>
        ))}

        {/* Active Command Line Input */}
        <div className="flex items-center space-x-2 pt-1">
          <span className="text-[#34c759] font-semibold shrink-0">
            dhiraj@mac:{currentPath} $
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white focus:outline-none border-none p-0"
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
