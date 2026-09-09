import { useState, useEffect, useRef, useCallback } from 'react';
import { QuizDataset, QuizSettings, PlaybackState, AudioSettings } from './types';
import { testDataset, masterDataset } from './data/datasets';
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
  const [dataset, setDataset] = useState<QuizDataset>(testDataset);
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
    transitionTime: 5,
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

  const clearCurrentTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startQuiz = () => {
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
    // Shuffle dataset questions for infinite playback run
    const shuffledQuestions = [...dataset.questions].sort(() => Math.random() - 0.5);
    setDataset(prev => ({
      ...prev,
      questions: shuffledQuestions
    }));
    setCurrentIndex(0);
    setCumulativeCount(prev => prev + 1); // Increment marathon session counter
    setPlaybackState('thinking');
    setIsMilestoneActive(false);
  }, [dataset.questions]);

  const pauseQuiz = () => {
    clearCurrentTimer();
    setPlaybackState('paused');
  };

  const resumeQuiz = () => {
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
    clearCurrentTimer();
    setIsMilestoneActive(false);
    setCumulativeCount(prev => prev + 1);

    if (currentIndex < dataset.questions.length - 1) {
      const nextIdx = currentIndex + 1;
      // Check for milestone every 10 questions (e.g. 10, 20, 30...)
      if ((nextIdx + 1) % 10 === 0 && nextIdx + 1 < dataset.questions.length) {
        setIsMilestoneActive(true);
        setCurrentIndex(nextIdx);
        setPlaybackState('milestone');
        timerRef.current = window.setTimeout(() => {
          setIsMilestoneActive(false);
          setPlaybackState('thinking');
        }, 4000);
      } else {
        setCurrentIndex(nextIdx);
        setPlaybackState('thinking');
      }
    } else {
      setPlaybackState('outro');
    }
  }, [currentIndex, dataset.questions.length]);

  // Handle Thinking Period -> Countdown Timer transition
  useEffect(() => {
    if (playbackState === 'thinking') {
      clearCurrentTimer();
      timerRef.current = window.setTimeout(() => {
        setPlaybackState('countdown');
      }, settings.thinkingTime * 1000);
    }
    return () => clearCurrentTimer();
  }, [playbackState, settings.thinkingTime]);

  // Handle Reveal Period -> Transition transition
  useEffect(() => {
    if (playbackState === 'reveal') {
      clearCurrentTimer();
      timerRef.current = window.setTimeout(() => {
        setPlaybackState('transition');
      }, settings.answerRevealTime * 1000);
    }
    return () => clearCurrentTimer();
  }, [playbackState, settings.answerRevealTime]);

  const handleCountdownComplete = useCallback(() => {
    clearCurrentTimer();
    setPlaybackState('reveal');
  }, []);

  const handleTransitionComplete = useCallback(() => {
    clearCurrentTimer();
    handleNext();
  }, [handleNext]);

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
      <main className="relative w-full h-full max-w-[1920px] max-h-[1080px] aspect-video flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden">
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
            questionNumber={currentIndex + 1}
            totalQuestions={dataset.questions.length}
            sfxVolume={audioSettings.sfxVolume}
          />
        )}

        {/* Quiz Question / Countdown / Reveal / Transition Screen */}
        {(playbackState === 'thinking' || playbackState === 'countdown' || playbackState === 'reveal' || playbackState === 'transition') && (
          <div className="w-full flex flex-col items-center justify-center space-y-4 sm:space-y-8 animate-fade-in">
            {playbackState !== 'reveal' ? (
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
            ) : (
              <AnswerReveal
                question={currentQuestion}
                sfxVolume={audioSettings.sfxVolume}
              />
            )}

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
          setDataset(ds);
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
          setCurrentIndex(idx);
          setPlaybackState('thinking');
        }}
        onTestState={(state) => {
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
