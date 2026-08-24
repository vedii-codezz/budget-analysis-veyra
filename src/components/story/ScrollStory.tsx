"use client";

import React, { useEffect, useRef, useState } from "react";
import { registerGSAP } from "@/lib/animation/gsap";
import { useFinanceStore } from "@/store/finance";
import { usePreferencesStore } from "@/store/preferences";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { formatCurrency, formatPercentage } from "@/lib/utils/currency";
import { ArrowDownRight, Layers, Sparkles, TrendingUp } from "lucide-react";
import { clsx } from "clsx";

export const ScrollStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const income = useFinanceStore((s) => s.income);
  const getMonthlySpend = useFinanceStore((s) => s.getMonthlySpend);
  const getSavings = useFinanceStore((s) => s.getSavings);
  const getSavingsRate = useFinanceStore((s) => s.getSavingsRate);
  const reducedMotion = usePreferencesStore((s) => s.reducedMotion);

  const spend = getMonthlySpend();
  const savings = getSavings();
  const savingsRate = getSavingsRate();

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
        { label: "Salary Credit", val: "₹95,000" },
        { label: "Tax Deductions", val: "Pre-settled" },
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
        { label: "Essential Living", val: "₹27,000" },
        { label: "Discretionary Spend", val: "₹31,420" },
      ],
    },
    {
      id: "step-3",
      tag: "CAPITAL PRESERVATION",
      headline: "YOU SAVED",
      amount: savings,
      isPercentage: false,
      status: "positive" as const,
      caption: "Net surplus retained for wealth compounding and emergency reserves.",
      submetrics: [
        { label: "Direct Wealth SIPs", val: "₹25,000" },
        { label: "Liquid Buffer", val: "₹11,580" },
      ],
    },
    {
      id: "step-4",
      tag: "FINANCIAL EFFICIENCY",
      headline: "SAVINGS RATE",
      amount: savingsRate,
      isPercentage: true,
      status: "positive" as const,
      caption: "Your capital retention efficiency exceeds 78% of urban professionals.",
      submetrics: [
        { label: "Benchmark Target", val: "30.0%" },
        { label: "Current Delta", val: `+${(savingsRate - 30).toFixed(1)}%` },
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
    <div ref={containerRef} id="story" className="relative w-full bg-obsidian-950">
      <div
        ref={triggerRef}
        className="min-h-screen w-full flex flex-col justify-between py-24 px-6 sm:px-8 md:px-12 lg:px-16"
      >
        {/* Story Section Top Marker */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/[0.06] pb-6">
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
              <div className="inline-flex items-center gap-2 px-3 py-1 font-mono text-[10px] tracking-mega uppercase bg-white/[0.03] border border-white/[0.08] text-financial-accent">
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
                    currentStory.status === "positive" && "text-financial-positive",
                    currentStory.status === "warning" && "text-financial-warning",
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
              <div className="bg-obsidian-900/60 backdrop-blur-2xl border border-white/[0.08] p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-foreground-dim flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-foreground-muted" />
                    DECONSTRUCTION
                  </span>
                  <span className="font-mono text-[10px] text-financial-positive">
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
                <div className="pt-4 border-t border-white/[0.06] space-y-2">
                  <div className="flex justify-between font-mono text-[10px] text-foreground-dim uppercase">
                    <span>Flow Progression</span>
                    <span>{Math.round(((activeStep + 1) / storySteps.length) * 100)}%</span>
                  </div>
                  <div className="w-full h-1 bg-obsidian-700 overflow-hidden">
                    <div
                      className="h-full bg-financial-accent transition-all duration-500 ease-out"
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
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/[0.06] pt-6 font-mono text-[11px] text-foreground-dim">
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
                <span className={clsx("w-1.5 h-1.5 rounded-full", activeStep === idx ? "bg-financial-accent" : "bg-obsidian-600")} />
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
