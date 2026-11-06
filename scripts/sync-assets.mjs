#!/usr/bin/env node
/**
 * 从旧页面/脚本中推导仍被引用的图片，同步到 src/assets/images/。
 * 路径规则：assets/images/x → src/assets/images/x
 *          assets/main/N/x  → src/assets/images/main/N/x
 * 帧序列（assets/frames、assets/images/iframes*）不在此处理，
 * 由 convert-sequences.sh 转 WebP 到 public/seq/。
 *
 * 用法：node scripts/sync-assets.mjs [--dry-run]
 */
import { readFileSync, readdirSync, existsSync, mkdirSync, copyFileSync } from "node:fs"
import { join, dirname, relative } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const dryRun = process.argv.includes("--dry-run")

// tailwindConfig.js 的 backgroundImage token → assets 路径
const TOKENS = {
  title: "images/title.png",
  d1: "images/d1.png",
  "kv-a1": "images/kv-a1.png",
  title2: "images/partyComstruct/title2.png",
  huiguang: "images/partyComstruct/huiguang.png",
  "1png": "images/partyComstruct/1.png",
  "2png": "images/partyComstruct/2.png",
  "3png": "images/partyComstruct/3.png",
  "4png": "images/partyComstruct/4.png",
  r1png: "images/partyComstruct/r1.png",
  r2png: "images/partyComstruct/r2.png",
  r3png: "images/partyComstruct/r3.png",
  r4png: "images/partyComstruct/r4.png",
  kvShield: "images/kv-shield.png",
  jingNei: "main/2/jingNei.png",
  jingWai: "main/2/jingWai.png",
  touRuBG: "main/2/touRuBG.png",
  tzdcfx: "main/2/tzdcfx.png",
  tzdcfx1: "main/2/tzdcfx1.png",
  tzdcfx2: "main/2/tzdcfx2.png",
  tzdcfx3: "main/2/tzdcfx3.png",
  k1: "main/1/k1.png",
  k2: "main/1/k2.png",
  bgIcon1: "main/4/icon1.png",
  bgIcon2: "main/4/icon2.png",
  bgIcon3: "main/4/icon3.png",
  bgIcon4: "main/4/icon4.png",
  xydb: "main/4/xydb.png",
  xydbBG: "main/4/xydbBG.png",
  bxydbBG: "main/4/bxydbBG.png",
  bxydb: "main/4/bxydb.png",
  dddtIcon1: "main/5/dddtIcon1.png",
  dddtIcon2: "main/5/dddtIcon2.png",
  dddtIcon3: "main/5/dddtIcon3.png",
  dddtBG: "main/5/dddtBG.png",
  dk: "main/5/dk.png",
  dxzh: "main/5/dxzh.png",
  zbdydh: "main/5/zbdydh.png",
  zbwyh: "main/5/zbwyh.png",
  hyyjfxBG1: "main/6/hyyjfxBG1.png",
  hyyjfxBG2: "main/6/hyyjfxBG2.png",
  hyyjfxBG3: "main/6/hyyjfxBG3.png",
  cwnlyjBG: "main/6/cwnlyjBG.png",
  zqchBG2: "main/6/zqchBG2.png",
  zqchBG1: "main/6/zqchBG1.png",
}

const htmlFiles = readdirSync(ROOT).filter((f) => f.endsWith(".html"))
const keep = new Set()

// 1) 旧 HTML 里的直接引用（src/href/url()）
const directRe = /assets\/[A-Za-z0-9_/一-鿿-]+\.(?:png|jpg|jpeg|PNG|JPG)/g
for (const f of htmlFiles) {
  const text = readFileSync(join(ROOT, f), "utf8")
  for (const m of text.matchAll(directRe)) keep.add(m[0])
}

// 2) 旧 JS / CSS 里的引用（含模板字符串拼接的路径前缀）
for (const dir of ["src/js", "src/style"]) {
  const dirPath = join(ROOT, dir)
  if (!existsSync(dirPath)) continue
  for (const f of readdirSync(dirPath)) {
    if (!/\.(js|css)$/.test(f)) continue
    const text = readFileSync(join(dirPath, f), "utf8")
    for (const m of text.matchAll(directRe)) keep.add(m[0])
  }
}

// 3) tailwind bg-* 类 → token 解析（只匹配 token 表中存在的名字）
const classAttrRe = /class="([^"]+)"/g
for (const f of htmlFiles) {
  const text = readFileSync(join(ROOT, f), "utf8")
  for (const m of text.matchAll(classAttrRe)) {
    for (const cls of m[1].split(/\s+/)) {
      if (!cls.startsWith("bg-")) continue
      const token = cls.slice(3)
      if (TOKENS[token]) keep.add(`assets/${TOKENS[token]}`)
    }
  }
}

// 4) 公共 chrome（header/footer 背景图）已由 SiteHeader/SiteFooter 直接 import
keep.add("assets/images/T.png")
keep.add("assets/images/D.png")

// 同步到 src/assets/images/（保留相对路径结构）
let copied = 0
for (const rel of [...keep].sort()) {
  const src = join(ROOT, rel)
  if (!existsSync(src)) {
    console.warn(`!! 引用但不存在: ${rel}`)
    continue
  }
  const relInImages = rel.replace(/^assets\/(?:images|main)\//, (s) =>
    s.startsWith("assets/main/") ? "main/" : "",
  )
  const dest = join(ROOT, "src/assets/images", relInImages)
  console.log(`${rel}  →  ${relative(ROOT, dest)}`)
  if (!dryRun) {
    mkdirSync(dirname(dest), { recursive: true })
    copyFileSync(src, dest)
  }
  copied++
}
console.log(`\n共 ${keep.size} 个文件${dryRun ? "（dry-run，未写入）" : `，已复制 ${copied} 个`}`)
