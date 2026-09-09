import React, { useEffect } from 'react';
import { Question } from '../types';
import { audioManager } from '../utils/audio';
import { BookOpen, CheckCircle2, Youtube, Sparkles } from 'lucide-react';

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
    <div className="w-full max-w-5xl mx-auto bg-slate-900/95 border border-emerald-500/50 backdrop-blur-2xl p-6 md:p-8 rounded-3xl shadow-2xl animate-fade-in space-y-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-emerald-400 to-teal-500" />
      
      {/* Brand Header */}
      <div className="flex items-center justify-between border-b border-slate-800/90 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 font-cinzel font-bold text-base shadow-lg">
            ✝
          </div>
          <div>
            <h4 className="font-cinzel text-xs md:text-sm font-bold tracking-widest text-amber-300 uppercase">BLESSING CHIGOZIE</h4>
            <p className="text-[10px] text-slate-400 font-medium tracking-wider">BIBLE CHALLENGE</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-emerald-500/15 border border-emerald-500/40 px-3.5 py-1.5 rounded-full text-emerald-300 text-xs font-bold tracking-wide">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>CORRECT ANSWER REVEALED</span>
        </div>
      </div>

      {/* Main Answer Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-gradient-to-r from-emerald-950/60 via-slate-900/80 to-slate-900/80 border border-emerald-500/40 p-5 md:p-6 rounded-2xl shadow-inner">
        <div className="md:col-span-3 flex flex-col items-center justify-center bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-center">
          <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold mb-1">Option</span>
          <div className="w-12 h-12 rounded-xl bg-emerald-500 text-slate-950 font-bold font-cinzel text-2xl flex items-center justify-center shadow-lg">
            {correctLetter}
          </div>
        </div>

        <div className="md:col-span-9 space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 text-xs text-amber-400/90 font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Scripture Answer</span>
          </div>
          <h3 className="text-3xl md:text-5xl font-bold font-cinzel text-amber-100 tracking-wide">
            {question.answer}
          </h3>
          <p className="text-xs md:text-sm text-slate-400 italic line-clamp-1 pt-1">
            "{question.question}"
          </p>
        </div>
      </div>

      {/* Reference & Insight Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex items-center space-x-3 text-amber-300 font-semibold bg-amber-500/10 border border-amber-500/30 px-4 py-3 rounded-xl text-sm">
          <BookOpen className="w-5 h-5 shrink-0 text-amber-400" />
          <div>
            <span className="text-[10px] text-amber-400/80 uppercase block tracking-wider">Scripture Reference</span>
            <span className="truncate font-cinzel text-base">{question.reference}</span>
          </div>
        </div>
        
        <div className="md:col-span-2 bg-slate-950/70 border border-slate-800/90 p-3.5 rounded-xl text-xs md:text-sm text-slate-300 leading-relaxed flex items-center">
          <div>
            <strong className="text-amber-300 font-cinzel tracking-wide mr-1.5">Biblical Insight:</strong>
            {question.explanation || `This truth is grounded in ${question.category} principles found throughout scripture.`}
          </div>
        </div>
      </div>

      {/* Footer Subscription CTA */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-medium px-1">
        <div className="flex items-center space-x-2">
          <Youtube className="w-4 h-4 text-rose-500 shrink-0" />
          <span>More Bible quizzes & faith-based content — <strong className="text-amber-300 font-semibold">Subscribe for more</strong></span>
        </div>
        <div className="hidden sm:block font-mono text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-md">
          +1 Point Awarded
        </div>
      </div>
    </div>
  );
};

