import React, { useState } from 'react';
import { AppId, FileItem } from '../../types';
import {
  Folder,
  HardDrive,
  Clock,
  Laptop,
  FileText,
  Search,
  Grid,
  List
} from 'lucide-react';

interface FinderAppProps {
  onOpenFile: (appId: AppId) => void;
}

export const FinderApp: React.FC<FinderAppProps> = ({ onOpenFile }) => {
  const [selectedFolder, setSelectedFolder] = useState<'desktop' | 'applications' | 'certificates'>('desktop');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const certificateFiles: FileItem[] = [
    {
      id: 'cert-1',
      name: 'ijert-fakemyvoice-publication.png',
      icon: '/certificates/ijert-fakemyvoice-publication.png',
      appId: 'certificates',
      type: 'file',
      size: '649 KB'
    },
    {
      id: 'cert-2',
      name: 'lenovo-aicte-genai-internship.png',
      icon: '/certificates/lenovo-aicte-genai-internship.png',
      appId: 'certificates',
      type: 'file',
      size: '411 KB'
    },
    {
      id: 'cert-3',
      name: 'lenovo-skill-india-ai.png',
      icon: '/certificates/lenovo-skill-india-ai.png',
      appId: 'certificates',
      type: 'file',
      size: '423 KB'
    }
  ];

  // Finder file system cleaned according to prompt rules:
  // - biography.txt and extended_bio.txt REMOVED
  // - duplicate skills .txt files REMOVED
  // - Trash REMOVED
  const desktopFiles: FileItem[] = [
    {
      id: 'app-notes',
      name: 'About Me.app',
      icon: '/MacOS_Big_Sur_icons/Notes.webp',
      appId: 'notes',
      type: 'app'
    },
    {
      id: 'app-xcode',
      name: 'Projects.app',
      icon: '/MacOS_Big_Sur_icons/Xcode.webp',
      appId: 'xcode',
      type: 'app'
    },
    {
      id: 'app-contacts',
      name: 'Contacts.app',
      icon: '/MacOS_Big_Sur_icons/Contacts.webp',
      appId: 'contacts',
      type: 'app'
    },
    {
      id: 'app-skills',
      name: 'Skills.app',
      icon: '/MacOS_Big_Sur_icons/Settings.webp',
      appId: 'skills',
      type: 'app'
    },
    {
      id: 'app-awards',
      name: 'Awards.app',
      icon: '/MacOS_Big_Sur_icons/game-center-128x128_2x.webp',
      appId: 'awards',
      type: 'app'
    },
    {
      id: 'app-certificates',
      name: 'Certificates.app',
      icon: '/MacOS_Big_Sur_icons/wallet (1).webp',
      appId: 'certificates',
      type: 'app'
    },
    {
      id: 'app-education',
      name: 'Education.app',
      icon: '/MacOS_Big_Sur_icons/Books.webp',
      appId: 'education',
      type: 'app'
    },
    {
      id: 'app-leadership',
      name: 'Leadership.app',
      icon: '/MacOS_Big_Sur_icons/TextEdit.webp',
      appId: 'leadership',
      type: 'app'
    },
    {
      id: 'app-blog',
      name: 'Blog.app',
      icon: '/MacOS_Big_Sur_icons/Safari.webp',
      appId: 'blog',
      type: 'app'
    },
    {
      id: 'file-cv',
      name: 'cv.pdf',
      icon: '/MacOS_Big_Sur_icons/Preview.webp',
      appId: 'pdf',
      type: 'file',
      size: '156 KB'
    },
    {
      id: 'app-feedback',
      name: 'Usability Evaluation.app',
      icon: '/MacOS_Big_Sur_icons/minesweeper.webp',
      appId: 'feedback',
      type: 'app'
    }
  ];

  return (
    <div className="flex h-full bg-white text-[#1d1d1f] font-sans">
      {/* Finder Sidebar */}
      <aside className="w-48 bg-[#f2f2f7] border-r border-[#d1d1d6] p-3 flex flex-col justify-between shrink-0 select-none">
        <div className="space-y-4">
          <div>
            <div className="text-[11px] font-semibold text-[#8e8e93] uppercase tracking-wider px-2 mb-1">
              Favorites
            </div>
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={() => setSelectedFolder('desktop')}
                className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors ${
                  selectedFolder === 'desktop'
                    ? 'bg-[#007aff] text-white'
                    : 'text-gray-700 hover:bg-black/5'
                }`}
              >
                <Laptop size={14} />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedFolder('applications')}
                className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors ${
                  selectedFolder === 'applications'
                    ? 'bg-[#007aff] text-white'
                    : 'text-gray-700 hover:bg-black/5'
                }`}
              >
                <HardDrive size={14} />
                <span>Applications</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedFolder('certificates')}
                className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors ${
                  selectedFolder === 'certificates'
                    ? 'bg-[#007aff] text-white'
                    : 'text-gray-700 hover:bg-black/5'
                }`}
              >
                <FileText size={14} />
                <span>Certificates</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-2 text-[11px] text-[#8e8e93]">
          Macintosh HD
        </div>
      </aside>

      {/* Main Files View */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Finder Header Toolbar */}
        <div className="h-10 bg-[#ebebeb] border-b border-[#d2d2d7] px-4 flex items-center justify-between select-none">
          <div className="text-xs font-semibold text-gray-700 capitalize">
            {selectedFolder}
          </div>

          <div className="flex items-center space-x-1 border border-gray-300 rounded-lg p-0.5 bg-white">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              aria-label="Grid View"
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              <Grid size={13} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              aria-label="List View"
              className={`p-1 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              <List size={13} />
            </button>
          </div>
        </div>

        {/* Files Grid */}
        <main className="flex-1 p-6 overflow-y-auto bg-white">
          {(() => {
            const currentItems = selectedFolder === 'certificates' ? certificateFiles : desktopFiles;
            return viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6">
                {currentItems.map((file) => (
                  <div
                    key={file.id}
                    onDoubleClick={() => file.appId && onOpenFile(file.appId)}
                    className="flex flex-col items-center p-2 rounded-xl hover:bg-[#007aff]/15 cursor-pointer group text-center"
                  >
                    <img
                      src={file.icon}
                      alt=""
                      aria-hidden="true"
                      className="w-14 h-14 object-contain drop-shadow-sm group-hover:scale-105 transition-transform select-none rounded"
                    />
                    <span className="text-xs font-medium text-gray-800 mt-2 truncate max-w-full px-1">
                      {file.name}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {currentItems.map((file) => (
                  <div
                    key={file.id}
                    onDoubleClick={() => file.appId && onOpenFile(file.appId)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#007aff]/10 cursor-pointer text-xs"
                  >
                    <img src={file.icon} alt="" className="w-6 h-6 object-contain rounded" />
                    <span className="font-medium text-gray-900 flex-1">{file.name}</span>
                    <span className="text-gray-400 font-mono text-[11px]">{file.size || 'App'}</span>
                  </div>
                ))}
              </div>
            );
          })()}
        </main>
      </div>
    </div>
  );
};
