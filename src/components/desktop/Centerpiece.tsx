import React, { useState, useEffect, useRef } from 'react';
import { PROFILE_DATA } from '../../data/profile';

const SCRAMBLE_CHARS = '!@#$%^&*()_+{}[]|:;"<>,.?/~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface ScrambleCharProps {
  char: string;
  index: number;
}

const ScrambleChar: React.FC<ScrambleCharProps> = ({ char, index }) => {
  const [displayChar, setDisplayChar] = useState<string>(char);
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const intervalRef = useRef<any>(null);
  const isSpace = char === ' ';

  const triggerScramble = (iterations: number = 7) => {
    if (isSpace) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    let count = 0;
    setIsScrambling(true);

    intervalRef.current = setInterval(() => {
      if (count >= iterations) {
        setDisplayChar(char);
        setIsScrambling(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        const rand = Math.floor(Math.random() * SCRAMBLE_CHARS.length);
        setDisplayChar(SCRAMBLE_CHARS[rand]);
        count++;
      }
    }, 35);
  };

  useEffect(() => {
    // Initial staggered scramble entrance animation
    const timer = setTimeout(() => {
      triggerScramble(12);
    }, 25 * index);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [char, index]);

  if (isSpace) {
    return <span className="inline-block w-3 md:w-5">&nbsp;</span>;
  }

  return (
    <span
      onMouseEnter={() => triggerScramble(8)}
      className={`inline-block select-none cursor-default transition-all duration-150 hover:scale-110 active:scale-95 ${
        isScrambling
          ? 'text-sky-400/80 font-mono font-medium drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]'
          : 'text-white font-sans font-extrabold drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]'
      }`}
    >
      {displayChar}
    </span>
  );
};

export const Centerpiece: React.FC = () => {
  const name = PROFILE_DATA.personal.name;
  const line1 = `Hi! I'm ${name}`;
  const line2 = 'Welcome to my portfolio';

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 px-4">
      <div className="pointer-events-auto cursor-default flex flex-col items-center justify-center select-none max-w-4xl mx-auto text-center transform -translate-y-4">
        {/* Line 1: Hi! I'm Dhiraj Shirse with Scramble Effect */}
        <div className="flex flex-wrap items-center justify-center text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none mb-3">
          {line1.split('').map((c, idx) => (
            <ScrambleChar key={`l1-${c}-${idx}`} char={c} index={idx} />
          ))}
        </div>

        {/* Line 2: Welcome to my portfolio with Scramble Effect */}
        <div className="flex flex-wrap items-center justify-center text-sm sm:text-xl md:text-2xl font-bold tracking-[0.08em] text-white/70">
          {line2.split('').map((c, idx) => (
            <ScrambleChar key={`l2-${c}-${idx}`} char={c} index={idx + line1.length} />
          ))}
        </div>

        {/* Subtitle Pills */}
        <div className="flex items-center space-x-2 mt-5 text-xs text-white/60 font-medium">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/15">
            Computer Engineering, VJTI
          </span>
          <span className="hidden sm:inline px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/15">
            macOS Desktop Edition
          </span>
        </div>
      </div>
    </div>
  );
};
