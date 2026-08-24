"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFinanceStore } from "@/store/finance";
import { usePreferencesStore } from "@/store/preferences";
import { formatCurrency, formatPercentage } from "@/lib/utils/currency";
import {
  ArrowRight,
  ArrowLeft,
  X,
  RotateCcw,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { clsx } from "clsx";

interface VeyraStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VeyraStoryModal: React.FC<VeyraStoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const income = useFinanceStore((s) => s.income);
  const getMonthlySpend = useFinanceStore((s) => s.getMonthlySpend);
  const getSavings = useFinanceStore((s) => s.getSavings);
  const getSavingsRate = useFinanceStore((s) => s.getSavingsRate);
  const getFinancialHealth = useFinanceStore((s) => s.getFinancialHealth);
  const reducedMotion = usePreferencesStore((s) => s.reducedMotion);

  const spend = getMonthlySpend();
  const savings = getSavings();
  const savingsRate = getSavingsRate();
  const health = getFinancialHealth();

  const slides = [
    {
      id: "slide-1",
      tag: "AUGUST 2026",
      title: "YOUR MONTH",
      subtitle: "IN MONEY.",
      caption: "An interactive recap of your financial behavior, velocity, and capital preservation.",
      type: "intro",
    },
    {
      id: "slide-2",
      tag: "CAPITAL INFLOW",
      title: "YOU EARNED",
      number: formatCurrency(income),
      caption: "Gross earnings credited across primary professional contracts.",
      type: "stat",
    },
    {
      id: "slide-3",
      tag: "CAPITAL OUTFLOW",
      title: "YOU DEPLOYED",
      number: formatCurrency(spend),
      caption: "Essential living, lifestyle choices, and recurring commitments settled.",
      type: "stat",
    },
    {
      id: "slide-4",
      tag: "PEAK ALLOCATION",
      title: "BIGGEST CATEGORY",
      number: "HOUSING & RENT",
      subNumber: "₹24,500 Deployed",
      caption: "Accounting for 41.9% of your total monthly expenditures.",
      type: "highlight",
    },
    {
      id: "slide-5",
      tag: "BEHAVIORAL SHIFT",
      title: "BUT SOMETHING",
      subtitle: "UNEXPECTED OCCURRED.",
      caption: "A distinct shift in discretionary spending rhythm was detected.",
      type: "pivot",
    },
    {
      id: "slide-6",
      tag: "PATTERN DISCOVERY",
      title: "WEEKEND OUTFLOWS",
      number: "ROSE 31%",
      caption: "Saturday dining and leisure averaged ₹2,420 vs ₹1,080 on regular weekdays.",
      type: "stat",
    },
    {
      id: "slide-7",
      tag: "CAPITAL PRESERVATION",
      title: "SAVINGS RATE",
      number: formatPercentage(savingsRate),
      caption: "You retained ₹36,580 of pure surplus for investments and emergency reserves.",
      type: "stat",
    },
    {
      id: "slide-8",
      tag: "HISTORICAL DELTA",
      title: "VS JULY PERFORMANCE",
      number: "+4.2%",
      caption: "Higher capital retention efficiency than the preceding monthly cycle.",
      type: "stat",
    },
    {
      id: "slide-9",
      tag: "SYNTHESIS",
      title: "VEYRA SCORE",
      number: `${health.score} / 100`,
      subNumber: health.tier,
      caption: health.summary,
      type: "score",
    },
    {
      id: "slide-10",
      tag: "COMPLETION",
      title: "AUGUST UNDERSTOOD.",
      subtitle: "YOUR MONEY, IN FOCUS.",
      caption: "Ready to command your next financial cycle.",
      type: "outro",
    },
  ];

  const totalSlides = slides.length;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const replay = () => {
    setCurrentSlide(0);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, totalSlides]);

  if (!isOpen) return null;

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-10 md:p-16 bg-obsidian-950 text-foreground select-none">
      {/* Top Controls & Story Progress Indicator */}
      <div className="max-w-5xl mx-auto w-full space-y-4">
        {/* Step bars */}
        <div className="grid grid-cols-10 gap-1.5 w-full">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className="h-1 bg-obsidian-800 rounded-none overflow-hidden cursor-pointer"
              onClick={() => setCurrentSlide(idx)}
            >
              <div
                className={clsx(
                  "h-full transition-all duration-300",
                  idx <= currentSlide ? "bg-foreground" : "bg-transparent"
                )}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between font-mono text-xs text-foreground-dim">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-financial-accent animate-pulse" />
            <span className="text-foreground font-semibold tracking-widest">VEYRA STORY</span>
            <span>{"//"} 0{currentSlide + 1} OF 0{totalSlides}</span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-foreground-muted hover:text-foreground transition-colors uppercase tracking-wider"
          >
            <X className="w-4 h-4" />
            <span>[ESC / EXIT]</span>
          </button>
        </div>
      </div>

      {/* Main Slide Content Canvas */}
      <div className="max-w-4xl mx-auto w-full my-auto py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="font-mono text-xs sm:text-sm tracking-mega uppercase text-financial-accent block">
              {slide.tag}
            </span>

            <h2 className="text-4xl sm:text-6xl md:text-8xl font-extralight tracking-tightest uppercase text-foreground leading-[0.9]">
              {slide.title}
              {slide.subtitle && (
                <>
                  <br />
                  <span className="font-normal italic text-foreground/90 font-serif lowercase text-[0.9em]">
                    {slide.subtitle}
                  </span>
                </>
              )}
            </h2>

            {slide.number && (
              <div className="text-5xl sm:text-7xl md:text-9xl font-light text-foreground tracking-tightest tabular-nums my-4">
                {slide.number}
              </div>
            )}

            {slide.subNumber && (
              <div className="font-mono text-sm sm:text-base text-financial-positive uppercase tracking-widest">
                {slide.subNumber}
              </div>
            )}

            <p className="text-foreground-muted text-base sm:text-xl font-light max-w-xl leading-relaxed pt-2">
              {slide.caption}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Story Navigation Controls */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between border-t border-white/[0.08] pt-6 font-mono text-xs">
        <div className="flex items-center gap-4">
          {currentSlide > 0 ? (
            <button
              onClick={prevSlide}
              className="flex items-center gap-2 px-4 py-2 border border-white/[0.1] text-foreground-muted hover:text-foreground transition-colors uppercase"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <span className="text-foreground-dim uppercase">START OF RECAP</span>
          )}

          {currentSlide === totalSlides - 1 && (
            <button
              onClick={replay}
              className="flex items-center gap-2 px-4 py-2 border border-white/[0.1] text-foreground hover:border-white/30 transition-colors uppercase"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Replay Story
            </button>
          )}
        </div>

        {currentSlide < totalSlides - 1 ? (
          <button
            onClick={nextSlide}
            className="flex items-center gap-2 px-6 py-2.5 bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors uppercase tracking-wider"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-2.5 bg-financial-positive text-black font-semibold hover:bg-financial-positive/90 transition-colors uppercase tracking-wider"
          >
            <span>Done</span>
          </button>
        )}
      </div>
    </div>
  );
};
