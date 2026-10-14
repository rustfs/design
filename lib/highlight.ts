import { createHighlighter, type BundledLanguage, type Highlighter, type ThemeRegistration } from "shiki"
import { syntax } from "./tokens"

// Build-time syntax highlighting (server components only). Colours come from the
// `color.syntax` tokens so code looks the same everywhere RustFS shows it.

const S = Object.fromEntries(syntax.map((s) => [s.role, s.hex])) as Record<(typeof syntax)[number]["role"], string>

export const rustfsCodeTheme: ThemeRegistration = {
  name: "rustfs-ink",
  type: "dark",
  colors: {
    "editor.background": S.background,
    "editor.foreground": S.foreground,
  },
  tokenColors: [
    { settings: { foreground: S.foreground, background: S.background } },
    {
      scope: ["comment", "punctuation.definition.comment", "string.comment"],
      settings: { foreground: S.comment },
    },
    {
      scope: [
        "punctuation",
        "meta.brace",
        "keyword.operator",
        "punctuation.separator",
        "punctuation.terminator",
        "punctuation.accessor",
        "punctuation.definition.tag",
        "meta.embedded.expression punctuation",
      ],
      settings: { foreground: S.punctuation },
    },
    {
      scope: [
        "keyword",
        "storage",
        "storage.type",
        "storage.modifier",
        "keyword.control",
        "keyword.operator.new",
        "keyword.operator.expression",
        "variable.language",
        "entity.name.tag",
        "support.function.builtin",
        "keyword.other.important.css",
        "keyword.control.at-rule",
        "punctuation.definition.keyword",
      ],
      settings: { foreground: S.keyword },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call entity.name.function",
        "entity.name.type",
        "entity.name.class",
        "support.class",
        "support.type.primitive",
        "entity.other.inherited-class",
        "support.class.component",
        "entity.name.tag.css",
        "entity.other.attribute-name.class.css",
        "entity.other.attribute-name.id.css",
        "entity.other.attribute-name.pseudo-class.css",
        "entity.other.attribute-name.pseudo-element.css",
        "entity.name.command",
        "support.function.misc.css",
      ],
      settings: { foreground: S.function },
    },
    {
      scope: [
        "variable.other.property",
        "variable.other.object.property",
        "meta.object-literal.key",
        "support.type.property-name",
        "support.type.vendored.property-name",
        "entity.other.attribute-name",
        "variable.parameter",
        "variable.parameter.option",
        "constant.other.option",
        "variable.css",
        "variable.argument.css",
        "support.type.custom-property",
        "entity.name.tag.yaml",
        "support.variable.property",
      ],
      settings: { foreground: S.property },
    },
    {
      scope: [
        "string",
        "string.quoted",
        "string.template",
        "string.unquoted",
        "punctuation.definition.string",
        "markup.inline.raw",
        "markup.raw",
        "support.constant.property-value",
        "markup.fenced_code.block",
      ],
      settings: { foreground: S.string },
    },
    {
      scope: [
        "constant.numeric",
        "constant.language",
        "constant.character",
        "keyword.other.unit",
        "support.constant",
        "constant.other.color",
        "constant.other.rgb-value",
        "markup.list punctuation.definition.list.begin",
      ],
      settings: { foreground: S.number },
    },
    {
      scope: ["markup.heading", "entity.name.section", "markup.heading punctuation.definition.heading"],
      settings: { foreground: "#FFFFFF", fontStyle: "bold" },
    },
    { scope: ["markup.bold"], settings: { fontStyle: "bold" } },
    { scope: ["markup.italic"], settings: { fontStyle: "italic" } },
    { scope: ["markup.underline.link", "string.other.link", "markup.link"], settings: { foreground: S.keyword } },
  ],
}

export type CodeLang = "bash" | "css" | "tsx" | "ts" | "html" | "json" | "markdown" | "yaml" | "text"
const LANGS: BundledLanguage[] = ["bash", "css", "tsx", "ts", "html", "json", "markdown", "yaml"]

let highlighter: Promise<Highlighter> | null = null
function getHighlighter() {
  highlighter ??= createHighlighter({ themes: [rustfsCodeTheme], langs: LANGS })
  return highlighter
}

const EXT: Record<string, CodeLang> = { tsx: "tsx", jsx: "tsx", ts: "ts", js: "ts", mjs: "ts", css: "css", html: "html", json: "json", md: "markdown", yaml: "yaml", yml: "yaml", sh: "bash" }

/** Pick a language from a file-like title first, then from the code itself. */
export function guessLang(title: unknown, code: string): CodeLang {
  if (typeof title === "string") {
    const m = title.match(/\.(tsx|jsx|ts|js|mjs|css|html|json|md|ya?ml|sh)\b/i)
    if (m) return EXT[m[1].toLowerCase()]
  }
  const c = code.trim()
  if (/^[[{]/.test(c)) {
    try {
      JSON.parse(c)
      return "json"
    } catch {}
  }
  if (/^---\n[\s\S]*?\n---/.test(c) || /^#{1,3} /m.test(c)) return "markdown"
  if (/^(#|\$ |npx |pnpm |npm |curl |unzip |docker |mkdir |chown |cp |git |cd |python3 |export |sudo )/m.test(c) && !/[{};]\s*$/m.test(c.split("\n")[0])) return "bash"
  if (/^\s*(import |export |const |function |<[A-Z])/m.test(c) || /className=/.test(c)) return "tsx"
  if (/^\s*</.test(c)) return "html"
  if (/(^|\n)\s*(@[a-z-]+|:root|[.#]?[\w-]+(\s*[,>+~]\s*[\w.#:-]+)*)\s*\{/.test(c) || /--[\w-]+\s*:/.test(c)) return "css"
  return "text"
}

/** Highlight to an HTML string (<pre class="shiki">…). Plain text is escaped without tokenising. */
export async function highlight(code: string, lang: CodeLang): Promise<string> {
  const h = await getHighlighter()
  return h.codeToHtml(code, {
    lang: lang === "text" ? "text" : lang,
    theme: "rustfs-ink",
    transformers: [
      {
        pre(node) {
          node.properties.style = undefined
          node.properties.tabindex = "0"
        },
      },
    ],
  })
}
