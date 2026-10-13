---
name: rustfs-brand
description: Apply the official RustFS brand and design system (Signal Blue #0062FF, Oxide parity accent, Archivo Expanded / Geist / Geist Mono, square corners, shard-matrix graphics, bilingual zh/en copy rules) to anything RustFS-branded. Use this skill whenever the user asks for RustFS marketing or product visuals or copy — blog/OG covers, WeChat or social posts, ads and banners, slide decks, video thumbnails and title cards, posters, stickers, event materials, website sections, Console/UI components, diagrams, charts or release announcements — or asks to make something "on-brand", "in RustFS style", or to use RustFS colours, fonts, logo or tokens, even if they do not say "brand" or "design system".
---

# RustFS brand

RustFS is a Rust-native, S3-compatible distributed object store (Apache 2.0, self-hosted, erasure coding, bitrot protection, healing). Its identity turns the structure of erasure coding into a visual language: data shards in Signal Blue, a few parity shards in Oxide, everything square, exact and labelled. Brand line: "Every byte, accounted for." / 「每一个字节，都有着落。」

The full rules live in `references/DESIGN.md` (machine-readable tokens + prose, the Google DESIGN.md format). Read it once per task before designing anything. The other references are loaded only when the task needs them.

## Workflow

1. **Pin down the deliverable.** Channel, exact pixel size, language(s), and the one message it carries. If the user gives no size, take it from `references/formats.md`.
2. **Get the words right first.** Check `references/copy.md` for tone, terminology, the approved campaign lines and brand facts (every figure needs its source and date). Claims must be verifiable; no superlatives; label sample data as sample data. Never invent quotes, customers, metrics or program output.
3. **Choose the build path.**
   - *Static graphic* (cover, post, ad, slide, thumbnail, poster): copy `assets/artboard.html`, set the size, compose with the recipe from `references/formats.md`, then render with `node scripts/render.mjs <file.html> <out.png>`. Look at the PNG and fix problems before delivering.
   - *Web or product UI* in a Tailwind v4 project: import `assets/tailwind.css` (semantic names match shadcn/ui) and follow the Components section of `references/DESIGN.md`.
   - *Anything else* (Figma, Keynote, docs): use the hex values, type styles and spacing from `references/DESIGN.md`.
4. **Use only the brand graphics.** The stripe signature and the shard matrix (`references/graphics.md`; `scripts/matrix.mjs` emits a matrix SVG). Logos come from `assets/logo/` — never retype or redraw the wordmark.
5. **Check before you hand over** (list below), then tell the user what you made, its size and any assumption you had to make.

## The rules that matter most

- **Colour ratio** — neutrals ~60%, Signal Blue ~30%, Oxide ≤10% with one Oxide focal point at most. Oxide means parity or "look here first"; it never signals errors and never sits on a Signal Blue surface (parity turns Ink there). No other blues, no gradients, no glows.
- **Square everything** — radius 0 for cards, buttons, images, badges, status markers and app-icon masters. Only platform-imposed avatar crops are round.
- **Type** — Archivo at 125% width (`font-stretch:125%`) for display and numerals, 112% for headlines; Geist for text; Geist Mono uppercase with 0.08em tracking for labels. Chinese headings: zero tracking, line-height ≥ 1.15, a half-width space between Chinese and Latin/numbers, product name always `RustFS`.
- **Layout for artboards** — measure in u (1/100 of the short side); 7u safe margin; wordmark top-left at 4.25u; one mono label top-right; title in the left ~64%; the matrix on the right ~36% or along the bottom. Left-aligned. One message, one proof line, one call to action.
- **Surfaces** — Ink #0B0E14 (default stage), Paper #F4F6F9 (technical), White, Signal #0062FF (announcements). Wordmark is white on Ink/Signal and Signal Blue on light surfaces.
- **Motion** — write (shards appear in order, stepped) and heal (a shard drops to a dashed outline, parity flashes, it is rebuilt). Standard/emphasized/exit easings, 80–720ms, no bounce, honour reduced motion.

## Before you hand over

- The wordmark is an official SVG, unmodified, with clear space of half its height.
- Text sits inside the 7u margin; nothing overlaps unintentionally; the smallest text is readable at the size it will be seen (feeds shrink 1080px posts to ~320px).
- Oxide appears at most once as a focal point; no colours outside the palette.
- Every number has a unit; quoted figures have a source and a date; sample data says so.
- Both languages say the same thing when the piece is bilingual.
- You rendered the final file and actually looked at it.

## Files

- `references/DESIGN.md` — tokens and full rules (read first).
- `references/formats.md` — sizes, safe zones and layout recipes per channel.
- `references/copy.md` — voice, terminology (zh/en), approved lines, brand facts.
- `references/graphics.md` — logo usage, stripe signature, shard-matrix algorithm, icons, charts.
- `assets/artboard.html` — single-file starter for static graphics (fonts, tokens, wordmark, matrix generator).
- `assets/tailwind.css`, `assets/tokens.css` — generated design tokens.
- `assets/logo/*.svg` — wordmark, Flow S symbol and app icon in Signal, White and Ink.
- `scripts/render.mjs` — render an HTML artboard to PNG with headless Chrome (Node ≥ 22, no npm packages).
- `scripts/matrix.mjs` — print a shard-matrix SVG for any size and erasure layout.
