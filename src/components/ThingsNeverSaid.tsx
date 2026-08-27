import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, ChevronRight, Check, Edit3 } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import { audioEngine } from '../utils/audioSynthesizer';

export const ThingsNeverSaid: React.FC = () => {
  const { thingsNeverSaid, setIsStudioOpen, setStudioInitialTab } = useMemory();
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  const items = thingsNeverSaid && thingsNeverSaid.length > 0 ? thingsNeverSaid : [
    { id: 'def', quote: "I really do love you both.", detail: "More than all the silly arguments in the world." }
  ];

  const safeIndex = activeCardIndex % items.length;

  const handleNext = () => {
    audioEngine.playPaperSound();
    setActiveCardIndex(prev => (prev + 1) % items.length);
  };

  const handleSelect = (idx: number) => {
    audioEngine.playPaperSound();
    setActiveCardIndex(idx);
  };

  const handleOpenEditor = () => {
    audioEngine.playChime(520, 0.5);
    setStudioInitialTab('text');
    setIsStudioOpen(true);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#E5E2D9]">
      <div className="text-center space-y-3 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#E5E2D9] text-[#5A5A40] text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Heart className="w-3.5 h-3.5 fill-[#B85D43] text-[#B85D43]" />
          Chapter 6 • Vulnerability
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#2D2D2A]">
          Things I Never Say Out Loud
        </h2>
        <p className="text-[#7C7A68] max-w-xl mx-auto text-sm sm:text-base">
          Because between making jokes and teasing you, sometimes the most important words get left unsaid.
        </p>
      </div>

      {/* Interactive Sticky Note Deck */}
      <div className="max-w-2xl mx-auto">
        <div className="relative min-h-[280px] sm:min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={items[safeIndex].id || safeIndex}
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full p-8 sm:p-10 rounded-2xl bg-white text-[#2D2D2A] shadow-xl relative border border-[#E5E2D9]"
            >
              {/* Tape corner */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape-terracotta z-10 transform -rotate-1" />

              <div className="space-y-4 text-center">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-[#7C7A68] font-sans font-semibold">
                    Note #{safeIndex + 1} of {items.length}
                  </span>

                  <button
                    onClick={handleOpenEditor}
                    className="text-[11px] text-[#B85D43] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit Notes</span>
                  </button>
                </div>

                <h3 className="font-handwriting text-3xl sm:text-4xl text-[#2D2D2A] leading-snug">
                  “{items[safeIndex].quote}”
                </h3>

                <p className="text-sm sm:text-base text-[#5A5A40] font-sans max-w-md mx-auto leading-relaxed pt-2">
                  {items[safeIndex].detail}
                </p>

                <div className="pt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5A5A40] text-white text-xs sm:text-sm font-medium hover:bg-[#474732] transition-colors shadow-md cursor-pointer"
                  >
                    <span>Next Note</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                safeIndex === idx
                  ? 'bg-[#B85D43] scale-125'
                  : 'bg-[#E5E2D9] hover:bg-[#B5B09E]'
              }`}
              title={`View note ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

