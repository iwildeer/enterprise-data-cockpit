import type { EChartsCoreOption } from "echarts"

/** 年度完成计划：实际/计划柱 + 达成率折线。移植自 src/js/planFinish.js。 */
export function buildPlanFinishOption(): EChartsCoreOption {
  return {
    legend: {
      show: true,
      data: ["实际", "计划", "达成率"],
      icon: "circle",
      right: 45,
      textStyle: { color: "#f1f1f1" },
    },
    tooltip: {},
    dataset: {
      source: [
        ["planFinish", "nullData", "fact", "plan", "compleRate"],
        ["01", 0, 43.3, 85.8, 93.7],
        ["02", 0, 83.1, 73.4, 55.1],
        ["03", 0, 86.4, 65.2, 82.5],
        ["04", 0, 72.4, 53.9, 39.1],
        ["05", 0, 42.4, 23.9, 29.1],
        ["06", 0, 52.4, 33.9, 79.1],
        ["07", 0, 82.4, 23.9, 59.1],
        ["08", 0, 22.4, 33.9, 89.1],
        ["09", 0, 12.4, 33.9, 99.1],
        ["10", 0, 72.4, 43.9, 59.1],
        ["11", 0, 22.4, 43.9, 79.1],
        ["12", 0, 42.4, 53.9, 89.1],
      ],
    },
    xAxis: {
      type: "category",
      boundaryGap: 0,
      axisTick: { show: false },
      lineStyle: { color: "#999", width: 0.5, join: "round", cap: "round", opacity: 0.5 },
      axisLabel: { interval: 0, color: "#f1f1f1" },
    },
    yAxis: { show: false },
    series: [
      { type: "bar" },
      {
        name: "实际",
        type: "bar",
        itemStyle: {
          borderRadius: [20, 20, 0, 0],
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#72f0f6" },
              { offset: 1, color: "#0a1d29" },
            ],
            global: false,
          },
        },
      },
      {
        name: "计划",
        type: "bar",
        itemStyle: {
          borderRadius: [20, 20, 0, 0],
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#318cf4" },
              { offset: 1, color: "#0a1d29" },
            ],
            global: false,
          },
        },
      },
      {
        name: "达成率",
        type: "line",
        showAllSymbol: false,
        showSymbol: false,
        symbol: "circle",
        smooth: true,
        symbolSize: 3,
        zlevel: 3,
        itemStyle: { color: "orange" },
        lineStyle: { width: 3, color: "#ffea38" },
      },
    ],
  }
}
