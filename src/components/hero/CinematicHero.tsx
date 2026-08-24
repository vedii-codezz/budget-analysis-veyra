"use client";

import React, { useEffect, useRef } from "react";
import { useFinanceStore } from "@/store/finance";
import { usePreferencesStore } from "@/store/preferences";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DisplayNumber } from "@/components/ui/DisplayNumber";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowDown, Compass, ShieldCheck, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { formatPercentage } from "@/lib/utils/currency";

export const CinematicHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const income = useFinanceStore((s) => s.income);
  const getMonthlySpend = useFinanceStore((s) => s.getMonthlySpend);
  const getSavings = useFinanceStore((s) => s.getSavings);
  const getSavingsRate = useFinanceStore((s) => s.getSavingsRate);
  const reducedMotion = usePreferencesStore((s) => s.reducedMotion);

  const monthlySpend = getMonthlySpend();
  const savings = getSavings();
  const savingsRate = getSavingsRate();
  const availableLiquidity = Math.max(0, income - monthlySpend);

  // Interactive subtle particle canvas behind hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse tracking for subtle atmospheric tilt
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Node particle network
    const particleCount = reducedMotion ? 20 : 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const render = () => {
      // Lerp mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle atmospheric radial light following mouse
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        width * 0.45
      );
      gradient.addColorStop(0, "rgba(99, 102, 241, 0.045)");
      gradient.addColorStop(0.5, "rgba(16, 185, 129, 0.015)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Connect subtle lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        if (!reducedMotion) {
          p1.x += p1.vx;
          p1.y += p1.vy;
          if (p1.x < 0 || p1.x > width) p1.vx *= -1;
          if (p1.y < 0 || p1.y > height) p1.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p1.alpha * 0.4})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist / 120) * 0.035})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-16 px-6 sm:px-8 md:px-12 lg:px-16 overflow-hidden select-none"
    >
      {/* Background Interactive Ambient Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-70"
      />

      {/* Top Editorial Index */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
        <SectionLabel index="01" title="Financial Matrix" tag="AUG 2026 CYCLE" />
        <div className="font-mono text-[11px] text-foreground-dim flex items-center gap-4">
          <span>LATITUDE {"//"} FINANCIAL VELOCITY</span>
          <span className="text-financial-positive flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +{formatPercentage(savingsRate)} SAVINGS RATIO
          </span>
        </div>
      </div>

      {/* Main Editorial Hero Typography & Data Display */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          {/* Headline Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="space-y-1">
              <span className="font-mono text-xs text-foreground-muted tracking-widest uppercase block mb-2">
                Digital Financial Intelligence
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tightest text-foreground leading-[0.92]">
                YOUR MONEY.
                <br />
                <span className="font-normal italic text-foreground/90 font-serif">IN FOCUS.</span>
              </h1>
            </div>

            <p className="text-foreground-muted text-base md:text-lg max-w-xl font-light leading-relaxed">
              Understand where your capital flows, discover structural spending patterns,
              and command your financial trajectory with absolute clarity.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a href="#story">
                <MagneticButton
                  variant="primary"
                  size="lg"
                  cursorLabel="EXPLORE"
                >
                  <Compass className="w-4 h-4" /> Explore Trajectory
                </MagneticButton>
              </a>
              <a href="#dashboard">
                <MagneticButton
                  variant="secondary"
                  size="lg"
                  cursorLabel="INSPECT"
                >
                  Command Center
                </MagneticButton>
              </a>
            </div>
          </div>

          {/* Large Financial Rolling Display */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-end">
            <div className="bg-obsidian-900/40 backdrop-blur-xl border border-white/[0.08] p-8 md:p-10 w-full max-w-md relative overflow-hidden group hover:border-white/[0.15] transition-all duration-500">
              <div className="absolute top-0 right-0 p-3 font-mono text-[9px] text-foreground-dim uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-financial-positive" />
                VERIFIED REALTIME
              </div>

              <span className="font-mono text-xs tracking-mega uppercase text-foreground-muted block mb-3">
                AVAILABLE LIQUIDITY
              </span>

              <div className="my-2">
                <DisplayNumber
                  amount={availableLiquidity}
                  size="xl"
                  status="positive"
                />
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-foreground-dim">
                <div>
                  <span className="block text-[10px] text-foreground-muted uppercase tracking-wider">
                    Total Inflow
                  </span>
                  <span className="text-foreground font-medium text-sm tabular-nums">
                    ₹{income.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-foreground-muted uppercase tracking-wider">
                    Allocated Burn
                  </span>
                  <span className="text-financial-warning font-medium text-sm tabular-nums">
                    ₹{monthlySpend.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/[0.06] pt-6 font-mono text-[11px] text-foreground-dim">
        <span className="hidden sm:inline">SCROLL TO UNPACK FINANCIAL LIFE</span>
        <a
          href="#story"
          className="flex items-center gap-2 text-foreground hover:text-financial-accent transition-colors duration-300 ml-auto sm:ml-0"
        >
          <span>TRAJECTORY SEQUENCE</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
