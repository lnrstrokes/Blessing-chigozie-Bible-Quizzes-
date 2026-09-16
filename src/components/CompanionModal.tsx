import React, { useState } from 'react';
import { X, BookOpen, Sparkles, Check, ChevronRight } from 'lucide-react';
import { companionTaxonomy } from '../data/companionData';
import { CompanionScenario } from '../types';

interface CompanionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScenario: CompanionScenario;
  onSelectScenario: (scenario: CompanionScenario) => void;
}

export const CompanionModal: React.FC<CompanionModalProps> = ({
  isOpen,
  onClose,
  currentScenario,
  onSelectScenario,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    currentScenario.categoryId || companionTaxonomy[0].id
  );

  if (!isOpen) return null;

  const currentCategory =
    companionTaxonomy.find((c) => c.id === selectedCategoryId) || companionTaxonomy[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-cinzel text-lg sm:text-xl font-bold text-amber-100">
                Bible Verse Companion Library
              </h2>
              <p className="text-xs text-amber-300/70">
                Select a Scripture Scenario by Life Category
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Close Library"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Left Category List, Right Scenario Cards */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Categories Sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 p-3 overflow-y-auto max-h-44 md:max-h-none space-y-1 bg-slate-950/40">
            <div className="px-3 py-1 text-[11px] font-cinzel font-semibold text-amber-400/80 uppercase tracking-wider">
              12 Life Categories
            </div>
            {companionTaxonomy.map((cat, idx) => {
              const isSelected = cat.id === selectedCategoryId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span className="truncate">
                    {idx + 1}. {cat.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400 ml-1">
                    {cat.scenarios.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scenarios Panel */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            <div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-amber-200">
                {currentCategory.name}
              </h3>
              <p className="text-xs text-slate-400">{currentCategory.description}</p>
            </div>

            <div className="space-y-3">
              {currentCategory.scenarios.map((scen) => {
                const isActive = scen.id === currentScenario.id;
                return (
                  <div
                    key={scen.id}
                    onClick={() => {
                      onSelectScenario(scen);
                      onClose();
                    }}
                    className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-amber-500/15 border-amber-500/50 shadow-lg shadow-amber-500/5'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-cinzel text-xs font-bold text-amber-300 tracking-wider">
                          {scen.situation}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-400 font-semibold font-mono">
                          {scen.primaryReference}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 italic line-clamp-2">
                        "{scen.primaryText}"
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Takeaway: "{scen.takeaway}"
                      </p>
                    </div>

                    <button
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 shrink-0 self-start sm:self-center transition ${
                        isActive
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-200 hover:bg-amber-500 hover:text-slate-950'
                      }`}
                    >
                      {isActive ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <span>Select</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 flex items-center justify-between bg-slate-900/90 text-xs text-slate-400">
          <span className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Bible Verse Companion • Living Scripture for Everyday Situations</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
