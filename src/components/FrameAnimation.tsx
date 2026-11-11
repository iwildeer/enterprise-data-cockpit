import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"
import { type FrameSequence, frameUrl } from "../lib/sequences"

interface FrameAnimationProps {
  seq: FrameSequence
  className?: string
  style?: CSSProperties
  /** 开播前预载的起步帧数 */
  preloadAhead?: number
  /** 播放点前方维持的滚动缓冲帧数（60fps 下即余量秒数 × 60） */
  lookahead?: number
}

const CONCURRENCY = 6

/**
 * 逐帧动画：换 img.src 播放 WebP 序列，每 rAF tick 前进一帧，
 * 与旧页面 4 处 IIFE 的可见行为一致（修复了原 i++ 双自增的笔误，
 * 该笔误恰好被逻辑抵消，实际每帧都显示）。
 *
 * 加载策略（滚动缓冲）：旧实现开局把整个循环区间（economy 达 51MB）
 * 全量预载，与 JS/地球纹理抢带宽，直接拖垮首屏。现改为：
 * - 开局只预载起步段 [start, start+preloadAhead]；
 * - 播放时随播放点推进，仅预取前方 lookahead 帧；
 * - 下一帧未就绪时原地等待（下一 rAF 再试），不跳帧；
 * - 循环回放命中 HTTP 缓存（/seq/* 已配 immutable），第二轮起零网络。
 */
export function FrameAnimation({
  seq,
  className,
  style,
  preloadAhead = 24,
  lookahead = 72,
}: FrameAnimationProps) {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    let raf = 0
    let aborted = false
    let inflight = 0
    const pending: number[] = []
    const queued = new Set<number>()
    /** 已进入浏览器 HTTP 缓存的帧（含加载失败的——避免卡死等待） */
    const ready = new Set<number>()

    const pump = () => {
      while (inflight < CONCURRENCY && pending.length > 0) {
        const i = pending.shift()!
        inflight++
        const probe = new Image()
        probe.onload = probe.onerror = () => {
          inflight--
          ready.add(i)
          pump()
        }
        probe.src = frameUrl(seq, i)
      }
    }

    const want = (i: number) => {
      if (ready.has(i) || queued.has(i)) return
      queued.add(i)
      pending.push(i)
      pump()
    }

    // 起步段
    for (let i = seq.start; i <= Math.min(seq.start + preloadAhead, seq.end); i++) want(i)

    const startPlayback = () => {
      if (aborted) return
      let frame = seq.start
      imgRef.current!.src = frameUrl(seq, seq.start)
      const tick = () => {
        if (aborted) return
        const next = frame >= seq.end ? seq.loopFrom : frame + 1
        // 下一帧未就绪：原地等待（rAF 重试），不推进、不跳帧
        if (ready.has(next)) {
          frame = next
          imgRef.current!.src = frameUrl(seq, frame)
          // 滚动预取：播放点前方 lookahead 帧（跨 end 回绕到循环段）
          for (let k = 1; k <= lookahead; k++) {
            let t = frame + k
            while (t > seq.end) t = seq.loopFrom + (t - seq.end - 1)
            want(t)
          }
        }
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const first = new Image()
    first.onload = () => {
      if (!aborted) startPlayback()
    }
    first.src = frameUrl(seq, seq.start)
    ready.add(seq.start)
    imgRef.current!.src = first.src

    return () => {
      aborted = true
      cancelAnimationFrame(raf)
      pending.length = 0
    }
  }, [seq, preloadAhead, lookahead])

  return <img ref={imgRef} className={className} style={style} alt="" />
}
