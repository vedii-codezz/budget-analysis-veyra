"use client";

import React, { useEffect } from "react";
import { initSmoothScroll } from "@/lib/animation/scroll";
import { CinematicHero } from "@/components/hero/CinematicHero";
import { ScrollStory } from "@/components/story/ScrollStory";
import { BasicDashboard } from "@/components/dashboard/BasicDashboard";

export default function Home() {
  useEffect(() => {
    const lenis = initSmoothScroll();
    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <CinematicHero />
      <ScrollStory />
      <BasicDashboard />
    </div>
  );
}
