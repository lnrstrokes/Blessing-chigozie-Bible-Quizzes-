import React, { useState, useEffect, useRef, useCallback, MouseEvent } from 'react';
import { Sparkles } from 'lucide-react';
import { QuizDataset, QuizSettings, PlaybackState, AudioSettings, AppContentMode, CompanionStep, CompanionScenario } from './types';
import { testDataset, masterDataset, shuffleQuestionOptions, createShuffledSessionDataset } from './data/datasets';
import { allCompanionScenarios, getStepDuration } from './data/companionData';
import { audioManager } from './utils/audio';
import { HeaderControls } from './components/HeaderControls';
import { ProductionControls } from './components/ProductionControls';
import { IntroScreen } from './components/IntroScreen';
import { QuestionRenderer } from './components/QuestionRenderer';
import { CountdownTimer } from './components/CountdownTimer';
import { AnswerReveal } from './components/AnswerReveal';
import { MilestoneScreen } from './components/MilestoneScreen';
import { FinalScreen } from './components/FinalScreen';
import { DatasetModal } from './components/DatasetModal';
import { PreviewPanel } from './components/PreviewPanel';
import { CompanionRenderer } from './components/CompanionRenderer';
import { CompanionIntroScreen } from './components/CompanionIntroScreen';
import { CompanionProductionControls } from './components/CompanionProductionControls';
import { CompanionModal } from './components/CompanionModal';
import { ContentModeModal } from './components/ContentModeModal';

const COMPANION_STEPS: CompanionStep[] = [
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

export default function App() {
  // Content Mode: 'quiz' (original 110-question challenge) or 'companion' (Scripture for Life's situations)
  const [contentMode, setContentMode] = useState<AppContentMode>('quiz');
  const [isContentModeModalOpen, setIsContentModeModalOpen] = useState<boolean>(false);

  // ==========================================
  // QUIZ STATE (Preserved 100% intact)
  // ==========================================
  const [dataset, setDataset] = useState<QuizDataset>(() => createShuffledSessionDataset(masterDataset));
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [playbackState, setPlaybackState] = useState<PlaybackState>('intro');
  const [showProductionControls, setShowProductionControls] = useState<boolean>(true);
  const [isProductionMode, setIsProductionMode] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isDatasetModalOpen, setIsDatasetModalOpen] = useState<boolean>(false);
  const [isPreviewPanelOpen, setIsPreviewPanelOpen] = useState<boolean>(false);
  const [isMilestoneActive, setIsMilestoneActive] = useState<boolean>(false);
  const [cumulativeCount, setCumulativeCount] = useState<number>(1);

  const [settings] = useState<QuizSettings>({
    thinkingTime: 20,
    countdownTime: 10,
    answerRevealTime: 10,
    transitionTime: 2,
    showExplanation: true,
    autoPlay: true,
  });

  const [audioSettings, setAudioSettings] = useState<AudioSettings>({
    muted: false,
    musicVolume: 0.25,
    sfxVolume: 0.7,
  });

  // ==========================================
  // BIBLE VERSE COMPANION STATE
  // ==========================================
  const [companionScenarios, setCompanionScenarios] = useState<CompanionScenario[]>(allCompanionScenarios);
  const [companionScenarioIndex, setCompanionScenarioIndex] = useState<number>(0);
  const [companionStep, setCompanionStep] = useState<CompanionStep>('hook');
  const [isCompanionIntro, setIsCompanionIntro] = useState<boolean>(true);
  const [isCompanionPlaying, setIsCompanionPlaying] = useState<boolean>(false);
  const [isCompanionModalOpen, setIsCompanionModalOpen] = useState<boolean>(false);
  const [showCompanionControls, setShowCompanionControls] = useState<boolean>(false);

  const currentCompanionScenario =
    companionScenarios[companionScenarioIndex] || companionScenarios[0];
  const companionStepIndex = COMPANION_STEPS.indexOf(companionStep);

  const companionStepRef = useRef<CompanionStep>(companionStep);
  companionStepRef.current = companionStep;
  const isAdvancingRef = useRef<boolean>(false);

  // Dynamic Scene Durations and Live Countdown
  const [companionStepDuration, setCompanionStepDuration] = useState<number>(() =>
    getStepDuration(currentCompanionScenario, 'hook')
  );
  const [companionTimeRemaining, setCompanionTimeRemaining] = useState<number>(() =>
    getStepDuration(currentCompanionScenario, 'hook')
  );

  // Reset advancement lock when step or scenario changes
  useEffect(() => {
    isAdvancingRef.current = false;
  }, [companionStep, companionScenarioIndex]);

  // Synchronize duration and timer whenever step or scenario changes
  useEffect(() => {
    if (currentCompanionScenario) {
      const dur = getStepDuration(currentCompanionScenario, companionStep);
      setCompanionStepDuration(dur);
      setCompanionTimeRemaining(dur);
    }
  }, [companionStep, companionScenarioIndex, currentCompanionScenario]);

  // Background music control for both modes
  useEffect(() => {
    audioManager.setMuted(audioSettings.muted);
    audioManager.setMusicVolume(audioSettings.musicVolume);
    audioManager.setSfxVolume(audioSettings.sfxVolume);

    const isQuizActive = contentMode === 'quiz' && playbackState !== 'intro' && playbackState !== 'stopped';
    const isCompanionActive = contentMode === 'companion' && !isCompanionIntro && isCompanionPlaying;

    if (!audioSettings.muted && (isQuizActive || isCompanionActive)) {
      audioManager.startBackgroundMusic();
    } else {
      audioManager.stopBackgroundMusic();
    }

    return () => {
      audioManager.stopBackgroundMusic();
    };
  }, [audioSettings, playbackState, contentMode, isCompanionIntro, isCompanionPlaying]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const handleUpdateAudio = (newSettings: Partial<AudioSettings>) => {
    setAudioSettings(prev => ({ ...prev, ...newSettings }));
  };

  // ==========================================
  // COMPANION MODE ACTIONS & AUTOMATIC PROGRESSION
  // ==========================================
  const handleCompanionAutoAdvance = useCallback(() => {
    const currentStep = companionStepRef.current;
    const currentIdx = COMPANION_STEPS.indexOf(currentStep);
    if (currentIdx < COMPANION_STEPS.length - 1) {
      const nextStep = COMPANION_STEPS[currentIdx + 1];
      setCompanionStep(nextStep);
      audioManager.playTransition();
    } else {
      // Finished Scene 10 ('nextHook'): advance to the next situation in continuous loop!
      setCompanionScenarioIndex((prevIdx) => (prevIdx + 1) % companionScenarios.length);
      setCompanionStep('hook');
      audioManager.playTransition();
    }
  }, [companionScenarios.length]);

  // Automatic Livestream Interval (ticking every 1s when active)
  useEffect(() => {
    if (contentMode !== 'companion' || isCompanionIntro || !isCompanionPlaying) {
      return;
    }

    const timer = setInterval(() => {
      setCompanionTimeRemaining((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [contentMode, isCompanionIntro, isCompanionPlaying]);

  // Advance scene when countdown completes (pure state-driven progression)
  useEffect(() => {
    if (contentMode !== 'companion' || isCompanionIntro || !isCompanionPlaying) {
      return;
    }

    if (companionTimeRemaining === 0 && !isAdvancingRef.current) {
      isAdvancingRef.current = true;
      handleCompanionAutoAdvance();
    }
  }, [companionTimeRemaining, contentMode, isCompanionIntro, isCompanionPlaying, handleCompanionAutoAdvance]);

  const startCompanion = () => {
    audioManager.unlock();
    isAdvancingRef.current = false;
    setIsCompanionIntro(false);
    setCompanionStep('hook');
    const dur = getStepDuration(currentCompanionScenario, 'hook');
    setCompanionStepDuration(dur);
    setCompanionTimeRemaining(dur);
    setIsCompanionPlaying(true);
    audioManager.playTransition();
  };

  const pauseCompanion = () => {
    setIsCompanionPlaying(false);
  };

  const resumeCompanion = () => {
    setIsCompanionPlaying(true);
  };

  const stopCompanion = () => {
    isAdvancingRef.current = false;
    setIsCompanionPlaying(false);
    setIsCompanionIntro(true);
    setCompanionStep('hook');
    audioManager.playTransition();
  };

  const restartCompanionScenario = () => {
    isAdvancingRef.current = false;
    setCompanionStep('hook');
    const dur = getStepDuration(currentCompanionScenario, 'hook');
    setCompanionStepDuration(dur);
    setCompanionTimeRemaining(dur);
    setIsCompanionPlaying(true);
    audioManager.playTransition();
  };

  const handleCompanionNextStep = () => {
    handleCompanionAutoAdvance();
  };

  const handleCompanionPrevStep = () => {
    const currentIdx = COMPANION_STEPS.indexOf(companionStep);
    if (currentIdx > 0) {
      setCompanionStep(COMPANION_STEPS[currentIdx - 1]);
      audioManager.playTransition();
    }
  };

  const handleCompanionGoToStep = (targetStep: CompanionStep) => {
    setCompanionStep(targetStep);
    audioManager.playTransition();
  };

  const handleCompanionNextScenario = () => {
    setCompanionScenarioIndex((prev) => (prev + 1) % companionScenarios.length);
    setCompanionStep('hook');
    setIsCompanionPlaying(true);
    audioManager.playTransition();
  };

  const handleCompanionPrevScenario = () => {
    setCompanionScenarioIndex((prev) => (prev - 1 + companionScenarios.length) % companionScenarios.length);
    setCompanionStep('hook');
    setIsCompanionPlaying(true);
    audioManager.playTransition();
  };

  const handleSelectScenario = (selected: CompanionScenario) => {
    const foundIdx = companionScenarios.findIndex(s => s.id === selected.id);
    if (foundIdx !== -1) {
      setCompanionScenarioIndex(foundIdx);
    } else {
      setCompanionScenarios(prev => [selected, ...prev]);
      setCompanionScenarioIndex(0);
    }
    setCompanionStep('hook');
    setIsCompanionPlaying(true);
    audioManager.playTransition();
  };

  // Switch Mode Handler
  const handleSelectContentMode = (mode: AppContentMode) => {
    setContentMode(mode);
    if (mode === 'companion') {
      setIsCompanionIntro(true);
      setIsCompanionPlaying(false);
      setShowCompanionControls(false);
    }
  };

  // ==========================================
  // FIX 1: THREE-TAP GESTURE TO REVEAL DEV/ADMIN/HOST CONTROLS
  // ==========================================
  const tapCountRef = useRef<number>(0);
  const tapTimerRef = useRef<number | null>(null);
  const controlsInactivityTimerRef = useRef<number | null>(null);

  const resetControlsInactivityTimer = useCallback(() => {
    if (controlsInactivityTimerRef.current) {
      clearTimeout(controlsInactivityTimerRef.current);
    }
    // Auto-hide controls after 15 seconds of inactivity
    controlsInactivityTimerRef.current = window.setTimeout(() => {
      setShowCompanionControls(false);
    }, 15000);
  }, []);

  // Manage auto-hide inactivity timer based on showCompanionControls state
  useEffect(() => {
    if (showCompanionControls) {
      resetControlsInactivityTimer();
    } else {
      if (controlsInactivityTimerRef.current) {
        clearTimeout(controlsInactivityTimerRef.current);
        controlsInactivityTimerRef.current = null;
      }
    }
    return () => {
      if (controlsInactivityTimerRef.current) {
        clearTimeout(controlsInactivityTimerRef.current);
      }
    };
  }, [showCompanionControls, resetControlsInactivityTimer]);

  const handlePresentationTap = useCallback((e: React.MouseEvent) => {
    // Only active during active Companion playback
    if (contentMode !== 'companion' || isCompanionIntro) {
      return;
    }

    // Ignore clicks/taps on existing interactive buttons, inputs, links, or admin containers
    const target = e.target as HTMLElement | null;
    if (target && target.closest('button, input, select, textarea, a, #admin-controls, #companion-production-controls')) {
      if (showCompanionControls) {
        resetControlsInactivityTimer();
      }
      return;
    }

    if (showCompanionControls) {
      resetControlsInactivityTimer();
    }

    tapCountRef.current += 1;

    if (tapCountRef.current === 1) {
      // Start ~1-second timeout for the 3-tap reveal gesture
      if (tapTimerRef.current) {
        clearTimeout(tapTimerRef.current);
      }
      tapTimerRef.current = window.setTimeout(() => {
        tapCountRef.current = 0;
        tapTimerRef.current = null;
      }, 1000);
    } else if (tapCountRef.current >= 3) {
      // 3 taps completed within ~1s: reveal existing controls
      if (tapTimerRef.current) {
        clearTimeout(tapTimerRef.current);
        tapTimerRef.current = null;
      }
      tapCountRef.current = 0;
      setShowCompanionControls(true);
      resetControlsInactivityTimer();
    }
  }, [contentMode, isCompanionIntro, showCompanionControls, resetControlsInactivityTimer]);

  // ==========================================
  // QUIZ LOGIC (Preserved 100% intact)
  // ==========================================
  const timerRef = useRef<number | null>(null);

  const clearCurrentTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const advanceToNextQuestion = useCallback(() => {
    clearCurrentTimer();
    setIsMilestoneActive(false);

    setCurrentIndex((prevIndex) => {
      const nextIdx = prevIndex + 1;

      // If all questions in dataset are consumed, proceed to outro (auto-reshuffles after 10s)
      if (nextIdx >= dataset.questions.length) {
        setPlaybackState('outro');
        return prevIndex;
      }

      // Check for milestone every 10 questions (after completing 10, 20, 30...)
      if (nextIdx % 10 === 0) {
        setIsMilestoneActive(true);
        setPlaybackState('milestone');
      } else {
        setPlaybackState('thinking');
      }

      return nextIdx;
    });
  }, [dataset.questions.length, clearCurrentTimer]);

  const startQuiz = () => {
    audioManager.unlock();
    clearCurrentTimer();
    const sessionDS = createShuffledSessionDataset(masterDataset);
    setDataset(sessionDS);
    setUserAnswers({});
    setCurrentIndex(0);
    setCumulativeCount(1);
    setPlaybackState('thinking');
    audioManager.playTransition();
  };

  const restartQuiz = () => {
    audioManager.unlock();
    clearCurrentTimer();
    const sessionDS = createShuffledSessionDataset(masterDataset);
    setDataset(sessionDS);
    setUserAnswers({});
    setCurrentIndex(0);
    setCumulativeCount(1);
    setPlaybackState('intro');
    setIsMilestoneActive(false);
  };

  const handleRestartOrShuffle = useCallback(() => {
    audioManager.unlock();
    clearCurrentTimer();
    const sessionDS = createShuffledSessionDataset(masterDataset);
    setDataset(sessionDS);
    setUserAnswers({});
    setCurrentIndex(0);
    setCumulativeCount(prev => prev + 1); // Increment marathon session counter
    setPlaybackState('thinking');
    setIsMilestoneActive(false);
    audioManager.playTransition();
  }, [clearCurrentTimer]);

  const handleSelectAnswer = (optionIdx: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIdx,
    }));
  };

  const pauseQuiz = () => {
    clearCurrentTimer();
    setPlaybackState('paused');
  };

  const resumeQuiz = () => {
    clearCurrentTimer();
    setPlaybackState('thinking');
  };

  const handlePrev = () => {
    clearCurrentTimer();
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setPlaybackState('thinking');
    }
  };

  const handleNext = useCallback(() => {
    advanceToNextQuestion();
  }, [advanceToNextQuestion]);

  // Single Active Timer Manager for Quiz:
  useEffect(() => {
    clearCurrentTimer();

    if (playbackState === 'reveal') {
      timerRef.current = window.setTimeout(() => {
        setPlaybackState('transition');
      }, settings.answerRevealTime * 1000);
    } else if (playbackState === 'milestone') {
      setIsMilestoneActive(true);
      timerRef.current = window.setTimeout(() => {
        setIsMilestoneActive(false);
        setPlaybackState('thinking');
      }, 4000);
    }

    return () => clearCurrentTimer();
  }, [playbackState, settings.answerRevealTime, clearCurrentTimer]);

  const handleCountdownComplete = useCallback(() => {
    clearCurrentTimer();
    setPlaybackState('reveal');
  }, [clearCurrentTimer]);

  const handleTransitionComplete = useCallback(() => {
    clearCurrentTimer();
    advanceToNextQuestion();
  }, [clearCurrentTimer, advanceToNextQuestion]);

  const handleMilestoneContinue = useCallback(() => {
    clearCurrentTimer();
    setIsMilestoneActive(false);
    setPlaybackState('thinking');
  }, [clearCurrentTimer]);

  const currentQuestion = dataset.questions[currentIndex] || dataset.questions[0];

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden bg-slate-950 font-sans select-none flex flex-col items-center justify-center">
      {/* Header controls (works across both Quiz and Companion modes) */}
      <HeaderControls
        dataset={dataset}
        audioSettings={audioSettings}
        onUpdateAudio={handleUpdateAudio}
        onOpenDatasetModal={() => setIsDatasetModalOpen(true)}
        onOpenPreviewPanel={() => setIsPreviewPanelOpen(true)}
        showProductionControls={showProductionControls}
        onToggleProductionControls={() => setShowProductionControls(!showProductionControls)}
        isProductionMode={isProductionMode}
        onToggleProductionMode={() => setIsProductionMode(!isProductionMode)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        playbackState={contentMode === 'quiz' ? playbackState : (isCompanionIntro ? 'intro' : 'thinking')}
        contentMode={contentMode}
        onOpenContentModeModal={() => setIsContentModeModalOpen(true)}
        companionScenario={currentCompanionScenario}
        onOpenCompanionModal={() => setIsCompanionModalOpen(true)}
        isCompanionPlaying={isCompanionPlaying}
        onCompanionPause={pauseCompanion}
        onCompanionResume={resumeCompanion}
        onCompanionRestart={restartCompanionScenario}
        onCompanionNextScenario={handleCompanionNextScenario}
        onCompanionStop={stopCompanion}
        showCompanionControls={showCompanionControls}
        onToggleCompanionControls={() => setShowCompanionControls(prev => !prev)}
      />

      {/* Main Stage (16:9 Landscape presentation container) */}
      <main
        onClick={handlePresentationTap}
        className={`relative w-full ${contentMode === 'companion' && !isCompanionIntro ? 'flex-1 min-h-0' : 'h-full'} max-w-[1920px] max-h-[1080px] md:aspect-video flex flex-col items-center justify-between px-3 sm:px-8 md:px-16 py-2 sm:py-4 md:py-6 overflow-hidden touch-manipulation`}
      >
        {/* ========================================================================= */}
        {/* MODE 1: BIBLE QUIZ PRESENTATION FLOW */}
        {/* ========================================================================= */}
        {contentMode === 'quiz' && (
          <>
            {/* Intro Screen */}
            {playbackState === 'intro' && (
              <IntroScreen
                dataset={dataset}
                onStart={startQuiz}
                onSwitchToCompanion={() => handleSelectContentMode('companion')}
              />
            )}

            {/* Milestone Screen */}
            {isMilestoneActive && (
              <MilestoneScreen
                questionNumber={currentIndex || 10}
                totalQuestions={dataset.questions.length}
                sfxVolume={audioSettings.sfxVolume}
                onContinue={handleMilestoneContinue}
                questions={dataset.questions}
                viewerAnswers={userAnswers}
              />
            )}

            {/* Quiz Question / Countdown / Reveal / Transition Screen */}
            {(playbackState === 'thinking' || playbackState === 'countdown' || playbackState === 'reveal' || playbackState === 'transition') && (
              <div className="w-full flex flex-col items-center justify-center space-y-2 sm:space-y-4 animate-fade-in my-auto">
                {playbackState === 'thinking' || playbackState === 'countdown' ? (
                  <QuestionRenderer
                    question={currentQuestion}
                    currentIndex={currentIndex}
                    totalQuestions={dataset.questions.length}
                    playbackState={playbackState}
                    thinkingTime={settings.thinkingTime}
                    countdownTime={settings.countdownTime}
                    onCountdownComplete={handleCountdownComplete}
                    sfxVolume={audioSettings.sfxVolume}
                    cumulativeCount={cumulativeCount}
                    selectedAnswerIndex={userAnswers[currentIndex] ?? null}
                    onSelectAnswer={handleSelectAnswer}
                  />
                ) : playbackState === 'reveal' ? (
                  <AnswerReveal
                    question={currentQuestion}
                    sfxVolume={audioSettings.sfxVolume}
                    userSelectedAnswerIndex={userAnswers[currentIndex] ?? null}
                  />
                ) : playbackState === 'transition' ? (
                  <div className="w-full max-w-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col items-center justify-center space-y-3 my-auto text-center animate-fade-in">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                      <Sparkles className="w-6 h-6 animate-pulse" />
                    </div>
                    <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">
                      Next Challenge Coming Up
                    </span>
                    <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-100">
                      Preparing Question {Math.min(currentIndex + 2, dataset.questions.length)} of {dataset.questions.length}
                    </h3>
                    <p className="text-slate-400 text-sm max-w-md">
                      Reflect on the scriptures and prepare to lock in your answer in the chat!
                    </p>
                  </div>
                ) : null}

                {/* Countdown or Transition Box */}
                <div className="flex items-center justify-center min-h-[60px] sm:min-h-[90px]">
                  {(playbackState === 'thinking' || playbackState === 'countdown') && (
                    <CountdownTimer
                      key={`${playbackState}-${currentIndex}`}
                      durationSeconds={playbackState === 'countdown' ? settings.countdownTime : settings.thinkingTime}
                      isActive={playbackState === 'thinking' || playbackState === 'countdown'}
                      onComplete={handleCountdownComplete}
                      sfxVolume={audioSettings.sfxVolume}
                    />
                  )}

                  {playbackState === 'transition' && (
                    <div className="flex flex-col items-center space-y-2">
                      <div className="text-amber-400 text-xs font-semibold tracking-widest uppercase animate-pulse">
                        Next Question Starting In
                      </div>
                      <CountdownTimer
                        key={`transition-${currentIndex}`}
                        durationSeconds={settings.transitionTime}
                        isActive={playbackState === 'transition'}
                        onComplete={handleTransitionComplete}
                        sfxVolume={audioSettings.sfxVolume}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Outro / Final Screen */}
            {playbackState === 'outro' && (
              <FinalScreen
                dataset={dataset}
                onRestart={handleRestartOrShuffle}
                sfxVolume={audioSettings.sfxVolume}
                viewerAnswers={userAnswers}
              />
            )}
          </>
        )}

        {/* ========================================================================= */}
        {/* MODE 2: BIBLE VERSE COMPANION PRESENTATION FLOW */}
        {/* ========================================================================= */}
        {contentMode === 'companion' && (
          <>
            {isCompanionIntro ? (
              <CompanionIntroScreen
                scenario={currentCompanionScenario}
                onStart={startCompanion}
                onOpenCompanionModal={() => setIsCompanionModalOpen(true)}
                onSwitchToQuiz={() => handleSelectContentMode('quiz')}
              />
            ) : (
              <CompanionRenderer
                scenario={currentCompanionScenario}
                step={companionStep}
                stepIndex={companionStepIndex}
                totalSteps={COMPANION_STEPS.length}
                scenarioIndex={companionScenarioIndex}
                totalScenarios={companionScenarios.length}
                timeRemaining={companionTimeRemaining}
                stepDuration={companionStepDuration}
                isPlaying={isCompanionPlaying}
              />
            )}
          </>
        )}
      </main>

      {/* Production Controls for Quiz */}
      {contentMode === 'quiz' && (
        <ProductionControls
          playbackState={playbackState}
          currentIndex={currentIndex}
          totalQuestions={dataset.questions.length}
          onStart={startQuiz}
          onPause={pauseQuiz}
          onResume={resumeQuiz}
          onRestart={restartQuiz}
          onPrev={handlePrev}
          onNext={handleNext}
          onSkipIntro={() => {
            setPlaybackState('thinking');
          }}
          showControls={showProductionControls}
          onToggleControls={() => setShowProductionControls(!showProductionControls)}
          audioSettings={audioSettings}
          onUpdateAudio={handleUpdateAudio}
        />
      )}

      {/* Production Controls for Bible Verse Companion */}
      {contentMode === 'companion' && (
        <div onPointerDown={resetControlsInactivityTimer} onClick={resetControlsInactivityTimer}>
          <CompanionProductionControls
            currentStep={companionStep}
            stepIndex={companionStepIndex}
            totalSteps={COMPANION_STEPS.length}
            scenarioIndex={companionScenarioIndex}
            totalScenarios={companionScenarios.length}
            currentScenario={currentCompanionScenario}
            isIntro={isCompanionIntro}
            isPlaying={isCompanionPlaying}
            timeRemaining={companionTimeRemaining}
            onStart={startCompanion}
            onPause={pauseCompanion}
            onResume={resumeCompanion}
            onStop={stopCompanion}
            onRestartScenario={restartCompanionScenario}
            onPrevStep={handleCompanionPrevStep}
            onNextStep={handleCompanionNextStep}
            onGoToStep={handleCompanionGoToStep}
            onPrevScenario={handleCompanionPrevScenario}
            onNextScenario={handleCompanionNextScenario}
            onOpenCompanionModal={() => setIsCompanionModalOpen(true)}
            showControls={showCompanionControls}
            onToggleControls={() => setShowCompanionControls(prev => !prev)}
            audioSettings={audioSettings}
            onUpdateAudio={handleUpdateAudio}
          />
        </div>
      )}

      {/* Quiz Dataset Modal */}
      <DatasetModal
        isOpen={isDatasetModalOpen}
        onClose={() => setIsDatasetModalOpen(false)}
        currentDataset={dataset}
        onSelectDataset={(ds) => {
          const sessionDS = createShuffledSessionDataset(ds);
          setDataset(sessionDS);
          setUserAnswers({});
          restartQuiz();
        }}
      />

      {/* Quiz Preview QC Modal */}
      <PreviewPanel
        isOpen={isPreviewPanelOpen}
        onClose={() => setIsPreviewPanelOpen(false)}
        dataset={dataset}
        currentIndex={currentIndex}
        onJumpToQuestion={(idx) => {
          clearCurrentTimer();
          setCurrentIndex(idx);
          setPlaybackState('thinking');
        }}
        onTestState={(state) => {
          clearCurrentTimer();
          if (state === 'intro') setPlaybackState('intro');
          if (state === 'countdown') {
            setPlaybackState('countdown');
          }
          if (state === 'reveal') {
            setPlaybackState('reveal');
          }
          if (state === 'milestone') {
            setIsMilestoneActive(true);
            setPlaybackState('milestone');
          }
          if (state === 'outro') setPlaybackState('outro');
        }}
        sfxVolume={audioSettings.sfxVolume}
      />

      {/* Bible Verse Companion Library Modal */}
      <CompanionModal
        isOpen={isCompanionModalOpen}
        onClose={() => setIsCompanionModalOpen(false)}
        currentScenario={currentCompanionScenario}
        onSelectScenario={handleSelectScenario}
      />

      {/* Content Mode Switcher Modal */}
      <ContentModeModal
        isOpen={isContentModeModalOpen}
        onClose={() => setIsContentModeModalOpen(false)}
        currentMode={contentMode}
        onSelectMode={handleSelectContentMode}
      />
    </div>
  );
}

