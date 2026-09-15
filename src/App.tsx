import { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { QuizDataset, QuizSettings, PlaybackState, AudioSettings } from './types';
import { testDataset, masterDataset, shuffleQuestionOptions } from './data/datasets';
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

export default function App() {
  const [dataset, setDataset] = useState<QuizDataset>(masterDataset);
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
    thinkingTime: 15,
    countdownTime: 10,
    answerRevealTime: 5,
    transitionTime: 2,
    showExplanation: true,
    autoPlay: true,
  });

  const [audioSettings, setAudioSettings] = useState<AudioSettings>({
    muted: false,
    musicVolume: 0.25,
    sfxVolume: 0.7,
  });

  // Background music control
  useEffect(() => {
    audioManager.setMuted(audioSettings.muted);
    audioManager.setMusicVolume(audioSettings.musicVolume);
    audioManager.setSfxVolume(audioSettings.sfxVolume);

    if (!audioSettings.muted && playbackState !== 'intro' && playbackState !== 'stopped') {
      audioManager.startBackgroundMusic();
    } else {
      audioManager.stopBackgroundMusic();
    }

    return () => {
      audioManager.stopBackgroundMusic();
    };
  }, [audioSettings, playbackState]);

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

  // Progression logic timer refs
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
    clearCurrentTimer();
    setCurrentIndex(0);
    setCumulativeCount(1);
    setPlaybackState('thinking');
    audioManager.playTransition();
  };

  const restartQuiz = () => {
    clearCurrentTimer();
    setCurrentIndex(0);
    setCumulativeCount(1);
    setPlaybackState('intro');
    setIsMilestoneActive(false);
  };

  const handleRestartOrShuffle = useCallback(() => {
    clearCurrentTimer();
    // Shuffle dataset questions and randomize options for each question
    const shuffledQuestions = [...dataset.questions]
      .sort(() => Math.random() - 0.5)
      .map(q => shuffleQuestionOptions(q));
    setDataset(prev => ({
      ...prev,
      questions: shuffledQuestions
    }));
    setCurrentIndex(0);
    setCumulativeCount(prev => prev + 1); // Increment marathon session counter
    setPlaybackState('thinking');
    setIsMilestoneActive(false);
  }, [dataset.questions, clearCurrentTimer]);

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

  // Single Active Timer Manager:
  // Guarantees strictly ONE active timer exists at any point in time.
  // Thinking (15s), Reveal (5s), and Milestone (4s) use timerRef.current.
  // Countdown (10s) and Transition (2s) are driven exclusively by the CountdownTimer component.
  useEffect(() => {
    clearCurrentTimer();

    if (playbackState === 'thinking') {
      timerRef.current = window.setTimeout(() => {
        setPlaybackState('countdown');
      }, settings.thinkingTime * 1000);
    } else if (playbackState === 'reveal') {
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
  }, [playbackState, settings.thinkingTime, settings.answerRevealTime, clearCurrentTimer]);

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
      {/* Header controls */}
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
      />

      {/* Main Stage (16:9 Landscape optimized container) */}
      <main className="relative w-full h-full max-w-[1920px] max-h-[1080px] aspect-video flex flex-col items-center justify-between px-3 sm:px-8 md:px-16 py-3 sm:py-6 overflow-hidden">
        {/* Intro Screen */}
        {playbackState === 'intro' && (
          <IntroScreen
            dataset={dataset}
            onStart={startQuiz}
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
              />
            ) : playbackState === 'reveal' ? (
              <AnswerReveal
                question={currentQuestion}
                sfxVolume={audioSettings.sfxVolume}
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
              {playbackState === 'thinking' && (
                <div className="text-slate-400 text-xs sm:text-sm font-medium animate-pulse px-4 text-center">
                  Read the question and prepare your answer...
                </div>
              )}

              {playbackState === 'countdown' && (
                <CountdownTimer
                  durationSeconds={settings.countdownTime}
                  isActive={playbackState === 'countdown'}
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
          />
        )}
      </main>

      {/* Production Controls */}
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

      {/* Dataset Modal */}
      <DatasetModal
        isOpen={isDatasetModalOpen}
        onClose={() => setIsDatasetModalOpen(false)}
        currentDataset={dataset}
        onSelectDataset={(ds) => {
          const randomizedDS = {
            ...ds,
            questions: ds.questions.map(q => shuffleQuestionOptions(q))
          };
          setDataset(randomizedDS);
          restartQuiz();
        }}
      />

      {/* Preview QC Modal */}
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
    </div>
  );
}
