import React, { useEffect, useState } from 'react';
import { audioManager } from '../utils/audio';

interface CountdownTimerProps {
  durationSeconds: number; // e.g. 10
  isActive: boolean;
  onComplete: () => void;
  sfxVolume: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  durationSeconds,
  isActive,
  onComplete,
  sfxVolume,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(durationSeconds);

  useEffect(() => {
    setTimeLeft(durationSeconds);
  }, [durationSeconds]);

  useEffect(() => {
    if (!isActive) return;

    audioManager.setSfxVolume(sfxVolume);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        const nextVal = prev - 1;
        // Play tick sound (final 3 seconds get emphasis)
        const isFinal = nextVal <= 3;
        audioManager.playTick(isFinal);
        return nextVal;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, sfxVolume]);

  useEffect(() => {
    if (isActive && timeLeft === 0) {
      onComplete();
    }
  }, [timeLeft, isActive, onComplete]);

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / durationSeconds) * circumference;
  const isUrgent = timeLeft <= 3;

  return (
    <div className="flex items-center space-x-4 bg-slate-900/90 border border-slate-800 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl">
      <div className="relative w-14 h-14 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="28"
            cy="28"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            className="text-slate-800"
            fill="transparent"
          />
          <circle
            cx="28"
            cy="28"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            className={`transition-all duration-1000 ${isUrgent ? 'text-rose-500 animate-pulse' : 'text-amber-500'}`}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
          />
        </svg>
        <span className={`absolute font-mono text-xl font-bold ${isUrgent ? 'text-rose-400 scale-110 animate-bounce' : 'text-amber-300'}`}>
          {timeLeft}
        </span>
      </div>

      <div>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {isUrgent ? 'Final Seconds' : 'Time Remaining'}
        </div>
        <div className="text-sm font-bold text-slate-200">
          {timeLeft === 1 ? '1 Second Left' : `${timeLeft} Seconds`}
        </div>
      </div>
    </div>
  );
};
