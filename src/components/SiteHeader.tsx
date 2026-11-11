import { NavLink } from "react-router-dom"
import { NAV_LEFT, NAV_RIGHT } from "../lib/nav"
import headerBg from "../assets/images/T.png"

/**
 * 顶部栏：2000x91，背景 T.png，左右各 3 个导航项。
 * 移植自 src/style/common.css 的 header 部分，激活项 #f1f1f1、
 * 其余 #4e769f，与旧页面内联样式的视觉效果一致。
 */
const linkClass = ({ isActive }: { isActive: boolean }) =>
  `no-underline pt-6 ${isActive ? "text-[#f1f1f1]" : "text-[#4e769f]"}`

export function SiteHeader() {
  return (
    <header
      className="inline-flex justify-between w-500 h-22.75 bg-cover bg-center font-PangMenZhengDao text-[#f1f1f1]"
      style={{ backgroundImage: `url(${headerBg})` }}
    >
      <div className="inline-flex justify-between w-127.5 text-[26px] py-1.5 px-7.5 text-[#4e769f]">
        {NAV_LEFT.map((item, i) => (
          <span key={item.path} className="h-10" style={{ marginTop: [0, 10, 25][i] }}>
            <NavLink to={item.path} className={linkClass} end={item.path === "/"}>
              {item.label}
            </NavLink>
          </span>
        ))}
      </div>
      <div className="h-15 leading-15 text-[40px] text-[#ddf7ff]">
        数字企业大数据监管平台
      </div>
      <div className="inline-flex justify-between w-127.5 text-[26px] py-1.5 px-7.5 text-[#4e769f]">
        {NAV_RIGHT.map((item, i) => (
          <span key={item.path} className="h-10" style={{ marginTop: [25, 10, 0][i] }}>
            <NavLink to={item.path} className={linkClass}>
              {item.label}
            </NavLink>
          </span>
        ))}
      </div>
    </header>
  )
}
