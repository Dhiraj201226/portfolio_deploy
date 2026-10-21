import React, { useState, useEffect, useRef } from 'react';
import { AppId, WindowInstance } from './types';
import { PROFILE_DATA } from './data/profile';
import { MenuBar } from './components/desktop/MenuBar';
import { Dock, DockApp } from './components/desktop/Dock';
import { Desktop } from './components/desktop/Desktop';
import { WindowChrome } from './components/desktop/WindowChrome';
import { Centerpiece } from './components/desktop/Centerpiece';
import { MacBootScreen } from './components/desktop/MacBootScreen';

// App Components
import { NotesApp } from './components/apps/NotesApp';
import { ContactsApp } from './components/apps/ContactsApp';
import { XcodeApp } from './components/apps/XcodeApp';
import { SkillsApp } from './components/apps/SkillsApp';
import { GameCenterApp } from './components/apps/GameCenterApp';
import { BooksApp } from './components/apps/BooksApp';
import { LeadershipApp } from './components/apps/LeadershipApp';
import { BlogApp } from './components/apps/BlogApp';
import { PreviewApp } from './components/apps/PreviewApp';
import { MailApp } from './components/apps/MailApp';
import { FeedbackApp } from './components/apps/FeedbackApp';
import { TerminalApp } from './components/apps/TerminalApp';
import { FinderApp } from './components/apps/FinderApp';
import { CertificatesApp } from './components/apps/CertificatesApp';

export const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeWindowId, setActiveWindowId] = useState<string | null>('win-xcode');
  const [highestZIndex, setHighestZIndex] = useState<number>(10);
  const lastTriggerElementRef = useRef<Record<string, HTMLElement | null>>({});

  // Detect mobile viewport (< 768px) per HCI requirements
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initial Window Definitions
  const [windows, setWindows] = useState<Record<AppId, WindowInstance>>({
    xcode: {
      id: 'win-xcode',
      appId: 'xcode',
      title: 'Projects – Xcode',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 120, y: 56 },
      size: { width: 920, height: 620 },
      zIndex: 10
    },
    notes: {
      id: 'win-notes',
      appId: 'notes',
      title: 'About Me – Notes',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 180, y: 90 },
      size: { width: 780, height: 520 },
      zIndex: 9
    },
    contacts: {
      id: 'win-contacts',
      appId: 'contacts',
      title: 'Contacts',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 220, y: 110 },
      size: { width: 680, height: 500 },
      zIndex: 8
    },
    skills: {
      id: 'win-skills',
      appId: 'skills',
      title: 'Technical Skills – System Settings',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 260, y: 80 },
      size: { width: 780, height: 540 },
      zIndex: 7
    },
    awards: {
      id: 'win-awards',
      appId: 'awards',
      title: 'Awards & Honors – Game Center',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 200, y: 100 },
      size: { width: 840, height: 540 },
      zIndex: 6
    },
    education: {
      id: 'win-education',
      appId: 'education',
      title: 'Education – Books',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 160, y: 90 },
      size: { width: 760, height: 520 },
      zIndex: 5
    },
    leadership: {
      id: 'win-leadership',
      appId: 'leadership',
      title: 'Leadership & Extracurricular',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 240, y: 100 },
      size: { width: 780, height: 520 },
      zIndex: 4
    },
    blog: {
      id: 'win-blog',
      appId: 'blog',
      title: 'Blog & Articles – Safari',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 210, y: 80 },
      size: { width: 740, height: 540 },
      zIndex: 3
    },
    pdf: {
      id: 'win-pdf',
      appId: 'pdf',
      title: 'cv.pdf – Preview',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 140, y: 50 },
      size: { width: 820, height: 680 },
      zIndex: 2
    },
    mail: {
      id: 'win-mail',
      appId: 'mail',
      title: 'New Message – Mail',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 280, y: 120 },
      size: { width: 640, height: 480 },
      zIndex: 1
    },
    feedback: {
      id: 'win-feedback',
      appId: 'feedback',
      title: 'Usability Evaluation & SUS Questionnaire',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 190, y: 70 },
      size: { width: 840, height: 620 },
      zIndex: 11
    },
    terminal: {
      id: 'win-terminal',
      appId: 'terminal',
      title: 'dhiraj@mac: ~ (zsh)',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 230, y: 130 },
      size: { width: 640, height: 420 },
      zIndex: 1
    },
    finder: {
      id: 'win-finder',
      appId: 'finder',
      title: 'Finder',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 150, y: 100 },
      size: { width: 720, height: 460 },
      zIndex: 1
    },
    certificates: {
      id: 'win-certificates',
      appId: 'certificates',
      title: 'Certifications & Credentials',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 180, y: 70 },
      size: { width: 880, height: 600 },
      zIndex: 7
    }
  });

  // Global ESC key listener to close topmost window and return focus
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const openWins = Object.values(windows).filter((w) => w.isOpen && !w.isMinimized);
        if (openWins.length > 0) {
          // Find window with highest zIndex
          const topWin = openWins.reduce((max, w) => (w.zIndex > max.zIndex ? w : max), openWins[0]);
          handleCloseWindow(topWin.appId);
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [windows]);

  const bringToFront = (appId: AppId) => {
    const nextZ = highestZIndex + 1;
    setHighestZIndex(nextZ);
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        zIndex: nextZ,
        isMinimized: false
      }
    }));
    setActiveWindowId(windows[appId].id);
  };

  const handleOpenApp = (appId: AppId, triggerElement?: HTMLElement) => {
    if (triggerElement) {
      lastTriggerElementRef.current[appId] = triggerElement;
    }
    const nextZ = highestZIndex + 1;
    setHighestZIndex(nextZ);
    setWindows((prev) => {
      const win = prev[appId];
      const width = win.size.width;
      const height = win.size.height;
      const centeredX = Math.max(20, Math.round((window.innerWidth - width) / 2));
      const centeredY = Math.max(38, Math.round((window.innerHeight - height) / 2));

      return {
        ...prev,
        [appId]: {
          ...win,
          isOpen: true,
          isMinimized: false,
          position: win.isOpen ? win.position : { x: centeredX, y: centeredY },
          zIndex: nextZ
        }
      };
    });
    setActiveWindowId(windows[appId].id);
  };

  const handleCloseWindow = (appId: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isOpen: false
      }
    }));
    // Return focus to trigger element if available
    const trigger = lastTriggerElementRef.current[appId];
    if (trigger && typeof trigger.focus === 'function') {
      trigger.focus();
    }
  };

  const handleMinimizeWindow = (appId: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isMinimized: true
      }
    }));
  };

  const handleMaximizeWindow = (appId: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isMaximized: !prev[appId].isMaximized
      }
    }));
  };

  // Dock applications list (clean, NO Trash)
  const dockApps: DockApp[] = [
    { id: 'finder', name: 'Finder', icon: '/MacOS_Big_Sur_icons/Finder.webp' },
    { id: 'xcode', name: 'Projects (Xcode)', icon: '/MacOS_Big_Sur_icons/Xcode.webp' },
    { id: 'notes', name: 'About Me (Notes)', icon: '/MacOS_Big_Sur_icons/Notes.webp' },
    { id: 'contacts', name: 'Contacts', icon: '/MacOS_Big_Sur_icons/Contacts.webp' },
    { id: 'skills', name: 'Skills (Settings)', icon: '/MacOS_Big_Sur_icons/Settings.webp' },
    { id: 'awards', name: 'Awards (Game Center)', icon: '/MacOS_Big_Sur_icons/game-center-128x128_2x.webp' },
    { id: 'certificates', name: 'Certificates', icon: '/MacOS_Big_Sur_icons/wallet (1).webp' },
    { id: 'education', name: 'Education (Books)', icon: '/MacOS_Big_Sur_icons/Books.webp' },
    { id: 'leadership', name: 'Leadership', icon: '/MacOS_Big_Sur_icons/TextEdit.webp' },
    { id: 'blog', name: 'Blog (Safari)', icon: '/MacOS_Big_Sur_icons/Safari.webp' },
    { id: 'pdf', name: 'cv.pdf (Preview)', icon: '/MacOS_Big_Sur_icons/Preview.webp' },
    { id: 'mail', name: 'Mail', icon: '/MacOS_Big_Sur_icons/Mail.webp' },
    { id: 'feedback', name: 'SUS Evaluation', icon: '/MacOS_Big_Sur_icons/minesweeper.webp' },
    { id: 'terminal', name: 'Terminal', icon: '/MacOS_Big_Sur_icons/Terminal.webp' }
  ];

  const openAppIds = (Object.keys(windows) as AppId[]).filter(
    (appId) => windows[appId].isOpen && !windows[appId].isMinimized
  );

  const activeWindow = Object.values(windows).find(
    (w) => w.id === activeWindowId && w.isOpen && !w.isMinimized
  );
  const activeAppName = activeWindow ? activeWindow.title.split('–')[0].trim() : 'Finder';

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-black">
      {/* Initial macOS Apple Boot Screen with Loading Bar */}
      <MacBootScreen />

      {/* Curious Cat Infinite Looping Wallpaper */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src="/curious-cat.mp4"
      />

      {/* Ambient Dark Overlay to Ensure 4.5:1 Contrast for Icons & Windows */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] z-0 pointer-events-none" />

      {/* Top macOS Menu Bar */}
      <MenuBar activeAppName={activeAppName} onOpenApp={(appId) => handleOpenApp(appId as AppId)} />

      {/* Centerpiece: Hi! I'm Dhiraj Shirse (Animated Scramble Effect) */}
      <Centerpiece />

      {/* Desktop Workspace */}
      <Desktop
        onOpenApp={handleOpenApp}
        isMobile={isMobile}
        activeAppId={activeWindow ? activeWindow.appId : null}
      />

      {/* Windows Layer */}
      {!isMobile ? (
        <>
          {/* Notes (About Me) */}
          <WindowChrome
            window={windows.notes}
            isActive={activeWindowId === windows.notes.id}
            onFocus={() => bringToFront('notes')}
            onClose={() => handleCloseWindow('notes')}
            onMinimize={() => handleMinimizeWindow('notes')}
            onMaximize={() => handleMaximizeWindow('notes')}
            icon="/MacOS_Big_Sur_icons/Notes.webp"
          >
            <NotesApp />
          </WindowChrome>

          {/* Contacts */}
          <WindowChrome
            window={windows.contacts}
            isActive={activeWindowId === windows.contacts.id}
            onFocus={() => bringToFront('contacts')}
            onClose={() => handleCloseWindow('contacts')}
            onMinimize={() => handleMinimizeWindow('contacts')}
            onMaximize={() => handleMaximizeWindow('contacts')}
            icon="/MacOS_Big_Sur_icons/Contacts.webp"
          >
            <ContactsApp />
          </WindowChrome>

          {/* Xcode (Projects) */}
          <WindowChrome
            window={windows.xcode}
            isActive={activeWindowId === windows.xcode.id}
            onFocus={() => bringToFront('xcode')}
            onClose={() => handleCloseWindow('xcode')}
            onMinimize={() => handleMinimizeWindow('xcode')}
            onMaximize={() => handleMaximizeWindow('xcode')}
            icon="/MacOS_Big_Sur_icons/Xcode.webp"
            theme="dark"
          >
            <XcodeApp />
          </WindowChrome>

          {/* Skills (System Settings) */}
          <WindowChrome
            window={windows.skills}
            isActive={activeWindowId === windows.skills.id}
            onFocus={() => bringToFront('skills')}
            onClose={() => handleCloseWindow('skills')}
            onMinimize={() => handleMinimizeWindow('skills')}
            onMaximize={() => handleMaximizeWindow('skills')}
            icon="/MacOS_Big_Sur_icons/Settings.webp"
          >
            <SkillsApp />
          </WindowChrome>

          {/* Game Center (Awards) */}
          <WindowChrome
            window={windows.awards}
            isActive={activeWindowId === windows.awards.id}
            onFocus={() => bringToFront('awards')}
            onClose={() => handleCloseWindow('awards')}
            onMinimize={() => handleMinimizeWindow('awards')}
            onMaximize={() => handleMaximizeWindow('awards')}
            icon="/MacOS_Big_Sur_icons/game-center-128x128_2x.webp"
          >
            <GameCenterApp />
          </WindowChrome>

          {/* Books (Education) */}
          <WindowChrome
            window={windows.education}
            isActive={activeWindowId === windows.education.id}
            onFocus={() => bringToFront('education')}
            onClose={() => handleCloseWindow('education')}
            onMinimize={() => handleMinimizeWindow('education')}
            onMaximize={() => handleMaximizeWindow('education')}
            icon="/MacOS_Big_Sur_icons/Books.webp"
          >
            <BooksApp />
          </WindowChrome>

          {/* Leadership (NEW) */}
          <WindowChrome
            window={windows.leadership}
            isActive={activeWindowId === windows.leadership.id}
            onFocus={() => bringToFront('leadership')}
            onClose={() => handleCloseWindow('leadership')}
            onMinimize={() => handleMinimizeWindow('leadership')}
            onMaximize={() => handleMaximizeWindow('leadership')}
            icon="/MacOS_Big_Sur_icons/TextEdit.webp"
          >
            <LeadershipApp />
          </WindowChrome>

          {/* Blog (NEW) */}
          <WindowChrome
            window={windows.blog}
            isActive={activeWindowId === windows.blog.id}
            onFocus={() => bringToFront('blog')}
            onClose={() => handleCloseWindow('blog')}
            onMinimize={() => handleMinimizeWindow('blog')}
            onMaximize={() => handleMaximizeWindow('blog')}
            icon="/MacOS_Big_Sur_icons/Safari.webp"
          >
            <BlogApp />
          </WindowChrome>

          {/* Preview (cv.pdf) */}
          <WindowChrome
            window={windows.pdf}
            isActive={activeWindowId === windows.pdf.id}
            onFocus={() => bringToFront('pdf')}
            onClose={() => handleCloseWindow('pdf')}
            onMinimize={() => handleMinimizeWindow('pdf')}
            onMaximize={() => handleMaximizeWindow('pdf')}
            icon="/MacOS_Big_Sur_icons/Preview.webp"
          >
            <PreviewApp />
          </WindowChrome>

          {/* Mail */}
          <WindowChrome
            window={windows.mail}
            isActive={activeWindowId === windows.mail.id}
            onFocus={() => bringToFront('mail')}
            onClose={() => handleCloseWindow('mail')}
            onMinimize={() => handleMinimizeWindow('mail')}
            onMaximize={() => handleMaximizeWindow('mail')}
            icon="/MacOS_Big_Sur_icons/Mail.webp"
          >
            <MailApp />
          </WindowChrome>

          {/* Feedback (NEW SUS) */}
          <WindowChrome
            window={windows.feedback}
            isActive={activeWindowId === windows.feedback.id}
            onFocus={() => bringToFront('feedback')}
            onClose={() => handleCloseWindow('feedback')}
            onMinimize={() => handleMinimizeWindow('feedback')}
            onMaximize={() => handleMaximizeWindow('feedback')}
            icon="/MacOS_Big_Sur_icons/minesweeper.webp"
          >
            <FeedbackApp />
          </WindowChrome>

          {/* Terminal */}
          <WindowChrome
            window={windows.terminal}
            isActive={activeWindowId === windows.terminal.id}
            onFocus={() => bringToFront('terminal')}
            onClose={() => handleCloseWindow('terminal')}
            onMinimize={() => handleMinimizeWindow('terminal')}
            onMaximize={() => handleMaximizeWindow('terminal')}
            icon="/MacOS_Big_Sur_icons/Terminal.webp"
            theme="dark"
          >
            <TerminalApp onOpenApp={handleOpenApp} />
          </WindowChrome>

          {/* Finder */}
          <WindowChrome
            window={windows.finder}
            isActive={activeWindowId === windows.finder.id}
            onFocus={() => bringToFront('finder')}
            onClose={() => handleCloseWindow('finder')}
            onMinimize={() => handleMinimizeWindow('finder')}
            onMaximize={() => handleMaximizeWindow('finder')}
            icon="/MacOS_Big_Sur_icons/Finder.webp"
          >
            <FinderApp onOpenFile={handleOpenApp} />
          </WindowChrome>

          {/* Certificates */}
          <WindowChrome
            window={windows.certificates}
            isActive={activeWindowId === windows.certificates.id}
            onFocus={() => bringToFront('certificates')}
            onClose={() => handleCloseWindow('certificates')}
            onMinimize={() => handleMinimizeWindow('certificates')}
            onMaximize={() => handleMaximizeWindow('certificates')}
            icon="/MacOS_Big_Sur_icons/wallet (1).webp"
          >
            <CertificatesApp onOpenApp={handleOpenApp} />
          </WindowChrome>
        </>
      ) : (
        /* Mobile View (<768px): Single Full-Screen App Modal View */
        activeWindow && (
          <div className="fixed inset-0 z-50 bg-black flex flex-col pt-7">
            {/* Mobile Header Bar */}
            <div className="h-11 bg-[#ebebeb] px-4 flex items-center justify-between border-b border-gray-300">
              <span className="font-bold text-xs text-gray-900 truncate">
                {activeWindow.title}
              </span>
              <button
                type="button"
                onClick={() => handleCloseWindow(activeWindow.appId)}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-xs font-semibold hover:bg-gray-300"
              >
                Back to Home
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-white">
              {activeWindow.appId === 'notes' && <NotesApp />}
              {activeWindow.appId === 'contacts' && <ContactsApp />}
              {activeWindow.appId === 'xcode' && <XcodeApp />}
              {activeWindow.appId === 'skills' && <SkillsApp />}
              {activeWindow.appId === 'awards' && <GameCenterApp />}
              {activeWindow.appId === 'certificates' && <CertificatesApp onOpenApp={handleOpenApp} />}
              {activeWindow.appId === 'education' && <BooksApp />}
              {activeWindow.appId === 'leadership' && <LeadershipApp />}
              {activeWindow.appId === 'blog' && <BlogApp />}
              {activeWindow.appId === 'pdf' && <PreviewApp />}
              {activeWindow.appId === 'mail' && <MailApp />}
              {activeWindow.appId === 'feedback' && <FeedbackApp />}
              {activeWindow.appId === 'terminal' && <TerminalApp onOpenApp={handleOpenApp} />}
              {activeWindow.appId === 'finder' && <FinderApp onOpenFile={handleOpenApp} />}
            </div>
          </div>
        )
      )}

      {/* Dock (Application Launcher) */}
      <Dock
        apps={dockApps}
        openAppIds={openAppIds}
        activeAppId={activeWindow ? activeWindow.appId : null}
        onAppClick={handleOpenApp}
      />
    </div>
  );
};
