import React from 'react';
import { Volume2, VolumeX, Maximize, Settings, FileText, PlayCircle } from 'lucide-react';
import { AudioSettings, QuizDataset } from '../types';

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
}) => {
  return (
    <header className={`absolute top-0 left-0 right-0 z-40 transition-opacity duration-300 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-slate-950/90 to-transparent ${isProductionMode && !showProductionControls ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-cinzel font-bold text-lg shadow-lg">
            ✝
          </div>
          <div>
            <h1 className="font-cinzel text-lg font-bold tracking-wider text-amber-100">BIBLE CHALLENGE</h1>
            <p className="text-xs text-amber-300/70 font-medium">{dataset.title} ({dataset.questions.length} Qs)</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Dataset Switcher */}
        <button
          onClick={onOpenDatasetModal}
          className="px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-slate-200 transition flex items-center space-x-1.5 shadow-sm"
          title="Select Quiz Dataset"
        >
          <FileText className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Datasets</span>
        </button>

        {/* Preview QC Mode */}
        <button
          onClick={onOpenPreviewPanel}
          className="px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-slate-200 transition flex items-center space-x-1.5 shadow-sm"
          title="Preview & Quality Control Panel"
        >
          <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">QC Preview</span>
        </button>

        {/* Audio Mute */}
        <button
          onClick={() => onUpdateAudio({ muted: !audioSettings.muted })}
          className={`p-2 rounded-lg border text-xs font-medium transition ${audioSettings.muted ? 'bg-rose-500/20 border-rose-500/40 text-rose-300' : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700/60 text-slate-200'}`}
          title={audioSettings.muted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {audioSettings.muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Production Mode Toggle */}
        <button
          onClick={onToggleProductionMode}
          className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition flex items-center space-x-1.5 ${isProductionMode ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700/60 text-slate-300'}`}
          title="Toggle YouTube Recording Production Mode"
        >
          <span className={`w-2 h-2 rounded-full ${isProductionMode ? 'bg-amber-400 animate-pulse' : 'bg-slate-500'}`} />
          <span className="hidden md:inline">{isProductionMode ? 'Rec Mode' : 'Standard'}</span>
        </button>

        {/* Hide/Show Controls Toggle */}
        <button
          onClick={onToggleProductionControls}
          className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 transition"
          title="Toggle Production Controls Visibility"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Fullscreen */}
        <button
          onClick={onToggleFullscreen}
          className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 transition"
          title="Toggle Fullscreen"
        >
          <Maximize className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
