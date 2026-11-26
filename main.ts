// "The Router Confesses" — make.fun micro entry.
// A household router finally owns up: it cut the Wi-Fi right at the film's
// climax, not by accident but on purpose, so the ending would belong to it
// alone after years of blinking unnoticed in a corner.
// This script is deliberately boring: one fixed sentence, no inputs, no
// randomness, no clock, no network. It echoes the sentence to stdout and
// saves the identical bytes to entry.txt inside the output directory.

import * as fs from "node:fs";
import * as path from "node:path";

// One sentence, assembled from its three beats so each beat reads on its own.
// Only the first seam carries the em dash; the second seam is a plain space,
// because the middle beat already ends in a comma.
const BEATS = [
  "I dropped the connection at the climax on purpose",
  "after years blinking alone in the corner,",
  "I wanted to be the only one who knows how it ends.",
];
const SENTENCE = `${BEATS[0]} — ${BEATS[1]} ${BEATS[2]}`;

// The bounty gate wants a single line of 1-200 characters, so refuse to
// emit anything that breaks that contract instead of writing it quietly.
function checkEntry(candidate: string): void {
  const glyphs = Array.from(candidate);
  if (candidate.trim() === "") {
    throw new Error("entry must contain visible text");
  }
  if (glyphs.length < 1 || glyphs.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${glyphs.length}`);
  }
  if (candidate.includes("\n") || candidate.includes("\r")) {
    throw new Error("entry must fit on one line");
  }
}

checkEntry(SENTENCE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), SENTENCE, "utf8");
console.log(SENTENCE);
