import React, { useState, useEffect } from 'react';

interface MacBootScreenProps {
  onComplete?: () => void;
}

export const MacBootScreen: React.FC<MacBootScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    // Progressive boot loading sequence
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsFading(true), 300);
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) onComplete();
          }, 1000);
          return 100;
        }
        // Organic step increments
        const increment = Math.floor(Math.random() * 18) + 8;
        return Math.min(100, prev + increment);
      });
    }, 180);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      role="status"
      aria-label="macOS Booting"
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Apple Logo */}
      <img
        src="/apple-logo.svg"
        alt="Apple"
        className="w-18 h-18 object-contain brightness-0 invert opacity-90 drop-shadow-md select-none pointer-events-none animate-in fade-in zoom-in-95 duration-500"
      />

      {/* macOS Boot Progress Bar */}
      <div className="w-56 h-[4px] bg-[#333336] rounded-full overflow-hidden mt-10 shadow-inner">
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-white rounded-full transition-all duration-200 ease-out"
        />
      </div>
    </div>
  );
};
