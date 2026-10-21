import React from 'react';
import { PROFILE_DATA } from '../../data/profile';
import { FileText, Folder, Calendar } from 'lucide-react';

export const NotesApp: React.FC = () => {
  return (
    <div className="flex h-full bg-[#fdfdfd] text-[#1d1d1f] font-sans">
      {/* Sidebar: Folders */}
      <aside className="w-48 bg-[#f2f2f7] border-r border-[#d1d1d6] p-3 flex flex-col justify-between shrink-0 select-none">
        <div>
          <div className="text-[11px] font-semibold text-[#8e8e93] tracking-wider uppercase px-2 mb-2">
            Folders
          </div>
          <div className="flex items-center space-x-2 px-2.5 py-1.5 rounded-md bg-[#e5e5ea] text-gray-900 font-medium text-xs">
            <Folder size={14} className="text-[#007aff]" />
            <span>Notes</span>
            <span className="ml-auto text-[10px] text-gray-500 font-semibold">1</span>
          </div>
        </div>
        <div className="text-[11px] text-[#8e8e93] px-2">
          iCloud Synced
        </div>
      </aside>

      {/* Middle List: Notes List */}
      <aside className="w-56 border-r border-[#e5e5ea] bg-white flex flex-col shrink-0 select-none">
        <div className="p-3 border-b border-[#f2f2f7]">
          <span className="text-xs font-semibold text-gray-500">1 Note</span>
        </div>
        <div className="p-3 bg-[#e4effb] border-l-4 border-[#007aff] cursor-pointer">
          <div className="text-sm font-semibold text-gray-900 truncate">About</div>
          <div className="flex items-center space-x-1 text-[11px] text-gray-500 mt-0.5">
            <Calendar size={11} />
            <span>Today</span>
          </div>
          <div className="text-xs text-gray-600 line-clamp-2 mt-1">
            {PROFILE_DATA.personal.aboutSummary}
          </div>
        </div>
      </aside>

      {/* Main Content Area: Note View */}
      <main className="flex-1 p-8 overflow-y-auto bg-white">
        <article className="max-w-2xl mx-auto space-y-6">
          <header className="border-b border-gray-100 pb-4">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">About</h1>
            <div className="flex items-center space-x-2 text-xs text-[#8e8e93] mt-1">
              <span>Personal Profile</span>
              <span>•</span>
              <span>Veermata Jijabai Technological Institute (VJTI)</span>
            </div>
          </header>

          <div className="text-base leading-relaxed text-[#2c2c2e] space-y-4">
            <p className="text-[15px] leading-7 font-normal">
              {PROFILE_DATA.personal.aboutSummary}
            </p>
          </div>

          <div className="bg-[#f8f9fa] border border-gray-200/80 rounded-xl p-4 mt-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Current Academic & Campus Roles
            </h2>
            <ul className="text-sm space-y-2 text-gray-800">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#007aff]" />
                <span className="font-medium">Project X (VJTI)</span> – Core Member
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34c759]" />
                <span className="font-medium">SY B.Tech Computer Engineering</span> – Class Representative
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff9500]" />
                <span className="font-medium">Technovanza 2025–26</span> – Department Head, Technical Committee
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
              Open to internships
            </span>
            {PROFILE_DATA.personal.interests.map((interest) => (
              <span
                key={interest}
                className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full border border-gray-200"
              >
                {interest}
              </span>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
};
