"use client";

import { useId, useRef, type ReactNode } from "react";
import { Info } from "lucide-react";
import { cashRetainedTarget, microThreshold } from "@/lib/finance";

export const metricDefinitions = {
  cash: "Income minus consumption and investments, divided by income.",
  saved: "Invested contributions plus cash retained, divided by income.",
  weekend: "Weekend average divided by weekday average, minus one. Each average includes zero-spend days through the latest regular expense and excludes one-offs and recurring bills.",
  micro: "Count and sum expenses below INR " + microThreshold + ". Divide the total by consumption for its share.",
};

export function CalculationInfo({ label, children }: { label: string; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();

  return (
    <span className="inline-flex align-middle">
      <button ref={trigger} type="button" aria-label={"How this is calculated: " + label}
        aria-haspopup="dialog" className="mx-1 p-1 text-foreground-muted"
        onClick={() => dialog.current?.showModal()}>
        <Info aria-hidden="true" className="h-4 w-4" />
      </button>
      <dialog ref={dialog} aria-labelledby={id} onClose={() => trigger.current?.focus()}
        className="w-[calc(100%-2rem)] max-w-sm border border-line bg-surface p-5 text-left text-foreground backdrop:bg-background/80">
        <span id={id} className="block text-sm font-medium">How this is calculated</span>
        <span className="mt-2 block text-sm text-foreground-muted">{children}</span>
        <button autoFocus type="button" className="mt-4 border border-line px-3 py-2 text-xs"
          onClick={() => dialog.current?.close()}>Close</button>
      </dialog>
    </span>
  );
}

export function FinanceDefinitions() {
  return (
    <CalculationInfo label="VEYRA Score">
      The baseline combines reference points of 25 for savings, 10 for budget, and 7.5 each for stability and goals. Each signal is the rounded earned points minus its reference points.
      Savings Health weighs 35 points against a {cashRetainedTarget}% cash retained target.
      Budget Discipline weighs 25, Expense Stability 20, and Goal Progress 20.
    </CalculationInfo>
  );
}
