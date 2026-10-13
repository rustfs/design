# Logo, brand graphics, icons and charts

## Logo

- **Wordmark** (`assets/logo/rustfs-wordmark*.svg`, viewBox 360 × 60.6): the primary logo. Custom letterforms — never retype it in a font, never stretch, outline, rotate, recolour, add effects or remove the arrows inside the final S.
- **Flow S symbol** (`rustfs-symbol*.svg`): the final S of the wordmark with two arrows (data in and out). Use alone only where the wordmark does not fit: avatars, favicons, app icons, stickers. Never place it next to the wordmark.
- **App icon** (`rustfs-app-icon*.svg`): symbol at 94% scale on a square Signal or Ink field. Masters are square; platforms apply their own corner masks.
- Colour versions: Signal on White/Paper (primary), White on Signal, White on Ink, Ink on White (one colour), Signal on Ink only for large display (wordmark ≥ 160px wide).
- Clear space: ½ of the wordmark height on every side; symbol 25% of its width. Minimum: wordmark 72px / 18mm; symbol and app icon 16px / 5–6mm.
- Lockups (only these): wordmark + brand line (H apart, Geist Mono caps at ⅓H); product lockup "RUSTFS | Console" (1px rule, ½H spacing, Geist Medium at cap height H); co-brand "RUSTFS × Partner" (equal heights, light ×, H apart); signature "RUSTFS ▪▪▪▪▪▪" (stripe shards ⅓H).

## Stripe signature

An EC 4+2 stripe: four data squares then two parity squares, gap = 32% of the square. Data = Signal Blue, parity = Oxide; on Signal surfaces data = White, parity = Ink. Use once per layout as a sign-off, divider or corner mark. A version with one dashed (missing) data square may illustrate healing. Never change the count, order, colours or shape.

## Shard matrix

Columns are drives, rows are stripes. Each stripe holds k data shards and m parity shards across n = k + m drives (a matrix wider than n repeats the pattern). Parity shifts `shift` drives per stripe, which produces diagonal Oxide bands.

```
for each row y, column x:
  pos = ((x - y*shift) mod n + n) mod n
  cell = pos >= k ? parity : data
```

Variants: **solid** (default key visual); **tone** (data cells in three opacities 1 / 0.6 / 0.34 — parity always full); **outline** (data as 1px outlines, parity filled, so parity becomes the focus); **sparse**; **dissolve** (cells drop out toward an edge to make room for type — drop cells, never fade colours); **dead** (whole columns as dashed outlines = failed drives; use for fault-tolerance messages, never more dead columns than m if the message is "data survives"); **missing** (scattered dashed cells = shards being healed). Cell gap 18–25% of the cell. Generate with `scripts/matrix.mjs`; never place squares by hand. Don't lay translucent scrims over a matrix; dissolve it or shrink its area instead.

Placement: right 36% of a cover (full-bleed, fit slice), a bottom band, a full-bleed background for posters, or a small 6×6 block as a diagram.

## Icons

24px grid, 2px padding (20 × 20 live area), 1.5px stroke, square caps, miter joins, `currentColor`; fills only for a written/current shard. Sizes 16/20/24/32; ≥ 48px may drop to a 1px stroke. Icons sit beside labels and share their colour. Names include bucket, object, prefix, shard, stripe, erasure-set, drive, node, cluster, pool, heal, shield, replicate, site, versions, lock, key, vault, user, policy, lifecycle, tier, quota, event, webhook, audit, metrics, api, console, terminal, container, gauge, branch, migrate, select, table, download, upload, arrow-right, arrow-up-right, check, close, plus, copy, external, menu, edit, image, play, pause, replay.

## Charts and diagrams

- Bars start at zero; axes are never truncated; one scale per chart set; the title states the finding.
- RustFS = Signal Blue (series 1); comparisons = neutral greys; Oxide highlights one point or event. Categorical order: #0062FF, #FF5E14, #00AEAE, #7D5BE6, #F7AE0C, #61C3F9, #02A855, #9AA0AC.
- Flat only: no 3D, no pies, no gradients, no rounded bars. Square markers. Label lines directly at their ends.
- Every chart shows units, environment, versions, date and source; sample data says "Sample data / 示例数据".
- Benchmarks: like-for-like environments only; never a single-run peak; state hardware, network, topology (e.g. EC 2+2), workload and date.
- Diagrams: 1px outlines, square corners, orthogonal connectors with solid arrowheads; RustFS components blue, external systems neutral, one Oxide path; component names in Geist Semibold, ports and paths in Geist Mono.
