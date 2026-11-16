"use client";

import React, { useEffect, useRef } from "react";
import { useFinanceStore } from "@/store/finance";
import { usePreferencesStore } from "@/store/preferences";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { formatCurrency } from "@/lib/utils/currency";

export const CinematicHero: React.FC = () => {
  const { cashRetained: availableLiquidity } = useFinanceStore((s) => s.metrics);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePreferencesStore((s) => s.reducedMotion);


  // Calm, atmospheric ambient lighting behind hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const palette = getComputedStyle(document.documentElement);
    const particleColor = palette.getPropertyValue("--text").trim();
    const glowColor = palette.getPropertyValue("--text-muted").trim();
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
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden py-[120px]">
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-60" />
      <div className="editorial-inner relative grid w-full items-end gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
        <div>
          <SectionLabel index="01" title="Demo data · August 2026" />
          <h1 className="mt-5 text-5xl font-extralight leading-[0.97] tracking-tightest sm:text-6xl md:text-7xl lg:text-8xl">
            YOUR MONEY.<br />
            <span className="font-serif font-normal italic">IN FOCUS.</span>
          </h1>
        </div>
        <div>
          <p className="mb-2 font-mono text-xs tracking-widest text-foreground-muted">
            {availableLiquidity < 0 ? "Over budget" : "Cash retained"}
          </p>
          <p className="editorial-number text-accent">{formatCurrency(availableLiquidity)}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-5 lg:col-span-2">
          <a href="#story" className="rounded-sm bg-foreground px-4 py-3 text-sm font-medium text-background">
            Explore Trajectory
          </a>
          <a href="#universe" className="editorial-link">Spending Universe</a>
        </div>
      </div>
    </section>
  );
};
