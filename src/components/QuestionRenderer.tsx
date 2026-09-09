import React from 'react';
import { Question, PlaybackState } from '../types';

interface QuestionRendererProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  playbackState: PlaybackState;
  selectedOptionIndex?: number | null;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  currentIndex,
  totalQuestions,
  playbackState,
}) => {
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  const getDifficultyBadge = (diff: Question['difficulty']) => {
    switch (diff) {
      case 'easy':
        return { label: 'Easy', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
      case 'medium':
        return { label: 'Medium', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
      case 'hard':
        return { label: 'Hard', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
      case 'very_hard':
        return { label: 'Very Hard', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' };
      case 'expert':
        return { label: 'Expert', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
      default:
        return { label: 'Standard', color: 'bg-slate-500/20 text-slate-300 border-slate-500/30' };
    }
  };

  const badge = getDifficultyBadge(question.difficulty);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between text-xs md:text-sm font-semibold tracking-wider text-slate-400 uppercase">
        <div className="flex items-center space-x-3">
          <span className="text-amber-400 font-bold font-cinzel">{question.category}</span>
          <span className="text-slate-600">•</span>
          <span className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold ${badge.color}`}>
            {badge.label}
          </span>
        </div>
        <div className="font-mono text-amber-300">
          Question {currentIndex + 1} of {totalQuestions}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-amber-500/60" />

        <h2 className="text-2xl md:text-4xl font-bold text-slate-100 leading-snug tracking-tight mb-8 break-words">
          {question.question}
        </h2>

        {/* Answer Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            const isRevealed = playbackState === 'reveal';
            const isCorrect = idx === question.answerIndex;

            let cardStyle = 'bg-slate-800/60 border-slate-700/60 text-slate-200 hover:bg-slate-800';

            if (isRevealed) {
              if (isCorrect) {
                cardStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-100 shadow-lg shadow-emerald-900/40 ring-2 ring-emerald-500/50';
              } else {
                cardStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-50';
              }
            }

            return (
              <div
                key={idx}
                className={`flex items-center p-4 md:p-5 rounded-2xl border transition-all duration-300 ${cardStyle}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm mr-4 shrink-0 transition-colors ${isRevealed && isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700/60 text-amber-400'}`}>
                  {letter}
                </div>
                <span className="text-base md:text-lg font-medium leading-relaxed">
                  {option}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
