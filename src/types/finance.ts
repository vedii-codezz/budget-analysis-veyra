export type TransactionCategory =
  | "Food & Dining"
  | "Housing & Utilities"
  | "Transport & Fuel"
  | "Shopping & Lifestyle"
  | "Subscriptions & SaaS"
  | "Entertainment & Leisure"
  | "Health & Wellness"
  | "Investments & Savings"
  | "Travel"
  | "Other"
  | "Income";

export interface Transaction {
  id: string;
  title: string;
  merchant: string;
  amount: number;
  category: TransactionCategory;
  date: string; // YYYY-MM-DD
  type: "expense" | "investment" | "income";
  oneOff?: boolean;
  isRecurring?: boolean;
  notes?: string;
}

export interface CategoryBudget {
  category: TransactionCategory;
  allocated: number;
}

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
}

export interface FinancialHealthScore {
  score: number; // 0 to 100
  tier: "EXCELLENT" | "STRONG" | "STABLE" | "ATTENTION" | "CRITICAL";
  metrics: {
    savingsHealth: number;    // 0 to 100
    budgetDiscipline: number; // 0 to 100
    expenseStability: number; // 0 to 100
    goalProgress: number;     // 0 to 100
  };
  summary: string;
}

export interface CashFlowEvent {
  id: string;
  date: string;
  title: string;
  type: "income" | "expense" | "subscription" | "milestone";
  amount: number;
  category: string;
  highlight?: string;
}
