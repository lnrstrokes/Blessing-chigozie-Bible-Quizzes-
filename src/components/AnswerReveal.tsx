import React, { useEffect } from 'react';
import { Question } from '../types';
import { audioManager } from '../utils/audio';
import { BookOpen, CheckCircle2 } from 'lucide-react';

interface AnswerRevealProps {
  question: Question;
  sfxVolume: number;
}

export const AnswerReveal: React.FC<AnswerRevealProps> = ({ question, sfxVolume }) => {
  useEffect(() => {
    audioManager.setSfxVolume(sfxVolume);
    audioManager.playCorrectReveal();
  }, [sfxVolume]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-amber-950/70 border border-emerald-500/40 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl animate-fade-in space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">Correct Answer</span>
          <h3 className="text-2xl md:text-3xl font-bold font-cinzel text-amber-200 tracking-wide">
            {question.answer}
          </h3>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
        <div className="flex items-center space-x-2 text-amber-300 font-semibold bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-xl">
          <BookOpen className="w-4 h-4" />
          <span>{question.reference}</span>
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Category: <span className="text-slate-300">{question.category}</span>
        </div>
      </div>

      {question.explanation && (
        <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl text-sm text-slate-300 leading-relaxed">
          <span className="font-semibold text-amber-300 mr-2">Insight:</span>
          {question.explanation}
        </div>
      )}
    </div>
  );
};
