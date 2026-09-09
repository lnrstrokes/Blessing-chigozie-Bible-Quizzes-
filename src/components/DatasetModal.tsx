import React, { useState } from 'react';
import { QuizDataset } from '../types';
import { allDatasets } from '../data/datasets';
import { validateQuizDataset } from '../utils/validation';
import { X, CheckCircle2, AlertTriangle, Database, BookOpen } from 'lucide-react';

interface DatasetModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDataset: QuizDataset;
  onSelectDataset: (dataset: QuizDataset) => void;
}

export const DatasetModal: React.FC<DatasetModalProps> = ({
  isOpen,
  onClose,
  currentDataset,
  onSelectDataset,
}) => {
  const [selected, setSelected] = useState<QuizDataset>(currentDataset);
  const [validationResult, setValidationResult] = useState(validateQuizDataset(currentDataset));

  if (!isOpen) return null;

  const handleSelect = (ds: QuizDataset) => {
    setSelected(ds);
    const res = validateQuizDataset(ds);
    setValidationResult(res);
  };

  const handleConfirm = () => {
    if (validationResult.isValid) {
      onSelectDataset(selected);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-amber-400" />
            <h2 className="font-cinzel text-lg font-bold text-slate-100">Select Quiz Dataset</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allDatasets.map((ds) => {
              const isSelected = selected.id === ds.id;
              const res = validateQuizDataset(ds);

              return (
                <div
                  key={ds.id}
                  onClick={() => handleSelect(ds)}
                  className={`p-5 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${isSelected ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10' : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/60'}`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-700 text-amber-300">
                        {ds.category}
                      </span>
                      {res.isValid ? (
                        <span className="flex items-center space-x-1 text-xs text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Valid</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1 text-xs text-rose-400 font-medium">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Errors</span>
                        </span>
                      )}
                    </div>
                    <h3 className="font-cinzel font-bold text-slate-100 text-base">{ds.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{ds.description}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-700/40 flex items-center justify-between text-xs text-slate-300 font-mono">
                    <span>{ds.questions.length} Questions</span>
                    <span className="text-amber-400">{isSelected ? 'Active' : 'Click to select'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Validation details */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Data Validation Status</span>
              {validationResult.isValid ? (
                <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Dataset is 100% valid for production playback</span>
                </span>
              ) : (
                <span className="text-xs text-rose-400 font-bold flex items-center space-x-1">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Found {validationResult.errors.length} validation error(s)</span>
                </span>
              )}
            </div>

            {!validationResult.isValid && (
              <div className="max-h-32 overflow-y-auto space-y-1 pt-2">
                {validationResult.errors.map((err, idx) => (
                  <div key={idx} className="text-xs text-rose-300 bg-rose-950/40 p-2 rounded border border-rose-900/50">
                    Q{err.questionId}: {err.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!validationResult.isValid}
            className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:hover:bg-amber-500 text-slate-950 text-sm font-bold shadow-lg transition"
          >
            Load Dataset
          </button>
        </div>
      </div>
    </div>
  );
};
