export interface NavItem {
  label: string
  path: string
  /** 主舞台高度（不含 header 91px / footer 62px） */
  stageHeight: number
}

/**
 * 顶部导航顺序与旧页面 markup 一致：
 * 左 [国资总览, 投资管理, 经济运行]，右 [三重一大, 党建管理, 风险分析]。
 */
export const NAV_LEFT: NavItem[] = [
  { label: "国资总览", path: "/overview-of-assets", stageHeight: 750 },
  { label: "投资管理", path: "/investment", stageHeight: 750 },
  { label: "经济运行", path: "/", stageHeight: 750 },
]

export const NAV_RIGHT: NavItem[] = [
  { label: "三重一大", path: "/triple-one", stageHeight: 750 },
  { label: "党建管理", path: "/party-building", stageHeight: 850 },
  { label: "风险分析", path: "/risk-warning", stageHeight: 800 },
]
