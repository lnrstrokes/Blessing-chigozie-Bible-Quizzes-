import React, { useState } from 'react';
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  SkipForward,
  SkipBack,
  Eye,
  EyeOff,
  Layers,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { AudioSettings, CompanionStep, CompanionScenario } from '../types';

interface CompanionProductionControlsProps {
  currentStep: CompanionStep;
  stepIndex: number;
  totalSteps: number;
  scenarioIndex: number;
  totalScenarios: number;
  currentScenario: CompanionScenario;
  isIntro: boolean;
  isPlaying: boolean;
  timeRemaining?: number;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onRestartScenario: () => void;
  onPrevScenario: () => void;
  onNextScenario: () => void;
  onGoToStep?: (step: CompanionStep) => void;
  onOpenCompanionModal: () => void;
  showControls: boolean;
  onToggleControls: () => void;
  audioSettings: AudioSettings;
  onUpdateAudio: (settings: Partial<AudioSettings>) => void;
}

const SCENE_NAMES: Record<CompanionStep, string> = {
  hook: 'Hook',
  choice: 'Choice',
  anticipation: 'Anticipation',
  scripture: 'Scripture',
  connection: 'Connection',
  reflection: 'Reflection',
  response: 'Response',
  prayer: 'Prayer',
  takeaway: 'Takeaway',
  nextHook: 'Next Preview',
};

const ALL_STEPS: CompanionStep[] = [
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
];

export const CompanionProductionControls: React.FC<CompanionProductionControlsProps> = ({
  currentStep,
  stepIndex,
  totalSteps,
  scenarioIndex,
  totalScenarios,
  currentScenario,
  isIntro,
  isPlaying,
  timeRemaining,
  onStart,
  onPause,
  onResume,
  onStop,
  onRestartScenario,
  onPrevScenario,
  onNextScenario,
  onGoToStep,
  onOpenCompanionModal,
  showControls,
  onToggleControls,
  audioSettings,
  onUpdateAudio,
}) => {
  const [showManualOverride, setShowManualOverride] = useState(false);

  if (!showControls) {
    return null;
  }

  return (
    <div
      id="companion-production-controls"
      className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 border border-slate-700/90 backdrop-blur-xl px-3 sm:px-5 py-2.5 sm:py-3 rounded-2xl shadow-2xl flex flex-col items-center gap-2 text-slate-200 max-w-[96vw]"
    >
      {/* High-Level Broadcast Control Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
        {/* Broadcast Status Pill */}
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-slate-950/70 border border-slate-800">
          <span
            className={`w-2 h-2 rounded-full ${
              isIntro
                ? 'bg-slate-500'
                : isPlaying
                ? 'bg-emerald-400 animate-pulse'
                : 'bg-amber-400'
            }`}
          />
          <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-300">
            {isIntro ? 'STANDBY' : isPlaying ? 'AUTO LIVE' : 'PAUSED'}
          </span>
        </div>

        {/* Current Topic & Scene Telemetry */}
        {!isIntro && (
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-slate-950/70 border border-slate-800 font-mono text-[11px] text-slate-300">
            <span className="text-amber-400 font-semibold truncate max-w-[110px] sm:max-w-[160px]">
              {currentScenario.situation}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-300">
              S{stepIndex + 1}: {SCENE_NAMES[currentStep]}
            </span>
            {timeRemaining !== undefined && (
              <>
                <span className="text-slate-600">|</span>
                <span className="text-amber-200 font-bold">{timeRemaining}s</span>
              </>
            )}
          </div>
        )}

        {/* PRIMARY HOST CONTROLS */}
        <div className="flex items-center space-x-1.5 pl-1 border-l border-slate-800">
          {isIntro ? (
            <button
              onClick={onStart}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-3.5 py-1.5 rounded-xl shadow-lg transition transform active:scale-95 text-xs font-cinzel"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>START BROADCAST</span>
            </button>
          ) : isPlaying ? (
            <button
              onClick={onPause}
              className="flex items-center space-x-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-semibold px-3 py-1.5 rounded-xl transition text-xs"
              title="Pause Automatic Progression"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>PAUSE</span>
            </button>
          ) : (
            <button
              onClick={onResume}
              className="flex items-center space-x-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-semibold px-3 py-1.5 rounded-xl transition text-xs"
              title="Resume Automatic Progression"
            >
              <Play className="w-3.5 h-3.5 fill-emerald-400" />
              <span>RESUME</span>
            </button>
          )}

          {!isIntro && (
            <button
              onClick={onStop}
              className="flex items-center space-x-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 font-medium px-2.5 py-1.5 rounded-xl transition text-xs"
              title="Stop Broadcast (Return to Standby)"
            >
              <Square className="w-3 h-3 fill-red-400" />
              <span>STOP</span>
            </button>
          )}

          <button
            onClick={onRestartScenario}
            className="flex items-center space-x-1 px-2.5 py-1.5 hover:bg-slate-800 rounded-xl text-slate-300 border border-slate-800 hover:border-slate-700 transition text-xs"
            title="Restart Situation from Scene 1"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>RESTART</span>
          </button>

          <button
            onClick={onNextScenario}
            className="flex items-center space-x-1.5 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-amber-300 font-semibold px-3 py-1.5 rounded-xl transition text-xs"
            title="Skip to Next Situation"
          >
            <span>NEXT SITUATION</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Secondary: Topic Library, Audio Mute, Hide */}
        <div className="flex items-center space-x-1 pl-1 border-l border-slate-800">
          <button
            onClick={onOpenCompanionModal}
            className="p-1.5 hover:bg-slate-800 rounded-xl text-amber-300 transition border border-transparent hover:border-slate-700"
            title="Browse All 15 Situations"
          >
            <Layers className="w-4 h-4" />
          </button>

          <button
            onClick={() => onUpdateAudio({ muted: !audioSettings.muted })}
            className={`p-1.5 rounded-xl transition ${
              audioSettings.muted
                ? 'text-red-400 bg-red-500/10'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
            title={audioSettings.muted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {audioSettings.muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {onGoToStep && (
            <button
              onClick={() => setShowManualOverride(!showManualOverride)}
              className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-200 transition text-[11px] flex items-center space-x-0.5"
              title="Manual Scene Override"
            >
              <span>Scenes</span>
              {showManualOverride ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}

          <button
            onClick={onToggleControls}
            className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-200 transition"
            title="Hide Host Controls"
          >
            <EyeOff className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Optional Collapsible Manual Scene Jump (Hidden by default for pure high-level broadcast) */}
      {showManualOverride && onGoToStep && !isIntro && (
        <div className="w-full pt-1 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-1 text-[11px] animate-fade-in">
          <span className="text-slate-500 text-[10px] uppercase font-mono mr-1">Jump to Scene:</span>
          {ALL_STEPS.map((s, idx) => (
            <button
              key={s}
              onClick={() => onGoToStep(s)}
              className={`px-2 py-0.5 rounded-md font-mono transition ${
                currentStep === s
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
              }`}
              title={`Scene ${idx + 1}: ${SCENE_NAMES[s]}`}
            >
              {idx + 1}. {SCENE_NAMES[s]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
