import React, { useState } from 'react';
import { PROFILE_DATA, CertificateEntry } from '../../data/profile';
import {
  Award,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Search,
  Maximize2,
  Download,
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
  X
} from 'lucide-react';
import { AppId } from '../../types';

interface CertificatesAppProps {
  onOpenApp?: (appId: AppId) => void;
}

export const CertificatesApp: React.FC<CertificatesAppProps> = ({ onOpenApp }) => {
  const [selectedId, setSelectedId] = useState<string>(PROFILE_DATA.certifications[0]?.id || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  const activeCert: CertificateEntry =
    PROFILE_DATA.certifications.find((c) => c.id === selectedId) || PROFILE_DATA.certifications[0];

  const filteredCerts = PROFILE_DATA.certifications.filter((cert) => {
    const matchesCategory =
      selectedCategory === 'all' || cert.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cert.credentialId && cert.credentialId.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyId = (idText: string) => {
    navigator.clipboard.writeText(idText);
    setCopiedId(idText);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (category: CertificateEntry['category']) => {
    switch (category) {
      case 'Publication':
        return <FileText size={15} className="text-blue-500" />;
      case 'Internship':
        return <Briefcase size={15} className="text-emerald-500" />;
      case 'Coursework':
        return <GraduationCap size={15} className="text-purple-500" />;
      default:
        return <Award size={15} className="text-amber-500" />;
    }
  };

  return (
    <div className="flex h-full bg-[#f8f9fc] text-[#1d1d1f] font-sans select-none overflow-hidden">
      {/* Left Sidebar: Certificate List */}
      <aside className="w-80 bg-white border-r border-[#e5e5ea] flex flex-col shrink-0">
        {/* Header */}
        <div className="p-3.5 border-b border-[#f2f2f7]">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-md bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Award size={15} />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900 leading-none">Certifications</h1>
              <p className="text-[11px] text-gray-500 mt-0.5">3 Verified Credentials & Publications</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mt-3">
            <Search size={13} className="absolute left-2.5 top-2.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search certificates, IDs..."
              className="w-full pl-7 pr-3 py-1.5 bg-[#f2f2f7] rounded-lg border border-transparent text-xs text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#007aff] focus:outline-none transition-all"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1 mt-2.5 overflow-x-auto text-[11px] font-medium text-gray-600 no-scrollbar">
            {['all', 'Publication', 'Internship', 'Coursework'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-0.5 rounded-full transition-colors whitespace-nowrap capitalize ${
                  selectedCategory === cat
                    ? 'bg-[#007aff] text-white font-semibold'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                {cat === 'all' ? 'All (3)' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Items */}
        <div className="p-2 space-y-2 overflow-y-auto flex-1">
          {filteredCerts.length === 0 ? (
            <div className="p-4 text-center text-xs text-gray-400">No matching certificates found</div>
          ) : (
            filteredCerts.map((cert) => {
              const isSelected = selectedId === cert.id;
              return (
                <div
                  key={cert.id}
                  onClick={() => setSelectedId(cert.id)}
                  className={`p-3 rounded-xl cursor-pointer border transition-all text-left ${
                    isSelected
                      ? 'bg-[#007aff]/10 border-[#007aff] shadow-2xs'
                      : 'bg-gray-50/70 border-gray-200/80 hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-start space-x-2.5">
                    {/* Thumbnail */}
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 bg-white shrink-0 shadow-2xs">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 flex items-center space-x-1">
                          {getCategoryIcon(cert.category)}
                          <span className="truncate">{cert.category}</span>
                        </span>
                        {cert.grade && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded">
                            {cert.grade}
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-gray-900 line-clamp-1 mt-0.5">
                        {cert.title}
                      </div>
                      <div className="text-[11px] text-gray-500 font-medium truncate mt-0.5">
                        {cert.issuer}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1 font-mono">{cert.date}</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </aside>

      {/* Main Detail Pane */}
      <main className="flex-1 flex flex-col bg-[#fafafc] overflow-y-auto">
        {activeCert ? (
          <div className="p-6 max-w-3xl mx-auto w-full space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 size={13} />
                  <span>Officially Verified Credential</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 leading-snug">{activeCert.title}</h2>
                <div className="text-xs text-gray-600 font-medium">{activeCert.organization}</div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 rounded-lg border border-gray-300 text-xs font-medium shadow-2xs transition-colors"
                >
                  <Maximize2 size={13} />
                  <span>Enlarge</span>
                </button>
                <a
                  href={activeCert.image}
                  download={`${activeCert.id}.png`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#007aff] hover:bg-[#0069d9] text-white rounded-lg text-xs font-medium shadow-2xs transition-colors"
                >
                  <Download size={13} />
                  <span>Download</span>
                </a>
              </div>
            </div>

            {/* Certificate Visual Image Preview */}
            <div className="relative group rounded-2xl overflow-hidden border border-gray-300 shadow-md bg-white cursor-pointer"
                 onClick={() => setIsLightboxOpen(true)}>
              <img
                src={activeCert.image}
                alt={activeCert.title}
                className="w-full h-auto max-h-[380px] object-contain bg-slate-900/5 mx-auto"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-gray-900 text-xs font-semibold shadow-lg flex items-center space-x-2">
                  <Maximize2 size={15} />
                  <span>Click to view full certificate</span>
                </span>
              </div>
            </div>

            {/* Credential Details Card */}
            <div className="bg-white rounded-xl border border-gray-200/90 p-5 shadow-2xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-100 pb-2">
                Credential Verification & Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {activeCert.credentialId && (
                  <div>
                    <span className="text-gray-500 block text-[11px]">Credential ID / Reg No:</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="font-mono font-semibold text-gray-900 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                        {activeCert.credentialId}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyId(activeCert.credentialId || '')}
                        title="Copy Credential ID"
                        className="text-gray-400 hover:text-gray-700 p-1"
                      >
                        {copiedId === activeCert.credentialId ? (
                          <Check size={14} className="text-emerald-600" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <span className="text-gray-500 block text-[11px]">Date of Issue:</span>
                  <span className="font-semibold text-gray-900 block mt-1">{activeCert.date}</span>
                </div>

                <div>
                  <span className="text-gray-500 block text-[11px]">Issuing Body:</span>
                  <span className="font-medium text-gray-900 block mt-1">{activeCert.issuer}</span>
                </div>

                {activeCert.grade && (
                  <div>
                    <span className="text-gray-500 block text-[11px]">Grade / Distinction:</span>
                    <span className="inline-block font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-xs mt-1">
                      {activeCert.grade}
                    </span>
                  </div>
                )}

                {activeCert.doi && (
                  <div>
                    <span className="text-gray-500 block text-[11px]">Crossref DOI:</span>
                    <span className="font-mono text-gray-900 block mt-1">{activeCert.doi}</span>
                  </div>
                )}
              </div>

              {/* Official Badges */}
              <div>
                <span className="text-gray-500 block text-[11px] mb-2">Accreditations & Endorsements:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCert.verificationBadges.map((badge) => (
                    <span
                      key={badge}
                      className="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-md text-[11px] font-medium border border-gray-200/80 flex items-center space-x-1"
                    >
                      <Sparkles size={11} className="text-amber-500" />
                      <span>{badge}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Summary Description */}
              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 block text-[11px] mb-1">Official Summary:</span>
                <p className="text-xs text-gray-800 leading-relaxed font-normal bg-[#f8f9fc] p-3 rounded-lg border border-gray-200/60">
                  {activeCert.description}
                </p>
              </div>

              {/* Related Project Link (e.g. for Fake My Voice) */}
              {activeCert.relatedProject && onOpenApp && (
                <div className="pt-2 flex items-center justify-between bg-blue-50/70 p-3 rounded-lg border border-blue-200/60">
                  <div className="text-xs text-blue-900 font-medium">
                    Related Project: <span className="font-bold">{activeCert.relatedProject}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenApp('xcode')}
                    className="inline-flex items-center space-x-1 text-xs text-[#007aff] hover:underline font-semibold"
                  >
                    <span>View in Xcode</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-xs">
            Select a certificate from the sidebar
          </div>
        )}
      </main>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-2"
               onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>
            <img
              src={activeCert.image}
              alt={activeCert.title}
              className="max-h-[82vh] w-auto mx-auto object-contain rounded-xl"
            />
            <div className="p-3 text-center text-xs font-semibold text-gray-800">
              {activeCert.title} — {activeCert.issuer}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
