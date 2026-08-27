import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, PhoneCall, Heart, Sparkles, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import { audioEngine } from '../utils/audioSynthesizer';

export const JustCallHotline: React.FC = () => {
  const { config } = useMemory();
  const [isActive, setIsActive] = useState(false);
  const [sequenceStep, setSequenceStep] = useState(0);

  const handleTriggerHotline = () => {
    if (isActive) return;
    setIsActive(true);
    setSequenceStep(1);
    audioEngine.playPhoneRing();

    setTimeout(() => {
      setSequenceStep(2);
    }, 1500);

    setTimeout(() => {
      setSequenceStep(3);
    }, 3000);

    setTimeout(() => {
      setSequenceStep(4);
      audioEngine.playChime(659.25, 1.2);
    }, 4500);

    setTimeout(() => {
      setSequenceStep(5);
      audioEngine.playChime(880, 2);
    }, 6200);
  };

  const handleReset = () => {
    setIsActive(false);
    setSequenceStep(0);
  };

  return (
    <section id="just-call-hotline" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#E5E2D9]">
      <div className="relative p-8 sm:p-14 rounded-3xl bg-white border border-[#E5E2D9] shadow-xl text-center space-y-8 overflow-hidden">
        <div className="space-y-3 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF8F2] border border-[#E5E2D9] text-[#5A5A40] text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-sm">
            <Phone className="w-3.5 h-3.5 text-[#B85D43]" />
            24/7 Sibling Lifeline
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif-title font-bold text-[#2D2D2A]">
            The “Just Call” Promise
          </h2>
          <p className="text-[#7C7A68] max-w-xl mx-auto text-sm sm:text-base">
            No matter the hour, no matter how small or big the problem is.
          </p>
        </div>

        {/* Big Signature Button */}
        {!isActive && (
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="pt-4 relative z-10"
          >
            <button
              id="just-call-big-button"
              onClick={handleTriggerHotline}
              className="group relative inline-flex items-center gap-4 px-10 sm:px-14 py-6 sm:py-7 rounded-full bg-[#B85D43] text-white font-bold text-xl sm:text-3xl shadow-xl hover:bg-[#a14f37] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <div className="p-2 sm:p-3 rounded-full bg-white/20 group-hover:rotate-12 transition-transform">
                <PhoneCall className="w-6 h-6 sm:w-8 sm:h-8 animate-bounce" />
              </div>
              <span className="tracking-wide">📞 JUST CALL</span>
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 fill-white text-white group-hover:scale-125 transition-transform" />
            </button>
            <p className="text-xs text-[#7C7A68] mt-4 font-sans">
              Press to activate Krutarth’s sibling lifeline demonstration
            </p>
          </motion.div>
        )}

        {/* Cinematic Step Pacing */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="py-6 space-y-6 relative z-10 max-w-2xl mx-auto"
            >
              <div className="space-y-4">
                {sequenceStep >= 1 && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl sm:text-2xl font-serif-title text-[#2D2D2A]"
                  >
                    You don’t need a reason.
                  </motion.p>
                )}

                {sequenceStep >= 2 && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl sm:text-2xl font-serif-title text-[#5A5A40]"
                  >
                    You don’t need the perfect words.
                  </motion.p>
                )}

                {sequenceStep >= 3 && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl sm:text-2xl font-serif-title text-[#7C7A68]"
                  >
                    You don’t even need to know what to say.
                  </motion.p>
                )}

                {sequenceStep >= 4 && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-2xl sm:text-4xl font-serif-title text-[#B85D43] font-bold"
                  >
                    Just call.
                  </motion.p>
                )}

                {sequenceStep >= 5 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="pt-4 space-y-4"
                  >
                    <div className="p-6 rounded-2xl bg-[#FAF8F2] border border-[#5A5A40]/30 shadow-lg space-y-3">
                      <div className="flex items-center justify-center gap-2 text-[#5A5A40] font-serif-title text-2xl sm:text-3xl font-bold">
                        <CheckCircle2 className="w-7 h-7 text-[#5A5A40]" />
                        <span>Your brother will answer. ❤️</span>
                      </div>
                      <p className="font-handwriting text-2xl text-[#B85D43] font-medium">
                        In your rights. In your wrongs. Always.
                      </p>

                      {/* Direct phone / WhatsApp link buttons if phone configured */}
                      {config.brotherPhone && (
                        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                          <a
                            href={`tel:${config.brotherPhone.replace(/\s+/g, '')}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5A5A40] hover:bg-[#474732] text-white text-sm font-semibold transition-colors shadow-sm"
                          >
                            <Phone className="w-4 h-4" />
                            <span>Dial Krutarth ({config.brotherPhone})</span>
                          </a>

                          <a
                            href={`https://wa.me/${config.brotherPhone.replace(/[^0-9]/g, '')}?text=Hey%20Krutarth,%20calling%20my%20brother%20from%20our%20Raksha%20Bandhan%20memory%20book!%20❤️`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF8F2] border border-[#E5E2D9] text-[#5A5A40] text-sm font-medium transition-colors shadow-sm"
                          >
                            <MessageSquare className="w-4 h-4 text-[#5A5A40]" />
                            <span>WhatsApp Krutarth</span>
                          </a>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleReset}
                      className="text-xs text-[#7C7A68] hover:text-[#2D2D2A] underline mt-2 cursor-pointer"
                    >
                      Close sequence
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
