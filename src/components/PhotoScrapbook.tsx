import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Sparkles, Filter, Calendar, MapPin, X, ZoomIn, Heart, PlusCircle, Upload, Trash2, Edit3 } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import { MemoryPhoto } from '../types';
import { audioEngine } from '../utils/audioSynthesizer';
import { compressImageFile } from '../utils/imageCompressor';

export const PhotoScrapbook: React.FC = () => {
  const { photos, addPhoto, updatePhoto, deletePhoto, setIsStudioOpen, setStudioInitialTab } = useMemory();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [isUploadingNew, setIsUploadingNew] = useState(false);
  const [replacingPhotoId, setReplacingPhotoId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Memories' },
    { id: 'then', label: 'Then (Childhood)' },
    { id: 'growing_up', label: 'Growing Up' },
    { id: 'family', label: 'Family & Weddings' },
    { id: 'chaos', label: 'Random Chaos 😂' },
    { id: 'now', label: 'Now (Recent)' },
  ];

  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter(p => p.category === activeCategory);

  const handlePhotoClick = (p: MemoryPhoto) => {
    audioEngine.playPaperSound();
    setSelectedPhoto(p);
  };

  const handleAddNewPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingNew(true);
    try {
      const compressedDataUrl = await compressImageFile(file, 1280, 0.85);
      const defaultCat = activeCategory === 'all' ? 'then' : (activeCategory as any);
      addPhoto({
        url: compressedDataUrl,
        caption: 'Our Special Sibling Memory',
        category: defaultCat,
        year: `${new Date().getFullYear()}`,
        location: 'Surat',
        fullStory: 'Uploaded with love to our sibling memory vault.'
      });
      audioEngine.playChime(659.25, 0.8);
    } catch (err) {
      console.error('Failed to add photo:', err);
      alert('Could not process this photo. Please try another one.');
    } finally {
      setIsUploadingNew(false);
      e.target.value = '';
    }
  };

  const handleReplaceSpecificPhoto = async (photoId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setReplacingPhotoId(photoId);
    try {
      const compressedDataUrl = await compressImageFile(file, 1280, 0.85);
      updatePhoto(photoId, { url: compressedDataUrl });
      if (selectedPhoto && selectedPhoto.id === photoId) {
        setSelectedPhoto({ ...selectedPhoto, url: compressedDataUrl });
      }
      audioEngine.playChime(659.25, 0.8);
    } catch (err) {
      console.error('Failed to replace photo:', err);
      alert('Could not replace this photo.');
    } finally {
      setReplacingPhotoId(null);
      e.target.value = '';
    }
  };

  return (
    <section id="photo-scrapbook" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E5E2D9]">
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#E5E2D9] text-[#5A5A40] text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Camera className="w-3.5 h-3.5 text-[#B85D43]" />
          Chapter 5 • Scrapbook
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#2D2D2A]">
          The Photo Journey
        </h2>
        <p className="text-[#7C7A68] max-w-xl mx-auto text-sm sm:text-base">
          A scattered memory wall of moments, goofy faces, festival days, and candid sibling life. Every photo is completely customizable.
        </p>
      </div>

      {/* Category Pills & Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              audioEngine.playChime(440, 0.4);
              setActiveCategory(cat.id);
            }}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#B85D43] text-white shadow-md scale-105'
                : 'bg-white text-[#5A5A40] border border-[#E5E2D9] hover:border-[#B5B09E] hover:text-[#2D2D2A]'
            }`}
          >
            {cat.label}
          </button>
        ))}

        {/* Direct Upload New Photo */}
        <label
          className={`px-4 py-2 rounded-full text-xs bg-white border border-[#B85D43]/40 text-[#B85D43] hover:bg-[#F3DBD3]/50 transition-all flex items-center gap-1.5 cursor-pointer ml-2 shadow-sm font-medium ${
            isUploadingNew ? 'opacity-70 pointer-events-none' : 'hover:scale-105'
          }`}
          title="Upload a new real photograph directly from device"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleAddNewPhotoUpload}
            className="hidden"
            disabled={isUploadingNew}
          />
          <Upload className="w-3.5 h-3.5 text-[#B85D43]" />
          <span>{isUploadingNew ? 'Uploading...' : 'Upload Photo'}</span>
        </label>

        {/* Open Studio */}
        <button
          onClick={() => {
            audioEngine.playChime(520, 0.5);
            setStudioInitialTab('photos');
            setIsStudioOpen(true);
          }}
          className="px-3.5 py-2 rounded-full text-xs bg-[#FAF8F2] border border-[#E5E2D9] text-[#5A5A40] hover:bg-[#EAE6DB] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          title="Manage, edit, or reorder all photos in Studio"
        >
          <Camera className="w-3.5 h-3.5 text-[#5A5A40]" />
          <span>Photo Studio</span>
        </button>
      </div>

      {/* Scattered Polaroid Scrapbook Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
        {filteredPhotos.map((photo, index) => {
          // subtle alternating tilts for realistic scrapbook look
          const rotations = [-2, 2.5, -1.5, 3, -3, 1.5, -2.5, 2];
          const rotation = photo.rotation ?? rotations[index % rotations.length];
          const tapeStyle = index % 3 === 0 ? 'washi-tape-terracotta' : index % 3 === 1 ? 'washi-tape-gold' : 'washi-tape';
          const isReplacingThis = replacingPhotoId === photo.id;

          return (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex justify-center"
            >
              <div
                className="group relative w-full max-w-sm bg-white p-4 rounded-xl border border-[#E5E2D9] shadow-lg polaroid-card text-[#2D2D2A] transform transition-all duration-300 hover:z-20"
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                {/* Washi Tape Pin */}
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 ${tapeStyle} z-10 transform ${
                    index % 2 === 0 ? '-rotate-2' : 'rotate-2'
                  }`}
                />

                {/* Photo & Hover Overlay Actions */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#FAF8F2]">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    onClick={() => handlePhotoClick(photo)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors pointer-events-none" />

                  {/* Top Action Row: Replace file or Zoom */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 z-20">
                    <label
                      className={`p-1.5 rounded-full bg-white/90 hover:bg-white text-[#2D2D2A] shadow-md border border-[#E5E2D9] transition-all cursor-pointer hover:scale-105 ${
                        isReplacingThis ? 'opacity-70 pointer-events-none' : ''
                      }`}
                      title="Replace this photo with an image from your device"
                      onClick={e => e.stopPropagation()}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleReplaceSpecificPhoto(photo.id, e)}
                        className="hidden"
                        disabled={isReplacingThis}
                      />
                      <Upload className="w-3.5 h-3.5 text-[#B85D43]" />
                    </label>

                    <button
                      onClick={() => handlePhotoClick(photo)}
                      className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
                      title="Expand photo story"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {photo.category === 'chaos' && (
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#B85D43] text-white text-[10px] font-bold uppercase tracking-wider pointer-events-none">
                      Chaos Alert 😂
                    </span>
                  )}
                </div>

                {/* Caption */}
                <div
                  className="pt-3 pb-1 space-y-1 cursor-pointer"
                  onClick={() => handlePhotoClick(photo)}
                >
                  <p className="font-handwriting text-lg sm:text-xl text-[#2D2D2A] leading-snug line-clamp-2">
                    “{photo.caption}”
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-[#7C7A68] pt-1 font-sans">
                    <span>{photo.year || 'Memory'}</span>
                    <span>{photo.location || 'Surat'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
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
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {selectedPhoto.year || 'Timeless'} • <MapPin className="w-3.5 h-3.5" /> {selectedPhoto.location || 'Surat'}
                  </span>
                  <span className="font-sans text-[#7C7A68] uppercase">{selectedPhoto.category.replace('_', ' ')}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-[#2D2D2A]">
                  {selectedPhoto.caption}
                </h3>
                <p className="text-[#5A5A40] text-sm sm:text-base leading-relaxed">
                  {selectedPhoto.fullStory || "A precious moment in our sibling archive that we will never forget."}
                </p>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#E5E2D9]">
                  <label
                    className="px-4 py-2 rounded-xl bg-white hover:bg-[#FAF8F2] border border-[#B85D43]/40 text-[#B85D43] text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                    title="Upload replacement image for this memory"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleReplaceSpecificPhoto(selectedPhoto.id, e)}
                      className="hidden"
                    />
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Image For This Memory</span>
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
                    <span>Edit Caption & Story in Studio</span>
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
