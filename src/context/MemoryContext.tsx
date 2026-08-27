import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  MemoryBookConfig,
  MemoryPhoto,
  JarMemory,
  OpenWhenLetter,
  TimeCapsuleEntry,
  EasterEgg,
  ComparisonRow,
  ThingNeverSaid,
  BrotherPromiseItem
} from '../types';
import {
  initialConfig,
  initialPhotos,
  initialJarMemories,
  initialOpenWhenLetters,
  initialTimeCapsules,
  easterEggsList,
  initialComparisonRows,
  initialThingsNeverSaid,
  initialBrotherPromises
} from '../data/initialContent';
import { audioEngine } from '../utils/audioSynthesizer';

interface MemoryContextType {
  config: MemoryBookConfig;
  updateConfig: (newConfig: Partial<MemoryBookConfig>) => void;
  photos: MemoryPhoto[];
  addPhoto: (photo: Omit<MemoryPhoto, 'id'>) => void;
  updatePhoto: (id: string, updated: Partial<MemoryPhoto>) => void;
  deletePhoto: (id: string) => void;
  jarMemories: JarMemory[];
  addJarMemory: (memory: Omit<JarMemory, 'id'>) => void;
  updateJarMemory: (id: string, updated: Partial<JarMemory>) => void;
  deleteJarMemory: (id: string) => void;
  openWhenLetters: OpenWhenLetter[];
  addOpenWhenLetter: (letter: Omit<OpenWhenLetter, 'id' | 'slug'>) => void;
  updateOpenWhenLetter: (id: string, updated: Partial<OpenWhenLetter>) => void;
  deleteOpenWhenLetter: (id: string) => void;
  timeCapsules: TimeCapsuleEntry[];
  updateTimeCapsule: (year: number, updated: Partial<TimeCapsuleEntry>) => void;
  addTimeCapsuleYear: (entry: TimeCapsuleEntry) => void;
  deleteTimeCapsule: (year: number) => void;
  comparisonRows: ComparisonRow[];
  addComparisonRow: (row: Omit<ComparisonRow, 'id'>) => void;
  updateComparisonRow: (id: string, updated: Partial<ComparisonRow>) => void;
  deleteComparisonRow: (id: string) => void;
  thingsNeverSaid: ThingNeverSaid[];
  addThingNeverSaid: (item: Omit<ThingNeverSaid, 'id'>) => void;
  updateThingNeverSaid: (id: string, updated: Partial<ThingNeverSaid>) => void;
  deleteThingNeverSaid: (id: string) => void;
  brotherPromises: BrotherPromiseItem[];
  addBrotherPromise: (item: Omit<BrotherPromiseItem, 'id'>) => void;
  updateBrotherPromise: (id: string, updated: Partial<BrotherPromiseItem>) => void;
  deleteBrotherPromise: (id: string) => void;
  easterEggs: EasterEgg[];
  hasEntered: boolean;
  setHasEntered: (val: boolean) => void;
  isMelodyOn: boolean;
  toggleMelody: () => void;
  activeVoiceNote: string | null;
  setActiveVoiceNote: (url: string | null) => void;
  isStudioOpen: boolean;
  setIsStudioOpen: (val: boolean) => void;
  studioInitialTab?: string;
  setStudioInitialTab: (tab: string) => void;
  activeEasterEgg: EasterEgg | null;
  triggerEasterEgg: (egg: EasterEgg | null) => void;
  exportMemoryBook: () => void;
  importMemoryBook: (jsonString: string) => boolean;
  resetToDefaults: () => void;
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CONFIG: 'raksha_bandhan_config_v2',
  PHOTOS: 'raksha_bandhan_photos_v2',
  JAR: 'raksha_bandhan_jar_v2',
  LETTERS: 'raksha_bandhan_letters_v2',
  CAPSULES: 'raksha_bandhan_capsules_v2',
  COMPARISON: 'raksha_bandhan_comparison_v2',
  THINGS_UNSAID: 'raksha_bandhan_unsaid_v2',
  PROMISES: 'raksha_bandhan_promises_v2',
  ENTERED: 'raksha_bandhan_entered_v2',
};

export const MemoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<MemoryBookConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return saved ? { ...initialConfig, ...JSON.parse(saved) } : initialConfig;
    } catch {
      return initialConfig;
    }
  });

  const [photos, setPhotos] = useState<MemoryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PHOTOS);
      return saved ? JSON.parse(saved) : initialPhotos;
    } catch {
      return initialPhotos;
    }
  });

  const [jarMemories, setJarMemories] = useState<JarMemory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.JAR);
      return saved ? JSON.parse(saved) : initialJarMemories;
    } catch {
      return initialJarMemories;
    }
  });

  const [openWhenLetters, setOpenWhenLetters] = useState<OpenWhenLetter[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LETTERS);
      return saved ? JSON.parse(saved) : initialOpenWhenLetters;
    } catch {
      return initialOpenWhenLetters;
    }
  });

  const [timeCapsules, setTimeCapsules] = useState<TimeCapsuleEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CAPSULES);
      return saved ? JSON.parse(saved) : initialTimeCapsules;
    } catch {
      return initialTimeCapsules;
    }
  });

  const [comparisonRows, setComparisonRows] = useState<ComparisonRow[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPARISON);
      return saved ? JSON.parse(saved) : initialComparisonRows;
    } catch {
      return initialComparisonRows;
    }
  });

  const [thingsNeverSaid, setThingsNeverSaid] = useState<ThingNeverSaid[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THINGS_UNSAID);
      return saved ? JSON.parse(saved) : initialThingsNeverSaid;
    } catch {
      return initialThingsNeverSaid;
    }
  });

  const [brotherPromises, setBrotherPromises] = useState<BrotherPromiseItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROMISES);
      return saved ? JSON.parse(saved) : initialBrotherPromises;
    } catch {
      return initialBrotherPromises;
    }
  });

  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [isMelodyOn, setIsMelodyOn] = useState<boolean>(false);
  const [activeVoiceNote, setActiveVoiceNote] = useState<string | null>(null);
  const [isStudioOpen, setIsStudioOpen] = useState<boolean>(false);
  const [studioInitialTab, setStudioInitialTab] = useState<string>('photos');
  const [activeEasterEgg, setActiveEasterEgg] = useState<EasterEgg | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    } catch {
      // ignore
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos));
    } catch {
      // ignore
    }
  }, [photos]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.JAR, JSON.stringify(jarMemories));
    } catch {
      // ignore
    }
  }, [jarMemories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LETTERS, JSON.stringify(openWhenLetters));
    } catch {
      // ignore
    }
  }, [openWhenLetters]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CAPSULES, JSON.stringify(timeCapsules));
    } catch {
      // ignore
    }
  }, [timeCapsules]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPARISON, JSON.stringify(comparisonRows));
    } catch {
      // ignore
    }
  }, [comparisonRows]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THINGS_UNSAID, JSON.stringify(thingsNeverSaid));
    } catch {
      // ignore
    }
  }, [thingsNeverSaid]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROMISES, JSON.stringify(brotherPromises));
    } catch {
      // ignore
    }
  }, [brotherPromises]);

  const updateConfig = (newConfig: Partial<MemoryBookConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const addPhoto = (photo: Omit<MemoryPhoto, 'id'>) => {
    const newPhoto: MemoryPhoto = {
      ...photo,
      id: 'photo_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6)
    };
    setPhotos(prev => [newPhoto, ...prev]);
  };

  const updatePhoto = (id: string, updated: Partial<MemoryPhoto>) => {
    setPhotos(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const addJarMemory = (mem: Omit<JarMemory, 'id'>) => {
    const newMem: JarMemory = {
      ...mem,
      id: 'jar_' + Date.now()
    };
    setJarMemories(prev => [newMem, ...prev]);
  };

  const updateJarMemory = (id: string, updated: Partial<JarMemory>) => {
    setJarMemories(prev => prev.map(m => (m.id === id ? { ...m, ...updated } : m)));
  };

  const deleteJarMemory = (id: string) => {
    setJarMemories(prev => prev.filter(m => m.id !== id));
  };

  const addOpenWhenLetter = (letter: Omit<OpenWhenLetter, 'id' | 'slug'>) => {
    const newLetter: OpenWhenLetter = {
      ...letter,
      id: 'ow_' + Date.now(),
      slug: 'letter-' + Date.now()
    };
    setOpenWhenLetters(prev => [...prev, newLetter]);
  };

  const updateOpenWhenLetter = (id: string, updated: Partial<OpenWhenLetter>) => {
    setOpenWhenLetters(prev => prev.map(l => (l.id === id ? { ...l, ...updated } : l)));
  };

  const deleteOpenWhenLetter = (id: string) => {
    setOpenWhenLetters(prev => prev.filter(l => l.id !== id));
  };

  const updateTimeCapsule = (year: number, updated: Partial<TimeCapsuleEntry>) => {
    setTimeCapsules(prev => prev.map(c => (c.year === year ? { ...c, ...updated } : c)));
  };

  const addTimeCapsuleYear = (entry: TimeCapsuleEntry) => {
    setTimeCapsules(prev => [...prev.filter(c => c.year !== entry.year), entry].sort((a, b) => a.year - b.year));
  };

  const deleteTimeCapsule = (year: number) => {
    setTimeCapsules(prev => prev.filter(c => c.year !== year));
  };

  const addComparisonRow = (row: Omit<ComparisonRow, 'id'>) => {
    const newRow: ComparisonRow = {
      ...row,
      id: 'comp_' + Date.now()
    };
    setComparisonRows(prev => [...prev, newRow]);
  };

  const updateComparisonRow = (id: string, updated: Partial<ComparisonRow>) => {
    setComparisonRows(prev => prev.map(r => (r.id === id ? { ...r, ...updated } : r)));
  };

  const deleteComparisonRow = (id: string) => {
    setComparisonRows(prev => prev.filter(r => r.id !== id));
  };

  const addThingNeverSaid = (item: Omit<ThingNeverSaid, 'id'>) => {
    const newItem: ThingNeverSaid = {
      ...item,
      id: 't_' + Date.now()
    };
    setThingsNeverSaid(prev => [...prev, newItem]);
  };

  const updateThingNeverSaid = (id: string, updated: Partial<ThingNeverSaid>) => {
    setThingsNeverSaid(prev => prev.map(t => (t.id === id ? { ...t, ...updated } : t)));
  };

  const deleteThingNeverSaid = (id: string) => {
    setThingsNeverSaid(prev => prev.filter(t => t.id !== id));
  };

  const addBrotherPromise = (item: Omit<BrotherPromiseItem, 'id'>) => {
    const newItem: BrotherPromiseItem = {
      ...item,
      id: 'bp_' + Date.now()
    };
    setBrotherPromises(prev => [...prev, newItem]);
  };

  const updateBrotherPromise = (id: string, updated: Partial<BrotherPromiseItem>) => {
    setBrotherPromises(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteBrotherPromise = (id: string) => {
    setBrotherPromises(prev => prev.filter(p => p.id !== id));
  };

  const toggleMelody = () => {
    if (isMelodyOn) {
      audioEngine.stopGentleBackgroundMelody();
      setIsMelodyOn(false);
    } else {
      audioEngine.startGentleBackgroundMelody();
      setIsMelodyOn(true);
    }
  };

  const triggerEasterEgg = (egg: EasterEgg | null) => {
    setActiveEasterEgg(egg);
    if (egg) {
      audioEngine.playChime(659.25, 0.9);
    }
  };

  const exportMemoryBook = () => {
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
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `krutarth_memory_book_backup_${new Date().getFullYear()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importMemoryBook = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.config) setConfig(parsed.config);
      if (parsed.photos && Array.isArray(parsed.photos)) setPhotos(parsed.photos);
      if (parsed.jarMemories && Array.isArray(parsed.jarMemories)) setJarMemories(parsed.jarMemories);
      if (parsed.openWhenLetters && Array.isArray(parsed.openWhenLetters)) setOpenWhenLetters(parsed.openWhenLetters);
      if (parsed.timeCapsules && Array.isArray(parsed.timeCapsules)) setTimeCapsules(parsed.timeCapsules);
      if (parsed.comparisonRows && Array.isArray(parsed.comparisonRows)) setComparisonRows(parsed.comparisonRows);
      if (parsed.thingsNeverSaid && Array.isArray(parsed.thingsNeverSaid)) setThingsNeverSaid(parsed.thingsNeverSaid);
      if (parsed.brotherPromises && Array.isArray(parsed.brotherPromises)) setBrotherPromises(parsed.brotherPromises);
      return true;
    } catch {
      return false;
    }
  };

  const resetToDefaults = () => {
    setConfig(initialConfig);
    setPhotos(initialPhotos);
    setJarMemories(initialJarMemories);
    setOpenWhenLetters(initialOpenWhenLetters);
    setTimeCapsules(initialTimeCapsules);
    setComparisonRows(initialComparisonRows);
    setThingsNeverSaid(initialThingsNeverSaid);
    setBrotherPromises(initialBrotherPromises);
    localStorage.clear();
  };

  return (
    <MemoryContext.Provider
      value={{
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
        updateTimeCapsule,
        addTimeCapsuleYear,
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
        easterEggs: easterEggsList,
        hasEntered,
        setHasEntered,
        isMelodyOn,
        toggleMelody,
        activeVoiceNote,
        setActiveVoiceNote,
        isStudioOpen,
        setIsStudioOpen,
        studioInitialTab,
        setStudioInitialTab,
        activeEasterEgg,
        triggerEasterEgg,
        exportMemoryBook,
        importMemoryBook,
        resetToDefaults
      }}
    >
      {children}
    </MemoryContext.Provider>
  );
};

export const useMemory = () => {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error('useMemory must be used within a MemoryProvider');
  }
  return context;
};

