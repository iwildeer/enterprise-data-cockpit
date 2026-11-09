import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"
import * as echarts from "echarts"
import type { EChartsCoreOption } from "echarts"
import "echarts-gl"
import { contours, geoIdentity, geoPath, timer as d3Timer } from "d3"
import type { Timer } from "d3"
import type { ContourMultiPolygon } from "d3-contour"
import scanImg from "../assets/images/scanImg.jpg"
import baseImg from "../assets/images/baseImg.png"

interface Globe3DProps {
  className?: string
  style?: CSSProperties
}

/**
 * 中间的 3D 地球：d3.contours 对 scanImg.jpg 逐帧取等值线，
 * 画到 4096x2048 canvas 上作为 globe 的 emission 图层循环扫描。
 * 移植自 src/js/3d-global.js（无数据的 scatter3D 涟漪系列原本就不渲染，
 * 未移植；echarts-gl 已随 pie3d 进入主包，故无需 React.lazy）。
 */
export function Globe3D({ className, style }: Globe3DProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const config = {
      lineWidth: 0.5, // 扫描线条宽度
      color: "#00FFC2", // 线条颜色
      levels: 1,
      intensity: 3, // 强度
      threshold: 0.01,
    }

    const canvas = document.createElement("canvas")
    canvas.width = 4096
    canvas.height = 2048
    const context = canvas.getContext("2d")!
    context.lineWidth = config.lineWidth
    context.strokeStyle = config.color
    context.fillStyle = config.color
    context.shadowColor = config.color

    const chart = echarts.init(el)
    const contourChart = echarts.init(document.createElement("canvas"), null, {
      width: 4096,
      height: 2048,
    })

    const contourImg = new echarts.graphic.Image({
      style: {
        image: canvas,
        x: -1,
        y: -1,
        width: canvas.width + 2,
        height: canvas.height + 2,
      },
    })
    contourChart.getZr().add(contourImg)
    const onupdate = () => {
      contourImg.dirty()
    }

    let animationTimer: Timer | null = null

    loadImage(scanImg).then((image) => {
      const m = image.height
      const n = image.width
      const values = new Array<number>(n * m)
      const contourGen = contours().size([n, m]).smooth(true)
      const projection = geoIdentity().scale(canvas.width / n)
      const path = geoPath(projection, context)

      for (let j = 0, k = 0; j < m; ++j) {
        for (let i = 0; i < n; ++i, ++k) {
          values[k] = image.data[k << 2] / 255
        }
      }

      function draw(results: ContourMultiPolygon[]) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        results.forEach((d, idx) => {
          context.beginPath()
          path(d)
          context.globalAlpha = 1
          context.stroke()
          if (idx > (config.levels / 5) * 3) {
            context.globalAlpha = 0.01
            context.fill()
          }
        })
        onupdate()
      }

      // 初始帧（阈值 config.threshold），随后 setOption 并启动扫描动画
      draw(contourGen.thresholds([config.threshold])(values))

      const option: EChartsCoreOption = {
        globe: {
          baseTexture: baseImg,
          displacementScale: 0.05,
          displacementQuality: "high",
          shading: "realistic",
          realisticMaterial: { roughness: 0.2, metalness: 0 },
          postEffect: {
            enable: true,
            depthOfField: {
              // enable: true
            },
          },
          light: {
            ambient: { intensity: 1 },
            main: { intensity: 0, shadow: false }, // 主光源
          },
          viewControl: {
            center: [0, 0, 0],
            alpha: 30,
            beta: 160,
            autoRotate: true,
            autoRotateAfterStill: 10,
            distance: 240,
            autoRotateSpeed: 4,
          },
          layers: [
            {
              type: "blend",
              blendTo: "emission",
              texture: contourChart,
              intensity: config.intensity,
            },
          ],
        },
      }
      chart.setOption(option)

      // 等值线扫描动画（t % 10000 循环推进阈值；原逻辑 levels=1）
      animationTimer = d3Timer((t) => {
        const threshold = (t % 10000) / 10000
        draw(contourGen.thresholds([threshold % 1])(values))
      })

    })

    return () => {
      animationTimer?.stop()
      contourChart.dispose()
      chart.dispose()
    }
  }, [])

  return <div ref={ref} className={className} style={{ width: "100%", height: "100%", ...style }} />
}

function loadImage(url: string): Promise<ImageData> {
  return new Promise((resolve) => {
    const image = new Image()
    image.src = url
    image.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = image.width / 8
      canvas.height = image.height / 8
      const context = canvas.getContext("2d")!
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      resolve(context.getImageData(0, 0, canvas.width, canvas.height))
    }
  })
}
