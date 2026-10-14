# RustFS Design System

The official RustFS brand and design guidelines: logo, colour, typography, graphics, icons, data visualisation, motion and voice, with editable templates for advertising, article covers, slides, web, video, social and print. Every page is bilingual (`/zh/`, `/en/`).

The same rules are published for AI agents as [`DESIGN.md`](DESIGN.md) (Google design.md format) and as the [`rustfs-brand`](skills/rustfs-brand/SKILL.md) skill.

## Stack

Next.js 16 (App Router, static export) · React 19 · Tailwind CSS v4 · shadcn/ui · pnpm. This matches rustfs.com and the Console.

## Commands

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm tokens         # regenerate token files after editing tokens/tokens.json
pnpm skill          # regenerate tokens, sync the skill and package public/downloads/rustfs-brand.skill
pnpm build          # tokens + static export to out/
pnpm lint
pnpm typecheck
pnpm lint:design    # validate DESIGN.md with @google/design.md
```

## Structure

```text
tokens/tokens.json          single source of truth (W3C DTCG)
tokens/tailwind.css         generated Tailwind v4 theme, drop-in for shadcn/ui projects
tokens/tokens.css           generated CSS variables
DESIGN.md                   design spec for agents
skills/rustfs-brand/        agent skill (references, assets, scripts)
app/[locale]/<page>/        guideline and template pages
components/brand/           wordmark, symbol, icons, stripe, shard matrix, QR
components/artboard/        template artboards: fit, surface, language, edit, PNG export, presenter
components/site/            page primitives and interactive demos
public/brand/               logo SVG and PNG files
scripts/build-tokens.mjs    token generator and skill/download sync
```

## Editing rules

Read [CONTRIBUTING.md](CONTRIBUTING.md) before changing a page or adding a template. In short: the site is a public publication written as standards; every page is bilingual; templates measure in `u` (1/100 of the short side) and must work on every surface they list.

## Deployment

`pnpm run deploy` builds the static site to `out/` and publishes it to Cloudflare Workers static assets at https://design.rustfs.com (custom domain in `wrangler.jsonc`). Run `pnpm exec wrangler login` once first. Any static host can serve `out/` as well.

## Trademarks

The RustFS name and logo are trademarks of RustFS. The code in this repository is provided for building RustFS materials; it does not grant rights to the trademarks. See the terms of use on the Downloads page.
