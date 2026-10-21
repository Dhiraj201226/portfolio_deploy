import React from 'react';
import { PROFILE_DATA } from '../../data/profile';
import { BookOpen, ExternalLink, Calendar, Compass } from 'lucide-react';

export const BlogApp: React.FC = () => {
  const posts = PROFILE_DATA.posts;

  return (
    <div className="flex flex-col h-full bg-[#fbfbfd] text-[#1d1d1f] font-sans">
      {/* Safari-style Header */}
      <div className="h-11 border-b border-[#e5e5ea] bg-white px-4 flex items-center justify-between select-none">
        <div className="flex items-center space-x-2">
          <BookOpen size={16} className="text-[#007aff]" />
          <span className="text-xs font-semibold text-gray-800">Reading List & Engineering Blog</span>
        </div>
        <div className="text-[11px] text-gray-500 font-mono">
          {posts.length} {posts.length === 1 ? 'Article' : 'Articles'}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
              <Compass size={40} className="text-gray-300 mb-3" />
              <div className="text-base font-semibold text-gray-700">Posts coming soon</div>
              <p className="text-xs text-gray-400 mt-1 max-w-xs">
                Technical articles on RAG architecture, machine learning, and computer engineering will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white border border-gray-200/80 hover:border-[#007aff]/50 rounded-2xl p-5 transition-all shadow-2xs hover:shadow-sm"
                >
                  <div className="flex items-center space-x-2 text-[11px] text-gray-500 font-mono mb-2">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                    {post.isPlaceholder && (
                      <span className="text-[10px] font-sans font-semibold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
                        DEV Community Post
                      </span>
                    )}
                  </div>

                  <h2 className="text-base font-bold text-gray-900 leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {post.summary}
                  </p>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    {/* URL link marked with TODO real URL in profile.ts */}
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#007aff] hover:underline"
                    >
                      <span>Read full publication on DEV</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
