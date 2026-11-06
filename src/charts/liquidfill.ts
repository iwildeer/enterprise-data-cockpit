import type { EChartsCoreOption } from "echarts"
import "echarts-liquidfill"

/**
 * 重点关注：水球图（echarts-liquidfill 插件）。
 * 移植自 src/js/water-ripples.js。
 */
export function buildLiquidfillOption(): EChartsCoreOption {
  return {
    series: [
      {
        name: "Liquid Fill",
        type: "liquidFill",
        center: ["20%", "30%"],
        color: ["orange"],
        radius: "45%",
        data: [0.29],
        outline: {
          show: true,
          borderDistance: 4,
          itemStyle: { borderColor: "orange", borderWidth: 4 },
        },
        backgroundStyle: { color: "transparent" },
        label: {
          formatter: (param: { value: number }) => Math.ceil(param.value * 100) + "家",
          fontSize: 18,
          color: "#f1f1f1",
        },
        tooltip: { show: true },
      },
      {
        name: "Liquid Fill",
        type: "liquidFill",
        center: ["40%", "60%"],
        color: ["#6de5a6"],
        radius: "30%",
        data: [0.15],
        outline: {
          show: true,
          borderDistance: 4,
          itemStyle: { borderColor: "#6de5a6", borderWidth: 4 },
        },
        backgroundStyle: { color: "transparent" },
        label: {
          formatter: (param: { value: number }) => Math.ceil(param.value * 100) + "家",
          fontSize: 18,
          color: "#f1f1f1",
        },
        tooltip: { show: true },
      },
      {
        name: "Liquid Fill",
        type: "liquidFill",
        center: ["70%", "35%"],
        color: ["#53b4ed"],
        radius: "60%",
        data: [0.93],
        outline: {
          show: true,
          borderDistance: 4,
          itemStyle: { borderColor: "#53b4ed", borderWidth: 4 },
        },
        backgroundStyle: { color: "transparent" },
        label: {
          formatter: (param: { value: number }) => Math.ceil(param.value * 100) + "家",
          fontSize: 18,
          color: "#f1f1f1",
        },
        tooltip: { show: true },
      },
    ],
  }
}
