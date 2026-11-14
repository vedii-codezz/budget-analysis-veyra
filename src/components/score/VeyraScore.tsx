"use client";

import { FinanceDefinitions } from "@/components/ui/FinanceDefinitions";
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useFinanceStore } from "@/store/finance";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import {
  CheckCircle2,
  AlertTriangle,
  Shield,
} from "lucide-react";
import { formatSignedNumber } from "@/lib/utils/currency";
import { clsx } from "clsx";

export const VeyraScore: React.FC = () => {
  const { health, cashRetained } = useFinanceStore((s) => s.metrics);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [selectedSignal, setSelectedSignal] = useState<string | null>(null);

  const statusColor = cashRetained < 0 ? "text-danger" : health.tier === "ATTENTION" ? "text-warn" : "text-foreground-muted";
  const signalGroups = [
    { label: "Positive Signals", icon: CheckCircle2, signals: health.signals.filter((signal) => signal.points >= 0) },
    { label: "Pressure Points", icon: AlertTriangle, signals: health.signals.filter((signal) => signal.points < 0) },
  ];

  return (
    <section
      id="score"
      ref={containerRef}
      className="relative w-full py-24 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 overflow-hidden bg-background border-t border-line"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <SectionLabel index="04" title="Core Intelligence" tag="Health Index" />
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight tracking-tightest mt-3 text-foreground">
              VEYRA SCORE.
            </h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs text-foreground-dim">
            <Shield className="w-4 h-4 text-foreground-muted" />
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
              className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-line flex flex-col items-center justify-center p-6 text-center bg-surface backdrop-blur-xl shadow-2xl shadow-background/70"
            >
              <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="49" pathLength="100" fill="none" stroke="var(--surface)" strokeWidth="1" />
                <circle cx="50" cy="50" r="49" pathLength="100" fill="none" stroke="var(--text-secondary)"
                  strokeWidth="1" strokeDasharray={health.score + " 100"} />
              </svg>
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

              <div className={clsx("inline-flex items-center gap-1.5 px-3 py-0.5 mt-1 bg-background border border-line font-mono text-[10px] uppercase tracking-widest", statusColor)}>
                {cashRetained < 0 || health.tier === "ATTENTION" ? <AlertTriangle aria-hidden="true" className="h-3 w-3" /> : <span className="w-1.5 h-1.5 rounded-full bg-foreground-muted" />}
                {health.tier}
              </div>
            </motion.div>

            {/* Supporting Dimensions Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md mt-8">
              {health.signals.map((pm) => (
                <div
                  key={pm.id}
                  className="bg-surface border border-line p-3.5 space-y-1"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-foreground-muted">
                    <span>{pm.title}</span>
                    <span className="text-foreground font-medium tabular-nums">
                      {pm.earned}/{pm.weight}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-foreground-muted">
                    {pm.desc}
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

            <p className="font-mono text-xs text-foreground-muted">
              Baseline {health.base} <FinanceDefinitions />
            </p>
            {signalGroups.filter(({ signals }) => signals.length > 0).map(({ label, icon: Icon, signals }) => (
            <div key={label} className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-foreground-muted uppercase tracking-wider">
                <Icon aria-hidden="true" className="w-3.5 h-3.5" />
                <span>{label}</span>
              </div>
              <div className="space-y-2">
                {signals.map((sig) => (
                  <div
                    key={sig.id}
                    onClick={() => setSelectedSignal(sig.id === selectedSignal ? null : sig.id)}
                    className={clsx(
                      "p-3.5 bg-surface border transition-colors cursor-pointer select-none",
                      selectedSignal === sig.id
                        ? "border-line bg-background"
                        : "border-line hover:border-line"
                    )}
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-foreground font-medium">{sig.title}</span>
                      <span className="text-foreground-muted">{formatSignedNumber(sig.points, Number.isInteger(sig.points) ? 0 : 1, " PTS")}</span>
                    </div>
                    <p className="text-xs text-foreground-muted font-light mt-1 leading-relaxed">
                      {sig.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            ))}
            <p className="font-mono text-xs text-foreground-muted">
              {health.base} {health.signals.map(({ points }) => formatSignedNumber(points, Number.isInteger(points) ? 0 : 1)).join(" ")} = {health.score}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
