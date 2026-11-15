"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { budgets, isMonthDate, isValidEntry, monthEnd, monthStart } from "@/lib/finance";
import { useFinanceStore } from "@/store/finance";
import type { TransactionCategory } from "@/types/finance";

const fieldClass = "block w-full mt-1 bg-background border border-line px-3 py-2 text-foreground";

function defaultDate() {
  const today = new Date().toLocaleDateString("sv-SE");
  return isMonthDate(today) ? today : today < monthStart ? monthStart : monthEnd;
}

export function TransactionDialog({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const addTransaction = useFinanceStore((s) => s.addTransaction);
  const [type, setType] = useState<"expense" | "income">("expense");
  const [category, setCategory] = useState<TransactionCategory>("Food & Dining");
  const categoryTouched = useRef(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => {
      element?.close();
    };
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const title = String(fields.get("title") ?? "").trim();
    const entry = {
      title,
      merchant: String(fields.get("merchant") ?? "").trim() || title,
      amount: Number(fields.get("amount")),
      date: String(fields.get("date") ?? ""),
      type,
      category: type === "income" ? "Income" as const : category,
      oneOff: type === "expense" && fields.has("oneOff"),
    };
    if (!isValidEntry(entry)) {
      setError("Enter a title, a positive amount, and a date in August 2026.");
      return;
    }
    addTransaction(entry);
    onClose();
  }

  return (
    <dialog ref={dialog} onCancel={(event) => { event.preventDefault(); onClose(); }}
      aria-labelledby="transaction-heading"
      className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-auto border border-line bg-surface p-6 text-foreground backdrop:bg-background/80 backdrop:backdrop-blur-md">
      <h3 id="transaction-heading" className="border-b border-line pb-3 font-mono text-sm uppercase">Add transaction</h3>
      <form onSubmit={submit} className="mt-4 space-y-3 font-mono text-xs">
        <fieldset className="flex gap-4">
          <legend className="mb-1 text-foreground-muted">Type</legend>
          <label><input className="accent-foreground" type="radio" name="type" checked={type === "expense"} onChange={() => setType("expense")} /> Expense</label>
          <label><input className="accent-foreground" type="radio" name="type" checked={type === "income"} onChange={() => setType("income")} /> Income</label>
        </fieldset>
        <label className="block">Transaction title<input autoFocus name="title" required className={fieldClass} /></label>
        <label className="block">Merchant / payee
          <input name="merchant" className={fieldClass} onChange={(event) => {
            if (!categoryTouched.current) setCategory(/\bair india\b/i.test(event.target.value) ? "Travel" : "Food & Dining");
          }} />
        </label>
        <label className="block">Amount (INR)<input name="amount" type="number" min="0.01" step="0.01" required className={fieldClass} /></label>
        <label className="block">Date<input name="date" type="date" defaultValue={defaultDate()} min={monthStart} max={monthEnd} required className={fieldClass} /></label>
        {type === "expense" && <>
          <label className="block">Category
            <select name="category" value={category} className={fieldClass} onChange={(event) => {
              categoryTouched.current = true;
              setCategory(event.target.value as TransactionCategory);
            }}>
              {budgets.filter(({ category }) => category !== "Investments & Savings").map(({ category }) =>
                <option key={category}>{category}</option>
              )}
            </select>
          </label>
          <label className="flex items-center gap-2"><input className="accent-foreground" name="oneOff" type="checkbox" /> One-off</label>
        </>}
        {error && <p role="alert" className="text-foreground-muted">{error}</p>}
        <div className="flex justify-end gap-3 pt-3">
          <button type="button" onClick={onClose} className="border border-line px-4 py-2 text-foreground-muted">Cancel</button>
          <button type="submit" className="bg-accent px-5 py-2 font-medium text-background">Commit Entry</button>
        </div>
      </form>
    </dialog>
  );
}
