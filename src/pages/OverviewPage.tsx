import { DashboardShell } from "../components/DashboardShell"
import { EChart } from "../components/EChart"
import { Globe3D } from "../components/Globe3D"
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

/** 中间左右两侧的指标牌（ml40 表示原页的 ml-[40px] 缩进位置） */
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
      <div className="main absolute top-0 left-0 bottom-0 right-0 w-[2000px] h-[750px] flex justify-between z-[99]">
        {/* 左侧区域 */}
        <div className="w-[510px] h-[750px]">
          {/* 企业总数 */}
          <div className="w-[510px] h-[250px]">
            <div className="w-[510px] h-[60px] bg-title bg-no-repeat bg-cover font-PangMenZhengDao text-[#f1f1f1] indent-[120px] leading-[60px]">
              企业总数
            </div>
            <div className="w-[510px] h-[190px] px-[40px] inline-flex justify-between">
              {COMPANY_STATS.map(({ img, label, num }) => (
                <div key={label} className="w-[120px] h-[190px] flex flex-col justify-center items-center">
                  <img src={img} alt="" />
                  <div className="text-[#f1f1f1] text-[16px] font-PangMenZhengDao">{label}</div>
                  <p className="text-[16px] text-[#f1f1f1]">
                    <span className="text-[28px] font-Oswald mr-[4px]">{num}</span>亿
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 收入分析（与经济运行页的总资产周转率为同一图表） */}
          <div className="w-[510px] h-[250px]">
            <div className="w-[510px] h-[60px] bg-title bg-no-repeat bg-cover font-PangMenZhengDao text-[#f1f1f1] indent-[120px] leading-[60px]">
              收入分析
            </div>
            <div id="turnoverRate-graph" className="w-[510px] h-[200px]">
              <EChart option={buildCubeBarOption()} />
            </div>
          </div>

          {/* 资金分布 */}
          <div className="w-[510px] h-[250px]">
            <div className="w-[510px] h-[60px] bg-title bg-no-repeat bg-cover font-PangMenZhengDao text-[#f1f1f1] indent-[120px] leading-[60px]">
              资金分布
            </div>
            <div className="inline-flex text-[#f1f1f1] h-[200px] w-[510px]">
              <div id="3d-Pie" className="w-[180px] h-[180px]">
                <EChart option={buildPie3dOption()} />
              </div>
              <div className="px-[18px] py-[26px] w-[330px] h-[200px] text-[16px]">
                {BANK_ROWS.map((row) => (
                  <p key={row.name} className="float-left w-[50%] h-[50px] leading-[50px] text-[16px]">
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
        <div className="w-[980px] h-[750px] relative">
          <div className="w-[600px] h-[600px] absolute left-[50%] top-[50px] translate-x-[-300px]">
            {/* 3d地图 */}
            <div id="3d-globe" className="w-[600px] h-[600px]">
              <Globe3D />
            </div>
          </div>

          {/* 底部圆弧 */}
          <div className="w-[980px] h-[400px] absolute top-[430px] left-[300px]">
            <img src={kvS1} alt="" />
          </div>

          {/* 圆环 */}
          <div style={{ perspective: "500px" }} className="w-[980px] h-[200px] absolute">
            <img style={{ transform: "translate3d(0, 60px, -30px) rotate3d(1, 0, 0, 121deg)" }} src={b1} alt="" />
          </div>
          <div style={{ perspective: "500px" }} className="w-[980px] h-[200px] absolute">
            <img
              className="w-[630px]"
              style={{ transform: "translate3d(170px, 180px, 40px) rotate3d(1, 0, 0, 121deg)" }}
              src={kvI1}
              alt=""
            />
          </div>
          <div style={{ perspective: "500px" }} className="w-[980px] h-[200px] absolute">
            <img
              className="w-[1000px]"
              style={{ transform: "translate3d(0px, 40px, 0px) rotate3d(1, 0, 0, 121deg)" }}
              src={kvS2}
              alt=""
            />
          </div>

          {/* 两侧图片 */}
          <div className="absolute w-[980px] h-[700px] z-[-1] flex justify-between">
            {/* 左侧 */}
            <div className="w-[225px] h-[700px] flex flex-col justify-center">
              {SIDE_LEFT.map(({ img, label, num, ml40 }) => (
                <div
                  key={label}
                  className={`${ml40 ? "ml-[40px] " : ""}w-[225px] h-[70px] mb-[36px] relative`}
                >
                  <img className="absolute top-[18px] left-[26px] z-[1]" src={img} alt="" />
                  <img className="absolute" src={d1} alt="" />
                  <p className="absolute z-[1] font-PangMenZhengDao text-[#f1f1f1] leading-[65px] indent-[78px] w-[225px] h-[70px]">
                    {label}
                    {" "}
                    <span className="text-[20px] font-Oswald">{num}</span>
                  </p>
                </div>
              ))}
            </div>
            {/* 右侧 */}
            <div className="w-[225px] h-[700px] flex flex-col justify-center">
              {SIDE_RIGHT.map(({ img, label, num, ml40 }) => (
                <div
                  key={label}
                  className={`${ml40 ? "ml-[40px] " : ""}w-[225px] h-[70px] mb-[36px] relative`}
                >
                  <img className="absolute rotate-180" src={d1} alt="" />
                  <img className="absolute top-[24px] right-[26px] z-[1]" src={img} alt="" />
                  <p className="absolute z-[1] font-PangMenZhengDao text-[#f1f1f1] leading-[65px] indent-[20px] w-[225px] h-[70px]">
                    {label}
                    {" "}
                    <span className="text-[20px] font-Oswald">{num}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 箭头 */}
          <div className="absolute w-[100px] h-[346px] top-[20%] left-[-3%] bg-k1 bg-cover bg-no-repeat">
            <img className="mt-[50%] ml-[-20px]" src={k2Img} alt="" />
          </div>
          <div className="absolute w-[100px] rotate-180 h-[346px] top-[20%] right-[-6%] bg-k1 bg-cover bg-no-repeat">
            <img className="mt-[50%] ml-[-20px]" src={k2Img} alt="" />
          </div>
        </div>

        {/* 右侧区域 */}
        <div className="w-[510px] h-[750px]">
          {/* 投资规模趋势 */}
          <div className="w-[510px] h-[300px]">
            <div className="relative indent-[240px] leading-[48px] w-[510px] h-[60px] font-PangMenZhengDao text-[#f1f1f1]">
              <img
                style={{ transform: "rotate3d(0, 1, 0, 180deg)" }}
                className="absolute top-0 left-0 bottom-0 right-0"
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
          <div className="w-[510px] h-[200px] text-[#f1f1f1]">
            <div className="relative indent-[240px] leading-[48px] w-[510px] h-[60px] font-PangMenZhengDao text-[#f1f1f1]">
              <img
                style={{ transform: "rotate3d(0, 1, 0, 180deg)" }}
                className="absolute top-0 left-0 bottom-0 right-0"
                src={titleImg}
                alt=""
              />
              <span>投资项目进展</span>
            </div>
            <div id="project-progress" className="w-[510px] h-[140px]">
              <EChart option={buildHillOption()} />
            </div>
          </div>

          {/* 行业资产TOP3 */}
          <div className="w-[510px] h-[250px]">
            <div className="relative indent-[240px] leading-[48px] w-[510px] h-[60px] font-PangMenZhengDao text-[#f1f1f1]">
              <img
                style={{ transform: "rotate3d(0, 1, 0, 180deg)" }}
                className="absolute top-0 left-0 bottom-0 right-0"
                src={titleImg}
                alt=""
              />
              <span>行业资产TOP3</span>
            </div>

            <div className="w-[510px] h-[190px] relative text-[#f1f1f1]">
              {/* 左边图标 */}
              <div className="absolute z-10">
                {TOP3_ROWS.map(({ Icon, color }, i) => (
                  <svg
                    key={i}
                    className="mt-[10px] ml-[10px] w-[50px] h-[50px]"
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
                className="absolute top-0 left-0 bottom-0 right-0"
              >
                <EChart option={buildRankListOption()} />
              </div>

              {/* 右边数据 */}
              <div className="absolute right-[60px] h-[190px]">
                {TOP3_ROWS.map(({ color, value }) => (
                  <div key={value} className="h-[55px] leading-[55px] text-end">
                    <span className="text-[26px] font-Oswald mr-[3px]" style={{ color }}>
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
      <div className="w-[2000px] h-[750px] relative">
        <div className="absolute top-0 left-0 bottom-0 right-0" style={{ perspective: "500px" }}>
          <VideoBackground src="/media/BG_26.mp4" style={{ transform: "rotate3d(1, 0, 0, 70deg)" }} />
        </div>
      </div>
    </DashboardShell>
  )
}
