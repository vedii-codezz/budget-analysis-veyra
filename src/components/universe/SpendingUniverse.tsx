"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useFinanceStore } from "@/store/finance";
import { formatCurrency, formatPercentage } from "@/lib/utils/currency";
import type { TransactionCategory } from "@/types/finance";

export function SpendingUniverse() {
  const { deployed, budgetUsage } = useFinanceStore((state) => state.metrics);
  const [selectedCategory, setSelectedCategory] = useState<TransactionCategory | null>(null);
  const nodes = budgetUsage.filter(({ spent }) => spent > 0).sort((a, b) => b.spent - a.spent);
  const selected = nodes.find(({ category }) => category === selectedCategory);
  const maxSpend = nodes[0]?.spent ?? 1;

  return (
    <section id="universe" className="editorial-section">
      <div className="editorial-inner space-y-10 md:space-y-16">
        <div>
          <SectionLabel index="03" title="Spending Universe" />
          <h2 className="editorial-title">{selected ? selected.category.toUpperCase() + "." : "WHERE IT WENT."}</h2>
        </div>
        {selected ? (
          <div className="space-y-5">
            <p className="editorial-number">{formatCurrency(selected.spent)}</p>
            <p className="text-foreground-muted">{formatPercentage(selected.spent / deployed * 100)} of outflows.</p>
            <button type="button" className="editorial-link" onClick={() => setSelectedCategory(null)}>
              Back to Universe
            </button>
          </div>
        ) : (
          <div role="group" aria-label="Spending by category, sized by amount"
            className="grid grid-cols-2 items-center justify-items-center gap-x-3 gap-y-5 sm:grid-cols-4">
            {nodes.map(({ category, spent }) => (
              <button key={category} type="button" title={formatCurrency(spent)}
                aria-label={`${category}, ${formatCurrency(spent)}`}
                onClick={() => setSelectedCategory(category)}
                className="flex aspect-square items-center justify-center rounded-full border border-line px-2 text-center text-sm text-foreground-muted transition-colors hover:border-foreground-dim hover:text-foreground"
                style={{ width: `clamp(5.25rem, ${5.25 + 4 * Math.sqrt(spent / maxSpend)}rem, 100%)` }}>
                {category.split(" & ")[0]}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
