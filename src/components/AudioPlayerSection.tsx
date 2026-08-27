import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mic, Play, Pause, RotateCcw, Volume2, Upload, Sparkles, CheckCircle2, Square } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import { audioEngine } from '../utils/audioSynthesizer';

export const AudioPlayerSection: React.FC = () => {
  const { config, updateConfig } = useMemory();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(config.customVoiceNoteUrl || null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthPlaybackIntervalRef = useRef<number | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (synthPlaybackIntervalRef.current) {
        clearInterval(synthPlaybackIntervalRef.current);
      }
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      // Pause
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (synthPlaybackIntervalRef.current) {
        clearInterval(synthPlaybackIntervalRef.current);
        synthPlaybackIntervalRef.current = null;
      }
    } else {
      // Play
      setIsPlaying(true);
      audioEngine.playChime(523.25, 0.5);

      if (recordedAudioUrl && audioRef.current) {
        audioRef.current.play().catch(() => {
          // fallback to simulated audio playback with progress bar
        });
      } else {
        // Play simulated voice note chords & progress bar
        let currentSec = 0;
        const totalSec = 102; // 1:42

        synthPlaybackIntervalRef.current = window.setInterval(() => {
          currentSec += 1;
          setProgress((currentSec / totalSec) * 100);

          // gentle warmth note every 4s during playback
          if (currentSec % 4 === 0) {
            audioEngine.playChime(440 + (currentSec % 3) * 50, 1.0);
          }

          if (currentSec >= totalSec) {
            setIsPlaying(false);
            setProgress(0);
            if (synthPlaybackIntervalRef.current) clearInterval(synthPlaybackIntervalRef.current);
          }
        }, 1000);
      }
    }
  };

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = event => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);
        updateConfig({ customVoiceNoteUrl: audioUrl });
        audioEngine.playChime(659.25, 1);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      audioEngine.playChime(440, 0.4);
    } catch {
      alert("Microphone access is needed to record a voice message, or you can upload an audio file directly.");
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setRecordedAudioUrl(url);
      updateConfig({ customVoiceNoteUrl: url });
      audioEngine.playChime(659.25, 1);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#E5E2D9]">
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#E5E2D9] text-[#5A5A40] text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Mic className="w-3.5 h-3.5 text-[#B85D43]" />
          Chapter 10 • Brother’s Voice
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#2D2D2A]">
          Some Things Are Better Heard Than Read
        </h2>
        <p className="text-[#7C7A68] max-w-lg mx-auto text-sm sm:text-base">
          Whenever reading this isn’t enough… press play.
        </p>
      </div>

      {/* Audio Player Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E5E2D9] shadow-xl space-y-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Play / Pause big button */}
            <button
              onClick={handleTogglePlay}
              className="w-16 h-16 rounded-full bg-[#B85D43] text-white flex items-center justify-center shadow-lg hover:bg-[#a14f37] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-white text-white" />
              ) : (
                <Play className="w-7 h-7 fill-white text-white ml-1" />
              )}
            </button>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#B85D43] font-sans font-semibold">
                Voice Note From Krutarth
              </span>
              <h3 className="text-xl sm:text-2xl font-serif-title text-[#2D2D2A] font-bold">
                “For Priya & Prisha”
              </h3>
              <p className="text-xs text-[#7C7A68] font-sans">
                {config.voiceNoteDuration || '1:42'} • Recorded with brotherly love
              </p>
            </div>
          </div>

          {/* Record / Upload Options */}
          <div className="flex items-center gap-2">
            {isRecording ? (
              <button
                onClick={stopVoiceRecording}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#B85D43] text-white text-xs font-semibold animate-pulse cursor-pointer shadow-sm"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>Stop Recording</span>
              </button>
            ) : (
              <button
                onClick={startVoiceRecording}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F2] border border-[#E5E2D9] text-[#5A5A40] hover:text-[#2D2D2A] hover:border-[#B5B09E] text-xs transition-colors cursor-pointer shadow-sm"
                title="Record your real voice note right here in browser"
              >
                <Mic className="w-3.5 h-3.5 text-[#B85D43]" />
                <span>Record New</span>
              </button>
            )}

            <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F2] border border-[#E5E2D9] text-[#5A5A40] hover:text-[#2D2D2A] hover:border-[#B5B09E] text-xs transition-colors cursor-pointer shadow-sm">
              <Upload className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>Upload Audio</span>
              <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Animated Waveform Visualizer */}
        <div className="space-y-3">
          <div className="h-16 flex items-center justify-between gap-1 sm:gap-1.5 px-3 bg-[#FAF8F2] rounded-xl border border-[#EAE6DB]">
            {Array.from({ length: 36 }).map((_, i) => {
              const baseHeight = Math.sin(i * 0.3) * 20 + 26;
              const isBarActive = (i / 36) * 100 <= progress;

              return (
                <motion.div
                  key={i}
                  animate={
                    isPlaying
                      ? {
                          height: [baseHeight * 0.4, baseHeight * 1.2, baseHeight * 0.6],
                        }
                      : { height: baseHeight * 0.6 }
                  }
                  transition={{
                    duration: 0.6 + (i % 5) * 0.1,
                    repeat: isPlaying ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                  className={`w-1 sm:w-1.5 rounded-full transition-colors ${
                    isBarActive
                      ? 'bg-[#B85D43] shadow-sm'
                      : 'bg-[#E5E2D9]'
                  }`}
                />
              );
            })}
          </div>

          {/* Progress Time & Status */}
          <div className="flex items-center justify-between text-xs text-[#7C7A68] font-sans">
            <span>{isPlaying ? 'Playing brother’s note…' : 'Ready to listen'}</span>
            <span>{config.voiceNoteDuration || '1:42'}</span>
          </div>
        </div>

        {recordedAudioUrl && (
          <audio
            ref={audioRef}
            src={recordedAudioUrl}
            onTimeUpdate={() => {
              if (audioRef.current) {
                const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
                setProgress(p);
              }
            }}
            onEnded={() => {
              setIsPlaying(false);
              setProgress(0);
            }}
          />
        )}
      </div>
    </section>
  );
};
