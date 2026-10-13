#!/usr/bin/env node
// Render an HTML artboard to PNG with headless Chrome. Node >= 22, no npm packages.
// Usage: node render.mjs <input.html> <output.png> [--width 1200] [--height 630] [--scale 2] [--selector .ab] [--wait 800]
// Width/height default to the artboard's data-w / data-h (or --w / --h CSS variables). Set CHROME_PATH if Chrome is not found.
import { spawn } from "node:child_process"
import { existsSync, mkdtempSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"

const argv = process.argv.slice(2)
const pos = argv.filter((a, i) => !a.startsWith("--") && !(argv[i - 1] || "").startsWith("--"))
const flag = (k, d) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : d }
const [input, output] = pos
if (!input || !output) { console.error("usage: node render.mjs <input.html> <output.png> [--width W --height H --scale 2 --selector .ab]"); process.exit(2) }

const candidates = [process.env.CHROME_PATH, "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Chromium.app/Contents/MacOS/Chromium", "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium", "/usr/bin/chromium-browser"].filter(Boolean)
const chromePath = candidates.find((p) => existsSync(p))
if (!chromePath) { console.error("Chrome not found. Set CHROME_PATH."); process.exit(1) }

const port = 9400 + Math.floor(Math.random() * 400)
const profile = mkdtempSync(join(tmpdir(), "rustfs-render-"))
const chrome = spawn(chromePath, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--hide-scrollbars", "--allow-file-access-from-files", "about:blank"], { stdio: "ignore" })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let ws
try {
  let url
  for (let i = 0; i < 80 && !url; i++) {
    try { url = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === "page")?.webSocketDebuggerUrl } catch {}
    if (!url) await sleep(125)
  }
  ws = new WebSocket(url)
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j })
  let id = 0
  const pending = new Map()
  ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) } }
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
  const evaluate = async (expression) => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result?.result?.value

  await send("Page.enable")
  await send("Emulation.setDeviceMetricsOverride", { width: 3000, height: 3000, deviceScaleFactor: Number(flag("scale", 2)), mobile: false })
  await send("Page.navigate", { url: /^https?:/.test(input) ? input : "file://" + resolve(input) })
  await sleep(400)
  await evaluate("document.fonts.ready.then(() => true)")
  await sleep(Number(flag("wait", 800)))
  const sel = flag("selector", ".ab")
  const box = await evaluate(`(() => { const el = document.querySelector(${JSON.stringify(sel)}) || document.body; const r = el.getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, w: Number(el.dataset.w) || r.width, h: Number(el.dataset.h) || r.height } })()`)
  const width = Number(flag("width", box.w))
  const height = Number(flag("height", box.h))
  const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: box.x, y: box.y, width, height, scale: 1 } })
  writeFileSync(output, Buffer.from(shot.result.data, "base64"))
  console.log(`${output} · ${width}×${height} @${flag("scale", 2)}x`)
} finally {
  try { ws?.close() } catch {}
  chrome.kill("SIGKILL")
}
