import { clsx } from "clsx";

export function SectionLabel({ index, title, className }: {
  index: string;
  title: string;
  className?: string;
}) {
  return (
    <p className={clsx("font-mono text-xs tracking-widest text-foreground-dim", className)}>
      {index} · {title}
    </p>
  );
}
