import React, { useRef, useEffect } from 'react';
import { Minus, Square, X } from 'lucide-react';
import { WindowInstance } from '../../types';

interface WindowChromeProps {
  window: WindowInstance;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  children: React.ReactNode;
  icon?: string;
  theme?: 'dark' | 'light';
  minWidth?: number;
  minHeight?: number;
}

export const WindowChrome: React.FC<WindowChromeProps> = ({
  window: win,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  children,
  icon,
  theme = 'light'
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Escape key closes window when active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isActive && e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, onClose]);

  // Handle Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (win.isMaximized) return;
    onFocus();
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - win.position.x,
      y: e.clientY - win.position.y
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDragging.current) return;
      const newX = Math.max(0, Math.min(window.innerWidth - 100, moveEvent.clientX - dragOffset.current.x));
      const newY = Math.max(28, Math.min(window.innerHeight - 100, moveEvent.clientY - dragOffset.current.y));
      win.position.x = newX;
      win.position.y = newY;
      if (windowRef.current) {
        windowRef.current.style.left = `${newX}px`;
        windowRef.current.style.top = `${newY}px`;
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  if (!win.isOpen || win.isMinimized) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <div
      ref={windowRef}
      role="dialog"
      aria-label={win.title}
      aria-modal="false"
      tabIndex={-1}
      onClick={onFocus}
      style={{
        zIndex: win.zIndex,
        left: win.isMaximized ? 0 : win.position.x,
        top: win.isMaximized ? 28 : win.position.y,
        width: win.isMaximized ? '100vw' : win.size.width,
        height: win.isMaximized ? 'calc(100vh - 28px - 80px)' : win.size.height
      }}
      className={`fixed rounded-xl overflow-hidden flex flex-col transition-shadow duration-200 ${
        isActive ? 'mac-window-shadow ring-1 ring-black/10' : 'mac-window-shadow-inactive opacity-95'
      } ${isDark ? 'bg-[#1e1e24] text-[#f5f5f7]' : 'bg-[#fafafa] text-[#1d1d1f]'}`}
    >
      {/* Window Header / Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
        className={`h-11 px-3 flex items-center justify-between border-b select-none cursor-default ${
          isDark
            ? 'bg-[#282830] border-black/40 text-[#dedee3]'
            : 'bg-[#ebebeb] border-[#d2d2d7] text-[#333336]'
        }`}
      >
        {/* Traffic Light Buttons */}
        <div className="flex items-center space-x-2 group">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close window"
            className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center text-[#4c0000] opacity-90 hover:opacity-100 transition-opacity focus:outline-none"
          >
            <X size={8} className="opacity-0 group-hover:opacity-100" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            aria-label="Minimize window"
            className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center text-[#5c3e00] opacity-90 hover:opacity-100 transition-opacity focus:outline-none"
          >
            <Minus size={8} className="opacity-0 group-hover:opacity-100" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            aria-label="Toggle maximize window"
            className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center text-[#004d00] opacity-90 hover:opacity-100 transition-opacity focus:outline-none"
          >
            <Square size={6} className="opacity-0 group-hover:opacity-100" />
          </button>
        </div>

        {/* Window Title */}
        <div className="flex items-center space-x-2 text-xs font-medium tracking-tight truncate max-w-[65%]">
          {icon && <img src={icon} alt="" className="w-4 h-4 object-contain" />}
          <span className="truncate">{win.title}</span>
        </div>

        {/* Spacer for symmetry */}
        <div className="w-12"></div>
      </div>

      {/* Window Body Content */}
      <div className="flex-1 overflow-auto relative">
        {children}
      </div>
    </div>
  );
};
