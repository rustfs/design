// Generates every token artefact from tokens/tokens.json (the single source of truth).
//   tokens/tokens.css     plain CSS custom properties, light + dark
//   tokens/tailwind.css   Tailwind v4 theme (drop-in for rustfs.com and the console)
//   lib/tokens.ts         resolved values for the documentation pages
//   public/tokens/*       downloadable copies
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, cpSync, rmSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = JSON.parse(readFileSync(join(root, 'tokens/tokens.json'), 'utf8'));
const HEADER = `/* RustFS Design System tokens · generated from tokens/tokens.json by scripts/build-tokens.mjs. Do not edit by hand. */\n`;

const get = (path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), src);
const resolve = (v, seen = new Set()) => {
  if (typeof v === 'string' && /^\{[^}]+\}$/.test(v)) {
    const p = v.slice(1, -1);
    if (seen.has(p)) throw new Error('circular reference ' + p);
    seen.add(p);
    const t = get(p);
    if (!t || !('$value' in t)) throw new Error('broken reference ' + v);
    return resolve(t.$value, seen);
  }
  return v;
};
const refVar = (v) => {
  // {color.blue.500} -> var(--color-blue-500); {color.dataviz.1} -> resolved hex
  if (typeof v === 'string' && /^\{color\.(blue|oxide|neutral|green|amber|red|teal|violet|sky)\.\d+\}$/.test(v)) {
    return `var(--color-${v.slice(7, -1).replace('.', '-')})`;
  }
  return resolve(v);
};
const entries = (group) => Object.entries(group).filter(([k]) => !k.startsWith('$'));
const fam = (arr) => arr.map((f) => (/[\s]/.test(f) && !f.startsWith('var(') ? `"${f}"` : f)).join(', ');
const bezier = (a) => `cubic-bezier(${a.join(', ')})`;

// ---------- collect primitives ----------
const SCALES = ['blue', 'oxide', 'neutral', 'green', 'amber', 'red', 'teal', 'violet', 'sky'];
const primitives = [];
for (const s of SCALES) for (const [step, t] of entries(src.color[s])) primitives.push([`--color-${s}-${step}`, t.$value, t.$description]);
const brandNamed = entries(src.color.brand).map(([k, t]) => [`--color-${k}`, refVar(t.$value), t.$description]);
const dataviz = entries(src.color.dataviz).map(([k, t]) => [`--color-dataviz-${k}`, refVar(t.$value)]);

// next/font variable first, family name second, so both next/font and plain CSS consumers work
const FONT_VAR = { display: '--font-archivo', sans: '--font-geist-sans', mono: '--font-geist-mono' };
const fonts = entries(src.font.family).map(([k, t]) => [`--font-${k}`, `var(${FONT_VAR[k]}, "${t.$value[0]}"), ${fam(t.$value.slice(1))}`]);
const plainFonts = entries(src.font.family).map(([k, t]) => [`--font-${k}`, fam(t.$value)]);

const typo = entries(src.typography).map(([k, t]) => [k, t.$value]);
const durations = entries(src.motion.duration).map(([k, t]) => [`--duration-${k}`, t.$value]);
const easings = entries(src.motion.easing).map(([k, t]) => [`--ease-${k}`, bezier(t.$value)]);
const sh = src.shadow.overlay.$value;
const shadow = `${sh.offsetX} ${sh.offsetY} ${sh.blur} ${sh.spread} ${sh.color}`;
const semantic = (mode) => entries(src.semantic[mode]).map(([k, t]) => [`--${k}`, refVar(t.$value)]);

const decl = (list, indent = '  ') => list.map(([k, v]) => `${indent}${k}: ${v};`).join('\n');

// ---------- tokens.css (framework-free) ----------
const typoVars = typo.flatMap(([k, v]) => [
  [`--text-${k}`, v.fontSize], [`--text-${k}--line-height`, String(v.lineHeight)], [`--text-${k}--letter-spacing`, v.letterSpacing], [`--text-${k}--font-weight`, String(v.fontWeight)],
]);
const css = `${HEADER}
:root {
${decl(primitives.map(([k, v]) => [k, v]))}
${decl(brandNamed)}
${decl(dataviz)}
${decl(plainFonts)}
${decl(typoVars)}
  --radius: 0px;
  --radius-none: 0px;
  --radius-full: 9999px;
${decl(durations)}
${decl(easings)}
  --shadow-overlay: ${shadow};
${decl(semantic('light'))}
  color-scheme: light;
}

.dark,
[data-theme="dark"] {
${decl(semantic('dark'))}
  color-scheme: dark;
}

@media (prefers-color-scheme: dark) {
  :root:not(.light):not([data-theme="light"]) {
${decl(semantic('dark'), '    ')}
    color-scheme: dark;
  }
}
`;

// ---------- tailwind.css (Tailwind v4) ----------
const typoUtilities = typo.map(([k, v]) => {
  const lines = [
    `  font-family: var(--font-${v.fontFamily.includes('display') ? 'display' : v.fontFamily.includes('mono') ? 'mono' : 'sans'});`,
    `  font-size: var(--text-${k});`,
    `  line-height: var(--text-${k}--line-height);`,
    `  letter-spacing: var(--text-${k}--letter-spacing);`,
    `  font-weight: var(--text-${k}--font-weight);`,
  ];
  if (v.fontStretch) lines.push(`  font-stretch: ${v.fontStretch};`);
  if (v.textTransform) lines.push(`  text-transform: ${v.textTransform};`);
  if (v.fontFeature) lines.push(`  font-feature-settings: ${v.fontFeature};`);
  return `@utility type-${k} {\n${lines.join('\n')}\n}`;
}).join('\n');

const tw = `${HEADER}/* Usage in a Tailwind v4 project:  @import "tailwindcss";  @import "./tailwind.css"; */

@custom-variant dark (&:is(.dark *));

@theme static {
${decl(primitives.map(([k, v]) => [k, v]))}
${decl(brandNamed.map(([k, v]) => [k, v.replace(/var\(--color-([a-z]+)-(\d+)\)/, (m, s, n) => primitives.find(([pk]) => pk === `--color-${s}-${n}`)[1])]))}
${decl(dataviz.map(([k, v]) => [k, v.replace(/var\(--color-([a-z]+)-(\d+)\)/, (m, s, n) => primitives.find(([pk]) => pk === `--color-${s}-${n}`)[1])]))}

${decl(fonts)}

${decl(typoVars)}

  --radius-xs: 0px;
  --radius-sm: 0px;
  --radius-md: 0px;
  --radius-lg: 0px;
  --radius-xl: 0px;
  --radius-2xl: 0px;
  --radius-3xl: 0px;
  --radius-4xl: 0px;

${decl(easings)}
  --shadow-overlay: ${shadow};
}

@theme inline {
${decl(entries(src.semantic.light).map(([k]) => [`--color-${k}`, `var(--${k})`]))}
}

:root {
  --radius: 0rem;
${decl(durations)}
${decl(semantic('light'))}
}

.dark {
${decl(semantic('dark'))}
}

${typoUtilities}
`;

// ---------- lib/tokens.ts ----------
const hexOf = (v) => resolve(v);
const scaleData = Object.fromEntries(SCALES.map((s) => [s, entries(src.color[s]).map(([step, t]) => ({ step, hex: t.$value, note: t.$description ?? null }))]));
const semData = (mode) => entries(src.semantic[mode]).map(([k, t]) => ({ name: k, ref: t.$value, hex: hexOf(t.$value) }));
const ts = `// Generated from tokens/tokens.json by scripts/build-tokens.mjs. Do not edit by hand.
export const scales = ${JSON.stringify(scaleData, null, 2)} as const;

export const brandColors = ${JSON.stringify(entries(src.color.brand).map(([k, t]) => ({ name: k, ref: t.$value, hex: hexOf(t.$value), note: t.$description ?? null })), null, 2)} as const;

export const dataviz = ${JSON.stringify(entries(src.color.dataviz).map(([k, t]) => ({ index: Number(k), ref: t.$value, hex: hexOf(t.$value) })), null, 2)} as const;

export const semantic = {
  light: ${JSON.stringify(semData('light'), null, 2)},
  dark: ${JSON.stringify(semData('dark'), null, 2)},
} as const;

export const fonts = ${JSON.stringify(entries(src.font.family).map(([k, t]) => ({ role: k, stack: t.$value, note: t.$description ?? null })), null, 2)} as const;

export const typography = ${JSON.stringify(typo.map(([k, v]) => ({ name: k, ...v, fontFamily: v.fontFamily.replace(/[{}]/g, '').split('.').pop() })), null, 2)} as const;

export const space = ${JSON.stringify(entries(src.space).map(([k, t]) => ({ step: k, value: t.$value })), null, 2)} as const;

export const motion = {
  duration: ${JSON.stringify(entries(src.motion.duration).map(([k, t]) => ({ name: k, value: t.$value, note: t.$description ?? null })), null, 2)},
  easing: ${JSON.stringify(entries(src.motion.easing).map(([k, t]) => ({ name: k, value: t.$value, css: bezier(t.$value), note: t.$description ?? null })), null, 2)},
} as const;
`;

writeFileSync(join(root, 'tokens/tokens.css'), css);
writeFileSync(join(root, 'tokens/tailwind.css'), tw);
mkdirSync(join(root, 'lib'), { recursive: true });
writeFileSync(join(root, 'lib/tokens.ts'), ts);
mkdirSync(join(root, 'public/tokens'), { recursive: true });
for (const f of ['tokens.json', 'tokens.css', 'tailwind.css']) copyFileSync(join(root, 'tokens', f), join(root, 'public/tokens', f));

// ---------- keep the agent skill and public downloads in sync ----------
const skill = join(root, 'skills/rustfs-brand');
copyFileSync(join(root, 'DESIGN.md'), join(skill, 'references/DESIGN.md'));
copyFileSync(join(root, 'tokens/tailwind.css'), join(skill, 'assets/tailwind.css'));
copyFileSync(join(root, 'tokens/tokens.css'), join(skill, 'assets/tokens.css'));
mkdirSync(join(skill, 'assets/logo'), { recursive: true });
for (const f of readdirSync(join(root, 'public/brand/logo')).filter((f) => f.endsWith('.svg'))) copyFileSync(join(root, 'public/brand/logo', f), join(skill, 'assets/logo', f));
copyFileSync(join(root, 'DESIGN.md'), join(root, 'public/DESIGN.md'));
rmSync(join(root, 'public/skills/rustfs-brand'), { recursive: true, force: true });
cpSync(skill, join(root, 'public/skills/rustfs-brand'), { recursive: true });

console.log(`tokens: ${primitives.length} primitives, ${semData('light').length} semantic roles × 2 themes, ${typo.length} type styles; skill and downloads synced`);
