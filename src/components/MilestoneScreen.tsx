import React, { useEffect } from 'react';
import { audioManager } from '../utils/audio';
import { Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MILESTONE_RATING_TIERS, evaluateMilestoneScore } from '../utils/scoring';
import { Question } from '../types';

interface MilestoneScreenProps {
  questionNumber: number;
  totalQuestions: number;
  sfxVolume: number;
  onContinue?: () => void;
  viewerAnswers?: Record<number, number>;
  questions?: Question[];
}

export const MilestoneScreen: React.FC<MilestoneScreenProps> = ({
  questionNumber,
  totalQuestions,
  sfxVolume,
  onContinue,
  viewerAnswers,
  questions = [],
}) => {
  useEffect(() => {
    audioManager.setSfxVolume(sfxVolume);
    audioManager.playMilestone();
  }, [sfxVolume]);

  // Evaluate answers if viewer answers were directly captured; otherwise return self-assessment guide
  const evaluation = evaluateMilestoneScore(questions, viewerAnswers);

  const percentComplete = Math.min(100, Math.round((questionNumber / totalQuestions) * 100));

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-between bg-slate-950/95 backdrop-blur-2xl text-center px-4 sm:px-6 py-6 sm:py-8 overflow-y-auto animate-fade-in">
      {/* Brand & Progress Header */}
      <div className="w-full max-w-2xl flex items-center justify-between bg-slate-900/80 border border-slate-800 px-4 py-2.5 rounded-2xl shadow-md">
        <div className="flex items-center space-x-2 text-left">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-cinzel font-bold text-xs">
            ✝
          </div>
          <div>
            <div className="font-cinzel text-[10px] font-bold tracking-widest text-amber-300 uppercase">
              BLESSING CHIGOZIE
            </div>
            <div className="text-[9px] text-slate-400 font-medium">BIBLE CHALLENGE</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-semibold text-slate-300">
            {questionNumber} of {totalQuestions} Completed
          </span>
          <span className="text-[11px] font-bold text-amber-400">({percentComplete}%)</span>
        </div>
      </div>

      {/* Main Checkpoint Content */}
      <div className="w-full max-w-2xl flex flex-col items-center my-auto py-4 space-y-4 sm:space-y-5">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-2xl">
          <Trophy className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>

        <div className="space-y-1 sm:space-y-1.5">
          <span className="inline-block text-xs font-semibold tracking-widest text-amber-400 uppercase">
            QUIZ MILESTONE
          </span>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-slate-100 tracking-tight">
            How Did You Do?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Count the answers you got right from the answers revealed so far.
          </p>
        </div>

        {/* Rating Guide Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-left">
          {evaluation.tiers.map((tier) => {
            const isPersonalMatch =
              evaluation.hasPersonalScore && evaluation.ratingTier?.range === tier.range;

            return (
              <div
                key={tier.range}
                className={`p-3.5 sm:p-4 rounded-2xl border transition ${
                  isPersonalMatch
                    ? 'bg-amber-500/15 border-amber-500/60 ring-2 ring-amber-500/40'
                    : 'bg-slate-900/80 border-slate-800/90 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-amber-300 tracking-wider">
                    {tier.range}
                  </span>
                  {isPersonalMatch && (
                    <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Your Tier</span>
                    </span>
                  )}
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-100 mb-0.5">
                  {tier.title}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  {tier.subtitle}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Primary CTA */}
      <div className="w-full max-w-md pt-2">
        <button
          onClick={onContinue}
          className="w-full py-3 sm:py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-[0.99] text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-amber-500/20 transition flex items-center justify-center space-x-2"
        >
          <span>CONTINUE THE BIBLE CHALLENGE</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>
    </div>
  );
};
