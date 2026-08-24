"use client";

import React, { useState, useEffect } from "react";
import { usePreferencesStore } from "@/store/preferences";
import { useUIStore } from "@/store/ui";
import { Sparkles, EyeOff, Eye, Play } from "lucide-react";
import { clsx } from "clsx";

interface NavbarProps {
  onOpenStory?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenStory }) => {
  const [time, setTime] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { reducedMotion, toggleReducedMotion } = usePreferencesStore();
  const { activeSection, setActiveSection } = useUIStore();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navLinks = [
    { id: "hero", label: "Overview", href: "#hero" },
    { id: "story", label: "Trajectory", href: "#story" },
    { id: "universe", label: "Universe", href: "#universe" },
    { id: "score", label: "Score", href: "#score" },
    { id: "flow", label: "Flow", href: "#flow" },
    { id: "insights", label: "Insights", href: "#insights" },
    { id: "dashboard", label: "Command", href: "#dashboard" },
  ];

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        scrolled
          ? "bg-obsidian-950/85 backdrop-blur-2xl border-b border-white/[0.06] py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex items-center justify-between">
        {/* Brand Ident */}
        <a
          href="#hero"
          className="flex items-center gap-3 group select-none"
        >
          <div className="w-2 h-2 rounded-none bg-foreground transition-transform duration-500 group-hover:rotate-45" />
          <div className="flex flex-col">
            <span className="font-mono text-xs tracking-widest text-foreground font-semibold">
              VEYRA<span className="text-foreground-dim font-normal">{" // 01"}</span>
            </span>
            <span className="text-[9px] font-mono text-foreground-dim uppercase tracking-wider hidden sm:inline">
              Financial Intelligence
            </span>
          </div>
        </a>

        {/* Minimal Navigation */}
        <nav className="hidden lg:flex items-center gap-1 border border-white/[0.06] bg-obsidian-900/60 backdrop-blur-md px-3 py-1.5 rounded-full">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setActiveSection(link.id)}
                className={clsx(
                  "relative px-3.5 py-1 font-mono text-xs tracking-wider uppercase transition-colors duration-300 rounded-full",
                  isActive
                    ? "text-foreground font-medium"
                    : "text-foreground-muted hover:text-foreground"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-0 bg-white/[0.08] rounded-full -z-10" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Status Indicators & Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Launch VEYRA Story Button */}
          {onOpenStory && (
            <button
              onClick={onOpenStory}
              className="flex items-center gap-1.5 px-3 py-1 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] font-mono text-[10px] text-foreground uppercase tracking-widest transition-colors"
            >
              <Play className="w-2.5 h-2.5 text-financial-accent" />
              <span>Story Recap</span>
            </button>
          )}

          {/* Real-time telemetry */}
          <div className="hidden xl:flex items-center gap-2 font-mono text-[11px] text-foreground-muted border-r border-white/[0.08] pr-4">
            <span className="w-1.5 h-1.5 rounded-full bg-financial-positive animate-pulse" />
            <span className="text-foreground-dim">{"LIVE //"}</span>
            <span className="tabular-nums text-foreground/80">{time || "00:00:00"}</span>
          </div>

          {/* Reduced Motion Toggle */}
          <button
            onClick={toggleReducedMotion}
            title={reducedMotion ? "Enable full cinematic motion" : "Reduce motion for comfort"}
            className={clsx(
              "flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase border transition-colors duration-300",
              reducedMotion
                ? "bg-financial-warning/10 border-financial-warning/30 text-financial-warning"
                : "border-white/[0.08] text-foreground-muted hover:text-foreground hover:border-white/[0.2]"
            )}
          >
            {reducedMotion ? <EyeOff className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
            <span className="hidden sm:inline">
              {reducedMotion ? "Motion: Reduced" : "Motion: High"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
