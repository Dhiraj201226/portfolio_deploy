import React, { useState } from 'react';
import { PROFILE_DATA } from '../../data/profile';
import { Users, Calendar, Award, CheckCircle2, ChevronRight } from 'lucide-react';

export const LeadershipApp: React.FC = () => {
  const [selectedEntryId, setSelectedEntryId] = useState<string>(PROFILE_DATA.leadership[0].id);

  const activeEntry =
    PROFILE_DATA.leadership.find((item) => item.id === selectedEntryId) || PROFILE_DATA.leadership[0];

  return (
    <div className="flex h-full bg-[#f8f9fa] text-[#1d1d1f] font-sans">
      {/* Reminders / Calendar Style Sidebar */}
      <aside className="w-64 bg-[#f2f2f7] border-r border-[#d1d1d6] p-3 flex flex-col shrink-0 select-none">
        <div className="flex items-center space-x-2 px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <Users size={14} className="text-[#007aff]" />
          <span>Leadership & Activities</span>
        </div>

        <div className="space-y-1.5 mt-2">
          {PROFILE_DATA.leadership.map((item) => {
            const isSelected = selectedEntryId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedEntryId(item.id)}
                className={`w-full text-left p-3 rounded-xl transition-all border ${
                  isSelected
                    ? 'bg-white border-blue-500/30 text-gray-900 shadow-xs'
                    : 'bg-transparent border-transparent hover:bg-black/5 text-gray-700'
                }`}
              >
                <div className="text-xs font-bold truncate">{item.role}</div>
                <div className="text-[11px] text-gray-500 font-medium truncate mt-0.5">
                  {item.organization}
                </div>
                <div className="flex items-center space-x-1 text-[10px] text-gray-400 mt-1 font-mono">
                  <Calendar size={10} />
                  <span>{item.period}</span>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Detail Area */}
      <main className="flex-1 p-8 overflow-y-auto bg-white flex flex-col justify-center">
        <div className="max-w-xl mx-auto w-full space-y-6">
          {/* Header */}
          <div className="border-b border-gray-100 pb-5">
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#007aff] mb-1">
              <Award size={15} />
              <span>Campus Leadership</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 leading-snug">
              {activeEntry.role}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 font-medium mt-1.5">
              <span className="text-gray-900 font-semibold">{activeEntry.organization}</span>
              <span>•</span>
              <span className="font-mono text-gray-500">{activeEntry.period}</span>
            </div>
          </div>

          {/* Verbatim Bullets */}
          <div className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Key Responsibilities & Contributions
            </h2>
            <div className="space-y-3">
              {activeEntry.bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 p-3.5 bg-gray-50 border border-gray-200/80 rounded-xl"
                >
                  <CheckCircle2 size={16} className="text-[#34c759] shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed text-gray-800 font-normal">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
