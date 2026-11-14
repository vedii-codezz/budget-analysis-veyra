import { create } from "zustand";
import { CurrencyCode } from "@/lib/utils/currency";

interface PreferencesState {
  reducedMotion: boolean;
  currency: CurrencyCode;
  syncReducedMotion: (systemPreference: boolean) => void;
  toggleReducedMotion: () => void;
  setCurrency: (currency: CurrencyCode) => void;
}

const motionKey = "veyra-motion-reduced";
let motionOverride: boolean | undefined;

export const usePreferencesStore = create<PreferencesState>((set) => ({
  reducedMotion: true,
  currency: "INR",
  syncReducedMotion: (systemPreference) => {
    try {
      const saved = localStorage.getItem(motionKey);
      if (saved === "true" || saved === "false") motionOverride ??= saved === "true";
    } catch {
      // Keep the current session preference.
    }
    set({ reducedMotion: motionOverride ?? systemPreference });
  },
  toggleReducedMotion: () => set((state) => {
    motionOverride = !state.reducedMotion;
    try {
      localStorage.setItem(motionKey, String(motionOverride));
    } catch {
      // The toggle remains effective in this session.
    }
    return { reducedMotion: motionOverride };
  }),
  setCurrency: (currency) => set({ currency }),
}));
