export interface FrameSequence {
  /** WebP 帧所在目录（public 下），以 / 结尾 */
  dir: string
  /** 文件名数字位数（零填充） */
  pad: number
  /** 起始帧号 */
  start: number
  /** 最后一帧号 */
  end: number
  /** 循环起点：播到 end 后跳回该帧继续（与旧 IIFE 行为一致） */
  loopFrom: number
}

/**
 * 四组逐帧动画的清单。帧号区间严格对应旧代码实际会显示的帧
 * （旧 IIFE 因越界判断从未显示过序列尾部的几帧，转换时已裁掉）：
 * - economy: src/js/index.js，assets/frames 000–297，循环 50 起
 * - triple:  tripleAndOneBig 页 iframes4，000–297，循环 50 起
 * - party:   PartyBuildingManagement 页 iframes5，000–297，循环 50 起
 * - risk:    riskWarning 页 iframes6，004–199，循环 45 起
 */
export const SEQUENCES = {
  economy: { dir: "/seq/economy/", pad: 3, start: 0, end: 297, loopFrom: 50 },
  triple: { dir: "/seq/triple/", pad: 5, start: 0, end: 297, loopFrom: 50 },
  party: { dir: "/seq/party/", pad: 5, start: 0, end: 297, loopFrom: 50 },
  risk: { dir: "/seq/risk/", pad: 5, start: 4, end: 199, loopFrom: 45 },
} as const satisfies Record<string, FrameSequence>

export function frameUrl(seq: FrameSequence, index: number): string {
  return `${seq.dir}${String(index).padStart(seq.pad, "0")}.webp`
}
