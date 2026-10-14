# Contributing to the RustFS Design System

This repository publishes the official RustFS design guidelines at `/en/` (default) and `/zh/`. Every page is public. Read this document before adding or changing a page or template.

## Stack

- Next.js 16 (App Router, static export), React 19, Tailwind CSS v4, shadcn/ui, pnpm.
- `tokens/tokens.json` is the single source of truth for design tokens. `pnpm tokens` regenerates `tokens/tokens.css`, `tokens/tailwind.css`, `lib/tokens.ts` and `public/tokens/*`. Never edit generated files by hand.
- `pnpm build` regenerates tokens and exports the site to `out/`.

## Writing for the guidelines

The guidelines are an official publication. Write them as standards, not as a report.

- State the rule directly. Use 应 / 须 / 不得 in Chinese and should / must / must not in English.
- Do not describe how a page was produced, what changed from a previous version, where sample copy came from, or what was found in older materials.
- Keep repository structure, commands and maintenance notes in `README.md` and this file, never on site pages.
- Cite figures with a source and a date, for example 「数据来源：RustFS 官方网站。统计日期：2026-10-14。」
- No superlatives, no hype, no emoji. Product claims must be verifiable against the RustFS repository or an official release.
- Every page is bilingual. Chinese and English carry the same meaning; translate the idea, not the word order. In Chinese text, put a space between Chinese and Latin characters or numbers, and write the product name as `RustFS`.

## Page structure

Each page lives at `app/[locale]/<slug>/page.tsx` and follows this order:

1. `PageHeader` with `path="s3://rustfs-brand/<slug>/"`, a label, title, subtitle in the other language, lede and meta.
2. `Section`s. The `tag` is the English section name; the `title` is localised with `t(zh, en)`.
3. `PageFooter slug="<slug>"`.

Call `setLocale(locale)` at the top of every page and layout. Use `t(zh, en)` or `<T zh en />` for page copy in server components and `useT()` in client components.

## Templates

Templates are artboards authored at native pixel size inside `<Template>` (`components/artboard/template.tsx`) and grouped in `<TemplateGrid>`.

- `w` and `h` are the native size. `themes` lists the surfaces the template supports; the first is the default. `langs` lists the languages its copy exists in. `file` is the export file stem. `span` sets the grid width out of 12.
- Artboard copy that exists in both languages uses `<L zh="…" en="…" />` so the artboard's language switch works. `<L>` only switches inside an artboard; on the page itself use `t(zh, en)`. Platform-specific templates (WeChat in Chinese, Medium in English) pass a single language.
- Measure everything in `u`, one hundredth of the artboard's short side. Use the `u-*` utilities (`u-text-8`, `u-gap-3`, `u-size-12`, `u-mt-4`). Values must be integers or quarter steps (`2.25`, `7.5`); other decimals do not compile.
- The safe margin is `--m` (7u). `ab-frame` places a column inside it; `ab-row` is a spaced row.
- Use the presets: `ab-logo` (wordmark at 4.25u; add a `u-h-*` class to change it), `ab-label` (mono caps), `ab-display` (Archivo 125%), `ab-head` (Archivo 112%), `ab-zh` (Chinese display), `ab-body`, `ab-url`, `ab-num` (tabular numerals).
- Use the surface colour utilities only: `text-ab-fg`, `text-ab-fg-2`, `text-ab-muted`, `border-ab-line`, `bg-ab-panel`, `bg-ab-data`, `bg-ab-parity`, `text-ab-brand`, `text-ab-accent`, `text-ab-on-data`. They follow the selected surface, so a template works on Ink, Paper, White and Signal.
- Brand components: `Wordmark`, `BrandSymbol`, `AppIcon`, `ShardMatrix`, `LiveMatrix`, `Stripe`, `Icon`, `QR`.
- Placeholders for third-party marks are dashed boxes labelled in mono caps. Never draw a partner's or customer's logo.
- Never invent quotes, customer names, metrics or program output. Commands come from the RustFS README or documentation.

- Preview-only guides (safe zones, crop circles, fold lines) carry the `no-export` class so they never appear in exported PNGs.
- Export PNGs with HarmonyOS Sans SC or Source Han Sans SC installed; without them Chinese headings fall back to the system face (PingFang SC tops out at Semibold).

## Visual rules

- Square corners everywhere. No drop shadows, gradient glows or blurred backgrounds.
- Signal Blue carries the layout. Oxide marks parity or the single focal point and stays near 10% of the area.
- One label, one title and one graphic per template. Left-aligned by default; centre only for symmetric formats such as stickers and avatars.
- Text never touches the safe margin and never overlaps a graphic unless the overlap is the design.

## Verification

1. `pnpm exec tsc --noEmit` and `pnpm lint`.
2. `pnpm build`, then serve `out/` and check `/en/<slug>/` and `/zh/<slug>/` at 1440px and 390px wide, in light and dark themes.
3. Render every artboard at native size and inspect each one for clipping, overflow, collisions and weak hierarchy. Fix and repeat until nothing obvious can be improved.
