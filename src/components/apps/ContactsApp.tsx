import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, Eye, Copy, Check } from 'lucide-react';
import { PROFILE_DATA } from '../../data/profile';

export const ContactsApp: React.FC = () => {
  const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="flex h-full bg-[#f4f4f7] text-[#1d1d1f] font-sans">
      {/* Left List of Contacts (single card) */}
      <aside className="w-56 bg-[#e5e5ea]/50 border-r border-[#d1d1d6] p-2 flex flex-col shrink-0 select-none">
        <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-2 py-1">
          All Contacts
        </div>
        <div className="mt-1 p-2 rounded-lg bg-[#007aff] text-white flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
            DS
          </div>
          <div className="truncate">
            <div className="text-xs font-semibold truncate">{PROFILE_DATA.personal.name}</div>
            <div className="text-[10px] text-white/80 truncate">Computer Engineering</div>
          </div>
        </div>
      </aside>

      {/* Main Contact Card */}
      <main className="flex-1 p-8 overflow-y-auto flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-4 border-b border-gray-100 pb-5">
            <img
              src="/media/curated/avatar/curated_avatar_14.webp"
              alt={PROFILE_DATA.personal.name}
              className="w-16 h-16 rounded-full object-cover border border-gray-200 shadow-xs"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">{PROFILE_DATA.personal.name}</h1>
              <p className="text-xs text-contrast-muted font-medium mt-0.5">
                {PROFILE_DATA.personal.role}
              </p>
              <div className="mt-1 inline-flex items-center text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Open to internships
              </div>
            </div>
          </div>

          {/* Contact Fields */}
          <div className="space-y-3">
            {/* Email */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100/70 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#007aff] flex items-center justify-center">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="text-[11px] text-gray-500 font-medium">Email</div>
                  <a
                    href={`mailto:${PROFILE_DATA.personal.email}`}
                    className="text-sm font-medium text-gray-900 hover:text-[#007aff] underline-offset-2 hover:underline"
                  >
                    {PROFILE_DATA.personal.email}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(PROFILE_DATA.personal.email, 'email')}
                aria-label="Copy Email"
                className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors"
              >
                {copiedField === 'email' ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
              </button>
            </div>

            {/* Phone with click-to-reveal */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100/70 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Phone size={16} />
                </div>
                <div>
                  <div className="text-[11px] text-gray-500 font-medium">Phone</div>
                  {isPhoneRevealed ? (
                    <a
                      href={`tel:${PROFILE_DATA.personal.phone}`}
                      className="text-sm font-medium text-gray-900 hover:text-emerald-600"
                    >
                      {PROFILE_DATA.personal.phone}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsPhoneRevealed(true)}
                      className="text-xs font-semibold text-[#007aff] hover:underline flex items-center space-x-1"
                    >
                      <Eye size={12} />
                      <span>Click to reveal</span>
                    </button>
                  )}
                </div>
              </div>
              {isPhoneRevealed && (
                <button
                  type="button"
                  onClick={() => copyToClipboard(PROFILE_DATA.personal.phone, 'phone')}
                  aria-label="Copy Phone"
                  className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors"
                >
                  {copiedField === 'phone' ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                </button>
              )}
            </div>

            {/* LinkedIn */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100/70 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                  <Linkedin size={16} />
                </div>
                <div>
                  <div className="text-[11px] text-gray-500 font-medium">LinkedIn</div>
                  <a
                    href={PROFILE_DATA.personal.linkedIn}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-[#007aff] hover:underline truncate max-w-[220px] block"
                  >
                    dhiraj-shirse-645445328
                  </a>
                </div>
              </div>
              <a
                href={PROFILE_DATA.personal.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-gray-500 hover:text-gray-900 font-medium"
              >
                Open
              </a>
            </div>

            {/* GitHub Profile */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100/70 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gray-200 text-gray-800 flex items-center justify-center">
                  <Github size={16} />
                </div>
                <div>
                  <div className="text-[11px] text-gray-500 font-medium">GitHub Profile</div>
                  <a
                    href={PROFILE_DATA.personal.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-[#007aff] hover:underline truncate max-w-[220px] block"
                  >
                    {PROFILE_DATA.personal.github}
                  </a>
                </div>
              </div>
              <a
                href={PROFILE_DATA.personal.github}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-gray-500 hover:text-gray-900 font-medium"
              >
                Open
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
