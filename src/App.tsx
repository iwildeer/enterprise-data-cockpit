import { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { RouteFallback } from "./components/RouteFallback"

// 页面按迁移进度逐个启用；每页对应一个旧 HTML。
// 路由级懒加载：各页面（连同其独占依赖，如 echarts-gl）拆成独立
// chunk，首屏只下载当前页代码，其余页面切换时按需加载。
const PartyPage = lazy(() => import("./pages/PartyPage"))
const EconomyPage = lazy(() => import("./pages/EconomyPage"))
const InvestmentPage = lazy(() => import("./pages/InvestmentPage"))
const OverviewPage = lazy(() => import("./pages/OverviewPage"))
const RiskPage = lazy(() => import("./pages/RiskPage"))
const TripleOnePage = lazy(() => import("./pages/TripleOnePage"))

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<EconomyPage />} />
        <Route path="/party-building" element={<PartyPage />} />
        <Route path="/investment" element={<InvestmentPage />} />
        <Route path="/overview-of-assets" element={<OverviewPage />} />
        <Route path="/risk-warning" element={<RiskPage />} />
        <Route path="/triple-one" element={<TripleOnePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
