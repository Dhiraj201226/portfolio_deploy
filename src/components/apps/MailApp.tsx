import React, { useState } from 'react';
import { PROFILE_DATA } from '../../data/profile';
import { Send, Mail, User, CheckCircle } from 'lucide-react';

export const MailApp: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PROFILE_DATA.personal.email}?subject=${encodeURIComponent(
      subject || 'Inquiry / Opportunity for Dhiraj Shirse'
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
    setIsSent(true);
    setTimeout(() => setIsSent(false), 4000);
  };

  return (
    <div className="flex flex-col h-full bg-[#fdfdfd] text-[#1d1d1f] font-sans">
      {/* Mail Top Toolbar */}
      <div className="h-11 bg-[#ebebeb] border-b border-[#d2d2d7] px-4 flex items-center justify-between select-none">
        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-800">
          <Mail size={15} className="text-[#007aff]" />
          <span>New Message</span>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="flex items-center space-x-1.5 bg-[#007aff] hover:bg-[#0069d9] text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors shadow-xs"
        >
          <Send size={12} />
          <span>Send</span>
        </button>
      </div>

      {/* Main Compose Window Form */}
      <main className="flex-1 p-6 overflow-y-auto max-w-2xl mx-auto w-full">
        {isSent && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs flex items-center space-x-2 animate-in fade-in">
            <CheckCircle size={15} className="text-green-600" />
            <span>Opening default email client with your message...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* To Field (verbatim recipient) */}
          <div className="flex items-center border-b border-gray-200 pb-2">
            <label htmlFor="mail-to" className="w-16 text-xs font-medium text-gray-400">
              To:
            </label>
            <div className="flex items-center space-x-2 flex-1">
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-medium">
                {PROFILE_DATA.personal.name} &lt;{PROFILE_DATA.personal.email}&gt;
              </span>
            </div>
          </div>

          {/* Subject Field */}
          <div className="flex items-center border-b border-gray-200 pb-2">
            <label htmlFor="mail-subject" className="w-16 text-xs font-medium text-gray-400">
              Subject:
            </label>
            <input
              id="mail-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Internship opportunity / Collaboration inquiry"
              className="flex-1 text-xs text-gray-900 placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Message Area */}
          <div className="pt-2">
            <textarea
              id="mail-message"
              rows={12}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi Dhiraj,&#10;&#10;I came across your portfolio and project work in AI and Computer Engineering at VJTI..."
              className="w-full text-sm leading-relaxed text-gray-800 placeholder-gray-400 focus:outline-none resize-none bg-transparent"
            />
          </div>
        </form>
      </main>
    </div>
  );
};
