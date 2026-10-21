import React, { useState } from 'react';
import { PROFILE_DATA } from '../../data/profile';
import { Code, Layers, Wrench, Brain, Search } from 'lucide-react';

export const SkillsApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryIcons: Record<string, React.ReactNode> = {
    Languages: <Code size={15} className="text-blue-500" />,
    'Frameworks & Libraries': <Layers size={15} className="text-purple-500" />,
    'Tools & Databases': <Wrench size={15} className="text-amber-500" />,
    Concepts: <Brain size={15} className="text-emerald-500" />
  };

  const filteredGroups = PROFILE_DATA.skills
    .filter((group) => selectedCategory === 'all' || group.category === selectedCategory)
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="flex h-full bg-[#f4f4f7] text-[#1d1d1f] font-sans">
      {/* System Settings Sidebar */}
      <aside className="w-56 bg-[#e5e5ea]/50 border-r border-[#d1d1d6] p-3 flex flex-col shrink-0 select-none">
        {/* Search Input */}
        <div className="relative mb-3">
          <Search size={13} className="absolute left-2.5 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills..."
            className="w-full pl-7 pr-3 py-1.5 bg-white rounded-lg border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#007aff]"
          />
        </div>

        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-2 py-1">
          Skill Categories
        </div>

        <div className="space-y-1 mt-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#007aff] text-white'
                : 'text-gray-700 hover:bg-black/5'
            }`}
          >
            <span>All Skills</span>
          </button>

          {PROFILE_DATA.skills.map((group) => (
            <button
              key={group.category}
              type="button"
              onClick={() => setSelectedCategory(group.category)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors ${
                selectedCategory === group.category
                  ? 'bg-[#007aff] text-white'
                  : 'text-gray-700 hover:bg-black/5'
              }`}
            >
              <span className={selectedCategory === group.category ? 'text-white' : ''}>
                {categoryIcons[group.category]}
              </span>
              <span className="truncate">{group.category}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Settings Panel */}
      <main className="flex-1 p-6 overflow-y-auto bg-white">
        <div className="max-w-2xl mx-auto space-y-6">
          <header className="border-b border-gray-100 pb-4">
            <h1 className="text-xl font-bold text-gray-900">Technical Skills</h1>
            <p className="text-xs text-contrast-muted mt-0.5">
              Verified technical proficiencies, tools, and computer engineering concepts.
            </p>
          </header>

          <div className="space-y-6">
            {filteredGroups.map((group) => (
              <section
                key={group.category}
                className="bg-[#f8f9fa] border border-gray-200/80 rounded-xl p-4 shadow-2xs"
              >
                <div className="flex items-center space-x-2 mb-3">
                  {categoryIcons[group.category]}
                  <h2 className="text-sm font-semibold text-gray-900">{group.category}</h2>
                  <span className="text-[11px] text-gray-500 font-mono">({group.items.length})</span>
                </div>

                {/* Read-Only Plain Chips without Levels */}
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-white border border-gray-200 text-gray-800 rounded-lg text-xs font-medium shadow-2xs select-text"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            ))}

            {filteredGroups.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-xs">
                No skills matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
