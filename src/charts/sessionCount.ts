import type { EChartsCoreOption } from "echarts"

/**
 * 会议统计分组柱状图。
 * 移植自 src/js/sessionCount.js，数据与样式原样保留。
 */
export function buildSessionCountOption(): EChartsCoreOption {
  return {
    legend: {
      icon: "circle",
      right: "10%",
      top: "6%",
      textStyle: { color: "#fff" },
    },
    grid: { top: "15%", right: "10%", bottom: "10%", left: "8%" },
    tooltip: {},
    dataset: {
      source: [
        ["SESSION", "党支部大会", "支部委员会", "党小组会", "党课", "end"],
        ["党委", 43.3, 85.8, 93, 72.4, 57, 57],
        ["党总支", 83.1, 73.4, 55.1, 53.9, 76, 76],
        ["党支部", 86.4, 65.2, 82.5, 39.1, 49, 49],
      ],
    },
    xAxis: {
      type: "category",
      axisLine: { lineStyle: { width: 1, color: "#f1f1f1" } },
      axisTick: { show: false },
      axisLabel: { margin: 6, color: "#fff" },
    },
    yAxis: {
      type: "value",
      axisLabel: { show: true, color: "#fff" },
      splitLine: { lineStyle: { type: "dashed", color: "#aaa", width: 1 } },
    },
    series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }, { type: "bar" }],
  }
}
