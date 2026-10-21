import React from 'react';
import { AppId, FileItem } from '../../types';

interface DesktopProps {
  onOpenApp: (appId: AppId, triggerElement?: HTMLElement) => void;
  isMobile: boolean;
  activeAppId: AppId | null;
}

export const Desktop: React.FC<DesktopProps> = ({
  onOpenApp,
  isMobile,
  activeAppId
}) => {
  // Desktop icons (strictly no Trash, no biography.txt or extended_bio.txt)
  const desktopIcons: FileItem[] = [
    {
      id: 'icon-notes',
      name: 'About Me',
      icon: '/MacOS_Big_Sur_icons/Notes.webp',
      appId: 'notes',
      type: 'app'
    },
    {
      id: 'icon-xcode',
      name: 'Projects',
      icon: '/MacOS_Big_Sur_icons/Xcode.webp',
      appId: 'xcode',
      type: 'app'
    },
    {
      id: 'icon-contacts',
      name: 'Contacts',
      icon: '/MacOS_Big_Sur_icons/Contacts.webp',
      appId: 'contacts',
      type: 'app'
    },
    {
      id: 'icon-skills',
      name: 'Skills',
      icon: '/MacOS_Big_Sur_icons/Settings.webp',
      appId: 'skills',
      type: 'app'
    },
    {
      id: 'icon-awards',
      name: 'Awards',
      icon: '/MacOS_Big_Sur_icons/game-center-128x128_2x.webp',
      appId: 'awards',
      type: 'app'
    },
    {
      id: 'icon-certificates',
      name: 'Certificates',
      icon: '/MacOS_Big_Sur_icons/wallet (1).webp',
      appId: 'certificates',
      type: 'app'
    },
    {
      id: 'icon-education',
      name: 'Education',
      icon: '/MacOS_Big_Sur_icons/Books.webp',
      appId: 'education',
      type: 'app'
    },
    {
      id: 'icon-leadership',
      name: 'Leadership',
      icon: '/MacOS_Big_Sur_icons/TextEdit.webp',
      appId: 'leadership',
      type: 'app'
    },
    {
      id: 'icon-blog',
      name: 'Blog',
      icon: '/MacOS_Big_Sur_icons/Safari.webp',
      appId: 'blog',
      type: 'app'
    },
    {
      id: 'icon-cv',
      name: 'cv.pdf',
      icon: '/MacOS_Big_Sur_icons/Preview.webp',
      appId: 'pdf',
      type: 'file'
    },
    {
      id: 'icon-feedback',
      name: 'Usability Evaluation',
      icon: '/MacOS_Big_Sur_icons/minesweeper.webp',
      appId: 'feedback',
      type: 'app'
    },
    {
      id: 'icon-terminal',
      name: 'Terminal',
      icon: '/MacOS_Big_Sur_icons/Terminal.webp',
      appId: 'terminal',
      type: 'app'
    }
  ];

  return (
    <div
      className={`fixed inset-0 pt-10 pb-20 px-6 overflow-hidden select-none ${
        isMobile ? 'flex flex-col' : 'grid grid-flow-col grid-rows-6 gap-y-4 gap-x-6 w-fit'
      }`}
    >
      {desktopIcons.map((item) => (
        <button
          key={item.id}
          id={`desktop-icon-${item.appId}`}
          type="button"
          onClick={(e) => {
            if (item.appId) onOpenApp(item.appId, e.currentTarget);
          }}
          aria-label={`Open ${item.name}`}
          className={`flex flex-col items-center justify-center p-2 rounded-xl text-center group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all ${
            isMobile
              ? 'w-full py-3.5 mb-2 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 flex-row justify-start px-4 space-x-3'
              : 'w-24 h-24 hover:bg-white/15 active:bg-white/25'
          }`}
        >
          <img
            src={item.icon}
            alt=""
            aria-hidden="true"
            className={`${
              isMobile ? 'w-10 h-10' : 'w-14 h-14'
            } object-contain drop-shadow-lg group-hover:scale-105 transition-transform select-none pointer-events-none`}
          />
          <span
            className={`font-medium tracking-tight text-white select-none ${
              isMobile
                ? 'text-sm font-semibold'
                : 'text-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-1.5 line-clamp-2 max-w-[84px] text-center'
            }`}
          >
            {item.name}
          </span>
        </button>
      ))}
    </div>
  );
};
