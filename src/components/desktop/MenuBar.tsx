import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Search, SlidersHorizontal } from 'lucide-react';
import { PROFILE_DATA } from '../../data/profile';

interface MenuBarProps {
  activeAppName: string;
  onOpenApp?: (appId: string) => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({ activeAppName }) => {
  const [time, setTime] = useState<string>('');
  const [isAppleMenuOpen, setIsAppleMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 h-7 z-50 mac-menubar-glass flex items-center justify-between px-3 text-[13px] font-medium text-[#1d1d1f] shadow-xs select-none"
    >
      {/* Left Menu Items */}
      <div className="flex items-center space-x-3.5">
        <div className="relative">
          <button
            type="button"
            aria-label="Apple Menu"
            aria-expanded={isAppleMenuOpen}
            onClick={() => setIsAppleMenuOpen(!isAppleMenuOpen)}
            className="p-1 rounded-sm hover:bg-black/10 transition-colors flex items-center justify-center focus:outline-none"
          >
            <img
              src="/apple-logo.svg"
              alt="Apple Menu"
              className="w-3.5 h-3.5 object-contain"
            />
          </button>

          {isAppleMenuOpen && (
            <div
              className="absolute top-7 left-0 w-56 bg-white/95 backdrop-blur-xl rounded-lg shadow-xl border border-black/15 py-1 z-50 text-xs"
              onClick={() => setIsAppleMenuOpen(false)}
            >
              <div className="px-3 py-1.5 font-semibold text-gray-900 border-b border-gray-200">
                {PROFILE_DATA.personal.name}
              </div>
              <div className="px-3 py-1 text-gray-600">
                macOS Portfolio Edition
              </div>
              <div className="border-t border-gray-200 my-1"></div>
              <div className="px-3 py-1 text-gray-700 hover:bg-[#007aff] hover:text-white rounded cursor-pointer mx-1">
                System Settings
              </div>
              <div className="px-3 py-1 text-gray-700 hover:bg-[#007aff] hover:text-white rounded cursor-pointer mx-1">
                About This Portfolio
              </div>
            </div>
          )}
        </div>

        {/* Active Application Name */}
        <span className="font-semibold text-[#1d1d1f]">
          {activeAppName || 'Finder'}
        </span>

        {/* Status Line */}
        <div className="hidden md:flex items-center text-xs text-contrast-muted border-l border-black/15 pl-3 space-x-1.5">
          <span className="font-medium text-gray-800">{PROFILE_DATA.personal.name}</span>
          <span>|</span>
          <span>B.Tech Computer Engineering, VJTI</span>
        </div>
      </div>

      {/* Right Control Center Items */}
      <div className="flex items-center space-x-3 text-xs text-gray-800">
        <button
          type="button"
          aria-label="Wi-Fi Status: Connected"
          className="hover:opacity-70 p-1"
        >
          <Wifi size={14} className="stroke-[2.2]" />
        </button>

        <button
          type="button"
          aria-label="Battery Status: 100%"
          className="hover:opacity-70 p-1 flex items-center space-x-1"
        >
          <Battery size={15} className="stroke-[2.2]" />
          <span className="text-[11px] font-mono">100%</span>
        </button>

        <button
          type="button"
          aria-label="Search Spotlight"
          className="hover:opacity-70 p-1"
        >
          <Search size={13} className="stroke-[2.2]" />
        </button>

        <button
          type="button"
          aria-label="Control Center"
          className="hover:opacity-70 p-1"
        >
          <SlidersHorizontal size={13} className="stroke-[2.2]" />
        </button>

        <span className="text-xs font-normal pl-1.5 tabular-nums text-gray-900">
          {time}
        </span>
      </div>
    </header>
  );
};
