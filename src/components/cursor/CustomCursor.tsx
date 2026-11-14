"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/ui";
import { usePreferencesStore } from "@/store/preferences";

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorContext = useUIStore((s) => s.cursorContext);
  const reducedMotion = usePreferencesStore((s) => s.reducedMotion);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
      );
    };
    checkTouch();

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseleave", onMouseLeave);
    document.body.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      document.body.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  // Don't render custom cursor on touch devices or reduced motion
  if (isTouchDevice || reducedMotion || !isVisible) {
    return null;
  }

  const { variant, label } = cursorContext;

  const isHovered = variant === "hover";
  const hasLabel = Boolean(label);

  const explore = variant === "explore";
  const size = explore ? 60 : hasLabel ? 76 : isHovered ? 40 : 12;

  const palette = getComputedStyle(document.documentElement);
  const text = palette.getPropertyValue("--text").trim();
  const background = palette.getPropertyValue("--bg").trim();

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Outer Ring / Cursor Bubble */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none text-center font-mono text-[9px] uppercase tracking-wide leading-none select-none backdrop-blur-[1px]"
        animate={{
          x: explore ? mousePosition.x + (mousePosition.x + 80 > window.innerWidth ? -72 : 14) : mousePosition.x - size / 2,
          y: explore ? mousePosition.y - 36 : mousePosition.y - size / 2,
          width: size,
          height: explore ? 22 : size,
          backgroundColor: hasLabel
            ? text
            : isHovered
            ? text + "14"
            : text + "e6",
          color: hasLabel ? background : text,
          borderColor: hasLabel
            ? text + "66"
            : isHovered
            ? text + "4d"
            : "transparent",
          borderWidth: isHovered && !hasLabel ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 28,
          stiffness: 400,
          mass: 0.3,
        }}
      >
        {hasLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="font-medium px-1 truncate"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
};
