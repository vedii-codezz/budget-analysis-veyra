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
  Plus,
  ReceiptText,
  Play,
  ArrowRight,
} from "lucide-react";
import { clsx } from "clsx";
import { monthDays, outflowsThroughDay } from "@/lib/finance";
import { TransactionDialog } from "./TransactionDialog";

interface BasicDashboardProps {
  onOpenStory?: () => void;
}

export const BasicDashboard: React.FC<BasicDashboardProps> = ({ onOpenStory }) => {
  const { income, deployed: totalSpend, cashRetained: savings, cashRetainedRate: savingsRate, budgetUsage, health } = useFinanceStore((s) => s.metrics);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("ALL");
  const [hoveredTxId, setHoveredTxId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [scrubDay, setScrubDay] = useState<number>(monthDays);

  const transactions = useFinanceStore((s) => s.transactions);
  const budgets = useFinanceStore((s) => s.budgets);
  const reset = useFinanceStore((s) => s.reset);
  const storageError = useFinanceStore((s) => s.storageError);
  const cumulativeSpendAtDay = outflowsThroughDay(transactions, scrubDay);
  const deficit = savings < 0;

  const filteredTransactions =
    selectedCategoryFilter === "ALL"
      ? transactions
      : transactions.filter((t) => t.category === selectedCategoryFilter);

  return (
    <section
      id="dashboard"
      className="relative w-full py-24 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 bg-background text-foreground border-t border-line"
    >
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <SectionLabel index="07" title="Executive Ledger" tag="Command Center" />
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight tracking-tightest mt-3 text-foreground">
              FINANCIAL COMMAND.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="font-mono text-xs text-foreground-muted hover:text-foreground"
              onClick={() => { reset(); setScrubDay(monthDays); setSelectedCategoryFilter("ALL"); }}>
              Reset demo data
            </button>
            <MagneticButton
              variant="primary"
              onClick={() => setIsAddModalOpen(true)}
              cursorLabel="ADD"
            >
              <Plus className="w-4 h-4" /> Add Transaction
            </MagneticButton>
          </div>
        </div>

        {storageError && <p role="status" className="text-foreground-muted text-sm">Browser storage is unavailable. Changes may be lost on reload.</p>}
        {/* Asymmetric Macro Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Large Inflow/Outflow Balance */}
          <div className="lg:col-span-7 space-y-8">
            <div className="border-l-2 border-foreground/30 pl-6 space-y-2">
              <span className="font-mono text-xs uppercase tracking-mega text-foreground-muted">
                CASH RETAINED
              </span>
              <div className="py-1">
                <DisplayNumber amount={savings} size="hero" status={deficit ? "danger" : "positive"} />
              </div>
              <p className="text-foreground-muted font-light text-sm max-w-md">
                {deficit ? "Over budget. " : ""}Cash retained rate{" "}
                <span className={deficit ? "text-danger font-medium" : "text-foreground-muted font-medium"}>
                  {formatPercentage(savingsRate)}
                </span>
                .
              </p>
            </div>

            {/* Asymmetrical Metric Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-line">
              <FinancialMetric
                label="Gross Inflow"
                value={income}
                statusColor="neutral"
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
                caption="Active health status"
              />
            </div>
          </div>

          {/* Right Column: Timeline Scrubbing */}
          <div className="lg:col-span-5 space-y-6">
            <GlassPanel variant="default" className="p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-xs text-foreground-muted uppercase tracking-wider">
                <span>Pace Scrubber</span>
                <span className="text-foreground-muted font-medium">
                  Aug {scrubDay < 10 ? `0${scrubDay}` : scrubDay}
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

                <input
                  aria-label="Outflow pace by day"
                  type="range"
                  min="1"
                  max={monthDays}
                  value={scrubDay}
                  onChange={(e) => setScrubDay(Number(e.target.value))}
                  className="w-full h-1.5 bg-surface accent-foreground cursor-pointer"
                />

                <div className="flex justify-between font-mono text-xs text-foreground-muted uppercase">
                  <span>Aug 01</span>
                  <span>Aug 15</span>
                  <span>Aug 31</span>
                </div>
              </div>

              <p className="text-xs text-foreground-muted leading-relaxed pt-2 border-t border-line">
                Scrub through calendar days to observe how micro-purchases and fixed commitments accumulated across the month.
              </p>
            </GlassPanel>
          </div>
        </div>

        {/* Category Budget Allocation */}
        <div className="space-y-6 pt-12 border-t border-line">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-mega text-foreground-muted">
              BUDGET ALLOCATION ADHERENCE
            </span>
            <span className="font-mono text-xs text-foreground-dim">
              {budgets.length} monitored categories
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {budgetUsage.map((b) => (
              <div key={b.category} className="space-y-2 group">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-foreground group-hover:text-foreground-muted transition-colors">
                    {b.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-foreground-dim tabular-nums">
                      {formatCurrency(b.spent)} / {formatCurrency(b.allocated)}
                    </span>
                    <span
                      className={clsx(
                        "text-xs px-1.5 py-0.5",
                        b.status === "exceeded"
                          ? "bg-background text-danger font-semibold"
                          : b.status === "warning"
                          ? "bg-background text-warn font-semibold"
                          : "bg-surface text-foreground-muted"
                      )}
                    >
                      {formatPercentage(b.percentage)}{b.status === "exceeded" ? " · Breached" : ""}
                    </span>
                  </div>
                </div>
                <div className="relative w-full h-1 bg-surface">
                  <div
                    className={clsx(
                      "h-full transition-all duration-500",
                      b.status === "exceeded"
                        ? "bg-danger"
                        : b.status === "warning"
                        ? "bg-warn"
                        : "bg-foreground-muted"
                    )}
                    style={{ width: `${b.percentage / Math.max(100, b.percentage) * 100}%` }}
                  />
                  {b.status === "exceeded" && (
                    <span title="Budget cap" className="absolute -top-1 h-3 w-px bg-foreground"
                      style={{ left: `${100 / b.percentage * 100}%` }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction Ledger Table (Calm & Readable) */}
        <div className="space-y-6 pt-12 border-t border-line">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ReceiptText className="w-4 h-4 text-foreground-muted" />
              <span className="font-mono text-xs uppercase tracking-mega text-foreground-muted">
                CAPITAL DEPLOYMENT LEDGER
              </span>
            </div>

            {/* Filter tags */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none font-mono text-xs">
              {["ALL", ...budgets.map((budget) => budget.category)].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={clsx(
                      "px-3 py-1 border whitespace-nowrap transition-colors duration-150",
                      selectedCategoryFilter === cat
                        ? "border-foreground bg-foreground text-background font-medium"
                        : "border-line text-foreground-muted hover:text-foreground"
                    )}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Ledger Table */}
          <div className="border border-line overflow-hidden">
            <div className="divide-y divide-line">
              {filteredTransactions.map((tx) => {
                const isHovered = hoveredTxId === tx.id;

                return (
                  <div
                    key={tx.id}
                    onMouseEnter={() => setHoveredTxId(tx.id)}
                    onMouseLeave={() => setHoveredTxId(null)}
                    className={clsx(
                      "flex flex-col sm:flex-row sm:items-center justify-between p-4 md:px-6 transition-all duration-200 gap-2 font-mono text-xs",
                      isHovered
                        ? "bg-surface pl-4 md:pl-5"
                        : "hover:bg-surface"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-foreground-muted w-20">{tx.date}</span>
                      <div>
                        <div className="text-foreground font-medium">{tx.title}</div>
                        <div className="text-xs text-foreground-muted">{tx.merchant}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <span className="text-xs px-2 py-0.5 border border-line text-foreground-muted">
                        {tx.category}
                      </span>
                      <span className="text-foreground font-medium text-sm tabular-nums">
                        {tx.type === "income" ? "+" : "−"}{formatCurrency(tx.amount, { showDecimals: !Number.isInteger(tx.amount) })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Visual Decompression & VEYRA Story Invitation (Directive #29) */}
        {onOpenStory && (
          <div className="pt-20 pb-8 text-center space-y-6 border-t border-line">
            <span className="font-mono text-xs tracking-mega uppercase text-foreground-dim block">
              YOUR MONTH HAS A STORY.
            </span>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tightest uppercase text-foreground">
              SEE IT.
            </h3>
            <div className="pt-2">
              <MagneticButton
                variant="primary"
                size="lg"
                onClick={onOpenStory}
                cursorLabel="ENTER"
              >
                <Play className="w-4 h-4 text-background fill-background" /> Enter VEYRA Story
              </MagneticButton>
            </div>
          </div>
        )}
      </div>

      {isAddModalOpen && <TransactionDialog onClose={() => setIsAddModalOpen(false)} />}
    </section>
  );
};
