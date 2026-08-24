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
      "bg-obsidian-900/60 backdrop-blur-xl border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-500",
    elevated:
      "bg-obsidian-800/80 backdrop-blur-2xl border border-white/[0.09] shadow-2xl shadow-black/80",
    subtle:
      "bg-obsidian-950/40 backdrop-blur-md border border-white/[0.03]",
    accent:
      "bg-obsidian-900/80 backdrop-blur-xl border border-financial-accent/30 shadow-lg shadow-financial-accent/5",
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
