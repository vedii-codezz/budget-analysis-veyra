"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePreferencesStore } from "@/store/preferences";

const BOOT_STEPS = [
  "VEYRA // INITIALIZING",
  "ANALYZING TRANSACTIONS",
  "CALCULATING CASH FLOW",
  "MAPPING SPENDING PATTERNS",
  "BUILDING FINANCIAL PROFILE",
  "VEYRA // SYSTEM READY",
];

export const BootSequence: React.FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const reducedMotion = usePreferencesStore((s) => s.reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }
    const timers = BOOT_STEPS.map((_, index) =>
      window.setTimeout(() => setCurrentStepIndex(index), index * 280)
    );
    timers.push(window.setTimeout(() => setIsDone(true), BOOT_STEPS.length * 280 + 350));
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDone(true);
    };
    window.addEventListener("keydown", escape);
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("keydown", escape);
    };
  }, [reducedMotion, onComplete]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-16 bg-background text-foreground select-none"
        >
          {/* Top Brand Marker */}
          <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-[11px] text-foreground-dim">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-foreground-muted rounded-full animate-pulse" />
              <span className="text-foreground tracking-widest font-semibold">VEYRA</span>
              <span>{"//"} CORE ENGINE BOOT</span>
            </div>
            <button
              onClick={() => setIsDone(true)}
              className="text-foreground-muted hover:text-foreground transition-colors tracking-widest uppercase text-[10px]"
            >
              [ SKIP SEQUENCE / ESC ]
            </button>
          </div>

          {/* Center Boot Typography */}
          <div className="my-auto max-w-3xl space-y-6">
            <div className="font-mono text-xs text-foreground-dim tracking-mega uppercase">
              PHASE // 0{currentStepIndex + 1} OF 0{BOOT_STEPS.length}
            </div>

            <div className="h-20 flex items-center">
              <motion.h1
                key={currentStepIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tightest uppercase text-foreground"
              >
                {BOOT_STEPS[currentStepIndex]}
              </motion.h1>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md h-0.5 bg-surface overflow-hidden mt-8">
              <motion.div
                className="h-full bg-foreground"
                animate={{
                  width: `${((currentStepIndex + 1) / BOOT_STEPS.length) * 100}%`,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Bottom Telemetry Status */}
          <div className="flex items-center justify-between border-t border-line pt-4 font-mono text-[10px] text-foreground-dim uppercase tracking-wider">
            <span>DEMO DATA · AUGUST 2026</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
