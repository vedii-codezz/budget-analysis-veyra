"use client";

import React, { useEffect, useState } from "react";
import { formatCurrency, CurrencyCode } from "@/lib/utils/currency";
import { usePreferencesStore } from "@/store/preferences";

interface AnimatedCounterProps {
  value: number;
  duration?: number; // in seconds
  currency?: CurrencyCode;
  prefix?: string;
  suffix?: string;
  className?: string;
  isCurrency?: boolean;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1.2,
  currency = "INR",
  prefix = "",
  suffix = "",
  className = "",
  isCurrency = true,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const reducedMotion = usePreferencesStore((s) => s.reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayValue(value);
      return;
    }

    let startTimestamp: number | null = null;
    const startValue = 0;
    const endValue = value;
    const totalDurationMs = duration * 1000;

    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / totalDurationMs, 1);
      // Ease out expo
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(startValue + (endValue - startValue) * easeOut);
      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frameId);
  }, [value, duration, reducedMotion]);

  if (isCurrency) {
    const formatted = formatCurrency(displayValue, { currency });
    return (
      <span className={className}>
        {prefix}
        {formatted}
        {suffix}
      </span>
    );
  }

  return (
    <span className={className}>
      {prefix}
      {displayValue.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
};
