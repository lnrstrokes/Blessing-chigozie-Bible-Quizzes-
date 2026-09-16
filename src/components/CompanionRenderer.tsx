import React, { useEffect } from 'react';
import {
  BookOpen,
  Sparkles,
  MessageCircle,
  Heart,
  Shield,
  Lightbulb,
  Compass,
  ArrowRight,
  Bookmark,
  CheckCircle2,
} from 'lucide-react';
import { CompanionScenario, CompanionStep } from '../types';
import { audioManager } from '../utils/audio';

interface CompanionRendererProps {
  scenario: CompanionScenario;
  step: CompanionStep;
  stepIndex: number;
  totalSteps: number;
  scenarioIndex: number;
  totalScenarios: number;
  timeRemaining?: number;
  stepDuration?: number;
  isPlaying?: boolean;
}

const SCENE_METADATA: Record<
  CompanionStep,
  { label: string; number: number; icon: React.FC<{ className?: string }> }
> = {
  hook: { label: 'THE SITUATION', number: 1, icon: Compass },
  choice: { label: 'YOUR NEED', number: 2, icon: MessageCircle },
  anticipation: { label: 'TURNING TO SCRIPTURE', number: 3, icon: Sparkles },
  scripture: { label: "GOD'S WORD", number: 4, icon: BookOpen },
  connection: { label: 'WHY THIS MATTERS', number: 5, icon: Lightbulb },
  reflection: { label: 'TAKE A MOMENT', number: 6, icon: Heart },
  response: { label: 'YOUR RESPONSE', number: 7, icon: MessageCircle },
  prayer: { label: 'PRAY', number: 8, icon: Shield },
  takeaway: { label: 'REMEMBER THIS', number: 9, icon: Bookmark },
  nextHook: { label: 'COMING UP NEXT', number: 10, icon: ArrowRight },
};

export const CompanionRenderer: React.FC<CompanionRendererProps> = ({
  scenario,
  step,
  stepIndex,
  totalSteps,
  scenarioIndex,
  totalScenarios,
  timeRemaining,
  stepDuration,
  isPlaying = true,
}) => {
  const currentSceneMeta = SCENE_METADATA[step] || SCENE_METADATA.hook;
  const SceneIcon = currentSceneMeta.icon;

  // Sound effects on scene entry
  useEffect(() => {
    if (step === 'hook') {
      audioManager.playHookEntrance();
    } else if (step === 'anticipation') {
      audioManager.playAnticipationCue();
    } else if (step === 'scripture') {
      audioManager.playScriptureReveal();
    } else if (step === 'response') {
      audioManager.playResponseLift();
    } else if (step === 'takeaway') {
      audioManager.playTakeawayCue();
    }
  }, [step, scenario.id]);

  // Choice countdown ticking in the final 5 seconds
  useEffect(() => {
    if (step === 'choice' && isPlaying && timeRemaining !== undefined && timeRemaining <= 5 && timeRemaining > 0) {
      audioManager.playRestrainedTick();
    }
  }, [step, isPlaying, timeRemaining]);

  // Elapsed time within current step for progressive revealing
  const effectiveDuration = stepDuration || 30;
  const effectiveRemaining = timeRemaining !== undefined ? timeRemaining : effectiveDuration;
  const elapsedSeconds = Math.max(0, effectiveDuration - effectiveRemaining);
  const progressPercent = Math.min(100, Math.max(0, (elapsedSeconds / effectiveDuration) * 100));

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-2 sm:space-y-3 my-auto animate-fade-in max-w-4xl px-3 sm:px-6 pb-12 sm:pb-16 md:pb-20">
      {/* Top Header: Category & Scene Info Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-cinzel font-semibold uppercase tracking-wider flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{scenario.categoryName}</span>
        </span>

        <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-300 font-medium tracking-wide flex items-center space-x-1.5">
          <SceneIcon className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-amber-300 font-semibold">{currentSceneMeta.label}</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">Scene {stepIndex + 1} of {totalSteps}</span>
        </span>

        <span className="px-2.5 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-slate-400 text-[11px] font-mono">
          Topic {scenarioIndex + 1}/{totalScenarios}
        </span>
      </div>

      {/* FIX 3: Prominent Centered Countdown Timer (50% larger, clearly bold, mobile-readable) */}
      {timeRemaining !== undefined && (
        <div className="flex flex-col items-center justify-center space-y-1.5 my-0.5">
          <div
            className={`px-4 sm:px-5 py-1 sm:py-1.5 rounded-full font-mono font-bold text-base sm:text-lg flex items-center space-x-2 border transition-colors shadow-lg ${
              timeRemaining <= 5
                ? 'bg-amber-500/25 border-amber-400 text-amber-200 animate-pulse scale-105'
                : 'bg-slate-900/90 border-amber-500/40 text-amber-300'
            }`}
          >
            <span className="text-xs uppercase tracking-wider font-sans font-semibold text-amber-400/90">
              Timer:
            </span>
            <span className="tracking-wider">{timeRemaining}s</span>
          </div>

          {/* FIX 3: Progress Indicator beneath timer (minimum 4px height, high visibility) */}
          <div className="w-44 sm:w-56 h-[4px] bg-slate-800/90 rounded-full overflow-hidden border border-slate-700/60">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-1000 ease-linear rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* 10-Scene Stepper Indicator Dots */}
      <div className="flex items-center justify-center space-x-1 sm:space-x-1.5 pt-0.5">
        {(
          [
            'hook',
            'choice',
            'anticipation',
            'scripture',
            'connection',
            'reflection',
            'response',
            'prayer',
            'takeaway',
            'nextHook',
          ] as CompanionStep[]
        ).map((s, idx) => {
          const isCompleted = idx < stepIndex;
          const isCurrent = idx === stepIndex;
          return (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isCurrent
                  ? 'w-6 sm:w-8 bg-amber-400 shadow-sm shadow-amber-400/50'
                  : isCompleted
                  ? 'w-2.5 sm:w-3.5 bg-amber-500/40'
                  : 'w-1.5 sm:w-2 bg-slate-800'
              }`}
              title={`Scene ${idx + 1}: ${SCENE_METADATA[s].label}`}
            />
          );
        })}
      </div>

      {/* Main Content Stage with Safe-Zone Borders & Atmosphere */}
      <div className="w-full bg-slate-900/85 border border-slate-800/90 backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden transition-all duration-300 min-h-[320px] sm:min-h-[360px] flex flex-col items-center justify-center text-center">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Scene Progress Line (at least 4px height) */}
        <div className="absolute top-0 left-0 right-0 h-[4px] bg-slate-800/60">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* ========================================================================= */}
        {/* SCENE 1 — HOOK */}
        {/* ========================================================================= */}
        {step === 'hook' && (
          <div className="space-y-3.5 sm:space-y-5 max-w-2xl animate-fade-in my-auto">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest font-cinzel">
              <Compass className="w-3.5 h-3.5" />
              <span>Life Situation</span>
            </div>

            <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 leading-tight">
              {scenario.situation}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-xl mx-auto">
              "{scenario.supportingStatement}"
            </p>

            <div className="pt-1 text-xs text-slate-400 uppercase tracking-widest flex items-center justify-center space-x-1.5">
              <span>Take a breath & reflect on this moment</span>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 2 — CHOICE */}
        {/* ========================================================================= */}
        {step === 'choice' && (
          <div className="w-full space-y-3 sm:space-y-4 max-w-2xl animate-fade-in my-auto">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest font-cinzel">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Live Viewer Participation</span>
              </div>
              <h3 className="font-cinzel text-lg sm:text-xl md:text-2xl font-bold text-slate-100">
                {scenario.choicePrompt.question}
              </h3>
            </div>

            {/* 4 Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 w-full text-left pt-1">
              {scenario.choicePrompt.options.map((opt, idx) => (
                <div
                  key={opt.key}
                  className="flex items-center py-2 px-3 sm:px-3.5 rounded-xl bg-gradient-to-r from-slate-800/90 to-slate-900/80 border border-amber-500/25 hover:border-amber-400/50 transition-all duration-200 shadow-md"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 font-cinzel font-bold flex items-center justify-center text-xs sm:text-sm mr-2.5 border border-amber-500/40 flex-shrink-0">
                    {opt.key}
                  </span>
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-slate-200 tracking-wide">
                    {opt.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Participation Banner & Anticipation Countdown */}
            <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-slate-950/60 p-2.5 sm:p-3 rounded-2xl border border-slate-800">
              <div className="flex items-center space-x-2 text-xs text-amber-400/90 font-medium">
                <MessageCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Type <strong className="text-amber-300">A, B, C or D</strong> in the live chat</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                  Turning to Scripture in:
                </span>
                <span
                  className={`w-7 h-7 rounded-lg border font-mono font-bold text-sm flex items-center justify-center transition-all ${
                    (timeRemaining ?? 20) <= 5
                      ? 'bg-amber-500/30 border-amber-400 text-amber-200 animate-pulse scale-110'
                      : 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  }`}
                >
                  {timeRemaining !== undefined ? timeRemaining : 20}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 3 — TRANSITION / ANTICIPATION */}
        {/* ========================================================================= */}
        {step === 'anticipation' && (
          <div className="space-y-3.5 sm:space-y-5 max-w-xl animate-fade-in my-auto">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto animate-pulse shadow-lg shadow-amber-500/10">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase font-cinzel">
                Moving From My Situation To God's Word
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-wide">
                {scenario.anticipationText || "LET'S SEE WHAT SCRIPTURE SAYS"}
              </h2>
            </div>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
              God's truth provides divine perspective and unchanging promises for what you are facing right now.
            </p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 4 — SCRIPTURE REVEAL */}
        {/* ========================================================================= */}
        {step === 'scripture' && (
          <div className="space-y-3.5 sm:space-y-5 max-w-3xl animate-fade-in my-auto">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-wider font-cinzel">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>SCRIPTURE • {scenario.primaryReference}</span>
            </div>

            <blockquote className="font-cinzel text-lg sm:text-xl md:text-2xl text-slate-100 font-semibold leading-relaxed tracking-wide sm:px-4 max-h-[36vh] overflow-y-auto">
              "{scenario.primaryText}"
            </blockquote>

            {scenario.keyPhraseEmphasis && (
              <div className="inline-block px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium tracking-wide">
                Key Anchor: <span className="font-semibold text-amber-200 font-cinzel">{scenario.keyPhraseEmphasis}</span>
              </div>
            )}

            {scenario.supportingReferences && scenario.supportingReferences.length > 0 && (
              <div className="pt-0.5 flex items-center justify-center flex-wrap gap-2 text-xs text-slate-400">
                <span className="text-slate-500">Related Scripture:</span>
                {scenario.supportingReferences.map(ref => (
                  <span
                    key={ref}
                    className="px-2.5 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 font-mono"
                  >
                    {ref}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 5 — CONNECTION (FIX 4: Progressive Revelation with Visible Inactive Items) */}
        {/* ========================================================================= */}
        {step === 'connection' && (
          <div className="space-y-3 sm:space-y-4 max-w-2xl animate-fade-in my-auto">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest font-cinzel">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>WHY DOES THIS MATTER?</span>
            </div>

            <h3 className="font-cinzel text-lg sm:text-xl md:text-2xl font-bold text-slate-100">
              Connecting God's Word to Your Reality
            </h3>

            <div className="space-y-2.5 sm:space-y-3 text-left w-full pt-1">
              {scenario.connectionPoints.map((point, idx) => {
                // Progressive disclosure threshold:
                // Point 1: 0s, Point 2: 7s, Point 3: 15s
                const threshold = idx === 0 ? 0 : idx === 1 ? 7 : 15;
                const isRevealed = timeRemaining === undefined || elapsedSeconds >= threshold;

                return (
                  <div
                    key={idx}
                    className={`flex items-start p-3 sm:p-3.5 rounded-2xl border space-x-3 transition-all duration-700 ${
                      isRevealed
                        ? 'opacity-100 bg-slate-800/90 border-amber-500/40 text-slate-100 shadow-md'
                        : 'opacity-60 bg-slate-900/45 border-slate-800/80 text-[#A0A0A0]'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 border transition-colors ${
                        isRevealed
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                          : 'bg-slate-800/80 border-slate-700/60 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <p
                      className={`text-sm sm:text-base leading-relaxed font-normal transition-colors ${
                        isRevealed ? 'text-slate-200' : 'text-[#A0A0A0]'
                      }`}
                    >
                      {point}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 6 — REFLECTION */}
        {/* ========================================================================= */}
        {step === 'reflection' && (
          <div className="space-y-3.5 sm:space-y-5 max-w-2xl animate-fade-in my-auto">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest font-cinzel">
              <Heart className="w-3.5 h-3.5" />
              <span>TAKE A MOMENT</span>
            </div>

            <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-amber-200 leading-snug tracking-wide max-w-xl mx-auto">
              "{scenario.reflectionQuestion}"
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
              Allow the Holy Spirit to search your heart. Quiet your thoughts and consider what God is saying to you right now.
            </p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 7 — RESPONSE (FIX 1: Safe-Zone Prompt & FIX 2: Interactive Vertical Layout) */}
        {/* ========================================================================= */}
        {step === 'response' && (
          <div className="w-full space-y-2.5 sm:space-y-3.5 max-w-2xl animate-fade-in my-auto">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest font-cinzel">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>FAITH IN ACTION</span>
              </div>
              <h3 className="font-cinzel text-lg sm:text-xl md:text-2xl font-bold text-slate-100">
                {scenario.responsePrompt.question}
              </h3>
            </div>

            {/* FIX 2: 4 Response Options — STRICTLY VERTICAL A/B/C/D ARRANGEMENT WITH CLEAR INTERACTIVE AFFORDANCE */}
            <div className="flex flex-col space-y-2 sm:space-y-2.5 w-full text-left pt-0.5">
              {scenario.responsePrompt.options.map((opt, idx) => (
                <div
                  key={opt.key}
                  className="flex items-center py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-slate-800/90 to-slate-900/85 border border-amber-500/30 hover:border-amber-400/60 transition-all duration-200 shadow-md group"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-amber-500/20 text-amber-300 font-cinzel font-bold flex items-center justify-center text-xs sm:text-sm mr-3 border border-amber-500/40 flex-shrink-0 group-hover:bg-amber-500/30 transition-colors">
                    {opt.key}
                  </span>
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-slate-100 tracking-wide">
                    {opt.label}
                  </span>
                </div>
              ))}
            </div>

            {/* FIX 1: Live Comment Prompt — Positioned safely at ~70-75% viewport height, well above bottom danger zone */}
            <div className="pt-1 flex items-center justify-center space-x-2 text-xs sm:text-sm text-amber-300 font-semibold bg-amber-500/10 py-2 px-4 rounded-xl border border-amber-500/30 shadow-sm mt-1">
              <MessageCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Choose <strong className="text-amber-200 font-bold underline decoration-amber-400/60">A, B, C or D</strong> in the comments</span>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 8 — PRAYER */}
        {/* ========================================================================= */}
        {step === 'prayer' && (
          <div className="space-y-3.5 sm:space-y-5 max-w-2xl animate-fade-in my-auto">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest font-cinzel">
              <Shield className="w-3.5 h-3.5" />
              <span>PRAY</span>
            </div>

            <blockquote className="font-cinzel text-sm sm:text-base md:text-lg text-slate-100 font-medium leading-relaxed italic border-l-2 border-amber-400/60 pl-4 sm:pl-6 text-left my-1.5 bg-slate-950/40 p-3 sm:p-4 rounded-r-2xl max-h-[36vh] overflow-y-auto">
              "{scenario.prayer}"
            </blockquote>

            <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider font-semibold">
              Type <span className="text-amber-300 font-bold">"Amen"</span> in the chat in agreement
            </p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 9 — TAKEAWAY */}
        {/* ========================================================================= */}
        {step === 'takeaway' && (
          <div className="space-y-3.5 sm:space-y-5 max-w-2xl animate-fade-in my-auto">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest font-cinzel">
              <Bookmark className="w-3.5 h-3.5" />
              <span>REMEMBER THIS</span>
            </div>

            <div className="p-4 sm:p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-center shadow-lg">
              <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-extrabold text-amber-200 leading-snug">
                "{scenario.takeaway}"
              </h2>
            </div>

            <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-slate-400">
              <Bookmark className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Save this verse & carry this truth into your day</span>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCENE 10 — NEXT HOOK */}
        {/* ========================================================================= */}
        {step === 'nextHook' && (
          <div className="space-y-3.5 sm:space-y-5 max-w-xl animate-fade-in my-auto">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest font-cinzel">
              <ArrowRight className="w-3.5 h-3.5" />
              <span>COMING UP NEXT</span>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">
                Next Life Situation
              </span>
              <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500">
                {scenario.nextSituationPreview || 'WHEN YOU FACE THE UNKNOWN'}
              </h2>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
              Stay tuned as we turn to God's Word for our next live biblical anchor.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
