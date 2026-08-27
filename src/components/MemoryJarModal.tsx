import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Dices, Plus, RefreshCw, X, Heart, Tag } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import { JarMemory } from '../types';
import { audioEngine } from '../utils/audioSynthesizer';

export const MemoryJarModal: React.FC = () => {
  const { jarMemories, addJarMemory, deleteJarMemory } = useMemory();
  const [selectedMemory, setSelectedMemory] = useState<JarMemory | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newType, setNewType] = useState<JarMemory['type']>('funny');

  const handlePickRandomMemory = () => {
    if (jarMemories.length === 0) return;
    setIsShaking(true);
    audioEngine.playPaperSound();

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * jarMemories.length);
      setSelectedMemory(jarMemories[randomIndex]);
      setIsShaking(false);
      audioEngine.playJarPop();
    }, 600);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    addJarMemory({
      title: newTitle,
      content: newContent,
      type: newType,
      tags: ['Custom', newType]
    });

    setNewTitle('');
    setNewContent('');
    setShowAddForm(false);
    audioEngine.playChime(659.25, 0.8);
  };

  const typeBadges: Record<JarMemory['type'], { color: string; label: string; emoji: string }> = {
    funny: { color: 'bg-[#F3DBD3] text-[#B85D43] border-[#B85D43]/30', label: 'Funny Memory', emoji: '😂' },
    childhood: { color: 'bg-[#FAF8F2] text-[#5A5A40] border-[#E5E2D9]', label: 'Childhood', emoji: '🎠' },
    embarrassing: { color: 'bg-[#F3DBD3] text-[#B85D43] border-[#B85D43]/30', label: 'Embarrassing Blooper', emoji: '🙈' },
    sweet: { color: 'bg-[#FAF8F2] text-[#B85D43] border-[#E5E2D9]', label: 'Sweet Moment', emoji: '🍬' },
    family: { color: 'bg-[#FAF8F2] text-[#5A5A40] border-[#E5E2D9]', label: 'Family Legend', emoji: '🏡' },
    emotional: { color: 'bg-[#F3DBD3] text-[#B85D43] border-[#B85D43]/30', label: 'Heartfelt', emoji: '❤️' }
  };

  return (
    <section id="memory-jar" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#E5E2D9]">
      <div className="text-center space-y-3 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#E5E2D9] text-[#5A5A40] text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#B85D43]" />
          Chapter 8 • The Vault
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#2D2D2A]">
          The Sibling Memory Jar
        </h2>
        <p className="text-[#7C7A68] max-w-xl mx-auto text-sm sm:text-base">
          Contains {jarMemories.length} folded memory slips — some ridiculous, some childhood gems, some emotional tears.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
        {/* Left: The Animated Glass Jar Visual */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <motion.div
            animate={isShaking ? { rotate: [-4, 4, -4, 4, 0], scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5, repeat: isShaking ? 2 : 0 }}
            className="relative w-64 h-80 flex flex-col items-center justify-end"
          >
            {/* Wooden Lid with Cork Texture */}
            <div className="w-40 h-8 bg-[#8C5D3A] rounded-t-lg border-2 border-[#6F4426] shadow-md relative z-20 flex items-center justify-center">
              <div className="w-16 h-2 bg-[#A3744D]/60 rounded-full" />
            </div>

            {/* Glass Jar Body */}
            <div className="relative w-56 h-72 rounded-b-[40px] rounded-t-xl bg-white/70 border-4 border-[#E5E2D9] shadow-lg backdrop-blur-md overflow-hidden flex flex-col justify-end p-4">
              {/* Glass reflection highlight */}
              <div className="absolute top-2 left-3 w-3 h-60 bg-gradient-to-b from-white via-white/40 to-transparent rounded-full transform -rotate-1 pointer-events-none" />

              {/* Glowing Origami Paper Slips inside jar */}
              <div className="flex flex-wrap gap-2 justify-center items-end opacity-90 py-2">
                {jarMemories.slice(0, 16).map((mem, i) => (
                  <motion.div
                    key={mem.id}
                    animate={{
                      y: [0, -3, 0],
                      rotate: [(i * 25) % 40 - 20, (i * 25) % 40 - 15, (i * 25) % 40 - 20]
                    }}
                    transition={{ duration: 3 + (i % 3), repeat: Infinity }}
                    className={`w-9 h-7 rounded shadow-sm border text-[8px] flex items-center justify-center font-mono ${
                      i % 4 === 0
                        ? 'bg-[#FAF8F2] text-[#B85D43] border-[#E5E2D9]'
                        : i % 4 === 1
                        ? 'bg-[#F3DBD3] text-[#B85D43] border-[#B85D43]/30'
                        : i % 4 === 2
                        ? 'bg-white text-[#5A5A40] border-[#E5E2D9]'
                        : 'bg-[#EDE9DF] text-[#5A5A40] border-[#D5D0C2]'
                    }`}
                  >
                    💌
                  </motion.div>
                ))}
              </div>

              {/* Jar Label */}
              <div className="my-2 py-1.5 px-3 bg-white border border-[#E5E2D9] rounded-lg text-center shadow-sm">
                <span className="font-handwriting text-lg text-[#B85D43] font-bold block">
                  Krutarth’s Sibling Jar
                </span>
                <span className="text-[10px] text-[#7C7A68] font-sans">
                  {jarMemories.length} Memories Inside
                </span>
              </div>
            </div>
          </motion.div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              id="pick-memory-jar-button"
              onClick={handlePickRandomMemory}
              disabled={isShaking}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#B85D43] hover:bg-[#a14f37] text-white font-medium shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm sm:text-base disabled:opacity-50"
            >
              <Dices className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
              <span>{isShaking ? 'Shaking the jar…' : 'Pick a memory 🎲'}</span>
            </button>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-white border border-[#E5E2D9] text-[#5A5A40] hover:text-[#2D2D2A] hover:border-[#B5B09E] transition-colors text-xs sm:text-sm cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#B85D43]" />
              <span>Add Memory</span>
            </button>
          </div>
        </div>

        {/* Right: Selected Memory Card Display / Form */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {showAddForm ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleAddSubmit}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E2D9] shadow-xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-serif-title font-bold text-[#2D2D2A]">
                    Add a New Sibling Memory
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="p-1 text-[#7C7A68] hover:text-[#2D2D2A] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <label className="text-xs uppercase text-[#7C7A68] font-semibold block mb-1">
                    Memory Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. That time we snuck out for ice cream"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#E5E2D9] text-[#2D2D2A] focus:outline-none focus:border-[#B85D43] text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase text-[#7C7A68] font-semibold block mb-1">
                    Category
                  </label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as JarMemory['type'])}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#E5E2D9] text-[#2D2D2A] focus:outline-none focus:border-[#B85D43] text-sm"
                  >
                    <option value="funny">Funny Memory 😂</option>
                    <option value="childhood">Childhood Moment 🎠</option>
                    <option value="embarrassing">Embarrassing Blooper 🙈</option>
                    <option value="sweet">Sweet & Wholesome 🍬</option>
                    <option value="family">Family Story 🏡</option>
                    <option value="emotional">Emotional / Deep ❤️</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase text-[#7C7A68] font-semibold block mb-1">
                    What happened? (The story)
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell the funny or sweet details..."
                    value={newContent}
                    onChange={e => setNewContent(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#E5E2D9] text-[#2D2D2A] focus:outline-none focus:border-[#B85D43] text-sm resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 rounded-xl text-xs text-[#7C7A68] hover:text-[#2D2D2A] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#B85D43] hover:bg-[#a14f37] text-white font-semibold text-xs shadow-sm cursor-pointer"
                  >
                    Fold into Jar
                  </button>
                </div>
              </motion.form>
            ) : selectedMemory ? (
              <motion.div
                key={selectedMemory.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                className="p-8 sm:p-10 rounded-2xl bg-white text-[#2D2D2A] shadow-xl border border-[#E5E2D9] relative space-y-4"
              >
                {/* Washi tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape-gold z-10 transform -rotate-1" />

                <div className="flex items-center justify-between text-xs">
                  <span className={`px-3 py-1 rounded-full border font-semibold flex items-center gap-1.5 ${typeBadges[selectedMemory.type].color}`}>
                    <span>{typeBadges[selectedMemory.type].emoji}</span>
                    <span>{typeBadges[selectedMemory.type].label}</span>
                  </span>

                  <button
                    onClick={handlePickRandomMemory}
                    className="flex items-center gap-1 text-[#5A5A40] hover:text-[#2D2D2A] font-medium cursor-pointer"
                    title="Draw another memory"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Draw another</span>
                  </button>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#2D2D2A] pt-2">
                  {selectedMemory.title}
                </h3>

                <p className="font-handwriting text-2xl sm:text-3xl text-[#5A5A40] leading-relaxed py-2">
                  “{selectedMemory.content}”
                </p>

                {selectedMemory.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {selectedMemory.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[11px] px-2 py-0.5 rounded bg-[#FAF8F2] border border-[#E5E2D9] text-[#7C7A68] font-sans">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="p-8 sm:p-12 rounded-2xl bg-white border border-[#E5E2D9] text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F2] border border-[#E5E2D9] text-[#B85D43] flex items-center justify-center mx-auto text-2xl">
                  📜
                </div>
                <h4 className="text-2xl font-serif-title text-[#2D2D2A] font-bold">
                  Draw a Memory from the Jar
                </h4>
                <p className="text-sm text-[#7C7A68] max-w-md mx-auto">
                  Click the <strong className="text-[#B85D43]">“Pick a memory 🎲”</strong> button to unpack an unforgettable moment from our 23 years of sibling life.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
