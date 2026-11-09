import { Navigate, Route, Routes } from "react-router-dom"

// 页面按迁移进度逐个启用；每页对应一个旧 HTML：
import PartyPage from "./pages/PartyPage"
import EconomyPage from "./pages/EconomyPage"
import InvestmentPage from "./pages/InvestmentPage"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<EconomyPage />} />
      <Route path="/party-building" element={<PartyPage />} />
      <Route path="/investment" element={<InvestmentPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
