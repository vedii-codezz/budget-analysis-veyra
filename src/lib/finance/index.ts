import type { CategoryBudget, Transaction } from "../../types/finance";

export const budgets: CategoryBudget[] = [
  {
    category: "Housing & Utilities",
    allocated: 25000,
  },
  {
    category: "Food & Dining",
    allocated: 12000,
  },
  {
    category: "Shopping & Lifestyle",
    allocated: 8000,
  },
  {
    category: "Transport & Fuel",
    allocated: 5000,
  },
  {
    category: "Subscriptions & SaaS",
    allocated: 3000,
  },
  {
    category: "Entertainment & Leisure",
    allocated: 4000,
  },
  {
    category: "Health & Wellness",
    allocated: 4000,
  },
  {
    category: "Investments & Savings",
    allocated: 25000,
  },
  { category: "Travel", allocated: 5000 },
  { category: "Other", allocated: 2000 },
];

export const transactions: Transaction[] = [
  {
    id: "tx-01",
    title: "Apartment Rent & Maintenance",
    merchant: "DLF CyberCity Properties",
    amount: 22000,
    category: "Housing & Utilities",
    type: "expense",
    date: "2026-08-01",
    isRecurring: true,
  },
  {
    id: "tx-02",
    title: "Electricity & Fiber Internet",
    merchant: "Tata Power & Airtel Xstream",
    amount: 2500,
    category: "Housing & Utilities",
    type: "expense",
    date: "2026-08-03",
    isRecurring: true,
  },
  {
    id: "tx-03",
    title: "Gourmet Dinner",
    merchant: "Indian Accent",
    amount: 3420,
    category: "Food & Dining",
    type: "expense",
    date: "2026-08-05",
  },
  {
    id: "tx-04",
    title: "Weekly Organic Groceries",
    merchant: "Blinkit Instant",
    amount: 1300,
    category: "Food & Dining",
    type: "expense",
    date: "2026-08-07",
  },
  {
    id: "tx-05",
    title: "Cab Rides & Airport Transit",
    merchant: "Uber Premier",
    amount: 1100,
    category: "Transport & Fuel",
    type: "expense",
    date: "2026-08-08",
  },
  {
    id: "tx-06",
    title: "Designer Minimalist Jacket",
    merchant: "Zara Studios",
    amount: 4330,
    category: "Shopping & Lifestyle",
    type: "expense",
    date: "2026-08-10",
  },
  {
    id: "tx-07",
    title: "Apple One Premier Subscription",
    merchant: "Apple Services",
    amount: 365,
    category: "Subscriptions & SaaS",
    type: "expense",
    date: "2026-08-11",
    isRecurring: true,
  },
  {
    id: "tx-08",
    title: "Claude Pro & Dev Cloud",
    merchant: "Anthropic PBC",
    amount: 1750,
    category: "Subscriptions & SaaS",
    type: "expense",
    date: "2026-08-12",
    isRecurring: true,
  },
  {
    id: "tx-09",
    title: "Specialty Coffee Beans & Pourover",
    merchant: "Blue Tokai Coffee",
    amount: 560,
    category: "Food & Dining",
    type: "expense",
    date: "2026-08-14",
  },
  {
    id: "tx-10",
    title: "Weekend IMAX Cinema Experience",
    merchant: "PVR Directors Cut",
    amount: 1850,
    category: "Entertainment & Leisure",
    type: "expense",
    date: "2026-08-15",
  },
  {
    id: "tx-11",
    title: "Fuel & Highway Tolls",
    merchant: "Indian Oil Premium",
    amount: 1290,
    category: "Transport & Fuel",
    type: "expense",
    date: "2026-08-16",
  },
  {
    id: "tx-12",
    title: "Annual Gym & Spa Pass",
    merchant: "Cult.fit Elite",
    amount: 2800,
    category: "Health & Wellness",
    type: "expense",
    date: "2026-08-17",
    oneOff: true,
  },
  {
    id: "tx-13",
    title: "Index Fund SIP (Nifty 50)",
    merchant: "Zerodha Coin",
    amount: 15000,
    category: "Investments & Savings",
    type: "investment",
    date: "2026-08-18",
    isRecurring: true,
  },
  {
    id: "tx-14",
    title: "Global Tech Index SIP",
    merchant: "Groww Investments",
    amount: 10000,
    category: "Investments & Savings",
    type: "investment",
    date: "2026-08-18",
    isRecurring: true,
  },
  {
    id: "tx-15",
    title: "Weekend Brunch with Friends",
    merchant: "Olive Bar & Kitchen",
    amount: 2010,
    category: "Food & Dining",
    type: "expense",
    date: "2026-08-22",
  },
  {
    id: "tx-16",
    title: "Noise Cancelling Headphones Accessory",
    merchant: "Croma Electronics",
    amount: 1830,
    category: "Shopping & Lifestyle",
    type: "expense",
    date: "2026-08-21",
  },
  {
    id: "tx-17",
    title: "Spotify Duo & Youtube Premium",
    merchant: "Google & Spotify",
    amount: 375,
    category: "Subscriptions & SaaS",
    type: "expense",
    date: "2026-08-22",
    isRecurring: true,
  },
  {
    id: "tx-18",
    title: "Cocktails & Jazz Night",
    merchant: "The Piano Man Club",
    amount: 760,
    category: "Entertainment & Leisure",
    type: "expense",
    date: "2026-08-23",
  },
  { id: "micro-1", title: "Quick groceries", merchant: "Blinkit", amount: 260, category: "Food & Dining", type: "expense", date: "2026-08-07" },
  { id: "micro-2", title: "Evening snack", merchant: "Blinkit", amount: 280, category: "Food & Dining", type: "expense", date: "2026-08-07" },
  { id: "micro-3", title: "Chai and toast", merchant: "Blue Tokai", amount: 275, category: "Food & Dining", type: "expense", date: "2026-08-14" },
  { id: "micro-4", title: "Coffee refill", merchant: "Blue Tokai", amount: 285, category: "Food & Dining", type: "expense", date: "2026-08-14" },
  { id: "micro-5", title: "Chai with friends", merchant: "Olive Bar & Kitchen", amount: 265, category: "Food & Dining", type: "expense", date: "2026-08-22" },
  { id: "micro-6", title: "Brunch pastries", merchant: "Olive Bar & Kitchen", amount: 285, category: "Food & Dining", type: "expense", date: "2026-08-22" },
  { id: "micro-7", title: "Highway toll", merchant: "FASTag", amount: 260, category: "Transport & Fuel", type: "expense", date: "2026-08-16" },
  { id: "micro-8", title: "Parking", merchant: "Highway Plaza", amount: 280, category: "Transport & Fuel", type: "expense", date: "2026-08-16" },
  { id: "micro-9", title: "Auto to metro", merchant: "Uber Auto", amount: 270, category: "Transport & Fuel", type: "expense", date: "2026-08-08" },
  { id: "micro-10", title: "Last-mile auto", merchant: "Uber Auto", amount: 280, category: "Transport & Fuel", type: "expense", date: "2026-08-08" },
  { id: "micro-11", title: "Socks", merchant: "Zara Studios", amount: 275, category: "Shopping & Lifestyle", type: "expense", date: "2026-08-10" },
  { id: "micro-12", title: "Canvas tote", merchant: "Zara Studios", amount: 285, category: "Shopping & Lifestyle", type: "expense", date: "2026-08-10" },
  { id: "micro-13", title: "Jazz night snacks", merchant: "The Piano Man Club", amount: 260, category: "Entertainment & Leisure", type: "expense", date: "2026-08-23" },
  { id: "micro-14", title: "Cover charge", merchant: "The Piano Man Club", amount: 280, category: "Entertainment & Leisure", type: "expense", date: "2026-08-23" },
  { id: "salary", title: "Monthly Salary", merchant: "Payroll", amount: 95000, category: "Income", type: "income", date: "2026-08-01" },
];

export const monthStart = "2026-08-01";
export const monthEnd = "2026-08-31";
export const monthDays = 31;
export const cashRetainedTarget = 30;
export const microThreshold = 300;

const essentialCategories = new Set(["Housing & Utilities", "Transport & Fuel", "Health & Wellness"]);
const sum = (entries: Transaction[]) => entries.reduce((total, entry) => total + Math.round(entry.amount * 100), 0) / 100;
const percent = (part: number, whole: number) => whole > 0 ? part / whole * 100 : 0;
const dayOfMonth = (date: string) => Number(date.slice(-2));
export const weekday = (date: string) => new Date(date).getUTCDay();
const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function isMonthDate(value: string) {
  return /^2026-08-(0[1-9]|[12][0-9]|3[01])$/.test(value);
}

export function isValidEntry(entry: Omit<Transaction, "id">) {
  const minorUnits = Math.round(entry.amount * 100);
  return typeof entry.title === "string" && entry.title.trim().length > 0
    && typeof entry.merchant === "string"
    && typeof entry.date === "string" && isMonthDate(entry.date)
    && typeof entry.amount === "number" && Number.isSafeInteger(minorUnits) && minorUnits > 0
    && (entry.type === "expense" || entry.type === "income")
    && (entry.oneOff === undefined || typeof entry.oneOff === "boolean")
    && (entry.type === "income" ? entry.category === "Income"
      : budgets.some((budget) => budget.category === entry.category && budget.category !== "Investments & Savings"));
}

export function outflowsThroughDay(entries: Transaction[], day: number) {
  return sum(entries.filter((entry) => entry.type !== "income" && dayOfMonth(entry.date) <= day));
}

export function deriveFinance(entries: Transaction[]) {
  const expenses = entries.filter((entry) => entry.type === "expense");
  const investments = entries.filter((entry) => entry.type === "investment");
  const income = sum(entries.filter((entry) => entry.type === "income"));
  const consumption = sum(expenses);
  const invested = sum(investments);
  const deployed = sum([...expenses, ...investments]);
  const cashRetained = Math.round((income - deployed) * 100) / 100;
  const cashRetainedRate = percent(cashRetained, income);
  const savedAndInvestedRate = percent(invested + cashRetained, income);
  const essentials = expenses.filter((entry) => essentialCategories.has(entry.category));
  const lifestyle = expenses.filter((entry) => !essentialCategories.has(entry.category));
  const river = {
    essentials: sum(essentials),
    lifestyle: sum(lifestyle),
    invested,
    cashRetained,
  };
  const categorySpend = Object.fromEntries(budgets.map(({ category }) => [
    category, sum(entries.filter((entry) => entry.type !== "income" && entry.category === category)),
  ]));
  const budgetUsage = budgets.map((budget) => {
    const spent = categorySpend[budget.category];
    const percentage = percent(spent, budget.allocated);
    return {
      ...budget, spent, percentage,
      status: percentage > 100 ? "exceeded" : percentage > 90 ? "warning" : "healthy",
    };
  });
  const discretionary = lifestyle.filter((entry) => !entry.oneOff && !entry.isRecurring);
  const elapsedDays = Math.max(1, ...expenses.filter((entry) => !entry.oneOff).map((entry) => dayOfMonth(entry.date)));
  const isWeekend = (date: string) => [0, 6].includes(weekday(date));
  const weekendDays = Array.from({ length: elapsedDays }, (_, i) =>
    isWeekend(`${monthStart.slice(0, 7)}-${String(i + 1).padStart(2, "0")}`)
  ).filter(Boolean).length;
  const weekendAvg = sum(discretionary.filter((entry) => isWeekend(entry.date))) / (weekendDays || 1);
  const weekdayAvg = sum(discretionary.filter((entry) => !isWeekend(entry.date))) / (elapsedDays - weekendDays || 1);
  const weekendPremiumPct = weekdayAvg > 0 ? (weekendAvg / weekdayAvg - 1) * 100 : null;
  const weekendDescription = (format: (value: number) => string) =>
    `Saturday & Sunday discretionary spend averaged ${format(weekendAvg)} per day vs ${format(weekdayAvg)} on weekdays.`;
  const microEntries = expenses.filter((entry) => entry.amount < microThreshold);
  const microTotal = sum(microEntries);
  const microPurchases = { entries: microEntries, count: microEntries.length, total: microTotal, share: percent(microTotal, consumption) };
  const foodDaily = sum(expenses.filter((entry) => entry.category === "Food & Dining" && !entry.oneOff)) / elapsedDays;
  const foodForecast = foodDaily * monthDays;
  const foodCap = budgets.find((budget) => budget.category === "Food & Dining")!.allocated;
  const foodPacingPct = percent(foodForecast, foodCap);
  const recurring = expenses.filter((entry) => entry.isRecurring && entry.category === "Subscriptions & SaaS");
  const stability = 1 - clamp(percent(sum(discretionary), income) / 40);
  const investmentTarget = budgets.find((budget) => budget.category === "Investments & Savings")!.allocated;
  const signals = [
    { id: "retention", title: "Savings Health", weight: 35, baseline: 25, ratio: clamp(cashRetainedRate / cashRetainedTarget),
      desc: `${cashRetainedRate.toFixed(1)}% cash retained against a ${cashRetainedTarget}% target.` },
    { id: "budget", title: "Budget Discipline", weight: 25, baseline: 10,
      ratio: budgetUsage.filter((budget) => budget.status !== "exceeded").length / budgetUsage.length,
      desc: "Share of category caps met." },
    { id: "stability", title: "Expense Stability", weight: 20, baseline: 7.5, ratio: stability,
      desc: "Discretionary spend, excluding one-offs and recurring bills, against a 40% of income threshold." },
    { id: "investment", title: "Goal Progress", weight: 20, baseline: 7.5, ratio: clamp(invested / investmentTarget),
      desc: "Investment contributions as a share of the monthly investment target." },
  ].map((signal) => {
    const earned = Math.round(signal.weight * signal.ratio);
    return { ...signal, earned, points: earned - signal.baseline };
  });
  const base = signals.reduce((total, signal) => total + signal.baseline, 0);
  const score = signals.reduce((total, signal) => total + signal.points, base);
  const tier = score >= 85 ? "EXCELLENT" : score >= 75 ? "STRONG" : score >= 60 ? "STABLE" : score >= 45 ? "ATTENTION" : "CRITICAL";

  return {
    income, consumption, invested, deployed, cashRetained, cashRetainedRate, savedAndInvestedRate,
    river, essentials, lifestyle, investments, categorySpend, budgetUsage, elapsedDays,
    weekendAvg, weekdayAvg, weekendPremiumPct, weekendDescription, microPurchases,
    foodDaily, foodForecast, foodCap, foodPacingPct, recurring, recurringTotal: sum(recurring),
    health: { base, score, tier, signals, summary: cashRetained < 0 ? "Outflows exceed monthly income." : signals[0].desc },
  };
}

export const income = deriveFinance(transactions).income;
