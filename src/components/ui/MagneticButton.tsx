"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { useUIStore, CursorVariant } from "@/store/ui";
import { usePreferencesStore } from "@/store/preferences";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  cursorLabel?: string;
  cursorVariant?: CursorVariant;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  cursorLabel,
  cursorVariant = "hover",
  className,
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const setCursorContext = useUIStore((s) => s.setCursorContext);
  const resetCursorContext = useUIStore((s) => s.resetCursorContext);
  const reducedMotion = usePreferencesStore((s) => s.reducedMotion);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.25;
    const y = (clientY - (top + height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setCursorContext({
      variant: cursorVariant,
      label: cursorLabel,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    resetCursorContext();
  };

  const baseStyles =
    "relative inline-flex items-center justify-center font-mono text-xs tracking-widest uppercase transition-all duration-300 select-none overflow-hidden group focus:outline-none";

  const variants = {
    primary:
      "bg-foreground text-background font-medium hover:bg-foreground/90 border border-foreground/20 active:scale-98",
    secondary:
      "bg-obsidian-800 text-foreground border border-obsidian-600 hover:border-obsidian-500 hover:bg-obsidian-700/80 active:scale-98",
    ghost:
      "bg-transparent text-foreground-muted hover:text-foreground hover:bg-white/[0.03] active:scale-98",
    glass:
      "bg-white/[0.03] backdrop-blur-md text-foreground border border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.06] active:scale-98",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-[11px]",
    md: "px-5 py-2.5 text-xs",
    lg: "px-7 py-3.5 text-sm",
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...(props as any)}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
    </motion.button>
  );
};
