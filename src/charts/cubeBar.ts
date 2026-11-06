import type { EChartsCoreOption } from "echarts"
import { echarts } from "./echarts"

/**
 * 总资产周转率/收入分析：3D 立方体柱 + 同比折线。
 * index.js 与 turnoverRateEChart.js 中完全重复的图表，合并于此。
 */
export function buildCubeBarOption(): EChartsCoreOption {
  return {
    color: "#3779b8",
    backgroundColor: "#020B19",
    legend: {
      show: true,
      textStyle: { color: "#fff" },
      right: "5%",
    },
    dataset: {
      source: [
        ["year", "当月值", "同比"],
        ["2016年", 0.02, 0.02],
        ["2017年", 0.03, 0.03],
        ["2018年", 0.09, 0.09],
        ["2019年", 0.07, 0.07],
        ["2020年", 0.06, 0.06],
        ["2021年", 0.08, 0.08],
        ["2022年", 0.04, 0.04],
      ],
    },
    grid: { top: "17%", bottom: "20%" },
    tooltip: {},
    xAxis: {
      type: "category",
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { show: false },
      axisLabel: {
        show: true,
        interval: 0,
        margin: 25,
        textStyle: { color: "#fff", fontSize: 14 },
      },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "#fff" },
    },
    series: [
      {
        type: "custom",
        name: "当月值",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        renderItem: (_params: unknown, api: any) => {
          const location = api.coord([api.value(0), api.value(1)])
          return {
            type: "group",
            children: [
              {
                type: "CubeLeft",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#33BCEB" },
                    { offset: 1, color: "#337CEB" },
                  ]),
                },
              },
              {
                type: "CubeRight",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#28A2CE" },
                    { offset: 1, color: "#1A57B7" },
                  ]),
                },
              },
              {
                type: "CubeTop",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#43C4F1" },
                    { offset: 1, color: "#28A2CE" },
                  ]),
                },
              },
            ],
          }
        },
      },
      {
        name: "同比",
        type: "line",
        showAllSymbol: false,
        showSymbol: false,
        symbol: "circle",
        smooth: true,
        symbolSize: 3,
        zlevel: 3,
        itemStyle: { color: "orange" },
        lineStyle: { width: 3, color: "#ffea38" },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(255,234,56,0.4)" },
              { offset: 1, color: "rgba(255,234,56,0.4)" },
            ],
            global: false,
          },
        },
      },
    ],
  }
}
