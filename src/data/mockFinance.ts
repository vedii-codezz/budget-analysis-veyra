import {
  Transaction,
  CategoryBudget,
  SavingsGoal,
  CashFlowEvent,
} from "@/types/finance";

export const MOCK_INCOME = 95000;

export const MOCK_BUDGETS: CategoryBudget[] = [
  {
    category: "Housing & Utilities",
    allocated: 25000,
    spent: 24500,
    color: "#6366f1", // indigo
  },
  {
    category: "Food & Dining",
    allocated: 12000,
    spent: 8940,
    color: "#10b981", // emerald
  },
  {
    category: "Shopping & Lifestyle",
    allocated: 8000,
    spent: 6720,
    color: "#f59e0b", // amber
  },
  {
    category: "Transport & Fuel",
    allocated: 5000,
    spent: 3480,
    color: "#06b6d4", // cyan
  },
  {
    category: "Subscriptions & SaaS",
    allocated: 3000,
    spent: 2490,
    color: "#8b5cf6", // purple
  },
  {
    category: "Entertainment & Leisure",
    allocated: 4000,
    spent: 3150,
    color: "#ec4899", // pink
  },
  {
    category: "Health & Wellness",
    allocated: 4000,
    spent: 2800,
    color: "#14b8a6", // teal
  },
  {
    category: "Investments & Savings",
    allocated: 25000,
    spent: 25000,
    color: "#eab308", // gold
  },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-01",
    title: "Apartment Rent & Maintenance",
    merchant: "DLF CyberCity Properties",
    amount: 22000,
    category: "Housing & Utilities",
    date: "2026-08-01",
    isRecurring: true,
  },
  {
    id: "tx-02",
    title: "Electricity & Fiber Internet",
    merchant: "Tata Power & Airtel Xstream",
    amount: 2500,
    category: "Housing & Utilities",
    date: "2026-08-03",
    isRecurring: true,
  },
  {
    id: "tx-03",
    title: "Gourmet Dinner",
    merchant: "Indian Accent",
    amount: 3420,
    category: "Food & Dining",
    date: "2026-08-05",
  },
  {
    id: "tx-04",
    title: "Weekly Organic Groceries",
    merchant: "Blinkit Instant",
    amount: 1840,
    category: "Food & Dining",
    date: "2026-08-07",
  },
  {
    id: "tx-05",
    title: "Cab Rides & Airport Transit",
    merchant: "Uber Premier",
    amount: 1650,
    category: "Transport & Fuel",
    date: "2026-08-08",
  },
  {
    id: "tx-06",
    title: "Designer Minimalist Jacket",
    merchant: "Zara Studios",
    amount: 4890,
    category: "Shopping & Lifestyle",
    date: "2026-08-10",
  },
  {
    id: "tx-07",
    title: "Apple One Premier Subscription",
    merchant: "Apple Services",
    amount: 365,
    category: "Subscriptions & SaaS",
    date: "2026-08-11",
    isRecurring: true,
  },
  {
    id: "tx-08",
    title: "Claude Pro & Dev Cloud",
    merchant: "Anthropic PBC",
    amount: 1750,
    category: "Subscriptions & SaaS",
    date: "2026-08-12",
    isRecurring: true,
  },
  {
    id: "tx-09",
    title: "Specialty Coffee Beans & Pourover",
    merchant: "Blue Tokai Coffee",
    amount: 1120,
    category: "Food & Dining",
    date: "2026-08-14",
  },
  {
    id: "tx-10",
    title: "Weekend IMAX Cinema Experience",
    merchant: "PVR Directors Cut",
    amount: 1850,
    category: "Entertainment & Leisure",
    date: "2026-08-15",
  },
  {
    id: "tx-11",
    title: "Fuel & Highway Tolls",
    merchant: "Indian Oil Premium",
    amount: 1830,
    category: "Transport & Fuel",
    date: "2026-08-16",
  },
  {
    id: "tx-12",
    title: "Annual Gym & Spa Pass",
    merchant: "Cult.fit Elite",
    amount: 2800,
    category: "Health & Wellness",
    date: "2026-08-17",
    isRecurring: true,
  },
  {
    id: "tx-13",
    title: "Index Fund SIP (Nifty 50)",
    merchant: "Zerodha Coin",
    amount: 15000,
    category: "Investments & Savings",
    date: "2026-08-18",
    isRecurring: true,
  },
  {
    id: "tx-14",
    title: "Global Tech Index SIP",
    merchant: "Groww Investments",
    amount: 10000,
    category: "Investments & Savings",
    date: "2026-08-18",
    isRecurring: true,
  },
  {
    id: "tx-15",
    title: "Weekend Brunch with Friends",
    merchant: "Olive Bar & Kitchen",
    amount: 2560,
    category: "Food & Dining",
    date: "2026-08-20",
  },
  {
    id: "tx-16",
    title: "Noise Cancelling Headphones Accessory",
    merchant: "Croma Electronics",
    amount: 1830,
    category: "Shopping & Lifestyle",
    date: "2026-08-21",
  },
  {
    id: "tx-17",
    title: "Spotify Duo & Youtube Premium",
    merchant: "Google & Spotify",
    amount: 375,
    category: "Subscriptions & SaaS",
    date: "2026-08-22",
    isRecurring: true,
  },
  {
    id: "tx-18",
    title: "Cocktails & Jazz Night",
    merchant: "The Piano Man Club",
    amount: 1300,
    category: "Entertainment & Leisure",
    date: "2026-08-23",
  },
];

export const MOCK_GOALS: SavingsGoal[] = [
  {
    id: "goal-1",
    title: "6-Month Runway Reserve",
    targetAmount: 500000,
    currentAmount: 385000,
    targetDate: "2026-12-31",
    category: "Safety Net",
  },
  {
    id: "goal-2",
    title: "Tokyo Autumn Expedition",
    targetAmount: 250000,
    currentAmount: 160000,
    targetDate: "2027-10-15",
    category: "Travel",
  },
  {
    id: "goal-3",
    title: "M4 Max Studio Workspace",
    targetAmount: 320000,
    currentAmount: 240000,
    targetDate: "2026-11-30",
    category: "Hardware",
  },
];

export const MOCK_CASH_FLOW_EVENTS: CashFlowEvent[] = [
  {
    id: "cf-1",
    date: "AUG 01",
    title: "Primary Monthly Salary Credited",
    type: "income",
    amount: 95000,
    category: "Income",
    highlight: "+₹95,000 Liquidity Inflow",
  },
  {
    id: "cf-2",
    date: "AUG 03",
    title: "Fixed Living Expenses & Rent",
    type: "expense",
    amount: 24500,
    category: "Housing",
    highlight: "Primary Fixed Burn Settled",
  },
  {
    id: "cf-3",
    date: "AUG 10",
    title: "Lifestyle & Apparel Purchase",
    type: "expense",
    amount: 4890,
    category: "Shopping",
    highlight: "Discretionary Peak",
  },
  {
    id: "cf-4",
    date: "AUG 18",
    title: "Automated Wealth Allocation (SIPs)",
    type: "milestone",
    amount: 25000,
    category: "Investments",
    highlight: "₹25,000 Transferred to Wealth Assets",
  },
  {
    id: "cf-5",
    date: "AUG 24",
    title: "Mid-Month Budget Adherence Check",
    type: "milestone",
    amount: 18420,
    category: "Overview",
    highlight: "38.5% Projected Month Savings Rate",
  },
];
