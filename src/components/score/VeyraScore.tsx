"use client";

import { cashRetainedTarget } from "@/lib/finance";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { formatSignedNumber } from "@/lib/utils/currency";
import { useFinanceStore } from "@/store/finance";

export function VeyraScore() {
  const { health, cashRetained, cashRetainedRate } = useFinanceStore((state) => state.metrics);

  return (
    <section id="score" className="editorial-section">
      <div className="editorial-inner grid items-center gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <div>
          <SectionLabel index="04" title="Financial health" />
          <h2 className="editorial-title">VEYRA SCORE.</h2>
        </div>
        <div className="relative mx-auto flex aspect-square w-56 items-center justify-center sm:w-72 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <svg aria-hidden="true" viewBox="0 0 288 288" className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="144" cy="144" r="143" fill="none" stroke="var(--line)" strokeWidth="1" />
            <circle cx="144" cy="144" r="143" pathLength="100" fill="none" stroke="var(--text-secondary)"
              strokeWidth="1" strokeDasharray={health.score + " 100"} />
          </svg>
          <p className="editorial-number">{health.score}<span className="sr-only"> out of 100</span></p>
        </div>
        <div className="row-start-3 lg:col-start-1 lg:row-start-2">
          <p className="text-foreground-muted">
            {cashRetained < 0 ? "Outflows exceed monthly income." : cashRetainedRate < cashRetainedTarget
              ? "Cash retained is below target." : "Cash retained meets your target."}
          </p>
          <details className="mt-8">
            <summary className="editorial-link">How it’s calculated</summary>
            <p className="mt-5 font-mono text-xs text-foreground-dim">
              Baseline {health.base}. Each signal adds or subtracts points based on its weighted contribution.
            </p>
            <dl className="mt-5 space-y-4">
              {health.signals.map((signal) => (
                <div key={signal.id}>
                  <dt className="flex justify-between gap-4 text-sm text-foreground">
                    <span>{signal.title}</span>
                    <span>{formatSignedNumber(signal.points, Number.isInteger(signal.points) ? 0 : 1, " pts")}</span>
                  </dt>
                  <dd className="mt-1 text-sm text-foreground-muted">{signal.earned} of {signal.weight} points. {signal.desc}</dd>
                </div>
              ))}
            </dl>
          </details>
        </div>

      </div>
    </section>
  );
}
