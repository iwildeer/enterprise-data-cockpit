import { useEffect, useRef } from "react"
import type { RefObject } from "react"
import * as echarts from "echarts"
import type { EChartsCoreOption, ECharts } from "echarts"

interface UseEChartsResult<T extends HTMLElement> {
  ref: RefObject<T | null>
  chart: RefObject<ECharts | null>
}

/**
 * 在 ref 指向的 DOM 上初始化 echarts 实例。
 * - 挂载时 init + setOption，卸载时 dispose（React 19 StrictMode
 *   双挂载场景下安全）。
 * - deps 变化时以 notMerge=true 重新 setOption。
 * - 缩放舞台只做 CSS transform，不改变 layout 尺寸，
 *   因此无需监听 resize 重绘。
 */
export function useECharts<T extends HTMLElement = HTMLDivElement>(
  buildOption: () => EChartsCoreOption,
  deps: unknown[] = [],
): UseEChartsResult<T> {
  const ref = useRef<T>(null)
  const chartRef = useRef<ECharts | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const chart = echarts.init(el)
    chartRef.current = chart
    return () => {
      chart.dispose()
      chartRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!chartRef.current) return
    chartRef.current.setOption(buildOption(), true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { ref, chart: chartRef }
}
