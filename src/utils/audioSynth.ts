/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class P3AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private compressor: DynamicsCompressorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private gainNode: GainNode | null = null;
  private activeNodes: AudioScheduledSourceNode[] = [];
  private loopInterval: number | null = null;
  private currentStep: number = 0;

  // Granular soundscape volumes (0.0 to 1.0 scale)
  private oceanWashVolume: number = 0.5;
  private sequencerVolume: number = 0.5;
  private oceanGainNode: GainNode | null = null;
  private sequencerGainNode: GainNode | null = null;

  // Soothing minor-seventh ambient chord progression inspired by P3 minor blue moods
  // Chords: D-Minor 7th -> G-Dominant 7th -> C-Major 7th -> A-Minor 7th
  private progressions = [
    [146.83, 174.61, 220.00, 261.63], // Dm7 (D3, F3, A3, C4)
    [196.00, 246.94, 293.66, 349.23], // G7 (G3, B3, D4, F4)
    [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
    [220.00, 261.63, 329.63, 392.00]  // Am7 (A3, C4, E4, G4)
  ];

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  private start() {
    try {
      console.log("[Audio Synth] Initializing Persona 3 Velvet-Ambient synthesizer...");
      
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) {
        console.warn('[Audio Synth] Web Audio API is not supported in this browser.');
        return;
      }

      this.ctx = new AudioCtxClass();
      this.isPlaying = true;

      // Master output setup
      this.compressor = this.ctx.createDynamicsCompressor();
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.38, this.ctx.currentTime); // Standard comfortable volume

      // Setup Granular Gains
      this.sequencerGainNode = this.ctx.createGain();
      this.sequencerGainNode.gain.setValueAtTime(this.sequencerVolume, this.ctx.currentTime);
      this.sequencerGainNode.connect(this.gainNode);

      // Connector flow
      this.gainNode.connect(this.filter);
      this.filter.connect(this.compressor);
      this.compressor.connect(this.ctx.destination);

      const runSchedule = () => {
        if (!this.isPlaying || !this.ctx) return;
        console.log("[Audio Synth] AudioContext state is active. Initializing soundscapes.");
        
        // Program 1: Trigger the ambient ocean wave wash
        this.startOceanWash();

        // Program 2: Trigger our melodic loop sequencer
        this.currentStep = 0;
        this.playSequencerTick();
        
        this.loopInterval = window.setInterval(() => {
          this.playSequencerTick();
        }, 4500);
      };

      if (this.ctx.state === 'suspended') {
        console.log("[Audio Synth] AudioContext is suspended. Attending resume trigger...");
        this.ctx.resume().then(() => {
          runSchedule();
        }).catch(err => {
          console.error("[Audio Synth] Failed to resume AudioContext:", err);
          runSchedule();
        });
      } else {
        runSchedule();
      }

    } catch (err) {
      console.error('[Audio Synth] Failed to initialize Azure Protocol Synthesizer:', err);
    }
  }

  private stop() {
    console.log("[Audio Synth] Shutting down synthesizer...");
    this.isPlaying = false;
    
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
      this.loopInterval = null;
    }

    this.activeNodes.forEach(node => {
      try {
        node.stop();
      } catch (e) {
        // Suppress errors for nodes already stopped
      }
    });
    this.activeNodes = [];

    // Reset gain nodes references
    this.oceanGainNode = null;
    this.sequencerGainNode = null;

    if (this.ctx) {
      this.ctx.close().then(() => {
        this.ctx = null;
        console.log("[Audio Synth] AudioContext closed successfully.");
      });
    }
  }

  // Generates a soft periodic white-noise wave rolling in the background
  private startOceanWash() {
    if (!this.ctx || !this.gainNode) return;

    this.oceanGainNode = this.ctx.createGain();
    this.oceanGainNode.gain.setValueAtTime(this.oceanWashVolume, this.ctx.currentTime);
    this.oceanGainNode.connect(this.gainNode);

    const bufferSize = this.ctx.sampleRate * 4; // 4 seconds of buffer noise
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = buffer;
    noiseNode.loop = true;

    // Filter white noise to sound like deep water wash
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(250, this.ctx.currentTime);
    noiseFilter.Q.setValueAtTime(0.8, this.ctx.currentTime);

    // LFO modulate the wave gain to simulate rolling swell
    const lowFreqOsc = this.ctx.createOscillator();
    lowFreqOsc.frequency.setValueAtTime(0.12, this.ctx.currentTime); // extremely slow swell 8-sec cycle

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    // Connect LFO modulator
    lowFreqOsc.connect(lfoGain);
    
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.03, this.ctx.currentTime);
    lfoGain.connect(noiseGain.gain);

    // Flow
    noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.oceanGainNode || this.gainNode);

    // Save and ignite
    noiseNode.start(0);
    lowFreqOsc.start(0);

    this.activeNodes.push(noiseNode);
    this.activeNodes.push(lowFreqOsc);
  }

  // Plays a beautiful minor 7th electric synth pad chord block
  private playSequencerTick() {
    if (!this.ctx || !this.gainNode || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    const notes = this.progressions[this.currentStep];
    console.log(`[Audio Synth] Sequencer step ${this.currentStep} triggering chord pads...`);

    notes.forEach((freq) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      // Use a warm triangle wave for the classic underwater P3 vibe
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Low pass filter envelope specific to the note pad
      const noteFilter = this.ctx.createBiquadFilter();
      noteFilter.type = 'lowpass';
      noteFilter.frequency.setValueAtTime(300, now);
      noteFilter.frequency.linearRampToValueAtTime(1000, now + 1.2);
      noteFilter.frequency.linearRampToValueAtTime(200, now + 4.2);

      // Soft envelope (Slow attack, long decay tail)
      oscGain.gain.setValueAtTime(0.0001, now);
      oscGain.gain.linearRampToValueAtTime(0.07, now + 1.5); // Warm slow entry
      oscGain.gain.linearRampToValueAtTime(0.0001, now + 4.4);

      // Flow
      osc.connect(noteFilter);
      noteFilter.connect(oscGain);
      oscGain.connect(this.sequencerGainNode || this.gainNode!);

      osc.start(now);
      osc.stop(now + 4.5);
    });

    // Synthesize bubble pop sounds randomly during transition steps
    this.triggerBubbleSynthesizer(now + 0.8);
    this.triggerBubbleSynthesizer(now + 2.2);
    this.triggerBubbleSynthesizer(now + 3.5);

    // Cycle steps state
    this.currentStep = (this.currentStep + 1) % this.progressions.length;
  }

  // Custom high-frequency wet droplet synthesizer
  private triggerBubbleSynthesizer(time: number) {
    if (!this.ctx || !this.gainNode) return;

    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();

    osc.type = 'sine';
    
    // Random bubble harmonic frequency
    const baseFreq = 800 + Math.random() * 1200;
    osc.frequency.setValueAtTime(baseFreq, time);
    osc.frequency.linearRampToValueAtTime(baseFreq * 2.5, time + 0.08);

    oscGain.gain.setValueAtTime(0.0001, time);
    oscGain.gain.linearRampToValueAtTime(0.018, time + 0.01);
    oscGain.gain.linearRampToValueAtTime(0.0001, time + 0.08);

    osc.connect(oscGain);
    oscGain.connect(this.gainNode);

    osc.start(time);
    osc.stop(time + 0.1);
  }

  // Getters & Setters for granular volumes (values between 0.0 and 1.0)
  public setOceanWashVolume(value: number) {
    this.oceanWashVolume = Math.max(0, Math.min(1, value));
    if (this.oceanGainNode && this.ctx) {
      try {
        this.oceanGainNode.gain.setValueAtTime(this.oceanWashVolume, this.ctx.currentTime);
      } catch (e) {
        console.warn("[Audio Synth] Failed to set ocean wash volume:", e);
      }
    }
  }

  public getOceanWashVolume(): number {
    return this.oceanWashVolume;
  }

  public setSequencerVolume(value: number) {
    this.sequencerVolume = Math.max(0, Math.min(1, value));
    if (this.sequencerGainNode && this.ctx) {
      try {
        this.sequencerGainNode.gain.setValueAtTime(this.sequencerVolume, this.ctx.currentTime);
      } catch (e) {
        console.warn("[Audio Synth] Failed to set sequencer volume:", e);
      }
    }
  }

  public getSequencerVolume(): number {
    return this.sequencerVolume;
  }
}

export const azureMusicDevice = new P3AudioEngine();
