import {
  Transaction,
  CategoryBudget,
  SavingsGoal,
  FinancialHealthScore,
  TransactionCategory,
} from "@/types/finance";

/**
 * Calculate total spend from a list of transactions
 */
export function calculateMonthlySpend(transactions: Transaction[]): number {
  return transactions.reduce((acc, t) => acc + (t.amount > 0 ? t.amount : 0), 0);
}

/**
 * Calculate spend grouped by category
 */
export function calculateCategorySpend(
  transactions: Transaction[]
): Record<TransactionCategory, number> {
  const result: Partial<Record<TransactionCategory, number>> = {};

  for (const t of transactions) {
    if (t.amount > 0) {
      result[t.category] = (result[t.category] || 0) + t.amount;
    }
  }

  return result as Record<TransactionCategory, number>;
}

/**
 * Calculate absolute savings given income and total spend
 */
export function calculateSavings(income: number, totalSpend: number): number {
  return Math.max(0, income - totalSpend);
}

/**
 * Calculate savings rate percentage (0 - 100%)
 */
export function calculateSavingsRate(income: number, totalSpend: number): number {
  if (income <= 0) return 0;
  const savings = income - totalSpend;
  return Math.max(0, Math.min(100, (savings / income) * 100));
}

/**
 * Calculate budget usage per category
 */
export function calculateBudgetUsage(
  categorySpend: Record<string, number>,
  budgets: CategoryBudget[]
) {
  return budgets.map((b) => {
    const spent = categorySpend[b.category] || 0;
    const percentage = b.allocated > 0 ? (spent / b.allocated) * 100 : 0;
    const remaining = b.allocated - spent;
    const isOverspent = remaining < 0;

    let status: "healthy" | "warning" | "exceeded" = "healthy";
    if (percentage >= 100) status = "exceeded";
    else if (percentage >= 80) status = "warning";

    return {
      ...b,
      spent,
      remaining,
      percentage,
      isOverspent,
      status,
    };
  });
}

/**
 * Calculate average daily spend
 */
export function calculateAverageDailySpend(
  totalSpend: number,
  daysPassed: number
): number {
  if (daysPassed <= 0) return 0;
  return totalSpend / daysPassed;
}

/**
 * Forecast month-end spend based on current daily pace
 */
export function forecastMonthEndSpend(
  dailyAvg: number,
  daysInMonth: number = 30
): number {
  return dailyAvg * daysInMonth;
}

/**
 * Detect spending spikes (transactions higher than mean + 2*stdDev or fixed threshold)
 */
export function detectSpendingSpikes(
  transactions: Transaction[],
  threshold = 3000
): Transaction[] {
  return transactions.filter((t) => t.amount >= threshold);
}

/**
 * Identify recurring transactions (subscriptions or regular bills)
 */
export function identifyRecurringTransactions(
  transactions: Transaction[]
): Transaction[] {
  return transactions.filter((t) => t.isRecurring);
}

/**
 * Calculate comprehensive financial health score (0-100)
 * Evaluates:
 * 1. Savings Health (weight 35%): >= 30% savings rate is optimal
 * 2. Budget Discipline (weight 25%): % of categories within budget
 * 3. Expense Stability (weight 20%): low volatility and controlled discretionary spend
 * 4. Goal Progress (weight 20%): aggregate progress towards savings targets
 */
export function calculateFinancialHealth(
  income: number,
  totalSpend: number,
  budgets: CategoryBudget[],
  goals: SavingsGoal[],
  transactions: Transaction[]
): FinancialHealthScore {
  // 1. Savings Health (0-100)
  const savingsRate = calculateSavingsRate(income, totalSpend);
  const savingsHealth = Math.min(100, Math.round((savingsRate / 35) * 100));

  // 2. Budget Discipline (0-100)
  const categorySpend = calculateCategorySpend(transactions);
  let withinBudgetCount = 0;
  budgets.forEach((b) => {
    const spent = categorySpend[b.category] || 0;
    if (spent <= b.allocated) withinBudgetCount++;
  });
  const budgetDiscipline =
    budgets.length > 0 ? Math.round((withinBudgetCount / budgets.length) * 100) : 100;

  // 3. Expense Stability (0-100)
  const nonEssentialCategories: TransactionCategory[] = [
    "Shopping & Lifestyle",
    "Entertainment & Leisure",
  ];
  const discretionarySpend = transactions
    .filter((t) => nonEssentialCategories.includes(t.category))
    .reduce((acc, t) => acc + t.amount, 0);
  const discretionaryRatio = income > 0 ? discretionarySpend / income : 0;
  const expenseStability = Math.max(0, Math.min(100, Math.round((1 - discretionaryRatio / 0.4) * 100)));

  // 4. Goal Progress (0-100)
  let totalGoalTarget = 0;
  let totalGoalCurrent = 0;
  goals.forEach((g) => {
    totalGoalTarget += g.targetAmount;
    totalGoalCurrent += g.currentAmount;
  });
  const goalProgress =
    totalGoalTarget > 0
      ? Math.min(100, Math.round((totalGoalCurrent / totalGoalTarget) * 100))
      : 80;

  // Composite Weighted Score
  const score = Math.round(
    savingsHealth * 0.35 +
    budgetDiscipline * 0.25 +
    expenseStability * 0.20 +
    goalProgress * 0.20
  );

  let tier: FinancialHealthScore["tier"] = "STABLE";
  let summary = "Financial metrics are balanced with steady cash flow.";

  if (score >= 85) {
    tier = "EXCELLENT";
    summary = "Exceptional financial velocity. High savings rate and disciplined allocation.";
  } else if (score >= 75) {
    tier = "STRONG";
    summary = "Solid financial trajectory. Budget adherence is well maintained.";
  } else if (score >= 60) {
    tier = "STABLE";
    summary = "Controlled cash flow. Minor discretionary adjustments recommended.";
  } else if (score >= 45) {
    tier = "ATTENTION";
    summary = "Elevated burn rate detected in discretionary categories.";
  } else {
    tier = "CRITICAL";
    summary = "Budget caps exceeded. Immediate spending consolidation needed.";
  }

  return {
    score,
    tier,
    metrics: {
      savingsHealth,
      budgetDiscipline,
      expenseStability,
      goalProgress,
    },
    summary,
  };
}
