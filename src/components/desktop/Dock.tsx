import React, { useState } from 'react';
import { AppId } from '../../types';

export interface DockApp {
  id: AppId;
  name: string;
  icon: string;
}

interface DockProps {
  apps: DockApp[];
  openAppIds: AppId[];
  activeAppId: AppId | null;
  onAppClick: (appId: AppId) => void;
}

export const Dock: React.FC<DockProps> = ({
  apps,
  openAppIds,
  activeAppId,
  onAppClick
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav
      aria-label="Application Dock"
      className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-40 hidden sm:block"
    >
      <div className="mac-dock-glass px-2.5 py-1.5 rounded-2xl flex items-end space-x-1.5 transition-all duration-200">
        {apps.map((app, index) => {
          const isOpen = openAppIds.includes(app.id);
          const isActive = activeAppId === app.id;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={app.id}
              className="relative flex flex-col items-center group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div
                  role="tooltip"
                  className="absolute -top-10 px-2.5 py-1 bg-[#1e1e24]/90 backdrop-blur-md text-white text-xs rounded-md shadow-lg pointer-events-none whitespace-nowrap border border-white/10 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  {app.name}
                </div>
              )}

              {/* Icon button (min 44px for touch targets) */}
              <button
                type="button"
                onClick={() => onAppClick(app.id)}
                aria-label={`Open ${app.name}`}
                className="w-12 h-12 min-w-[44px] min-h-[44px] flex items-center justify-center p-1 rounded-xl transition-transform duration-150 ease-out hover:scale-125 active:scale-95 focus:outline-none"
              >
                <img
                  src={app.icon}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-contain drop-shadow-md select-none pointer-events-none"
                />
              </button>

              {/* Running indicator dot */}
              <span
                className={`w-1 h-1 rounded-full transition-all duration-200 mt-0.5 ${
                  isOpen
                    ? isActive
                      ? 'bg-black w-1.5'
                      : 'bg-black/60'
                    : 'bg-transparent'
                }`}
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>
    </nav>
  );
};
