// Web Audio API synthesizer for sound effects and ambient background music

class AudioManager {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isMuted: boolean = false;
  private musicVolumeVal: number = 0.3;
  private sfxVolumeVal: number = 0.7;
  private musicInterval: number | null = null;
  private isMusicPlaying: boolean = false;
  private hasUnlocked: boolean = false;

  constructor() {
    // Auto-bind one-time gesture listeners to seamlessly unlock on mobile
    if (typeof window !== 'undefined') {
      const unlockHandler = () => {
        this.unlock().then((success) => {
          if (success) {
            window.removeEventListener('pointerdown', unlockHandler);
            window.removeEventListener('touchstart', unlockHandler);
            window.removeEventListener('click', unlockHandler);
            window.removeEventListener('keydown', unlockHandler);
          }
        });
      };

      window.addEventListener('pointerdown', unlockHandler, { passive: true });
      window.addEventListener('touchstart', unlockHandler, { passive: true });
      window.addEventListener('click', unlockHandler, { passive: true });
      window.addEventListener('keydown', unlockHandler, { passive: true });
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.musicGain = this.ctx.createGain();
        this.sfxGain = this.ctx.createGain();

        this.updateVolumes();

        this.musicGain.connect(this.ctx.destination);
        this.sfxGain.connect(this.ctx.destination);
      }
    }
  }

  /**
   * Explicitly unlock AudioContext from a direct user gesture (e.g. Start Quiz, Tap option)
   * This is required by mobile browsers (Android Chrome, iOS Safari)
   */
  public async unlock(): Promise<boolean> {
    try {
      this.initContext();
      if (!this.ctx) return false;

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      // Play a 1-sample silent sound buffer to definitively awaken the mobile audio pipeline
      const buffer = this.ctx.createBuffer(1, 1, 22050);
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(this.ctx.destination);
      source.start(0);

      this.hasUnlocked = this.ctx.state === 'running';
      this.updateVolumes();
      return this.hasUnlocked;
    } catch {
      return false;
    }
  }

  public isUnlocked(): boolean {
    return this.hasUnlocked || (this.ctx !== null && this.ctx.state === 'running');
  }

  private ensureContextRunning() {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  private updateVolumes() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const actualMusicVol = this.isMuted ? 0 : this.musicVolumeVal;
    const actualSfxVol = this.isMuted ? 0 : this.sfxVolumeVal;

    if (this.musicGain) {
      this.musicGain.gain.setValueAtTime(actualMusicVol, now);
    }
    if (this.sfxGain) {
      this.sfxGain.gain.setValueAtTime(actualSfxVol, now);
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    this.updateVolumes();
  }

  public setMusicVolume(vol: number) {
    this.musicVolumeVal = Math.max(0, Math.min(1, vol));
    this.updateVolumes();
  }

  public setSfxVolume(vol: number) {
    this.sfxVolumeVal = Math.max(0, Math.min(1, vol));
    this.updateVolumes();
  }

  // ==========================================
  // BIBLE QUIZ SOUND EFFECTS
  // ==========================================

  /**
   * Countdown tick sound (Standard tick and final 5s emphasis tick)
   */
  public playTick(isFinalEmphasis: boolean = false) {
    if (this.isMuted) return;
    this.ensureContextRunning();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = isFinalEmphasis ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(isFinalEmphasis ? 880 : 480, now);
      if (isFinalEmphasis) {
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
      }

      const peakGain = isFinalEmphasis ? 0.35 : 0.18;
      gain.gain.setValueAtTime(peakGain, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (isFinalEmphasis ? 0.22 : 0.09));

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + (isFinalEmphasis ? 0.23 : 0.1));
    } catch {}
  }

  /**
   * Final countdown alert sound when timer reaches 0
   */
  public playFinalCountdownAlert() {
    if (this.isMuted) return;
    this.ensureContextRunning();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      // Dual-pulse alert tone
      [0, 0.15].forEach((delay, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(idx === 0 ? 660 : 880, now + delay);

        gain.gain.setValueAtTime(0.3, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.18);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + delay);
        osc.stop(now + delay + 0.2);
      });
    } catch {}
  }

  /**
   * Gentle UI click when user taps an answer choice (A, B, C, D)
   */
  public playSelectionClick() {
    if (this.isMuted) return;
    this.ensureContextRunning();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(500, now + 0.05);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {}
  }

  /**
   * Correct-answer celebratory chime (joyful ascending major chord)
   */
  public playCorrectAnswer() {
    if (this.isMuted) return;
    this.ensureContextRunning();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      // Bright triumphant arpeggio: C5 (523.25), E5 (659.25), G5 (783.99), C6 (1046.50)
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = idx === 3 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.28, now + 0.02 + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8 + idx * 0.08);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + idx * 0.08);
        osc.stop(now + 0.9 + idx * 0.08);
      });
    } catch {}
  }

  /**
   * Incorrect-answer sound (distinct, gentle descending two-tone cue)
   */
  public playIncorrectAnswer() {
    if (this.isMuted) return;
    this.ensureContextRunning();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      // Descending two-tone: Eb4 (311.13) -> Bb3 (233.08)
      [311.13, 233.08].forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.16);

        // Low-pass filter to keep it warm and respectful, not jarring
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, now + idx * 0.16);

        gain.gain.setValueAtTime(0.18, now + idx * 0.16);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28 + idx * 0.16);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + idx * 0.16);
        osc.stop(now + 0.3 + idx * 0.16);
      });
    } catch {}
  }

  /**
   * General answer reveal chord (used when broadcast/viewer mode reveals answer)
   */
  public playCorrectReveal() {
    if (this.isMuted) return;
    this.ensureContextRunning();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      // Reverent chord: C5, G5, C6
      [523.25, 783.99, 1046.50].forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + (idx * 0.07));

        gain.gain.setValueAtTime(0.001, now + (idx * 0.07));
        gain.gain.linearRampToValueAtTime(0.24, now + 0.03 + (idx * 0.07));
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85 + (idx * 0.07));

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + (idx * 0.07));
        osc.stop(now + 0.95 + (idx * 0.07));
      });
    } catch {}
  }

  /**
   * Question transition sound
   */
  public playTransition() {
    if (this.isMuted) return;
    this.ensureContextRunning();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.28);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.33);
    } catch {}
  }

  /**
   * Milestone fanfare (plays every 10 questions)
   */
  public playMilestone() {
    if (this.isMuted) return;
    this.ensureContextRunning();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      // Celebratory brass/harmonic sequence
      [440, 554.37, 659.25, 880].forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = idx === 3 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now + (idx * 0.1));

        gain.gain.setValueAtTime(0.25, now + (idx * 0.1));
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45 + (idx * 0.1));

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + (idx * 0.1));
        osc.stop(now + 0.55 + (idx * 0.1));
      });
    } catch {}
  }

  /**
   * Grand completion fanfare at the end of the quiz
   */
  public playCompletion() {
    if (this.isMuted) return;
    this.ensureContextRunning();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = idx === 6 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now + (idx * 0.12));

        gain.gain.setValueAtTime(0.3, now + (idx * 0.12));
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2 + (idx * 0.12));

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + (idx * 0.12));
        osc.stop(now + 1.4 + (idx * 0.12));
      });
    } catch {}
  }

  // ==========================================
  // BIBLE VERSE COMPANION STRATEGIC AUDIO CUES
  // ==========================================
  public playHookEntrance() {
    if (this.isMuted) return;
    this.ensureContextRunning();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      [329.63, 493.88].forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.2 + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2 + idx * 0.08);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + idx * 0.08);
        osc.stop(now + 1.3 + idx * 0.08);
      });
    } catch {}
  }

  public playRestrainedTick() {
    if (this.isMuted) return;
    this.ensureContextRunning();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {}
  }

  public playAnticipationCue() {
    if (this.isMuted) return;
    this.ensureContextRunning();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      [349.23, 440.00, 523.25].forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.001, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.15 + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9 + idx * 0.12);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + idx * 0.12);
        osc.stop(now + 1.0 + idx * 0.12);
      });
    } catch {}
  }

  public playScriptureReveal() {
    if (this.isMuted) return;
    this.ensureContextRunning();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      [261.63, 329.63, 392.00, 523.25].forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.001, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.22, now + 0.2 + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6 + idx * 0.06);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + idx * 0.06);
        osc.stop(now + 1.7 + idx * 0.06);
      });
    } catch {}
  }

  public playResponseLift() {
    if (this.isMuted) return;
    this.ensureContextRunning();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      [587.33, 880.00].forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0.18, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6 + idx * 0.1);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + idx * 0.1);
        osc.stop(now + 0.7 + idx * 0.1);
      });
    } catch {}
  }

  public playTakeawayCue() {
    if (this.isMuted) return;
    this.ensureContextRunning();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      [440.00, 659.25, 880.00].forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.2, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2 + idx * 0.08);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + idx * 0.08);
        osc.stop(now + 1.3 + idx * 0.08);
      });
    } catch {}
  }

  // ==========================================
  // AMBIENT BACKGROUND MUSIC
  // ==========================================
  public startBackgroundMusic() {
    if (this.isMusicPlaying) return;
    this.ensureContextRunning();
    this.isMusicPlaying = true;

    const playChordSequence = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.musicGain || this.isMuted) return;
      try {
        const now = this.ctx.currentTime;
        const chords = [
          [261.63, 329.63, 392.00], // C major
          [220.00, 261.63, 329.63], // A minor
          [174.61, 220.00, 261.63], // F major
          [196.00, 246.94, 293.66]  // G major
        ];

        const chord = chords[Math.floor(Math.random() * chords.length)];
        chord.forEach(freq => {
          if (!this.ctx || !this.musicGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.08, now + 1.5);
          gain.gain.linearRampToValueAtTime(0.001, now + 5.5);

          osc.connect(gain);
          gain.connect(this.musicGain);

          osc.start(now);
          osc.stop(now + 6);
        });
      } catch {}
    };

    playChordSequence();
    this.musicInterval = window.setInterval(playChordSequence, 6000);
  }

  public stopBackgroundMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const audioManager = new AudioManager();

