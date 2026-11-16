"use client";

import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const slides = [
  {
    title: "YOUR MONEY. IN FOCUS.",
    caption: "Start with the cash you have left. Follow the trajectory to see what came in and what went out.",
  },
  {
    title: "SEE WHERE IT WENT.",
    caption: "Open a category in the Spending Universe. Then follow the Cash-Flow River from everyday expenses to investments.",
  },
  {
    title: "READ THE SIGNALS.",
    caption: "Open the VEYRA Score calculation to see what lifts your score and what puts pressure on it.",
  },
  {
    title: "MAKE IT YOURS.",
    caption: "Filter the ledger or add a transaction in Financial Command to see how a change affects your month.",
  },
];

export function VeyraStoryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const atEnd = index === slides.length - 1;

  useEffect(() => {
    const element = dialog.current;
    if (!isOpen || !element) return;
    setIndex(0);
    element.showModal();
    return () => element.close();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog ref={dialog} aria-labelledby="tour-heading"
      className="m-0 h-[100dvh] max-h-none w-full max-w-none bg-background text-foreground"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") setIndex((current) => Math.max(0, current - 1));
        if (event.key === "ArrowRight") setIndex((current) => Math.min(slides.length - 1, current + 1));
      }}>
      <div className="mx-auto flex min-h-full max-w-5xl flex-col justify-between gap-12 px-6 py-8 md:p-16">
        <div className="flex items-center justify-between font-mono text-xs">
          <SectionLabel index={String(index + 1).padStart(2, "0")} title="Story Recap" />
          <button type="button" onClick={onClose} className="editorial-link">Close</button>
        </div>
        <div aria-live="polite">
          <h2 id="tour-heading" className="editorial-title">{slides[index].title}</h2>
          <p className="mt-6 text-foreground-muted">{slides[index].caption}</p>
        </div>
        <div className="flex flex-wrap justify-end gap-5 font-mono text-xs">
          {index > 0 && <button type="button" onClick={() => setIndex(index - 1)} className="editorial-link">Back</button>}
          {atEnd && <button type="button" onClick={() => setIndex(0)} className="editorial-link">Replay</button>}
          <button type="button" onClick={() => atEnd ? onClose() : setIndex(index + 1)}
            className="rounded-sm bg-foreground px-4 py-2 font-medium text-background">
            {atEnd ? "Done" : "Continue"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
