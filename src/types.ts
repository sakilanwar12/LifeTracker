/**
 * TypeScript Type Definitions for LifeTracker
 * All data models and navigation types
 */

// Routine Item
export interface Routine {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

// Exercise Item
export interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  duration?: number; // in minutes
  category?: string;
  createdAt: string;
}

// Note Item
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// Muslim Life - Prayer tracking
export interface Prayer {
  name: "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";
  completed: boolean;
}

// Muslim Life - Daily Habits
export interface MuslimHabit {
  id: string;
  name: string;
  completed: boolean;
  date: string;
}

// Muslim Life Tracking for a specific date
export interface MuslimLifeData {
  date: string;
  prayers: Prayer[];
  quranPages?: number;
  dhikr?: boolean;
  sadaqah?: boolean;
  habits: MuslimHabit[];
}

// Navigation Types for Bottom Tabs
export type RootTabParamList = {
  Routine: undefined;
  Exercise: undefined;
  Notes: undefined;
  MuslimLife: undefined;
};

// Storage Keys
export enum StorageKeys {
  ROUTINES = "@lifetracker_routines",
  EXERCISES = "@lifetracker_exercises",
  NOTES = "@lifetracker_notes",
  MUSLIM_LIFE = "@lifetracker_muslim_life",
}
