import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"
import * as echarts from "echarts"
import type { EChartsCoreOption } from "echarts"
import "echarts-gl"
import { contours, geoIdentity, geoPath, timer as d3Timer } from "d3"
import type { ContourMultiPolygon, Timer } from "d3"
import scanImg from "../assets/images/scanImg.png"
import baseImg from "../assets/images/baseImg.webp"

interface Globe3DProps {
  className?: string
  style?: CSSProperties
}

/**
 * 中间的 3D 地球：d3.contours 对 scanImg.png 逐帧取等值线，
 * 画到 4096x2048 canvas 上作为 globe 的 emission 图层循环扫描。
 * 移植自 src/js/3d-global.js（无数据的 scatter3D 涟漪系列原本就不渲染，
 * 未移植）。
 *
 * 加载优化：
 * - 底图（baseImg.webp，450KB）与扫描图（scanImg.png，62KB）已重编码，
 *   且资源预缩放到等值线采样分辨率 512x256（原为 4096x2048 在线 /8）。
 * - 地球不等待扫描图：立即 setOption 渲染底图，等值线层下载完再合并，
 *   避免「白屏等 scanImg」的串行加载。
 * - 扫描动画隔帧执行（约 30fps）：阈值 10s 扫一个周期，慢动作无视觉差异，
 *   主线程 contour 计算减半。
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
    let disposed = false

    // 先渲染地球本体（底图就绪即出球），不等扫描图
    const baseOption: EChartsCoreOption = {
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
      },
    }
    chart.setOption(baseOption)

    loadImage(scanImg).then((image) => {
      if (disposed) return
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

      // 初始帧（阈值 config.threshold），随后合并 emission 图层并启动扫描
      draw(contourGen.thresholds([config.threshold])(values))

      chart.setOption({
        globe: {
          layers: [
            {
              type: "blend",
              blendTo: "emission",
              texture: contourChart,
              intensity: config.intensity,
            },
          ],
        },
      })

      // 等值线扫描动画（t % 10000 循环推进阈值；原逻辑 levels=1）。
      // 隔帧执行（约 30fps）：threshold 每帧只推进 1/600，肉眼不可辨
      let tickCount = 0
      animationTimer = d3Timer((t) => {
        if (++tickCount % 2 !== 0) return
        const threshold = (t % 10000) / 10000
        draw(contourGen.thresholds([threshold % 1])(values))
      })
    })

    return () => {
      disposed = true
      animationTimer?.stop()
      contourChart.dispose()
      chart.dispose()
    }
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        // 纹理下载期间的占位：暗色径向渐变，避免黑洞/白屏突兀
        backgroundImage:
          "radial-gradient(circle at 50% 50%, rgba(0, 255, 194, 0.06), rgba(0, 8, 16, 0.9) 70%)",
        ...style,
      }}
    />
  )
}

function loadImage(url: string): Promise<ImageData> {
  return new Promise((resolve) => {
    const image = new Image()
    image.src = url
    image.onload = () => {
      // scanImg.png 已预缩放到采样分辨率（512x256），原尺寸解码即可
      const canvas = document.createElement("canvas")
      canvas.width = image.width
      canvas.height = image.height
      const context = canvas.getContext("2d")!
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      resolve(context.getImageData(0, 0, canvas.width, canvas.height))
    }
  })
}
