"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFinanceStore } from "@/store/finance";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { formatCurrency, formatPercentage } from "@/lib/utils/currency";
import { Layers, ShieldCheck, TrendingUp, Wallet, ArrowRight } from "lucide-react";
import { clsx } from "clsx";

export const CashFlowRiver: React.FC = () => {
  const [activeBranch, setActiveBranch] = useState<string | null>(null);

  const income = useFinanceStore((s) => s.income);
  const getMonthlySpend = useFinanceStore((s) => s.getMonthlySpend);
  const totalSpend = getMonthlySpend();

  const branches = [
    {
      id: "essentials",
      title: "ESSENTIALS // FIXED",
      amount: 27000,
      color: "#6366f1",
      pct: (27000 / income) * 100,
      description: "Apartment lease, utilities, transit baseline & broadband.",
      items: ["Rent ₹22,000", "Utilities ₹2,500", "Transport ₹2,500"],
    },
    {
      id: "lifestyle",
      title: "LIFESTYLE // DISCRETIONARY",
      amount: 19040,
      color: "#f59e0b",
      pct: (19040 / income) * 100,
      description: "Dining, apparel, weekend cinema, coffee & SaaS.",
      items: ["Dining ₹8,940", "Shopping ₹6,720", "Entertainment ₹3,380"],
    },
    {
      id: "investments",
      title: "WEALTH // AUTOMATED SIPS",
      amount: 25000,
      color: "#eab308",
      pct: (25000 / income) * 100,
      description: "Direct index fund and global technology asset allocation.",
      items: ["Nifty 50 ₹15,000", "Global Tech ₹10,000"],
    },
    {
      id: "surplus",
      title: "LIQUID BUFFER // SURPLUS",
      amount: 23960,
      color: "#10b981",
      pct: (23960 / income) * 100,
      description: "Unallocated liquid reserve building 6-month safety runway.",
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
            <SectionLabel index="05" title="Capital Dynamics" tag="VEYRA FLOW RIVER" />
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight tracking-tightest mt-3 text-foreground">
              CASH-FLOW RIVER.
            </h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs text-foreground-dim">
            <span className="w-1.5 h-1.5 rounded-full bg-financial-positive animate-pulse" />
            <span>DYNAMIC CAPITAL ROUTING // 100% BALANCED</span>
          </div>
        </div>

        {/* River Branching Diagram Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Inflow Origin Anchor */}
          <div className="lg:col-span-4 bg-obsidian-900/60 border border-white/[0.09] p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-financial-positive flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED INFLOW
            </div>

            <span className="font-mono text-xs uppercase tracking-mega text-foreground-muted block">
              PRIMARY CAPITAL ORIGIN
            </span>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-light text-foreground tracking-tight tabular-nums">
                {formatCurrency(income)}
              </div>
              <p className="text-xs text-foreground-dim font-mono">
                Gross Monthly Cashflow Credited
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] space-y-2 font-mono text-xs">
              <div className="flex justify-between text-foreground-muted">
                <span>Active Channels</span>
                <span className="text-foreground">4 Destined Streams</span>
              </div>
              <div className="flex justify-between text-foreground-muted">
                <span>Preservation Efficiency</span>
                <span className="text-financial-positive">51.5% Wealth + Surplus</span>
              </div>
            </div>
          </div>

          {/* Right Fluid Branch Stream Cards */}
          <div className="lg:col-span-8 space-y-4">
            {branches.map((branch) => {
              const isSelected = activeBranch === branch.id;
              return (
                <div
                  key={branch.id}
                  onClick={() => setActiveBranch(isSelected ? null : branch.id)}
                  className={clsx(
                    "p-6 bg-obsidian-900/40 border transition-all duration-300 cursor-pointer select-none relative overflow-hidden group",
                    isSelected
                      ? "border-white/30 bg-obsidian-900/80 shadow-2xl"
                      : "border-white/[0.06] hover:border-white/[0.14]"
                  )}
                >
                  {/* Visual River Stream Bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-500"
                    style={{ backgroundColor: branch.color }}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="text-foreground font-semibold">{branch.title}</span>
                        <span
                          className="text-[10px] px-2 py-0.5"
                          style={{
                            backgroundColor: `${branch.color}20`,
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
                      <span className="text-2xl font-light text-foreground tabular-nums">
                        {formatCurrency(branch.amount)}
                      </span>
                      <span className="text-[10px] font-mono text-foreground-dim uppercase">
                        {isSelected ? "Click to collapse" : "Click to inspect"}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Breakdown */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs"
                    >
                      {branch.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-obsidian-950 p-2.5 border border-white/[0.04] text-foreground-muted"
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
