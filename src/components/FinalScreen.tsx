import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, RotateCcw, Sparkles, ChevronUp, Camera, Upload } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import { audioEngine } from '../utils/audioSynthesizer';
import { compressImageFile } from '../utils/imageCompressor';

export const FinalScreen: React.FC = () => {
  const { config, updateConfig, photos, setHasEntered, setIsStudioOpen, setStudioInitialTab } = useMemory();
  const [isUploadingFinal, setIsUploadingFinal] = useState(false);

  const handleReplayStory = () => {
    audioEngine.playChime(523.25, 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingFinal(true);
    try {
      const compressedDataUrl = await compressImageFile(file, 1280, 0.85);
      updateConfig({ finalPhotoUrl: compressedDataUrl });
      audioEngine.playChime(659.25, 0.8);
    } catch (err) {
      console.error('Failed to upload final photo:', err);
      alert('Could not process this photo. Please try another one.');
    } finally {
      setIsUploadingFinal(false);
      e.target.value = '';
    }
  };

  return (
    <footer className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF8F2] text-center text-[#2D2D2A] border-t border-[#E5E2D9] overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto space-y-12">
        {/* Paced Final Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-6 max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E2D9] text-[#B85D43] text-xs font-semibold uppercase tracking-widest shadow-sm">
            <Heart className="w-3.5 h-3.5 fill-[#B85D43] text-[#B85D43]" />
            The Final Word
          </span>

          <h3 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#2D2D2A] leading-tight">
            Before you go…
          </h3>

          <p className="text-xl sm:text-2xl text-[#5A5A40] font-light">
            I want you to remember one thing.
          </p>
        </motion.div>

        {/* Best Trio Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-xl mx-auto my-10"
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E2D9] shadow-xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-7 washi-tape-gold rounded-sm transform -rotate-1 z-20" />
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#FAF8F2] group">
              <img
                src={config.finalPhotoUrl}
                alt="Priya, Krutarth, Prisha"
                className="w-full h-full object-cover filter saturate-[1.05] group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Direct Photo Upload & Change Buttons */}
              <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5">
                <label
                  className={`px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-[#2D2D2A] text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all cursor-pointer border border-[#E5E2D9] ${
                    isUploadingFinal ? 'opacity-70 pointer-events-none' : 'hover:scale-105'
                  }`}
                  title="Upload trio photo from your device"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFinalPhotoUpload}
                    className="hidden"
                    disabled={isUploadingFinal}
                  />
                  <Upload className="w-3.5 h-3.5 text-[#B85D43]" />
                  <span>{isUploadingFinal ? 'Uploading...' : 'Upload Photo'}</span>
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

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-left pointer-events-none">
                <p className="font-handwriting text-xl sm:text-2xl text-white">
                  “Together in every chapter.”
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Emotionally Paced Text Progression */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-6 text-lg sm:text-xl text-[#5A5A40] max-w-2xl mx-auto leading-relaxed"
        >
          <div className="space-y-2 text-[#7C7A68] font-light">
            <p>Life will change.</p>
            <p>You’ll grow older.</p>
            <p>You’ll move.</p>
            <p>You’ll build your own lives.</p>
            <p className="italic pt-2">Things will never stay exactly the way they are today.</p>
          </div>

          <div className="pt-4 space-y-4">
            <p className="font-serif-title text-2xl sm:text-3xl text-[#2D2D2A] font-medium">
              But… Whatever happens… Wherever you are… Whatever you’re going through…
            </p>

            <p className="font-serif-title text-3xl sm:text-5xl text-[#B85D43] font-bold">
              You have a brother.
            </p>

            <p className="font-handwriting text-3xl sm:text-4xl text-[#B85D43]">
              Just call.
            </p>
          </div>

          {/* Central Oath Recap */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E2D9] text-left space-y-2 max-w-lg mx-auto mt-6 shadow-md">
            <p className="font-serif-title text-lg sm:text-xl text-[#2D2D2A] font-bold">
              Your brother will always have your back.
            </p>
            <div className="text-sm sm:text-base text-[#5A5A40] font-light space-y-1">
              <p>In your rights.</p>
              <p>In your wrongs.</p>
              <p>In your happiness.</p>
              <p>In your sadness.</p>
              <p className="font-semibold text-[#B85D43] pt-1">Always.</p>
            </div>
          </div>

          {/* Final Heartfelt Blessing */}
          <div className="pt-10 space-y-4">
            <p className="text-2xl sm:text-4xl font-serif-title text-[#B85D43] font-bold">
              Happy Raksha Bandhan, {config.olderSisterName} & {config.youngerSisterName}. ❤️
            </p>

            <p className="font-handwriting text-3xl sm:text-5xl text-[#B85D43]">
              Love,<br />
              {config.brotherName}
            </p>
          </div>
        </motion.div>

        {/* Slow Moving Memory Strip Collage */}
        <div className="pt-16 pb-8">
          <p className="text-xs uppercase tracking-widest text-[#7C7A68] font-sans mb-4">
            Let’s make many more memories.
          </p>

          <div className="flex gap-4 overflow-x-auto py-4 px-2 no-scrollbar">
            {photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => {
                  setStudioInitialTab('photos');
                  setIsStudioOpen(true);
                }}
                className="flex-shrink-0 w-36 sm:w-44 bg-white p-2 rounded-lg border border-[#E5E2D9] shadow-sm hover:shadow-md cursor-pointer transition-all hover:scale-105"
                title="Click to view or change in Photo Studio"
              >
                <div className="aspect-[4/3] rounded overflow-hidden bg-[#FAF8F2]">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="font-handwriting text-xs text-[#5A5A40] pt-1.5 truncate">
                  {photo.caption}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Replay & Action Controls */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleReplayStory}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#FAF8F2] border border-[#E5E2D9] text-[#2D2D2A] text-sm font-semibold transition-colors cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Our Story ↻</span>
          </button>

          <button
            onClick={() => {
              setStudioInitialTab('photos');
              setIsStudioOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF8F2] hover:bg-[#EAE6DB] border border-[#E5E2D9] text-[#5A5A40] text-xs font-semibold transition-all cursor-pointer shadow-sm"
          >
            <Camera className="w-3.5 h-3.5 text-[#B85D43]" />
            <span>Customize All Book Photos</span>
          </button>

          <span className="text-xs text-[#7C7A68] font-sans">
            See you next Raksha Bandhan. ✨
          </span>
        </div>
      </div>
    </footer>
  );
};
