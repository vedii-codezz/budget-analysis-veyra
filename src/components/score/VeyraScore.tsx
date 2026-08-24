"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useFinanceStore } from "@/store/finance";
import { usePreferencesStore } from "@/store/preferences";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import {
  CheckCircle2,
  AlertTriangle,
  Shield,
} from "lucide-react";
import { clsx } from "clsx";

export const VeyraScore: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [selectedSignal, setSelectedSignal] = useState<string | null>(null);

  const getFinancialHealth = useFinanceStore((s) => s.getFinancialHealth);
  const getSavingsRate = useFinanceStore((s) => s.getSavingsRate);
  const health = getFinancialHealth();
  const savingsRate = getSavingsRate();
  const reducedMotion = usePreferencesStore((s) => s.reducedMotion);

  const peripheralMetrics = [
    {
      id: "savings",
      label: "Savings Health",
      value: `${health.metrics.savingsHealth}%`,
      sub: `${savingsRate.toFixed(1)}% retention rate`,
    },
    {
      id: "budget",
      label: "Budget Discipline",
      value: `${health.metrics.budgetDiscipline}%`,
      sub: "Caps maintained",
    },
    {
      id: "stability",
      label: "Expense Stability",
      value: `${health.metrics.expenseStability}%`,
      sub: "Controlled variance",
    },
    {
      id: "goals",
      label: "Goal Progress",
      value: `${health.metrics.goalProgress}%`,
      sub: "Active reserves on track",
    },
  ];

  const positiveSignals = [
    {
      id: "sig-1",
      title: "Elevated Savings Retention",
      desc: `Your capital retention efficiency stands at ${savingsRate.toFixed(1)}%, outperforming target benchmark.`,
      impact: "+14 PTS",
    },
    {
      id: "sig-2",
      title: "Strong Budget Guardrails",
      desc: "Housing, Investments, and SaaS commitments remain strictly within allocated caps.",
      impact: "+9 PTS",
    },
    {
      id: "sig-3",
      title: "Predictable Fixed Commitments",
      desc: "Fixed expenses are settled early in the monthly cycle, reducing month-end burn pressure.",
      impact: "+6 PTS",
    },
  ];

  const pressurePoints = [
    {
      id: "pres-1",
      title: "Discretionary Dining Acceleration",
      desc: "Food & Dining spending is pacing +12.4% faster than the previous 30-day baseline.",
      impact: "-5 PTS",
    },
    {
      id: "pres-2",
      title: "Weekend Outflow Concentration",
      desc: "Saturdays account for 34% of aggregate monthly discretionary capital outflows.",
      impact: "-4 PTS",
    },
  ];

  return (
    <section
      id="score"
      ref={containerRef}
      className="relative w-full py-24 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 overflow-hidden bg-obsidian-950 border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <SectionLabel index="04" title="Core Intelligence" tag="Health Index" />
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight tracking-tightest mt-3 text-foreground">
              VEYRA SCORE.
            </h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs text-foreground-dim">
            <Shield className="w-4 h-4 text-financial-positive" />
            <span>Composite Financial Health Index</span>
          </div>
        </div>

        {/* Main Concentric Core & Metric Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Concentric Intelligence Core */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Clean Core Capsule */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-white/[0.08] flex flex-col items-center justify-center p-6 text-center bg-obsidian-900/60 backdrop-blur-xl shadow-2xl"
            >
              <span className="font-mono text-[10px] tracking-mega uppercase text-foreground-muted mb-1">
                VEYRA SCORE
              </span>

              <div className="text-6xl sm:text-7xl font-extralight text-foreground tracking-tightest tabular-nums my-1">
                {isInView ? (
                  <AnimatedCounter
                    value={health.score}
                    isCurrency={false}
                    duration={1.4}
                  />
                ) : (
                  "0"
                )}
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 mt-1 bg-white/[0.04] border border-white/[0.1] font-mono text-[10px] text-financial-positive uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-financial-positive" />
                {health.tier}
              </div>
            </motion.div>

            {/* Supporting Dimensions Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md mt-8">
              {peripheralMetrics.map((pm) => (
                <div
                  key={pm.id}
                  className="bg-obsidian-900/30 border border-white/[0.06] p-3.5 space-y-1"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-foreground-muted">
                    <span>{pm.label}</span>
                    <span className="text-foreground font-medium tabular-nums">
                      {pm.value}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-foreground-dim truncate">
                    {pm.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Explain the Score: Signals & Pressure Points */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-foreground-muted block mb-2">
                Behavioral Attribution
              </span>
              <h3 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
                Why your score is {health.score}.
              </h3>
              <p className="text-foreground-muted text-sm mt-2 font-light leading-relaxed">
                {health.summary}
              </p>
            </div>

            {/* Positive Signals Group */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-financial-positive uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Positive Signals</span>
              </div>
              <div className="space-y-2">
                {positiveSignals.map((sig) => (
                  <div
                    key={sig.id}
                    onClick={() => setSelectedSignal(sig.id === selectedSignal ? null : sig.id)}
                    className={clsx(
                      "p-3.5 bg-obsidian-900/30 border transition-colors cursor-pointer select-none",
                      selectedSignal === sig.id
                        ? "border-financial-positive/40 bg-financial-positive/[0.02]"
                        : "border-white/[0.06] hover:border-white/[0.12]"
                    )}
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-foreground font-medium">{sig.title}</span>
                      <span className="text-financial-positive">{sig.impact}</span>
                    </div>
                    <p className="text-xs text-foreground-muted font-light mt-1 leading-relaxed">
                      {sig.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pressure Points Group */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 font-mono text-xs text-financial-warning uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Pressure Points</span>
              </div>
              <div className="space-y-2">
                {pressurePoints.map((pres) => (
                  <div
                    key={pres.id}
                    onClick={() => setSelectedSignal(pres.id === selectedSignal ? null : pres.id)}
                    className={clsx(
                      "p-3.5 bg-obsidian-900/30 border transition-colors cursor-pointer select-none",
                      selectedSignal === pres.id
                        ? "border-financial-warning/40 bg-financial-warning/[0.02]"
                        : "border-white/[0.06] hover:border-white/[0.12]"
                    )}
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-foreground font-medium">{pres.title}</span>
                      <span className="text-financial-warning">{pres.impact}</span>
                    </div>
                    <p className="text-xs text-foreground-muted font-light mt-1 leading-relaxed">
                      {pres.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
