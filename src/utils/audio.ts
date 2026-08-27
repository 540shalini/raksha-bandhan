// Web Audio API Sound Synthesizer for Meditative Ambient & Interactive Sound FX

class SoundManager {
  private ctx: AudioContext | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isPlayingAmbient: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft Indian Meditative Drone (Tanpura/Flute-like ambient harmonic drone)
  public toggleAmbientMusic(enable?: boolean): boolean {
    this.initContext();
    if (!this.ctx) return false;

    const shouldPlay = enable !== undefined ? enable : !this.isPlayingAmbient;

    if (shouldPlay) {
      if (this.isPlayingAmbient) return true;

      // Base drone frequency: Sa (C3 ~ 130.81Hz) and Pa (G3 ~ 196.00Hz)
      const rootFreq = 130.81;
      const fifthFreq = 196.00;

      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      // Low pass filter for soft warm sound
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);

      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(rootFreq, this.ctx.currentTime);

      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(fifthFreq, this.ctx.currentTime);

      // Subtle LFO for breathing drone volume modulation
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.15, this.ctx.currentTime); // slow pulse
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(0.03, this.ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(masterGain.gain);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      lfo.start();

      this.ambientOsc1 = osc1;
      this.ambientOsc2 = osc2;
      this.ambientGain = masterGain;
      this.isPlayingAmbient = true;
      return true;
    } else {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
        setTimeout(() => {
          this.ambientOsc1?.stop();
          this.ambientOsc2?.stop();
          this.ambientOsc1?.disconnect();
          this.ambientOsc2?.disconnect();
          this.isPlayingAmbient = false;
        }, 1000);
      } else {
        this.isPlayingAmbient = false;
      }
      return false;
    }
  }

  // Play Sacred Temple Bell Chime Sound FX
  public playTempleBell() {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Bell harmonic frequencies (high pitch metallic ring)
    osc.frequency.setValueAtTime(880, now); // A5 note
    osc.frequency.exponentialRampToValueAtTime(440, now + 1.5);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 2.5);
  }

  // Sparkle / Blessing Sound FX on Rakhi Tie
  public playBlessingSparkle() {
    this.initContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C E G C E arpeggio
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.6);
    });
  }

  public getIsPlayingAmbient(): boolean {
    return this.isPlayingAmbient;
  }
}

export const soundManager = new SoundManager();
