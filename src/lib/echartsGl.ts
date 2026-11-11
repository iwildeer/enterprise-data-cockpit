/**
 * echarts-gl（内置 three.js，压缩后 ~633KB）的异步按需加载。
 *
 * pie3d 的 option 构建不依赖 echarts-gl（只有渲染 series type
 * "surface"/globe 时才需要其注册的副作用），因此从 pie3d.ts 的
 * 静态 import 改为 here 的动态 import：
 * - echarts-gl 不再进入任何页面的关键加载路径（首屏只下载当前页
 *   需要渲染的代码，GL chunk 到位前图表/地球位置先显示占位）；
 * - 多处共用同一 Promise，chunk 只下载一次。
 */
let ready: Promise<unknown> | null = null

export function ensureEChartsGl(): Promise<unknown> {
  // echarts-gl 无类型声明（旧代码也是裸 import 只取其注册副作用）
  return (ready ??= import("echarts-gl"))
}
