import { Navigate, Route, Routes } from "react-router-dom"

// 页面按迁移进度逐个启用；每页对应一个旧 HTML：
import PartyPage from "./pages/PartyPage"
import EconomyPage from "./pages/EconomyPage"
import InvestmentPage from "./pages/InvestmentPage"
import OverviewPage from "./pages/OverviewPage"
import RiskPage from "./pages/RiskPage"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<EconomyPage />} />
      <Route path="/party-building" element={<PartyPage />} />
      <Route path="/investment" element={<InvestmentPage />} />
      <Route path="/overview-of-assets" element={<OverviewPage />} />
      <Route path="/risk-warning" element={<RiskPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
