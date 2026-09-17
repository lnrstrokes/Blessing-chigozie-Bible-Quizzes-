import React from 'react';
import { Question, PlaybackState } from '../types';
import { audioManager } from '../utils/audio';

interface QuestionRendererProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  playbackState: PlaybackState;
  thinkingTime?: number;
  countdownTime?: number;
  onCountdownComplete?: () => void;
  sfxVolume?: number;
  cumulativeCount?: number;
  selectedAnswerIndex?: number | null;
  onSelectAnswer?: (index: number) => void;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  currentIndex,
  totalQuestions,
  playbackState,
  selectedAnswerIndex,
  onSelectAnswer,
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

  const handleOptionClick = (idx: number) => {
    // Unlock audio immediately on user tap gesture
    audioManager.unlock();
    if (playbackState === 'thinking' || playbackState === 'countdown') {
      audioManager.playSelectionClick();
      if (onSelectAnswer) {
        onSelectAnswer(idx);
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col space-y-2 sm:space-y-3">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP ~30%: QUESTION AREA
          ───────────────────────────────────────────────────────────── */}
      <div className="space-y-1.5 sm:space-y-2">
        {/* Persistent Creator Brand Header */}
        <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-2xl shadow-md">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-cinzel font-bold text-xs">
              ✝
            </div>
            <div>
              <h4 className="font-cinzel text-[10px] font-bold tracking-widest text-amber-300 uppercase">
                BLESSING CHIGOZIE
              </h4>
              <p className="text-[8px] text-slate-400 font-medium tracking-wide">BIBLE CHALLENGE</p>
            </div>
          </div>
          <div className="flex items-center space-x-2.5 text-xs text-slate-300 font-medium">
            <span className="hidden sm:inline font-cinzel text-amber-300">Blessing Chigozie</span>
            <span className="text-amber-400 font-bold font-mono bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-lg">
              Q{currentIndex + 1} / {totalQuestions}
            </span>
          </div>
        </div>

        {/* Top Meta Bar */}
        <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-slate-400 uppercase px-1">
          <div className="flex items-center space-x-2">
            <span className="text-amber-400 font-bold font-cinzel">{question.category}</span>
            <span className="text-slate-600">•</span>
            <span className={`px-2 py-0.5 rounded-full border text-[11px] font-semibold ${badge.color}`}>
              {badge.label}
            </span>
          </div>
          <div className="text-amber-300 font-medium text-xs">
            {playbackState === 'thinking' ? 'Prepare Your Answer' : 'Countdown Active'}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-800/80 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Text Card */}
        <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-xl p-3.5 sm:p-5 md:p-6 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-amber-500/80" />
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-slate-100 leading-snug tracking-tight break-words">
            {question.question}
          </h2>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MIDDLE AREA: ANSWER SAFE ZONE (COMPACT 2×2 GRID)
             Positioned in the UPPER-MIDDLE portion of the screen.
             Does NOT sit in the lower 40% of the screen.
             [ A ]   [ B ]
             [ C ]   [ D ]
          ───────────────────────────────────────────────────────────── */}
      <div className="w-full grid grid-cols-2 gap-2.5 sm:gap-3.5 md:gap-4">
        {question.options.map((option, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isRevealed = playbackState === 'reveal';
          const isCorrect = idx === question.answerIndex;
          const isSelected = selectedAnswerIndex === idx;

          let cardStyle = 'bg-slate-900/90 border-slate-700/80 text-slate-100 hover:border-amber-500/60 cursor-pointer active:scale-[0.99]';

          if (isSelected && !isRevealed) {
            cardStyle = 'bg-amber-950/40 border-amber-400 text-amber-100 ring-2 ring-amber-400/80 shadow-md';
          }

          if (isRevealed) {
            if (isCorrect) {
              cardStyle = 'bg-emerald-950/90 border-emerald-400 text-emerald-100 ring-2 ring-emerald-500/60 shadow-lg';
            } else if (isSelected) {
              cardStyle = 'bg-rose-950/40 border-rose-500/80 text-rose-200 ring-1 ring-rose-500/50';
            } else {
              cardStyle = 'bg-slate-950/40 border-slate-800/40 text-slate-500 opacity-40';
            }
          }

          return (
            <div
              key={idx}
              onClick={() => handleOptionClick(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOptionClick(idx);
                }
              }}
              className={`flex items-center p-2.5 sm:p-3.5 md:p-4 rounded-2xl border transition-all duration-200 shadow-md min-h-[48px] sm:min-h-[58px] ${cardStyle}`}
            >
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-cinzel font-bold text-xs sm:text-sm mr-2.5 sm:mr-3 shrink-0 shadow-inner transition-colors ${
                  isRevealed && isCorrect
                    ? 'bg-emerald-500 text-slate-950'
                    : isSelected && !isRevealed
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-slate-800 border border-amber-500/40 text-amber-300'
                }`}
              >
                {letter}
              </div>
              <span className="text-xs sm:text-sm md:text-base font-semibold leading-snug break-words flex-1">
                {option}
              </span>
              {isSelected && !isRevealed && (
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-full ml-2">
                  Selected
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. LOWER AREA: CHAT CTA
             Critical answers remain safely above this area.
          ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-center space-x-2 bg-slate-950/70 border border-slate-800/80 px-4 py-2 rounded-2xl text-amber-300 text-xs sm:text-sm font-semibold shadow-inner mx-auto">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <span>Tap an option or type A, B, C or D in chat to lock in your answer</span>
      </div>
    </div>
  );
};
