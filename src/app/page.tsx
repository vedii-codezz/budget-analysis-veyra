"use client";

import React, { useEffect, useState } from "react";
import { initSmoothScroll } from "@/lib/animation/scroll";
import { CinematicHero } from "@/components/hero/CinematicHero";
import { ScrollStory } from "@/components/story/ScrollStory";
import { SpendingUniverse } from "@/components/universe/SpendingUniverse";
import { VeyraScore } from "@/components/score/VeyraScore";
import { CashFlowRiver } from "@/components/flow/CashFlowRiver";
import { VeyraInsights } from "@/components/insights/VeyraInsights";
import { BasicDashboard } from "@/components/dashboard/BasicDashboard";
import { BootSequence } from "@/components/cinematic/BootSequence";
import { VeyraStoryModal } from "@/components/story/VeyraStoryModal";
import { Navbar } from "@/components/nav/Navbar";

export default function Home() {
  const [isBooted, setIsBooted] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  useEffect(() => {
    const lenis = initSmoothScroll();
    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      {!isBooted && <BootSequence onComplete={() => setIsBooted(true)} />}
      <Navbar onOpenStory={() => setIsStoryOpen(true)} />
      
      <div className="flex flex-col w-full min-h-screen">
        <CinematicHero />
        <ScrollStory />
        <SpendingUniverse />
        <VeyraScore />
        <CashFlowRiver />
        <VeyraInsights />
        <BasicDashboard onOpenStory={() => setIsStoryOpen(true)} />
      </div>

      <VeyraStoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
      />
    </>
  );
}
