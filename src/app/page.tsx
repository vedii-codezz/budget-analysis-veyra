"use client";

import React, { useEffect, useState } from "react";
import { initSmoothScroll } from "@/lib/animation/scroll";
import { CinematicHero } from "@/components/hero/CinematicHero";
import { ScrollStory } from "@/components/story/ScrollStory";
import { BasicDashboard } from "@/components/dashboard/BasicDashboard";
import { BootSequence } from "@/components/cinematic/BootSequence";

export default function Home() {
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    const lenis = initSmoothScroll();
    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      {!isBooted && <BootSequence onComplete={() => setIsBooted(true)} />}
      <div className="flex flex-col w-full min-h-screen">
        <CinematicHero />
        <ScrollStory />
        <BasicDashboard />
      </div>
    </>
  );
}
