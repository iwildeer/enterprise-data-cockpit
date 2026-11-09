import type { EChartsCoreOption } from "echarts"

/**
 * 投资项目完成图：山形（pictorialBar）条形图。
 * 移植自 src/js/hill.js（旧代码每项的渐变起止色相同，是退化的纯色，
 * 此处直接用纯色表示，视觉不变）。
 */
interface HillDatum {
  value: number
  color: string
}

const HILL_DATA: HillDatum[] = [
  { value: 5.36, color: "rgba(68, 111, 129)" },
  { value: 3.37, color: "rgba(39, 71, 126)" },
  { value: 2.43, color: "rgba(81, 128, 117)" },
  { value: 3.37, color: "rgba(109, 105, 42)" },
  { value: 0.98, color: "rgba(31, 54, 75)" },
  { value: 0.65, color: "rgba(91, 66, 25)" },
  { value: 2.16, color: "rgba(37, 50, 102)" },
]

export function buildHillOption(): EChartsCoreOption {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    grid: { left: "12%", top: "5%", bottom: "12%", right: "8%" },
    xAxis: {
      data: ["土地", "新筑股份", "财产保险", "发展城投", "轨道投资", "新能源", "通讯"],
      axisTick: { show: false },
      axisLabel: { textStyle: { color: "#f1f1f1", fontSize: 11 } },
    },
    yAxis: [
      {
        splitNumber: 6,
        axisTick: { show: false },
        axisLine: {
          lineStyle: { color: "rgba(255, 129, 109, 0.1)", width: 1 }, // 这里是为了突出显示加上的
        },
        axisLabel: { textStyle: { color: "#999" } },
        splitArea: { areaStyle: { color: "rgba(255,255,255,.5)" } },
        splitLine: {
          show: true,
          lineStyle: { color: "#2d3437", width: 0.5, type: "dashed" },
        },
      },
    ],
    series: [
      {
        name: "hill",
        type: "pictorialBar",
        barCategoryGap: "0%",
        symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
        label: {
          show: true,
          position: "top",
          distance: 4,
          color: "#fff",
          fontSize: 12,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter: (data: any) => data.value + "%",
        },
        data: HILL_DATA.map((d) => ({
          value: d.value,
          itemStyle: { color: d.color },
        })),
        z: 10,
      },
    ],
  }
}
