import React, { useEffect } from 'react';
import { audioManager } from '../utils/audio';
import { Award, RotateCcw, Youtube } from 'lucide-react';
import { QuizDataset } from '../types';

interface FinalScreenProps {
  dataset: QuizDataset;
  onRestart: () => void;
  sfxVolume: number;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({ dataset, onRestart, sfxVolume }) => {
  useEffect(() => {
    audioManager.setSfxVolume(sfxVolume);
    audioManager.playCompletion();
  }, [sfxVolume]);

  const maxQ = dataset.questions.length;
  // Scale score categories proportionally if dataset has fewer than 110 questions
  const scale = maxQ / 110;

  const categories = [
    { range: `${Math.round(90 * scale)}–${maxQ}`, title: 'BIBLE MASTER', desc: 'A profound scholar of the Word!' },
    { range: `${Math.round(70 * scale)}–${Math.round(89 * scale)}`, title: 'EXCELLENT', desc: 'Outstanding knowledge of scripture.' },
    { range: `${Math.round(50 * scale)}–${Math.round(69 * scale)}`, title: 'GOOD JOB', desc: 'Solid foundation in biblical facts.' },
    { range: `${Math.round(30 * scale)}–${Math.round(49 * scale)}`, title: 'KEEP STUDYING', desc: 'Room to grow in your scriptural studies.' },
    { range: `0–${Math.round(29 * scale)}`, title: 'TIME FOR ANOTHER ROUND', desc: 'Review the scriptures and try again!' },
  ];

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/60 overflow-y-auto py-12 px-6">
      <div className="max-w-3xl w-full mx-auto text-center space-y-8 my-auto">
        <div className="w-20 h-20 rounded-3xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto shadow-2xl animate-pulse">
          <Award className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <h1 className="font-cinzel text-4xl md:text-6xl font-black text-amber-100 tracking-wider">
            QUIZ COMPLETE!
          </h1>
          <p className="text-xl text-amber-200/80 font-medium font-cinzel">
            How did you score out of {maxQ} questions?
          </p>
        </div>

        {/* Score Categories Guide */}
        <div className="bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-6 rounded-3xl shadow-2xl space-y-3 text-left max-w-xl mx-auto">
          <h3 className="text-xs font-semibold tracking-widest text-amber-400 uppercase text-center mb-4">
            Your Score Guide (Calculate Your Total)
          </h3>
          <div className="space-y-2">
            {categories.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div>
                  <span className="font-bold text-amber-300 font-cinzel text-sm">{cat.title}</span>
                  <p className="text-xs text-slate-400">{cat.desc}</p>
                </div>
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {cat.range}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <div className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm font-semibold">
            <Youtube className="w-5 h-5 text-rose-400" />
            <span>Subscribe for More Bible Challenges</span>
          </div>

          <button
            onClick={onRestart}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-6 py-3 rounded-2xl shadow-xl transition"
          >
            <RotateCcw className="w-4 h-4 fill-slate-950" />
            <span>Restart Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );
};
