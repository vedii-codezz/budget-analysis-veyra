"use client";

import { usePreferencesStore } from "@/store/preferences";

const links = [
  ["Overview", "#hero"],
  ["Universe", "#universe"],
  ["Score", "#score"],
  ["Flow", "#flow"],
  ["Command", "#dashboard"],
];

export function Navbar({ onOpenStory }: { onOpenStory: () => void }) {
  const { reducedMotion, toggleReducedMotion } = usePreferencesStore();

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-background/95">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-3 px-6 py-4 font-mono text-xs sm:px-8 md:px-12 lg:px-16">
        <a href="#hero" className="font-semibold tracking-widest text-foreground">VEYRA</a>
        <nav aria-label="Sections" className="order-last flex w-full justify-between gap-2 text-foreground-dim sm:order-none sm:w-auto sm:justify-start lg:gap-6">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-foreground">{label}</a>
          ))}
        </nav>
        <div role="group" aria-label="Utilities" className="flex items-center gap-4 text-foreground-dim">
          <button type="button" onClick={onOpenStory} className="hover:text-foreground">Story Recap</button>
          <button type="button" onClick={toggleReducedMotion} aria-pressed={reducedMotion}
            title={reducedMotion ? "Reduced motion is on" : "Reduced motion is off"}
            className="hover:text-foreground aria-pressed:underline">
            Motion
          </button>
        </div>
      </div>
    </header>
  );
}
