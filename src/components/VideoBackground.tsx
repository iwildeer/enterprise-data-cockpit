import type { CSSProperties } from "react"

interface VideoBackgroundProps {
  src: string
  className?: string
  style?: CSSProperties
}

/** 循环播放的背景视频（autoPlay + muted + loop，补 playsInline）。 */
export function VideoBackground({ src, className, style }: VideoBackgroundProps) {
  return (
    <video
      className={className}
      style={style}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  )
}
