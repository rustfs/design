---
version: alpha
name: RustFS
description: Design system for RustFS, the Rust-native, S3-compatible distributed object storage. Square, exact and structural; Signal Blue carries the brand, Oxide marks parity and the single focal point.
colors:
  primary: "#0062FF"
  primary-hover: "#014FDD"
  on-primary: "#FFFFFF"
  primary-on-dark: "#5C99FF"
  parity: "#FF5E14"
  on-parity: "#0B0E14"
  parity-text: "#B33A10"
  parity-text-on-dark: "#FE8F5D"
  ink: "#0B0E14"
  paper: "#F4F6F9"
  surface: "#FFFFFF"
  surface-alt: "#F4F6F9"
  surface-sunken: "#EAEDF2"
  on-surface: "#0B0E14"
  on-surface-subtle: "#424853"
  on-surface-muted: "#5A616D"
  outline: "#DCE0E6"
  outline-strong: "#C4C9D2"
  surface-dark: "#0B0E14"
  surface-dark-alt: "#13171E"
  on-surface-dark: "#F4F6F9"
  on-surface-dark-muted: "#9AA0AC"
  outline-dark: "#2B313A"
  success: "#037E3F"
  warning: "#A06604"
  error: "#C51B32"
  info: "#014FDD"
  status-online: "#02A855"
  status-degraded: "#F7AE0C"
  status-offline: "#E42E41"
  chart-1: "#0062FF"
  chart-2: "#FF5E14"
  chart-3: "#00AEAE"
  chart-4: "#7D5BE6"
  chart-5: "#F7AE0C"
  chart-6: "#61C3F9"
  chart-7: "#02A855"
  chart-8: "#9AA0AC"
typography:
  display-xl:
    fontFamily: Archivo
    fontSize: 96px
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: -0.025em
    fontVariation: "'wdth' 125"
  display-lg:
    fontFamily: Archivo
    fontSize: 72px
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: -0.02em
    fontVariation: "'wdth' 125"
  display-md:
    fontFamily: Archivo
    fontSize: 56px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: -0.02em
    fontVariation: "'wdth' 125"
  headline-lg:
    fontFamily: Archivo
    fontSize: 40px
    fontWeight: 750
    lineHeight: 1.08
    letterSpacing: -0.01em
    fontVariation: "'wdth' 112"
  headline-md:
    fontFamily: Archivo
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.01em
    fontVariation: "'wdth' 112"
  headline-sm:
    fontFamily: Geist
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.005em
  title:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.7
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  button:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1
  label-md:
    fontFamily: Geist Mono
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Geist Mono
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.08em
  code:
    fontFamily: Geist Mono
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.65
  numeral:
    fontFamily: Archivo
    fontSize: 48px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: -0.02em
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 125"
rounded:
  none: 0px
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
  gutter: 16px
  container: 1240px
  columns: 12
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    height: 40px
    padding: 0 16px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    height: 40px
    padding: 0 16px
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    height: 40px
    padding: 0 16px
  button-on-dark:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    height: 40px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    height: 40px
    padding: 0 12px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: 24px
  card-dark:
    backgroundColor: "{colors.surface-dark-alt}"
    textColor: "{colors.on-surface-dark}"
    rounded: "{rounded.none}"
    padding: 24px
  label:
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.label-md}"
  code-block:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-surface-dark}"
    typography: "{typography.code}"
    rounded: "{rounded.none}"
    padding: 16px
  status-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.none}"
    height: 24px
    padding: 0 8px
  link:
    textColor: "{colors.primary-hover}"
    typography: "{typography.body-md}"
  link-on-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.primary-on-dark}"
  parity-marker:
    backgroundColor: "{colors.parity}"
    textColor: "{colors.on-parity}"
    rounded: "{rounded.none}"
    size: 10px
  alert-error:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
  alert-success:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.success}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
  alert-warning:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.warning}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
  alert-info:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.info}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
  section-alt:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.on-surface-subtle}"
  artboard-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  artboard-signal:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  artboard-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-surface-dark}"
  caption-on-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-surface-dark-muted}"
    typography: "{typography.label-sm}"
  parity-label:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.parity-text}"
    typography: "{typography.label-sm}"
  parity-label-on-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.parity-text-on-dark}"
    typography: "{typography.label-sm}"
  divider:
    backgroundColor: "{colors.outline}"
    height: 1px
  divider-strong:
    backgroundColor: "{colors.outline-strong}"
    height: 1px
  divider-dark:
    backgroundColor: "{colors.outline-dark}"
    height: 1px
  status-marker-online:
    backgroundColor: "{colors.status-online}"
    rounded: "{rounded.none}"
    size: 10px
  status-marker-healing:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.none}"
    size: 10px
  status-marker-degraded:
    backgroundColor: "{colors.status-degraded}"
    rounded: "{rounded.none}"
    size: 10px
  status-marker-offline:
    backgroundColor: "{colors.status-offline}"
    rounded: "{rounded.none}"
    size: 10px
  chart-series-1:
    backgroundColor: "{colors.chart-1}"
  chart-series-2:
    backgroundColor: "{colors.chart-2}"
  chart-series-3:
    backgroundColor: "{colors.chart-3}"
  chart-series-4:
    backgroundColor: "{colors.chart-4}"
  chart-series-5:
    backgroundColor: "{colors.chart-5}"
  chart-series-6:
    backgroundColor: "{colors.chart-6}"
  chart-series-7:
    backgroundColor: "{colors.chart-7}"
  chart-series-8:
    backgroundColor: "{colors.chart-8}"
---

# RustFS Design System

The full, illustrated guidelines are published at the RustFS design site (`/en/` and `/zh/`). Tokens in this file mirror `tokens/tokens.json`; when they disagree, `tokens/tokens.json` wins. Tailwind v4 projects should import `tokens/tailwind.css`, whose semantic variable names match shadcn/ui (`--background`, `--primary`, `--muted-foreground`, `--ring`, …) plus RustFS roles (`--brand`, `--parity`, `--subtle`, `--faint`, `--surface`, `--stage`).

## Overview

RustFS is a distributed object storage system built in Rust: S3-compatible, Apache 2.0 licensed, self-hosted, with erasure coding, bitrot protection and healing. The brand line is "Every byte, accounted for." (Chinese: 「每一个字节，都有着落。」).

The audience is platform, SRE and AI-infrastructure engineers who hand RustFS the data they cannot lose. The interface and every marketing surface must feel **exact, candid, engineered and open**: like a carefully set system diagram, never like hype. Personality limits: exact but not cold, candid but not alarmist, engineered but not jargon-heavy, open but not sloppy.

Four principles decide every layout:

1. **Show the structure.** Organise with grids, shards, stripes and mono labels. Brand graphics come from the real structure of erasure coding.
2. **Exact over loud.** Real numbers with units, sources and dates replace adjectives.
3. **Blue carries, Oxide checks.** Neutrals ~60%, Signal Blue ~30%, Oxide ≤10% and only one Oxide focal point per screen.
4. **Square, flat, predictable.** Square corners, 1px rules, no drop shadows or glows, motion in steps without bounce.

## Colors

- **Signal Blue `primary` (#0062FF)** is the logo colour and the only brand blue. It carries primary actions, links, selected states, data shards and RustFS in charts. Never substitute another blue. Small text and links on white use `primary-hover` (#014FDD, 6.6:1); text on dark surfaces uses `primary-on-dark` (#5C99FF).
- **Oxide `parity` (#FF5E14)** is the parity colour. It marks parity shards, preview features and the single thing to see first. It is never used for errors or warnings, never floods large areas, and never sits on a Signal Blue surface (parity turns Ink there). Oxide text uses `parity-text` (#B33A10) on light and `parity-text-on-dark` (#FE8F5D) on dark.
- **Neutrals** are a cool grey with a slight blue bias (hue 262). `ink` (#0B0E14) is the dark surface and primary text colour; `paper` (#F4F6F9) is the light alternate surface. Supporting text on light surfaces is never lighter than `on-surface-muted` (#5A616D, 6.2:1).
- **Status colours** describe drive and cluster health and always pair with a text label and a square marker: online (green), healing (blue), degraded (amber), offline (red).
- **Charts** use `chart-1` … `chart-8` in order. RustFS is always series 1 (Signal Blue); comparison series use neutrals; Oxide highlights one point.
- **Surface modes** for fixed artboards (covers, ads, slides): Ink (default stage), Paper (technical content), White, and Signal (announcements). On Signal, data shards are white and parity is Ink.
- Body text must reach 4.5:1 contrast; large text 3:1. The dark theme mirrors the light one through the semantic roles in `tokens/tailwind.css`.

## Typography

- **Archivo** (variable, SIL OFL) at **125% width** (`font-stretch: 125%` or `'wdth' 125`) for display, numerals and version numbers; **112% width** for headlines. Weights 700–800. It echoes the wide, heavy construction of the RUSTFS wordmark. Never use Archivo below 100% width.
- **Geist** for body and interface text (400/500/600).
- **Geist Mono** for labels, data, paths, code and eyebrows. Labels are uppercase with 0.08em tracking.
- **Chinese**: HarmonyOS Sans SC or Source Han Sans SC (web fallback PingFang SC, Microsoft YaHei). Chinese headings use zero tracking (never negative), line-height ≥ 1.15, Bold/Heavy weights, no synthetic bold or italics. Put a half-width space between Chinese and Latin letters or numbers. Chinese quotes use 「」.
- Numbers: tabular figures in data; ISO dates (2026-10-14); versions without a "v" prefix (1.0.1); binary sizes in KiB/MiB/GiB; erasure layouts written `EC 4+2`.
- A block uses four levels at most: mono eyebrow → Archivo headline → Geist body → data.
- Tailwind exposes each style as a `type-*` utility (`type-display-xl`, `type-headline-md`, `type-label-md`, `type-numeral`).

## Layout

- Web: 12-column grid, content max 1240px, side gutter ≥ 16px (4 columns < 640px, 8 columns 640–1023px, 12 columns ≥ 1024px). Spacing on a 4px base (Tailwind's default `--spacing`).
- Sections: a mono eyebrow, a headline on the left (5/12) and the lede on the right (7/12), specimens full width below. Generous vertical rhythm (72–128px between sections).
- Fixed artboards measure in **u = 1/100 of the short side**; the safe margin is **7u**. The wordmark sits top-left at 4.25u tall, a single mono category label top-right at 2.25u, the title in the left ~64%, and the brand graphic on the right ~36% or along the bottom edge.
- Left-align by default. Centre only symmetric formats (stickers, avatars, square posts with a single figure).

## Elevation & Depth

The design is flat. Separate layers with 1px borders (`outline` #DCE0E6 light, #2B313A dark) and tonal surfaces (`surface` → `surface-alt` → `surface-sunken`). The only shadow is for overlays (popovers, dialogs, menus): `0 24px 48px -16px rgba(11,14,20,0.28)`. No glows, gradients, glassmorphism or blurred backgrounds.

## Shapes

All corners are square (`rounded.none`): buttons, inputs, cards, images, charts, badges, app icon masters and stickers. `rounded.full` exists only where a platform forces a circular crop (social avatars). Status markers are squares, never dots or pills. The shard (a filled square) is the basic shape of the brand.

## Components

- **Buttons**: square, 40px tall (32 small, 48 large), Geist Medium 14px. Primary = Signal Blue with white text; secondary = sunken neutral; outline = 1px border; on dark surfaces, a white button with Ink text. Labels start with a verb that names the result ("Download RustFS", "Create bucket"). Hover lifts 1px and a light sheen sweeps across (420ms emphasized); press returns and scales to 98.5% (80ms).
- **Inputs**: square, 1px `outline-strong` border, 40px tall; focus shows a 2px Signal ring with 2px offset; errors show red text below with the cause and fix.
- **Cards**: 1px border, 24px padding, no shadow, no coloured side rail. Hover turns the border to the foreground colour and nudges the arrow icon 2px (240ms).
- **Status chips**: square marker + mono label; online green, healing blue (animated heal), degraded amber, offline red, preview Oxide.
- **Code blocks**: always Ink background in both themes, Geist Mono 13–14px, with a copy button.
- **Tables**: mono uppercase header labels on `surface-alt`; numbers right-aligned with tabular figures.
- **Icons**: 24px grid, 1.5px stroke, square caps, miter joins, `currentColor`; fills only for a written/current shard.
- **Brand graphics** — the only two allowed:
  - *Stripe signature*: 4 Signal Blue squares + 2 Oxide squares (an EC 4+2 stripe), gap 32% of the square, used once per layout as a sign-off, divider or corner mark.
  - *Shard matrix*: columns = drives, rows = stripes; each stripe has k data shards and m parity shards, and parity shifts one drive to the right per stripe (diagonal Oxide bands). Variants: solid, tone (three data shades), outline, sparse, dissolve toward a corner, dead drive columns (dashed), missing shards. Generate it by the rule; never arrange squares by hand.
- **Logo**: the RUSTFS wordmark is the primary logo (Signal Blue on light, white on Ink/Signal, Ink for one colour). The Flow S (the wordmark's final S with two arrows) is the standalone symbol for avatars, favicons and app icons. Clear space ½ of the wordmark height; minimum 72px / 18mm wide. In text the name is always "RustFS".
- **Motion**: easings `standard` cubic-bezier(0.2,0,0,1), `emphasized` cubic-bezier(0.16,1,0.3,1), `exit` cubic-bezier(0.4,0,1,1); durations 80 / 150 / 240 / 420 / 720ms; stagger 40–60ms. Brand moves: **write** (shards appear stripe by stripe, stepped) and **heal** (a shard drops to a dashed outline, parity flashes, the shard is rebuilt). No springs, bounce or parallax. Respect `prefers-reduced-motion`.
- **Copy**: verifiable claims with conditions and sources; no superlatives ("fastest", "100% compatible", "military-grade"); preview features labelled Preview; errors say what happened, why and how to fix it.

## Do's and Don'ts

- Do use Signal Blue #0062FF exactly; don't introduce other blues, purple-to-blue gradients or neon glows.
- Do keep Oxide to parity and one focal point; don't use Oxide for errors or large floods.
- Do keep every corner square; don't use rounded cards, pill badges, circular status dots or rounded app-icon masters.
- Do draw the shard matrix by the erasure rule; don't scatter random squares, dots or abstract light effects.
- Do use real product screenshots, real hardware and event photos; don't use stock imagery or AI-generated illustrations.
- Do label sample data as sample data and cite sources and dates; don't publish single-run peaks, truncated axes, 3D or pie charts.
- Do set Archivo at 112–125% width; don't retype the wordmark in any font, stretch, outline, rotate or recolour it.
- Do put one message, one proof line and one call to action in an ad; don't stack multiple messages, emoji or hashtags in graphics.
- Do write bilingual copy that carries the same meaning; don't translate word by word or translate the product name.
- Do respect reduced-motion preferences; don't flash more than three times per second.
