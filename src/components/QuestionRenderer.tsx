import React from 'react';
import { Question, PlaybackState } from '../types';
import { CountdownTimer } from './CountdownTimer';

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
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  currentIndex,
  totalQuestions,
  playbackState,
  countdownTime = 10,
  onCountdownComplete = () => {},
  sfxVolume = 0.7,
  cumulativeCount,
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
    <div className="w-full max-w-5xl mx-auto space-y-2 md:space-y-3">
      {/* Persistent Creator Brand Header */}
      <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-2xl shadow-md">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-cinzel font-bold text-xs">
            ✝
          </div>
          <div>
            <h4 className="font-cinzel text-[10px] font-bold tracking-widest text-amber-300 uppercase">BLESSING CHIGOZIE</h4>
            <p className="text-[8px] text-slate-400 font-medium tracking-wide">BIBLE CHALLENGE</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-xs text-slate-300 font-medium">
          <span className="hidden sm:inline font-cinzel text-amber-300">Blessing Chigozie</span>
          <span className="text-amber-400 font-bold font-mono">
            Q{currentIndex + 1} / {totalQuestions}
          </span>
        </div>
      </div>

      {/* Top Meta Bar */}
      <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-slate-400 uppercase">
        <div className="flex items-center space-x-2.5">
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

      {/* Question Card */}
      <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden space-y-3">
        <div className="absolute top-0 left-0 w-2 h-full bg-amber-500/80" />

        {/* Top Row inside card: Chat CTA + Countdown Timer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-2xl">
          <div className="flex items-center space-x-2 text-amber-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>💬 Lock in your answer — Type A, B, C or D in the chat!</span>
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-auto">
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              {playbackState === 'thinking' ? 'Thinking Time:' : 'Countdown:'}
            </span>
            <div className="scale-90 origin-right sm:origin-center">
              {playbackState === 'countdown' ? (
                <CountdownTimer
                  durationSeconds={countdownTime}
                  isActive={true}
                  onComplete={onCountdownComplete}
                  sfxVolume={sfxVolume}
                />
              ) : (
                <div className="flex items-center space-x-2 bg-slate-900/90 border border-slate-800 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-mono text-sm font-bold animate-pulse">
                    15
                  </div>
                  <span className="text-xs font-semibold text-amber-300">Read & Prepare</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-100 leading-snug tracking-tight break-words">
          {question.question}
        </h2>

        {/* Answer Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {question.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isRevealed = playbackState === 'reveal';
            const isCorrect = idx === question.answerIndex;

            let cardStyle = 'bg-slate-800/50 border-slate-700/60 text-slate-200 hover:bg-slate-800';

            if (isRevealed) {
              if (isCorrect) {
                cardStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 shadow-lg ring-2 ring-emerald-500/50';
              } else {
                cardStyle = 'bg-slate-900/40 border-slate-800/50 text-slate-500 opacity-50';
              }
            }

            return (
              <div
                key={idx}
                className={`flex items-center p-3 md:p-3.5 rounded-2xl border transition-all duration-300 ${cardStyle}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs mr-3 shrink-0 transition-colors ${isRevealed && isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700/60 text-amber-400'}`}>
                  {letter}
                </div>
                <span className="text-xs sm:text-sm md:text-base font-medium leading-relaxed">
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

