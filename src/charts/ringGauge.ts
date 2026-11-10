import type { EChartsCoreOption } from "echarts"

/**
 * 小型环形仪表（polar bar 实现，中心显示百分比）。
 * circles.js 里 6 份逐字重复的 IIFE 收敛于此；旧代码 textStyle 里的
 * `foontWeight: '300'` 是 echarts 不识别的笔误键，未保留。
 */
export function buildRingGaugeOption(value: number, color: string, max = 100): EChartsCoreOption {
  return {
    title: [
      {
        text: value + "%",
        x: "center",
        y: "center",
        textStyle: { fontSize: "16", color: "#f1f1f1", fontFamily: "Oswald" },
      },
    ],
    angleAxis: {
      show: false,
      type: "value",
      startAngle: 90, // 极坐标初始角度
      splitLine: { show: false },
    },
    barMaxWidth: 4, // 圆环宽度
    radiusAxis: { show: false, type: "category" },
    polar: { center: ["50%", "50%"], radius: "180%" },
    series: [
      {
        type: "bar",
        data: [{ value, itemStyle: { color } }],
        barGap: "-100%", // 柱间距离,上下两层圆环重合
        coordinateSystem: "polar",
        roundCap: true, // 顶端圆角
        z: 3,
      },
      {
        // 下层圆环，显示最大值
        type: "bar",
        data: [
          {
            value: max,
            itemStyle: { color: "#1598FF", opacity: 0.2, borderWidth: 0 },
          },
        ],
        barGap: "-100%",
        coordinateSystem: "polar",
        roundCap: true,
        z: 1,
      },
    ],
  }
}
