import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, HelpCircle, Frown, Smile, Phone, Shield, Gift, Camera, Upload } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import { audioEngine } from '../utils/audioSynthesizer';
import { compressImageFile } from '../utils/imageCompressor';

export const PrishaSection: React.FC = () => {
  const { config, updateConfig, setIsStudioOpen, setStudioInitialTab } = useMemory();
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const [isUploadingBaby, setIsUploadingBaby] = useState(false);
  const [isUploadingCurrent, setIsUploadingCurrent] = useState(false);

  const handleSelectMood = (moodKey: string) => {
    audioEngine.playChime(523.25, 0.8);
    setActiveMood(activeMood === moodKey ? null : moodKey);
  };

  const handleBabyPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingBaby(true);
    try {
      const compressedDataUrl = await compressImageFile(file, 1280, 0.85);
      updateConfig({ youngerSisterBabyPhotoUrl: compressedDataUrl });
      audioEngine.playChime(659.25, 0.8);
    } catch (err) {
      console.error('Failed to process image:', err);
      alert('Could not process this image. Please try another photo.');
    } finally {
      setIsUploadingBaby(false);
      e.target.value = '';
    }
  };

  const handleCurrentPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingCurrent(true);
    try {
      const compressedDataUrl = await compressImageFile(file, 1280, 0.85);
      updateConfig({ youngerSisterPhotoUrl: compressedDataUrl });
      audioEngine.playChime(659.25, 0.8);
    } catch (err) {
      console.error('Failed to process image:', err);
      alert('Could not process this image. Please try another photo.');
    } finally {
      setIsUploadingCurrent(false);
      e.target.value = '';
    }
  };

  const moodResponses: Record<string, { title: string; advice: string; emoji: string }> = {
    confused: {
      emoji: "🤔",
      title: "When school / life gets confusing:",
      advice: "Take a breath. You don't have to figure out your entire 20s at age 16. Just ask me — I've already made the mistakes so you don't have to! 😂"
    },
    sad: {
      emoji: "🥺",
      title: "When you're upset or having a bad day:",
      advice: "Tell me who annoyed you. Or don't say a word and let's just order food. Your brother is in your corner no matter what."
    },
    happy: {
      emoji: "🎉",
      title: "When you have good news to celebrate:",
      advice: "I am bragging to all my friends about you already! Call me first so we can plan the treat."
    },
    bored: {
      emoji: "🥱",
      title: "When you just want to talk or complain:",
      advice: "I will pretend to be busy for 30 seconds and then listen to your 25-minute rant about your friends. That's a brother's oath."
    }
  };

  return (
    <section id="prisha-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#E5E2D9]">
      {/* Chapter header */}
      <div className="text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#E5E2D9] text-[#5A5A40] text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Heart className="w-3.5 h-3.5 fill-[#B85D43] text-[#B85D43]" />
          Chapter 3 • Little Sister
        </div>
        <h2 className="text-4xl sm:text-6xl font-serif-title font-bold text-[#2D2D2A]">
          {config.youngerSisterName} <span className="text-[#B85D43]">❤️</span>
        </h2>
        <p className="font-handwriting text-2xl sm:text-3xl text-[#5A5A40] font-medium">
          “You’ll always be our little sister, no matter how grown up you become.”
        </p>
      </div>

      {/* Main Grid: Little Sister Teasing & Growing Up Journey */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: Prisha's Polaroid Duo (Childhood -> Now) */}
        <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-6">
          {/* Polaroid 1: Childhood */}
          <div className="relative max-w-xs w-full bg-white p-4 rounded-xl border border-[#E5E2D9] shadow-lg polaroid-card text-[#2D2D2A] transform -rotate-2 group">
            <div className="absolute -top-3 left-6 w-20 h-5 washi-tape-terracotta z-10 transform -rotate-3" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#FAF8F2]">
              <img
                src={config.youngerSisterBabyPhotoUrl || "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?q=80&w=600&auto=format&fit=crop"}
                alt={`${config.youngerSisterName} as a baby`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Direct Photo Upload & Change Buttons */}
              <div className="absolute top-2 right-2 z-30 flex items-center gap-1">
                <label
                  className={`px-2 py-1 rounded-full bg-white/95 hover:bg-white text-[#2D2D2A] text-[10px] font-semibold shadow-md flex items-center gap-1 transition-all cursor-pointer border border-[#E5E2D9] ${
                    isUploadingBaby ? 'opacity-70 pointer-events-none' : 'hover:scale-105'
                  }`}
                  title="Upload childhood photo from your device"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBabyPhotoUpload}
                    className="hidden"
                    disabled={isUploadingBaby}
                  />
                  <Upload className="w-3 h-3 text-[#B85D43]" />
                  <span>{isUploadingBaby ? '...' : 'Upload'}</span>
                </label>

                <button
                  onClick={() => {
                    audioEngine.playChime(520, 0.5);
                    setStudioInitialTab('photos');
                    setIsStudioOpen(true);
                  }}
                  className="p-1 rounded-full bg-white/90 hover:bg-white text-[#2D2D2A] shadow-md border border-[#E5E2D9] transition-all cursor-pointer hover:scale-105"
                  title="Open Photo Studio / Paste Image URL"
                >
                  <Camera className="w-3 h-3 text-[#5A5A40]" />
                </button>
              </div>
            </div>
            <div className="pt-2 text-center">
              <p className="font-handwriting text-lg text-[#2D2D2A] font-medium">
                Baby {config.youngerSisterName} • The Chaos Begins 👶
              </p>
            </div>
          </div>

          {/* Polaroid 2: Sweet 16 */}
          <div className="relative max-w-xs w-full bg-white p-4 rounded-xl border border-[#E5E2D9] shadow-lg polaroid-card text-[#2D2D2A] transform rotate-2 group">
            <div className="absolute -top-3 right-6 w-20 h-5 washi-tape-gold z-10 transform rotate-2" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#FAF8F2]">
              <img
                src={config.youngerSisterPhotoUrl || "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop"}
                alt={`${config.youngerSisterName} Now - 16 Years Old`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Direct Photo Upload & Change Buttons */}
              <div className="absolute top-2 right-2 z-30 flex items-center gap-1">
                <label
                  className={`px-2 py-1 rounded-full bg-white/95 hover:bg-white text-[#2D2D2A] text-[10px] font-semibold shadow-md flex items-center gap-1 transition-all cursor-pointer border border-[#E5E2D9] ${
                    isUploadingCurrent ? 'opacity-70 pointer-events-none' : 'hover:scale-105'
                  }`}
                  title="Upload sweet 16 photo from your device"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCurrentPhotoUpload}
                    className="hidden"
                    disabled={isUploadingCurrent}
                  />
                  <Upload className="w-3 h-3 text-[#B85D43]" />
                  <span>{isUploadingCurrent ? '...' : 'Upload'}</span>
                </label>

                <button
                  onClick={() => {
                    audioEngine.playChime(520, 0.5);
                    setStudioInitialTab('photos');
                    setIsStudioOpen(true);
                  }}
                  className="p-1 rounded-full bg-white/90 hover:bg-white text-[#2D2D2A] shadow-md border border-[#E5E2D9] transition-all cursor-pointer hover:scale-105"
                  title="Open Photo Studio / Paste Image URL"
                >
                  <Camera className="w-3 h-3 text-[#5A5A40]" />
                </button>
              </div>
            </div>
            <div className="pt-2 text-center">
              <p className="font-handwriting text-lg text-[#2D2D2A] font-medium">
                {config.youngerSisterAge} Now • Still Our Little One! ✨
              </p>
            </div>
          </div>
        </div>

        {/* Right: Brother's Loving Tease & Sincere Words */}
        <div className="lg:col-span-7 space-y-6 text-[#5A5A40]">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E2D9] shadow-md space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-serif-title font-bold text-[#2D2D2A]">
                  Okay, you’re 16 now…
                </span>
                <span className="text-xl">😂</span>
              </div>
              <p className="font-handwriting text-2xl sm:text-3xl text-[#B85D43] font-medium">
                …but you’re still the little one.
              </p>
            </div>

            <p className="text-[#5A5A40] text-base sm:text-lg leading-relaxed">
              You’re growing up way too fast. I still remember when you were just a tiny kid running around the house, and now you’re suddenly talking about high school, outfits, and life.
            </p>

            <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#EAE6DB] space-y-2">
              <p className="text-[#B85D43] font-serif-title text-base sm:text-lg font-medium">
                No matter how old you get… You’ll always have your brother.
              </p>
              <p className="text-xs sm:text-sm text-[#7C7A68]">
                You might be my real uncle’s daughter on paper, but in my heart, you are my real little sister in every way that matters.
              </p>
            </div>

            {/* Interactive "If you ever..." mood selector */}
            <div className="space-y-3 pt-2">
              <span className="text-xs uppercase tracking-wider text-[#7C7A68] font-semibold block">
                Tap whenever you need your brother:
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => handleSelectMood('confused')}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    activeMood === 'confused'
                      ? 'bg-[#FAF8F2] border-[#5A5A40] text-[#2D2D2A] shadow-sm'
                      : 'bg-white border-[#E5E2D9] text-[#5A5A40] hover:border-[#B5B09E]'
                  }`}
                >
                  <span className="text-lg block mb-1">🤔</span>
                  <span className="text-xs font-medium block">If life gets confusing</span>
                </button>

                <button
                  onClick={() => handleSelectMood('sad')}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    activeMood === 'sad'
                      ? 'bg-[#F3DBD3]/50 border-[#B85D43] text-[#B85D43] shadow-sm'
                      : 'bg-white border-[#E5E2D9] text-[#5A5A40] hover:border-[#B5B09E]'
                  }`}
                >
                  <span className="text-lg block mb-1">🥺</span>
                  <span className="text-xs font-medium block">If you're upset</span>
                </button>

                <button
                  onClick={() => handleSelectMood('happy')}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    activeMood === 'happy'
                      ? 'bg-[#FAF8F2] border-[#5A5A40] text-[#5A5A40] shadow-sm'
                      : 'bg-white border-[#E5E2D9] text-[#5A5A40] hover:border-[#B5B09E]'
                  }`}
                >
                  <span className="text-lg block mb-1">🎉</span>
                  <span className="text-xs font-medium block">If you're happy</span>
                </button>

                <button
                  onClick={() => handleSelectMood('bored')}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    activeMood === 'bored'
                      ? 'bg-[#FAF8F2] border-[#5A5A40] text-[#2D2D2A] shadow-sm'
                      : 'bg-white border-[#E5E2D9] text-[#5A5A40] hover:border-[#B5B09E]'
                  }`}
                >
                  <span className="text-lg block mb-1">💬</span>
                  <span className="text-xs font-medium block">Just want to talk</span>
                </button>
              </div>

              {/* Dynamic Mood Card Reveal */}
              <AnimatePresence>
                {activeMood && moodResponses[activeMood] && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-5 rounded-xl bg-[#FAF8F2] border border-[#E5E2D9] space-y-2 mt-3 shadow-inner"
                  >
                    <div className="flex items-center gap-2 text-[#2D2D2A] font-serif-title font-semibold text-base">
                      <span>{moodResponses[activeMood].emoji}</span>
                      <span>{moodResponses[activeMood].title}</span>
                    </div>
                    <p className="text-sm text-[#5A5A40] leading-relaxed">
                      {moodResponses[activeMood].advice}
                    </p>
                    <p className="font-handwriting text-xl text-[#B85D43] pt-1 font-medium">
                      Call me. Your brother’s got you! ❤️
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
