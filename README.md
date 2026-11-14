# VEYRA

**Your money, in focus.**

> VEYRA is an immersive personal finance and budget analysis platform that transforms financial data into an interactive visual experience. It helps users understand spending patterns, monitor budgets, explore cash flow, track savings, and discover actionable financial insights.

## Key Features

- **Cinematic Experience:** Deep green palette, subtle film grain, and editorial typography hierarchy.
- **Pure Financial Calculation Engine:** Decoupled mathematical modules for cash retention, burn pace, category budgeting, and composite VEYRA SCORE health indexing.
- **Scroll-Driven Financial Storytelling:** GSAP ScrollTrigger pinned narrative.
- **Interactive Command Center:** Asymmetric macro overview, category allocation adherence, and capital deployment ledger with browser-local transaction recording.
- **Centralized Animation Pipeline:** Coordinated GSAP and Framer Motion integration with Lenis smooth scrolling.
- **Desktop Contextual Cursor:** Interactive dynamic cursor with mode indicators (`EXPLORE`, `INSPECT`, `ADD`).
- **Accessibility & Performance:** Native reduced-motion support, clean mobile responsiveness, and zero unnecessary visual bloat.

## Tech Stack

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS + Custom Design Tokens
- **State Management:** Zustand
- **Motion & Scroll:** GSAP, ScrollTrigger, Framer Motion, Lenis
- **Icons:** Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Case study: reconciling the August demo

The hero, river, and story previously used independent totals and examples. VEYRA now derives those views from one ledger in [the finance module](src/lib/finance/index.ts). Each entry has an ID, ISO calendar date, title, merchant, positive rupee amount, category and type. One-offs and recurring entries can be marked separately. Category caps and the cash retention target are demo settings. Monthly income comes from income entries. The form saves user entries locally and Reset demo data restores the original ledger. The date defaults to today within August 2026 and to the nearest valid date outside the demo month.

### Metrics

| Metric | Calculation |
| --- | --- |
| Consumption and invested | Sum expense entries and investment entries respectively. Income is the sum of income entries. |
| Cash retained and its rate | Income minus consumption and invested. Divide by income for the rate. The benchmark delta subtracts the 30% retention target and is displayed in percentage points. |
| Saved + invested | Divide cash retained plus invested by income. |
| Cash-Flow River | Essentials include housing, transport, and health. Lifestyle includes every other expense. Wealth is invested, and the liquid buffer is cash retained. Together the four buckets equal income, including when cash retained is negative. |
| Budget usage and scrubber | Usage compares each category’s outflows with its cap. The scrubber sums expense and investment entries through the selected date. |
| Weekend premium | Discretionary expenses are lifestyle expenses excluding one-offs and recurring bills. Divide each group’s spend by its weekend or weekday calendar-day count through the latest non-one-off expense, including zero-spend days. The premium is (weekend average ÷ weekday average − 1) × 100. A zero weekday average has no percentage comparison. |
| Micro purchases | Count and sum expense entries below ₹300. Divide their total by consumption for the share. |
| Food pacing | Sum food expenses excluding one-offs and divide by elapsed days. Multiply by the month length for a projection. Divide the projection by the food cap for its projected usage. |
| Recurring subscriptions | Count and sum recurring expense entries in Subscriptions & SaaS. |

The score starts at **0 points**. Each dimension contributes its rounded points independently so the displayed breakdown adds up exactly:

- **35 points** for cash retained rate divided by the 30% target, bounded between zero and one.
- **25 points** for the fraction of monitored categories at or below their caps.
- **20 points** for expense stability. The fraction starts at one and falls linearly to zero as discretionary spend reaches 40% of income.
- **20 points** for investment contributions divided by the monthly investment cap, capped at one.

### Technical decision

The original sample bundled small charges into larger purchases. Splitting ₹3,840 out of those bundles gives the micro-purchase claim real ledger rows while preserving category totals and the opening demo’s ₹17,920 cash retained. Weekend averages use calendar days through the latest regular expense, so the story and insight reflect the corrected ledger instead of the old illustrative averages.

Run the finance assertions with Node 22.18 or later:

```bash
node --test src/lib/finance/finance.test.mjs
```
