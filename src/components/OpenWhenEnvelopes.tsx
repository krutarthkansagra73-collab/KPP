import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Sparkles, X, CloudRain, Shield, Zap, Smile, Trophy, Plane, Gift, Edit3, Plus } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import { OpenWhenLetter } from '../types';
import { audioEngine } from '../utils/audioSynthesizer';

export const OpenWhenEnvelopes: React.FC = () => {
  const { openWhenLetters, setIsStudioOpen, setStudioInitialTab, config } = useMemory();
  const [selectedLetter, setSelectedLetter] = useState<OpenWhenLetter | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Heart': return <Heart className="w-5 h-5 text-[#B85D43]" />;
      case 'CloudRain': return <CloudRain className="w-5 h-5 text-[#5A5A40]" />;
      case 'Shield': return <Shield className="w-5 h-5 text-[#5A5A40]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#B85D43]" />;
      case 'Smile': return <Smile className="w-5 h-5 text-[#5A5A40]" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-[#B85D43]" />;
      case 'Plane': return <Plane className="w-5 h-5 text-[#5A5A40]" />;
      case 'Gift': return <Gift className="w-5 h-5 text-[#B85D43]" />;
      default: return <Mail className="w-5 h-5 text-[#5A5A40]" />;
    }
  };

  const handleOpenEnvelope = (letter: OpenWhenLetter) => {
    audioEngine.playPaperSound();
    audioEngine.playChime(587.33, 0.7);
    setSelectedLetter(letter);
  };

  const handleOpenLettersEditor = () => {
    audioEngine.playChime(520, 0.5);
    setStudioInitialTab('letters');
    setIsStudioOpen(true);
  };

  return (
    <section id="open-when" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#E5E2D9]">
      <div className="text-center space-y-3 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#E5E2D9] text-[#5A5A40] text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Mail className="w-3.5 h-3.5 text-[#B85D43]" />
          Chapter 9 • Sealed Letters
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#2D2D2A]">
          “Open When…” Envelopes
        </h2>
        <p className="text-[#7C7A68] max-w-xl mx-auto text-sm sm:text-base">
          Emergency envelopes for {config.olderSisterName} & {config.youngerSisterName} to open whenever life calls for brotherly comfort.
        </p>

        <div className="pt-2 flex items-center justify-center">
          <button
            onClick={handleOpenLettersEditor}
            className="px-4 py-2 rounded-full bg-white hover:bg-[#FAF8F2] border border-[#E5E2D9] text-[#B85D43] text-xs font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Customize or Add Letters</span>
          </button>
        </div>
      </div>

      {/* Grid of Envelopes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {openWhenLetters.map((letter, idx) => (
          <motion.div
            key={letter.id}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleOpenEnvelope(letter)}
            className="group relative cursor-pointer p-6 rounded-2xl bg-white border border-[#E5E2D9] hover:border-[#B85D43] shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[220px]"
          >
            {/* Envelope flap visual decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#FAF8F2] border-b border-x border-[#E5E2D9] rounded-b-xl group-hover:bg-[#F3DBD3]/40 transition-colors" />

            {/* Top icon and wax seal */}
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-[#FAF8F2] border border-[#E5E2D9] group-hover:border-[#B85D43]/40 transition-colors">
                {getIcon(letter.iconName)}
              </div>
              <div className="w-7 h-7 rounded-full bg-[#B85D43] text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                💌
              </div>
            </div>

            {/* Title & preview */}
            <div className="my-4 space-y-1">
              <h3 className="font-serif-title text-base sm:text-lg font-bold text-[#2D2D2A] group-hover:text-[#B85D43] transition-colors leading-snug">
                {letter.title}
              </h3>
              <p className="text-xs text-[#7C7A68] line-clamp-2">
                {letter.preview}
              </p>
            </div>

            {/* Bottom prompt */}
            <div className="pt-2 border-t border-[#E5E2D9] flex items-center justify-between text-xs text-[#7C7A68] group-hover:text-[#B85D43]">
              <span className="font-handwriting text-base">Click to unseal</span>
              <span className="text-[10px] uppercase font-sans">Letter #{idx + 1}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Unsealed Letter Modal */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 25 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 25 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-white text-[#2D2D2A] rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#E5E2D9] space-y-6 max-h-[85vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedLetter(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF8F2] hover:bg-[#E5E2D9] text-[#2D2D2A] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Envelope Header / Wax seal simulation */}
              <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4 pr-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#B85D43] text-white flex items-center justify-center shadow-md">
                    💌
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#7C7A68] font-sans">
                      Brother’s Handwritten Note
                    </span>
                    <h3 className="text-2xl font-serif-title font-bold text-[#2D2D2A]">
                      {selectedLetter.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedLetter(null);
                    setStudioInitialTab('letters');
                    setIsStudioOpen(true);
                  }}
                  className="p-2 text-[#B85D43] hover:bg-[#FAF8F2] rounded-lg transition-colors cursor-pointer"
                  title="Edit letter in Studio"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              {/* Photo inside envelope if present */}
              {selectedLetter.photoUrl && (
                <div className="w-full aspect-[16/9] overflow-hidden rounded-xl bg-[#FAF8F2] border border-[#E5E2D9] shadow-sm">
                  <img
                    src={selectedLetter.photoUrl}
                    alt={selectedLetter.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Letter content */}
              <div className="space-y-4">
                {selectedLetter.content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="font-handwriting text-2xl sm:text-3xl text-[#2D2D2A] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Sign-off */}
              <div className="pt-6 border-t border-[#E5E2D9] flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#7C7A68] uppercase tracking-wider font-sans">With love always,</p>
                  <p className="font-handwriting text-3xl text-[#B85D43] font-bold">
                    {config.brotherName}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="px-5 py-2.5 rounded-full bg-[#5A5A40] text-white text-xs font-semibold hover:bg-[#474732] transition-colors cursor-pointer"
                >
                  Fold & Put Back
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

