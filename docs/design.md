# Design

## Theme tokens

[Global CSS](../src/app/globals.css) defines the palette. [Tailwind](../tailwind.config.ts) maps its utility names to those properties.

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#12201A` | Page, inverse text on light fills, and the background behind semantic badges |
| `--surface` | `#294239` | Cards, panels, dialogs, budget tracks, and the score track |
| `--line` | `#4F6C62` | 1px borders, largest Spending Universe bubble, and the first river accent |
| `--text-muted` | `#7D9A8E` | Labels, captions, section markers, and nav text over the page background |
| `--text-secondary` | `#B7CEC2` | Body copy, positive values, small panel labels, chart fills, and soft hover glow |
| `--text` | `#EEF5F0` | Headlines, largest figures, primary button fills, and the weekend bar |
| `--danger` | `#E8826F` | Negative balances, deficits, and breached caps |
| `--warn` | `#D9B45A` | Caps above 90% through 100%, plus the score's ATTENTION badge |

- Primary buttons use `--text` with `--bg` labels. Secondary buttons use transparent fills, `--line` borders, and `--text-secondary` labels.
- Budget bars switch from `--text-secondary` to `--warn` above 90% and to `--danger` above 100%. The weekday bar uses `--text-muted`.
- Spending Universe bubbles are ranked by amount. The largest uses `--line` with `--text` labels. The next uses `--text-muted` and smaller bubbles use `--text-secondary`, both with `--bg` labels. The hover glow sits outside the label area.
- The river uses `--line`, `--text-muted`, `--text-secondary`, and `--text` for its four accents. Each bucket shows its name and amount.
- The score ring uses `--surface` for the track and `--text-secondary` for progress. Score status combines text and an icon for attention and deficit.
- Small labels use `--text-secondary` on panels. Semantic text uses `--bg` behind it. Run `node scripts/check-palette.mjs` to verify contrast and detect hardcoded colors outside the global stylesheet.

## Previous palette (replaced)

These were the original theme values. The small-text dim token was later raised to `#9898a1` before this palette replacement.

| Token | Value |
| --- | --- |
| `background`, `--background` | `#050505` |
| `obsidian` 950 / 900 / 800 / 700 / 600 / 500 | `#050505` / `#090909` / `#101010` / `#161616` / `#222222` / `#2d2d2d` |
| `foreground.DEFAULT`, `--foreground` | `#f4f4f6` |
| `foreground.muted` / `dim` / `dark` | `#8a8a93` / `#52525b` / `#27272a` |
| `financial.positive` / `warning` / `danger` | `#10b981` / `#f59e0b` / `#ef4444` |
| `financial.accent` / `gold` / `cyan` | `#6366f1` / `#eab308` / `#06b6d4` |
| `radial-subtle` | White at 3% opacity at top center, transparent by 70% |
| `radial-accent` | Indigo at 8% opacity at center, transparent by 60% |
| `gradient-glass` | 135° white gradient from 4% to 1% opacity |
| Scrollbar | 5px width and height, 2px thumb radius, `#1c1c20` thumb, `#2e2e36` on hover |

The previous category colors also included `#8b5cf6`, `#ec4899`, `#14b8a6`, `#38bdf8` and `#94a3b8`.


## Typography

[Root layout](../src/app/layout.tsx) loads Inter into `--font-sans` and JetBrains Mono into `--font-mono`, both with Latin subsets and swap display. The sans fallback is Apple system, BlinkMacSystemFont, Segoe UI, Roboto, then sans-serif. The mono fallback is SF Mono, Menlo, Monaco, Consolas, then monospace. Hero emphasis uses the Tailwind serif stack in italics. Financial numbers use tabular figures.

| Role | Classes and scale |
| --- | --- |
| Hero heading | `text-5xl sm:text-6xl md:text-7xl lg:text-8xl` (48 / 60 / 72 / 96px), extra-light, line height 0.92 |
| Boot heading | `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` (30 / 36 / 48 / 60px), extra-light |
| DisplayNumber sm / md / lg | 20→24px / 30→36px / 36→48→60px |
| DisplayNumber xl / hero | 48→60→72px / 60→72→96→128px |
| FinancialMetric | 24px, rising to 30px at `md` |
| Body and telemetry | Body commonly 14–16px with responsive 18–20px copy. Mono metadata uses 9–12px in nav, labels and status lines. |
| Custom tracking | `tightest` −0.04em, `tighter` −0.02em, `widest` 0.2em, `mega` 0.3em |

## Layout and spacing

- Tailwind defaults supply `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px and `2xl` 1536px. The primary centered content width is `max-w-7xl` (80rem).
- Main sections commonly use `px-6 sm:px-8 md:px-12 lg:px-16` (24 / 32 / 48 / 64px). The section wrapper uses `py-24 md:py-36` (96 / 144px) and a 4rem grid. Typical panel padding includes `p-6`, `p-8` and `p-10` (24 / 32 / 40px).
- Hero is at least viewport-height with 7/5 columns at `lg`. Trajectory uses 8/4, Score 5/7, River 4/8 and Command overview 7/5. These stack below `lg`. Category usage in Command switches to two columns at `md`.
- The Universe map is 640px high, rising to 720px at `md`. Nodes range from 92–200px based on spend and use fixed percentage anchors. The score disk is 256px, rising to 288px at `sm`.
- The fixed navbar exposes section links at `lg` and live clock telemetry at `xl`. The motion toggle's text appears at `sm`. The boot and recap are fixed full-screen overlays.

## Motion

| Source | Values |
| --- | --- |
| Shared durations, seconds | instant 0.15, fast 0.3, normal 0.5, slow 0.8, cinematic 1.2, epic 1.8 |
| Stagger, seconds | tight 0.04, normal 0.08, relaxed 0.14, editorial 0.2 |
| GSAP easings | cinematic `power4.out`, smooth `power3.out`, expo `expo.out`, elastic `elastic.out(1, 0.75)`, gentle `power2.inOut`, linear `none` |
| Bézier easings | cinematic `[0.16, 1, 0.3, 1]`, smooth `[0.25, 0.1, 0.25, 1]`, spring `[0.175, 0.885, 0.32, 1.275]`, snappy `[0.4, 0, 0.2, 1]`, gentle `[0.4, 0, 0.6, 1]` |
| Tailwind extensions | `pulse-slow` 6s with gentle Bézier, `float` 8s ease-in-out with −10px midpoint |
| Component timings | Boot steps every 280ms, text transition 0.2s, bar transition 0.25s and overlay exit 0.5s. Counter defaults to 1.2s exponential ease-out. Tooltip uses 0.15s and RevealText uses 0.9s cinematic easing. Recap slide transition is 0.3s cinematic. |
| Scroll and pointer | Lenis duration 1.2s with exponential easing. ScrollTrigger scrub is 0.6s. Cursor spring uses stiffness 400, damping 28, mass 0.3. Button spring uses stiffness 350 and damping 25. |

Motion High is the default. The Low setting is labelled **Motion: Reduced** in the navbar. It skips boot if active during the boot effect, disables trajectory/insight pinning, suppresses the custom cursor, stops updates to Universe parallax and magnetic button offsets, and displays counter and reveal text immediately. Hero still renders a pointer-following light and eight stationary particles instead of sixteen drifting particles. CSS pulses, other component transitions and the recap animation remain active. The OS reduced-motion query gates Lenis initialization only. The navbar toggle changes the in-memory preference and leaves any initialized Lenis instance running.

## Reference wireframes

Reference wireframes or standalone reference images in the repository are **Unknown / not implemented**. The tracked source contains inline visual assets such as the film grain, with no reference wireframe files to link.
