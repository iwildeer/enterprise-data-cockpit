import footerBg from "../assets/images/D.png"

/**
 * 底部栏：2000x62，背景 D.png，居中的时间/地点信息。
 * 移植自 src/style/common.css 的 footer / footerInfo 部分。
 */
export function SiteFooter() {
  return (
    <footer
      className="relative w-500 h-15.5 bg-cover bg-center font-PangMenZhengDao text-white"
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      <div className="absolute top-6.25 left-1/2 -translate-x-1/2 flex justify-between w-62.5 h-10 leading-10 text-[20px] text-[#f1f1f1]">
        <div className="time">202501</div>
        <div className="location">集团总部</div>
      </div>
    </footer>
  )
}
