export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP";

interface FormatCurrencyOptions {
  currency?: CurrencyCode;
  compact?: boolean;
  showDecimals?: boolean;
  showSign?: boolean;
}

/**
 * Format numbers according to Indian Numbering System (Lakhs, Crores) for INR,
 * and standard international numbering for other currencies.
 */
export function formatCurrency(
  amount: number,
  options: FormatCurrencyOptions = {}
): string {
  const {
    currency = "INR",
    compact = false,
    showDecimals = false,
    showSign = false,
  } = options;

  const sign = showSign && amount > 0 ? "+" : "";

  if (compact) {
    if (currency === "INR") {
      const abs = Math.abs(amount);
      if (abs >= 10000000) {
        return `${sign}₹${(amount / 10000000).toFixed(2)} Cr`;
      }
      if (abs >= 100000) {
        return `${sign}₹${(amount / 100000).toFixed(2)} L`;
      }
      if (abs >= 1000) {
        return `${sign}₹${(amount / 1000).toFixed(1)}k`;
      }
      return `${sign}₹${amount.toLocaleString("en-IN")}`;
    }

    const formatter = new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
      style: "currency",
      currency,
    });
    return `${sign}${formatter.format(amount)}`;
  }

  const locale = currency === "INR" ? "en-IN" : "en-US";
  const symbol = currency === "INR" ? "₹" : currency === "USD" ? "$" : currency === "EUR" ? "€" : "£";

  const formattedNum = Math.abs(amount).toLocaleString(locale, {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });

  const prefix = amount < 0 ? "−" : sign;
  return `${prefix}${symbol}${formattedNum}`;
}

export function formatPercentage(value: number, includeDecimals = 1): string {
  return `${value.toFixed(includeDecimals).replace("-", "−")}%`;
}
