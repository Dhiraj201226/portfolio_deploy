import React, { useState } from 'react';
import { PROFILE_DATA, EducationEntry } from '../../data/profile';
import { BookOpen, GraduationCap, Award, MapPin, Calendar } from 'lucide-react';

export const BooksApp: React.FC = () => {
  const [selectedDegreeId, setSelectedDegreeId] = useState<string>(PROFILE_DATA.education[0].id);

  const activeDegree =
    PROFILE_DATA.education.find((e) => e.id === selectedDegreeId) || PROFILE_DATA.education[0];

  return (
    <div className="flex h-full bg-[#f4f4f7] text-[#1d1d1f] font-sans">
      {/* Books Sidebar: Only Degrees (Awards removed) */}
      <aside className="w-64 bg-[#e5e5ea]/50 border-r border-[#d1d1d6] p-3 flex flex-col shrink-0 select-none">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-2 py-1">
          Education Library
        </div>

        <div className="space-y-1.5 mt-2">
          {PROFILE_DATA.education.map((edu) => {
            const isSelected = selectedDegreeId === edu.id;

            return (
              <button
                key={edu.id}
                type="button"
                onClick={() => setSelectedDegreeId(edu.id)}
                className={`w-full text-left p-2.5 rounded-xl transition-colors border ${
                  isSelected
                    ? 'bg-white border-gray-300 shadow-xs'
                    : 'bg-transparent border-transparent hover:bg-black/5 text-gray-700'
                }`}
              >
                <div className="flex items-start space-x-2.5">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-[#007aff] text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    <GraduationCap size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-gray-900 truncate">
                      {edu.institution.split(',')[0]}
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium truncate mt-0.5">
                      {edu.degree || 'Junior College'}
                    </div>
                  </div>
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
            <div className="flex items-center space-x-2 text-xs text-blue-600 font-semibold mb-1">
              <GraduationCap size={16} />
              <span>Academic Credential</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 leading-snug">
              {activeDegree.institution}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-2">
              <span className="flex items-center space-x-1">
                <MapPin size={12} />
                <span>{activeDegree.location}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Calendar size={12} />
                <span>{activeDegree.period}</span>
              </span>
            </div>
          </div>

          {/* VJTI Details */}
          {activeDegree.degree && (
            <div className="bg-[#f8f9fc] rounded-xl border border-gray-200/80 p-4 space-y-2">
              <div className="text-xs text-gray-500 font-medium">Degree & Performance</div>
              <div className="text-base font-bold text-gray-900">
                {activeDegree.degree}
              </div>
              {activeDegree.gpaOrGrade && (
                <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 font-mono text-xs font-semibold rounded-lg border border-blue-200">
                  {activeDegree.gpaOrGrade}
                </div>
              )}
            </div>
          )}

          {/* Coursework list for VJTI */}
          {activeDegree.coursework && (
            <div className="space-y-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Relevant Coursework
              </h2>
              <div className="flex flex-wrap gap-2">
                {activeDegree.coursework.map((course) => (
                  <span
                    key={course}
                    className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-800 rounded-lg text-xs font-medium"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Entrance Results for Latur College */}
          {activeDegree.entranceResults && (
            <div className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Entrance Examinations & Academic Merits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeDegree.entranceResults.map((result) => (
                  <div
                    key={result}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 font-mono"
                  >
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
