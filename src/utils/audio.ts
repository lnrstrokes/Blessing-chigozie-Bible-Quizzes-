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

  private initContext() {
    if (!this.ctx) {
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
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private updateVolumes() {
    if (this.musicGain && this.sfxGain) {
      const actualMusicVol = this.isMuted ? 0 : this.musicVolumeVal;
      const actualSfxVol = this.isMuted ? 0 : this.sfxVolumeVal;
      this.musicGain.gain.setValueAtTime(actualMusicVol, this.ctx?.currentTime || 0);
      this.sfxGain.gain.setValueAtTime(actualSfxVol, this.ctx?.currentTime || 0);
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

  // Sound Effects
  public playTick(isFinalEmphasis: boolean = false) {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = isFinalEmphasis ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(isFinalEmphasis ? 880 : 440, this.ctx.currentTime);
      if (isFinalEmphasis) {
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.1);
      }

      gain.gain.setValueAtTime(isFinalEmphasis ? 0.4 : 0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (isFinalEmphasis ? 0.25 : 0.1));

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + (isFinalEmphasis ? 0.25 : 0.1));
    } catch {
      // Audio context error fallback
    }
  }

  public playTransition() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {}
  }

  public playCorrectReveal() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      // Triumphant chord (C5, G5, C6)
      [523.25, 783.99, 1046.50].forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + (idx * 0.06));

        gain.gain.setValueAtTime(0, now);
        gain.gain.setValueAtTime(0.2, now + (idx * 0.06));
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8 + (idx * 0.06));

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + (idx * 0.06));
        osc.stop(now + 0.9 + (idx * 0.06));
      });
    } catch {}
  }

  public playMilestone() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      [440, 554.37, 659.25, 880].forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + (idx * 0.1));

        gain.gain.setValueAtTime(0.25, now + (idx * 0.1));
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4 + (idx * 0.1));

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + (idx * 0.1));
        osc.stop(now + 0.5 + (idx * 0.1));
      });
    } catch {}
  }

  public playCompletion() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      // Grand completion fanfare
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

  // Background Ambient Looping Music (Gentle warm contemplative chords)
  public startBackgroundMusic() {
    if (this.isMusicPlaying) return;
    this.initContext();
    this.isMusicPlaying = true;

    const playChordSequence = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.musicGain) return;
      try {
        const now = this.ctx.currentTime;
        // Warm contemplative chords (C Major / F Major / A minor / G Major progression)
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
