# Internal API

There is no HTTP API.

## State hooks

The three Zustand hooks accept an optional selector and return the selected value, or the full typed state when called without one. Each also exposes Zustand's bound store methods. [Finance store](../src/store/finance.ts), [preferences store](../src/store/preferences.ts), [UI store](../src/store/ui.ts).

| Hook member | Parameters and return | Behavior |
| --- | --- | --- |
| `useFinanceStore.setIncome` | `(income: number) => void` | Replaces in-memory income. |
| `useFinanceStore.addTransaction` | `(tx: Omit<Transaction, "id">) => void` | Prepends an entry with ID `tx-${Date.now()}` and increments matching budget spend. The caller supplies the date. |
| `useFinanceStore.deleteTransaction` | `(id: string) => void` | Removes the ID if found and decreases the matching budget's cached spend, floored at zero. |
| `useFinanceStore.updateBudget` | `(category: TransactionCategory, allocated: number) => void` | Updates the allocation on the matching budget. |
| `useFinanceStore.updateGoal` | `(id: string, currentAmount: number) => void` | Updates the matching goal's current amount. |
| `getMonthlySpend`, `getSavings`, `getSavingsRate` | Each `() => number` | Calculates from current store data. |
| `getAverageDailySpend` | `(daysPassed?: number) => number` | Uses 24 days by default. |
| `getCategorySpend` | `() => Record<TransactionCategory, number>` | Groups positive amounts. |
| `getBudgetUsage` | `() => ReturnType<typeof calculateBudgetUsage>` | Returns budget usage rows from current ledger and allocations. |
| `getFinancialHealth` | `() => FinancialHealthScore` | Computes health from all four state inputs. |
| `getSpendingSpikes`, `getRecurringTransactions` | Each `() => Transaction[]` | Filters the current ledger. |
| `usePreferencesStore.setReducedMotion`, `toggleReducedMotion`, `setCurrency` | `(reduced: boolean) => void`, `() => void`, `(currency: CurrencyCode) => void` | Mutate the corresponding preference in memory. |
| `useUIStore.setActiveSection`, `setSelectedCategory` | `(section: string) => void`, `(category: TransactionCategory \| null) => void` | Replace the corresponding shared UI value. |
| `useUIStore.setAddTransactionOpen` | `(open: boolean) => void` | Updates the shared flag. The Command modal uses local state. |
| `useUIStore.setCursorContext`, `resetCursorContext` | `(context: CursorContext) => void`, `() => void` | Replace cursor state or restore the default variant. |

## Pure finance and formatting functions

The [finance functions](../src/lib/finance/index.ts) and [formatters](../src/lib/utils/currency.ts) have no store mutations. Exact result shapes and calculation rules are in [Data model](data-model.md).

| Export | Parameters | Return |
| --- | --- | --- |
| `calculateMonthlySpend` | `transactions: Transaction[]` | Positive amount sum as `number`. |
| `calculateCategorySpend` | `transactions: Transaction[]` | `Record<TransactionCategory, number>` with keys only for categories with positive spend at runtime. |
| `calculateSavings`, `calculateSavingsRate` | `income: number, totalSpend: number` | Clamped savings amount or percentage as `number`. |
| `calculateBudgetUsage` | `categorySpend: Record<string, number>, budgets: CategoryBudget[]` | Array of enriched budget rows. |
| `calculateAverageDailySpend` | `totalSpend: number, daysPassed: number` | Spend divided by days, or zero for nonpositive days. |
| `forecastMonthEndSpend` | `dailyAvg: number, daysInMonth = 30` | Product as `number`. |
| `detectSpendingSpikes` | `transactions: Transaction[], threshold = 3000` | `Transaction[]` with amounts at or above the threshold. |
| `identifyRecurringTransactions` | `transactions: Transaction[]` | `Transaction[]` with truthy recurring flags. |
| `calculateFinancialHealth` | `income: number, totalSpend: number, budgets: CategoryBudget[], goals: SavingsGoal[], transactions: Transaction[]` | `FinancialHealthScore`. |
| `formatCurrency` | `amount: number, options?: { currency?: CurrencyCode; compact?: boolean; showDecimals?: boolean; showSign?: boolean }` | String. Defaults to INR, with all flags false. INR compact uses Cr, L and k, other compact currencies use Intl. Formats units without conversion. |
| `formatPercentage` | `value: number, includeDecimals = 1` | Fixed decimal string with a percent sign. |

## Animation and data exports

- `registerGSAP()` returns `{ gsap, ScrollTrigger }` and registers the plugin once in a browser. Those two libraries are also re-exported. [GSAP module](../src/lib/animation/gsap.ts)
- `initSmoothScroll(): Lenis | null` creates a Lenis instance and wires it to ScrollTrigger and the GSAP ticker. It disables ticker lag smoothing. Returns null outside the browser or when OS reduced motion is requested. [Scroll module](../src/lib/animation/scroll.ts)
- `EASING`, `DURATION` and `STAGGER` are configuration objects. `fadeIn`, `slideUp`, `scaleUp`, `staggerContainer` and `modalVariants` are Framer Motion `Variants` objects. [Easing](../src/lib/animation/easing.ts), [transitions](../src/lib/animation/transitions.ts), [motion variants](../src/lib/animation/motion.ts)
- `MOCK_INCOME`, `MOCK_BUDGETS`, `MOCK_TRANSACTIONS`, `MOCK_GOALS` and `MOCK_CASH_FLOW_EVENTS` are exported fixtures. The finance types module exports the domain types, the UI store exports `CursorVariant` and `CursorContext`, and the currency utility exports `CurrencyCode`. [Data model](data-model.md)

## Components

Components render React elements except where noted. The module and effect relationships are in [Architecture](architecture.md). A question mark marks an optional prop.

| Export | Props | Render or side effect |
| --- | --- | --- |
| `RootLayout` (default) | `children: React.ReactNode` | HTML shell and cursor. The module also exports Next.js `metadata`. |
| `Home` (default) | None | Mounts sections and Lenis and controls boot/recap visibility. |
| `BootSequence` | `onComplete: () => void` | Boot overlay. Timers or skip trigger completion. |
| `Navbar` | `onOpenStory?: () => void` | Fixed anchors and controls. Starts a clock, listens for scroll, updates shared navigation and motion preference. |
| `CinematicHero` | None | Hero figures and a canvas with mouse, resize and animation-frame effects. |
| `ScrollStory`, `VeyraInsights` | None | Pager sections. Register and clean up pinned scroll contexts in High mode. |
| `SpendingUniverse` | None | Category nodes and details. Sets and resets shared cursor context on hover. |
| `VeyraScore` | None | Score and selectable signals. Viewport entry drives reveal. |
| `CashFlowRiver` | None | Income and expandable branches. |
| `BasicDashboard` | `onOpenStory?: () => void` | Command and form. Commits entries to the finance store. |
| `VeyraStoryModal` | `isOpen: boolean, onClose: () => void` | Recap or null when closed. Registers a keyboard listener while open. |
| `CustomCursor` | None | Pointer overlay or null if hidden, on touch, or in reduced motion. Installs mouse and body listeners. |
| `AnimatedCounter` | `value: number, duration?: number, currency?: CurrencyCode, prefix?: string, suffix?: string, className?: string, isCurrency?: boolean` | Counts from zero via animation frames, or assigns the target directly in reduced mode. Defaults to 1.2 seconds and INR currency formatting. |
| `DataTooltip` | `content: ReactNode, children: ReactNode, position?: "top" \| "bottom" \| "left" \| "right", className?: string` | Renders a local hover tooltip, above its target by default. |
| `DisplayNumber` | `amount: number, currency?: CurrencyCode, size?: "sm" \| "md" \| "lg" \| "xl" \| "hero", className?: string, showSign?: boolean, compact?: boolean, status?: "neutral" \| "positive" \| "warning" \| "danger" \| "accent"` | Formats and styles an amount. Defaults to INR, lg and neutral, with sign and compact flags false. |
| `FinancialMetric` | `label: string, value: number \| string, isCurrency?: boolean, currency?: CurrencyCode, change?: string, trend?: "up" \| "down" \| "neutral", caption?: string, statusColor?: "emerald" \| "amber" \| "crimson" \| "indigo" \| "neutral", className?: string` | Label, value and optional supporting text. Defaults to INR currency formatting and neutral color. |
| `GlassPanel` | Div HTML attributes, `children: ReactNode, variant?: "default" \| "elevated" \| "subtle" \| "accent", glow?: boolean` | Styled div forwarding remaining attributes. Default variant and glow off. |
| `MagneticButton` | Button HTML attributes, `children: ReactNode, variant?: "primary" \| "secondary" \| "ghost" \| "glass", size?: "sm" \| "md" \| "lg", cursorLabel?: string, cursorVariant?: CursorVariant, onClick?: () => void` | Motion button, defaults to primary/md and hover cursor. Pointer events update offset and shared cursor context. |
| `RevealText` | `children: ReactNode, delay?: number, className?: string, as?: "h1" \| "h2" \| "h3" \| "h4" \| "p" \| "div" \| "span"` | Animated reveal or plain tag in reduced motion. Defaults to div and zero delay. |
| `SectionLabel` | `title: string, index?: string, tag?: string, className?: string` | Renders the label. Index defaults to "01". |
| `SectionWrapper` | Section HTML attributes, `children: ReactNode, id?: string, className?: string, containerClassName?: string, hasGridLine?: boolean` | Renders the section and centered container. Grid defaults on. |
