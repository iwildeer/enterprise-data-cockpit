import type { EChartsCoreOption } from "echarts"
import { echarts } from "./echarts"

/**
 * 排行榜：横向渐变排行条。
 * 移植自 src/js/rankList.js。
 */
export function buildRankListOption(): EChartsCoreOption {
  const color = [
    "rgba(248,195,248",
    "rgba(100,255,249",
    "rgba(135,183,255",
    "rgba(248,195,248",
    "rgba(100,255,249",
  ]

  const bar = (name: string, value: number, i: number) => ({
    name,
    value,
    itemStyle: {
      show: true,
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: `${color[i]}, 0.3)` },
        { offset: 1, color: `${color[i]}, 1)` },
      ]),
      barBorderRadius: 30,
    },
    emphasis: { shadowBlur: 15, shadowColor: "rgba(0, 0, 0, 0.1)" },
  })

  return {
    backgroundColor: "#000",
    grid: { borderWidth: 0, top: "15%", left: "15%", right: "15%", bottom: "0%" },
    xAxis: {
      type: "value",
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
    },
    yAxis: [
      {
        type: "category",
        data: ["对外担保逾期", "委托贷款逾期", "受限货币资金"],
        inverse: true,
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: { show: false, inside: false },
      },
    ],
    series: [
      {
        data: [bar("对外担保逾期", 120, 0), bar("委托贷款逾期", 179, 1), bar("受限货币资金", 150, 2)],
        type: "bar",
        barWidth: 10,
        showBackground: true,
        backgroundStyle: { borderRadius: 30 },
        itemStyle: { barBorderRadius: 30 },
        label: {
          color: "#b3ccf8",
          show: true,
          position: [0, "-24px"],
          textStyle: { fontSize: 16 },
          formatter: (a: { name: string }) => a.name,
        },
      },
    ],
  }
}
