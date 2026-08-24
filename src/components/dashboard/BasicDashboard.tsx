"use client";

import React, { useState } from "react";
import { useFinanceStore } from "@/store/finance";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DisplayNumber } from "@/components/ui/DisplayNumber";
import { FinancialMetric } from "@/components/ui/FinancialMetric";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { formatCurrency, formatPercentage } from "@/lib/utils/currency";
import {
  ArrowUpRight,
  Filter,
  Plus,
  ReceiptText,
  SlidersHorizontal,
  TrendingDown,
  TrendingUp,
  Wallet,
  Play,
  Calendar,
  Sparkles,
} from "lucide-react";
import { clsx } from "clsx";
import { TransactionCategory } from "@/types/finance";

interface BasicDashboardProps {
  onOpenStory?: () => void;
}

export const BasicDashboard: React.FC<BasicDashboardProps> = ({ onOpenStory }) => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("ALL");
  const [hoveredTxId, setHoveredTxId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [scrubDay, setScrubDay] = useState<number>(24);

  // Form State for quick transaction addition
  const [newTitle, setNewTitle] = useState("");
  const [newMerchant, setNewMerchant] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newCategory, setNewCategory] = useState<TransactionCategory>("Food & Dining");

  const income = useFinanceStore((s) => s.income);
  const transactions = useFinanceStore((s) => s.transactions);
  const budgets = useFinanceStore((s) => s.budgets);
  const addTransaction = useFinanceStore((s) => s.addTransaction);
  const getMonthlySpend = useFinanceStore((s) => s.getMonthlySpend);
  const getSavings = useFinanceStore((s) => s.getSavings);
  const getSavingsRate = useFinanceStore((s) => s.getSavingsRate);
  const getBudgetUsage = useFinanceStore((s) => s.getBudgetUsage);
  const getFinancialHealth = useFinanceStore((s) => s.getFinancialHealth);

  const totalSpend = getMonthlySpend();
  const savings = getSavings();
  const savingsRate = getSavingsRate();
  const budgetUsage = getBudgetUsage();
  const health = getFinancialHealth();

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAmount || isNaN(Number(newAmount))) return;

    addTransaction({
      title: newTitle,
      merchant: newMerchant || newTitle,
      amount: Number(newAmount),
      category: newCategory,
      date: new Date().toISOString().split("T")[0],
    });

    setNewTitle("");
    setNewMerchant("");
    setNewAmount("");
    setIsAddModalOpen(false);
  };

  // Cumulative spend up to scrub day
  const cumulativeSpendAtDay = transactions
    .filter((t) => {
      const day = parseInt(t.date.split("-")[2], 10) || 1;
      return day <= scrubDay;
    })
    .reduce((acc, t) => acc + t.amount, 0);

  const filteredTransactions =
    selectedCategoryFilter === "ALL"
      ? transactions
      : transactions.filter((t) => t.category === selectedCategoryFilter);

  return (
    <section
      id="dashboard"
      className="relative w-full py-24 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 bg-obsidian-950 text-foreground border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <SectionLabel index="06" title="Executive Command Center" tag="COMMAND & LEDGER" />
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight tracking-tightest mt-3 text-foreground">
              FINANCIAL COMMAND.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {onOpenStory && (
              <MagneticButton
                variant="secondary"
                onClick={onOpenStory}
                cursorLabel="STORY"
              >
                <Play className="w-3.5 h-3.5 text-financial-accent" /> Launch VEYRA Story
              </MagneticButton>
            )}
            <MagneticButton
              variant="primary"
              onClick={() => setIsAddModalOpen(true)}
              cursorLabel="ADD"
            >
              <Plus className="w-4 h-4" /> Add Transaction
            </MagneticButton>
          </div>
        </div>

        {/* Asymmetric Macro Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Large Inflow/Outflow Balance */}
          <div className="lg:col-span-7 space-y-8">
            <div className="border-l-2 border-foreground/30 pl-6 space-y-2">
              <span className="font-mono text-xs uppercase tracking-mega text-foreground-muted">
                NET AUGUST CAPITAL PRESERVATION
              </span>
              <div className="py-1">
                <DisplayNumber amount={savings} size="hero" status="positive" />
              </div>
              <p className="text-foreground-muted font-light text-sm max-w-md">
                Retained surplus across active earnings. Your savings velocity stands at{" "}
                <span className="text-financial-positive font-medium">
                  {formatPercentage(savingsRate)}
                </span>
                .
              </p>
            </div>

            {/* Asymmetrical Metric Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/[0.06]">
              <FinancialMetric
                label="Gross Inflow"
                value={income}
                statusColor="neutral"
                change="+100%"
                trend="neutral"
                caption="Primary cashflow"
              />
              <FinancialMetric
                label="Total Deployed"
                value={totalSpend}
                statusColor="amber"
                change={`${Math.round((totalSpend / income) * 100)}%`}
                trend="down"
                caption="August cumulative"
              />
              <FinancialMetric
                label="VEYRA SCORE"
                value={`${health.score}/100`}
                isCurrency={false}
                statusColor="emerald"
                change={health.tier}
                trend="up"
                caption={health.summary.slice(0, 24) + "..."}
              />
            </div>
          </div>

          {/* Right Column: Timeline Scrubbing & Month Pace */}
          <div className="lg:col-span-5 space-y-6">
            <GlassPanel variant="default" className="p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 font-mono text-xs text-foreground-muted uppercase tracking-wider">
                <span>CUMULATIVE PACE SCRUBBER</span>
                <span className="text-financial-accent font-semibold">
                  AUG {scrubDay < 10 ? `0${scrubDay}` : scrubDay}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-xs text-foreground-muted">
                    Outflows Through Day {scrubDay}
                  </span>
                  <span className="text-2xl font-light text-foreground tabular-nums">
                    {formatCurrency(cumulativeSpendAtDay)}
                  </span>
                </div>

                {/* Range Slider for Date Scrubbing */}
                <input
                  type="range"
                  min="1"
                  max="31"
                  value={scrubDay}
                  onChange={(e) => setScrubDay(Number(e.target.value))}
                  className="w-full h-1.5 bg-obsidian-700 accent-financial-accent cursor-pointer"
                />

                <div className="flex justify-between font-mono text-[10px] text-foreground-dim uppercase">
                  <span>AUG 01</span>
                  <span>AUG 15</span>
                  <span>AUG 31</span>
                </div>
              </div>

              <p className="text-xs text-foreground-dim leading-relaxed pt-2 border-t border-white/[0.04]">
                Scrub through calendar days to observe how micro-purchases and fixed commitments accumulated across the month.
              </p>
            </GlassPanel>
          </div>
        </div>

        {/* Category Budget Allocation (Asymmetrical Pressure Visualization) */}
        <div className="space-y-6 pt-12 border-t border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-mega text-foreground-muted">
              BUDGET PRESSURE ARCHITECTURE
            </span>
            <span className="font-mono text-xs text-foreground-dim">
              {budgets.length} ACTIVE CAPS MONITORED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {budgetUsage.map((b) => (
              <div key={b.category} className="space-y-2 group">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-foreground group-hover:text-financial-accent transition-colors">
                    {b.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-foreground-dim tabular-nums">
                      {formatCurrency(b.spent)} / {formatCurrency(b.allocated)}
                    </span>
                    <span
                      className={clsx(
                        "text-[10px] px-1.5 py-0.5",
                        b.status === "exceeded"
                          ? "bg-financial-danger/20 text-financial-danger font-semibold"
                          : b.status === "warning"
                          ? "bg-financial-warning/20 text-financial-warning font-semibold"
                          : "bg-white/[0.05] text-foreground-muted"
                      )}
                    >
                      {Math.round(b.percentage)}%
                    </span>
                  </div>
                </div>
                {/* Multi-stage Tension Bar */}
                <div className="w-full h-1.5 bg-obsidian-800 overflow-hidden">
                  <div
                    className={clsx(
                      "h-full transition-all duration-700",
                      b.status === "exceeded"
                        ? "bg-financial-danger"
                        : b.status === "warning"
                        ? "bg-financial-warning"
                        : "bg-financial-positive"
                    )}
                    style={{ width: `${Math.min(100, b.percentage)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cinematic Transaction Ledger with Focus Hovering */}
        <div className="space-y-6 pt-12 border-t border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ReceiptText className="w-4 h-4 text-foreground-muted" />
              <span className="font-mono text-xs uppercase tracking-mega text-foreground-muted">
                CAPITAL DEPLOYMENT LEDGER
              </span>
            </div>

            {/* Filter tags */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none font-mono text-[11px]">
              {["ALL", "Food & Dining", "Housing & Utilities", "Shopping & Lifestyle", "Subscriptions & SaaS"].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={clsx(
                      "px-3 py-1 border whitespace-nowrap transition-colors duration-200",
                      selectedCategoryFilter === cat
                        ? "border-foreground bg-foreground text-background font-medium"
                        : "border-white/[0.08] text-foreground-muted hover:text-foreground"
                    )}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Ledger Table with Hover Focus */}
          <div className="border border-white/[0.06] overflow-hidden">
            <div className="divide-y divide-white/[0.04]">
              {filteredTransactions.map((tx) => {
                const isHovered = hoveredTxId === tx.id;
                const hasHover = hoveredTxId !== null;

                return (
                  <div
                    key={tx.id}
                    onMouseEnter={() => setHoveredTxId(tx.id)}
                    onMouseLeave={() => setHoveredTxId(null)}
                    className={clsx(
                      "flex flex-col sm:flex-row sm:items-center justify-between p-4 md:px-6 transition-all duration-300 gap-2 font-mono text-xs",
                      isHovered
                        ? "bg-white/[0.05] border-l-2 border-financial-accent pl-4 md:pl-5"
                        : hasHover
                        ? "opacity-40"
                        : "hover:bg-white/[0.02]"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-foreground-dim w-20">{tx.date}</span>
                      <div>
                        <div className="text-foreground font-medium">{tx.title}</div>
                        <div className="text-[11px] text-foreground-muted">{tx.merchant}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <span className="text-[10px] px-2 py-0.5 border border-white/[0.06] text-foreground-dim">
                        {tx.category}
                      </span>
                      <span className="text-foreground font-semibold text-sm tabular-nums">
                        -₹{tx.amount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-obsidian-900 border border-white/[0.12] p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-foreground font-medium">
                Record Capital Outflow
              </span>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="font-mono text-xs text-foreground-dim hover:text-foreground"
              >
                [ESC / CLOSE]
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-1.5">
                <label className="text-foreground-muted block">Transaction Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flight to Mumbai"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-obsidian-950 border border-white/[0.1] px-3.5 py-2.5 text-foreground focus:border-financial-accent focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-foreground-muted block">Merchant / Payee</label>
                <input
                  type="text"
                  placeholder="e.g. Air India"
                  value={newMerchant}
                  onChange={(e) => setNewMerchant(e.target.value)}
                  className="w-full bg-obsidian-950 border border-white/[0.1] px-3.5 py-2.5 text-foreground focus:border-financial-accent focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-foreground-muted block">Amount (INR ₹)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 6420"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full bg-obsidian-950 border border-white/[0.1] px-3.5 py-2.5 text-foreground focus:border-financial-accent focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-foreground-muted block">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as TransactionCategory)}
                  className="w-full bg-obsidian-950 border border-white/[0.1] px-3.5 py-2.5 text-foreground focus:border-financial-accent focus:outline-none"
                >
                  {budgets.map((b) => (
                    <option key={b.category} value={b.category}>
                      {b.category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-white/[0.08] text-foreground-muted hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
                >
                  Commit Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
