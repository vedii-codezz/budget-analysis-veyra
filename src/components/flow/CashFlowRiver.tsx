"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFinanceStore } from "@/store/finance";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { formatCurrency, formatPercentage } from "@/lib/utils/currency";
import { ShieldCheck } from "lucide-react";
import { clsx } from "clsx";

export const CashFlowRiver: React.FC = () => {
  const [activeBranch, setActiveBranch] = useState<string | null>(null);

  const income = useFinanceStore((s) => s.income);

  const branches = [
    {
      id: "essentials",
      title: "Essentials & Housing",
      amount: 27000,
      color: "#6366f1",
      pct: (27000 / income) * 100,
      description: "Apartment lease, utilities, transit baseline & broadband.",
      items: ["Rent ₹22,000", "Utilities ₹2,500", "Transport ₹2,500"],
    },
    {
      id: "lifestyle",
      title: "Lifestyle & Discretionary",
      amount: 19040,
      color: "#f59e0b",
      pct: (19040 / income) * 100,
      description: "Dining, apparel, weekend cinema, coffee & SaaS.",
      items: ["Dining ₹8,940", "Shopping ₹6,720", "Entertainment ₹3,380"],
    },
    {
      id: "investments",
      title: "Wealth & Automated SIPs",
      amount: 25000,
      color: "#eab308",
      pct: (25000 / income) * 100,
      description: "Direct index fund and global technology asset allocation.",
      items: ["Nifty 50 ₹15,000", "Global Tech ₹10,000"],
    },
    {
      id: "surplus",
      title: "Liquid Buffer & Surplus",
      amount: 23960,
      color: "#10b981",
      pct: (23960 / income) * 100,
      description: "Unallocated liquid reserve building safety runway.",
      items: ["Emergency Buffer ₹18,960", "Short-term Float ₹5,000"],
    },
  ];

  return (
    <section
      id="flow"
      className="relative w-full py-24 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 overflow-hidden bg-obsidian-950 border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
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
          <div className="lg:col-span-4 bg-obsidian-900/40 border border-white/[0.08] p-8 space-y-6">
            <span className="font-mono text-xs uppercase tracking-mega text-foreground-muted block">
              PRIMARY CAPITAL ORIGIN
            </span>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-light text-foreground tracking-tight tabular-nums">
                {formatCurrency(income)}
              </div>
              <p className="text-xs text-foreground-dim font-mono">
                Gross monthly inflow credited
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] space-y-2 font-mono text-xs">
              <div className="flex justify-between text-foreground-muted">
                <span>Preservation efficiency</span>
                <span className="text-financial-positive font-medium">51.5% Wealth + Surplus</span>
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
                    "p-5 bg-obsidian-900/30 border transition-colors cursor-pointer select-none relative overflow-hidden",
                    isSelected
                      ? "border-white/30 bg-obsidian-900/70"
                      : "border-white/[0.06] hover:border-white/[0.12]"
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
                          className="text-[10px] px-2 py-0.5 rounded-none"
                          style={{
                            backgroundColor: `${branch.color}15`,
                            color: branch.color,
                          }}
                        >
                          {formatPercentage(branch.pct)}
                        </span>
                      </div>
                      <p className="text-xs text-foreground-muted font-light">
                        {branch.description}
                      </p>
                    </div>

                    <div className="text-right flex sm:flex-col items-center sm:items-end justify-between">
                      <span className="text-xl sm:text-2xl font-light text-foreground tabular-nums">
                        {formatCurrency(branch.amount)}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Breakdown */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs"
                    >
                      {branch.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-obsidian-950 p-2 border border-white/[0.04] text-foreground-muted"
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
