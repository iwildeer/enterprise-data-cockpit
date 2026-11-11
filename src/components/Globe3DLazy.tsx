import { lazy, Suspense } from "react"
import type { CSSProperties } from "react"

const Globe3D = lazy(() => import("./Globe3D").then((m) => ({ default: m.Globe3D })))

interface Globe3DLazyProps {
  className?: string
  style?: CSSProperties
}

/** 纹理与 GL chunk 加载期间的占位：与 Globe3D 内部占位一致的暗色径向渐变 */
function GlobeFallback({ className, style }: Globe3DLazyProps) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
        backgroundImage:
          "radial-gradient(circle at 50% 50%, rgba(0, 255, 194, 0.06), rgba(0, 8, 16, 0.9) 70%)",
        ...style,
      }}
    />
  )
}

/**
 * 3D 地球的懒加载入口：Globe3D 连同 echarts-gl（~633KB）、d3 等值线、
 * 地球纹理一起拆成独立 chunk，页面主体先渲染，GL 代码到位后地球渐入，
 * 消除「中间区域白屏等 3D 库」的串行阻塞。
 */
export function Globe3DLazy({ className, style }: Globe3DLazyProps) {
  return (
    <Suspense fallback={<GlobeFallback className={className} style={style} />}>
      <Globe3D className={className} style={style} />
    </Suspense>
  )
}
