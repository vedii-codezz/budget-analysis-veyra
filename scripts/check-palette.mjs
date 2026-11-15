import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const globalStyles = "src/app/globals.css";
const css = readFileSync(globalStyles, "utf8");
const palette = Object.fromEntries(
  [...css.matchAll(/--([a-z-]+):\s*(#[a-f\d]{6});/gi)].map(([, token, hex]) => [token, hex]),
);

const textPairs = [
  ["text", "bg"], ["text", "surface"],
  ["text-secondary", "bg"], ["text-secondary", "surface"],
  ["text-muted", "bg"], ["text-muted", "surface"],
  ["accent", "bg"], ["accent", "surface"],
  ["bg", "accent"], ["bg", "text"], ["bg", "text-secondary"],
  ["danger", "bg"], ["warn", "bg"],
];
const unusedPairs = [
  ["danger", "surface"], ["text-secondary", "line"], ["bg", "line"],
];

function luminance(hex) {
  const channels = hex.slice(1).match(/../g).map((channel) => {
    const intensity = parseInt(channel, 16) / 255;
    return intensity <= 0.04045 ? intensity / 12.92 : ((intensity + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrast([text, background]) {
  const foreground = luminance(palette[text]);
  const surface = luminance(palette[background]);
  return (Math.max(foreground, surface) + 0.05) / (Math.min(foreground, surface) + 0.05);
}

for (const pair of textPairs) {
  const ratio = contrast(pair);
  console.log(pair.join(" on "), ratio.toFixed(2), "AA");
  assert.ok(ratio >= 4.5, pair.join(" on "));
}

for (const pair of unusedPairs) {
  console.log(pair.join(" on "), contrast(pair).toFixed(2), "unused");
}

function checkSource(path) {
  if (path === globalStyles) return;
  assert.doesNotMatch(readFileSync(path, "utf8"), /#[a-f\d]{3,8}\b|\b(?:rgba?|hsla?)\(\s*[-.\d]|\b(?:bg|text|border|fill|stroke|shadow|outline|ring)-(?:black|white|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(?=[\s/"-])/gi, path);
}

function walk(folder) {
  for (const entry of readdirSync(folder, { withFileTypes: true })) {
    const path = join(folder, entry.name).replaceAll("\\", "/");
    if (entry.isDirectory()) walk(path);
    else if (/\.(?:tsx?|css)$/.test(path)) checkSource(path);
  }
}
walk("src");
checkSource("tailwind.config.ts");
