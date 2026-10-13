# Formats and layout recipes

All artboards measure in **u = 1/100 of the short side**. Safe margin **m = 7u**. Wordmark height **4.25u**, label size **2.25u** (mono, caps, 0.08em). Quarter steps only (2.25u, 7.5u) keep sizes consistent. Thin banners (ratio ≥ 3:1) raise label and body sizes by about 1.5× because u is small.

## Contents
1. Covers (blog / OG / WeChat / communities / newsletter)
2. Social
3. Advertising
4. Slides
5. Video
6. Print and events
7. Composition recipes

## 1. Covers

| Use | Size | Notes |
|---|---|---|
| Blog OG, X, LinkedIn, Slack | 1200 × 630 | X trims ~3% top/bottom; keep content inside 7u |
| WeChat article cover (公众号头条) | 900 × 383 | upload a separate 1:1 for chat shares |
| WeChat secondary / share thumbnail | 600 × 600 | shown ~64px: one big word or the symbol |
| Juejin / Zhihu / CSDN / SegmentFault | 1600 × 900 | lists shrink to ~240px wide; title ≥ 8u |
| Medium / dev.to | 1000 × 420 | Medium crops a square from the left |
| Newsletter header | 1200 × 400 | repeat the title in the email body |

Cover skeleton: wordmark top-left · one label top-right (category · date or read time) · title left ≤ 64% (Chinese ≤ 2 lines/18 chars, English ≤ 3 lines) · graphic right 36% or bottom band · optional URL bottom-left (mono, 2.5u).
Series covers keep one surface per series; a large outlined issue number (real order) may sit bottom-right.

## 2. Social

| Use | Size | Notes |
|---|---|---|
| Avatar | 400 × 400 | Flow S on Signal; circular crop — keep the symbol inside the inner 70% |
| GitHub social preview | 1280 × 640 | keep a 40px border clear |
| X header | 1500 × 500 | avatar overlaps bottom-left ~ 0–400px × 300–500px |
| LinkedIn company cover | 1128 × 191 | centre band only |
| YouTube channel art | 2560 × 1440 | safe area 1546 × 423 centred |
| Square post | 1080 × 1080 | test legibility at 320px |
| Portrait post / carousel | 1080 × 1350 | carousel numbers 1/4…4/4 are real order |
| Story / Reels / Shorts / 视频号 | 1080 × 1920 | keep top 14%, bottom 20%, right 12% free of key content |
| Xiaohongshu note | 1080 × 1440 | Chinese |

## 3. Advertising

IAB display: 300×250, 728×90, 160×600, 300×600, 320×50, 970×250. Social feed: 1080×1080, 1080×1350, 1080×1920, link ad 1200×628. Outdoor: billboard 3:1 (e.g. 2400×800), metro lightbox 1200×1800, A2 poster 1190×1684 (production at 300 dpi + 3mm bleed).

Every ad = wordmark + one message + one proof line/footnote + one CTA. CTA is a square button whose label is a verb ("Download RustFS" / 「下载 RustFS」, "Read the docs" / 「阅读文档」). Tiny sizes (320×50, 728×90): wordmark + ≤ 5 English words / 8 Chinese characters + CTA, nothing else. HTML5 banners: ≤ 15 s, ≤ 3 loops, end on the full static frame, nothing flashing faster than 3 Hz.

## 4. Slides

1920 × 1080, 12 columns, 96px outer margin. Header: wordmark + section label. Footer: slide number `07 / 18` in mono, deck or event name, stripe signature. One idea per slide; titles ≤ 2 lines; body ≥ 28px; ≤ 6 bullets; numbers with units and sources. Layout set: cover (Ink / Signal), agenda, section divider, statement, title + bullets + visual, two columns, three features with icons, big numbers, chart, architecture, code, comparison table, principle quote (never a fabricated person), timeline, speaker, image + caption, closing with QR.

## 5. Video

1920 × 1080 at 25/30/60 fps; title-safe 90%, action-safe 93%. Opener ~3.2 s: stripe writes in (60ms/shard) → heal → wordmark reveals letter by letter → brand line → hold. Lower third: name / title / affiliation, left-aligned in the bottom-left safe area. Captions: Chinese ≤ 16 characters per line, English ≤ 42, two lines max. Thumbnails: YouTube 1280×720 (readable at 168×94), Bilibili 1146×717. End card: leave dashed zones for platform elements. Vertical covers 1080×1920 with the story safe zones above.

## 6. Print and events

Production at 300 dpi with 3mm bleed and 5mm safe zone; artboards are proportional proxies. Business card 90×54mm (1080×648 proxy), A4 letterhead (1240×1754), DL envelope (1100×550), badge 100×140mm (1000×1400), booth backdrop 3000×2400mm (1500×1200; key message 1.2–1.8m above the floor), roll-up 850×2000mm (850×2000; nothing important in the bottom 20cm). Minimum wordmark 18mm wide, symbol 5mm, type 6pt. Reference CMYK (confirm on a printed proof; no Pantone match is specified): Signal Blue C90 M60 Y0 K0, Oxide C0 M70 Y95 K0, Ink large areas C60 M40 Y20 K100 (rich black), Ink type and rules K100.

## 7. Composition recipes

- **Hero number** (release, milestone): label top-right, a small brand-blue "RustFS" over a huge Archivo 125% number (≈27u, line-height 0.82, tracking −0.035em), one-line subtitle, matrix full-height on the right 36% (fit: slice).
- **Explainer** (engineering, tutorial): title top-left 8u; bottom half holds one diagram (object → D1–D4 + P1–P2 shards labelled by drive) or a terminal with real commands only.
- **Announcement** (partnership, event): Signal surface; lockup "RUSTFS × [partner placeholder]" at equal heights; headline below; single-row stripe along the bottom margin.
- **Statement** (campaign line): Ink surface; the line in Archivo 125% across the left; the matrix with dead columns or missing shards illustrating the claim; footnote in mono at the bottom.
- **Data** (stats, newsletter): numbers in Archivo 125% with mono labels under a 1px rule; source and date line in mono.
