"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { EASING } from "@/lib/animation/easing";
import { usePreferencesStore } from "@/store/preferences";

interface RevealTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
}

export const RevealText: React.FC<RevealTextProps> = ({
  children,
  delay = 0,
  className,
  as = "div",
}) => {
  const reducedMotion = usePreferencesStore((s) => s.reducedMotion);
  const Component = motion[as];

  if (reducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <div className="overflow-hidden inline-block align-bottom">
      <Component
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{
          duration: 0.9,
          ease: EASING.bezier.cinematic,
          delay,
        }}
        className={clsx(className)}
      >
        {children}
      </Component>
    </div>
  );
};
