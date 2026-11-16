"use client";

import { useState } from "react";
import { useFinanceStore } from "@/store/finance";
import { microThreshold } from "@/lib/finance";
import { formatCurrency, formatPercentage } from "@/lib/utils/currency";

export function VeyraInsights() {
  const metrics = useFinanceStore((state) => state.metrics);
  const [activeIndex, setActiveIndex] = useState(0);
  const insights = [
    ["Weekend spending", metrics.weekendDescription(formatCurrency)],
    ["Small purchases", `${metrics.microPurchases.count} purchases under ${formatCurrency(microThreshold)} account for ${formatPercentage(metrics.microPurchases.share)} of monthly spending.`],
    ["Food budget", `At ${formatCurrency(metrics.foodDaily)} per day, dining is projected to reach ${formatPercentage(metrics.foodPacingPct)} of its budget.`],
    ["Subscriptions", `${metrics.recurring.length} recurring payments total ${formatCurrency(metrics.recurringTotal)}.`],
  ];

  return (
    <details id="insights" className="mt-12">
      <summary className="editorial-link">Spending insights</summary>
      <select aria-label="Spending insight" value={activeIndex}
        onChange={(event) => setActiveIndex(Number(event.target.value))}
        className="mt-5 rounded-sm border border-line bg-background px-3 py-2 text-sm">
        {insights.map(([title], index) => <option key={title} value={index}>{title}</option>)}
      </select>
      <p aria-live="polite" className="mt-4 text-foreground-muted">{insights[activeIndex][1]}</p>
    </details>
  );
}
