import type { EChartsCoreOption } from "echarts"

/**
 * 投资总额下方的小型波动条形图。
 * 移植自 src/js/piano-waves.js（旧代码 Math.random(i * 5) 的入参本来就被忽略，
 * 每次进入页面数据随机，行为保持一致）。
 */
export function buildPianoWavesOption(): EChartsCoreOption {
  const xAxisData: number[] = []
  const data: number[] = []
  for (let i = 0; i < 50; i++) {
    xAxisData.push(i)
    data.push(Math.random() + 2)
  }
  return {
    grid: { top: "5%", left: "5%", bottom: "5%", right: "5%" },
    xAxis: { show: false, data: xAxisData },
    visualMap: {
      show: false,
      min: 0,
      max: 50,
      dimension: 0,
      inRange: {
        color: ["#4a657a", "#308e92", "#b1cfa5", "#f5d69f", "#f5898b", "#ef5055"],
      },
    },
    yAxis: {
      axisLine: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: "bar",
        data,
        itemStyle: {
          borderRadius: 5,
          shadowBlur: 10,
          shadowColor: "#111",
        },
        animationEasing: "elasticOut",
        animationEasingUpdate: "elasticOut",
        animationDelay: (idx: number) => idx * 20,
        animationDelayUpdate: (idx: number) => idx * 20,
      },
    ],
  }
}
