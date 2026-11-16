"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useFinanceStore } from "@/store/finance";
import { formatCurrency } from "@/lib/utils/currency";

export function ScrollStory() {
  const { income, deployed } = useFinanceStore((state) => state.metrics);
  const [showOutflows, setShowOutflows] = useState(false);

  return (
    <section id="story" className="editorial-section">
      <div className="editorial-inner grid items-end gap-10 md:grid-cols-2">
        <div>
          <SectionLabel index="02" title="Trajectory" />
          <h2 className="editorial-title">{showOutflows ? "YOU SPENT." : "YOU EARNED."}</h2>
        </div>
        <div className="space-y-5">
          <p aria-live="polite" className="editorial-number">{formatCurrency(showOutflows ? deployed : income)}</p>
          <button type="button" className="editorial-link" onClick={() => setShowOutflows(!showOutflows)}>
            {showOutflows ? "Show income" : "Show outflows"}
          </button>
        </div>
      </div>
    </section>
  );
}
