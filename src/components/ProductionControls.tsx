import React from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, FastForward, Eye, EyeOff } from 'lucide-react';
import { PlaybackState, AudioSettings } from '../types';

interface ProductionControlsProps {
  playbackState: PlaybackState;
  currentIndex: number;
  totalQuestions: number;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSkipIntro: () => void;
  showControls: boolean;
  onToggleControls: () => void;
  audioSettings: AudioSettings;
  onUpdateAudio: (settings: Partial<AudioSettings>) => void;
}

export const ProductionControls: React.FC<ProductionControlsProps> = ({
  playbackState,
  currentIndex,
  totalQuestions,
  onStart,
  onPause,
  onResume,
  onRestart,
  onPrev,
  onNext,
  onSkipIntro,
  showControls,
  onToggleControls,
  audioSettings,
  onUpdateAudio,
}) => {
  if (!showControls) {
    return (
      <button
        onClick={onToggleControls}
        className="fixed bottom-4 right-4 z-50 bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 p-2.5 rounded-full shadow-2xl backdrop-blur-md transition group"
        title="Show Production Controls"
      >
        <Eye className="w-5 h-5 text-amber-400 group-hover:scale-110 transition" />
      </button>
    );
  }

  const isPlaying = playbackState !== 'paused' && playbackState !== 'stopped' && playbackState !== 'intro' && playbackState !== 'outro';

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl flex flex-wrap items-center justify-center gap-4 text-slate-200">
      <div className="flex items-center space-x-2 border-r border-slate-700 pr-4">
        {playbackState === 'intro' || playbackState === 'stopped' ? (
          <button
            onClick={onStart}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl shadow-lg transition transform active:scale-95"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>START QUIZ</span>
          </button>
        ) : isPlaying ? (
          <button
            onClick={onPause}
            className="flex items-center space-x-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-semibold px-3 py-2 rounded-xl transition"
          >
            <Pause className="w-4 h-4" />
            <span>Pause</span>
          </button>
        ) : (
          <button
            onClick={onResume}
            className="flex items-center space-x-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-semibold px-3 py-2 rounded-xl transition"
          >
            <Play className="w-4 h-4" />
            <span>Resume</span>
          </button>
        )}

        <button
          onClick={onRestart}
          className="p-2 hover:bg-slate-800 rounded-xl text-slate-300 transition"
          title="Restart Quiz"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center space-x-2 border-r border-slate-700 pr-4">
        <button
          onClick={onPrev}
          disabled={currentIndex <= 0}
          className="p-2 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent rounded-xl text-slate-300 transition"
          title="Previous Question"
        >
          <SkipBack className="w-4 h-4" />
        </button>
        <span className="text-xs font-mono text-amber-300 font-semibold">
          Q {currentIndex + 1} / {totalQuestions}
        </span>
        <button
          onClick={onNext}
          disabled={currentIndex >= totalQuestions - 1}
          className="p-2 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent rounded-xl text-slate-300 transition"
          title="Next Question"
        >
          <SkipForward className="w-4 h-4" />
        </button>
        {playbackState === 'intro' && (
          <button
            onClick={onSkipIntro}
            className="flex items-center space-x-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded-lg text-slate-300 transition"
            title="Skip Intro Sequence"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Skip Intro</span>
          </button>
        )}
      </div>

      {/* Volume sliders */}
      <div className="hidden lg:flex items-center space-x-3 text-xs">
        <div className="flex items-center space-x-1.5">
          <span className="text-slate-400">SFX:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={audioSettings.sfxVolume}
            onChange={(e) => onUpdateAudio({ sfxVolume: parseFloat(e.target.value) })}
            className="w-16 accent-amber-500 cursor-pointer"
          />
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="text-slate-400">Music:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={audioSettings.musicVolume}
            onChange={(e) => onUpdateAudio({ musicVolume: parseFloat(e.target.value) })}
            className="w-16 accent-amber-500 cursor-pointer"
          />
        </div>
      </div>

      <button
        onClick={onToggleControls}
        className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-xs font-medium rounded-xl text-slate-300 transition ml-2"
        title="Hide Production Controls for Recording"
      >
        <EyeOff className="w-3.5 h-3.5 text-amber-400" />
        <span>Hide Panel</span>
      </button>
    </div>
  );
};
