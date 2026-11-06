import type { CSSProperties } from "react"
import type { EChartsCoreOption } from "echarts"
import { useECharts } from "../hooks/useECharts"

interface EChartProps {
  option: EChartsCoreOption
  className?: string
  style?: CSSProperties
}

/** echarts 图表容器的极薄封装，占满父容器。 */
export function EChart({ option, className, style }: EChartProps) {
  const { ref } = useECharts<HTMLDivElement>(() => option)
  return <div ref={ref} className={className} style={{ width: "100%", height: "100%", ...style }} />
}
