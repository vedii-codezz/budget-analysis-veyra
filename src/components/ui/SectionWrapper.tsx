import React from "react";
import { clsx } from "clsx";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  hasGridLine?: boolean;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  className,
  containerClassName,
  hasGridLine = true,
  ...props
}) => {
  return (
    <section
      id={id}
      className={clsx(
        "relative w-full py-24 md:py-36 overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Subtle background technical grid line */}
      {hasGridLine && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      )}

      <div
        className={clsx(
          "relative max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
};
