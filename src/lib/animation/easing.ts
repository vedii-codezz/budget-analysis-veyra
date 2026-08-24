export const EASING = {
  // GSAP ease strings
  cinematic: "power4.out",
  smooth: "power3.out",
  expo: "expo.out",
  elastic: "elastic.out(1, 0.75)",
  gentle: "power2.inOut",
  linear: "none",

  // Cubic bezier curves for CSS and Framer Motion
  bezier: {
    cinematic: [0.16, 1, 0.3, 1] as const,
    smooth: [0.25, 0.1, 0.25, 1] as const,
    spring: [0.175, 0.885, 0.32, 1.275] as const,
    snappy: [0.4, 0, 0.2, 1] as const,
    gentle: [0.4, 0, 0.6, 1] as const,
  },
} as const;
