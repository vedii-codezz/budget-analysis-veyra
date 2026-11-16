"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePreferencesStore } from "@/store/preferences";

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [isDone, setIsDone] = useState(false);
  const reducedMotion = usePreferencesStore((state) => state.reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }

    const timer = window.setTimeout(() => setIsDone(true), 560);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDone(true);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onComplete, reducedMotion]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isDone && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 grid place-items-center bg-background p-8 text-center"
        >
          <div>
            <p className="text-6xl font-extralight tracking-tightest md:text-8xl">VEYRA.</p>
            <p className="mt-3 font-mono text-xs text-foreground-dim">Demo data · August 2026</p>
          </div>
          <button type="button" onClick={() => setIsDone(true)} className="editorial-link absolute right-6 top-6">
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
