export interface ComparisonRow {
  id: string;
  trait: string;
  priya: string;
  krutarth: string;
  prisha: string;
}

export interface ThingNeverSaid {
  id: string;
  quote: string;
  detail: string;
}

export interface BrotherPromiseItem {
  id: string;
  lead: string;
  text: string;
  humorNote?: string;
}

export interface SiblingProfile {
  name: string;
  role: 'brother' | 'older_sister' | 'younger_sister';
  age: number;
  location: string;
  relationText: string;
  theme: string;
  avatarUrl: string;
  quirks: string[];
}

export interface MemoryPhoto {
  id: string;
  url: string;
  caption: string;
  fullStory?: string;
  category: 'then' | 'growing_up' | 'family' | 'chaos' | 'now';
  year?: string;
  location?: string;
  rotation?: number;
  featured?: boolean;
}

export interface JarMemory {
  id: string;
  type: 'funny' | 'childhood' | 'embarrassing' | 'sweet' | 'family' | 'emotional';
  title: string;
  content: string;
  tags?: string[];
}

export interface OpenWhenLetter {
  id: string;
  slug: string;
  title: string;
  preview: string;
  content: string;
  iconName: string;
  color: string;
  photoUrl?: string;
  audioNote?: string;
}

export interface TimeCapsuleEntry {
  year: number;
  isUnlocked: boolean;
  unlockDate?: string;
  title: string;
  letter: string;
  photos?: string[];
  audioUrl?: string;
  promise: string;
}

export interface MemoryBookConfig {
  websiteTitle: string;
  subtitle: string;
  alternativeOpening: string;
  brotherName: string;
  brotherAge: number;
  brotherPhone?: string;
  olderSisterName: string;
  olderSisterAge: number;
  olderSisterLocation: string;
  olderSisterQuote?: string;
  olderSisterDescription?: string;
  youngerSisterName: string;
  youngerSisterAge: number;
  youngerSisterLocation: string;
  youngerSisterQuote?: string;
  youngerSisterDescription?: string;
  customVoiceNoteUrl?: string;
  voiceNoteDuration?: string;
  enableBackgroundMelody: boolean;
  heroPhotoUrl: string;
  olderSisterPhotoUrl?: string;
  youngerSisterPhotoUrl?: string;
  youngerSisterBabyPhotoUrl?: string;
  finalPhotoUrl: string;
  finalMessage?: string;
  brotherLetterPreamble?: string;
}

export interface EasterEgg {
  id: string;
  triggerLabel: string;
  popupTitle: string;
  punchline: string;
  photoUrl?: string;
  subtext: string;
}

