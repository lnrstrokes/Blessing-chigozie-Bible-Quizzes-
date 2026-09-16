import React from 'react';
import { X, Check, HelpCircle, BookOpen, Sparkles } from 'lucide-react';
import { AppContentMode } from '../types';

interface ContentModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: AppContentMode;
  onSelectMode: (mode: AppContentMode) => void;
}

export const ContentModeModal: React.FC<ContentModeModalProps> = ({
  isOpen,
  onClose,
  currentMode,
  onSelectMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-cinzel text-lg sm:text-xl font-bold text-amber-100">
                Bible Livestream Content Selection
              </h2>
              <p className="text-xs text-amber-300/70">
                Choose Content Mode for Your Livestream
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modes list */}
        <div className="p-6 space-y-4">
          {/* Mode 1: Bible Quiz */}
          <div
            onClick={() => {
              onSelectMode('quiz');
              onClose();
            }}
            className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
              currentMode === 'quiz'
                ? 'bg-amber-500/15 border-amber-500/60 shadow-lg shadow-amber-500/10'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-cinzel font-bold text-lg shrink-0 mt-0.5">
                ✝
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-cinzel text-base font-bold text-amber-100">
                    BIBLE QUIZ
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-400 font-medium">
                    110 Questions
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The original Bible challenge with interactive thinking timers, 10-second countdowns, scripture answer reveals, milestone breaks, and score tracking.
                </p>
              </div>
            </div>

            {currentMode === 'quiz' && (
              <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
          </div>

          {/* Mode 2: Bible Verse Companion */}
          <div
            onClick={() => {
              onSelectMode('companion');
              onClose();
            }}
            className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
              currentMode === 'companion'
                ? 'bg-amber-500/15 border-amber-500/60 shadow-lg shadow-amber-500/10'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-cinzel text-base font-bold text-amber-100">
                    BIBLE VERSE COMPANION
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-400 font-medium">
                    12 Categories
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Scripture for life's situations. Cinematic 7-state devotional flow: Situation → Scripture → Understand → Reflect → Pray → Takeaway → Live Comment Prompt.
                </p>
              </div>
            </div>

            {currentMode === 'companion' && (
              <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 flex items-center justify-between bg-slate-900/90 text-xs text-slate-400">
          <span>You can switch content modes at any time.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
