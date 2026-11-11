import { useEffect, useState } from "react"
import { EChart } from "./EChart"
import type { EChartProps } from "./EChart"
import { ensureEChartsGl } from "../lib/echartsGl"

/**
 * 需要 echarts-gl 的图表容器（pie3d 等）：GL chunk（~633KB）异步
 * 加载完成前渲染等尺寸占位，不阻塞页面其余内容首绘，也不把
 * echarts-gl 拖进页面的关键加载路径。
 */
export function GlChart(props: EChartProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
    ensureEChartsGl().then(() => {
      if (alive) setReady(true)
    })
    return () => {
      alive = false
    }
  }, [])

  if (!ready) {
    return (
      <div
        className={props.className}
        style={{ width: "100%", height: "100%", ...props.style }}
      />
    )
  }
  return <EChart {...props} />
}
