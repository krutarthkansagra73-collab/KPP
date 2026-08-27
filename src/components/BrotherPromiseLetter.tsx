import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, CheckCheck, Edit3 } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import { audioEngine } from '../utils/audioSynthesizer';

export const BrotherPromiseLetter: React.FC = () => {
  const { config, brotherPromises, setIsStudioOpen, setStudioInitialTab } = useMemory();

  const handleOpenEditor = () => {
    audioEngine.playChime(520, 0.5);
    setStudioInitialTab('text');
    setIsStudioOpen(true);
  };

  return (
    <section id="brother-promise" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#E5E2D9]">
      <div className="text-center space-y-3 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#E5E2D9] text-[#5A5A40] text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Heart className="w-3.5 h-3.5 fill-[#B85D43] text-[#B85D43]" />
          Chapter 7 • The Oath
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#2D2D2A]">
          My Promise To You Both
        </h2>
        <p className="text-[#7C7A68] text-sm sm:text-base">
          An unconditional pact from {config.brotherName} to {config.olderSisterName} and {config.youngerSisterName}.
        </p>
      </div>

      {/* Styled Letter Parchment */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative bg-white p-8 sm:p-12 md:p-16 rounded-3xl border border-[#E5E2D9] shadow-xl text-[#2D2D2A] space-y-8 overflow-hidden"
      >
        {/* Letter Date & Salutation */}
        <div className="border-b border-[#E5E2D9] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-[#7C7A68] font-sans">
          <span>RAKSHA BANDHAN • FOREVER VALID</span>
          <div className="flex items-center gap-3">
            <span>FROM: {config.brotherName.toUpperCase()} ➔ TO: {config.olderSisterName.toUpperCase()} & {config.youngerSisterName.toUpperCase()}</span>
            <button
              onClick={handleOpenEditor}
              className="px-2.5 py-1 rounded-full bg-[#FAF8F2] hover:bg-[#F3DBD3]/50 text-[#B85D43] text-xs font-semibold flex items-center gap-1 border border-[#E5E2D9] cursor-pointer"
              title="Edit letter & promises"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>
        </div>

        {/* Letter Body */}
        <div className="space-y-6 text-base sm:text-lg leading-relaxed text-[#5A5A40] font-light">
          <p className="font-serif-title text-2xl sm:text-3xl text-[#2D2D2A] font-semibold italic">
            Dear {config.olderSisterName} & {config.youngerSisterName},
          </p>

          <p>
            {config.brotherLetterPreamble || "I don’t know where life will take all three of us. Maybe we’ll live in different cities, countries, or time zones. But one thing will never change: Your brother will always have your back."}
          </p>

          <div className="space-y-3 p-5 sm:p-6 rounded-2xl bg-[#FAF8F2] border border-[#EAE6DB]">
            {brotherPromises.map((promise) => (
              <div key={promise.id} className="flex items-start gap-3">
                <span className="text-[#5A5A40] font-bold">✓</span>
                <span>
                  <strong>{promise.lead}</strong> {promise.text}{" "}
                  {promise.humorNote && (
                    <em className="text-[#B85D43] font-handwriting text-xl ml-1">
                      {promise.humorNote}
                    </em>
                  )}
                </span>
              </div>
            ))}
          </div>

          <p className="font-handwriting text-3xl sm:text-4xl text-[#B85D43] pt-2 font-medium">
            “That’s my promise. Always.”
          </p>
        </div>

        {/* Signature */}
        <div className="pt-8 border-t border-[#E5E2D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-[#7C7A68] uppercase tracking-wider">Signed with brotherly love</p>
            <p className="font-handwriting text-3xl sm:text-4xl text-[#B85D43] font-medium">
              {config.brotherName}
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F2] border border-[#E5E2D9] text-[#5A5A40] text-xs font-sans shadow-sm">
            <CheckCheck className="w-4 h-4 text-[#5A5A40]" />
            <span>SEALED & PROMISED</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

