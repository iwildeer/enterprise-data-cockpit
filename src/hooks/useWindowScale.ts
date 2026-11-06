import { useEffect, useState } from "react"

/**
 * 计算固定尺寸舞台到窗口的等比缩放系数。
 * 大屏设计稿固定 2000px 宽，通过 transform: scale 适配任意窗口，
 * 黑边留白（letterbox）。
 */
export function useWindowScale(width: number, height: number): number {
  const [scale, setScale] = useState(() =>
    Math.min(window.innerWidth / width, window.innerHeight / height),
  )

  useEffect(() => {
    const onResize = () =>
      setScale(Math.min(window.innerWidth / width, window.innerHeight / height))
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [width, height])

  return scale
}
