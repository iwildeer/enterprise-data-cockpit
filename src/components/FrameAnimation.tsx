import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"
import { type FrameSequence, frameUrl } from "../lib/sequences"

interface FrameAnimationProps {
  seq: FrameSequence
  className?: string
  style?: CSSProperties
  /** 播放前预载的帧数（首循环起步余量） */
  preloadAhead?: number
}

const CONCURRENCY = 6

/**
 * 逐帧动画：换 img.src 播放 WebP 序列，每 rAF tick 前进一帧，
 * 与旧页面 4 处 IIFE 的可见行为一致（修复了原 i++ 双自增的笔误，
 * 该笔误恰好被逻辑抵消，实际每帧都显示）。
 *
 * 策略：先渲染首帧作为 poster，预载前 preloadAhead 帧后开播，
 * 其余循环区间帧在后台以并发 CONCURRENCY 继续预载。
 */
export function FrameAnimation({ seq, className, style, preloadAhead = 24 }: FrameAnimationProps) {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    let raf = 0
    let aborted = false
    let inflight = 0
    const pending: number[] = []
    const seen = new Set<number>()

    const preloadNext = () => {
      while (inflight < CONCURRENCY && pending.length > 0) {
        const i = pending.shift()!
        seen.add(i)
        inflight++
        const probe = new Image()
        probe.onload = probe.onerror = () => {
          inflight--
          preloadNext()
        }
        probe.src = frameUrl(seq, i)
      }
    }

    const enqueue = (i: number) => {
      if (seen.has(i)) return
      pending.push(i)
      preloadNext()
    }

    // 预载整个播放区间：先起步段，再循环段
    for (let i = seq.start; i <= Math.min(seq.start + preloadAhead, seq.end); i++) enqueue(i)
    for (let i = seq.loopFrom; i <= seq.end; i++) enqueue(i)

    // 起步段预载完成后开播（至少首帧已就绪即可开始，循环段后台补）
    let frame = seq.start
    const startPlayback = () => {
      if (aborted) return
      imgRef.current!.src = frameUrl(seq, frame)
      const tick = () => {
        if (aborted) return
        frame = frame >= seq.end ? seq.loopFrom : frame + 1
        imgRef.current!.src = frameUrl(seq, frame)
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const first = new Image()
    first.onload = () => {
      if (!aborted) startPlayback()
    }
    first.src = frameUrl(seq, seq.start)
    imgRef.current!.src = first.src

    return () => {
      aborted = true
      cancelAnimationFrame(raf)
      pending.length = 0
    }
  }, [seq, preloadAhead])

  return <img ref={imgRef} className={className} style={style} alt="" />
}
