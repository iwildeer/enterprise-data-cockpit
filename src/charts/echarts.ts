import * as echarts from "echarts"

// 3D 立方体柱的三个自定义面，来自 src/js/index.js（与 turnoverRateEChart.js 完全相同）。
// 统一在此注册，保证全局只注册一次，各图表模块都从这里 import echarts。
const offsetX = 20
const offsetY = 10

// 绘制左侧面
const CubeLeft = echarts.graphic.extendShape({
  shape: { x: 0, y: 0 },
  buildPath(ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c0 = [shape.x, shape.y]
    const c1 = [shape.x - offsetX, shape.y - offsetY]
    const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY]
    const c3 = [xAxisPoint[0], xAxisPoint[1]]
    ctx.moveTo(c0[0], c0[1])
    ctx.lineTo(c1[0], c1[1])
    ctx.lineTo(c2[0], c2[1])
    ctx.lineTo(c3[0], c3[1])
    ctx.closePath()
  },
})

// 绘制右侧面
const CubeRight = echarts.graphic.extendShape({
  shape: { x: 0, y: 0 },
  buildPath(ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c1 = [shape.x, shape.y]
    const c2 = [xAxisPoint[0], xAxisPoint[1]]
    const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY]
    const c4 = [shape.x + offsetX, shape.y - offsetY]
    ctx.moveTo(c1[0], c1[1])
    ctx.lineTo(c2[0], c2[1])
    ctx.lineTo(c3[0], c3[1])
    ctx.lineTo(c4[0], c4[1])
    ctx.closePath()
  },
})

// 绘制顶面
const CubeTop = echarts.graphic.extendShape({
  shape: { x: 0, y: 0 },
  buildPath(ctx, shape) {
    const c1 = [shape.x, shape.y]
    const c2 = [shape.x + offsetX, shape.y - offsetY] // 右点
    const c3 = [shape.x, shape.y - offsetX]
    const c4 = [shape.x - offsetX, shape.y - offsetY]
    ctx.moveTo(c1[0], c1[1])
    ctx.lineTo(c2[0], c2[1])
    ctx.lineTo(c3[0], c3[1])
    ctx.lineTo(c4[0], c4[1])
    ctx.closePath()
  },
})

echarts.graphic.registerShape("CubeLeft", CubeLeft)
echarts.graphic.registerShape("CubeRight", CubeRight)
echarts.graphic.registerShape("CubeTop", CubeTop)

export { echarts }
export type { EChartsCoreOption } from "echarts"
