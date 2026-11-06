import { Navigate, Route, Routes } from "react-router-dom"

// 页面按迁移进度逐个启用；每页对应一个旧 HTML：
import PartyPage from "./pages/PartyPage"

export default function App() {
  return (
    <Routes>
      <Route path="/party-building" element={<PartyPage />} />
      <Route path="*" element={<Navigate to="/party-building" replace />} />
    </Routes>
  )
}
