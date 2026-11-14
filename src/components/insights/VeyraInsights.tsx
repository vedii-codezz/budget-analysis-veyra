"use client";

import { CalculationInfo, metricDefinitions } from "@/components/ui/FinanceDefinitions";
import React, { useState, useEffect, useRef } from "react";
import { registerGSAP } from "@/lib/animation/gsap";
import { usePreferencesStore } from "@/store/preferences";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { clsx } from "clsx";

import { useFinanceStore } from "@/store/finance";
import { microThreshold } from "@/lib/finance";
import { formatCurrency, formatPercentage } from "@/lib/utils/currency";

const insightCount = 4;

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
            insightCount - 1,
            Math.floor(progress * insightCount)
          );
          setActiveInsightIndex(idx);
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  const metrics = useFinanceStore((state) => state.metrics);
  const { weekendPremiumPct, weekendDescription, weekendAvg, weekdayAvg, microPurchases,
    foodDaily, foodForecast, foodCap, foodPacingPct, recurring, recurringTotal } = metrics;
  const insights = [
    {
      tag: "Spending Pattern",
      headline: weekendPremiumPct === null ? "WEEKEND OUTFLOWS."
        : weekendPremiumPct === 0 ? "WEEKEND AND WEEKDAY SPEND MATCH."
        : `YOUR WEEKENDS COST ${formatPercentage(Math.abs(weekendPremiumPct), 0)} ${weekendPremiumPct > 0 ? "MORE" : "LESS"}.`,
      caption: weekendDescription(formatCurrency),
      evidence: [["Weekend Average", formatCurrency(weekendAvg)], ["Weekday Average", formatCurrency(weekdayAvg)]],
    },
    {
      tag: "Micro-Outflows",
      headline: `${formatCurrency(microPurchases.total)} IN PURCHASES UNDER ${formatCurrency(microThreshold)}.`,
      caption: `${microPurchases.count} purchases account for ${formatPercentage(microPurchases.share)} of monthly consumption.`,
      evidence: [[`${microPurchases.count} Micro Purchases`, formatCurrency(microPurchases.total)]],
    },
    {
      tag: "Budget Pacing",
      headline: foodForecast > foodCap ? "FOOD IS PACING ABOVE ITS CAP." : "FOOD IS PACING WITHIN ITS CAP.",
      caption: `At ${formatCurrency(foodDaily)} per day, dining is projected to reach ${formatPercentage(foodPacingPct)} of its cap.`,
      evidence: [["Daily Pace", formatCurrency(foodDaily)], ["Projected Spend", formatCurrency(foodForecast)], ["Monthly Cap", formatCurrency(foodCap)]],
    },
    {
      tag: "Recurring Capital",
      headline: `${recurring.length} SUBSCRIPTION COMMITMENTS TOTAL ${formatCurrency(recurringTotal)}.`,
      caption: "Recurring subscription outflows recorded this month.",
      evidence: recurring.map((entry) => [entry.merchant, formatCurrency(entry.amount)]),
    },
  ];
  const current = insights[activeInsightIndex];
  const maxAverage = Math.max(weekendAvg, weekdayAvg, 1);
  const barWidths = activeInsightIndex === 0 ? [weekendAvg, weekdayAvg] : [];

  return (
    <div
      ref={containerRef}
      id="insights"
      className="relative w-full bg-background border-t border-line"
    >
      <div
        ref={triggerRef}
        className="min-h-screen w-full flex flex-col justify-between py-24 px-6 sm:px-8 md:px-12 lg:px-16"
      >
        {/* Section Top Header */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-line pb-6">
          <SectionLabel
            index="06"
            title="Behavioral Intelligence"
            tag="Veyra Insights"
          />
          <div className="flex items-center gap-2 font-mono text-xs text-foreground-dim">
            <span className="text-foreground font-semibold">0{activeInsightIndex + 1}</span>
            <span>/</span>
            <span>0{insightCount}</span>
          </div>
        </div>

        {/* Pinned Editorial Narrative Screen */}
        <div className="max-w-7xl mx-auto w-full my-auto py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Dominant Statement */}
            <div className="lg:col-span-8 space-y-6">
              <span className="font-mono text-xs tracking-mega uppercase text-foreground-dim block">
                {`${current.tag} // 0${activeInsightIndex + 1}`}
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
              <div className="bg-surface backdrop-blur-xl border border-line p-6 sm:p-8 space-y-6">
                <span className="font-mono text-xs text-foreground-muted uppercase tracking-wider block border-b border-line pb-3">
                  Evidence Proof
                  {activeInsightIndex === 0 && <CalculationInfo label="Weekend premium">{metricDefinitions.weekend}</CalculationInfo>}
                  {activeInsightIndex === 1 && <CalculationInfo label="Micro-purchases">{metricDefinitions.micro}</CalculationInfo>}
                </span>

                <div className="space-y-3 font-mono text-xs">
                  {current.evidence.map(([label, value], index) => (
                    <div key={label} className="space-y-1.5">
                      <div className="flex justify-between gap-3 text-foreground-muted">
                        <span>{label}</span>
                        <span className="text-foreground">{value}</span>
                      </div>
                      {barWidths[index] !== undefined && (
                        <div aria-hidden="true" className="h-1.5 bg-background">
                          <div className={index === 0 ? "h-full bg-foreground" : "h-full bg-foreground-dim"}
                            style={{ width: (barWidths[index] / maxAverage) * 100 + "%" }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Bottom Stepper */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-t border-line pt-6 font-mono text-xs text-foreground-dim">
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto">
            {insights.map((item, idx) => (
              <button
                key={item.tag}
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
                    activeInsightIndex === idx ? "bg-foreground-muted" : "bg-surface"
                  )}
                />
                <span>0{idx + 1}</span>
              </button>
            ))}
          </div>
          <span className="hidden sm:inline text-xs">Scroll to progress</span>
        </div>
      </div>
    </div>
  );
};
