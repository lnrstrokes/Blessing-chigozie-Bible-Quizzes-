import React, { useEffect } from 'react';
import { audioManager } from '../utils/audio';
import { Award, RotateCcw, Sparkles } from 'lucide-react';
import { QuizDataset } from '../types';

interface FinalScreenProps {
  dataset: QuizDataset;
  onRestart: () => void;
  sfxVolume: number;
  viewerAnswers?: Record<number, number>;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({ dataset, onRestart, sfxVolume, viewerAnswers }) => {
  const onRestartRef = React.useRef(onRestart);
  useEffect(() => {
    onRestartRef.current = onRestart;
  }, [onRestart]);

  useEffect(() => {
    audioManager.setSfxVolume(sfxVolume);
    audioManager.playCompletion();

    // Automatically transition to next round after 10 seconds
    const timer = window.setTimeout(() => {
      if (onRestartRef.current) {
        onRestartRef.current();
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [sfxVolume]);

  const maxQ = dataset.questions.length;
  const scale = maxQ / 110;

  const answeredEntries = viewerAnswers ? Object.entries(viewerAnswers) : [];
  const answeredCount = answeredEntries.length;
  const correctCount = answeredEntries.filter(
    ([idxStr, ansIdx]) => dataset.questions[Number(idxStr)]?.answerIndex === ansIdx
  ).length;

  const categories = [
    { range: `${Math.round(90 * scale)}–${maxQ}`, title: 'BIBLE MASTER', desc: 'A profound scholar of the Word!' },
    { range: `${Math.round(70 * scale)}–${Math.round(89 * scale)}`, title: 'EXCELLENT', desc: 'Outstanding knowledge of scripture.' },
    { range: `${Math.round(50 * scale)}–${Math.round(69 * scale)}`, title: 'GOOD JOB', desc: 'Solid foundation in biblical facts.' },
    { range: `${Math.round(30 * scale)}–${Math.round(49 * scale)}`, title: 'KEEP STUDYING', desc: 'Room to grow in your scriptural studies.' },
    { range: `0–${Math.round(29 * scale)}`, title: 'TIME FOR ANOTHER ROUND', desc: 'Review the scriptures and try again!' },
  ];

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-between bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/60 overflow-y-auto py-8 px-6">
      {/* Persistent Brand Header */}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between bg-slate-900/80 border border-slate-800 px-5 py-2.5 rounded-2xl shadow-md">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-cinzel font-bold text-xs">
            ✝
          </div>
          <div>
            <h4 className="font-cinzel text-[11px] font-bold tracking-widest text-amber-300 uppercase">BLESSING CHIGOZIE</h4>
            <p className="text-[9px] text-slate-400 font-medium tracking-wide">BIBLE CHALLENGE</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next Round Starting in 10s</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-3xl w-full mx-auto text-center space-y-6 my-auto py-4">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto shadow-2xl animate-pulse">
          <Award className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="font-cinzel text-3xl md:text-5xl font-black text-amber-100 tracking-wider">
            QUIZ COMPLETE!
          </h1>
          {answeredCount > 0 ? (
            <div className="inline-flex items-center space-x-2 bg-emerald-500/15 border border-emerald-500/40 px-4 py-2 rounded-2xl text-emerald-300 font-bold font-mono text-sm sm:text-base">
              <span>Your Personal Score: {correctCount} / {answeredCount} Correct</span>
              <span className="text-xs bg-emerald-500/20 px-2 py-0.5 rounded-md">
                {Math.round((correctCount / answeredCount) * 100)}%
              </span>
            </div>
          ) : (
            <p className="text-base md:text-lg text-amber-200/80 font-medium font-cinzel">
              How did you score out of {maxQ} questions?
            </p>
          )}
        </div>

        {/* Score Categories Guide */}
        <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-xl p-5 rounded-3xl shadow-2xl space-y-2.5 text-left max-w-xl mx-auto">
          <h3 className="text-xs font-semibold tracking-widest text-amber-400 uppercase text-center mb-3">
            Your Score Guide (Calculate Your Total)
          </h3>
          <div className="space-y-2">
            {categories.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div>
                  <span className="font-bold text-amber-300 font-cinzel text-xs">{cat.title}</span>
                  <p className="text-[11px] text-slate-400">{cat.desc}</p>
                </div>
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {cat.range}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Round Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onRestart}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl shadow-xl transition text-xs transform hover:-translate-y-0.5"
          >
            <RotateCcw className="w-3.5 h-3.5 fill-slate-950" />
            <span>Start Next Round</span>
          </button>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="w-full max-w-4xl mx-auto text-center text-xs text-slate-400 py-2 border-t border-slate-800/80">
        Blessing Chigozie Bible Challenge — Scholarly Faith & Scripture Studies | © Blessing Chigozie
      </div>
    </div>
  );
};

