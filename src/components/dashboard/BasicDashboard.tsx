"use client";

import { useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TransactionDialog } from "./TransactionDialog";
import { monthDays, outflowsThroughDay } from "@/lib/finance";
import { formatCurrency, formatPercentage } from "@/lib/utils/currency";
import { useFinanceStore } from "@/store/finance";

export function BasicDashboard() {
  const budgetUsage = useFinanceStore((state) => state.metrics.budgetUsage);
  const transactions = useFinanceStore((state) => state.transactions);
  const reset = useFinanceStore((state) => state.reset);
  const storageError = useFinanceStore((state) => state.storageError);
  const [category, setCategory] = useState("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [scrubDay, setScrubDay] = useState(monthDays);
  const addButton = useRef<HTMLButtonElement>(null);
  const filtered = category === "ALL" ? transactions : transactions.filter((entry) => entry.category === category);

  return (
    <section id="dashboard" className="editorial-section">
      <div className="editorial-inner space-y-10 md:space-y-14">
        <div>
          <SectionLabel index="07" title="Command" />
          <h2 className="editorial-title">FINANCIAL COMMAND.</h2>
        </div>
        {storageError && <p role="status" className="text-foreground-muted">Browser storage is unavailable. Changes may be lost on reload.</p>}
        <div className="rounded-sm bg-surface" aria-label="Transaction ledger">
          <div className="ledger-header sticky z-10 flex flex-wrap items-center justify-between gap-3 rounded-sm bg-surface px-4 py-3 md:px-6">
            <select aria-label="Filter ledger by category" value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="max-w-full rounded-sm border border-line bg-surface px-2 py-2 text-xs">
              <option value="ALL">All categories</option>
              <option>Income</option>
              {budgetUsage.map(({ category }) => <option key={category}>{category}</option>)}
            </select>
            <button ref={addButton} type="button" onClick={() => setIsAddModalOpen(true)}
              className="rounded-sm bg-foreground px-3 py-2 text-xs font-medium text-background">
              Add Transaction
            </button>
          </div>
          <ul className="space-y-5 px-4 py-5 font-mono text-xs md:px-6">
            {filtered.map((entry) => (
              <li key={entry.id} className="grid grid-cols-[1fr_auto] items-baseline gap-x-3 gap-y-1 sm:grid-cols-[7rem_minmax(0,1fr)_minmax(0,1fr)_auto]">
                <time dateTime={entry.date} className="text-foreground-dim">{entry.date}</time>
                <p className="col-start-1 row-start-2 min-w-0 break-words text-foreground sm:col-start-auto sm:row-start-auto">
                  {entry.title}
                  {entry.merchant !== entry.title && <span className="block text-foreground-muted">{entry.merchant}</span>}
                </p>
                <span className="col-start-1 row-start-3 flex items-center gap-2 text-foreground-muted sm:col-start-auto sm:row-start-auto">
                  <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-foreground-dim" />
                  {entry.category}
                </span>
                <span className="col-start-2 row-start-2 text-right text-sm tabular-nums sm:col-start-auto sm:row-start-auto">
                  {entry.type === "income" ? "+" : "−"}{formatCurrency(entry.amount, { showDecimals: !Number.isInteger(entry.amount) })}
                </span>
              </li>
            ))}
          </ul>
          {filtered.length === 0 && <p className="px-4 pb-5 text-sm text-foreground-muted md:px-6">No transactions in this category.</p>}
        </div>

        <div className="space-y-5">
          <details>
            <summary className="editorial-link">Category budgets</summary>
            <ul className="mt-6 grid gap-x-12 gap-y-6 md:grid-cols-2">
              {budgetUsage.map((budget) => (
                <li key={budget.category} className="space-y-2">
                  <p className="flex flex-wrap justify-between gap-x-3 gap-y-1 font-mono text-xs">
                    <span>{budget.category}</span>
                    <span className="text-foreground-muted">
                      {formatPercentage(budget.percentage)}{budget.status === "exceeded" ? " · Breached" : ""}
                    </span>
                  </p>
                  <div aria-hidden="true" className="relative h-1 rounded-sm bg-surface">
                    <div className="h-full rounded-sm bg-foreground-dim"
                      style={{ width: `${Math.min(100, budget.percentage)}%` }} />
                    {budget.status === "exceeded" && (
                      <span title="Budget cap" className="absolute -top-1 h-3 w-px bg-foreground"
                        style={{ left: `${100 / budget.percentage * 100}%` }} />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </details>
          <details>
            <summary className="editorial-link">Outflows by day</summary>
            <label className="mt-5 block max-w-md text-sm text-foreground-muted">
              Aug {scrubDay.toString().padStart(2, "0")} · {formatCurrency(outflowsThroughDay(transactions, scrubDay))}
              <input type="range" min="1" max={monthDays} value={scrubDay} aria-label="Outflows through day of month"
                onChange={(event) => setScrubDay(Number(event.target.value))}
                className="mt-4 block w-full accent-foreground" />
            </label>
          </details>
          <button type="button" className="editorial-link"
            onClick={() => { reset(); setCategory("ALL"); setScrubDay(monthDays); }}>
            Reset demo data
          </button>
        </div>
      </div>
      {isAddModalOpen && <TransactionDialog onClose={() => {
        setIsAddModalOpen(false);
        requestAnimationFrame(() => addButton.current?.focus());
      }} />}
    </section>
  );
}
