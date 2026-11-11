import { DashboardShell } from "../components/DashboardShell"
import { EChart } from "../components/EChart"
import { GlChart } from "../components/GlChart"
import { Globe3DLazy } from "../components/Globe3DLazy"
import { VideoBackground } from "../components/VideoBackground"
import { EnterpriseIcon, FinanceRoundedIcon, HostRoundedIcon } from "../components/icons"
import { buildCubeBarOption } from "../charts/cubeBar"
import { buildDoubleDiscountOption } from "../charts/doubleDiscount"
import { buildHillOption } from "../charts/hill"
import { buildPie3dOption } from "../charts/pie3d"
import { buildRankListOption } from "../charts/rankList"
import icon1 from "../assets/images/main/1/icon1.png"
import icon2 from "../assets/images/main/1/icon2.png"
import icon3 from "../assets/images/main/1/icon3.png"
import k2Img from "../assets/images/main/1/k2.png"
import kvS1 from "../assets/images/kv-s1.png"
import kvS2 from "../assets/images/kv-s2.png"
import kvI1 from "../assets/images/kv-i1.png"
import b1 from "../assets/images/b1.png"
import d1 from "../assets/images/d1.png"
import d11 from "../assets/images/d1-1.png"
import d12 from "../assets/images/d1-2.png"
import d13 from "../assets/images/d1-3.png"
import d14 from "../assets/images/d1-4.png"
import d15 from "../assets/images/d1-5.png"
import d16 from "../assets/images/d1-6.png"
import d17 from "../assets/images/d1-7.png"
import d18 from "../assets/images/d1-8.png"
import titleImg from "../assets/images/title.png"

/** 左上“企业总数”三项 */
const COMPANY_STATS = [
  { img: icon1, label: "一级企业", num: "2,079" },
  { img: icon2, label: "二级企业", num: "3,579" },
  { img: icon3, label: "三级企业", num: "1483" },
]

/** 资金分布右侧银行数据（原页 markup；工商银行的颜色类在旧页里写错成
    `text-[ #578992]`，渲染为默认白色，此处按同类页的正确颜色修正）。
    tight: 原页中国银行行的百分号与金额之间无空格 */
const BANK_ROWS = [
  { name: "中国银行", pct: 40, num: "1665", color: "#fcc62a", tight: true },
  { name: "建设银行", pct: 5, num: "230", color: "#609fdf", tight: false },
  { name: "工商银行", pct: 15, num: "90", color: "#578992", tight: false },
  { name: "农业银行", pct: 5, num: "32", color: "#538bb6", tight: false },
  { name: "招商银行", pct: 40, num: "32", color: "#89dcf6", tight: false },
]

/** 中间左右两侧的指标牌（ml40 表示原页的 ml-10 缩进位置） */
const SIDE_LEFT = [
  { img: d11, label: "资产总额", num: "908", ml40: true },
  { img: d12, label: "利润总额", num: "1448", ml40: false },
  { img: d13, label: "营业收入", num: "2936", ml40: false },
  { img: d14, label: "职工人数", num: "2136", ml40: true },
]
const SIDE_RIGHT = [
  { img: d15, label: "所有者权益", num: "2078", ml40: false },
  { img: d16, label: "负债总数", num: "1447", ml40: true },
  { img: d17, label: "研发经费", num: "1912", ml40: true },
  { img: d18, label: "已交税费", num: "2136", ml40: false },
]

/** 行业资产 TOP3 右侧数字 */
const TOP3_ROWS = [
  { Icon: FinanceRoundedIcon, color: "#75f6fd", value: "53,126" },
  { Icon: EnterpriseIcon, color: "#c7b839", value: "108,978" },
  { Icon: HostRoundedIcon, color: "#75f0cd", value: "4,832,849" },
]

/** 国资总览页（旧 overviewOfAssets.html），舞台高 750 */
export default function OverviewPage() {
  return (
    <DashboardShell stageHeight={750}>
      <div className="main absolute inset-0 w-500 h-187.5 flex justify-between z-99">
        {/* 左侧区域 */}
        <div className="w-127.5 h-187.5">
          {/* 企业总数 */}
          <div className="w-127.5 h-62.5">
            <div className="w-127.5 h-15 bg-title bg-no-repeat bg-cover font-PangMenZhengDao text-[#f1f1f1] indent-30 leading-15">
              企业总数
            </div>
            <div className="w-127.5 h-47.5 px-10 inline-flex justify-between">
              {COMPANY_STATS.map(({ img, label, num }) => (
                <div key={label} className="w-30 h-47.5 flex flex-col justify-center items-center">
                  <img src={img} alt="" />
                  <div className="text-[#f1f1f1] text-[16px] font-PangMenZhengDao">{label}</div>
                  <p className="text-[16px] text-[#f1f1f1]">
                    <span className="text-[28px] font-Oswald mr-1">{num}</span>亿
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 收入分析（与经济运行页的总资产周转率为同一图表） */}
          <div className="w-127.5 h-62.5">
            <div className="w-127.5 h-15 bg-title bg-no-repeat bg-cover font-PangMenZhengDao text-[#f1f1f1] indent-30 leading-15">
              收入分析
            </div>
            <div id="turnoverRate-graph" className="w-127.5 h-50">
              <EChart option={buildCubeBarOption()} />
            </div>
          </div>

          {/* 资金分布 */}
          <div className="w-127.5 h-62.5">
            <div className="w-127.5 h-15 bg-title bg-no-repeat bg-cover font-PangMenZhengDao text-[#f1f1f1] indent-30 leading-15">
              资金分布
            </div>
            <div className="inline-flex text-[#f1f1f1] h-50 w-127.5">
              <div id="3d-Pie" className="w-45 h-45">
                <GlChart option={buildPie3dOption()} />
              </div>
              <div className="px-4.5 py-6.5 w-82.5 h-50 text-[16px]">
                {BANK_ROWS.map((row) => (
                  <p key={row.name} className="float-left w-1/2 h-12.5 leading-12.5 text-[16px]">
                    {row.name}&nbsp;<b>{row.pct}</b>
                    <sub>%</sub>
                    {row.tight ? null : " "}
                    <span className="font-Oswald text-[22px]" style={{ color: row.color }}>
                      {row.num}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 中间区域 */}
        <div className="w-245 h-187.5 relative">
          <div className="w-150 h-150 absolute left-1/2 top-12.5 -translate-x-75">
            {/* 3d地图 */}
            <div id="3d-globe" className="w-150 h-150">
              <Globe3DLazy />
            </div>
          </div>

          {/* 底部圆弧 */}
          <div className="w-245 h-100 absolute top-107.5 left-75">
            <img src={kvS1} alt="" />
          </div>

          {/* 圆环 */}
          <div style={{ perspective: "500px" }} className="w-245 h-50 absolute">
            <img style={{ transform: "translate3d(0, 60px, -30px) rotate3d(1, 0, 0, 121deg)" }} src={b1} alt="" />
          </div>
          <div style={{ perspective: "500px" }} className="w-245 h-50 absolute">
            <img
              className="w-157.5"
              style={{ transform: "translate3d(170px, 180px, 40px) rotate3d(1, 0, 0, 121deg)" }}
              src={kvI1}
              alt=""
            />
          </div>
          <div style={{ perspective: "500px" }} className="w-245 h-50 absolute">
            <img
              className="w-250"
              style={{ transform: "translate3d(0px, 40px, 0px) rotate3d(1, 0, 0, 121deg)" }}
              src={kvS2}
              alt=""
            />
          </div>

          {/* 两侧图片 */}
          <div className="absolute w-245 h-175 -z-1 flex justify-between">
            {/* 左侧 */}
            <div className="w-56.25 h-175 flex flex-col justify-center">
              {SIDE_LEFT.map(({ img, label, num, ml40 }) => (
                <div
                  key={label}
                  className={`${ml40 ? "ml-10 " : ""}w-56.25 h-17.5 mb-9 relative`}
                >
                  <img className="absolute top-4.5 left-6.5 z-1" src={img} alt="" />
                  <img className="absolute" src={d1} alt="" />
                  <p className="absolute z-1 font-PangMenZhengDao text-[#f1f1f1] leading-16.25 indent-19.5 w-56.25 h-17.5">
                    {label}
                    {" "}
                    <span className="text-[20px] font-Oswald">{num}</span>
                  </p>
                </div>
              ))}
            </div>
            {/* 右侧 */}
            <div className="w-56.25 h-175 flex flex-col justify-center">
              {SIDE_RIGHT.map(({ img, label, num, ml40 }) => (
                <div
                  key={label}
                  className={`${ml40 ? "ml-10 " : ""}w-56.25 h-17.5 mb-9 relative`}
                >
                  <img className="absolute rotate-180" src={d1} alt="" />
                  <img className="absolute top-6 right-6.5 z-1" src={img} alt="" />
                  <p className="absolute z-1 font-PangMenZhengDao text-[#f1f1f1] leading-16.25 indent-5 w-56.25 h-17.5">
                    {label}
                    {" "}
                    <span className="text-[20px] font-Oswald">{num}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 箭头 */}
          <div className="absolute w-25 h-86.5 top-1/5 -left-[3%] bg-k1 bg-cover bg-no-repeat">
            <img className="mt-[50%] -ml-5" src={k2Img} alt="" />
          </div>
          <div className="absolute w-25 rotate-180 h-86.5 top-1/5 -right-[6%] bg-k1 bg-cover bg-no-repeat">
            <img className="mt-[50%] -ml-5" src={k2Img} alt="" />
          </div>
        </div>

        {/* 右侧区域 */}
        <div className="w-127.5 h-187.5">
          {/* 投资规模趋势 */}
          <div className="w-127.5 h-75">
            <div className="relative indent-60 leading-12 w-127.5 h-15 font-PangMenZhengDao text-[#f1f1f1]">
              <img
                style={{ transform: "rotate3d(0, 1, 0, 180deg)" }}
                className="absolute inset-0"
                src={titleImg}
                alt=""
              />
              <span>投资规模趋势</span>
            </div>
            {/* 双折线图表 */}
            <div id="doubleDiscount" style={{ width: 510, height: 240 }}>
              <EChart option={buildDoubleDiscountOption()} />
            </div>
          </div>

          {/* 投资项目进展 */}
          <div className="w-127.5 h-50 text-[#f1f1f1]">
            <div className="relative indent-60 leading-12 w-127.5 h-15 font-PangMenZhengDao text-[#f1f1f1]">
              <img
                style={{ transform: "rotate3d(0, 1, 0, 180deg)" }}
                className="absolute inset-0"
                src={titleImg}
                alt=""
              />
              <span>投资项目进展</span>
            </div>
            <div id="project-progress" className="w-127.5 h-35">
              <EChart option={buildHillOption()} />
            </div>
          </div>

          {/* 行业资产TOP3 */}
          <div className="w-127.5 h-62.5">
            <div className="relative indent-60 leading-12 w-127.5 h-15 font-PangMenZhengDao text-[#f1f1f1]">
              <img
                style={{ transform: "rotate3d(0, 1, 0, 180deg)" }}
                className="absolute inset-0"
                src={titleImg}
                alt=""
              />
              <span>行业资产TOP3</span>
            </div>

            <div className="w-127.5 h-47.5 relative text-[#f1f1f1]">
              {/* 左边图标 */}
              <div className="absolute z-10">
                {TOP3_ROWS.map(({ Icon, color }, i) => (
                  <svg
                    key={i}
                    className="mt-2.5 ml-2.5 w-12.5 h-12.5"
                    style={{ color }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={i === 1 ? "0 0 32 32" : "0 0 24 24"}
                  >
                    <Icon />
                  </svg>
                ))}
              </div>

              {/* 排行榜图表 */}
              <div
                id="rankList"
                style={{ width: 510, height: 190 }}
                className="absolute inset-0"
              >
                <EChart option={buildRankListOption()} />
              </div>

              {/* 右边数据 */}
              <div className="absolute right-15 h-47.5">
                {TOP3_ROWS.map(({ color, value }) => (
                  <div key={value} className="h-13.75 leading-13.75 text-end">
                    <span className="text-[26px] font-Oswald mr-0.75" style={{ color }}>
                      {value}
                    </span>
                    万元
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 背景 */}
      <div className="w-500 h-187.5 relative">
        <div className="absolute inset-0" style={{ perspective: "500px" }}>
          <VideoBackground src="/media/BG_26.mp4" style={{ transform: "rotate3d(1, 0, 0, 70deg)" }} />
        </div>
      </div>
    </DashboardShell>
  )
}
