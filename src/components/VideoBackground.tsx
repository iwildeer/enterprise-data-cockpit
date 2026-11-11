import { useEffect, useState } from "react"
import type { CSSProperties } from "react"

interface VideoBackgroundProps {
  src: string
  className?: string
  style?: CSSProperties
}

/**
 * 循环播放的背景视频（autoPlay + muted + loop + playsInline）。
 *
 * 加载优化：视频（BG_26.mp4 达 4.5MB）为纯装饰，不参与首屏，
 * 推迟到 window load 后再赋 src，避免与 JS/图表/地球纹理抢带宽；
 * 现挂载时（load 已完成）稍等 300ms 再开播，给首屏渲染让路。
 */
export function VideoBackground({ src, className, style }: VideoBackgroundProps) {
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    const start = () => {
      timer = setTimeout(() => setResolvedSrc(src), 300)
    }
    if (document.readyState === "complete") {
      start()
    } else {
      window.addEventListener("load", start, { once: true })
      return () => {
        window.removeEventListener("load", start)
        clearTimeout(timer)
      }
    }
    return () => clearTimeout(timer)
  }, [src])

  if (!resolvedSrc) return null

  return (
    <video
      className={className}
      style={style}
      src={resolvedSrc}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  )
}
