import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, MapPin, Volume2, VolumeX, Sparkles, Phone, BookOpen, Clock, Camera, Upload, Edit3, Check } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import { audioEngine } from '../utils/audioSynthesizer';
import { compressImageFile } from '../utils/imageCompressor';

export const TrioHeroSection: React.FC = () => {
  const { config, updateConfig, isMelodyOn, toggleMelody, setIsStudioOpen, setStudioInitialTab } = useMemory();
  const [isUploading, setIsUploading] = useState(false);

  const handleHeroPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const compressedDataUrl = await compressImageFile(file, 1280, 0.85);
      updateConfig({ heroPhotoUrl: compressedDataUrl });
      audioEngine.playChime(659.25, 0.8);
    } catch (err) {
      console.error('Failed to process image:', err);
      alert('Could not process this image. Please try another photo.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <header id="trio-hero" className="relative w-full overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#E5E2D9] bg-[#FDFBF7] paper-texture">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#EAE6DB]/60 via-[#F3DBD3]/30 to-transparent blur-3xl pointer-events-none" />

      {/* Top utility bar */}
      <div className="max-w-6xl mx-auto flex items-center justify-between pb-8 mb-6 border-b border-[#E5E2D9] text-xs sm:text-sm text-[#7C7A68]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#5A5A40] animate-pulse" />
          <span className="tracking-wide text-[#5A5A40] font-medium">Digital Memory Archive • Raksha Bandhan</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Ambient soundtrack button */}
          <button
            id="ambient-sound-toggle"
            onClick={toggleMelody}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
              isMelodyOn
                ? 'bg-[#B85D43]/10 border-[#B85D43]/40 text-[#B85D43] shadow-sm'
                : 'bg-white border-[#E5E2D9] text-[#5A5A40] hover:text-[#2D2D2A]'
            }`}
            title="Toggle soothing piano & warm background chords"
          >
            {isMelodyOn ? <Volume2 className="w-4 h-4 text-[#B85D43] animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{isMelodyOn ? 'Melody Playing' : 'Gentle Chords'}</span>
          </button>

          {/* Brother Studio Edit Drawer */}
          <button
            id="open-studio-btn"
            onClick={() => {
              audioEngine.playChime(440, 0.5);
              setIsStudioOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5E2D9] text-[#5A5A40] hover:text-[#B85D43] hover:border-[#B85D43]/40 transition-colors text-xs cursor-pointer shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Brother’s Desk</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        {/* Main Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF8F2] border border-[#E5E2D9] text-[#B85D43] text-xs sm:text-sm font-medium tracking-wide shadow-sm">
            <Heart className="w-3.5 h-3.5 fill-[#B85D43] text-[#B85D43]" />
            {config.subtitle}
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-title font-bold text-[#2D2D2A] tracking-tight leading-tight">
            Just A Call Away <span className="text-[#B85D43] font-sans inline-block hover:scale-125 transition-transform duration-300">❤️</span>
          </h1>

          <p className="font-handwriting text-2xl sm:text-3xl text-[#5A5A40] max-w-2xl mx-auto pt-2 font-medium">
            “{config.alternativeOpening}”
          </p>
        </motion.div>

        {/* Hero Photo with Polaroid Scrapbook Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative max-w-2xl mx-auto my-10"
        >
          <div className="relative bg-white p-4 sm:p-5 rounded-2xl border border-[#E5E2D9] shadow-xl polaroid-card">
            {/* Washi tape on top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-7 washi-tape-gold rounded-sm transform -rotate-1 z-20" />

            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#FAF8F2] group">
              <img
                src={config.heroPhotoUrl}
                alt="Krutarth, Priya and Prisha"
                className="w-full h-full object-cover object-center filter saturate-[1.05] group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2A]/80 via-transparent to-transparent pointer-events-none" />

              {/* Direct Photo Upload & Change Buttons */}
              <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5">
                <label
                  className={`px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-[#2D2D2A] text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all cursor-pointer border border-[#E5E2D9] ${
                    isUploading ? 'opacity-70 pointer-events-none' : 'hover:scale-105'
                  }`}
                  title="Upload trio photo directly from your device"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleHeroPhotoUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <Upload className="w-3.5 h-3.5 text-[#B85D43]" />
                  <span>{isUploading ? 'Uploading...' : 'Upload Real Photo'}</span>
                </label>

                <button
                  onClick={() => {
                    audioEngine.playChime(520, 0.5);
                    setStudioInitialTab('photos');
                    setIsStudioOpen(true);
                  }}
                  className="p-1.5 rounded-full bg-white/90 hover:bg-white text-[#2D2D2A] shadow-md border border-[#E5E2D9] transition-all cursor-pointer hover:scale-105"
                  title="Open Photo Studio / Paste Image URL"
                >
                  <Camera className="w-3.5 h-3.5 text-[#5A5A40]" />
                </button>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-left pointer-events-none">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#FDFBF7] font-semibold">Trio Archive</span>
                  <p className="text-sm sm:text-base font-serif-title text-white font-medium">The Three Of Us</p>
                </div>
                <span className="font-handwriting text-lg sm:text-xl text-white bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  Forever Team ❤️
                </span>
              </div>
            </div>

            {/* Handwritten sticker below photo */}
            <div className="pt-4 text-center">
              <p className="font-handwriting text-xl sm:text-2xl text-[#5A5A40] font-medium">
                Three people. A thousand memories. One very complicated family bond. 😂❤️
              </p>
            </div>
          </div>
        </motion.div>

        {/* Narrative Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E2D9] shadow-md text-[#5A5A40] space-y-4 text-base sm:text-lg leading-relaxed text-left relative"
        >
          <div className="absolute top-4 right-4 text-[#D1CEBF] font-serif-title text-5xl select-none opacity-50">”</div>
          <p className="text-[#2D2D2A] font-medium">
            I don’t know exactly when it happened…
          </p>
          <p className="text-[#7C7A68]">
            Somewhere between childhood fights, stupid arguments, family functions, laughing over absolutely nothing and growing up…
          </p>
          <p className="text-[#B85D43] font-medium font-serif-title text-lg sm:text-xl">
            You both became people I could never imagine my life without.
          </p>
        </motion.div>

        {/* Three Sibling Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 text-left">
          {/* Priya */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-xl bg-white border border-[#E5E2D9] shadow-sm hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5A5A40]">Big Sister • {config.olderSisterAge}</span>
              <span className="text-xs text-[#7C7A68] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#5A5A40]" /> {config.olderSisterLocation || 'Adelaide, AU'}
              </span>
            </div>
            <h3 className="text-xl font-serif-title text-[#2D2D2A] font-bold">{config.olderSisterName}</h3>
            <p className="text-xs text-[#7C7A68] mt-1 italic">{config.olderSisterQuote || "The supportive pillar who always has my back."}</p>
            <div className="mt-3 pt-3 border-t border-[#EAE6DB] flex items-center justify-between text-xs text-[#5A5A40] font-handwriting text-base">
              <span>“Never far from me”</span>
              <a href="#priya-section" className="text-xs text-[#7C7A68] hover:text-[#B85D43] underline font-sans">Read her chapter →</a>
            </div>
          </motion.div>

          {/* Krutarth */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-xl bg-[#FAF8F2] border border-[#B85D43]/30 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B85D43]">Brother • {config.brotherAge}</span>
              <span className="text-xs text-[#7C7A68] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#B85D43]" /> Surat, IN
              </span>
            </div>
            <h3 className="text-xl font-serif-title text-[#2D2D2A] font-bold">{config.brotherName}</h3>
            <p className="text-xs text-[#7C7A68] mt-1 italic">Somehow stuck in the middle, but always ready to answer.</p>
            <div className="mt-3 pt-3 border-t border-[#EAE6DB] flex items-center justify-between text-xs text-[#B85D43] font-handwriting text-base">
              <span>“Always have your back”</span>
              <a href="#brother-promise" className="text-xs text-[#7C7A68] hover:text-[#B85D43] underline font-sans">See promise →</a>
            </div>
          </motion.div>

          {/* Prisha */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-xl bg-white border border-[#E5E2D9] shadow-sm hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5A5A40]">Little Sister • {config.youngerSisterAge}</span>
              <span className="text-xs text-[#7C7A68] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#5A5A40]" /> {config.youngerSisterLocation || 'Surat, IN'}
              </span>
            </div>
            <h3 className="text-xl font-serif-title text-[#2D2D2A] font-bold">{config.youngerSisterName}</h3>
            <p className="text-xs text-[#7C7A68] mt-1 italic">{config.youngerSisterQuote || "Growing up fast, but our little sister forever."}</p>
            <div className="mt-3 pt-3 border-t border-[#EAE6DB] flex items-center justify-between text-xs text-[#5A5A40] font-handwriting text-base">
              <span>“Brother’s got you”</span>
              <a href="#prisha-section" className="text-xs text-[#7C7A68] hover:text-[#B85D43] underline font-sans">Read her chapter →</a>
            </div>
          </motion.div>
        </div>

        {/* Quick jump navigation pill bar */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-[#5A5A40]">
          <a href="#childhood-timeline" className="px-3.5 py-1.5 rounded-full bg-white border border-[#E5E2D9] hover:border-[#B5B09E] hover:text-[#2D2D2A] shadow-sm transition-colors">
            1. Childhood Timeline
          </a>
          <a href="#priya-section" className="px-3.5 py-1.5 rounded-full bg-white border border-[#E5E2D9] hover:border-[#B85D43]/40 hover:text-[#B85D43] shadow-sm transition-colors">
            2. Priya (Adelaide)
          </a>
          <a href="#prisha-section" className="px-3.5 py-1.5 rounded-full bg-white border border-[#E5E2D9] hover:border-[#5A5A40]/40 hover:text-[#2D2D2A] shadow-sm transition-colors">
            3. Prisha (Little Sister)
          </a>
          <a href="#differences" className="px-3.5 py-1.5 rounded-full bg-white border border-[#E5E2D9] hover:border-[#B5B09E] hover:text-[#2D2D2A] shadow-sm transition-colors">
            4. The Differences
          </a>
          <a href="#photo-scrapbook" className="px-3.5 py-1.5 rounded-full bg-white border border-[#E5E2D9] hover:border-[#B5B09E] hover:text-[#2D2D2A] shadow-sm transition-colors">
            5. Photo Scrapbook
          </a>
          <a href="#memory-jar" className="px-3.5 py-1.5 rounded-full bg-white border border-[#E5E2D9] hover:border-[#B5B09E] hover:text-[#2D2D2A] shadow-sm transition-colors">
            6. Memory Jar (30+ Notes)
          </a>
          <a href="#open-when" className="px-3.5 py-1.5 rounded-full bg-white border border-[#E5E2D9] hover:border-[#B5B09E] hover:text-[#2D2D2A] shadow-sm transition-colors">
            7. Open When Envelopes
          </a>
          <a href="#just-call-hotline" className="px-3.5 py-1.5 rounded-full bg-[#5A5A40] text-white hover:bg-[#474732] shadow-sm transition-colors font-medium">
            📞 Just Call Hotline
          </a>
        </div>
      </div>
    </header>
  );
};
