import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import { audioEngine } from '../utils/audioSynthesizer';

export const OpeningSequence: React.FC = () => {
  const { setHasEntered, config, toggleMelody } = useMemory();
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    // Stage pacing
    const timers = [
      setTimeout(() => setStep(1), 1000),  // "Priya..."
      setTimeout(() => setStep(2), 3000),  // "Prisha..."
      setTimeout(() => setStep(3), 5000),  // "I made something for you two."
      setTimeout(() => setStep(4), 8000),  // "I could have just sent a Rakhi message..."
      setTimeout(() => setStep(5), 11000), // "But you're my sisters. You deserve more than that."
      setTimeout(() => setStep(6), 13500), // Button appears
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const handleEnter = () => {
    audioEngine.playChime(587.33, 1.5);
    // start ambient melody gently if enabled
    if (config.enableBackgroundMelody) {
      setTimeout(() => {
        audioEngine.startGentleBackgroundMelody();
      }, 800);
    }
    setHasEntered(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF8F2] text-[#2D2D2A] px-6 selection:bg-[#5A5A40]/20 paper-texture">
      {/* Subtle warm organic glow backdrop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#E5E2D9] rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#F3DBD3] rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 max-w-xl w-full text-center space-y-8 min-h-[380px] flex flex-col justify-center items-center">
        {/* Step 1: Priya */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <span className="font-serif-title text-3xl sm:text-4xl text-[#5A5A40] tracking-wide font-normal">
                {config.olderSisterName}…
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: Prisha */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <span className="font-serif-title text-3xl sm:text-4xl text-[#B85D43] tracking-wide font-normal">
                {config.youngerSisterName}…
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: I made something for you two */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-lg sm:text-xl text-[#5A5A40]/90 font-normal"
            >
              I made something for you two.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Step 4 & 5: Rakhi thought */}
        <div className="space-y-4 pt-2">
          <AnimatePresence>
            {step >= 4 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.85, y: 0 }}
                transition={{ duration: 1 }}
                className="text-base sm:text-lg text-[#7C7A68] italic"
              >
                “I could have just sent a Rakhi message…”
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="space-y-2"
              >
                <p className="text-xl sm:text-2xl font-serif-title text-[#2D2D2A] font-medium">
                  But you’re my sisters.
                </p>
                <p className="text-[#B85D43] font-handwriting text-2xl sm:text-3xl font-semibold">
                  You deserve more than that.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Step 6: CTA Button */}
        <AnimatePresence>
          {step >= 6 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="pt-6"
            >
              <button
                id="opening-enter-button"
                onClick={handleEnter}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#5A5A40] text-[#FAF8F2] font-medium shadow-md shadow-[#5A5A40]/20 hover:bg-[#474732] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-[#EAE6DB] group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-lg tracking-wide">Come with me</span>
                <Heart className="w-5 h-5 fill-[#B85D43] text-[#B85D43] group-hover:scale-125 transition-transform duration-300" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip button in bottom right */}
      <button
        onClick={handleEnter}
        className="absolute bottom-6 right-6 text-xs text-[#7C7A68] hover:text-[#2D2D2A] transition-colors uppercase tracking-widest px-3 py-1.5 rounded border border-[#E5E2D9] hover:border-[#B5B09E] bg-white/70 backdrop-blur-sm"
      >
        Skip intro
      </button>
    </div>
  );
};
