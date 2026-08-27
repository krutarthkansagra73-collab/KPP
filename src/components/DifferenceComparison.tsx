import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Check, AlertCircle, Heart, Zap, Edit3 } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import { audioEngine } from '../utils/audioSynthesizer';

export const DifferenceComparison: React.FC = () => {
  const { config, comparisonRows, setIsStudioOpen, setStudioInitialTab } = useMemory();

  const handleOpenEditor = () => {
    audioEngine.playChime(520, 0.5);
    setStudioInitialTab('text');
    setIsStudioOpen(true);
  };

  return (
    <section id="differences" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#E5E2D9]">
      <div className="text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#E5E2D9] text-[#5A5A40] text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Zap className="w-3.5 h-3.5 text-[#B85D43]" />
          Chapter 4 • The Dynamics
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#2D2D2A]">
          The Difference Between You Two
        </h2>
        <p className="font-handwriting text-2xl sm:text-3xl text-[#5A5A40] font-medium">
          “Let’s be honest…”
        </p>
      </div>

      {/* 3 Main Persona Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Priya */}
        <motion.div
          whileHover={{ y: -5 }}
          className="p-6 rounded-2xl bg-white border border-[#E5E2D9] shadow-md space-y-4 relative"
        >
          <div className="w-12 h-12 rounded-xl bg-[#FAF8F2] border border-[#E5E2D9] flex items-center justify-center text-2xl">
            👑
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-[#5A5A40] font-semibold">Older Sister</span>
            <h3 className="text-2xl font-serif-title font-bold text-[#2D2D2A]">{config.olderSisterName}</h3>
          </div>
          <p className="font-handwriting text-2xl text-[#B85D43] font-medium">
            “{config.olderSisterQuote || "The responsible one."}”
          </p>
          <p className="text-xs text-[#7C7A68] leading-relaxed">
            {config.olderSisterDescription || "Keeps everyone organized, remembers every important date, and makes sure Krutarth doesn't make bad life choices."}
          </p>
        </motion.div>

        {/* Krutarth */}
        <motion.div
          whileHover={{ y: -5 }}
          className="p-6 rounded-2xl bg-[#FAF8F2] border border-[#5A5A40]/40 shadow-md space-y-4 relative"
        >
          <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E2D9] flex items-center justify-center text-2xl">
            🛡️
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-[#B85D43] font-semibold">Brother</span>
            <h3 className="text-2xl font-serif-title font-bold text-[#2D2D2A]">{config.brotherName}</h3>
          </div>
          <p className="font-handwriting text-2xl text-[#5A5A40] font-medium">
            “Somehow stuck in the middle. 😂”
          </p>
          <p className="text-xs text-[#7C7A68] leading-relaxed">
            The bridge between Adelaide and Surat. Will defend both sisters to the end of the earth.
          </p>
        </motion.div>

        {/* Prisha */}
        <motion.div
          whileHover={{ y: -5 }}
          className="p-6 rounded-2xl bg-white border border-[#E5E2D9] shadow-md space-y-4 relative"
        >
          <div className="w-12 h-12 rounded-xl bg-[#FAF8F2] border border-[#E5E2D9] flex items-center justify-center text-2xl">
            🎀
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-[#5A5A40] font-semibold">Younger Sister</span>
            <h3 className="text-2xl font-serif-title font-bold text-[#2D2D2A]">{config.youngerSisterName}</h3>
          </div>
          <p className="font-handwriting text-2xl text-[#B85D43] font-medium">
            “{config.youngerSisterQuote || "The little one."}”
          </p>
          <p className="text-xs text-[#7C7A68] leading-relaxed">
            {config.youngerSisterDescription || "Full of drama, smiles, and endless energy. Gets away with everything just by being cute."}
          </p>
        </motion.div>
      </div>

      {/* Comparison Table / Grid */}
      <div className="bg-white border border-[#E5E2D9] rounded-2xl overflow-hidden shadow-md">
        <div className="p-4 sm:p-6 border-b border-[#E5E2D9] bg-[#FAF8F2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-serif-title text-lg sm:text-xl font-semibold text-[#2D2D2A]">
              Sibling Operations & Dynamics Matrix 😂
            </h4>
            <span className="text-xs text-[#7C7A68] font-sans">100% Certified Family Reality</span>
          </div>

          <button
            onClick={handleOpenEditor}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FAF8F2] border border-[#E5E2D9] text-[#B85D43] text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit / Add Traits</span>
          </button>
        </div>

        <div className="divide-y divide-[#E5E2D9] overflow-x-auto">
          {comparisonRows.map((row) => (
            <div key={row.id} className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-4 gap-3 text-sm hover:bg-[#FAF8F2]/60 transition-colors">
              <div className="font-semibold text-[#5A5A40] md:col-span-1 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B85D43]" />
                {row.trait}
              </div>
              <div className="text-[#5A5A40] text-xs sm:text-sm pl-2 border-l border-[#E5E2D9]">
                <span className="text-xs text-[#7C7A68] block md:hidden mb-0.5">{config.olderSisterName}:</span>
                {row.priya}
              </div>
              <div className="text-[#2D2D2A] font-medium text-xs sm:text-sm pl-2 border-l border-[#E5E2D9] bg-[#FAF8F2]/50 rounded">
                <span className="text-xs text-[#7C7A68] block md:hidden mb-0.5">{config.brotherName}:</span>
                {row.krutarth}
              </div>
              <div className="text-[#5A5A40] text-xs sm:text-sm pl-2 border-l border-[#E5E2D9]">
                <span className="text-xs text-[#7C7A68] block md:hidden mb-0.5">{config.youngerSisterName}:</span>
                {row.prisha}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Heartfelt Synthesis */}
      <div className="mt-12 text-center max-w-2xl mx-auto space-y-4 p-8 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm">
        <p className="text-[#7C7A68] text-base sm:text-lg">
          “Different places. Different ages. Different memories.”
        </p>
        <p className="font-serif-title text-2xl sm:text-3xl text-[#2D2D2A] font-bold">
          Same brother. Same promise.
        </p>
        <p className="font-handwriting text-2xl text-[#B85D43] font-medium">
          “And I wouldn’t trade either of you for the entire world.”
        </p>
      </div>
    </section>
  );
};

