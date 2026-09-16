import React from 'react';
import { Play, Sparkles } from 'lucide-react';
import { QuizDataset } from '../types';

interface IntroScreenProps {
  dataset: QuizDataset;
  onStart: () => void;
  onSkipIntro?: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ dataset, onStart }) => {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 text-center px-4 sm:px-6 overflow-y-auto">
      {/* Decorative ambient lighting */}
      <div className="absolute w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 max-w-3xl mx-auto my-auto space-y-4 sm:space-y-6 md:space-y-7 py-4 sm:py-6">
        <div className="inline-flex items-center space-x-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] sm:text-xs font-semibold uppercase tracking-widest font-cinzel">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Blessing Chigozie Bible Challenge</span>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 drop-shadow-sm leading-tight sm:leading-tight">
            BIBLE CHALLENGE
          </h1>
          <h2 className="font-cinzel text-sm sm:text-lg md:text-xl text-amber-300 font-semibold tracking-wide leading-snug">
            {dataset.title}
          </h2>
          <p className="font-cinzel text-xs sm:text-sm md:text-base text-amber-200/80 font-medium tracking-wider uppercase">
            Can You Get 100%?
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-md p-4 sm:p-5 md:p-6 rounded-2xl max-w-xl mx-auto shadow-2xl space-y-2.5 sm:space-y-3">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{dataset.description}</p>
          <div className="pt-1 sm:pt-2 flex flex-wrap justify-center gap-2 sm:gap-4 text-xs font-semibold text-amber-400/90">
            <span className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
              {dataset.questions.length} Questions
            </span>
            <span className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
              Progressive Difficulty
            </span>
            <span className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
              Keep Your Score
            </span>
          </div>
        </div>

        <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-base sm:text-lg shadow-xl shadow-amber-500/20 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="w-5 h-5 fill-slate-950 group-hover:scale-110 transition" />
            <span>START THE CHALLENGE</span>
          </button>
        </div>

        <div className="space-y-1 pt-1 sm:pt-2">
          <p className="text-[11px] sm:text-xs text-amber-300/90 font-semibold tracking-wide">
            💬 Type A, B, C or D in the chat to lock in your answer before the timer elapses!
          </p>
          <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-wider">
            Faith-based Scripture Challenge | © Blessing Chigozie
          </p>
        </div>
      </div>
    </div>
  );
};
