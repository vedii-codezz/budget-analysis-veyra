import { create } from "zustand";
import { budgets, deriveFinance, isValidEntry, transactions } from "@/lib/finance";
import type { Transaction } from "@/types/finance";

const storageKey = "veyra-demo-entries-v1";

interface FinanceState {
  transactions: Transaction[];
  budgets: typeof budgets;
  metrics: ReturnType<typeof deriveFinance>;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  hydrate: () => void;
  reset: () => void;
  storageError: boolean;
}

function snapshot(additions: Transaction[]) {
  const entries = [...additions, ...transactions];
  return { transactions: entries, metrics: deriveFinance(entries) };
}

export const useFinanceStore = create<FinanceState>((set) => ({
  ...snapshot([]),
  budgets,
  storageError: false,
  hydrate: () => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
      const ids = new Set(transactions.map(({ id }) => id));
      const additions = Array.isArray(saved) ? saved.map((entry) => entry?.type === "income" && entry.category === "Other"
        ? { ...entry, category: "Income" } : entry).filter((entry): entry is Transaction => {
        if (!entry || typeof entry.id !== "string" || ids.has(entry.id) || !isValidEntry(entry)) return false;
        ids.add(entry.id);
        return true;
      }) : [];
      set(snapshot(additions));
    } catch {
      set({ storageError: true });
    }
  },
  addTransaction: (transaction) => {
    if (!isValidEntry(transaction)) return;
    const entry = { ...transaction, amount: Math.round(transaction.amount * 100) / 100, id: crypto.randomUUID() };
    set((state) => {
      const additions = [entry, ...state.transactions.slice(0, -transactions.length)];
      let storageError = false;
      try {
        localStorage.setItem(storageKey, JSON.stringify(additions));
      } catch {
        storageError = true;
      }
      return { ...snapshot(additions), storageError };
    });
  },
  reset: () => {
    let storageError = false;
    try {
      localStorage.removeItem(storageKey);
    } catch {
      storageError = true;
    }
    set({ ...snapshot([]), storageError });
  },
}));
