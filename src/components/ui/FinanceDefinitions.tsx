import { cashRetainedTarget, microThreshold } from "@/lib/finance";

export function FinanceDefinitions() {
  return (
    <details className="font-mono text-xs max-w-xl text-foreground-muted">
      <summary className="cursor-pointer">How this is calculated</summary>
      <ul className="mt-2 space-y-2">
        <li>Consumption totals expenses. Invested totals investment transactions.</li>
        <li>Cash retained is income minus consumption and investments. Its rate divides that balance by income.</li>
        <li>Saved + invested divides investment contributions plus cash retained by income.</li>
        <li>Weekend and weekday averages divide discretionary spending by the corresponding calendar days through the latest regular expense. The premium is (weekend average ÷ weekday average − 1) × 100.</li>
        <li>Micro purchases count expenses below ₹{microThreshold}. Their share divides the total by consumption.</li>
        <li>Food pacing projects daily dining spend across the full month and compares it with the cap. One-offs are excluded.</li>
        <li>The score starts at zero. Rounded contributions come from cash retained against a {cashRetainedTarget}% target (35 points), caps met (25), expense stability (20), and investment progress (20).</li>
        <li>Expense stability loses points as regular discretionary expenses approach 40% of income. Investment progress compares contributions with the investment cap.</li>
      </ul>
    </details>
  );
}
