"use client";

import { cashRetainedTarget } from "@/lib/finance";
import React, { useEffect, useRef, useState } from "react";
import { registerGSAP } from "@/lib/animation/gsap";
import { useFinanceStore } from "@/store/finance";
import { usePreferencesStore } from "@/store/preferences";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { formatCurrency, formatPercentage } from "@/lib/utils/currency";
import { ArrowDownRight, Layers, Sparkles, TrendingUp } from "lucide-react";
import { clsx } from "clsx";

export const ScrollStory: React.FC = () => {
  const { income, consumption: spend, cashRetained: savings, cashRetainedRate: savingsRate, river, invested, savedAndInvestedRate } = useFinanceStore((s) => s.metrics);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const reducedMotion = usePreferencesStore((s) => s.reducedMotion);


  const storySteps = [
    {
      id: "step-1",
      tag: "INFLOW VELOCITY",
      headline: "YOU EARNED",
      amount: income,
      isPercentage: false,
      status: "neutral" as const,
      caption: "Gross capital generated across primary income sources this month.",
      submetrics: [
        { label: "Total Inflow", val: formatCurrency(income) },

      ],
    },
    {
      id: "step-2",
      tag: "OUTFLOW ALLOCATION",
      headline: "YOU SPENT",
      amount: spend,
      isPercentage: false,
      status: "warning" as const,
      caption: "Essential living, lifestyle choices, and recurring commitments settled.",
      submetrics: [
        { label: "Essential Living", val: formatCurrency(river.essentials) },
        { label: "Lifestyle Spend", val: formatCurrency(river.lifestyle) },
      ],
    },
    {
      id: "step-3",
      tag: "CAPITAL PRESERVATION",
      headline: "CASH RETAINED",
      amount: savings,
      isPercentage: false,
      status: savings < 0 ? "danger" as const : "positive" as const,
      caption: savings < 0 ? "Over budget. Outflows exceeded income." : "Cash left after expenses and investments.",
      submetrics: [
        { label: "Direct Wealth SIPs", val: formatCurrency(invested) },
        { label: "Cash retained", val: formatCurrency(savings) },
      ],
    },
    {
      id: "step-4",
      tag: "FINANCIAL EFFICIENCY",
      headline: "CASH RETAINED RATE",
      amount: savingsRate,
      isPercentage: true,
      status: savings < 0 ? "danger" as const : "positive" as const,
      caption: `Saved + invested accounts for ${formatPercentage(savedAndInvestedRate)} of income.`,
      submetrics: [
        { label: "Benchmark Target", val: formatPercentage(cashRetainedTarget) },
        { label: "Current Delta", val: `${(savingsRate - cashRetainedTarget).toFixed(1).replace("-", "−")} pts` },
      ],
    },
  ];

  useEffect(() => {
    if (reducedMotion) return;

    const { gsap, ScrollTrigger } = registerGSAP();
    const triggerEl = triggerRef.current;
    const containerEl = containerRef.current;

    if (!triggerEl || !containerEl) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: triggerEl,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          const stepIndex = Math.min(
            storySteps.length - 1,
            Math.floor(progress * storySteps.length)
          );
          setActiveStep(stepIndex);
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion, storySteps.length]);

  const currentStory = storySteps[activeStep];

  return (
    <div ref={containerRef} id="story" className="relative w-full bg-background">
      <div
        ref={triggerRef}
        className="min-h-screen w-full flex flex-col justify-between py-24 px-6 sm:px-8 md:px-12 lg:px-16"
      >
        {/* Story Section Top Marker */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-line pb-6">
          <SectionLabel index="02" title="Scroll-Driven Trajectory" tag="CHOREOGRAPHED REVEAL" />
          <div className="flex items-center gap-2 font-mono text-xs text-foreground-muted">
            <span className="text-foreground font-semibold">0{activeStep + 1}</span>
            <span className="text-foreground-dim">/</span>
            <span className="text-foreground-dim">0{storySteps.length}</span>
          </div>
        </div>

        {/* Pinned Editorial Narrative Container */}
        <div className="max-w-7xl mx-auto w-full my-auto py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative Text */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 font-mono text-[10px] tracking-mega uppercase bg-surface border border-line text-foreground-muted">
                <Sparkles className="w-3 h-3" />
                {currentStory.tag}
              </div>

              <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tightest text-foreground uppercase leading-[0.88] transition-all duration-500">
                {currentStory.headline}
              </h2>

              <div className="pt-2">
                <div
                  className={clsx(
                    "text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tightest tabular-nums transition-all duration-500",
                    currentStory.status === "positive" && "text-foreground-muted",
                    currentStory.status === "warning" && "text-foreground-muted",
                    currentStory.status === "danger" && "text-danger",
                    currentStory.status === "neutral" && "text-foreground"
                  )}
                >
                  {currentStory.isPercentage
                    ? formatPercentage(currentStory.amount)
                    : formatCurrency(currentStory.amount)}
                </div>
              </div>

              <p className="text-foreground-muted text-base md:text-xl font-light max-w-xl leading-relaxed transition-opacity duration-300">
                {currentStory.caption}
              </p>
            </div>

            {/* Right Meta Telemetry Block */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="bg-surface backdrop-blur-2xl border border-line p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-foreground-muted flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-foreground-muted" />
                    DECONSTRUCTION
                  </span>
                  <span className="font-mono text-[10px] text-foreground-muted">
                    HEALTHY
                  </span>
                </div>

                <div className="space-y-4">
                  {currentStory.submetrics.map((sub, i) => (
                    <div key={i} className="flex items-center justify-between font-mono text-xs">
                      <span className="text-foreground-muted">{sub.label}</span>
                      <span className="text-foreground font-medium tabular-nums">{sub.val}</span>
                    </div>
                  ))}
                </div>

                {/* Progress Visualizer */}
                <div className="pt-4 border-t border-line space-y-2">
                  <div className="flex justify-between font-mono text-[10px] text-foreground-muted uppercase">
                    <span>Flow Progression</span>
                    <span>{Math.round(((activeStep + 1) / storySteps.length) * 100)}%</span>
                  </div>
                  <div className="w-full h-1 bg-surface overflow-hidden">
                    <div
                      className="h-full bg-foreground-muted transition-all duration-500 ease-out"
                      style={{
                        width: `${((activeStep + 1) / storySteps.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section Bottom Marker */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-t border-line pt-6 font-mono text-[11px] text-foreground-dim">
          <div className="flex items-center gap-6">
            {storySteps.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveStep(idx)}
                className={clsx(
                  "transition-colors duration-300 flex items-center gap-1.5",
                  activeStep === idx
                    ? "text-foreground font-semibold"
                    : "text-foreground-dim hover:text-foreground-muted"
                )}
              >
                <span className={clsx("w-1.5 h-1.5 rounded-full", activeStep === idx ? "bg-foreground-muted" : "bg-surface")} />
                0{idx + 1} {s.headline}
              </button>
            ))}
          </div>
          <span className="hidden sm:inline">CYCLE STAGE: COMPLETE</span>
        </div>
      </div>
    </div>
  );
};
