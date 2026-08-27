import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Gift, Check, Flame } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import { audioEngine } from '../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

export const VirtualRakhiCeremony: React.FC = () => {
  const { config } = useMemory();
  const [rakhiStyle, setRakhiStyle] = useState<'traditional' | 'golden' | 'peacock'>('traditional');
  const [isTied, setIsTied] = useState(false);
  const [showGift, setShowGift] = useState(false);

  const handleTieRakhi = () => {
    audioEngine.playChime(659.25, 1.5);
    setIsTied(true);

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#B85D43', '#5A5A40', '#E5E2D9', '#C77D67']
      });
    } catch {
      // silent
    }
  };

  const handleOpenGift = () => {
    audioEngine.playPaperSound();
    audioEngine.playChime(880, 1.2);
    setShowGift(true);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#E5E2D9] text-center">
      <div className="space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#E5E2D9] text-[#5A5A40] text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Flame className="w-3.5 h-3.5 text-[#B85D43]" />
          The Sacred Thread • Interactive
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#2D2D2A]">
          Tie A Digital Rakhi On {config.brotherName}
        </h2>
        <p className="text-[#7C7A68] max-w-lg mx-auto text-sm sm:text-base">
          Whether you’re across the world in {config.olderSisterLocation || 'Adelaide'} or right here in {config.youngerSisterLocation || 'Surat'}, our thread of love is unbroken.
        </p>
      </div>

      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E5E2D9] shadow-xl space-y-8 max-w-2xl mx-auto">
        {!isTied ? (
          <div className="space-y-6">
            <span className="text-xs uppercase font-sans text-[#7C7A68] font-semibold block">
              Step 1: Choose your Rakhi design
            </span>

            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setRakhiStyle('traditional')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  rakhiStyle === 'traditional'
                    ? 'bg-[#F3DBD3] border-[#B85D43] text-[#B85D43] scale-105 shadow-sm'
                    : 'bg-[#FAF8F2] border-[#E5E2D9] text-[#5A5A40]'
                }`}
              >
                <span className="text-3xl block mb-1">🧶</span>
                <span className="text-xs font-semibold block">Crimson Silk</span>
              </button>

              <button
                onClick={() => setRakhiStyle('golden')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  rakhiStyle === 'golden'
                    ? 'bg-[#F3DBD3] border-[#B85D43] text-[#B85D43] scale-105 shadow-sm'
                    : 'bg-[#FAF8F2] border-[#E5E2D9] text-[#5A5A40]'
                }`}
              >
                <span className="text-3xl block mb-1">✨</span>
                <span className="text-xs font-semibold block">Golden Zari</span>
              </button>

              <button
                onClick={() => setRakhiStyle('peacock')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  rakhiStyle === 'peacock'
                    ? 'bg-[#F3DBD3] border-[#B85D43] text-[#B85D43] scale-105 shadow-sm'
                    : 'bg-[#FAF8F2] border-[#E5E2D9] text-[#5A5A40]'
                }`}
              >
                <span className="text-3xl block mb-1">🦚</span>
                <span className="text-xs font-semibold block">Royal Feather</span>
              </button>
            </div>

            <div className="pt-4">
              <button
                id="tie-rakhi-button"
                onClick={handleTieRakhi}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#B85D43] hover:bg-[#a14f37] text-white font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform" />
                <span>Tie Rakhi on Krutarth’s Wrist 💖</span>
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Tied Wrist Representation */}
            <div className="w-24 h-24 rounded-full bg-[#FAF8F2] border border-[#E5E2D9] text-[#B85D43] flex items-center justify-center mx-auto text-4xl shadow-md animate-float">
              {rakhiStyle === 'traditional' ? '🧶' : rakhiStyle === 'golden' ? '✨' : '🦚'}
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#2D2D2A]">
                Rakhi Successfully Tied! ❤️
              </h3>
              <p className="font-handwriting text-2xl sm:text-3xl text-[#B85D43]">
                “May our bond remain protected, joyous, and eternal.”
              </p>
            </div>

            {/* Brother's Return Gift Button */}
            {!showGift ? (
              <div className="pt-2">
                <button
                  onClick={handleOpenGift}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#5A5A40] hover:bg-[#474732] text-white font-semibold text-sm shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  <Gift className="w-4 h-4 animate-bounce" />
                  <span>Open Brother’s Return Gift Envelope 🎁</span>
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-[#FAF8F2] border border-[#E5E2D9] text-left space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between text-xs text-[#B85D43] font-sans">
                  <span>BROTHER'S OFFICIAL VOUCHER</span>
                  <span>LIFETIME VALIDITY</span>
                </div>

                <h4 className="text-xl font-serif-title font-bold text-[#2D2D2A]">
                  🎁 The Krutarth Sibling Perks Package
                </h4>

                <ul className="space-y-2 text-sm text-[#5A5A40] font-light">
                  <li className="flex items-center gap-2">
                    <span className="text-[#5A5A40] font-bold">✓</span>
                    <span><strong>100% Blame Absorption:</strong> Krutarth takes the blame in front of parents anytime.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#5A5A40] font-bold">✓</span>
                    <span><strong>Midnight Snack Delivery:</strong> Guaranteed food whenever requested.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#5A5A40] font-bold">✓</span>
                    <span><strong>Adelaide ↔ Surat Emergency Hotline:</strong> Instant reply guarantee.</span>
                  </li>
                </ul>

                <p className="font-handwriting text-2xl text-[#B85D43] text-center pt-2">
                  Love you both endlessly! — Krutarth
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};
