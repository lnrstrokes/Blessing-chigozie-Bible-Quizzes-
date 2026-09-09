import React, { useEffect } from 'react';
import { audioManager } from '../utils/audio';
import { Trophy } from 'lucide-react';

interface MilestoneScreenProps {
  questionNumber: number;
  totalQuestions: number;
  sfxVolume: number;
}

export const MilestoneScreen: React.FC<MilestoneScreenProps> = ({ questionNumber, totalQuestions, sfxVolume }) => {
  useEffect(() => {
    audioManager.setSfxVolume(sfxVolume);
    audioManager.playMilestone();
  }, [sfxVolume]);

  const percent = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-xl text-center px-6">
      <div className="w-20 h-20 rounded-3xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-6 shadow-2xl animate-bounce">
        <Trophy className="w-10 h-10" />
      </div>

      <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-2">Milestone Reached</span>
      <h2 className="font-cinzel text-4xl md:text-6xl font-black text-amber-100 tracking-wider mb-4">
        {questionNumber} QUESTIONS COMPLETE
      </h2>
      <p className="text-lg text-slate-300 max-w-md mx-auto mb-6">
        You are {percent}% through the Bible Challenge. Keep your score steady and stay focused!
      </p>

      <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-600 to-amber-400"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
