"use client";

import React, { useState, useEffect, useRef } from "react";
import { registerGSAP } from "@/lib/animation/gsap";
import { usePreferencesStore } from "@/store/preferences";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { clsx } from "clsx";

interface InsightItem {
  id: string;
  tag: string;
  headline: string;
  caption: string;
  evidenceType: "weekend" | "micro" | "forecast" | "recurring";
}

const INSIGHTS: InsightItem[] = [
  {
    id: "ins-1",
    tag: "Spending Pattern // 04",
    headline: "YOUR WEEKENDS COST 31% MORE.",
    caption:
      "Saturday & Sunday discretionary outflows averaged ₹2,420 compared to ₹1,080 on regular weekdays.",
    evidenceType: "weekend",
  },
  {
    id: "ins-2",
    tag: "Micro-Outflows // 05",
    headline: "₹3,840 DISAPPEARED IN PURCHASES UNDER ₹300.",
    caption:
      "14 instant-delivery and specialty coffee runs accumulated into 6.5% of your total monthly expenditure.",
    evidenceType: "micro",
  },
  {
    id: "ins-3",
    tag: "Budget Pacing // 02",
    headline: "AT THIS RATE, FOOD WILL CROSS ITS BUDGET BY AUG 27.",
    caption:
      "Current dining velocity of ₹372/day projects an overburn of ₹1,480 beyond the ₹12,000 allocation cap.",
    evidenceType: "forecast",
  },
  {
    id: "ins-4",
    tag: "Recurring Capital // 01",
    headline: "3 SAAS COMMITMENTS DEPLOY ₹2,490 EVERY MONTH.",
    caption:
      "Cloud developer tools, Apple One, and streaming services maintain automated recurring deductions.",
    evidenceType: "recurring",
  },
];

export const VeyraInsights: React.FC = () => {
  const [activeInsightIndex, setActiveInsightIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePreferencesStore((s) => s.reducedMotion);

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
        end: "+=260%",
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          const idx = Math.min(
            INSIGHTS.length - 1,
            Math.floor(progress * INSIGHTS.length)
          );
          setActiveInsightIndex(idx);
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  const current = INSIGHTS[activeInsightIndex];

  return (
    <div
      ref={containerRef}
      id="insights"
      className="relative w-full bg-obsidian-950 border-t border-white/[0.06]"
    >
      <div
        ref={triggerRef}
        className="min-h-screen w-full flex flex-col justify-between py-24 px-6 sm:px-8 md:px-12 lg:px-16"
      >
        {/* Section Top Header */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/[0.08] pb-6">
          <SectionLabel
            index="06"
            title="Behavioral Intelligence"
            tag="Veyra Insights"
          />
          <div className="flex items-center gap-2 font-mono text-xs text-foreground-dim">
            <span className="text-foreground font-semibold">0{activeInsightIndex + 1}</span>
            <span>/</span>
            <span>0{INSIGHTS.length}</span>
          </div>
        </div>

        {/* Pinned Editorial Narrative Screen */}
        <div className="max-w-7xl mx-auto w-full my-auto py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Dominant Statement */}
            <div className="lg:col-span-8 space-y-6">
              <span className="font-mono text-xs tracking-mega uppercase text-financial-accent block">
                {current.tag}
              </span>

              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tightest uppercase text-foreground leading-[0.92] transition-all duration-500">
                {current.headline}
              </h2>

              <p className="text-foreground-muted text-base md:text-xl font-light max-w-2xl leading-relaxed transition-opacity duration-300">
                {current.caption}
              </p>
            </div>

            {/* Right Understated Contextual Evidence */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="bg-obsidian-900/50 backdrop-blur-xl border border-white/[0.08] p-6 sm:p-8 space-y-6">
                <span className="font-mono text-xs text-foreground-dim uppercase tracking-wider block border-b border-white/[0.06] pb-3">
                  Evidence Proof
                </span>

                {current.evidenceType === "weekend" && (
                  <div className="space-y-4 font-mono text-xs">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-foreground-muted">
                        <span>Weekend Average</span>
                        <span className="text-financial-warning font-semibold">₹2,420</span>
                      </div>
                      <div className="w-full h-1.5 bg-obsidian-800">
                        <div className="w-[85%] h-full bg-financial-warning" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-foreground-muted">
                        <span>Weekday Average</span>
                        <span className="text-foreground">₹1,080</span>
                      </div>
                      <div className="w-full h-1.5 bg-obsidian-800">
                        <div className="w-[42%] h-full bg-financial-positive" />
                      </div>
                    </div>
                  </div>
                )}

                {current.evidenceType === "micro" && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground-muted">14 Micro Purchases</span>
                      <span className="text-foreground font-semibold">₹3,840 Total</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1 py-1">
                      {Array.from({ length: 14 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-5 bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[8px] text-foreground-dim"
                        >
                          ₹
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {current.evidenceType === "forecast" && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-foreground-muted">Current Burn</span>
                      <span className="text-financial-danger font-semibold">₹372 / day</span>
                    </div>
                    <div className="w-full h-1.5 bg-obsidian-800 overflow-hidden">
                      <div className="w-[92%] h-full bg-financial-danger" />
                    </div>
                    <div className="text-[10px] text-financial-danger pt-1">
                      Pacing +₹1,480 beyond monthly cap
                    </div>
                  </div>
                )}

                {current.evidenceType === "recurring" && (
                  <div className="space-y-2.5 font-mono text-xs">
                    <div className="flex justify-between text-foreground-muted">
                      <span>Anthropic Claude Pro</span>
                      <span className="text-foreground">₹1,750</span>
                    </div>
                    <div className="flex justify-between text-foreground-muted">
                      <span>Apple One & iCloud</span>
                      <span className="text-foreground">₹365</span>
                    </div>
                    <div className="flex justify-between text-foreground-muted">
                      <span>Spotify & YouTube</span>
                      <span className="text-foreground">₹375</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section Bottom Stepper */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/[0.06] pt-6 font-mono text-[11px] text-foreground-dim">
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto">
            {INSIGHTS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveInsightIndex(idx)}
                className={clsx(
                  "flex items-center gap-2 whitespace-nowrap transition-colors",
                  activeInsightIndex === idx
                    ? "text-foreground font-semibold"
                    : "text-foreground-dim hover:text-foreground-muted"
                )}
              >
                <span
                  className={clsx(
                    "w-1.5 h-1.5 rounded-full",
                    activeInsightIndex === idx ? "bg-financial-accent" : "bg-obsidian-700"
                  )}
                />
                <span>0{idx + 1}</span>
              </button>
            ))}
          </div>
          <span className="hidden sm:inline text-[10px]">Scroll to progress</span>
        </div>
      </div>
    </div>
  );
};
