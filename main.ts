// Entry point for makefun-x-reposts-02.
//
// The job here is deliberately small: take the list of this entry's X post
// addresses (POSTS.json in the repository root) and hand it to the grader by
// copying it into the output directory. Nothing is fetched, nothing is
// posted, and no secrets are involved — the posts themselves were already
// made on X by hand. Before copying, we sanity-check the file so a broken
// or placeholder list fails loudly here instead of silently reaching the
// grader.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// Where the repository lives and where the grader looks for the result.
// Both can be overridden through the environment; the defaults match the
// sandbox the bounty runs entries in.
const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// An entry's post address: an x.com or twitter.com status link, id digits
// only. Anything else is not a post address at all.
const POST_ADDRESS =
  /^https:\/\/(?:x\.com|twitter\.com)\/[^/]+\/status\/\d+$/;

// No entry may hand in fewer than one post, and the bounty caps the list
// at fifteen.
const MIN_POSTS = 1;
const MAX_POSTS = 15;

function fail(message: string): never {
  console.error(`makefun-x-reposts-02: ${message}`);
  process.exit(1);
}

const sourcePath = join(botDir, "POSTS.json");

let raw: string;
try {
  raw = readFileSync(sourcePath, "utf8");
} catch {
  fail(`could not read ${sourcePath} — is MAKEFUN_BOT_DIR pointing at the repository?`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch {
  fail(`${sourcePath} is not valid JSON`);
}

if (
  typeof parsed !== "object" ||
  parsed === null ||
  !("posts" in parsed) ||
  !Array.isArray((parsed as { posts: unknown }).posts)
) {
  fail(`${sourcePath} must be a JSON object with a "posts" array`);
}

const posts = (parsed as { posts: unknown[] }).posts;

if (posts.length < MIN_POSTS || posts.length > MAX_POSTS) {
  fail(
    `expected between ${MIN_POSTS} and ${MAX_POSTS} posts, found ${posts.length}`,
  );
}

for (const entry of posts) {
  if (typeof entry !== "string" || !POST_ADDRESS.test(entry)) {
    fail(`not a valid X status URL: ${String(entry)}`);
  }
  // The pattern above already requires digits after /status/, but pull the
  // id out explicitly so a bad id can be blamed by name, not by regex.
  const statusId = entry.split("/status/")[1];
  if (!/^\d+$/.test(statusId)) {
    fail(`post URL has a non-numeric status id: ${entry}`);
  }
}

// The list checks out. Make sure the destination exists, then write the
// file byte-for-byte as it was read — no reformatting, no reordering.
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "POSTS.json"), raw, "utf8");

console.log(
  `makefun-x-reposts-02: copied ${posts.length} post(s) from ${sourcePath} to ${join(outputDir, "POSTS.json")}`,
);
