import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Save,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  FileText,
  Settings,
  Heart,
  RotateCcw,
  Camera,
  CheckCircle2,
  Sparkles,
  Link as LinkIcon,
  RefreshCw,
  Mail,
  Clock,
  Zap,
  Smile,
  Copy,
  Check
} from 'lucide-react';
import { useMemory } from '../context/MemoryContext';
import { audioEngine } from '../utils/audioSynthesizer';
import { compressImageFile } from '../utils/imageCompressor';
import {
  MemoryPhoto,
  OpenWhenLetter,
  TimeCapsuleEntry,
  ComparisonRow,
  ThingNeverSaid,
  BrotherPromiseItem,
  JarMemory
} from '../types';
import {
  initialConfig,
  initialComparisonRows,
  initialThingsNeverSaid,
  initialBrotherPromises
} from '../data/initialContent';

export const BrotherStudioModal: React.FC = () => {
  const {
    isStudioOpen,
    setIsStudioOpen,
    studioInitialTab,
    config,
    updateConfig,
    photos,
    addPhoto,
    updatePhoto,
    deletePhoto,
    jarMemories,
    addJarMemory,
    updateJarMemory,
    deleteJarMemory,
    openWhenLetters,
    addOpenWhenLetter,
    updateOpenWhenLetter,
    deleteOpenWhenLetter,
    timeCapsules,
    addTimeCapsuleYear,
    updateTimeCapsule,
    deleteTimeCapsule,
    comparisonRows,
    addComparisonRow,
    updateComparisonRow,
    deleteComparisonRow,
    thingsNeverSaid,
    addThingNeverSaid,
    updateThingNeverSaid,
    deleteThingNeverSaid,
    brotherPromises,
    addBrotherPromise,
    updateBrotherPromise,
    deleteBrotherPromise,
    exportMemoryBook,
    importMemoryBook,
    resetToDefaults
  } = useMemory();

  type TabType = 'key_photos' | 'scrapbook' | 'text_content' | 'letters' | 'time_capsule' | 'jar' | 'backup';
  const [activeTab, setActiveTab] = useState<TabType>('key_photos');
  const [uploadingState, setUploadingState] = useState<string | null>(null);
  const [copiedBackup, setCopiedBackup] = useState(false);

  // Sync tab if triggered from outside
  useEffect(() => {
    if (studioInitialTab) {
      if (studioInitialTab === 'photos' || studioInitialTab === 'key_photos') setActiveTab('key_photos');
      else if (studioInitialTab === 'scrapbook') setActiveTab('scrapbook');
      else if (studioInitialTab === 'text' || studioInitialTab === 'text_content') setActiveTab('text_content');
      else if (studioInitialTab === 'letters') setActiveTab('letters');
      else if (studioInitialTab === 'time_capsule') setActiveTab('time_capsule');
      else if (studioInitialTab === 'jar') setActiveTab('jar');
      else if (studioInitialTab === 'backup') setActiveTab('backup');
    }
  }, [studioInitialTab, isStudioOpen]);

  // --- SCRAPBOOK PHOTO FORM STATE ---
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [newPhotoStory, setNewPhotoStory] = useState('');
  const [newPhotoCat, setNewPhotoCat] = useState<MemoryPhoto['category']>('then');
  const [newPhotoYear, setNewPhotoYear] = useState('');
  const [newPhotoLoc, setNewPhotoLoc] = useState('Surat');
  const [newPhotoPreview, setNewPhotoPreview] = useState<string | null>(null);

  // Editing existing photo
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState('');
  const [editYear, setEditYear] = useState('');
  const [editLoc, setEditLoc] = useState('');
  const [editStory, setEditStory] = useState('');
  const [editCat, setEditCat] = useState<MemoryPhoto['category']>('then');

  // --- OPEN WHEN LETTER FORM STATE ---
  const [isAddingLetter, setIsAddingLetter] = useState(false);
  const [editingLetterId, setEditingLetterId] = useState<string | null>(null);
  const [letterTitle, setLetterTitle] = useState('');
  const [letterPreview, setLetterPreview] = useState('');
  const [letterContent, setLetterContent] = useState('');
  const [letterIcon, setLetterIcon] = useState('Mail');
  const [letterPhotoUrl, setLetterPhotoUrl] = useState('');

  // --- COMPARISON ROW FORM STATE ---
  const [isAddingCompRow, setIsAddingCompRow] = useState(false);
  const [editingCompId, setEditingCompId] = useState<string | null>(null);
  const [compTrait, setCompTrait] = useState('');
  const [compPriya, setCompPriya] = useState('');
  const [compKrutarth, setCompKrutarth] = useState('');
  const [compPrisha, setCompPrisha] = useState('');

  // --- THINGS NEVER SAID FORM STATE ---
  const [isAddingUnsaid, setIsAddingUnsaid] = useState(false);
  const [editingUnsaidId, setEditingUnsaidId] = useState<string | null>(null);
  const [unsaidQuote, setUnsaidQuote] = useState('');
  const [unsaidDetail, setUnsaidDetail] = useState('');

  // --- BROTHER PROMISE FORM STATE ---
  const [isAddingPromise, setIsAddingPromise] = useState(false);
  const [editingPromiseId, setEditingPromiseId] = useState<string | null>(null);
  const [promiseLead, setPromiseLead] = useState('');
  const [promiseText, setPromiseText] = useState('');
  const [promiseHumor, setPromiseHumor] = useState('');

  // --- TIME CAPSULE FORM STATE ---
  const [isAddingCapsule, setIsAddingCapsule] = useState(false);
  const [editingCapsuleYear, setEditingCapsuleYear] = useState<number | null>(null);
  const [capsuleYear, setCapsuleYear] = useState(2029);
  const [capsuleUnlockDate, setCapsuleUnlockDate] = useState('August 2029');
  const [capsuleTitle, setCapsuleTitle] = useState('');
  const [capsuleLetter, setCapsuleLetter] = useState('');
  const [capsulePromise, setCapsulePromise] = useState('');

  // --- MEMORY JAR FORM STATE ---
  const [isAddingJar, setIsAddingJar] = useState(false);
  const [jarTitle, setJarTitle] = useState('');
  const [jarContent, setJarContent] = useState('');
  const [jarType, setJarType] = useState<JarMemory['type']>('memory');

  // Handle uploading device image for Key Chapter Photos
  const handleKeyPhotoUpload = async (
    field: 'heroPhotoUrl' | 'olderSisterPhotoUrl' | 'youngerSisterPhotoUrl' | 'youngerSisterBabyPhotoUrl' | 'finalPhotoUrl',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingState(field);
    try {
      const compressedDataUrl = await compressImageFile(file, 1280, 0.85);
      updateConfig({ [field]: compressedDataUrl });
      audioEngine.playChime(659.25, 0.7);
    } catch (err) {
      console.error('Failed to process image:', err);
      alert('Could not process this image. Please try another photo.');
    } finally {
      setUploadingState(null);
      e.target.value = '';
    }
  };

  // Handle uploading device image for new scrapbook photo
  const handleNewScrapbookPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingState('new_scrapbook');
    try {
      const compressedDataUrl = await compressImageFile(file, 1280, 0.85);
      setNewPhotoUrl(compressedDataUrl);
      setNewPhotoPreview(compressedDataUrl);
      audioEngine.playChime(587.33, 0.5);
    } catch (err) {
      console.error('Failed to compress photo:', err);
      alert('Could not process this image.');
    } finally {
      setUploadingState(null);
      e.target.value = '';
    }
  };

  // Handle replacing an existing scrapbook photo with a device file
  const handleReplaceScrapbookPhoto = async (photoId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingState(`replace_${photoId}`);
    try {
      const compressedDataUrl = await compressImageFile(file, 1280, 0.85);
      updatePhoto(photoId, { url: compressedDataUrl });
      audioEngine.playChime(659.25, 0.7);
    } catch (err) {
      console.error('Failed to replace photo:', err);
      alert('Could not process this image.');
    } finally {
      setUploadingState(null);
      e.target.value = '';
    }
  };

  // Handle upload image inside Open When letter
  const handleLetterPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file, 1280, 0.85);
      setLetterPhotoUrl(compressed);
      audioEngine.playChime(659.25, 0.5);
    } catch {
      alert('Could not process letter image.');
    }
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = newPhotoUrl || newPhotoPreview;
    if (!finalUrl) {
      alert('Please select a photo from your device or paste an image URL.');
      return;
    }
    if (!newPhotoCaption.trim()) {
      alert('Please enter a caption for this memory.');
      return;
    }

    addPhoto({
      url: finalUrl,
      caption: newPhotoCaption.trim(),
      fullStory: newPhotoStory.trim() || undefined,
      category: newPhotoCat,
      year: newPhotoYear.trim() || new Date().getFullYear().toString(),
      location: newPhotoLoc.trim() || 'Surat'
    });

    setNewPhotoUrl('');
    setNewPhotoPreview(null);
    setNewPhotoCaption('');
    setNewPhotoStory('');
    setNewPhotoYear('');
    audioEngine.playChime(659.25, 0.9);
  };

  const startEditPhoto = (p: MemoryPhoto) => {
    setEditingPhotoId(p.id);
    setEditCaption(p.caption);
    setEditYear(p.year || '');
    setEditLoc(p.location || '');
    setEditStory(p.fullStory || '');
    setEditCat(p.category);
  };

  const saveEditPhoto = (id: string) => {
    updatePhoto(id, {
      caption: editCaption,
      year: editYear,
      location: editLoc,
      fullStory: editStory,
      category: editCat
    });
    setEditingPhotoId(null);
    audioEngine.playChime(523.25, 0.6);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const ok = importMemoryBook(reader.result);
          if (ok) {
            alert('Memory book successfully restored with all photos & text!');
            audioEngine.playChime(880, 1);
          } else {
            alert('Could not parse the backup JSON file.');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const handleCopyBackup = () => {
    const backup = {
      config,
      photos,
      jarMemories,
      openWhenLetters,
      timeCapsules,
      comparisonRows,
      thingsNeverSaid,
      brotherPromises,
      exportedAt: new Date().toISOString()
    };
    navigator.clipboard.writeText(JSON.stringify(backup, null, 2));
    setCopiedBackup(true);
    setTimeout(() => setCopiedBackup(false), 2500);
    audioEngine.playChime(784, 0.5);
  };

  if (!isStudioOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative max-w-5xl w-full bg-white border border-[#E5E2D9] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh] text-[#2D2D2A]"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#E5E2D9] bg-[#FAF8F2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#F3DBD3] text-[#B85D43]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-serif-title font-bold text-[#2D2D2A] flex items-center gap-2">
                Memory Book Customizer & Studio
                <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded-full bg-[#B85D43]/10 text-[#B85D43] border border-[#B85D43]/20">
                  Full Control
                </span>
              </h3>
              <p className="text-xs text-[#7C7A68]">
                Add, edit, replace or remove any photo, sister profile, letter, promise or note
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsStudioOpen(false)}
            className="p-2 rounded-full bg-white hover:bg-[#E5E2D9] text-[#7C7A68] hover:text-[#2D2D2A] cursor-pointer shadow-sm transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E5E2D9] bg-[#FAF8F2]/70 px-3 sm:px-6 gap-1 sm:gap-2 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('key_photos')}
            className={`py-3 px-3 sm:px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'key_photos'
                ? 'border-[#B85D43] text-[#B85D43] bg-white rounded-t-lg shadow-sm'
                : 'border-transparent text-[#7C7A68] hover:text-[#2D2D2A]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Key Photos</span>
          </button>

          <button
            onClick={() => setActiveTab('scrapbook')}
            className={`py-3 px-3 sm:px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'scrapbook'
                ? 'border-[#B85D43] text-[#B85D43] bg-white rounded-t-lg shadow-sm'
                : 'border-transparent text-[#7C7A68] hover:text-[#2D2D2A]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Scrapbook ({photos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('text_content')}
            className={`py-3 px-3 sm:px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'text_content'
                ? 'border-[#B85D43] text-[#B85D43] bg-white rounded-t-lg shadow-sm'
                : 'border-transparent text-[#7C7A68] hover:text-[#2D2D2A]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Text & Promises</span>
          </button>

          <button
            onClick={() => setActiveTab('letters')}
            className={`py-3 px-3 sm:px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'letters'
                ? 'border-[#B85D43] text-[#B85D43] bg-white rounded-t-lg shadow-sm'
                : 'border-transparent text-[#7C7A68] hover:text-[#2D2D2A]'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Open When ({openWhenLetters.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('time_capsule')}
            className={`py-3 px-3 sm:px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'time_capsule'
                ? 'border-[#B85D43] text-[#B85D43] bg-white rounded-t-lg shadow-sm'
                : 'border-transparent text-[#7C7A68] hover:text-[#2D2D2A]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Time Capsule ({timeCapsules.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('jar')}
            className={`py-3 px-3 sm:px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'jar'
                ? 'border-[#B85D43] text-[#B85D43] bg-white rounded-t-lg shadow-sm'
                : 'border-transparent text-[#7C7A68] hover:text-[#2D2D2A]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Memory Jar ({jarMemories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`py-3 px-3 sm:px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'backup'
                ? 'border-[#B85D43] text-[#B85D43] bg-white rounded-t-lg shadow-sm'
                : 'border-transparent text-[#7C7A68] hover:text-[#2D2D2A]'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup / Export</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* ======================================================== */}
          {/* TAB 1: KEY CHAPTER PHOTOS */}
          {/* ======================================================== */}
          {activeTab === 'key_photos' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5E2D9] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-base font-serif-title font-bold text-[#2D2D2A]">
                    Featured Chapter Portraits & Real Photos
                  </h4>
                  <p className="text-xs text-[#7C7A68]">
                    Click <strong className="text-[#B85D43]">“Upload Real Photo”</strong> to pick photos directly from your phone or computer.
                  </p>
                </div>
                <span className="text-[11px] px-3 py-1 rounded-full bg-white border border-[#E5E2D9] text-[#5A5A40] font-medium self-start sm:self-auto">
                  5 Key Spots
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. HERO MAIN PHOTO */}
                <div className="p-5 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#B85D43]">
                        Chapter 0 • Opening Hero
                      </span>
                      <h5 className="font-serif-title font-bold text-base text-[#2D2D2A]">
                        Main Trio Photo
                      </h5>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF8F2] border border-[#E5E2D9] text-[#7C7A68]">
                      Top of Website
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#FAF8F2] border border-[#E5E2D9]">
                    <img
                      src={config.heroPhotoUrl}
                      alt="Hero Trio"
                      className="w-full h-full object-cover"
                    />
                    {uploadingState === 'heroPhotoUrl' && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-semibold">
                        Optimizing photo...
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#B85D43] hover:bg-[#a14f37] text-white text-xs font-semibold cursor-pointer transition-colors shadow-sm">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Real Hero Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => handleKeyPhotoUpload('heroPhotoUrl', e)}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => updateConfig({ heroPhotoUrl: initialConfig.heroPhotoUrl })}
                        className="p-2.5 rounded-xl bg-[#FAF8F2] hover:bg-[#E5E2D9] border border-[#E5E2D9] text-[#7C7A68] text-xs cursor-pointer"
                        title="Reset to default photo"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1">
                      <LinkIcon className="w-3 h-3 text-[#7C7A68]" />
                      <input
                        type="text"
                        placeholder="Or paste direct image URL"
                        value={config.heroPhotoUrl}
                        onChange={e => updateConfig({ heroPhotoUrl: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#FAF8F2] border border-[#E5E2D9] text-[#2D2D2A] text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. PRIYA'S CHAPTER PHOTO */}
                <div className="p-5 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#B85D43]">
                        Chapter 2 • Older Sister
                      </span>
                      <h5 className="font-serif-title font-bold text-base text-[#2D2D2A]">
                        {config.olderSisterName}’s Featured Portrait
                      </h5>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF8F2] border border-[#E5E2D9] text-[#7C7A68]">
                      Polaroid Card
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#FAF8F2] border border-[#E5E2D9]">
                    <img
                      src={config.olderSisterPhotoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"}
                      alt="Priya"
                      className="w-full h-full object-cover"
                    />
                    {uploadingState === 'olderSisterPhotoUrl' && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-semibold">
                        Optimizing photo...
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#B85D43] hover:bg-[#a14f37] text-white text-xs font-semibold cursor-pointer transition-colors shadow-sm">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload {config.olderSisterName}’s Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => handleKeyPhotoUpload('olderSisterPhotoUrl', e)}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => updateConfig({ olderSisterPhotoUrl: initialConfig.olderSisterPhotoUrl })}
                        className="p-2.5 rounded-xl bg-[#FAF8F2] hover:bg-[#E5E2D9] border border-[#E5E2D9] text-[#7C7A68] text-xs cursor-pointer"
                        title="Reset to default photo"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1">
                      <LinkIcon className="w-3 h-3 text-[#7C7A68]" />
                      <input
                        type="text"
                        placeholder="Or paste direct image URL"
                        value={config.olderSisterPhotoUrl || ''}
                        onChange={e => updateConfig({ olderSisterPhotoUrl: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#FAF8F2] border border-[#E5E2D9] text-[#2D2D2A] text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. PRISHA'S NOW PHOTO (AGE 16) */}
                <div className="p-5 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#B85D43]">
                        Chapter 3 • Younger Sister
                      </span>
                      <h5 className="font-serif-title font-bold text-base text-[#2D2D2A]">
                        {config.youngerSisterName}’s Photo (Now)
                      </h5>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF8F2] border border-[#E5E2D9] text-[#7C7A68]">
                      Sweet 16 Polaroid
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#FAF8F2] border border-[#E5E2D9]">
                    <img
                      src={config.youngerSisterPhotoUrl || "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop"}
                      alt="Prisha Now"
                      className="w-full h-full object-cover"
                    />
                    {uploadingState === 'youngerSisterPhotoUrl' && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-semibold">
                        Optimizing photo...
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#B85D43] hover:bg-[#a14f37] text-white text-xs font-semibold cursor-pointer transition-colors shadow-sm">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload {config.youngerSisterName}’s Current Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => handleKeyPhotoUpload('youngerSisterPhotoUrl', e)}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => updateConfig({ youngerSisterPhotoUrl: initialConfig.youngerSisterPhotoUrl })}
                        className="p-2.5 rounded-xl bg-[#FAF8F2] hover:bg-[#E5E2D9] border border-[#E5E2D9] text-[#7C7A68] text-xs cursor-pointer"
                        title="Reset to default photo"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1">
                      <LinkIcon className="w-3 h-3 text-[#7C7A68]" />
                      <input
                        type="text"
                        placeholder="Or paste direct image URL"
                        value={config.youngerSisterPhotoUrl || ''}
                        onChange={e => updateConfig({ youngerSisterPhotoUrl: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#FAF8F2] border border-[#E5E2D9] text-[#2D2D2A] text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. PRISHA'S BABY PHOTO */}
                <div className="p-5 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#B85D43]">
                        Chapter 3 • Little Sister Baby
                      </span>
                      <h5 className="font-serif-title font-bold text-base text-[#2D2D2A]">
                        {config.youngerSisterName}’s Baby / Childhood Photo
                      </h5>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF8F2] border border-[#E5E2D9] text-[#7C7A68]">
                      Baby Polaroid
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#FAF8F2] border border-[#E5E2D9]">
                    <img
                      src={config.youngerSisterBabyPhotoUrl || "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?q=80&w=800&auto=format&fit=crop"}
                      alt="Prisha Baby"
                      className="w-full h-full object-cover"
                    />
                    {uploadingState === 'youngerSisterBabyPhotoUrl' && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-semibold">
                        Optimizing photo...
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#B85D43] hover:bg-[#a14f37] text-white text-xs font-semibold cursor-pointer transition-colors shadow-sm">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Baby Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => handleKeyPhotoUpload('youngerSisterBabyPhotoUrl', e)}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => updateConfig({ youngerSisterBabyPhotoUrl: initialConfig.youngerSisterBabyPhotoUrl })}
                        className="p-2.5 rounded-xl bg-[#FAF8F2] hover:bg-[#E5E2D9] border border-[#E5E2D9] text-[#7C7A68] text-xs cursor-pointer"
                        title="Reset to default photo"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1">
                      <LinkIcon className="w-3 h-3 text-[#7C7A68]" />
                      <input
                        type="text"
                        placeholder="Or paste direct image URL"
                        value={config.youngerSisterBabyPhotoUrl || ''}
                        onChange={e => updateConfig({ youngerSisterBabyPhotoUrl: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#FAF8F2] border border-[#E5E2D9] text-[#2D2D2A] text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. FINAL SCREEN DEDICATION PHOTO */}
                <div className="p-5 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm space-y-4 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#B85D43]">
                        Final Chapter • Dedication & Finale
                      </span>
                      <h5 className="font-serif-title font-bold text-base text-[#2D2D2A]">
                        “Together In Every Chapter” Best Trio Memory
                      </h5>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF8F2] border border-[#E5E2D9] text-[#7C7A68]">
                      Bottom Finale
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <div className="sm:col-span-1 relative aspect-[16/10] rounded-xl overflow-hidden bg-[#FAF8F2] border border-[#E5E2D9]">
                      <img
                        src={config.finalPhotoUrl}
                        alt="Final Trio"
                        className="w-full h-full object-cover"
                      />
                      {uploadingState === 'finalPhotoUrl' && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-semibold">
                          Optimizing photo...
                        </div>
                      )}
                    </div>

                    <div className="sm:col-span-2 space-y-3">
                      <p className="text-xs text-[#7C7A68]">
                        This photo appears at the very end of the memory book before your promise. Choose a photo where all three of you are smiling!
                      </p>
                      <div className="flex items-center gap-2">
                        <label className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#B85D43] hover:bg-[#a14f37] text-white text-xs font-semibold cursor-pointer transition-colors shadow-sm">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Finale Trio Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={e => handleKeyPhotoUpload('finalPhotoUrl', e)}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => updateConfig({ finalPhotoUrl: initialConfig.finalPhotoUrl })}
                          className="p-2.5 rounded-xl bg-[#FAF8F2] hover:bg-[#E5E2D9] border border-[#E5E2D9] text-[#7C7A68] text-xs cursor-pointer"
                          title="Reset to default photo"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 pt-1">
                        <LinkIcon className="w-3 h-3 text-[#7C7A68]" />
                        <input
                          type="text"
                          placeholder="Or paste direct image URL"
                          value={config.finalPhotoUrl}
                          onChange={e => updateConfig({ finalPhotoUrl: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-[#FAF8F2] border border-[#E5E2D9] text-[#2D2D2A] text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: SCRAPBOOK GALLERY & TIMELINE PHOTOS */}
          {/* ======================================================== */}
          {activeTab === 'scrapbook' && (
            <div className="space-y-8">
              {/* Form: Add New Photo */}
              <form
                onSubmit={handleAddPhotoSubmit}
                className="p-6 rounded-2xl bg-[#FAF8F2] border border-[#E5E2D9] space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-serif-title font-bold text-[#2D2D2A] flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#B85D43]" />
                    Add Real Sibling Photograph to Scrapbook
                  </h4>
                  <span className="text-xs text-[#7C7A68]">
                    Appears in Chapter 1 Timeline & Chapter 5 Scrapbook
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                  {/* Photo Dropzone / Selector */}
                  <div className="sm:col-span-5 space-y-2">
                    <label className="block text-xs font-semibold text-[#7C7A68] uppercase">
                      Select Photo from Phone / PC
                    </label>
                    <label className="border-2 border-dashed border-[#B85D43]/40 hover:border-[#B85D43] bg-white rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all min-h-[160px] text-center group">
                      {newPhotoPreview ? (
                        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                          <img
                            src={newPhotoPreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded">
                            Change File
                          </span>
                        </div>
                      ) : (
                        <>
                          <div className="p-3 rounded-full bg-[#F3DBD3] text-[#B85D43] group-hover:scale-110 transition-transform">
                            <Upload className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold text-[#2D2D2A]">
                            Click to browse photo file
                          </span>
                          <span className="text-[11px] text-[#7C7A68]">
                            JPEG, PNG, WEBP (automatically optimized)
                          </span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleNewScrapbookPhotoUpload}
                        className="hidden"
                      />
                    </label>

                    <div className="flex items-center gap-1.5 pt-1">
                      <LinkIcon className="w-3 h-3 text-[#7C7A68]" />
                      <input
                        type="text"
                        placeholder="Or paste external image URL"
                        value={newPhotoUrl}
                        onChange={e => {
                          setNewPhotoUrl(e.target.value);
                          setNewPhotoPreview(e.target.value);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-[#2D2D2A] text-xs"
                      />
                    </div>
                  </div>

                  {/* Details Form */}
                  <div className="sm:col-span-7 space-y-3">
                    <div>
                      <label className="text-xs text-[#7C7A68] uppercase font-semibold block mb-1">
                        Caption / Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Diwali terrace photo with Priya & Prisha"
                        value={newPhotoCaption}
                        onChange={e => setNewPhotoCaption(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="text-xs text-[#7C7A68] uppercase font-semibold block mb-1">
                          Category
                        </label>
                        <select
                          value={newPhotoCat}
                          onChange={e => setNewPhotoCat(e.target.value as MemoryPhoto['category'])}
                          className="w-full px-2.5 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                        >
                          <option value="then">Then (Childhood)</option>
                          <option value="growing_up">Growing Up</option>
                          <option value="family">Family & Wedding</option>
                          <option value="chaos">Random Chaos 😂</option>
                          <option value="now">Now (Recent)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs text-[#7C7A68] uppercase font-semibold block mb-1">
                          Year
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 2014"
                          value={newPhotoYear}
                          onChange={e => setNewPhotoYear(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-[#7C7A68] uppercase font-semibold block mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Surat"
                          value={newPhotoLoc}
                          onChange={e => setNewPhotoLoc(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-[#7C7A68] uppercase font-semibold block mb-1">
                        Backstory / Sibling Memory Note (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="What happened on that day? Any funny story or memory to share?"
                        value={newPhotoStory}
                        onChange={e => setNewPhotoStory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-[#B85D43] hover:bg-[#a14f37] text-white font-semibold text-xs cursor-pointer shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Sibling Memory Book</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Current Scrapbook Photos List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-serif-title font-bold text-[#2D2D2A]">
                    All Scrapbook & Gallery Photos ({photos.length})
                  </h4>
                  <span className="text-xs text-[#7C7A68]">
                    Click “Replace Image” to swap any photo instantly
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {photos.map(p => (
                    <div
                      key={p.id}
                      className="p-4 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        {/* Thumbnail with overlay replace button */}
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF8F2] border border-[#E5E2D9] group">
                          <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
                          <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-xs font-semibold cursor-pointer transition-opacity">
                            <Upload className="w-5 h-5 mb-1" />
                            <span>Click to Replace Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={e => handleReplaceScrapbookPhoto(p.id, e)}
                              className="hidden"
                            />
                          </label>

                          {uploadingState === `replace_${p.id}` && (
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-xs font-semibold">
                              Replacing...
                            </div>
                          )}
                        </div>

                        {/* Text Details / Edit Form */}
                        {editingPhotoId === p.id ? (
                          <div className="space-y-2 pt-1">
                            <input
                              type="text"
                              value={editCaption}
                              onChange={e => setEditCaption(e.target.value)}
                              className="w-full px-2 py-1 rounded bg-[#FAF8F2] border border-[#E5E2D9] text-xs"
                              placeholder="Caption"
                            />
                            <div className="grid grid-cols-2 gap-1">
                              <input
                                type="text"
                                value={editYear}
                                onChange={e => setEditYear(e.target.value)}
                                className="w-full px-2 py-1 rounded bg-[#FAF8F2] border border-[#E5E2D9] text-xs"
                                placeholder="Year"
                              />
                              <input
                                type="text"
                                value={editLoc}
                                onChange={e => setEditLoc(e.target.value)}
                                className="w-full px-2 py-1 rounded bg-[#FAF8F2] border border-[#E5E2D9] text-xs"
                                placeholder="Location"
                              />
                            </div>
                            <div className="flex items-center gap-1 pt-1">
                              <button
                                type="button"
                                onClick={() => saveEditPhoto(p.id)}
                                className="flex-1 py-1 rounded bg-[#5A5A40] text-white text-[11px] font-semibold"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingPhotoId(null)}
                                className="px-2 py-1 rounded bg-[#E5E2D9] text-[#2D2D2A] text-[11px]"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-[#2D2D2A] line-clamp-2">
                              “{p.caption}”
                            </p>
                            <div className="flex items-center justify-between text-[11px] text-[#7C7A68]">
                              <span>{p.year || 'Timeless'} • {p.location || 'Surat'}</span>
                              <span className="capitalize px-2 py-0.5 rounded bg-[#FAF8F2] border border-[#E5E2D9]">
                                {p.category.replace('_', ' ')}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions toolbar */}
                      <div className="pt-2 border-t border-[#E5E2D9] flex items-center justify-between">
                        <label className="inline-flex items-center gap-1 text-xs text-[#B85D43] hover:underline font-semibold cursor-pointer">
                          <Upload className="w-3 h-3" />
                          <span>Replace Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={e => handleReplaceScrapbookPhoto(p.id, e)}
                            className="hidden"
                          />
                        </label>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => startEditPhoto(p)}
                            className="p-1 text-[#7C7A68] hover:text-[#2D2D2A] cursor-pointer"
                            title="Edit Details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove photo "${p.caption}"?`)) {
                                deletePhoto(p.id);
                              }
                            }}
                            className="p-1 text-[#B85D43] hover:text-[#8C3A24] cursor-pointer"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: ALL TEXT, SIBLING PROFILES, MATRIX & PROMISES */}
          {/* ======================================================== */}
          {activeTab === 'text_content' && (
            <div className="space-y-8">
              {/* SECTION A: SIBLING NAMES & PROFILES */}
              <div className="p-6 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
                  <h4 className="text-base font-serif-title font-bold text-[#2D2D2A] flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#B85D43]" />
                    Sibling Profiles, Titles & Descriptions
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Older Sister */}
                  <div className="space-y-3 p-4 rounded-xl bg-[#FAF8F2] border border-[#E5E2D9]">
                    <span className="text-xs font-bold uppercase text-[#B85D43]">Older Sister</span>
                    <div>
                      <label className="text-[11px] text-[#7C7A68] block">Name</label>
                      <input
                        type="text"
                        value={config.olderSisterName}
                        onChange={e => updateConfig({ olderSisterName: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-[#7C7A68] block">Age</label>
                        <input
                          type="number"
                          value={config.olderSisterAge}
                          onChange={e => updateConfig({ olderSisterAge: Number(e.target.value) })}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-[#7C7A68] block">Location</label>
                        <input
                          type="text"
                          value={config.olderSisterLocation}
                          onChange={e => updateConfig({ olderSisterLocation: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-[#7C7A68] block">Persona Quote</label>
                      <input
                        type="text"
                        value={config.olderSisterQuote || "The responsible one."}
                        onChange={e => updateConfig({ olderSisterQuote: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-[#7C7A68] block">Description</label>
                      <textarea
                        rows={2}
                        value={config.olderSisterDescription || ""}
                        onChange={e => updateConfig({ olderSisterDescription: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A] resize-none"
                      />
                    </div>
                  </div>

                  {/* Brother */}
                  <div className="space-y-3 p-4 rounded-xl bg-[#FAF8F2] border border-[#5A5A40]/40">
                    <span className="text-xs font-bold uppercase text-[#5A5A40]">Brother</span>
                    <div>
                      <label className="text-[11px] text-[#7C7A68] block">Name</label>
                      <input
                        type="text"
                        value={config.brotherName}
                        onChange={e => updateConfig({ brotherName: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-[#7C7A68] block">Age</label>
                        <input
                          type="number"
                          value={config.brotherAge}
                          onChange={e => updateConfig({ brotherAge: Number(e.target.value) })}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-[#7C7A68] block">Phone / Hotline</label>
                        <input
                          type="text"
                          value={config.brotherPhone || ""}
                          onChange={e => updateConfig({ brotherPhone: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-[#7C7A68] block">Website Title</label>
                      <input
                        type="text"
                        value={config.websiteTitle}
                        onChange={e => updateConfig({ websiteTitle: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-[#7C7A68] block">Opening Dedication Note</label>
                      <textarea
                        rows={2}
                        value={config.alternativeOpening || ""}
                        onChange={e => updateConfig({ alternativeOpening: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A] resize-none"
                      />
                    </div>
                  </div>

                  {/* Younger Sister */}
                  <div className="space-y-3 p-4 rounded-xl bg-[#FAF8F2] border border-[#E5E2D9]">
                    <span className="text-xs font-bold uppercase text-[#B85D43]">Younger Sister</span>
                    <div>
                      <label className="text-[11px] text-[#7C7A68] block">Name</label>
                      <input
                        type="text"
                        value={config.youngerSisterName}
                        onChange={e => updateConfig({ youngerSisterName: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-[#7C7A68] block">Age</label>
                        <input
                          type="number"
                          value={config.youngerSisterAge}
                          onChange={e => updateConfig({ youngerSisterAge: Number(e.target.value) })}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-[#7C7A68] block">Location</label>
                        <input
                          type="text"
                          value={config.youngerSisterLocation}
                          onChange={e => updateConfig({ youngerSisterLocation: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-[#7C7A68] block">Persona Quote</label>
                      <input
                        type="text"
                        value={config.youngerSisterQuote || "The little one."}
                        onChange={e => updateConfig({ youngerSisterQuote: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-[#7C7A68] block">Description</label>
                      <textarea
                        rows={2}
                        value={config.youngerSisterDescription || ""}
                        onChange={e => updateConfig({ youngerSisterDescription: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A] resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION B: BROTHER'S PROMISE LETTER & CHECKLIST */}
              <div className="p-6 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
                  <h4 className="text-base font-serif-title font-bold text-[#2D2D2A] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B85D43]" />
                    Brother’s Promise Oath & Letter Preamble
                  </h4>
                  <button
                    onClick={() => setIsAddingPromise(true)}
                    className="px-3 py-1 rounded-full bg-[#FAF8F2] hover:bg-[#E5E2D9] text-[#B85D43] text-xs font-semibold flex items-center gap-1 border border-[#E5E2D9] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Promise Line</span>
                  </button>
                </div>

                <div>
                  <label className="text-xs uppercase text-[#7C7A68] font-semibold block mb-1">
                    Letter Intro Paragraph
                  </label>
                  <textarea
                    rows={2}
                    value={config.brotherLetterPreamble || ""}
                    onChange={e => updateConfig({ brotherLetterPreamble: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#E5E2D9] text-[#2D2D2A] text-xs resize-none"
                  />
                </div>

                {isAddingPromise && (
                  <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#B85D43]/40 space-y-3">
                    <span className="text-xs font-bold text-[#B85D43]">Add New Sibling Promise</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="Lead condition (e.g. If you need advice,)"
                        value={promiseLead}
                        onChange={e => setPromiseLead(e.target.value)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Promise action (e.g. I’ll answer your 2 AM call.)"
                        value={promiseText}
                        onChange={e => setPromiseText(e.target.value)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Humor note (Optional)"
                        value={promiseHumor}
                        onChange={e => setPromiseHumor(e.target.value)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (!promiseLead || !promiseText) return;
                          addBrotherPromise({
                            lead: promiseLead,
                            text: promiseText,
                            humorNote: promiseHumor || undefined
                          });
                          setPromiseLead('');
                          setPromiseText('');
                          setPromiseHumor('');
                          setIsAddingPromise(false);
                        }}
                        className="px-4 py-1.5 rounded-lg bg-[#B85D43] text-white text-xs font-semibold cursor-pointer"
                      >
                        Add Promise
                      </button>
                      <button
                        onClick={() => setIsAddingPromise(false)}
                        className="px-3 py-1.5 rounded-lg bg-[#E5E2D9] text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {brotherPromises.map(p => (
                    <div
                      key={p.id}
                      className="p-3 rounded-xl bg-[#FAF8F2] border border-[#E5E2D9] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex-1">
                        <strong>{p.lead}</strong> {p.text}{" "}
                        {p.humorNote && <span className="text-[#B85D43] italic">{p.humorNote}</span>}
                      </div>
                      <button
                        onClick={() => deleteBrotherPromise(p.id)}
                        className="text-[#B85D43] hover:text-[#8C3A24] p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION C: SIBLING DYNAMICS / COMPARISON MATRIX */}
              <div className="p-6 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
                  <h4 className="text-base font-serif-title font-bold text-[#2D2D2A] flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#B85D43]" />
                    Sibling Difference & Operations Matrix
                  </h4>
                  <button
                    onClick={() => setIsAddingCompRow(true)}
                    className="px-3 py-1 rounded-full bg-[#FAF8F2] hover:bg-[#E5E2D9] text-[#B85D43] text-xs font-semibold flex items-center gap-1 border border-[#E5E2D9] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Trait Row</span>
                  </button>
                </div>

                {isAddingCompRow && (
                  <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#B85D43]/40 space-y-3">
                    <span className="text-xs font-bold text-[#B85D43]">Add Comparison Trait</span>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                      <input
                        type="text"
                        placeholder="Trait (e.g. Driving Style)"
                        value={compTrait}
                        onChange={e => setCompTrait(e.target.value)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs"
                      />
                      <input
                        type="text"
                        placeholder={`${config.olderSisterName}'s reaction`}
                        value={compPriya}
                        onChange={e => setCompPriya(e.target.value)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs"
                      />
                      <input
                        type="text"
                        placeholder={`${config.brotherName}'s reaction`}
                        value={compKrutarth}
                        onChange={e => setCompKrutarth(e.target.value)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs"
                      />
                      <input
                        type="text"
                        placeholder={`${config.youngerSisterName}'s reaction`}
                        value={compPrisha}
                        onChange={e => setCompPrisha(e.target.value)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (!compTrait) return;
                          addComparisonRow({
                            trait: compTrait,
                            priya: compPriya || 'No comment',
                            krutarth: compKrutarth || 'Defends himself',
                            prisha: compPrisha || 'Makes fun'
                          });
                          setCompTrait('');
                          setCompPriya('');
                          setCompKrutarth('');
                          setCompPrisha('');
                          setIsAddingCompRow(false);
                        }}
                        className="px-4 py-1.5 rounded-lg bg-[#B85D43] text-white text-xs font-semibold cursor-pointer"
                      >
                        Add Row
                      </button>
                      <button
                        onClick={() => setIsAddingCompRow(false)}
                        className="px-3 py-1.5 rounded-lg bg-[#E5E2D9] text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {comparisonRows.map(r => (
                    <div
                      key={r.id}
                      className="p-3 rounded-xl bg-[#FAF8F2] border border-[#E5E2D9] grid grid-cols-1 sm:grid-cols-4 gap-2 items-center text-xs"
                    >
                      <span className="font-bold text-[#5A5A40]">{r.trait}</span>
                      <span className="text-[#7C7A68]">{config.olderSisterName}: {r.priya}</span>
                      <span className="text-[#2D2D2A] font-medium">{config.brotherName}: {r.krutarth}</span>
                      <div className="flex items-center justify-between">
                        <span className="text-[#7C7A68]">{config.youngerSisterName}: {r.prisha}</span>
                        <button
                          onClick={() => deleteComparisonRow(r.id)}
                          className="text-[#B85D43] hover:text-[#8C3A24] p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION D: THINGS NEVER SAID OUT LOUD */}
              <div className="p-6 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
                  <h4 className="text-base font-serif-title font-bold text-[#2D2D2A] flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#B85D43]" />
                    “Things I Never Say Out Loud” Notes ({thingsNeverSaid.length})
                  </h4>
                  <button
                    onClick={() => setIsAddingUnsaid(true)}
                    className="px-3 py-1 rounded-full bg-[#FAF8F2] hover:bg-[#E5E2D9] text-[#B85D43] text-xs font-semibold flex items-center gap-1 border border-[#E5E2D9] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Note</span>
                  </button>
                </div>

                {isAddingUnsaid && (
                  <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#B85D43]/40 space-y-3">
                    <span className="text-xs font-bold text-[#B85D43]">Add Vulnerable Note</span>
                    <input
                      type="text"
                      placeholder="Headline quote (e.g. I’m endlessly proud of who you’ve become.)"
                      value={unsaidQuote}
                      onChange={e => setUnsaidQuote(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs"
                    />
                    <textarea
                      rows={2}
                      placeholder="Detail backstory / why you feel this way"
                      value={unsaidDetail}
                      onChange={e => setUnsaidDetail(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs resize-none"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (!unsaidQuote || !unsaidDetail) return;
                          addThingNeverSaid({
                            quote: unsaidQuote,
                            detail: unsaidDetail
                          });
                          setUnsaidQuote('');
                          setUnsaidDetail('');
                          setIsAddingUnsaid(false);
                        }}
                        className="px-4 py-1.5 rounded-lg bg-[#B85D43] text-white text-xs font-semibold cursor-pointer"
                      >
                        Add Note
                      </button>
                      <button
                        onClick={() => setIsAddingUnsaid(false)}
                        className="px-3 py-1.5 rounded-lg bg-[#E5E2D9] text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {thingsNeverSaid.map(t => (
                    <div
                      key={t.id}
                      className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#E5E2D9] flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <p className="font-bold text-[#2D2D2A]">“{t.quote}”</p>
                        <p className="text-[#7C7A68]">{t.detail}</p>
                      </div>
                      <button
                        onClick={() => deleteThingNeverSaid(t.id)}
                        className="text-[#B85D43] hover:text-[#8C3A24] p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: OPEN WHEN... ENVELOPES MANAGER */}
          {/* ======================================================== */}
          {activeTab === 'letters' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-serif-title font-bold text-[#2D2D2A]">
                    “Open When…” Sealed Envelopes ({openWhenLetters.length})
                  </h4>
                  <p className="text-xs text-[#7C7A68]">
                    Add, edit or rewrite any emergency envelope for your sisters.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingLetterId(null);
                    setLetterTitle('');
                    setLetterPreview('');
                    setLetterContent('');
                    setLetterPhotoUrl('');
                    setIsAddingLetter(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#B85D43] hover:bg-[#a14f37] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Envelope</span>
                </button>
              </div>

              {/* Add / Edit Envelope Form */}
              {isAddingLetter && (
                <div className="p-5 rounded-2xl bg-[#FAF8F2] border border-[#B85D43]/40 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#B85D43] uppercase">
                      {editingLetterId ? 'Edit Envelope' : 'Write New Emergency Envelope'}
                    </span>
                    <button
                      onClick={() => setIsAddingLetter(false)}
                      className="text-xs text-[#7C7A68] hover:text-[#2D2D2A]"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-[11px] text-[#7C7A68] font-semibold block mb-1">
                        Envelope Title (When to open) *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Open When You Miss Home & Mummy's Cooking"
                        value={letterTitle}
                        onChange={e => setLetterTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-[#7C7A68] font-semibold block mb-1">
                        Icon
                      </label>
                      <select
                        value={letterIcon}
                        onChange={e => setLetterIcon(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                      >
                        <option value="Heart">❤️ Heart</option>
                        <option value="CloudRain">🌧️ CloudRain (Sad)</option>
                        <option value="Shield">🛡️ Shield (Protection)</option>
                        <option value="Zap">⚡ Zap (Argument / Drama)</option>
                        <option value="Smile">😊 Smile (Laugh)</option>
                        <option value="Trophy">🏆 Trophy (Achievement)</option>
                        <option value="Plane">✈️ Plane (Homesick / Distance)</option>
                        <option value="Gift">🎁 Gift (Special day)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-[#7C7A68] font-semibold block mb-1">
                      Short Subtitle / Teaser *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. When the Adelaide weather is cold or you're missing Indian food..."
                      value={letterPreview}
                      onChange={e => setLetterPreview(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#7C7A68] font-semibold block mb-1">
                      Inside Letter Text (Paragraphs separated by double line break) *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Dear Priya / Prisha, write your deep, honest brotherly note here..."
                      value={letterContent}
                      onChange={e => setLetterContent(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#7C7A68] font-semibold block mb-1">
                      Attached Memory Photo (Optional)
                    </label>
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs font-semibold text-[#B85D43] cursor-pointer hover:bg-[#FAF8F2]">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo from Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLetterPhotoUpload}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Or image URL"
                        value={letterPhotoUrl}
                        onChange={e => setLetterPhotoUrl(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs text-[#2D2D2A]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => setIsAddingLetter(false)}
                      className="px-4 py-2 rounded-xl bg-[#E5E2D9] text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!letterTitle || !letterPreview || !letterContent) {
                          alert('Please enter a title, teaser preview, and inside letter message.');
                          return;
                        }

                        if (editingLetterId) {
                          updateOpenWhenLetter(editingLetterId, {
                            title: letterTitle,
                            preview: letterPreview,
                            content: letterContent,
                            iconName: letterIcon,
                            photoUrl: letterPhotoUrl || undefined
                          });
                        } else {
                          addOpenWhenLetter({
                            title: letterTitle,
                            preview: letterPreview,
                            content: letterContent,
                            iconName: letterIcon,
                            photoUrl: letterPhotoUrl || undefined
                          });
                        }

                        setIsAddingLetter(false);
                        setEditingLetterId(null);
                        audioEngine.playChime(659.25, 0.7);
                      }}
                      className="px-5 py-2 rounded-xl bg-[#B85D43] text-white text-xs font-semibold shadow-sm cursor-pointer"
                    >
                      {editingLetterId ? 'Save Changes' : 'Seal & Add Envelope'}
                    </button>
                  </div>
                </div>
              )}

              {/* Existing letters list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {openWhenLetters.map((l, idx) => (
                  <div
                    key={l.id}
                    className="p-4 rounded-2xl bg-white border border-[#E5E2D9] shadow-sm space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-[#7C7A68]">
                        <span className="font-bold text-[#B85D43]">Envelope #{idx + 1}</span>
                        <span>Icon: {l.iconName}</span>
                      </div>
                      <h5 className="font-serif-title font-bold text-sm text-[#2D2D2A]">
                        {l.title}
                      </h5>
                      <p className="text-xs text-[#7C7A68] line-clamp-2">
                        {l.preview}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E5E2D9] flex items-center justify-between">
                      <span className="text-[11px] text-[#5A5A40]">
                        {l.photoUrl ? '📸 Photo attached' : 'Text only'}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingLetterId(l.id);
                            setLetterTitle(l.title);
                            setLetterPreview(l.preview);
                            setLetterContent(l.content);
                            setLetterIcon(l.iconName);
                            setLetterPhotoUrl(l.photoUrl || '');
                            setIsAddingLetter(true);
                          }}
                          className="p-1.5 text-[#5A5A40] hover:text-[#2D2D2A] cursor-pointer"
                          title="Edit Envelope"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete envelope "${l.title}"?`)) {
                              deleteOpenWhenLetter(l.id);
                            }
                          }}
                          className="p-1.5 text-[#B85D43] hover:text-[#8C3A24] cursor-pointer"
                          title="Delete Envelope"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: TIME CAPSULE MANAGER */}
          {/* ======================================================== */}
          {activeTab === 'time_capsule' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-serif-title font-bold text-[#2D2D2A]">
                    Raksha Bandhan Time Capsule Chapters ({timeCapsules.length})
                  </h4>
                  <p className="text-xs text-[#7C7A68]">
                    Set future Raksha Bandhan milestone letters and brother oaths for upcoming years.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingCapsule(true)}
                  className="px-4 py-2 rounded-xl bg-[#B85D43] hover:bg-[#a14f37] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Future Year</span>
                </button>
              </div>

              {isAddingCapsule && (
                <div className="p-5 rounded-2xl bg-[#FAF8F2] border border-[#B85D43]/40 shadow-sm space-y-4">
                  <span className="text-xs font-bold text-[#B85D43] uppercase">
                    Add Future Time Capsule Milestone
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-[#7C7A68] block">Year *</label>
                      <input
                        type="number"
                        value={capsuleYear}
                        onChange={e => {
                          const y = Number(e.target.value);
                          setCapsuleYear(y);
                          setCapsuleUnlockDate(`August ${y}`);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] text-[#7C7A68] block">Chapter Title *</label>
                      <input
                        type="text"
                        placeholder="e.g. When Priya is 34 & Prisha is 21"
                        value={capsuleTitle}
                        onChange={e => setCapsuleTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-[#7C7A68] block">Future Letter / Message *</label>
                    <textarea
                      rows={3}
                      placeholder="What do you want to tell them in that future year?"
                      value={capsuleLetter}
                      onChange={e => setCapsuleLetter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#7C7A68] block">Brother Promise for that year *</label>
                    <input
                      type="text"
                      placeholder="e.g. Still ready to book any emergency flight to wherever you are."
                      value={capsulePromise}
                      onChange={e => setCapsulePromise(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E5E2D9] text-xs"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setIsAddingCapsule(false)}
                      className="px-3 py-1.5 rounded-lg bg-[#E5E2D9] text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!capsuleTitle || !capsuleLetter) return;
                        addTimeCapsuleYear({
                          year: capsuleYear,
                          isUnlocked: false,
                          unlockDate: capsuleUnlockDate,
                          title: capsuleTitle,
                          letter: capsuleLetter,
                          promise: capsulePromise || 'Always your brother.'
                        });
                        setIsAddingCapsule(false);
                        setCapsuleTitle('');
                        setCapsuleLetter('');
                        setCapsulePromise('');
                        audioEngine.playChime(659.25, 0.7);
                      }}
                      className="px-4 py-1.5 rounded-lg bg-[#B85D43] text-white text-xs font-semibold cursor-pointer"
                    >
                      Add Capsule Year
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {timeCapsules.map(c => (
                  <div
                    key={c.year}
                    className="p-4 rounded-2xl bg-white border border-[#E5E2D9] flex items-start justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif-title font-bold text-sm text-[#B85D43]">
                          Rakhi {c.year}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#FAF8F2] border border-[#E5E2D9] text-[#7C7A68] text-[10px]">
                          {c.isUnlocked ? 'Unlocked' : `Locked until ${c.unlockDate}`}
                        </span>
                      </div>
                      <h5 className="font-bold text-[#2D2D2A]">{c.title}</h5>
                      <p className="text-[#5A5A40] line-clamp-2">{c.letter}</p>
                      <p className="text-[#B85D43] italic">Promise: {c.promise}</p>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Remove capsule entry for year ${c.year}?`)) {
                          deleteTimeCapsule(c.year);
                        }
                      }}
                      className="text-[#B85D43] hover:text-[#8C3A24] p-1 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: MEMORY JAR */}
          {/* ======================================================== */}
          {activeTab === 'jar' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-serif-title font-bold text-[#2D2D2A]">
                    Sibling Memory Jar Notes ({jarMemories.length})
                  </h4>
                  <p className="text-xs text-[#7C7A68]">
                    Folded memory slips in the interactive jar.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingJar(true)}
                  className="px-4 py-2 rounded-xl bg-[#B85D43] hover:bg-[#a14f37] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Fold New Memory</span>
                </button>
              </div>

              {isAddingJar && (
                <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#B85D43]/40 space-y-3">
                  <span className="text-xs font-bold text-[#B85D43]">Add Note to Jar</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Title / Memory Tag"
                      value={jarTitle}
                      onChange={e => setJarTitle(e.target.value)}
                      className="sm:col-span-2 px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs"
                    />
                    <select
                      value={jarType}
                      onChange={e => setJarType(e.target.value as JarMemory['type'])}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs"
                    >
                      <option value="memory">📖 Warm Memory</option>
                      <option value="inside_joke">😂 Inside Joke</option>
                      <option value="sweet">❤️ Sweet Thought</option>
                      <option value="roast">🔥 Brother Roast</option>
                    </select>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Write the folded note..."
                    value={jarContent}
                    onChange={e => setJarContent(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E2D9] text-xs resize-none"
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setIsAddingJar(false)}
                      className="px-3 py-1.5 rounded-lg bg-[#E5E2D9] text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!jarTitle || !jarContent) return;
                        addJarMemory({
                          title: jarTitle,
                          content: jarContent,
                          type: jarType
                        });
                        setJarTitle('');
                        setJarContent('');
                        setIsAddingJar(false);
                        audioEngine.playChime(659.25, 0.7);
                      }}
                      className="px-4 py-1.5 rounded-lg bg-[#B85D43] text-white text-xs font-semibold cursor-pointer"
                    >
                      Drop into Jar
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                {jarMemories.map(mem => (
                  <div
                    key={mem.id}
                    className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#E5E2D9] flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#B85D43]">{mem.title}</span>
                        <span className="px-2 py-0.5 rounded bg-white border border-[#E5E2D9] text-[#7C7A68] text-[10px] uppercase">
                          {mem.type}
                        </span>
                      </div>
                      <p className="text-[#5A5A40] leading-relaxed">{mem.content}</p>
                    </div>
                    <button
                      onClick={() => deleteJarMemory(mem.id)}
                      className="text-[#B85D43] hover:text-[#8C3A24] p-1 flex-shrink-0 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 7: BACKUP, EXPORT & RESET */}
          {/* ======================================================== */}
          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-lg">
              <div className="p-5 rounded-2xl bg-[#FAF8F2] border border-[#E5E2D9] space-y-3">
                <h4 className="text-sm font-bold text-[#2D2D2A]">
                  Export Memory Book (.JSON)
                </h4>
                <p className="text-xs text-[#7C7A68]">
                  Save a complete offline backup file containing all your real photos, letters, memories, and promises.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportMemoryBook}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B85D43] hover:bg-[#a14f37] text-white font-semibold text-xs shadow-sm cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Backup JSON</span>
                  </button>
                  <button
                    onClick={handleCopyBackup}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-[#E5E2D9] border border-[#E5E2D9] text-[#5A5A40] font-semibold text-xs shadow-sm cursor-pointer"
                  >
                    {copiedBackup ? <Check className="w-4 h-4 text-[#5A5A40]" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedBackup ? 'Copied!' : 'Copy to Clipboard'}</span>
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F2] border border-[#E5E2D9] space-y-3">
                <h4 className="text-sm font-bold text-[#2D2D2A]">
                  Import Memory Book (.JSON)
                </h4>
                <p className="text-xs text-[#7C7A68]">
                  Restore a previously saved backup file to load all your saved photos and customizations.
                </p>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportFile}
                  className="w-full text-xs text-[#7C7A68] file:mr-2 file:py-2 file:px-4 file:rounded-xl file:border file:border-[#E5E2D9] file:bg-white file:text-[#2D2D2A] cursor-pointer"
                />
              </div>

              <div className="pt-4 border-t border-[#E5E2D9]">
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset everything back to the original template? All custom photos and edits will be cleared.')) {
                      resetToDefaults();
                    }
                  }}
                  className="text-xs text-[#B85D43] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Data to Original Template</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E5E2D9] bg-[#FAF8F2] flex items-center justify-between">
          <span className="text-xs text-[#7C7A68]">
            ✨ All photo uploads & text edits save automatically in your browser.
          </span>
          <button
            onClick={() => {
              audioEngine.playChime(659.25, 0.6);
              setIsStudioOpen(false);
            }}
            className="px-6 py-2 rounded-xl bg-[#B85D43] hover:bg-[#a14f37] text-white font-semibold text-xs cursor-pointer shadow-sm"
          >
            Done & View Website
          </button>
        </div>
      </motion.div>
    </div>
  );
};
