# Data model

The app uses plain JavaScript data and TypeScript contracts, seeded by [mockFinance](../src/data/mockFinance.ts) and held in [Zustand](../src/store/finance.ts). Amounts in the demo are rupee values represented by `number`.

## Core shapes

[Finance types](../src/types/finance.ts) define these fields. A question mark indicates an optional property.

```ts
type TransactionCategory =
  | "Food & Dining"
  | "Housing & Utilities"
  | "Transport & Fuel"
  | "Shopping & Lifestyle"
  | "Subscriptions & SaaS"
  | "Entertainment & Leisure"
  | "Health & Wellness"
  | "Investments & Savings"

interface Transaction {
  id: string
  title: string
  merchant: string
  amount: number
  category: TransactionCategory
  date: string // YYYY-MM-DD
  isRecurring?: boolean
  notes?: string
}

interface CategoryBudget {
  category: TransactionCategory
  allocated: number
  spent: number
  color: string
}

interface SavingsGoal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  targetDate: string
  category: string
}

interface CashFlowEvent {
  id: string
  date: string
  title: string
  type: "income" | "expense" | "subscription" | "milestone"
  amount: number
  category: string
  highlight?: string
}

interface FinancialHealthScore {
  score: number
  tier: "EXCELLENT" | "STRONG" | "STABLE" | "ATTENTION" | "CRITICAL"
  metrics: {
    savingsHealth: number
    budgetDiscipline: number
    expenseStability: number
    goalProgress: number
  }
  summary: string
}
```

Income is a separate number in `FinanceState` alongside `transactions: Transaction[]`, `budgets: CategoryBudget[]` and `goals: SavingsGoal[]`. The dated cash-flow fixtures use labels such as `AUG 01` and are separate from both the ledger and displayed River branch fixtures. Travel is a goal category string in the seed. The transaction category union has neither Travel nor Other.

## Derived shapes and rules

- `getMonthlySpend`, `getSavings`, `getSavingsRate` and `getAverageDailySpend` each return a number. Spend sums positive amounts over the entire array, with no month filter. Savings floor is zero. Rate is zero for nonpositive income and otherwise clamps to 0–100%. Average daily spend defaults to a divisor of 24.
- `getCategorySpend` is typed as `Record<TransactionCategory, number>`. The runtime object only includes categories with positive amounts.
- `getBudgetUsage` returns an array of `CategoryBudget & { remaining: number; percentage: number; isOverspent: boolean; status: "healthy" | "warning" | "exceeded" }`. It replaces cached `spent` with the ledger sum. Status changes to warning at 80% and exceeded at 100%, while `isOverspent` requires negative remaining.
- `getSpendingSpikes` and `getRecurringTransactions` each return `Transaction[]`. Spikes use a fixed default threshold of ₹3,000. Recurring uses the optional flag.
- The Universe view builds `{ category: TransactionCategory; amount: number; allocated: number; color: string; x: number; y: number; depth: number; trendVsLastMonth: number; txCount: number; largestTx: { title: string; amount: number; date: string }; frequentMerchant: string; peakDay: string }`. Trends and peak-day strings come from literals.

| Score metric | Weight | Calculation | Seed |
| --- | --- | --- | --- |
| Savings health | 35% | Rounded savings rate divided by 35, scaled to 100 and capped at 100 | 54 |
| Budget discipline | 25% | Rounded percentage of budgets at or below allocation. Defaults to 100 for an empty budget list. | 100 |
| Expense stability | 20% | Rounded `(1 - (discretionarySpend / income) / 0.4) * 100`, clamped to 0–100. Discretionary sums Shopping and Entertainment. The ratio is zero for nonpositive income. | 74 |
| Goal progress | 20% | Rounded aggregate current divided by aggregate target times 100, capped at 100. Defaults to 80 for nonpositive target. | 73 |

The rounded weighted sum is 73 on the seed. Tiers begin at 85 (EXCELLENT), 75 (STRONG), 60 (STABLE), 45 (ATTENTION), with CRITICAL below 45. The summary is tier-specific text. The savings health formula uses 35 as its denominator. The trajectory benchmark separately uses 30%.

## August 2026 seed

18 ledger rows, 8 budget categories and 3 savings goals. Income is ₹95,000, seeded ledger spend is ₹77,080, and calculated savings are ₹17,920 (18.9% displayed).

| Category | Allocated (₹) | Seed spent (₹) | Color |
| --- | ---: | ---: | --- |
| Housing & Utilities | 25,000 | 24,500 | `#6366f1` |
| Food & Dining | 12,000 | 8,940 | `#10b981` |
| Shopping & Lifestyle | 8,000 | 6,720 | `#f59e0b` |
| Transport & Fuel | 5,000 | 3,480 | `#06b6d4` |
| Subscriptions & SaaS | 3,000 | 2,490 | `#8b5cf6` |
| Entertainment & Leisure | 4,000 | 3,150 | `#ec4899` |
| Health & Wellness | 4,000 | 2,800 | `#14b8a6` |
| Investments & Savings | 25,000 | 25,000 | `#eab308` |
| Total | 86,000 | 77,080 | |

The seed budget spend matches the ledger sums, including SIPs in spend. No seed row is under ₹300.

## UI state

| Owner | Data fields and defaults |
| --- | --- |
| Preferences store | `reducedMotion: boolean = false`, `currency: CurrencyCode = "INR"`. Currency codes are INR, USD, EUR and GBP. |
| Shared UI store | `activeSection: string = "hero"`, `selectedCategory: TransactionCategory \| null = null`, `isAddTransactionOpen: boolean = false`, `cursorContext: { variant: CursorVariant; label?: string } = { variant: "default" }`. Variants are default, hover, explore, view and drag. Universe selection and the add modal use their own local state. |
| Home and Boot | Home `isBooted` and `isStoryOpen` are false. Boot `currentStepIndex` is 0 and `isDone` is false. |
| Navbar and Cursor | Navbar `time` starts empty and `scrolled` is false. Cursor `mousePosition` starts at `{ x: -100, y: -100 }`, with `isVisible` and `isTouchDevice` false. |
| Trajectory, Insights and Recap | Numeric `activeStep`, `activeInsightIndex` and `currentSlide` each start at 0. |
| Universe, Score and River | Universe has nullable category selections `selectedCategory` and `hoveredCategory`, plus numeric `mouseOffset` x/y initially 0. Score `selectedSignal` and River `activeBranch` are nullable string IDs. |
| Command | `selectedCategoryFilter: string = "ALL"`, `hoveredTxId: string \| null = null`, `isAddModalOpen = false`, `scrubDay = 24`. Form title, merchant and amount are empty strings. Category defaults to Food & Dining. |
| Shared primitives | Counter `displayValue` starts at 0, tooltip `isVisible` at false and magnetic button `position` at `{ x: 0, y: 0 }`. |
