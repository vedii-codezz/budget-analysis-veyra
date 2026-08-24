import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initSmoothScroll(): Lenis | null {
  if (typeof window === "undefined") return null;

  // Respect user preference for reduced motion
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return null;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  });

  lenis.on("scroll", ScrollTrigger.update);

  // Sync GSAP ticker with Lenis requestAnimationFrame
  const updateTicker = (time: number) => {
    lenis.raf(time * 1000);
  };

  const { gsap } = require("gsap");
  gsap.ticker.add(updateTicker);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
