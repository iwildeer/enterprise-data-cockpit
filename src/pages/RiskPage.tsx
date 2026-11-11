import { DashboardShell } from "../components/DashboardShell"
import { EChart } from "../components/EChart"
import { FrameAnimation } from "../components/FrameAnimation"
import { VideoBackground } from "../components/VideoBackground"
import { SEQUENCES } from "../lib/sequences"
import { buildChangTrendsOption } from "../charts/changTrends"
import { buildRadarOption } from "../charts/radar"
import { buildRingGaugeOption } from "../charts/ringGauge"
import gongYeIcon from "../assets/images/main/6/gongYeIcon.png"
import shangMaoIcon from "../assets/images/main/6/shangMaoIcon.png"
import touZiIcon from "../assets/images/main/6/touZiIcon.png"
import zqchIcon1 from "../assets/images/main/6/zqchIcon1.png"
import zqchIcon2 from "../assets/images/main/6/zqchIcon2.png"
import zqchIcon3 from "../assets/images/main/6/zqchIcon3.png"
import zqchIcon4 from "../assets/images/main/6/zqchIcon4.png"
import titleImg from "../assets/images/title.png"

/** 行业预警分析顶部三个行业 */
// 工业 的 p 在原页多出 w-30 h-10 text-center（另两项没有），保真保留
const INDUSTRIES = [
  { img: gongYeIcon, num: "178", label: "工业", color: "#eae039", box: true },
  { img: shangMaoIcon, num: "203", label: "商贸", color: "#7bf7d4", box: false },
  { img: touZiIcon, num: "178", label: "投资", color: "#a6fafa", box: false },
]

/** 三列行业预警：各含两个环形仪表 + 家数文案（值/颜色原样取自 circles.js） */
const INDUSTRY_COLUMNS = [
  {
    bg: "bg-hyyjfxBG1",
    gauges: [
      { value: 80, color: "#1598FF", num: "3", label: "超预警线" },
      { value: 45, color: "#7eb651", num: "12", label: "超监管线" },
    ],
  },
  {
    bg: "bg-hyyjfxBG2",
    gauges: [
      { value: 80, color: "#7eb651", num: "2", label: "超预警线" },
      { value: 80, color: "#7eb651", num: "85", label: "超监管线" },
    ],
  },
  {
    bg: "bg-hyyjfxBG3",
    gauges: [
      { value: 80, color: "#f0a1a8", num: "120", label: "超预警线" },
      { value: 80, color: "#3ff197", num: "10", label: "超监管线" },
    ],
  },
]

/** 雷达图右侧数值表（红=预警值 黄=监管值，第一行 leading-60 为原页怪癖） */
const RADAR_LEGEND = [
  { label: "盈利能力", warn: "1578", ctrl: "4289", leading60: true },
  { label: "偿债能力", warn: "1102", ctrl: "534", leading60: false },
  { label: "资产质量", warn: "768", ctrl: "765", leading60: false },
  { label: "经营增长", warn: "4289", ctrl: "1578", leading60: false },
  { label: "成长能力", warn: "165", ctrl: "1102", leading60: false },
  { label: "财务风险", warn: "769", ctrl: "278", leading60: false },
]

/** 债券偿还汇总行（首行黄色 #efef00；下面三行蓝色 #62d9fd） */
const BOND_ROWS = [
  { icon: zqchIcon2, iconSized: true, label: "本月新法" },
  { icon: zqchIcon3, iconSized: true, label: "三个月到期" },
  { icon: zqchIcon4, iconSized: true, label: "一年到期" },
]

/** 风险分析页（旧 riskWarning.html），舞台高 800 */
export default function RiskPage() {
  return (
    <DashboardShell stageHeight={800}>
      {/* 主体内容区域 */}
      <div className="w-500 h-200 top-0 left-0 absolute z-20">
        <div className="relative w-500 h-200 inline-flex">
          {/* 左侧区域 */}
          <div className="w-122.5 h-200 text-[#f1f1f1]">
            {/* 预警变动趋势 */}
            <div className="w-122.5 h-90">
              <div className="relative h-15 leading-12.5">
                <img className="absolute top-0 left-0 h-15" src={titleImg} alt="" />
                <span className="font-PangMenZhengDao ml-30">预警变动趋势</span>
              </div>
              <div className="w-122.5 h-75">
                <div id="changTrends" className="w-122.5 h-75">
                  <EChart option={buildChangTrendsOption()} />
                </div>
              </div>
            </div>

            {/* 行业预警分析 */}
            <div className="w-122.5 h-110">
              <div className="w-122.5 h-40 flex">
                {INDUSTRIES.map(({ img, num, label, color, box }) => (
                  <div key={label} className="flex-1 h-40 flex flex-col items-center justify-center">
                    <span className="font-Oswald text-[24px]">{num}</span>
                    <img className="w-25 h-25" src={img} alt="" />
                    <p
                      className={`font-PangMenZhengDao text-[24px] ${box ? "w-30 h-10 text-center" : ""}`}
                      style={{ color }}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="w-122.5 h-70 inline-flex gap-3.5 justify-between px-8.75">
                {INDUSTRY_COLUMNS.map(({ bg, gauges }) => (
                  <div key={bg} className={`w-35 h-70 pt-15 ${bg} bg-no-repeat bg-cover`}>
                    {gauges.map(({ value, color, num, label }, i) => (
                      <div
                        key={label}
                        className={`w-35 h-17.5 px-3 flex justify-between items-center ${
                          i > 0 ? "mt-12.5" : ""
                        }`}
                      >
                        <div className="w-15 h-15">
                          <EChart option={buildRingGaugeOption(value, color)} />
                        </div>
                        {/* nowrap：旧页字体栈下“超预警线”恰好单行，新字体栈差 ~0.4px 会折行，按旧页视觉固定单行 */}
                        <div className="text-[14px] text-[#f1f1f1] whitespace-nowrap">
                          <p>
                            <span className="font-Oswald text-[20px] mr-1">{num}</span>家
                          </p>
                          <p>{label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 中间区域 */}
          <div className="w-255 h-200 relative">
            <div className="absolute left-0 top-142.5 w-40 h-13 leading-13 bg-kv-a1 bg-no-repeat bg-contain text-center text-[#f1f1f1]">
              <span className="font-PangMenZhengDao">
                非流动比率 <b className="font-YouShe">1.1%</b>
              </span>
            </div>
            <div className="absolute top-170 left-55 w-40 h-13 leading-13 bg-kv-a1 bg-no-repeat bg-contain text-center text-[#f1f1f1]">
              <span className="font-PangMenZhengDao">
                资产负债率 <b className="font-YouShe">1.2%</b>
              </span>
            </div>
            <div className="absolute top-180 left-112.5 w-40 h-13 leading-13 bg-kv-a1 bg-no-repeat bg-contain text-center text-[#f1f1f1]">
              <span className="font-PangMenZhengDao">
                流动比率 <b className="font-YouShe">8.1%</b>
              </span>
            </div>
            <div className="absolute top-170 left-162.5 w-40 h-13 leading-13 bg-kv-a1 bg-no-repeat bg-contain text-center text-[#f1f1f1]">
              <span className="font-PangMenZhengDao">
                担保余额 <b className="font-YouShe">314</b>
              </span>
            </div>
            <div className="absolute right-0 top-142.5 w-40 h-13 leading-13 bg-kv-a1 bg-no-repeat bg-contain text-center text-[#f1f1f1]">
              <span className="font-PangMenZhengDao">
                净利润 <b className="font-YouShe">20.1%</b>
              </span>
            </div>
            <div className="absolute right-0 top-92.5 w-40 h-13 leading-13 bg-kv-a1 bg-no-repeat bg-contain text-center text-[#f1f1f1]">
              <span className="font-PangMenZhengDao">
                现金流入 <b className="font-YouShe">1000</b>
              </span>
            </div>
          </div>

          {/* 右侧区域 */}
          <div className="w-122.5 h-200 text-[#f1f1f1]">
            {/* 财务能力预警 */}
            <div className="w-122.5 h-90">
              <div className="h-15 text-[#f1f1f1] leading-11.25 indent-60">
                {/* 原页此处 img 只有 absolute，锚定到整个舞台左上角（视觉怪癖，保真保留） */}
                <img className="absolute" style={{ transform: "rotate3d(0, 1, 0, 180deg)" }} src={titleImg} alt="" />
                <span className="font-PangMenZhengDao text-[20px]">财务能力预警</span>
              </div>
              <div className="w-122.5 h-75">
                <div id="radarChart" className="w-80 h-60 mt-5 float-left">
                  <EChart option={buildRadarOption()} />
                </div>
                <div className="w-42.5 h-60 float-left mt-5 pr-5">
                  {RADAR_LEGEND.map(({ label, warn, ctrl, leading60 }) => (
                    <div
                      key={label}
                      className={`h-10 text-[18px] flex justify-between ${leading60 ? "leading-15" : "leading-10"}`}
                    >
                      {label}
                      <span className="text-[#f0a1a8] font-Oswald mx-1.25">{warn}</span>
                      <span className="text-[yellow] font-Oswald">{ctrl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 债券偿还 */}
            <div className="w-122.5 h-105">
              <div className="h-15 text-[#f1f1f1] leading-11.25 indent-60">
                <img className="absolute" style={{ transform: "rotate3d(0, 1, 0, 180deg)" }} src={titleImg} alt="" />
                <span className="font-PangMenZhengDao text-[20px]">债券偿还</span>
              </div>
              <div className="w-117.5 h-52.5">
                <div className="w-117.5 inline-flex h-9 bg-zqchBG2 bg-no-repeat bg-contain bg-[center_bottom_10px]">
                  <div className="w-1/4 text-start font-Oswald inline-flex">
                    <img src={zqchIcon1} alt="" />
                    月内到期
                  </div>
                  <div className="w-1/4 text-center font-Oswald text-[24px] text-[#efef00]">142.8</div>
                  <div className="w-1/5 text-center font-Oswald text-[24px] text-[#efef00]">142.8</div>
                  <div className="w-[15%] text-center font-Oswald text-[24px] text-[#efef00]">100%</div>
                  <div className="w-[15%] text-center font-Oswald text-[24px] text-[#efef00]">20</div>
                </div>
                <table className="w-117.5 h-43.5 text-[16px]">
                  <thead>
                    <tr>
                      <th className="font-normal"></th>
                      <th className="font-normal">本月偿还(亿)</th>
                      <th className="font-normal">累计(亿)</th>
                      <th className="font-normal">占比</th>
                      <th className="font-normal">笔数</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {["所属集团", "所属集团所属", "所属集团所属集团"].map((name) => (
                      <tr key={name}>
                        <td className="text-start w-1/4">{name}</td>
                        <td className="w-1/4">24.3</td>
                        <td className="w-1/5">24.3</td>
                        <td className="w-[15%]">24.3%</td>
                        <td className="w-[15%]">5</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="w-117.5 h-37.5 flex flex-col">
                {BOND_ROWS.map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex-1 h-12.5 leading-12.5 inline-flex bg-zqchBG2 bg-no-repeat bg-contain bg-[center_bottom_10px]"
                  >
                    <div className="w-1/4 text-start font-Oswald inline-flex">
                      <img className="w-9 h-9" src={icon} alt="" />
                      {label}
                    </div>
                    <div className="w-1/4 text-center font-Oswald text-[24px] text-[#62d9fd]">142.8</div>
                    <div className="w-1/5 text-center font-Oswald text-[24px] text-[#62d9fd]">142.8</div>
                    <div className="w-[15%] text-center font-Oswald text-[24px] text-[#62d9fd]">100%</div>
                    <div className="w-[15%] text-center font-Oswald text-[24px] text-[#62d9fd]">20</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 背景：帧动画（z-10）+ 底部网格视频（z-2，与旧页同为 z-10 容器的兄弟节点，
          视频画在帧动画之下，不能放进容器内） */}
      <div className="absolute z-10 text-white inset-0">
        <FrameAnimation seq={SEQUENCES.risk} />
      </div>
      <VideoBackground className="absolute bottom-0 z-2" src="/media/BG-grid.mp4" />
    </DashboardShell>
  )
}
