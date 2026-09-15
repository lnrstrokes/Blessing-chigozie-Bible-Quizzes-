import React, { useEffect } from 'react';
import { Question } from '../types';
import { audioManager } from '../utils/audio';
import { BookOpen, CheckCircle2, Sparkles } from 'lucide-react';

interface AnswerRevealProps {
  question: Question;
  sfxVolume: number;
}

export const AnswerReveal: React.FC<AnswerRevealProps> = ({ question, sfxVolume }) => {
  useEffect(() => {
    audioManager.setSfxVolume(sfxVolume);
    audioManager.playCorrectReveal();
  }, [sfxVolume]);

  const correctIndex = question.answerIndex;
  const correctLetter = String.fromCharCode(65 + correctIndex); // A, B, C, D

  return (
    <div className="w-full max-w-5xl mx-auto bg-slate-900/95 border border-emerald-500/50 backdrop-blur-2xl p-4 sm:p-6 md:p-7 rounded-3xl shadow-2xl animate-fade-in space-y-3 sm:space-y-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-emerald-400 to-teal-500" />
      
      {/* Brand Header */}
      <div className="flex items-center justify-between border-b border-slate-800/90 pb-2.5">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 font-cinzel font-bold text-sm shadow-lg">
            ✝
          </div>
          <div>
            <h4 className="font-cinzel text-[11px] font-bold tracking-widest text-amber-300 uppercase">BLESSING CHIGOZIE</h4>
            <p className="text-[9px] text-slate-400 font-medium tracking-wider">BIBLE CHALLENGE</p>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 bg-emerald-500/15 border border-emerald-500/40 px-3 py-1 rounded-full text-emerald-300 text-xs font-bold tracking-wide">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>CORRECT ANSWER REVEALED</span>
        </div>
      </div>

      {/* Main Answer Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gradient-to-r from-emerald-950/60 via-slate-900/80 to-slate-900/80 border border-emerald-500/40 p-4 md:p-5 rounded-2xl shadow-inner">
        <div className="md:col-span-3 flex flex-col items-center justify-center bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-center">
          <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-semibold mb-0.5">Option</span>
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 font-bold font-cinzel text-xl flex items-center justify-center shadow-lg">
            {correctLetter}
          </div>
        </div>

        <div className="md:col-span-9 space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-1.5 text-[11px] text-amber-400/90 font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Verified Scripture Answer</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-cinzel text-amber-100 tracking-wide">
            {question.answer}
          </h3>
          <p className="text-xs text-slate-400 italic line-clamp-1 pt-0.5">
            "{question.question}"
          </p>
        </div>
      </div>

      {/* Reference & Insight Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        <div className="flex items-center space-x-2.5 text-amber-300 font-semibold bg-amber-500/10 border border-amber-500/30 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm">
          <BookOpen className="w-4 h-4 shrink-0 text-amber-400" />
          <div>
            <span className="text-[9px] text-amber-400/80 uppercase block tracking-wider">Scripture Reference</span>
            <span className="truncate font-cinzel text-sm">{question.reference}</span>
          </div>
        </div>
        
        <div className="md:col-span-2 bg-slate-950/70 border border-slate-800/90 p-3 rounded-xl text-xs sm:text-sm text-slate-300 leading-relaxed flex items-center">
          <div>
            <strong className="text-amber-300 font-cinzel tracking-wide mr-1.5">Biblical Insight:</strong>
            {question.explanation || `This truth is grounded in ${question.category} principles found throughout scripture.`}
          </div>
        </div>
      </div>

      {/* Footer Creator Branding */}
      <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-medium px-1">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-cinzel text-amber-300/90 font-semibold tracking-wide">Blessing Chigozie Bible Challenge</span>
        </div>
        <div className="hidden sm:block font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-md">
          +1 Point Awarded
        </div>
      </div>
    </div>
  );
};

