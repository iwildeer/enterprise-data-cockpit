import { graphic } from "echarts"
import type { EChartsCoreOption } from "echarts"

// 旧脚本里 color 是"rgba(r, g, b," 前缀字符串，靠拼接透明度后缀使用，原样保留
const COLORS = ["rgba(245, 42, 118,", "rgba(255, 255, 0,", "rgba(14, 248, 254,"]

/** 左上"预警变动趋势"图。移植自 src/js/changTrends.js。 */
export function buildChangTrendsOption(): EChartsCoreOption {
  return {
    color: COLORS,
    backgroundColor: "#000613",
    legend: {
      icon: "circle",
      right: "5%",
      textStyle: { color: "#f1f1f1" },
      itemStyle: { color: "#76f8fe" },
    },
    dataset: {
      source: [
        ["product", "data", "data2"],
        ["01", "100", "30"],
        ["02", "50", "60"],
        ["03", "25", "50"],
        ["04", "60", "70"],
        ["05", "77", "44"],
        ["06", "87", "50"],
        ["07", "45", "85"],
        ["08", "67", "66"],
        ["09", "89", "50"],
        ["10", "24", "78"],
        ["11", "56", "48"],
        ["12", "46", "76"],
      ],
    },
    grid: { top: "10%", bottom: "20%", right: "5%", left: "10%" },
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
        textStyle: { color: "#fff", fontSize: 12 },
      },
    },
    yAxis: { show: false, type: "value" },
    series: [
      {
        name: "新增", // 顶
        type: "pictorialBar",
        symbolSize: [25, 10],
        symbolOffset: [0, -5],
        symbolPosition: "end",
        z: 12,
        itemStyle: {
          color: "#fefefe",
          barBorderRadius: 30,
          shadowColor: "#000",
          shadowBlur: 100,
        },
      },
      {
        name: "新增", // 底
        type: "pictorialBar",
        symbolSize: [25, 10],
        symbolOffset: [0, 5],
        z: 12,
        itemStyle: { color: COLORS[2] + "1)", barBorderRadius: 30 },
      },
      {
        name: "新增", // 透明描边帽
        type: "pictorialBar",
        symbolSize: [36, 12],
        symbolOffset: [0, 8],
        itemStyle: { color: "transparent", borderColor: "rgba(14, 248, 254,1)", borderWidth: 2 },
      },
      {
        name: "新增",
        type: "bar",
        itemStyle: {
          // 旧代码为每个 dataIndex 建 LinearGradient 后返回，等价于直接返回
          color: () =>
            new graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: COLORS[2] + ".6)" },
              { offset: 1, color: "rgba(0,0,0,0.1)" },
            ]) as unknown as string,
        },
        barWidth: 25,
      },
      {
        name: "持续增长",
        type: "line",
        smooth: true,
        showAllSymbol: false,
        showSymbol: false,
        symbol: "circle",
        symbolSize: 3,
        lineStyle: { show: true, color: "#ffea38" },
        encode: { y: "data2" },
        label: {
          show: false,
          position: "top",
          formatter: (params: { data: [string, string, string] }) => params.data[1] + "%",
        },
        legend: { itemStyle: { color: "#ffea38" } },
        itemStyle: { color: "#ffea38" },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(255,234,56,0.4)" }, // 0% 处的颜色
              { offset: 1, color: "rgba(255,234,56,0.05)" }, // 100% 处的颜色
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  }
}
