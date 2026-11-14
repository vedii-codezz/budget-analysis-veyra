"use client";

import { MotionConfig } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { usePreferencesStore } from "@/store/preferences";
import { useFinanceStore } from "@/store/finance";
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
  const [showBoot, setShowBoot] = useState(false);
  const [motionReady, setMotionReady] = useState(false);
  const reducedMotion = usePreferencesStore((state) => state.reducedMotion);
  const finishBoot = useCallback(() => {
    setShowBoot(false);
    try {
      localStorage.setItem("veyra-boot-seen", "true");
    } catch {
      // Boot completion remains effective in this session.
    }
  }, []);
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  useEffect(() => {
    useFinanceStore.getState().hydrate();
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    usePreferencesStore.getState().setReducedMotion(preference.matches);
    let seen = false;
    try {
      seen = localStorage.getItem("veyra-boot-seen") === "true";
    } catch {
      // Storage is optional for the boot sequence.
    }
    setShowBoot(!seen && !preference.matches);
    setMotionReady(true);
    const syncPreference = () => usePreferencesStore.getState().setReducedMotion(preference.matches);
    preference.addEventListener("change", syncPreference);
    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (!motionReady || reducedMotion) return;
    return initSmoothScroll() ?? undefined;
  }, [motionReady, reducedMotion]);

  return (
    <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>
      {showBoot && <BootSequence onComplete={finishBoot} />}
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
    </MotionConfig>
  );
}
