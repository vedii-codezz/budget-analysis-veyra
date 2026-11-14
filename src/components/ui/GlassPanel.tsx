import React from "react";
import { clsx } from "clsx";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "subtle" | "accent";
  className?: string;
  glow?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  variant = "default",
  className,
  glow = false,
  ...props
}) => {
  const variants = {
    default:
      "bg-surface backdrop-blur-xl border border-line hover:border-line transition-colors duration-500",
    elevated:
      "bg-surface backdrop-blur-2xl border border-line shadow-2xl shadow-background/80",
    subtle:
      "bg-surface backdrop-blur-md border border-line",
    accent:
      "bg-surface backdrop-blur-xl border border-line shadow-lg shadow-background/70",
  };

  return (
    <div
      className={clsx(
        "relative transition-all duration-300",
        variants[variant],
        glow && "relative before:absolute before:inset-0 before:bg-radial-subtle before:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
