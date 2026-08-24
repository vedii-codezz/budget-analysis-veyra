"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFinanceStore } from "@/store/finance";
import { usePreferencesStore } from "@/store/preferences";
import { useUIStore } from "@/store/ui";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { formatCurrency, formatPercentage } from "@/lib/utils/currency";
import { TransactionCategory } from "@/types/finance";
import {
  ArrowLeft,
  TrendingDown,
  TrendingUp,
  ShoppingBag,
  Clock,
  Building2,
} from "lucide-react";
import { clsx } from "clsx";

interface UniverseNode {
  category: TransactionCategory;
  amount: number;
  allocated: number;
  color: string;
  x: number; // percentage in space
  y: number; // percentage in space
  depth: number;
  trendVsLastMonth: number;
  txCount: number;
  largestTx: { title: string; amount: number; date: string };
  frequentMerchant: string;
  peakDay: string;
}

export const SpendingUniverse: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<TransactionCategory | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<TransactionCategory | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const transactions = useFinanceStore((s) => s.transactions);
  const budgets = useFinanceStore((s) => s.budgets);
  const getMonthlySpend = useFinanceStore((s) => s.getMonthlySpend);
  const getCategorySpend = useFinanceStore((s) => s.getCategorySpend);
  const reducedMotion = usePreferencesStore((s) => s.reducedMotion);
  const setCursorContext = useUIStore((s) => s.setCursorContext);
  const resetCursorContext = useUIStore((s) => s.resetCursorContext);

  const totalMonthlySpend = getMonthlySpend();
  const categorySpend = getCategorySpend();

  // Spatial node coordinates (balanced editorial constellation)
  const nodeLayout: Record<TransactionCategory, { x: number; y: number; depth: number }> = {
    "Housing & Utilities": { x: 30, y: 34, depth: 1.1 },
    "Investments & Savings": { x: 68, y: 32, depth: 1.05 },
    "Food & Dining": { x: 48, y: 54, depth: 1.15 },
    "Shopping & Lifestyle": { x: 26, y: 68, depth: 0.95 },
    "Transport & Fuel": { x: 74, y: 64, depth: 0.9 },
    "Entertainment & Leisure": { x: 56, y: 78, depth: 0.85 },
    "Subscriptions & SaaS": { x: 82, y: 44, depth: 0.8 },
    "Health & Wellness": { x: 18, y: 50, depth: 0.85 },
  };

  // Build universe nodes dynamically
  const nodes: UniverseNode[] = budgets.map((b) => {
    const amount = categorySpend[b.category] || 0;
    const catTxs = transactions.filter((t) => t.category === b.category);
    const sortedTxs = [...catTxs].sort((a, b) => b.amount - a.amount);
    const largestTx = sortedTxs[0] || {
      title: "None",
      amount: 0,
      date: "N/A",
    };

    const merchantCounts: Record<string, number> = {};
    catTxs.forEach((t) => {
      merchantCounts[t.merchant] = (merchantCounts[t.merchant] || 0) + 1;
    });
    const frequentMerchant =
      Object.entries(merchantCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Various";

    const layout = nodeLayout[b.category] || { x: 50, y: 50, depth: 1 };

    return {
      category: b.category,
      amount,
      allocated: b.allocated,
      color: b.color,
      x: layout.x,
      y: layout.y,
      depth: layout.depth,
      trendVsLastMonth:
        b.category === "Food & Dining"
          ? 12.4
          : b.category === "Shopping & Lifestyle"
          ? -8.2
          : b.category === "Entertainment & Leisure"
          ? 23.1
          : 4.5,
      txCount: catTxs.length,
      largestTx: {
        title: largestTx.title,
        amount: largestTx.amount,
        date: largestTx.date,
      },
      frequentMerchant,
      peakDay: b.category === "Food & Dining" ? "Saturdays" : "Fridays",
    };
  });

  const minSize = 92;
  const maxSize = 200;
  const maxSpend = Math.max(...nodes.map((n) => n.amount), 1);

  const getNodeSize = (amount: number) => {
    const ratio = Math.sqrt(amount / maxSpend);
    return Math.round(minSize + ratio * (maxSize - minSize));
  };

  // Subtle parallax depth
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !containerRef.current || selectedCategory) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const y = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    setMouseOffset({ x: x * 14, y: y * 14 });
  };

  const selectedNode = nodes.find((n) => n.category === selectedCategory);

  return (
    <section
      id="universe"
      className="relative w-full py-24 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 overflow-hidden select-none bg-obsidian-950 border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <SectionLabel index="03" title="Spatial Topology" tag="Spending Universe" />
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight tracking-tightest mt-3 text-foreground">
              SPENDING UNIVERSE.
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-foreground-dim">
            <span>Orbital scale reflects spending volume</span>
          </div>
        </div>

        {/* Spatial Constellation Canvas Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMouseOffset({ x: 0, y: 0 })}
          className="relative w-full h-[640px] md:h-[720px] bg-obsidian-900/20 border border-white/[0.06] rounded-none overflow-hidden"
        >
          {/* Subtle Background Orbital Ring Aesthetics */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
            <div className="w-[500px] h-[500px] rounded-full border border-white/[0.05]" />
            <div className="absolute w-[800px] h-[800px] rounded-full border border-white/[0.03] border-dashed" />
          </div>

          {/* Regular Constellation State */}
          <AnimatePresence>
            {!selectedCategory && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                {nodes.map((node) => {
                  const size = getNodeSize(node.amount);
                  const isHovered = hoveredCategory === node.category;
                  const pctOfTotal =
                    totalMonthlySpend > 0
                      ? (node.amount / totalMonthlySpend) * 100
                      : 0;

                  const parallaxX = mouseOffset.x * node.depth;
                  const parallaxY = mouseOffset.y * node.depth;

                  return (
                    <motion.div
                      key={node.category}
                      style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                      }}
                      animate={{
                        x: parallaxX,
                        y: parallaxY,
                        scale: isHovered ? 1.05 : 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 240,
                        damping: 26,
                      }}
                      onMouseEnter={() => {
                        setHoveredCategory(node.category);
                        setCursorContext({ variant: "explore", label: "EXPLORE" });
                      }}
                      onMouseLeave={() => {
                        setHoveredCategory(null);
                        resetCursorContext();
                      }}
                      onClick={() => {
                        setSelectedCategory(node.category);
                        resetCursorContext();
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
                    >
                      {/* Floating Sphere */}
                      <div
                        style={{
                          width: `${size}px`,
                          height: `${size}px`,
                        }}
                        className="relative rounded-full flex flex-col items-center justify-center p-3 text-center transition-all duration-500 bg-obsidian-900/90 backdrop-blur-md border border-white/10 group-hover:border-white/30 shadow-xl"
                      >
                        {/* Controlled Ambient Glow on Hover */}
                        <div
                          className={clsx(
                            "absolute inset-0 rounded-full blur-xl pointer-events-none transition-opacity duration-300",
                            isHovered ? "opacity-35" : "opacity-0"
                          )}
                          style={{ backgroundColor: node.color }}
                        />

                        {/* Clean Progressive Content */}
                        <span className="font-mono text-[10px] sm:text-[11px] tracking-wider uppercase text-foreground-muted group-hover:text-foreground transition-colors line-clamp-1">
                          {node.category.split(" & ")[0]}
                        </span>
                        <span className="text-sm sm:text-base md:text-lg font-light text-foreground tracking-tight tabular-nums mt-0.5">
                          {formatCurrency(node.amount, { compact: true })}
                        </span>
                      </div>

                      {/* Tooltip on Hover (Progressive Disclosure) */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.96 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 z-30 bg-obsidian-950 border border-white/15 px-3.5 py-2 shadow-2xl font-mono text-[11px] whitespace-nowrap space-y-1"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-foreground font-medium">{node.category}</span>
                              <span className="text-financial-positive font-semibold">
                                {formatCurrency(node.amount)}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-foreground-dim text-[10px]">
                              <span>{formatPercentage(pctOfTotal)} of total</span>
                              <span
                                className={clsx(
                                  "flex items-center gap-0.5",
                                  node.trendVsLastMonth > 0
                                    ? "text-financial-warning"
                                    : "text-financial-positive"
                                )}
                              >
                                {node.trendVsLastMonth > 0 ? (
                                  <TrendingUp className="w-2.5 h-2.5" />
                                ) : (
                                  <TrendingDown className="w-2.5 h-2.5" />
                                )}
                                {Math.abs(node.trendVsLastMonth)}% vs last month
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Deep-Dive Expanded Analysis Mode */}
          <AnimatePresence>
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 md:p-14 bg-obsidian-950/95 backdrop-blur-2xl"
              >
                {/* Deep Dive Header & Back Trigger */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="flex items-center gap-2 font-mono text-xs text-foreground-muted hover:text-foreground uppercase tracking-wider transition-colors group"
                  >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span>Return to Universe</span>
                  </button>
                  <div className="font-mono text-xs text-foreground-dim uppercase">
                    {selectedNode.category}
                  </div>
                </div>

                {/* Main Asymmetric Deep Dive Layout */}
                <div className="my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Primary Category Total */}
                  <div className="lg:col-span-4 flex flex-col items-center justify-center">
                    <div
                      style={{ borderColor: selectedNode.color }}
                      className="w-52 h-52 md:w-60 md:h-60 rounded-full border bg-obsidian-900/90 flex flex-col items-center justify-center p-6 text-center relative shadow-2xl"
                    >
                      <div
                        className="absolute inset-0 rounded-full blur-xl opacity-15 pointer-events-none"
                        style={{ backgroundColor: selectedNode.color }}
                      />
                      <span className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
                        Category Total
                      </span>
                      <span className="text-3xl md:text-4xl font-light text-foreground tracking-tight tabular-nums my-1">
                        {formatCurrency(selectedNode.amount)}
                      </span>
                      <span className="font-mono text-xs text-financial-positive">
                        {formatPercentage(
                          totalMonthlySpend > 0
                            ? (selectedNode.amount / totalMonthlySpend) * 100
                            : 0
                        )}{" "}
                        of spend
                      </span>
                    </div>
                  </div>

                  {/* Supporting Analytical Breakdown */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-white/[0.06] pb-6">
                      <div>
                        <span className="font-mono text-[10px] text-foreground-dim uppercase block">
                          Allocated Budget
                        </span>
                        <span className="font-mono text-base text-foreground font-medium tabular-nums">
                          {formatCurrency(selectedNode.allocated)}
                        </span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-foreground-dim uppercase block">
                          Budget Remaining
                        </span>
                        <span
                          className={clsx(
                            "font-mono text-base font-medium tabular-nums",
                            selectedNode.allocated - selectedNode.amount >= 0
                              ? "text-financial-positive"
                              : "text-financial-danger"
                          )}
                        >
                          {formatCurrency(
                            Math.max(0, selectedNode.allocated - selectedNode.amount)
                          )}
                        </span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-foreground-dim uppercase block">
                          Transactions
                        </span>
                        <span className="font-mono text-base text-foreground font-medium tabular-nums">
                          {selectedNode.txCount} events
                        </span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-foreground-dim uppercase block">
                          vs Last Month
                        </span>
                        <span
                          className={clsx(
                            "font-mono text-base font-medium tabular-nums",
                            selectedNode.trendVsLastMonth > 0
                              ? "text-financial-warning"
                              : "text-financial-positive"
                          )}
                        >
                          {selectedNode.trendVsLastMonth > 0 ? "+" : ""}
                          {selectedNode.trendVsLastMonth}%
                        </span>
                      </div>
                    </div>

                    {/* Contextual Data Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
                      <div className="bg-obsidian-900/40 p-4 border border-white/[0.06] space-y-1">
                        <span className="text-[10px] text-foreground-dim uppercase flex items-center gap-1.5">
                          <ShoppingBag className="w-3 h-3 text-foreground-muted" /> Largest Outflow
                        </span>
                        <div className="text-foreground font-medium truncate">
                          {selectedNode.largestTx.title}
                        </div>
                        <div className="text-financial-warning">
                          {formatCurrency(selectedNode.largestTx.amount)}
                        </div>
                      </div>

                      <div className="bg-obsidian-900/40 p-4 border border-white/[0.06] space-y-1">
                        <span className="text-[10px] text-foreground-dim uppercase flex items-center gap-1.5">
                          <Building2 className="w-3 h-3 text-foreground-muted" /> Frequent Merchant
                        </span>
                        <div className="text-foreground font-medium truncate">
                          {selectedNode.frequentMerchant}
                        </div>
                        <div className="text-foreground-muted text-[11px]">Top recurring vendor</div>
                      </div>

                      <div className="bg-obsidian-900/40 p-4 border border-white/[0.06] space-y-1">
                        <span className="text-[10px] text-foreground-dim uppercase flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-foreground-muted" /> High Velocity Peak
                        </span>
                        <div className="text-foreground font-medium">
                          {selectedNode.peakDay}
                        </div>
                        <div className="text-foreground-muted text-[11px]">Highest daily spend</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deep Dive Footer */}
                <div className="flex items-center justify-between border-t border-white/[0.08] pt-4 font-mono text-[11px] text-foreground-dim">
                  <span>Discipline: {Math.round((selectedNode.amount / selectedNode.allocated) * 100)}% allocated</span>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-foreground hover:text-financial-accent transition-colors"
                  >
                    [Close Analysis]
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
