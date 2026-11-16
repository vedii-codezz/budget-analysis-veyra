"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VeyraInsights } from "@/components/insights/VeyraInsights";
import { useFinanceStore } from "@/store/finance";
import { formatCurrency, formatPercentage } from "@/lib/utils/currency";

export function CashFlowRiver() {
  const { river, essentials, lifestyle, investments, savedAndInvestedRate } = useFinanceStore((state) => state.metrics);
  const [destination, setDestination] = useState("saved");
  const branches = [
    { id: "essentials", title: "Essentials", amount: river.essentials, entries: essentials },
    { id: "lifestyle", title: "Lifestyle", amount: river.lifestyle, entries: lifestyle },
    { id: "investments", title: "Investments", amount: river.invested, entries: investments },
  ];
  const branch = branches.find(({ id }) => id === destination);

  return (
    <section id="flow" className="editorial-section">
      <div className="editorial-inner">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <SectionLabel index="05" title="Capital flow" />
            <h2 className="editorial-title">CASH-FLOW RIVER.</h2>
          </div>
          <div>
            <select aria-label="Cash-flow destination" value={destination}
              onChange={(event) => setDestination(event.target.value)}
              className="rounded-sm border border-line bg-background px-3 py-2 text-sm">
              <option value="saved">Saved and invested</option>
              {branches.map(({ id, title }) => <option key={id} value={id}>{title}</option>)}
              <option value="cash">Cash retained</option>
            </select>
            <div aria-live="polite" className="mt-5">
              {destination === "saved" && <p className="editorial-number">{formatPercentage(savedAndInvestedRate)}</p>}
              {branch && (
                <>
                  <p className="editorial-number">{formatCurrency(branch.amount)}</p>
                  {branch.entries.length > 0 && (
                    <p className="mt-4 text-sm text-foreground-muted">{branch.entries.map(({ title }) => title).join(" · ")}</p>
                  )}
                </>
              )}
              {destination === "cash" && (
                <p className="text-foreground-muted">Cash left after expenses and investments. <a href="#hero" className="underline hover:text-foreground">See the balance in Overview.</a></p>
              )}
            </div>
          </div>
        </div>
        <VeyraInsights />
      </div>
    </section>
  );
}
