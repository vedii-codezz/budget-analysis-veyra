import React from "react";
import { clsx } from "clsx";
import { formatCurrency, CurrencyCode } from "@/lib/utils/currency";

interface FinancialMetricProps {
  label: string;
  value: number | string;
  isCurrency?: boolean;
  currency?: CurrencyCode;
  change?: string;
  trend?: "up" | "down" | "neutral";
  caption?: string;
  statusColor?: "emerald" | "amber" | "crimson" | "indigo" | "neutral";
  className?: string;
}

export const FinancialMetric: React.FC<FinancialMetricProps> = ({
  label,
  value,
  isCurrency = true,
  currency = "INR",
  change,
  trend,
  caption,
  statusColor = "neutral",
  className,
}) => {
  const displayValue =
    typeof value === "number" && isCurrency
      ? formatCurrency(value, { currency })
      : value;

  const colorMap = {
    emerald: "text-foreground-muted",
    amber: "text-foreground-muted",
    crimson: "text-foreground-muted",
    indigo: "text-foreground-dim",
    neutral: "text-foreground",
  };

  const dotMap = {
    emerald: "bg-foreground-muted",
    amber: "bg-foreground-muted",
    crimson: "bg-foreground-muted",
    indigo: "bg-foreground-muted",
    neutral: "bg-foreground-dim",
  };

  return (
    <div className={clsx("flex flex-col gap-1 select-none", className)}>
      <div className="flex items-center justify-between text-xs font-mono text-foreground-muted tracking-wider uppercase">
        <span className="flex items-center gap-2">
          <span className={clsx("w-1.5 h-1.5 rounded-full", dotMap[statusColor])} />
          {label}
        </span>
        {change && (
          <span
            className={clsx(
              "text-[10px] font-mono",
              trend === "up" && "text-foreground-muted",
              trend === "down" && "text-foreground-muted",
              trend === "neutral" && "text-foreground-dim"
            )}
          >
            {change}
          </span>
        )}
      </div>

      <div className={clsx("text-2xl md:text-3xl font-light tracking-tight tabular-nums", colorMap[statusColor])}>
        {displayValue}
      </div>

      {caption && (
        <span className="text-[11px] text-foreground-dim font-mono leading-tight">
          {caption}
        </span>
      )}
    </div>
  );
};
