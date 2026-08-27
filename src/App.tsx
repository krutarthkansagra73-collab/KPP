import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles, Settings, Heart, Phone, ArrowUp, Menu, X, Camera, Mail, Clock } from 'lucide-react';
import { MemoryProvider, useMemory } from './context/MemoryContext';
import { audioEngine } from './utils/audioSynthesizer';

// Subcomponents
import { OpeningSequence } from './components/OpeningSequence';
import { TrioHeroSection } from './components/TrioHeroSection';
import { ChildhoodTimeline } from './components/ChildhoodTimeline';
import { PriyaSection } from './components/PriyaSection';
import { PrishaSection } from './components/PrishaSection';
import { DifferenceComparison } from './components/DifferenceComparison';
import { PhotoScrapbook } from './components/PhotoScrapbook';
import { ThingsNeverSaid } from './components/ThingsNeverSaid';
import { BrotherPromiseLetter } from './components/BrotherPromiseLetter';
import { JustCallHotline } from './components/JustCallHotline';
import { MemoryJarModal } from './components/MemoryJarModal';
import { OpenWhenEnvelopes } from './components/OpenWhenEnvelopes';
import { AudioPlayerSection } from './components/AudioPlayerSection';
import { TimeCapsuleSection } from './components/TimeCapsuleSection';
import { FutureVersionUs } from './components/FutureVersionUs';
import { VirtualRakhiCeremony } from './components/VirtualRakhiCeremony';
import { EasterEggs } from './components/EasterEggs';
import { FinalScreen } from './components/FinalScreen';
import { BrotherStudioModal } from './components/BrotherStudioModal';

const MainExperience: React.FC = () => {
  const { hasEntered, isAudioEnabled, toggleAudio, setIsStudioOpen } = useMemory();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsNavOpen(false);
    audioEngine.playChime(523.25, 0.4);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'The Trio', id: 'trio-hero' },
    { label: 'Timeline', id: 'childhood-timeline' },
    { label: 'Priya (Adelaide)', id: 'priya-section' },
    { label: 'Prisha (Surat)', id: 'prisha-section' },
    { label: 'Photos', id: 'photo-scrapbook' },
    { label: 'The Promise', id: 'brother-promise' },
    { label: '📞 Just Call', id: 'just-call-hotline' },
    { label: 'Memory Jar', id: 'memory-jar' },
    { label: 'Open When', id: 'open-when' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2D2A] paper-texture font-sans selection:bg-[#5A5A40]/20 selection:text-[#5A5A40]">
      {/* Intro sequence gate */}
      <AnimatePresence>
        {!hasEntered && <OpeningSequence />}
      </AnimatePresence>

      {/* Main Experience Layout */}
      {hasEntered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* Floating Top Control Bar */}
          <header className="fixed top-4 left-0 right-0 z-40 px-4 pointer-events-none">
            <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
              {/* Left: Quick Chapter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsNavOpen(!isNavOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#E5E2D9] text-[#5A5A40] text-xs font-semibold hover:border-[#B5B09E] hover:text-[#2D2D2A] shadow-sm transition-all cursor-pointer"
                >
                  <Menu className="w-3.5 h-3.5 text-[#B85D43]" />
                  <span className="hidden sm:inline">Chapters</span>
                </button>

                <AnimatePresence>
                  {isNavOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-12 left-0 w-52 p-2 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E5E2D9] shadow-xl space-y-1 z-50 text-xs text-[#5A5A40]"
                    >
                      {navItems.map(item => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#FAF8F2] text-[#5A5A40] hover:text-[#B85D43] transition-colors flex items-center justify-between cursor-pointer font-medium"
                        >
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right: Ambient Audio & Customizer Studio Controls */}
              <div className="flex items-center gap-2">
                <button
                  id="toggle-ambient-audio"
                  onClick={toggleAudio}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all backdrop-blur-md shadow-sm cursor-pointer ${
                    isAudioEnabled
                      ? 'bg-[#B85D43]/10 text-[#B85D43] border border-[#B85D43]/30'
                      : 'bg-white/90 text-[#5A5A40] border border-[#E5E2D9] hover:text-[#2D2D2A]'
                  }`}
                  title={isAudioEnabled ? 'Mute ambient melody' : 'Play peaceful background chords'}
                >
                  {isAudioEnabled ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#B85D43] animate-pulse" />
                      <span className="hidden sm:inline">Music ON</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Music OFF</span>
                    </>
                  )}
                </button>

                <button
                  id="open-brother-studio"
                  onClick={() => {
                    audioEngine.playChime(659.25, 0.4);
                    setIsStudioOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/90 hover:bg-[#FAF8F2] text-[#5A5A40] hover:text-[#B85D43] border border-[#E5E2D9] text-xs font-semibold transition-all backdrop-blur-md shadow-sm cursor-pointer"
                  title="Customize photos, memories, sister names, or export JSON backup"
                >
                  <Settings className="w-3.5 h-3.5 text-[#B85D43]" />
                  <span className="hidden sm:inline">Studio</span>
                </button>
              </div>
            </div>
          </header>

          {/* Chapters & Content Sections */}
          <main className="space-y-0">
            <TrioHeroSection />
            <ChildhoodTimeline />
            <PriyaSection />
            <PrishaSection />
            <DifferenceComparison />
            <PhotoScrapbook />
            <ThingsNeverSaid />
            <BrotherPromiseLetter />
            <JustCallHotline />
            <MemoryJarModal />
            <OpenWhenEnvelopes />
            <AudioPlayerSection />
            <TimeCapsuleSection />
            <FutureVersionUs />
            <VirtualRakhiCeremony />
            <EasterEggs />
            <FinalScreen />
          </main>

          {/* Sibling Studio Customizer Drawer / Modal */}
          <BrotherStudioModal />

          {/* Scroll to Top Button */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white text-[#5A5A40] hover:text-[#B85D43] border border-[#E5E2D9] hover:border-[#B85D43] shadow-lg backdrop-blur-md transition-colors cursor-pointer"
                title="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <MemoryProvider>
      <MainExperience />
    </MemoryProvider>
  );
}
