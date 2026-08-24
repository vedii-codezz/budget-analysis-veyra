import { create } from "zustand";
import { CurrencyCode } from "@/lib/utils/currency";

interface PreferencesState {
  reducedMotion: boolean;
  currency: CurrencyCode;
  setReducedMotion: (reduced: boolean) => void;
  toggleReducedMotion: () => void;
  setCurrency: (currency: CurrencyCode) => void;
}

export const usePreferencesStore = create<PreferencesState>((set) => ({
  reducedMotion: false,
  currency: "INR",
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
  setCurrency: (currency) => set({ currency }),
}));
