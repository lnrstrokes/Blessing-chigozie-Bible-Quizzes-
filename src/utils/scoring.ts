import { Question } from '../types';

export interface RatingTier {
  range: string;
  minCorrect: number;
  maxCorrect: number;
  title: string;
  subtitle: string;
  badgeColor: string;
}

export const MILESTONE_RATING_TIERS: RatingTier[] = [
  {
    range: '9–10 CORRECT',
    minCorrect: 9,
    maxCorrect: 10,
    title: 'EXCELLENT',
    subtitle: 'Strong Bible Knowledge',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
  {
    range: '7–8 CORRECT',
    minCorrect: 7,
    maxCorrect: 8,
    title: 'VERY GOOD',
    subtitle: 'Keep Sharpening Your Knowledge',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  {
    range: '5–6 CORRECT',
    minCorrect: 5,
    maxCorrect: 6,
    title: 'GOOD',
    subtitle: 'There Is More to Discover',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
  },
  {
    range: '0–4 CORRECT',
    minCorrect: 0,
    maxCorrect: 4,
    title: 'KEEP LEARNING',
    subtitle: 'Stay With the Challenge',
    badgeColor: 'bg-slate-700/40 text-slate-300 border-slate-600/50',
  },
];

export interface MilestoneEvaluationResult {
  hasPersonalScore: boolean;
  score?: number;
  ratingTier?: RatingTier;
  tiers: RatingTier[];
}

/**
 * Future-Ready Answer Evaluation Architecture:
 * - If viewerAnswer exists: compares with authoritative correctAnswer in question data,
 *   increments user's score, and resolves their rating tier.
 * - If viewerAnswer does not exist (e.g. YouTube Live broadcast where answers are typed in chat):
 *   does not calculate an individual score or generate false claims, and instead returns the
 *   self-assessment guide for the viewer to evaluate their own score against the revealed answers.
 */
export function evaluateMilestoneScore(
  questions: Question[],
  viewerAnswers?: Record<number, number>
): MilestoneEvaluationResult {
  if (!viewerAnswers || Object.keys(viewerAnswers).length === 0) {
    return {
      hasPersonalScore: false,
      tiers: MILESTONE_RATING_TIERS,
    };
  }

  let correctCount = 0;
  for (const q of questions) {
    const viewerAnswer = viewerAnswers[q.id];
    // Authoritative check against question's answerIndex
    if (viewerAnswer !== undefined && viewerAnswer === q.answerIndex) {
      correctCount++;
    }
  }

  // Map to the appropriate rating tier based on 10-question milestone chunk
  const normalizedChunkScore = correctCount % 10 === 0 && correctCount > 0 ? 10 : correctCount % 10;
  const ratingTier =
    MILESTONE_RATING_TIERS.find(
      (tier) => normalizedChunkScore >= tier.minCorrect && normalizedChunkScore <= tier.maxCorrect
    ) || MILESTONE_RATING_TIERS[MILESTONE_RATING_TIERS.length - 1];

  return {
    hasPersonalScore: true,
    score: correctCount,
    ratingTier,
    tiers: MILESTONE_RATING_TIERS,
  };
}
