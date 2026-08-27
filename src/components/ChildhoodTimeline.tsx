import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, MapPin, X, ZoomIn, Heart, Camera, Upload, Edit3 } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import { MemoryPhoto } from '../types';
import { audioEngine } from '../utils/audioSynthesizer';
import { compressImageFile } from '../utils/imageCompressor';

export const ChildhoodTimeline: React.FC = () => {
  const { photos, updatePhoto, config, setIsStudioOpen, setStudioInitialTab } = useMemory();
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [replacingId, setReplacingId] = useState<string | null>(null);

  // Filter childhood and early growing up memories
  const childhoodPhotos = photos.filter(p => p.category === 'then' || p.category === 'growing_up');

  const handleOpenPhoto = (p: MemoryPhoto) => {
    audioEngine.playPaperSound();
    setSelectedPhoto(p);
  };

  const handlePhotoUpload = async (photoId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setReplacingId(photoId);
    try {
      const compressedDataUrl = await compressImageFile(file, 1280, 0.85);
      updatePhoto(photoId, { url: compressedDataUrl });
      if (selectedPhoto && selectedPhoto.id === photoId) {
        setSelectedPhoto({ ...selectedPhoto, url: compressedDataUrl });
      }
      audioEngine.playChime(659.25, 0.8);
    } catch (err) {
      console.error('Failed to replace photo:', err);
      alert('Could not process this image. Please try another photo.');
    } finally {
      setReplacingId(null);
      e.target.value = '';
    }
  };

  return (
    <section id="childhood-timeline" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#E5E2D9] text-[#5A5A40] text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#B85D43]" />
          Chapter 1 • The Beginning
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#2D2D2A]">
          Childhood — Where Our Story Began
        </h2>
        <p className="text-[#7C7A68] max-w-xl mx-auto text-sm sm:text-base">
          Before college degrees, marriage, time zones and responsibilities… it was just the three of us making memories.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => {
              setStudioInitialTab('photos');
              setIsStudioOpen(true);
            }}
            className="px-4 py-2 rounded-full bg-white hover:bg-[#FAF8F2] border border-[#E5E2D9] text-[#5A5A40] text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-[#B85D43]" />
            <span>Manage All Photos in Studio</span>
          </button>
        </div>
      </div>

      {/* Cinematic Timeline Track */}
      <div className="relative">
        {/* Central glowing vertical timeline rule */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#B85D43]/40 via-[#5A5A40]/40 to-transparent hidden md:block" />

        <div className="space-y-16 sm:space-y-24">
          {childhoodPhotos.map((photo, index) => {
            const isEven = index % 2 === 0;
            const isReplacing = replacingId === photo.id;

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Center Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-[#5A5A40] shadow-md shadow-[#5A5A40]/10 z-20">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#5A5A40]" />
                </div>

                {/* Photo Polaroid Card */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div
                    className="group relative max-w-md w-full bg-white p-4 sm:p-5 rounded-xl border border-[#E5E2D9] shadow-lg polaroid-card transform transition-all duration-300 text-[#2D2D2A]"
                    style={{
                      transform: `rotate(${photo.rotation || (isEven ? -2 : 2)}deg)`,
                    }}
                  >
                    {/* Washi Tape Accent */}
                    <div
                      className={`absolute -top-3 ${
                        isEven ? 'left-6' : 'right-6'
                      } w-24 h-6 washi-tape-terracotta z-10 transform ${isEven ? '-rotate-3' : 'rotate-2'}`}
                    />

                    {/* Photo Container */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#FAF8F2]">
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        onClick={() => handleOpenPhoto(photo)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors pointer-events-none" />

                      {/* Action buttons on card */}
                      <div className="absolute top-2 right-2 flex items-center gap-1 z-20">
                        <label
                          className={`p-1.5 rounded-full bg-white/90 hover:bg-white text-[#2D2D2A] shadow-md border border-[#E5E2D9] transition-all cursor-pointer hover:scale-105 ${
                            isReplacing ? 'opacity-70 pointer-events-none' : ''
                          }`}
                          title="Upload replacement photo for this memory"
                          onClick={e => e.stopPropagation()}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={e => handlePhotoUpload(photo.id, e)}
                            className="hidden"
                            disabled={isReplacing}
                          />
                          <Upload className="w-3.5 h-3.5 text-[#B85D43]" />
                        </label>

                        <button
                          onClick={() => handleOpenPhoto(photo)}
                          className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-opacity backdrop-blur-xs cursor-pointer"
                          title="Expand memory"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Polaroid Bottom Note */}
                    <div
                      className="pt-4 pb-1 space-y-1 cursor-pointer"
                      onClick={() => handleOpenPhoto(photo)}
                    >
                      <p className="font-handwriting text-xl sm:text-2xl text-[#2D2D2A] leading-snug">
                        “{photo.caption}”
                      </p>
                      <div className="flex items-center justify-between text-xs text-[#7C7A68] pt-1 font-sans">
                        {photo.year && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#5A5A40]" /> {photo.year}
                          </span>
                        )}
                        {photo.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#5A5A40]" /> {photo.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emotional Story Note Beside Polaroid */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:text-left' : 'md:text-right'} px-4`}>
                  <div className="inline-block p-5 sm:p-6 rounded-2xl bg-white border border-[#E5E2D9] shadow-md space-y-2 max-w-lg">
                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B85D43] ${isEven ? 'justify-start' : 'md:justify-end justify-start'}`}>
                      <Heart className="w-3.5 h-3.5 fill-[#B85D43]" />
                      Memory #{index + 1}
                    </div>
                    <p className="font-serif-title text-xl text-[#2D2D2A] font-semibold">
                      {photo.caption}
                    </p>
                    <p className="text-sm sm:text-base text-[#5A5A40] leading-relaxed">
                      {photo.fullStory || "A golden memory from our childhood days together that time will never erase."}
                    </p>
                    <div className="pt-2">
                      <span className="font-handwriting text-lg text-[#B85D43] font-medium">
                        — {config.brotherName}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-white border border-[#E5E2D9] rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[65vh] overflow-hidden bg-[#FAF8F2] flex items-center justify-center">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-contain max-h-[65vh]"
                />
              </div>

              <div className="p-6 space-y-3 bg-white border-t border-[#E5E2D9]">
                <div className="flex items-center justify-between text-xs text-[#B85D43] font-medium">
                  <span>{selectedPhoto.year || 'Memory Year'} • {selectedPhoto.location || 'Home'}</span>
                  <span className="font-sans text-[#7C7A68]">Childhood Album</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-[#2D2D2A]">
                  {selectedPhoto.caption}
                </h3>
                <p className="text-[#5A5A40] text-sm sm:text-base leading-relaxed">
                  {selectedPhoto.fullStory}
                </p>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#E5E2D9]">
                  <label
                    className="px-4 py-2 rounded-xl bg-white hover:bg-[#FAF8F2] border border-[#B85D43]/40 text-[#B85D43] text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                    title="Upload replacement image for this childhood memory"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handlePhotoUpload(selectedPhoto.id, e)}
                      className="hidden"
                    />
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Real Photo</span>
                  </label>

                  <button
                    onClick={() => {
                      setSelectedPhoto(null);
                      setStudioInitialTab('photos');
                      setIsStudioOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#FAF8F2] hover:bg-[#F3DBD3]/50 border border-[#E5E2D9] text-[#2D2D2A] text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#5A5A40]" />
                    <span>Edit Caption in Studio</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
