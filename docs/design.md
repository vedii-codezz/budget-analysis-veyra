# Design

## Theme tokens

The custom theme extends Tailwind's defaults. [Tailwind config](../tailwind.config.ts) and [global CSS](../src/app/globals.css) define the shared tokens.

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

The body uses inline SVG film grain with 0.03 opacity. Panels use translucent obsidian, low-opacity white borders and backdrop blur. Square panels and controls coexist with circular score and category graphics, pill navigation and circular status dots. The theme adds no custom spacing or border-radius scale. Category colors are listed in [Data model](data-model.md).

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
