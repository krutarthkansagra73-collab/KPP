// Ambient and interactive Web Audio synthesis engine for emotional sibling warmth

class SiblingAudioEngine {
  private ctx: AudioContext | null = null;
  private melodyInterval: number | null = null;
  private isMelodyPlaying: boolean = false;
  private gainNode: GainNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft acoustic warmth chime (Pentatonic chord C, E, G, B, D)
  playChime(freq = 523.25, duration = 1.2) {
    try {
      this.initCtx();
      if (!this.ctx) return;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration * 0.1);

      gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // ignore audio context restrictions before user gesture
    }
  }

  // Paper flip / envelope unseal sound
  playPaperSound() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      
      // Noise buffer for gentle paper rustle
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch {
      // silent fail
    }
  }

  // Phone ringing simulator (US/AU/India standard soft warble)
  playPhoneRing() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.value = 440;
      osc2.frequency.value = 480;

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime + 1.2);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.4);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(this.ctx.currentTime + 1.4);
      osc2.stop(this.ctx.currentTime + 1.4);
    } catch {
      // silent
    }
  }

  // Memory Jar Pop sound
  playJarPop() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playChime(freq, 0.8);
        }, idx * 70);
      });
    } catch {
      // silent
    }
  }

  // Gentle Background Piano / Lofi Chords Generator
  startGentleBackgroundMelody() {
    if (this.isMelodyPlaying) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      this.isMelodyPlaying = true;

      // Warm peaceful chords (D major - A major - B minor - G major)
      const chordProgression = [
        [293.66, 369.99, 440.00, 587.33], // D Maj
        [220.00, 277.18, 329.63, 440.00], // A Maj
        [246.94, 293.66, 369.99, 493.88], // B min
        [196.00, 246.94, 293.66, 392.00]  // G Maj
      ];

      let chordIndex = 0;

      const playCurrentChord = () => {
        if (!this.isMelodyPlaying || !this.ctx) return;
        const currentChord = chordProgression[chordIndex % chordProgression.length];
        chordIndex++;

        currentChord.forEach((freq, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          // gentle detuning for warmth
          osc.frequency.setValueAtTime(freq + (Math.random() * 0.8 - 0.4), this.ctx.currentTime);

          const startTime = this.ctx.currentTime + i * 0.15;
          const duration = 5.5;

          gain.gain.setValueAtTime(0.0001, startTime);
          gain.gain.linearRampToValueAtTime(0.025, startTime + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(startTime);
          osc.stop(startTime + duration);
        });
      };

      playCurrentChord();
      this.melodyInterval = window.setInterval(playCurrentChord, 6000);
    } catch {
      // silent
    }
  }

  stopGentleBackgroundMelody() {
    this.isMelodyPlaying = false;
    if (this.melodyInterval !== null) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }
  }

  get isPlayingMelody() {
    return this.isMelodyPlaying;
  }
}

export const audioEngine = new SiblingAudioEngine();
