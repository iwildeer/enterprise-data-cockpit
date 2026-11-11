# 企业大数据智能分析决策平台

此项目基于公司统计数据对现有数据进行分析后以可视化的方式呈现，根据效果图与素材进行还原，帮助公司更加直观地展示数据变换。

数据大屏，设计稿 2000px 宽，主舞台高度 750 / 800 / 850px（按页面而定），由 `ScaleStage` 整体等比缩放适配视口。

## 模块

顶部导航六个页面（`src/lib/nav.ts`）：国资总览、投资管理、经济运行、三重一大、党建管理、风险分析。

## 技术栈

- React 19 + TypeScript + Vite
- Tailwind CSS v4（`@tailwindcss/vite` 插件，零配置文件）
- ECharts 5（`echarts-gl`、`echarts-liquidfill`）、D3
- React Router 7

## 快速开始

```bash
npm install
npm run dev      # 开发
npm run build    # tsc -b && vite build
npm run lint     # oxlint
npm run preview  # 预览构建产物
```

## Tailwind 类写法规范

约定：**优先使用 canonical 类，仅在没有等价写法时使用 arbitrary 值**（配合编辑器 `suggestCanonicalClasses` 提示清理）。v4 spacing 刻度是动态的，`N` = `N × 0.25rem`（root 16px 时即 `N × 4px`）：

- spacing 派生：`w-500`（= 2000px）、`h-187.5`、`px-7.5`；行高同理 `leading-15`（= 60px）
- 负值：`-prop-N`；层级：`z-99`
- `top-0 left-0 bottom-0 right-0` 四件套 → `inset-0`
- 百分比能约分 → 分数：`w-1/4`；`100%` → `w-full`
- 颜色：`text-white`、`bg-black/30`；圆角：`rounded-full`
- 无 canonical 等价才保留 arbitrary：`text-[24px]`（v4 字号无数值刻度）、色板外颜色（大屏配色 `#f1f1f1` 等）、`w-[15%]` / `mt-[50%]`、`bg-[center_bottom_10px]`

## 资源维护脚本

大屏文案与帧动画是硬编码的，改动后需重跑对应脚本：

| 脚本 | 用途 |
|---|---|
| `python3 scripts/subset-fonts.py` | 按项目实际用字把 `src/assets/fonts/*.ttf` 子集化为 WOFF2（改页面文字后必须重跑，否则新字符回退系统字体） |
| `bash scripts/convert-sequences.sh [economy\|triple\|party\|risk]` | 逐帧 PNG 动画转带透明通道的 WebP，输出到 `public/seq/`（需 cwebp） |
| `node scripts/sync-assets.mjs` | 从旧页面推导仍被引用的图片，同步到 `src/assets/images/` |

## 目录结构

```
src/
├── assets/          # 字体（WOFF2 子集）、图片
├── charts/          # ECharts option 构建函数
├── components/      # SiteHeader/SiteFooter、ScaleStage、FrameAnimation、EChart 等
├── hooks/
├── lib/             # nav 等共享常量
├── pages/           # 六个页面（含 economy.module.css）
└── styles/          # base / theme / fonts
```
