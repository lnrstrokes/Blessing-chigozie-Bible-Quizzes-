import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  FileText,
  PlayCircle,
  BookOpen,
  Layers,
  Sparkles,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
  Square,
  Sliders,
} from 'lucide-react';
import { AudioSettings, QuizDataset, PlaybackState, AppContentMode, CompanionScenario } from '../types';

interface HeaderControlsProps {
  dataset: QuizDataset;
  audioSettings: AudioSettings;
  onUpdateAudio: (settings: Partial<AudioSettings>) => void;
  onOpenDatasetModal: () => void;
  onOpenPreviewPanel: () => void;
  showProductionControls: boolean;
  onToggleProductionControls: () => void;
  isProductionMode: boolean;
  onToggleProductionMode: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  playbackState?: PlaybackState;
  contentMode?: AppContentMode;
  onOpenContentModeModal?: () => void;
  companionScenario?: CompanionScenario;
  onOpenCompanionModal?: () => void;
  // Companion Host Control Callbacks for Admin Dropdown
  isCompanionPlaying?: boolean;
  onCompanionPause?: () => void;
  onCompanionResume?: () => void;
  onCompanionRestart?: () => void;
  onCompanionNextScenario?: () => void;
  onCompanionStop?: () => void;
  showCompanionControls?: boolean;
  onToggleCompanionControls?: () => void;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
  dataset,
  audioSettings,
  onUpdateAudio,
  onOpenDatasetModal,
  onOpenPreviewPanel,
  showProductionControls,
  onToggleProductionControls,
  isProductionMode,
  onToggleProductionMode,
  isFullscreen,
  onToggleFullscreen,
  playbackState = 'intro',
  contentMode = 'quiz',
  onOpenContentModeModal,
  companionScenario,
  onOpenCompanionModal,
  isCompanionPlaying,
  onCompanionPause,
  onCompanionResume,
  onCompanionRestart,
  onCompanionNextScenario,
  onCompanionStop,
  showCompanionControls,
  onToggleCompanionControls,
}) => {
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const adminRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close admin controls when tapping or clicking outside
  useEffect(() => {
    if (!isAdminOpen) return;
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        adminRef.current &&
        !adminRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsAdminOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isAdminOpen]);

  const isIntro = playbackState === 'intro';
  const isCompanionFlow = contentMode === 'companion' && !isIntro;

  return (
    <header className={`z-40 transition-opacity duration-300 flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3.5 bg-gradient-to-b from-slate-950/95 to-slate-950/75 border-b border-slate-800/40 w-full ${isCompanionFlow ? 'relative shrink-0' : 'absolute top-0 left-0 right-0'} ${isProductionMode && !showProductionControls ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
      {/* Left side: Persistent header during active presentation */}
      <div className="flex items-center space-x-3">
        {!isIntro ? (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-cinzel font-bold text-base sm:text-lg shadow-lg shrink-0">
              {contentMode === 'quiz' ? '✝' : <BookOpen className="w-4 h-4" />}
            </div>
            <div className="min-w-0">
              <h1 className="font-cinzel text-xs sm:text-sm md:text-base font-bold tracking-wider text-amber-100 truncate">
                {contentMode === 'quiz' ? 'BIBLE CHALLENGE' : 'VERSE COMPANION'}
              </h1>
              <p className="text-[10px] sm:text-xs text-amber-300/70 font-medium truncate max-w-[180px] sm:max-w-xs md:max-w-sm">
                {contentMode === 'quiz'
                  ? `${dataset.title} (${dataset.questions.length} Qs)`
                  : companionScenario
                  ? companionScenario.situation
                  : 'Scripture for Life'}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-1 h-1" />
        )}
      </div>

      {/* Right side: Unobtrusive Menu/Settings trigger & #admin-controls container */}
      <div className="relative flex items-center">
        {/* Menu / Settings Trigger */}
        <button
          ref={triggerRef}
          id="admin-menu-trigger"
          onClick={() => setIsAdminOpen(prev => !prev)}
          className={`p-2 rounded-xl border transition-all duration-200 shadow-sm flex items-center justify-center ${
            isAdminOpen
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
              : 'bg-slate-900/70 hover:bg-slate-800/90 border-slate-700/60 text-slate-400 hover:text-amber-300'
          }`}
          title="Host Settings & Production Menu"
          aria-label="Toggle Host Admin Controls"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Dedicated Admin Controls Container (Hidden by default) */}
        {isAdminOpen && (
          <div
            ref={adminRef}
            id="admin-controls"
            className="absolute right-0 top-full mt-2 flex flex-wrap items-center justify-end gap-2 bg-slate-900/95 border border-slate-700/80 backdrop-blur-xl p-2 rounded-2xl shadow-2xl z-50 animate-fade-in max-w-[90vw] sm:max-w-none"
          >
            {/* Mode Switcher */}
            {onOpenContentModeModal && (
              <button
                onClick={() => {
                  onOpenContentModeModal();
                  setIsAdminOpen(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-xs font-semibold text-amber-300 transition flex items-center space-x-1.5 shadow-sm whitespace-nowrap"
                title="Change Content Mode (Quiz vs Companion)"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Mode: {contentMode === 'quiz' ? 'Quiz' : 'Companion'}</span>
              </button>
            )}

            {/* FIX 5: Companion Host Controls inside Admin Menu */}
            {contentMode === 'companion' && (
              <div className="flex items-center space-x-1.5 border-l border-r border-slate-700/60 px-2 my-0.5">
                {/* Pause / Resume */}
                {isCompanionPlaying ? (
                  <button
                    onClick={onCompanionPause}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center space-x-1 transition shadow-sm whitespace-nowrap"
                    title="Pause Livestream Presentation"
                  >
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </button>
                ) : (
                  <button
                    onClick={onCompanionResume}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-1 transition shadow-sm whitespace-nowrap"
                    title="Resume Livestream Presentation"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Resume</span>
                  </button>
                )}

                {/* Restart current situation */}
                {onCompanionRestart && (
                  <button
                    onClick={onCompanionRestart}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs transition"
                    title="Restart Current Situation"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                )}

                {/* Skip to Next Situation */}
                {onCompanionNextScenario && (
                  <button
                    onClick={onCompanionNextScenario}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center space-x-1 transition whitespace-nowrap"
                    title="Skip to Next Situation"
                  >
                    <SkipForward className="w-3.5 h-3.5 text-amber-400" />
                    <span>Next</span>
                  </button>
                )}

                {/* Stop presentation */}
                {onCompanionStop && (
                  <button
                    onClick={onCompanionStop}
                    className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs transition"
                    title="Stop Companion Broadcast"
                  >
                    <Square className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Toggle Docked Control Bar */}
                {onToggleCompanionControls && (
                  <button
                    onClick={onToggleCompanionControls}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition flex items-center space-x-1.5 shadow-sm whitespace-nowrap ${
                      showCompanionControls
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                        : 'bg-slate-800/90 hover:bg-slate-700 border-slate-600/60 text-slate-300'
                    }`}
                    title="Toggle Host Control Dock"
                  >
                    <Sliders className="w-3.5 h-3.5 text-amber-400" />
                    <span>Dock: {showCompanionControls ? 'Visible' : 'Hidden'}</span>
                  </button>
                )}
              </div>
            )}

            {/* Mode-specific libraries: Datasets for Quiz, Scenarios for Companion */}
            {contentMode === 'quiz' ? (
              <>
                <button
                  onClick={() => {
                    onOpenDatasetModal();
                    setIsAdminOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-600/60 text-xs font-medium text-slate-200 transition flex items-center space-x-1.5 shadow-sm whitespace-nowrap"
                  title="Select Quiz Dataset"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Datasets</span>
                </button>

                <button
                  onClick={() => {
                    onOpenPreviewPanel();
                    setIsAdminOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-600/60 text-xs font-medium text-slate-200 transition flex items-center space-x-1.5 shadow-sm whitespace-nowrap"
                  title="Preview & Quality Control Panel"
                >
                  <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>QC Preview</span>
                </button>
              </>
            ) : (
              onOpenCompanionModal && (
                <button
                  onClick={() => {
                    onOpenCompanionModal();
                    setIsAdminOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-600/60 text-xs font-medium text-slate-200 transition flex items-center space-x-1.5 shadow-sm whitespace-nowrap"
                  title="Browse 12 Life Categories & Scenarios"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Scenarios</span>
                </button>
              )
            )}

            {/* Audio Mute */}
            <button
              onClick={() => onUpdateAudio({ muted: !audioSettings.muted })}
              className={`p-2 rounded-lg border text-xs font-medium transition ${audioSettings.muted ? 'bg-rose-500/20 border-rose-500/40 text-rose-300' : 'bg-slate-800/90 hover:bg-slate-700 border-slate-600/60 text-slate-200'}`}
              title={audioSettings.muted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {audioSettings.muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Production Mode Toggle */}
            <button
              onClick={onToggleProductionMode}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition flex items-center space-x-1.5 whitespace-nowrap ${isProductionMode ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-slate-800/90 hover:bg-slate-700 border-slate-600/60 text-slate-300'}`}
              title="Toggle Production Recording Mode"
            >
              <span className={`w-2 h-2 rounded-full ${isProductionMode ? 'bg-amber-400 animate-pulse' : 'bg-slate-500'}`} />
              <span>{isProductionMode ? 'Rec Mode' : 'Standard'}</span>
            </button>

            {/* Hide/Show Quiz Controls Toggle (Quiz Mode) */}
            {contentMode === 'quiz' && (
              <button
                onClick={onToggleProductionControls}
                className="p-2 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-600/60 text-slate-300 transition"
                title="Toggle Production Controls Visibility"
              >
                <Settings className="w-4 h-4 text-amber-400" />
              </button>
            )}

            {/* Fullscreen */}
            <button
              onClick={onToggleFullscreen}
              className="p-2 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-600/60 text-slate-300 transition"
              title="Toggle Fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
