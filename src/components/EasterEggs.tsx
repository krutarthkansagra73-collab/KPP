import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, AlertTriangle, X, ShieldAlert } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import { EasterEgg } from '../types';
import confetti from 'canvas-confetti';

export const EasterEggs: React.FC = () => {
  const { easterEggs, activeEasterEgg, triggerEasterEgg } = useMemory();

  const handleTrigger = (egg: EasterEgg) => {
    triggerEasterEgg(egg);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#B85D43', '#5A5A40', '#E5E2D9']
      });
    } catch {
      // silent
    }
  };

  return (
    <>
      {/* Discreet floating / embedded easter egg triggers */}
      <div className="py-12 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-full bg-white border border-[#E5E2D9] text-xs text-[#7C7A68] shadow-sm">
          <span className="font-semibold text-[#5A5A40]">Secret sibling triggers:</span>
          {easterEggs.map(egg => (
            <button
              key={egg.id}
              onClick={() => handleTrigger(egg)}
              className="px-2.5 py-1 rounded-full bg-[#FAF8F2] hover:bg-[#F3DBD3] hover:text-[#B85D43] border border-[#E5E2D9] text-[#5A5A40] text-[11px] font-medium transition-colors cursor-pointer"
            >
              🔒 {egg.triggerLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Easter Egg Popup Modal */}
      <AnimatePresence>
        {activeEasterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => triggerEasterEgg(null)}
          >
            <motion.div
              initial={{ scale: 0.85, rotate: -2 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.85, rotate: 2 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-md w-full bg-white border border-[#E5E2D9] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 text-center text-[#2D2D2A]"
            >
              <button
                onClick={() => triggerEasterEgg(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-[#FAF8F2] text-[#7C7A68] hover:text-[#2D2D2A] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-14 h-14 rounded-full bg-[#F3DBD3] border border-[#B85D43]/30 text-[#B85D43] flex items-center justify-center mx-auto text-2xl">
                ⚠️
              </div>

              <h4 className="text-xl sm:text-2xl font-serif-title font-bold text-[#B85D43]">
                {activeEasterEgg.popupTitle}
              </h4>

              <p className="text-base sm:text-lg text-[#2D2D2A] font-medium">
                {activeEasterEgg.punchline}
              </p>

              {activeEasterEgg.photoUrl && (
                <div className="rounded-xl overflow-hidden aspect-[4/3] bg-[#FAF8F2] border border-[#E5E2D9]">
                  <img
                    src={activeEasterEgg.photoUrl}
                    alt="Secret Easter Egg"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <p className="font-handwriting text-2xl text-[#B85D43]">
                {activeEasterEgg.subtext}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => triggerEasterEgg(null)}
                  className="px-5 py-2 rounded-full bg-[#FAF8F2] border border-[#E5E2D9] hover:bg-[#E5E2D9] text-xs font-semibold text-[#5A5A40] cursor-pointer shadow-sm"
                >
                  Close Surprise 😂
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
