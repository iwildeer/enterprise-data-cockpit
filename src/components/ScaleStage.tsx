import type { CSSProperties, ReactNode } from "react"
import { useWindowScale } from "../hooks/useWindowScale"

interface ScaleStageProps {
  width: number
  height: number
  children: ReactNode
}

/**
 * 固定尺寸舞台：内容按设计稿像素（默认宽 2000）绝对定位，
 * 整体 transform: scale 适配窗口并居中，超出部分黑边。
 *
 * 注意：echarts 在容器上按未缩放的 layout 像素渲染（即设计稿分辨率），
 * 再被 GPU 缩放，清晰度等价于超采样；tooltip 用
 * getBoundingClientRect 换算坐标，缩放下依然准确。
 */
export function ScaleStage({ width, height, children }: ScaleStageProps) {
  const scale = useWindowScale(width, height)
  const style: CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    width,
    height,
    transform: `translate(-50%, -50%) scale(${scale})`,
    transformOrigin: "center",
  }
  return (
    <div className="fixed inset-0 overflow-hidden bg-black select-none">
      <div style={style}>{children}</div>
    </div>
  )
}
