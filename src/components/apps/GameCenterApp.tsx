import React, { useState } from 'react';
import { PROFILE_DATA, AwardEntry } from '../../data/profile';
import { Trophy, Award, ExternalLink, ShieldCheck } from 'lucide-react';

export const GameCenterApp: React.FC = () => {
  const [selectedAwardId, setSelectedAwardId] = useState<string>(PROFILE_DATA.awards[0].id);

  const activeAward =
    PROFILE_DATA.awards.find((a) => a.id === selectedAwardId) || PROFILE_DATA.awards[0];

  return (
    <div className="flex h-full bg-[#f8f9fc] text-[#1d1d1f] font-sans">
      {/* Sidebar: Awards List */}
      <aside className="w-80 bg-white border-r border-[#e5e5ea] flex flex-col shrink-0 select-none">
        <div className="p-4 border-b border-[#f2f2f7]">
          <div className="flex items-center space-x-2">
            <Trophy className="text-amber-500" size={18} />
            <h1 className="text-sm font-bold text-gray-900">Game Center Achievements</h1>
          </div>
          <p className="text-[11px] text-gray-500 mt-0.5">
            3 Technical Competitions & Open Source Honors
          </p>
        </div>

        <div className="p-2 space-y-2 overflow-y-auto flex-1">
          {PROFILE_DATA.awards.map((award) => {
            const isSelected = selectedAwardId === award.id;

            return (
              <div
                key={award.id}
                onClick={() => setSelectedAwardId(award.id)}
                title={award.title}
                className={`p-3 rounded-xl cursor-pointer border transition-all ${
                  isSelected
                    ? 'bg-[#007aff]/10 border-[#007aff] text-gray-900 shadow-2xs'
                    : 'bg-gray-50/70 border-gray-200/80 hover:bg-gray-100/70 text-gray-700'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Award size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    {/* Title wrapped onto two lines with tooltip */}
                    <div
                      title={award.title}
                      className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug"
                    >
                      {award.title}
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium mt-1 truncate">
                      {award.issuer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Detail Pane */}
      <main className="flex-1 p-8 overflow-y-auto bg-white flex flex-col justify-center">
        <div className="max-w-xl mx-auto w-full space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-md shrink-0">
              <Trophy size={28} />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1 text-[11px] font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 mb-1">
                <ShieldCheck size={12} />
                <span>Verified Achievement</span>
              </div>
              <h2
                title={activeAward.title}
                className="text-lg font-bold text-gray-900 leading-snug"
              >
                {activeAward.title}
              </h2>
              <div className="text-xs text-contrast-muted font-medium mt-1">
                Issuer: <span className="text-gray-900 font-semibold">{activeAward.issuer}</span>
              </div>
            </div>
          </div>

          {/* Full Sentence in detail pane verbatim from CV */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 text-sm leading-relaxed text-gray-800">
            <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Citation / Description
            </div>
            <p className="font-normal text-[14px] leading-6">
              {activeAward.description}
            </p>
          </div>

          {/* For the SIH award add a "View project" link */}
          {activeAward.repoUrl && (
            <div>
              <a
                href={activeAward.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-[#007aff] hover:bg-[#0069d9] text-white rounded-lg text-xs font-medium transition-colors shadow-xs"
              >
                <ExternalLink size={14} />
                <span>View project (builder-vortex-garden)</span>
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
