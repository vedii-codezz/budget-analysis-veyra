import assert from "node:assert/strict";
import { test } from "node:test";
import { deriveFinance, transactions } from "./index.ts";

import { formatSignedNumber } from "../utils/currency.ts";

const metrics = deriveFinance(transactions);

test("river balances to income, with cash retained as its liquid buffer", () => {
  assert.equal(Object.values(metrics.river).reduce((total, amount) => total + amount, 0), metrics.income);
  assert.equal(metrics.river.cashRetained, metrics.cashRetained);
  assert.equal(metrics.cashRetained, 17920);
});

test("weekend premium comes from the two daily averages", () => {
  assert.equal(metrics.weekendPremiumPct, (metrics.weekendAvg / metrics.weekdayAvg - 1) * 100);
});

test("score equals the base plus its displayed signal points", () => {
  assert.equal(metrics.health.score, metrics.health.base + metrics.health.signals.reduce((total, signal) => total + signal.points, 0));
});

test("micro insight is backed by 14 expenses below 300 totalling 3840", () => {
  assert.equal(metrics.microPurchases.count, 14);
  assert.ok(metrics.microPurchases.entries.every(({ amount }) => amount < 300));
  assert.equal(metrics.microPurchases.total, 3840);
  assert.equal(metrics.microPurchases.share, 3840 / metrics.consumption * 100);
});

test("a one-off can create a deficit without changing food pacing or stability", () => {
  const next = deriveFinance([...transactions, {
    id: "test-one-off", amount: 24000, type: "expense", category: "Food & Dining",
    date: "2026-08-31", title: "One-off meal", merchant: "Test", oneOff: true,
  }]);
  assert.equal(next.cashRetained, -6080);
  assert.ok(next.cashRetainedRate < 0);
  assert.equal(next.foodPacingPct, metrics.foodPacingPct);
  assert.equal(next.health.signals.find(({ id }) => id === "stability").points,
    metrics.health.signals.find(({ id }) => id === "stability").points);
  assert.equal(next.budgetUsage.find(({ category }) => category === "Food & Dining").status, "exceeded");
});

test("additional income increases cash retained without contributing to outflows", () => {
  const next = deriveFinance([...transactions, {
    id: "test-pay", amount: 250, type: "income", category: "Income",
    date: "2026-08-31", title: "Extra pay", merchant: "Test",
  }]);
  assert.equal(next.cashRetained, metrics.cashRetained + 250);
  assert.equal(next.deployed, metrics.deployed);
  assert.equal(next.microPurchases.total, metrics.microPurchases.total);
});

test("budget warning starts above 90 percent and breach starts above the cap", () => {
  for (const [amount, status] of [[1800, "healthy"], [1801, "warning"], [2000, "warning"], [2001, "exceeded"]]) {
    const result = deriveFinance([...transactions, {
      id: "cap-threshold", amount, type: "expense", category: "Other",
      date: "2026-08-22", title: "Cap threshold", merchant: "Test",
    }]);
    assert.equal(result.budgetUsage.find(({ category }) => category === "Other").status, status);
  }
});

test("benchmark delta uses a single sign and points", () => {
  assert.equal(formatSignedNumber(metrics.cashRetainedRate - 30, 1, " pts"), String.fromCharCode(8722) + "11.1 pts");
  assert.equal(formatSignedNumber(2, 1, " pts"), "+2.0 pts");
  assert.equal(formatSignedNumber(-0.001, 1, " pts"), "0.0 pts");
  assert.equal(metrics.health.base, 50);
  assert.ok(metrics.health.signals.find(({ id }) => id === "retention").points < 0);
});

test("Flight to Mumbai breaches Travel and lowers the score", () => {
  const flight = {
    id: "flight-test", title: "Flight to Mumbai", merchant: "Air India",
    type: "expense", amount: 24000, category: "Travel", date: "2026-08-31",
  };
  const next = deriveFinance([...transactions, flight]);
  assert.equal(next.cashRetained, -6080);
  assert.ok(next.cashRetainedRate < 0);
  assert.ok(next.health.score < metrics.health.score);
  const travel = next.budgetUsage.find(({ category }) => category === "Travel");
  assert.equal(travel.percentage, 480);
  assert.equal(travel.status, "exceeded");
  assert.equal(next.river.cashRetained, -6080);
  assert.equal(next.categorySpend.Travel, 24000);
});
