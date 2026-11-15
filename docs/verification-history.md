# Verification history

## 2026-11-15

| Date | Check | Result | Evidence |
| --- | --- | --- | --- |
| 2026-11-15 | Source review, seed totals, documentation links and change scope | Source and documentation checked locally. | Workspace HEAD `94aaf1b`, `src/data/mockFinance.ts`, `src/lib/finance/index.ts`, relative-link check and Git status. |

## 2026-11-14

2026-11-14: Manual screen-recording audit of the deployed site.

**KNOWN ISSUES (not yet fixed)**

- Weekend insight says +31% but ₹2,420 vs ₹1,080 is about +124%. The story recap repeats +31%.
- Cash-Flow River shows liquid buffer ₹23,960 vs ₹17,920 elsewhere.
- Savings Rate slide shows benchmark 30% vs 18.9%, the delta renders "+-11.1%", and the copy claims outperformance.
- Micro-purchase insight claims 14 purchases under ₹300 (₹3,840, 6.5%) but none exist in the ledger. ₹3,840 is 5.0% of ₹77,080.
- Insight cards are labelled // 04, // 03, // 05 but the pager shows 01/04, 04/04, 02/04.
- Add Transaction clamps an overspend to ₹0 and 0.0% instead of a deficit state. It has no date field or Travel category.
- Spending Universe: the cursor badge covers bubble labels and the tooltip is clipped by neighbouring bubbles.
- Seed data: "Weekend Brunch" is dated Thursday 2026-08-20.

The card numbering above records the supplied deployment audit. The workspace source currently contains tags `04`, `05`, `02`, and `01` in array order. The deployed commit behind the recording is **Unknown / not implemented**.

## Phase 1

### Verification

| Date | Check | Result | Evidence |
| --- | --- | --- | --- |

## Phase 2

### Verification

| Date | Check | Result | Evidence |
| --- | --- | --- | --- |

## Phase 3

### Verification

| Date | Check | Result | Evidence |
| --- | --- | --- | --- |

## Phase 4

### Verification

| Date | Check | Result | Evidence |
| --- | --- | --- | --- |


## Phase 5 · 2026-11-15

`node scripts/check-palette.mjs` passed the contrast checks and the source scan for inline hex and RGB colors.

| Text | Background | Contrast |
| --- | --- | --- |
| `--text` | `--bg` | 15.20:1 |
| `--text` | `--surface` | 9.81:1 |
| `--text` | `--line` | 5.19:1 |
| `--text-secondary` | `--bg` | 10.12:1 |
| `--text-secondary` | `--surface` | 6.53:1 |
| `--text-muted` | `--bg` | 5.52:1 |
| `--bg` | `--text` | 15.20:1 |
| `--bg` | `--text-secondary` | 10.12:1 |
| `--bg` | `--text-muted` | 5.52:1 |
| `--danger` | `--bg` | 6.30:1 |
| `--warn` | `--bg` | 8.52:1 |

Tested combinations below 4.5:1 are unused for text: `--danger` on `--surface` (4.06:1), `--text-muted` on `--surface` (3.56:1), `--text-secondary` on `--line` (3.45:1), and `--bg` on `--line` (2.93:1).

The production build passed with network access for the existing Google Fonts. All seven finance tests passed, including the 90% warning threshold and the 100% breach boundary. The 1200 x 630 social PNG was verified.

## Preview follow-up · 2026-11-15

- Local production build passed. Generated HTML includes the social image alt, large Twitter card, hero tagline, and Baseline 50.
- Nine finance tests passed, including score reconciliation, river reconciliation, the signed benchmark delta, and the exact Flight to Mumbai scenario.
- In the local production UI, Air India suggested Travel. Adding INR 24,000 showed a deficit of INR 6,080, lowered the score from 77 to 43, and showed Travel at 480% with a Breached label. The entry survived reload and Reset demo data removed it.
- Keyboard checks opened the cash and micro-purchase help with Enter, closed it with Escape, and confirmed focus returned to Add Transaction after submit and Escape. The trajectory rendered the signed benchmark delta. The Motion toggle survived reload and the intro stayed dismissed.
- The palette script checks the supported foreground/background pairs. A rendered-style audit identified an active nav label using muted text on the surface (3.56:1). Active links now use headline text, which measures 9.81:1 on the surface and 15.20:1 on the active page-background highlight. The unused failing pairs are recorded above.


## Ink & Amber · 2026-11-15

The palette check passed for all 13 active text/background pairs. Ratios below are rounded to two decimal places.

| Text | Background | Contrast |
| --- | --- | --- |
| Text | Page / surface | 17.10:1 / 15.06:1 |
| Secondary | Page / surface | 11.70:1 / 10.30:1 |
| Muted | Page / surface | 5.93:1 / 5.22:1 |
| Accent | Page / surface | 10.55:1 / 9.29:1 |
| Page | Accent / text / secondary | 10.55:1 / 17.10:1 / 11.70:1 |
| Danger | Page | 5.79:1 |
| Warn | Page | 10.62:1 |

Page-colored text on the line token measured 1.71:1. Universe labels now use secondary or headline text on the surface. The line token is used for outlines and markers. The source scan passed for hardcoded hex, RGB, HSL and standard Tailwind colors outside the token definition. The social preview was verified at 1200 × 630 with page, title and accent pixels from the new palette.

Accent and warning have almost identical luminance. In grayscale, budget warnings retain the usage percentage, breaches retain the Breached label, and Attention and deficit states retain their status text and warning icon. This was checked against the component markup.
