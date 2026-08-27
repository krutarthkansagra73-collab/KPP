import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Lock, Unlock, Sparkles, Plus, Calendar, Heart, CheckCircle2 } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import { audioEngine } from '../utils/audioSynthesizer';
import { TimeCapsuleEntry } from '../types';

export const TimeCapsuleSection: React.FC = () => {
  const { timeCapsules, addTimeCapsuleYear, updateTimeCapsule } = useMemory();
  const [selectedCapsule, setSelectedCapsule] = useState<TimeCapsuleEntry | null>(
    timeCapsules.find(c => c.isUnlocked) || timeCapsules[0] || null
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [newYear, setNewYear] = useState<number>(2029);
  const [newTitle, setNewTitle] = useState('');
  const [newLetter, setNewLetter] = useState('');
  const [newPromise, setNewPromise] = useState('');

  const handleSelectYear = (capsule: TimeCapsuleEntry) => {
    audioEngine.playPaperSound();
    setSelectedCapsule(capsule);
  };

  const handleUnlockYear = (year: number) => {
    audioEngine.playChime(659.25, 1);
    updateTimeCapsule(year, { isUnlocked: true });
    setSelectedCapsule(prev => (prev && prev.year === year ? { ...prev, isUnlocked: true } : prev));
  };

  const handleAddYear = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newLetter) return;

    addTimeCapsuleYear({
      year: newYear,
      isUnlocked: false,
      unlockDate: `August ${newYear}`,
      title: newTitle,
      letter: newLetter,
      promise: newPromise || 'Another year of brotherly protection guaranteed.'
    });

    setShowAddModal(false);
    setNewTitle('');
    setNewLetter('');
    setNewPromise('');
    audioEngine.playChime(587.33, 1);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#E5E2D9]">
      <div className="text-center space-y-3 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#E5E2D9] text-[#5A5A40] text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Clock className="w-3.5 h-3.5 text-[#B85D43]" />
          Chapter 11 • The Time Capsule
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#2D2D2A]">
          Open This Again Next Raksha Bandhan
        </h2>
        <p className="text-[#7C7A68] max-w-xl mx-auto text-sm sm:text-base">
          This digital archive is built to live forever. Every year on Rakhi, a new chapter unlocks for our family.
        </p>
      </div>

      {/* Year Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {timeCapsules.map(entry => (
          <button
            key={entry.year}
            onClick={() => handleSelectYear(entry)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
              selectedCapsule?.year === entry.year
                ? 'bg-[#B85D43] text-white shadow-md scale-105'
                : 'bg-white text-[#5A5A40] border border-[#E5E2D9] hover:border-[#B5B09E] hover:text-[#2D2D2A]'
            }`}
          >
            {entry.isUnlocked ? (
              <Unlock className="w-3.5 h-3.5" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-[#7C7A68]" />
            )}
            <span>{entry.year}</span>
            {entry.isUnlocked ? (
              <span className="text-xs">❤️</span>
            ) : (
              <span className="text-[10px] uppercase font-sans px-1.5 py-0.5 rounded bg-[#FAF8F2] text-[#7C7A68]">
                Locked
              </span>
            )}
          </button>
        ))}

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-full bg-white border border-dashed border-[#B85D43] text-[#B85D43] hover:bg-[#F3DBD3]/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Year Chapter</span>
        </button>
      </div>

      {/* Selected Year Capsule Box */}
      {selectedCapsule && (
        <div className="max-w-3xl mx-auto">
          <motion.div
            key={selectedCapsule.year}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E5E2D9] shadow-xl space-y-6 relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E2D9] pb-4">
              <div>
                <span className="text-xs font-sans text-[#B85D43] font-semibold uppercase tracking-wider">
                  Time Capsule • Chapter {selectedCapsule.year}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#2D2D2A]">
                  {selectedCapsule.title}
                </h3>
              </div>

              {selectedCapsule.isUnlocked ? (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF8F2] border border-[#5A5A40]/30 text-[#5A5A40] text-xs font-sans shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#5A5A40]" />
                  <span>UNLOCKED & ACTIVE</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#7C7A68] font-sans">
                    Unlocks: {selectedCapsule.unlockDate || `August ${selectedCapsule.year}`}
                  </span>
                  <button
                    onClick={() => handleUnlockYear(selectedCapsule.year)}
                    className="px-3 py-1 rounded-lg bg-[#FAF8F2] border border-[#E5E2D9] hover:bg-[#B85D43] hover:text-white text-[#5A5A40] text-xs font-medium transition-colors cursor-pointer"
                  >
                    Early Unlock (Krutarth)
                  </button>
                </div>
              )}
            </div>

            {selectedCapsule.isUnlocked ? (
              <div className="space-y-6">
                <p className="font-handwriting text-2xl sm:text-3xl text-[#2D2D2A] leading-relaxed">
                  “{selectedCapsule.letter}”
                </p>

                {selectedCapsule.promise && (
                  <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#EAE6DB]">
                    <span className="text-xs font-semibold text-[#B85D43] uppercase tracking-wider block mb-1">
                      {selectedCapsule.year} Brother’s Promise:
                    </span>
                    <p className="text-sm sm:text-base text-[#5A5A40] italic">
                      “{selectedCapsule.promise}”
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F2] border border-[#E5E2D9] flex items-center justify-center mx-auto text-2xl text-[#7C7A68]">
                  🔒
                </div>
                <h4 className="text-xl font-serif-title font-semibold text-[#2D2D2A]">
                  This chapter is locked in time
                </h4>
                <p className="text-sm text-[#7C7A68] max-w-md mx-auto">
                  Krutarth will seal a fresh letter and new photographs here for Raksha Bandhan {selectedCapsule.year}.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Add Year Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.form
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onSubmit={handleAddYear}
              className="max-w-lg w-full bg-white border border-[#E5E2D9] rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl"
            >
              <h4 className="text-xl font-serif-title font-bold text-[#2D2D2A]">
                Add Future Raksha Bandhan Capsule
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#7C7A68] uppercase block mb-1">Year</label>
                  <input
                    type="number"
                    min={2026}
                    max={2040}
                    value={newYear}
                    onChange={e => setNewYear(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#FAF8F2] border border-[#E5E2D9] text-[#2D2D2A] text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#7C7A68] uppercase block mb-1">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chapter 2029"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#FAF8F2] border border-[#E5E2D9] text-[#2D2D2A] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#7C7A68] uppercase block mb-1">Letter / Message</label>
                <textarea
                  required
                  rows={3}
                  placeholder="What do you want to say to your sisters in this year?"
                  value={newLetter}
                  onChange={e => setNewLetter(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#FAF8F2] border border-[#E5E2D9] text-[#2D2D2A] text-sm resize-none"
                />
              </div>

              <div>
                <label className="text-xs text-[#7C7A68] uppercase block mb-1">Yearly Promise</label>
                <input
                  type="text"
                  placeholder="e.g. Still picking up on the first ring."
                  value={newPromise}
                  onChange={e => setNewPromise(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#FAF8F2] border border-[#E5E2D9] text-[#2D2D2A] text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-[#7C7A68] hover:text-[#2D2D2A] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#B85D43] hover:bg-[#a14f37] text-white font-semibold text-xs cursor-pointer shadow-sm"
                >
                  Save Capsule
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
