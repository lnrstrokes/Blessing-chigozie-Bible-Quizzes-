import React from 'react';
import { QuizDataset, PlaybackState } from '../types';
import { X, Play, Volume2, Trophy, Award, Clock } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface PreviewPanelProps {
  isOpen: boolean;
  onClose: () => void;
  dataset: QuizDataset;
  currentIndex: number;
  onJumpToQuestion: (index: number) => void;
  onTestState: (state: PlaybackState) => void;
  sfxVolume: number;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  isOpen,
  onClose,
  dataset,
  currentIndex,
  onJumpToQuestion,
  onTestState,
  sfxVolume,
}) => {
  if (!isOpen) return null;

  const handleTestSfx = (type: 'tick' | 'reveal' | 'milestone' | 'completion') => {
    audioManager.setSfxVolume(sfxVolume);
    if (type === 'tick') audioManager.playTick(true);
    if (type === 'reveal') audioManager.playCorrectReveal();
    if (type === 'milestone') audioManager.playMilestone();
    if (type === 'completion') audioManager.playCompletion();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Play className="w-5 h-5 text-amber-400" />
            <h2 className="font-cinzel text-lg font-bold text-slate-100">Production QC & Preview Panel</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* State Testing */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-400">Test Video States</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => { onTestState('intro'); onClose(); }}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition border border-slate-700"
              >
                Intro Screen
              </button>
              <button
                onClick={() => { onTestState('countdown'); onClose(); }}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition border border-slate-700"
              >
                Countdown (10s)
              </button>
              <button
                onClick={() => { onTestState('reveal'); onClose(); }}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition border border-slate-700"
              >
                Answer Reveal
              </button>
              <button
                onClick={() => { onTestState('milestone'); onClose(); }}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition border border-slate-700"
              >
                Milestone (10 Qs)
              </button>
              <button
                onClick={() => { onTestState('outro'); onClose(); }}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition border border-slate-700"
              >
                Final Outro Screen
              </button>
            </div>
          </div>

          {/* Sound Effects Testing */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-400">Test Sound Effects (Web Audio)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => handleTestSfx('tick')}
                className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition border border-slate-700"
              >
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Tick SFX</span>
              </button>
              <button
                onClick={() => handleTestSfx('reveal')}
                className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition border border-slate-700"
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Reveal Chime</span>
              </button>
              <button
                onClick={() => handleTestSfx('milestone')}
                className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition border border-slate-700"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Milestone Fanfare</span>
              </button>
              <button
                onClick={() => handleTestSfx('completion')}
                className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition border border-slate-700"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Completion Fanfare</span>
              </button>
            </div>
          </div>

          {/* Jump to Question */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-400">Jump to Question</h3>
            <div className="flex items-center space-x-3">
              <select
                value={currentIndex}
                onChange={(e) => {
                  onJumpToQuestion(parseInt(e.target.value));
                  onClose();
                }}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              >
                {dataset.questions.map((q, idx) => (
                  <option key={q.id} value={idx}>
                    Q{idx + 1}: {q.question.substring(0, 60)}... ({q.difficulty})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold shadow-lg transition"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
