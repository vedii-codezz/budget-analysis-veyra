"use client";

import { CalculationInfo, metricDefinitions } from "@/components/ui/FinanceDefinitions";
import React, { useEffect, useRef } from "react";
import { useFinanceStore } from "@/store/finance";
import { usePreferencesStore } from "@/store/preferences";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DisplayNumber } from "@/components/ui/DisplayNumber";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AlertTriangle, ArrowDown, Compass, ShieldCheck, TrendingUp } from "lucide-react";
import { formatPercentage } from "@/lib/utils/currency";

export const CinematicHero: React.FC = () => {
  const { income, deployed: monthlySpend, cashRetained: availableLiquidity, cashRetainedRate: savingsRate } = useFinanceStore((s) => s.metrics);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePreferencesStore((s) => s.reducedMotion);


  // Calm, atmospheric ambient lighting behind hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const palette = getComputedStyle(document.documentElement);
    const particleColor = palette.getPropertyValue("--text").trim();
    const glowColor = palette.getPropertyValue("--accent").trim();
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

    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Minimal calm ambient dust particles (low count, no connecting lines)
    const particleCount = reducedMotion ? 8 : 16;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      radius: Math.random() * 1.2 + 0.6,
      alpha: Math.random() * 0.25 + 0.05,
    }));

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Subtle atmospheric illumination
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        width * 0.4
      );
      gradient.addColorStop(0, glowColor + "06");
      gradient.addColorStop(0.6, glowColor + "03");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Soft particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor + Math.round(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
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
      className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-16 px-6 sm:px-8 md:px-12 lg:px-16 overflow-hidden select-none bg-background"
    >
      {/* Background Calm Ambient Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-60"
      />

      {/* Top Editorial Index */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
        <SectionLabel index="01" title="Financial Matrix" tag="Demo data · August 2026" />
        <div className="font-mono text-[11px] text-foreground-dim flex items-center gap-4">
          <span className={`flex items-center gap-1 ${savingsRate < 0 ? "text-danger" : "text-foreground-muted"}`}>
            {savingsRate >= 0 && <TrendingUp className="w-3 h-3" />} {formatPercentage(savingsRate)} Cash retained <CalculationInfo label="Cash retained rate">{metricDefinitions.cash}</CalculationInfo>
          </span>
        </div>
      </div>

      {/* Main Editorial Hero Typography & Data Display */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          {/* Headline Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="space-y-2">
              <span className="font-mono text-xs text-foreground-dim tracking-widest uppercase block mb-1">
                Financial Intelligence
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tightest text-foreground leading-[0.92]">
                YOUR MONEY.
                <br />
                <span className="font-normal italic text-foreground font-serif">IN FOCUS.</span>
              </h1>
            </div>

            <p className="text-foreground text-base">Personal budget analysis dashboard</p>
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
              <a href="#universe">
                <MagneticButton
                  variant="secondary"
                  size="lg"
                  cursorLabel="VIEW"
                >
                  Spending Universe
                </MagneticButton>
              </a>
            </div>
          </div>

          {/* Large Financial Available Liquidity Display */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-end">
            <div className="bg-surface backdrop-blur-xl border border-line p-8 md:p-10 w-full max-w-md relative overflow-hidden transition-colors duration-500">
              <span className="font-mono text-xs tracking-mega uppercase text-foreground-muted block mb-3">
                CASH RETAINED
              </span>

              <div className="my-2">
                <DisplayNumber
                  amount={availableLiquidity}
                  size="xl"
                  status={availableLiquidity < 0 ? "danger" : "accent"}
                />
              </div>

              {availableLiquidity < 0 && <p className="inline-flex items-center gap-1 bg-background text-danger font-mono text-xs"><AlertTriangle aria-hidden="true" className="h-4 w-4" /> Over budget</p>}
              <div className="pt-6 mt-6 border-t border-line flex items-center justify-between text-xs font-mono text-foreground-muted">
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
                  <span className="text-foreground-muted font-medium text-sm tabular-nums">
                    ₹{monthlySpend.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-line pt-6 font-mono text-[11px] text-foreground-dim">
        <span className="hidden sm:inline">Scroll to explore financial trajectory</span>
        <a
          href="#story"
          className="flex items-center gap-2 text-accent hover:text-foreground transition-colors duration-300 ml-auto sm:ml-0"
        >
          <span>Trajectory Sequence</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
