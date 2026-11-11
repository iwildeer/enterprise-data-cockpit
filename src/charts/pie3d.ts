import type { EChartsCoreOption } from "echarts"

// echarts-gl 不在此静态引入：option 构建不需要它，渲染时才需要其
// 注册副作用。需要渲染 pie3d 的容器请用 <GlChart>（内部经
// lib/echartsGl 异步加载 GL chunk，避免 633KB 库阻塞页面首绘）。

interface PieDatum {
  name: string
  value: number
  itemStyle?: { color?: string; opacity?: number }
}

/**
 * 银行账户/资金分布：echarts-gl 3D 饼图。
 * 移植自 src/js/3dPie.js（hover 高亮部分原本就被注释掉了，未移植）。
 */

// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
function getParametricEquation(
  startRatio: number,
  endRatio: number,
  isSelected: boolean,
  isHovered: boolean,
  k: number,
  h: number,
) {
  const midRatio = (startRatio + endRatio) / 2
  const startRadian = startRatio * Math.PI * 2
  const endRadian = endRatio * Math.PI * 2
  const midRadian = midRatio * Math.PI * 2

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false
  }

  k = typeof k !== "undefined" ? k : 1 / 3

  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0
  const hoverRate = isHovered ? 1.05 : 1

  return {
    u: { min: -Math.PI, max: Math.PI * 3, step: Math.PI / 32 },
    v: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
    x(u: number, v: number) {
      if (u < startRadian) return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      if (u > endRadian) return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
    },
    y(u: number, v: number) {
      if (u < startRadian) return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      if (u > endRadian) return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
    },
    z(u: number, v: number) {
      if (u < -Math.PI * 0.5) return Math.sin(u)
      if (u > Math.PI * 2.5) return Math.sin(u) * h * 0.1
      // 当前图形的高度是 Z 根据 h（每个 value 的值决定的）
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1
    },
  }
}

// 生成模拟 3D 饼图的配置项
function getPie3D(pieData: PieDatum[], internalDiameterRatio?: number) {
  const series: Record<string, unknown>[] = []
  let sumValue = 0
  let startValue = 0
  let endValue = 0
  const k =
    typeof internalDiameterRatio !== "undefined"
      ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
      : 1 / 3

  for (let i = 0; i < pieData.length; i += 1) {
    sumValue += pieData[i].value

    const seriesItem: Record<string, unknown> = {
      name: typeof pieData[i].name === "undefined" ? `series${i}` : pieData[i].name,
      type: "surface",
      parametric: true,
      wireframe: { show: false },
      pieData: pieData[i],
      pieStatus: { selected: false, hovered: false, k },
    }

    if (typeof pieData[i].itemStyle !== "undefined") {
      const itemStyle = { ...pieData[i].itemStyle }
      seriesItem.itemStyle = itemStyle
    }
    series.push(seriesItem)
  }

  for (let i = 0; i < series.length; i += 1) {
    const pieData = series[i].pieData as PieDatum & { startRatio: number; endRatio: number }
    endValue = startValue + pieData.value
    pieData.startRatio = startValue / sumValue
    pieData.endRatio = endValue / sumValue
    series[i].parametricEquation = getParametricEquation(
      pieData.startRatio,
      pieData.endRatio,
      false,
      false,
      k,
      // 使除了第一个之外的值都是 10
      pieData.value === (series[0].pieData as PieDatum).value ? 35 : 10,
    )
    startValue = endValue
  }

  const option = {
    tooltip: {
      formatter: (params: { seriesName: string; seriesIndex: number; color: string }) => {
        if (params.seriesName !== "mouseoutSeries") {
          return `${params.seriesName}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>${
            (option.series[params.seriesIndex].pieData as PieDatum).value
          }`
        }
        return ""
      },
    },
    xAxis3D: { min: -1, max: 1 },
    yAxis3D: { min: -1, max: 1 },
    zAxis3D: { min: -1, max: 1 },
    grid3D: {
      show: false,
      boxHeight: 5,
      top: "-10%",
      viewControl: {
        alpha: 35,
        rotateSensitivity: 1,
        zoomSensitivity: 0,
        panSensitivity: 0,
        autoRotate: true,
        distance: 150,
      },
      postEffect: {
        enable: false,
        bloom: { enable: true, bloomIntensity: 0.1 },
        SSAO: { enable: true, quality: "medium", radius: 2 },
      },
    },
    series,
  }
  return option
}

/** 3D 饼图 option（index 页：银行账户分布；overview 页：资金分布，数据不同） */
export function buildPie3dOption(data?: PieDatum[], internalDiameterRatio = 0.59): EChartsCoreOption {
  return getPie3D(
    data ?? [
      { name: "中国银行", value: 165, itemStyle: { color: "#fbc528" } },
      { name: "工商银行", value: 90, itemStyle: { color: "#3edce0" } },
      { name: "招商银行", value: 32, itemStyle: { color: "#f94e76" } },
      { name: "建设银行", value: 230, itemStyle: { color: "#018ef1" } },
      { name: "农业银行", value: 32, itemStyle: { color: "#9e60f9" } },
    ],
    internalDiameterRatio,
  )
}
