import type { EChartsCoreOption } from "echarts"

/** 财务能力预警雷达图。移植自 src/js/radarChart.js。 */
export function buildRadarOption(): EChartsCoreOption {
  return {
    width: "fit",
    height: "fit",
    radar: {
      radius: "65%",
      axisName: { color: "#fff", fontSize: 18 },
      splitNumber: 5,
      axisLine: { lineStyle: {} },
      splitLine: {
        show: true,
        lineStyle: { type: "dashed", color: "#4e545c", cap: "round" },
      },
      splitArea: {
        show: true,
        areaStyle: { color: [""] },
      },
      indicator: [
        { name: "盈利能力", max: 6500 },
        { name: "偿债能力", max: 16000 },
        { name: "资产质量", max: 30000 },
        { name: "经营增长", max: 38000 },
        { name: "成长能力", max: 52000 },
        { name: "财务风险", max: 25000 },
      ],
    },
    series: [
      {
        name: "财务能力预警",
        type: "radar",
        symbol: "none",
        smooth: true, // 开启平滑曲线
        smoothMonotone: "y",
        lineStyle: { cap: "round", join: "round", width: 3 },
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: "Allocated Budget",
            lineStyle: { color: "#beaa42" },
            areaStyle: { color: "#beaa42" },
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: "Actual Spending",
            lineStyle: { color: "#b15861" },
            areaStyle: { color: "#b15861" },
          },
        ],
      },
    ],
  }
}
