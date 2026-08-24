import { create } from "zustand";
import {
  Transaction,
  CategoryBudget,
  SavingsGoal,
  FinancialHealthScore,
  TransactionCategory,
} from "@/types/finance";
import {
  MOCK_INCOME,
  MOCK_BUDGETS,
  MOCK_TRANSACTIONS,
  MOCK_GOALS,
} from "@/data/mockFinance";
import {
  calculateMonthlySpend,
  calculateCategorySpend,
  calculateSavings,
  calculateSavingsRate,
  calculateBudgetUsage,
  calculateAverageDailySpend,
  calculateFinancialHealth,
  detectSpendingSpikes,
  identifyRecurringTransactions,
} from "@/lib/finance";

interface FinanceState {
  income: number;
  transactions: Transaction[];
  budgets: CategoryBudget[];
  goals: SavingsGoal[];

  // Actions
  setIncome: (income: number) => void;
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  updateBudget: (category: TransactionCategory, allocated: number) => void;
  updateGoal: (id: string, currentAmount: number) => void;

  // Computed Selectors
  getMonthlySpend: () => number;
  getCategorySpend: () => Record<TransactionCategory, number>;
  getSavings: () => number;
  getSavingsRate: () => number;
  getBudgetUsage: () => ReturnType<typeof calculateBudgetUsage>;
  getAverageDailySpend: (daysPassed?: number) => number;
  getFinancialHealth: () => FinancialHealthScore;
  getSpendingSpikes: () => Transaction[];
  getRecurringTransactions: () => Transaction[];
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  income: MOCK_INCOME,
  transactions: MOCK_TRANSACTIONS,
  budgets: MOCK_BUDGETS,
  goals: MOCK_GOALS,

  setIncome: (income) => set({ income }),

  addTransaction: (txData) => {
    const newTx: Transaction = {
      ...txData,
      id: `tx-${Date.now()}`,
    };
    set((state) => {
      const updatedTransactions = [newTx, ...state.transactions];
      // Also update spent in category budget
      const updatedBudgets = state.budgets.map((b) => {
        if (b.category === txData.category) {
          return { ...b, spent: b.spent + txData.amount };
        }
        return b;
      });
      return {
        transactions: updatedTransactions,
        budgets: updatedBudgets,
      };
    });
  },

  deleteTransaction: (id) => {
    set((state) => {
      const target = state.transactions.find((t) => t.id === id);
      if (!target) return state;
      const updatedTransactions = state.transactions.filter((t) => t.id !== id);
      const updatedBudgets = state.budgets.map((b) => {
        if (b.category === target.category) {
          return { ...b, spent: Math.max(0, b.spent - target.amount) };
        }
        return b;
      });
      return {
        transactions: updatedTransactions,
        budgets: updatedBudgets,
      };
    });
  },

  updateBudget: (category, allocated) => {
    set((state) => ({
      budgets: state.budgets.map((b) =>
        b.category === category ? { ...b, allocated } : b
      ),
    }));
  },

  updateGoal: (id, currentAmount) => {
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === id ? { ...g, currentAmount } : g
      ),
    }));
  },

  getMonthlySpend: () => {
    return calculateMonthlySpend(get().transactions);
  },

  getCategorySpend: () => {
    return calculateCategorySpend(get().transactions);
  },

  getSavings: () => {
    const { income, transactions } = get();
    const spend = calculateMonthlySpend(transactions);
    return calculateSavings(income, spend);
  },

  getSavingsRate: () => {
    const { income, transactions } = get();
    const spend = calculateMonthlySpend(transactions);
    return calculateSavingsRate(income, spend);
  },

  getBudgetUsage: () => {
    const { transactions, budgets } = get();
    const categorySpend = calculateCategorySpend(transactions);
    return calculateBudgetUsage(categorySpend, budgets);
  },

  getAverageDailySpend: (daysPassed = 24) => {
    const spend = calculateMonthlySpend(get().transactions);
    return calculateAverageDailySpend(spend, daysPassed);
  },

  getFinancialHealth: () => {
    const { income, transactions, budgets, goals } = get();
    const spend = calculateMonthlySpend(transactions);
    return calculateFinancialHealth(income, spend, budgets, goals, transactions);
  },

  getSpendingSpikes: () => {
    return detectSpendingSpikes(get().transactions);
  },

  getRecurringTransactions: () => {
    return identifyRecurringTransactions(get().transactions);
  },
}));
