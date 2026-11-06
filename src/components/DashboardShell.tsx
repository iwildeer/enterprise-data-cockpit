import type { ReactNode } from "react"
import { ScaleStage } from "./ScaleStage"
import { SiteHeader } from "./SiteHeader"
import { SiteFooter } from "./SiteFooter"

interface DashboardShellProps {
  /** 主舞台高度（750 / 800 / 850），不含 header 91px 与 footer 62px */
  stageHeight: number
  children: ReactNode
}

const HEADER_H = 91
const FOOTER_H = 62

/** 页面骨架：黑底缩放舞台 + 头部导航 + 主舞台 + 底部栏 */
export function DashboardShell({ stageHeight, children }: DashboardShellProps) {
  return (
    <ScaleStage width={2000} height={HEADER_H + stageHeight + FOOTER_H}>
      <SiteHeader />
      <main className="relative overflow-hidden" style={{ height: stageHeight }}>
        {children}
      </main>
      <SiteFooter />
    </ScaleStage>
  )
}
