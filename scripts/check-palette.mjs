import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const globalStyles = "src/app/globals.css";
const css = readFileSync(globalStyles, "utf8");
const palette = Object.fromEntries(
  [...css.matchAll(/--([a-z-]+):\s*(#[a-f\d]{6});/gi)].map(([, token, hex]) => [token, hex]),
);

const allowed = [
  ["text", "bg"], ["text", "surface"], ["text", "line"],
  ["text-secondary", "bg"], ["text-secondary", "surface"],
  ["text-muted", "bg"],
  ["bg", "text"], ["bg", "text-secondary"], ["bg", "text-muted"],
  ["danger", "bg"], ["warn", "bg"],
];
const rejected = [
  ["danger", "surface"], ["text-muted", "surface"], ["text-secondary", "line"], ["bg", "line"],
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

for (const pair of [...allowed, ...rejected]) {
  const ratio = contrast(pair);
  const expectedPass = allowed.includes(pair);
  console.log(pair.join(" on "), ratio.toFixed(2), expectedPass ? "AA" : "unused");
  assert.equal(ratio >= 4.5, expectedPass, pair.join(" on "));
}

function checkSource(path) {
  if (path === globalStyles) return;
  assert.doesNotMatch(readFileSync(path, "utf8"), /#[a-f\d]{3,8}\b|\brgba?\(\s*\d/gi, path);
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
