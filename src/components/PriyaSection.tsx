import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Plane, MapPin, Clock, PhoneCall, CheckCircle2, ShieldCheck, Sparkles, MessageCircleHeart, Camera, Upload } from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import { audioEngine } from '../utils/audioSynthesizer';
import { compressImageFile } from '../utils/imageCompressor';

export const PriyaSection: React.FC = () => {
  const { config, updateConfig, setIsStudioOpen, setStudioInitialTab } = useMemory();
  const [isUploading, setIsUploading] = useState(false);
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected'>('idle');

  const handlePriyaPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const compressedDataUrl = await compressImageFile(file, 1280, 0.85);
      updateConfig({ olderSisterPhotoUrl: compressedDataUrl });
      audioEngine.playChime(659.25, 0.8);
    } catch (err) {
      console.error('Failed to process image:', err);
      alert('Could not process this image. Please try another photo.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  // Live clocks for Surat vs Adelaide
  const [suratTime, setSuratTime] = useState<string>('');
  const [adelaideTime, setAdelaideTime] = useState<string>('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setSuratTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      );
      setAdelaideTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Australia/Adelaide',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      );
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRevealMessage = () => {
    audioEngine.playChime(659.25, 1.2);
    setShowSecretMessage(!showSecretMessage);
  };

  const handleSimulateCall = () => {
    if (callState === 'calling') return;
    setCallState('calling');
    audioEngine.playPhoneRing();

    setTimeout(() => {
      audioEngine.playPhoneRing();
    }, 1500);

    setTimeout(() => {
      setCallState('connected');
      audioEngine.playChime(880, 1.5);
    }, 3200);
  };

  return (
    <section id="priya-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#E5E2D9]">
      {/* Chapter header */}
      <div className="text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#E5E2D9] text-[#5A5A40] text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Heart className="w-3.5 h-3.5 fill-[#B85D43] text-[#B85D43]" />
          Chapter 2 • Big Sister
        </div>
        <h2 className="text-4xl sm:text-6xl font-serif-title font-bold text-[#2D2D2A]">
          {config.olderSisterName} <span className="text-[#B85D43]">❤️</span>
        </h2>
        <p className="font-handwriting text-2xl sm:text-3xl text-[#5A5A40] font-medium">
          “Even though you’re far away now, you’re never far from me.”
        </p>
      </div>

      {/* Main Grid: Emotional Letter & Big Sister Portrait */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: Sincere Words */}
        <div className="lg:col-span-7 space-y-6 text-[#5A5A40]">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E2D9] shadow-md space-y-5">
            <h3 className="text-2xl font-serif-title text-[#2D2D2A] font-bold flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#5A5A40]" />
              You’ve always been one of the people I know I can count on.
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#EAE6DB] text-center">
                <span className="text-[#2D2D2A] font-serif-title text-base block font-medium">You support me</span>
                <span className="text-xs text-[#7C7A68]">In every decision</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#EAE6DB] text-center">
                <span className="text-[#2D2D2A] font-serif-title text-base block font-medium">You have my back</span>
                <span className="text-xs text-[#7C7A68]">Unconditionally</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#EAE6DB] text-center">
                <span className="text-[#2D2D2A] font-serif-title text-base block font-medium">You’ve been there</span>
                <span className="text-xs text-[#7C7A68]">Through thick & thin</span>
              </div>
            </div>

            <p className="text-[#5A5A40] text-base sm:text-lg leading-relaxed pt-2">
              And even though life took you all the way to Adelaide, Australia… that never changed what you are to me.
            </p>

            {/* Secret Button Interactive Reveal */}
            <div className="pt-2">
              <button
                id="priya-secret-reveal-btn"
                onClick={handleRevealMessage}
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAF8F2] hover:bg-[#F3DBD3]/50 border border-[#E5E2D9] text-[#B85D43] font-medium transition-all duration-300 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[#B85D43] group-hover:rotate-45 transition-transform" />
                <span>{showSecretMessage ? "Hide message" : "There’s something I don’t say enough…"}</span>
              </button>

              <AnimatePresence>
                {showSecretMessage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden mt-4"
                  >
                    <div className="p-6 rounded-xl bg-[#FAF8F2] border border-[#B85D43]/30 space-y-3 relative shadow-inner">
                      <div className="absolute top-3 right-3">
                        <MessageCircleHeart className="w-5 h-5 text-[#B85D43]" />
                      </div>
                      <p className="text-[#2D2D2A] font-serif-title text-lg sm:text-xl font-medium">
                        “Thank you for always having my back.”
                      </p>
                      <p className="font-handwriting text-2xl text-[#B85D43] font-medium">
                        And just so you know… I’ll always have yours too.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right: Priya's Polaroid Card with Direct Upload */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative max-w-sm w-full bg-white p-4 sm:p-5 rounded-xl border border-[#E5E2D9] shadow-xl polaroid-card text-[#2D2D2A] transform rotate-1">
            <div className="absolute -top-3 right-8 w-28 h-6 washi-tape-gold z-10 transform rotate-3" />

            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#FAF8F2] group">
              <img
                src={config.olderSisterPhotoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"}
                alt={`${config.olderSisterName} - Big Sister`}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Direct Photo Upload & Change Buttons */}
              <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5">
                <label
                  className={`px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-[#2D2D2A] text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all cursor-pointer border border-[#E5E2D9] ${
                    isUploading ? 'opacity-70 pointer-events-none' : 'hover:scale-105'
                  }`}
                  title={`Upload ${config.olderSisterName}'s photo from your device`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePriyaPhotoUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <Upload className="w-3.5 h-3.5 text-[#B85D43]" />
                  <span>{isUploading ? 'Uploading...' : 'Upload Photo'}</span>
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

              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs flex items-center gap-1.5 pointer-events-none">
                <MapPin className="w-3 h-3 text-[#EAE6DB]" /> {config.olderSisterLocation || 'Adelaide, Australia'}
              </div>
            </div>

            <div className="pt-4 text-center space-y-1">
              <p className="font-handwriting text-2xl text-[#2D2D2A] font-medium">
                {config.olderSisterName} • My Big Sister ❤️
              </p>
              <p className="text-xs text-[#7C7A68] font-sans">
                {config.olderSisterQuote || "The one who paved the way."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: The Distance Card (Surat ↔ Adelaide) */}
      <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E2D9] shadow-md relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF8F2] border border-[#E5E2D9] text-[#5A5A40] text-xs font-semibold uppercase tracking-wider">
              <Plane className="w-3.5 h-3.5 text-[#B85D43]" />
              {config.youngerSisterLocation || 'Surat'} (India) ➔ {config.olderSisterLocation || 'Adelaide (Australia)'}
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif-title font-bold text-[#2D2D2A]">
              Thousands of Kilometres Apart.
            </h3>
            <p className="text-[#7C7A68] text-sm sm:text-base max-w-xl mx-auto">
              “Different country. Different life. Different time zones. But if you ever need your brother… just call.”
            </p>
          </div>

          {/* Interactive Flight Arc Visual & Dual Live Clocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Surat City Box */}
            <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#EAE6DB] text-center space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#5A5A40] font-semibold uppercase">
                <MapPin className="w-3.5 h-3.5 text-[#5A5A40]" /> Surat, Gujarat
              </div>
              <p className="text-xs text-[#7C7A68]">Krutarth & Prisha</p>
              <div className="p-2.5 rounded-lg bg-white border border-[#E5E2D9] flex items-center justify-center gap-2 text-[#2D2D2A] font-mono text-sm shadow-sm">
                <Clock className="w-3.5 h-3.5 text-[#5A5A40]" />
                <span>{suratTime || 'IST (UTC+5:30)'}</span>
              </div>
            </div>

            {/* Flight Path Metrics */}
            <div className="text-center space-y-3 px-2">
              <div className="relative flex items-center justify-center">
                <div className="w-full h-0.5 bg-gradient-to-r from-[#5A5A40] via-[#B85D43] to-[#5A5A40]" />
                <div className="absolute p-2 rounded-full bg-white border border-[#B85D43] text-[#B85D43] shadow-sm">
                  <Plane className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-0.5">
                <span className="text-lg sm:text-xl font-bold font-mono text-[#B85D43]">~9,800 KM</span>
                <p className="text-xs text-[#7C7A68]">Zero distance between hearts</p>
              </div>
            </div>

            {/* Adelaide City Box */}
            <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#EAE6DB] text-center space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#B85D43] font-semibold uppercase">
                <MapPin className="w-3.5 h-3.5 text-[#B85D43]" /> Adelaide, SA
              </div>
              <p className="text-xs text-[#7C7A68]">Priya's Home</p>
              <div className="p-2.5 rounded-lg bg-white border border-[#E5E2D9] flex items-center justify-center gap-2 text-[#2D2D2A] font-mono text-sm shadow-sm">
                <Clock className="w-3.5 h-3.5 text-[#B85D43]" />
                <span>{adelaideTime || 'ACDT/ACST'}</span>
              </div>
            </div>
          </div>

          {/* Interactive Phone Call Simulation */}
          <div className="pt-4 text-center">
            <p className="text-sm sm:text-base text-[#5A5A40] mb-4 font-medium">
              Distance doesn’t really matter when someone is family.
            </p>

            {callState === 'idle' && (
              <button
                id="simulate-priya-call-btn"
                onClick={handleSimulateCall}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#5A5A40] text-white font-medium hover:bg-[#474732] hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer text-sm sm:text-base"
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                <span>Test Call Krutarth from Adelaide 📞</span>
              </button>
            )}

            {callState === 'calling' && (
              <div className="inline-flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#FAF8F2] border border-[#B85D43]/40 animate-pulse">
                <div className="flex items-center gap-2 text-[#B85D43] font-mono text-sm">
                  <PhoneCall className="w-4 h-4 animate-spin" />
                  <span>📞 Calling Krutarth… Connecting across oceans…</span>
                </div>
                <span className="text-xs text-[#7C7A68]">Ringing your brother’s phone in Surat…</span>
              </div>
            )}

            {callState === 'connected' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex flex-col items-center gap-2 p-5 rounded-2xl bg-[#FAF8F2] border border-[#5A5A40]/40 shadow-md"
              >
                <div className="flex items-center gap-2 text-[#5A5A40] font-serif-title text-xl font-bold">
                  <CheckCircle2 className="w-5 h-5 text-[#5A5A40]" />
                  <span>“See? I’m here.”</span>
                </div>
                <p className="font-handwriting text-2xl text-[#B85D43] font-medium">
                  Always just one ring away, Didi. ❤️
                </p>
                <button
                  onClick={() => setCallState('idle')}
                  className="mt-2 text-xs text-[#7C7A68] hover:text-[#2D2D2A] underline cursor-pointer"
                >
                  Reset call test
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
