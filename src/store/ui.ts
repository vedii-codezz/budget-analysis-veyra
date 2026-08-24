import { create } from "zustand";
import { TransactionCategory } from "@/types/finance";

export type CursorVariant = "default" | "hover" | "explore" | "view" | "drag";

export interface CursorContext {
  variant: CursorVariant;
  label?: string;
}

interface UIState {
  activeSection: string;
  selectedCategory: TransactionCategory | null;
  isAddTransactionOpen: boolean;
  cursorContext: CursorContext;
  setActiveSection: (section: string) => void;
  setSelectedCategory: (category: TransactionCategory | null) => void;
  setAddTransactionOpen: (open: boolean) => void;
  setCursorContext: (context: CursorContext) => void;
  resetCursorContext: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeSection: "hero",
  selectedCategory: null,
  isAddTransactionOpen: false,
  cursorContext: { variant: "default" },
  setActiveSection: (activeSection) => set({ activeSection }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setAddTransactionOpen: (isAddTransactionOpen) => set({ isAddTransactionOpen }),
  setCursorContext: (cursorContext) => set({ cursorContext }),
  resetCursorContext: () => set({ cursorContext: { variant: "default" } }),
}));
