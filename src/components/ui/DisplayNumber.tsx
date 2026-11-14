import React from "react";
import { clsx } from "clsx";
import { formatCurrency, CurrencyCode } from "@/lib/utils/currency";

interface DisplayNumberProps {
  amount: number;
  currency?: CurrencyCode;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  className?: string;
  showSign?: boolean;
  compact?: boolean;
  status?: "neutral" | "positive" | "warning" | "danger" | "accent";
}

export const DisplayNumber: React.FC<DisplayNumberProps> = ({
  amount,
  currency = "INR",
  size = "lg",
  className,
  showSign = false,
  compact = false,
  status = "neutral",
}) => {
  const formatted = formatCurrency(amount, { currency, compact, showSign });
  const symbolLength = /^[−+-]/.test(formatted) ? 2 : 1;
  const symbol = formatted.slice(0, symbolLength);
  const numberPart = formatted.slice(symbolLength);

  const sizeClasses = {
    sm: "text-xl md:text-2xl font-light tracking-tight",
    md: "text-3xl md:text-4xl font-light tracking-tight",
    lg: "text-4xl md:text-5xl lg:text-6xl font-light tracking-tightest",
    xl: "text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tightest",
    hero: "text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tightest",
  };

  const statusColors = {
    neutral: "text-foreground",
    positive: "text-foreground-muted",
    warning: "text-foreground-muted",
    danger: "bg-background text-danger",
    accent: "text-foreground-dim",
  };

  return (
    <div
      className={clsx(
        "inline-flex items-baseline font-sans select-none",
        sizeClasses[size],
        statusColors[status],
        className
      )}
    >
      <span className="text-[0.8em] font-normal mr-0.5 select-none">{symbol}</span>
      <span className="font-medium tracking-tighter tabular-nums">{numberPart}</span>
    </div>
  );
};
