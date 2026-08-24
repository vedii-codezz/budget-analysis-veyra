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
} from "lucide-react";
import { clsx } from "clsx";
import { TransactionCategory } from "@/types/finance";

export const BasicDashboard: React.FC = () => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

  const filteredTransactions =
    selectedCategoryFilter === "ALL"
      ? transactions
      : transactions.filter((t) => t.category === selectedCategoryFilter);

  return (
    <section
      id="dashboard"
      className="relative w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 bg-background text-foreground"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <SectionLabel index="03" title="Executive Command Center" tag="DATA SYNTHESIS" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tightest mt-3">
              FINANCIAL COMMAND.
            </h2>
          </div>
          <div className="flex items-center gap-3">
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
                NET AUGUST LIQUIDITY
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
                label="Gross Earnings"
                value={income}
                statusColor="neutral"
                change="+100%"
                trend="neutral"
                caption="Primary cashflow"
              />
              <FinancialMetric
                label="Capital Deployed"
                value={totalSpend}
                statusColor="amber"
                change={`${Math.round((totalSpend / income) * 100)}%`}
                trend="down"
                caption="August cumulative"
              />
              <FinancialMetric
                label="Health Index"
                value={`${health.score}/100`}
                isCurrency={false}
                statusColor="emerald"
                change={health.tier}
                trend="up"
                caption={health.summary.slice(0, 24) + "..."}
              />
            </div>
          </div>

          {/* Right Column: Key Health & Discipline Glances */}
          <div className="lg:col-span-5 space-y-6">
            <GlassPanel variant="default" className="p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 font-mono text-xs text-foreground-muted uppercase tracking-wider">
                <span>SYSTEM HEALTH AUDIT</span>
                <span className="text-financial-positive font-semibold">
                  {health.tier}
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-foreground-muted mb-1.5">
                    <span>Savings Health</span>
                    <span className="text-foreground">{health.metrics.savingsHealth}%</span>
                  </div>
                  <div className="w-full h-1 bg-obsidian-700">
                    <div
                      className="h-full bg-financial-positive"
                      style={{ width: `${health.metrics.savingsHealth}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-foreground-muted mb-1.5">
                    <span>Budget Discipline</span>
                    <span className="text-foreground">{health.metrics.budgetDiscipline}%</span>
                  </div>
                  <div className="w-full h-1 bg-obsidian-700">
                    <div
                      className="h-full bg-financial-cyan"
                      style={{ width: `${health.metrics.budgetDiscipline}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-foreground-muted mb-1.5">
                    <span>Expense Stability</span>
                    <span className="text-foreground">{health.metrics.expenseStability}%</span>
                  </div>
                  <div className="w-full h-1 bg-obsidian-700">
                    <div
                      className="h-full bg-financial-accent"
                      style={{ width: `${health.metrics.expenseStability}%` }}
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs text-foreground-dim leading-relaxed pt-2">
                {health.summary}
              </p>
            </GlassPanel>
          </div>
        </div>

        {/* Category Budget Allocation (Editorial Bars) */}
        <div className="space-y-6 pt-12 border-t border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-mega text-foreground-muted">
              CATEGORY ALLOCATION ADHERENCE
            </span>
            <span className="font-mono text-xs text-foreground-dim">
              {budgets.length} CATEGORIES MONITORED
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
                          ? "bg-financial-danger/20 text-financial-danger"
                          : b.status === "warning"
                          ? "bg-financial-warning/20 text-financial-warning"
                          : "bg-white/[0.05] text-foreground-muted"
                      )}
                    >
                      {Math.round(b.percentage)}%
                    </span>
                  </div>
                </div>
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

        {/* Transaction Ledger Table */}
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

          {/* Ledger Table */}
          <div className="border border-white/[0.06] overflow-hidden">
            <div className="divide-y divide-white/[0.04]">
              {filteredTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:px-6 hover:bg-white/[0.02] transition-colors duration-200 gap-2 font-mono text-xs"
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
              ))}
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
