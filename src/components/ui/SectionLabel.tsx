import React from "react";
import { clsx } from "clsx";

interface SectionLabelProps {
  index?: string;
  title: string;
  tag?: string;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  index = "01",
  title,
  tag,
  className,
}) => {
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-3 font-mono text-xs tracking-mega uppercase text-foreground-muted select-none",
        className
      )}
    >
      <span className="flex items-center gap-1.5 text-foreground-dim">
        <span className="inline-block w-1.5 h-1.5 bg-foreground-muted rounded-full animate-pulse" />
        <span>[{index}]</span>
      </span>
      <span className="text-foreground-dim">{"//"}</span>
      <span className="text-foreground font-medium">{title}</span>
      {tag && (
        <>
          <span className="text-foreground-dim">{"/"}</span>
          <span className="text-foreground-dim tracking-wider">{tag}</span>
        </>
      )}
    </div>
  );
};
