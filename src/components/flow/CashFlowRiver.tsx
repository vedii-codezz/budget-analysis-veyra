"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFinanceStore } from "@/store/finance";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { formatCurrency, formatPercentage } from "@/lib/utils/currency";
import { ShieldCheck } from "lucide-react";
import { clsx } from "clsx";

export const CashFlowRiver: React.FC = () => {
  const { income, river, essentials, lifestyle, investments, savedAndInvestedRate } = useFinanceStore((s) => s.metrics);
  const [activeBranch, setActiveBranch] = useState<string | null>(null);


  const branches = [
    {
      id: "essentials",
      title: "Essentials & Housing",
      amount: river.essentials,
      color: "var(--line)",
      pct: (river.essentials / income) * 100,
      description: "Apartment lease, utilities, transit baseline & broadband.",
      items: essentials.map((entry) => `${entry.title} ${formatCurrency(entry.amount)}`),
    },
    {
      id: "lifestyle",
      title: "Lifestyle & Discretionary",
      amount: river.lifestyle,
      color: "var(--text-muted)",
      pct: (river.lifestyle / income) * 100,
      description: "Dining, apparel, weekend cinema, coffee & SaaS.",
      items: lifestyle.map((entry) => `${entry.title} ${formatCurrency(entry.amount)}`),
    },
    {
      id: "investments",
      title: "Wealth & Automated SIPs",
      amount: river.invested,
      color: "var(--text-secondary)",
      pct: (river.invested / income) * 100,
      description: "Direct index fund and global technology asset allocation.",
      items: investments.map((entry) => `${entry.title} ${formatCurrency(entry.amount)}`),
    },
    {
      id: "surplus",
      title: "Liquid Buffer · Cash retained",
      amount: river.cashRetained,
      color: river.cashRetained < 0 ? "var(--danger)" : "var(--text)",
      pct: (river.cashRetained / income) * 100,
      description: river.cashRetained < 0 ? "Over budget" : "Remaining monthly cash.",
      items: [],
    },
  ];

  return (
    <section
      id="flow"
      className="relative w-full py-24 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 overflow-hidden bg-background border-t border-line"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <SectionLabel index="05" title="Capital Flow" tag="Cash-Flow River" />
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight tracking-tightest mt-3 text-foreground">
              CASH-FLOW RIVER.
            </h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs text-foreground-dim">
            <span>Capital routing across 4 destinations</span>
          </div>
        </div>

        {/* River Branching Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Inflow Origin Anchor */}
          <div className="lg:col-span-4 bg-surface border border-line p-8 space-y-6">
            <span className="font-mono text-xs uppercase tracking-mega text-foreground-muted block">
              PRIMARY CAPITAL ORIGIN
            </span>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-light text-foreground tracking-tight tabular-nums">
                {formatCurrency(income)}
              </div>
              <p className="text-xs text-foreground-muted font-mono">
                Gross monthly inflow credited
              </p>
            </div>

            <div className="pt-4 border-t border-line space-y-2 font-mono text-xs">
              <div className="flex justify-between text-foreground-muted">
                <span>Preservation efficiency</span>
                <span className="text-foreground-muted font-medium">{formatPercentage(savedAndInvestedRate)} Saved + invested</span>
              </div>
            </div>
          </div>

          {/* Right Destination Stream Channels */}
          <div className="lg:col-span-8 space-y-3.5">
            {branches.map((branch) => {
              const isSelected = activeBranch === branch.id;
              return (
                <div
                  key={branch.id}
                  onClick={() => setActiveBranch(isSelected ? null : branch.id)}
                  className={clsx(
                    "p-5 bg-surface border transition-colors cursor-pointer select-none relative overflow-hidden",
                    isSelected
                      ? "border-line bg-surface"
                      : "border-line hover:border-line"
                  )}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: branch.color }}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="text-foreground font-medium">{branch.title}</span>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-none bg-background text-foreground-muted"
                        >
                          {formatPercentage(branch.pct)}
                        </span>
                      </div>
                      <p className="text-xs text-foreground-muted font-light">
                        {branch.description}
                      </p>
                    </div>

                    <div className="text-right flex sm:flex-col items-center sm:items-end justify-between">
                      <span className={clsx("text-xl sm:text-2xl font-light tabular-nums", branch.amount < 0 ? "bg-background text-danger" : "text-foreground")}>
                        {formatCurrency(branch.amount)}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Breakdown */}
                  {isSelected && branch.items.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs"
                    >
                      {branch.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-background p-2 border border-line text-foreground-muted"
                        >
                          {item}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
