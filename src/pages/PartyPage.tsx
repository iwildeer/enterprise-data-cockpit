import { DashboardShell } from "../components/DashboardShell"
import { EChart } from "../components/EChart"
import { FrameAnimation } from "../components/FrameAnimation"
import { VideoBackground } from "../components/VideoBackground"
import { SEQUENCES } from "../lib/sequences"
import { buildSessionCountOption } from "../charts/sessionCount"
import titleImg from "../assets/images/title.png"
import coneImg from "../assets/images/circularcone.png"
import rleftImg from "../assets/images/partyComstruct/rleft.png"
import rlightImg from "../assets/images/partyComstruct/rlight.png"

/** 党组织数量：圆锥图旁的 4 行数据（数值/占比/标签与旧页一致） */
const ORG_ROWS = [
  { icon: "bg-dddtIcon1", color: "#69e1e7", count: 429, pct: "10%", label: "集团总部" },
  { icon: "bg-dddtIcon2", color: "#c6c321", count: 429, pct: "25%", label: "二级企业" },
  { icon: "bg-dddtIcon3", color: "#62c88d", count: 429, pct: "30%", label: "三级企业" },
  { icon: "bg-dddtIcon2", color: "#2c81e4", count: 429, pct: "35%", label: "其它组织" },
]

/** 党建活动：4 个静态卡片 */
const ACTIVITY_CARDS = [
  { icon: "bg-dk", count: 131, label: "支部党大会" },
  { icon: "bg-dxzh", count: 97, label: "支部委员会" },
  { icon: "bg-zbdydh", count: 220, label: "党小组会" },
  { icon: "bg-zbwyh", count: 659, label: "党课" },
]

/** 中间区域左右各 4 个 "165" 卡片 */
const CENTER_LEFT = [
  { icon: "bg-1png", ml: 35 },
  { icon: "bg-2png", ml: -10 },
  { icon: "bg-3png", ml: 10 },
  { icon: "bg-4png", ml: 30 },
]
const CENTER_RIGHT = [
  { icon: "bg-r1png", ml: -5, leading: 98 },
  { icon: "bg-r2png", ml: 15, leading: 90 },
  { icon: "bg-r3png", ml: 30, leading: 98 },
  { icon: "bg-r4png", ml: 0, leading: 98 },
]

/** 党员结构：4 个绝对定位的标签 */
const STRUCTURE_LABELS = [
  {
    pos: "top-7.5 left-30",
    color: "#e9da63",
    name: "群众",
    a: "23%",
    b: "855人",
  },
  {
    pos: "top-38.75 left-20",
    color: "#5dc6cd",
    name: "无党派人士",
    a: "11%",
    b: "204人",
  },
  {
    pos: "right-17.5 top-2.5",
    color: "#1c5795",
    name: "共产党员",
    a: "3601人",
    b: "37%",
  },
  {
    pos: "right-35 bottom-32.5",
    color: "#65ba8f",
    name: "共青团员",
    a: "983人",
    b: "29%",
  },
]

/** 党的动态：6 条新闻（icon 循环 1→2→3；首行日期在旧页带高亮色） */
const NEWS_ROWS = [
  { icon: "bg-dddtIcon1", tag: "党小组", date: "2021.11.12", text: "市国资党委组人一行到国润公司指导", dateClass: "text-[#5dc7cc]" },
  { icon: "bg-dddtIcon2", tag: "党总支", date: "2021.11.12", text: "《求是》杂志发表习近平总书记重要文章《毫不.......", dateClass: "" },
  { icon: "bg-dddtIcon3", tag: "党支部", date: "2021.11.12", text: "集团党史学习教育“党史故事分享会”活动", dateClass: "" },
  { icon: "bg-dddtIcon1", tag: "党小组", date: "2021.11.12", text: "集团党史学习教育“党史故事分享会”活动", dateClass: "" },
  { icon: "bg-dddtIcon2", tag: "党总支", date: "2021.11.12", text: "市国资党委组人一行到国润公司指导", dateClass: "" },
  { icon: "bg-dddtIcon3", tag: "党小组", date: "2021.11.12", text: "集团党史学习教育“党史故事分享会”活动", dateClass: "" },
]

/** 面板标题（左侧：title.png 底 + 文字；右侧：镜像底图） */
function PanelTitle({ label, flip = false }: { label: string; flip?: boolean }) {
  if (flip) {
    return (
      <div className="h-15 text-[#f1f1f1] leading-[45px] indent-70">
        <img
          className="absolute"
          style={{ transform: "rotate3d(0, 1, 0, 180deg)" }}
          src={titleImg}
          alt=""
        />
        <span className="font-PangMenZhengDao text-[20px]">{label}</span>
      </div>
    )
  }
  return (
    <div className="relative h-15 leading-[50px]">
      <img className="absolute top-0 left-0 h-15" src={titleImg} alt="" />
      <span className="font-PangMenZhengDao ml-30">{label}</span>
    </div>
  )
}

/** 党建管理页（旧 PartyBuildingManagement.html），舞台高 850 */
export default function PartyPage() {
  return (
    <DashboardShell stageHeight={850}>
      {/* 主体内容区域 */}
      <div className="w-500 h-200 top-0 left-0 absolute z-20">
        <div className="relative w-500 h-200 inline-flex">
          {/* 左侧区域 */}
          <div className="w-122.5 h-200 text-[#f1f1f1]">
            <div className="w-122.5 h-70">
              <PanelTitle label="党组织数量" />
              <div className="pl-7.5 w-full h-55 inline-flex items-center">
                {/* 圆锥图 */}
                <img className="w-30 h-40" src={coneImg} alt="" />
                <div className="ml-11.5 -mt-2.5">
                  {ORG_ROWS.map((row) => (
                    <div
                      key={row.label}
                      className={`text-[16px] h-7.5 mb-2.5 indent-5 ${row.icon} bg-no-repeat bg-contain leading-[30px]`}
                    >
                      <span className="text-[24px] font-Oswald" style={{ color: row.color }}>
                        {row.count}
                      </span>
                      <span style={{ color: row.color }}>个</span>{" "}
                      <span className="mx-3.5">{row.pct}</span>{" "}
                      <span className="text-[#999]">{row.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-122.5 h-130">
              <PanelTitle label="党建活动" />
              <div className="pl-7.5 w-full h-115">
                <div className="w-122.5 h-50 flex justify-between flex-wrap">
                  {ACTIVITY_CARDS.map((card) => (
                    <div
                      key={card.label}
                      className={`w-61.25 h-25 inline-flex items-center ${card.icon} bg-no-repeat bg-contain`}
                    >
                      <div className="ml-23.5 mb-5 text-[18px]">
                        <p>
                          <span className="font-Oswald text-[24px]">{card.count}</span> &nbsp;个
                        </p>
                        <p>{card.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-122.5 h-65">
                  {/* 会议统计 */}
                  <div className="w-122.5 h-65">
                    <EChart option={buildSessionCountOption()} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 中间区域 */}
          <div className="w-255 h-200 relative">
            <div className="w-255 h-178.75 bg-huiguang bg-cover flex justify-between bg-no-repeat">
              <div className="w-70 h-150 pt-32.5">
                {CENTER_LEFT.map((item) => (
                  <div
                    key={item.icon}
                    className={`${item.icon} bg-no-repeat bg-contain relative h-21.25 w-62.5 mt-7.5`}
                    style={{ marginLeft: item.ml }}
                  >
                    <img className="absolute top-2 left-8.75" src={rleftImg} alt="" />
                    <span className="absolute top-7.5 left-35 font-Oswald text-[30px] text-[#ebb53f]">
                      165
                    </span>
                  </div>
                ))}
              </div>

              <div className="w-70 h-150 pt-32.5">
                {CENTER_RIGHT.map((item) => (
                  <div
                    key={item.icon}
                    className={`${item.icon} bg-no-repeat bg-contain indent-10.5 relative h-21.25 w-62.5 mt-7.5`}
                    style={{ marginLeft: item.ml, lineHeight: `${item.leading}px` }}
                  >
                    <img className="absolute top-0 left-47.5" src={rlightImg} alt="" />
                    <span className="font-Oswald text-[30px] text-[#ebb53f]">165</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧区域 */}
          <div className="w-122.5 h-200">
            <div className="h-95">
              <PanelTitle label="党员结构" flip />
              <div className="h-80 px-10 relative">
                {STRUCTURE_LABELS.map((item) => (
                  <div key={item.name} className={`absolute ${item.pos}`}>
                    <div className="text-[24px] font-YouShe" style={{ color: item.color }}>
                      {item.name}
                    </div>
                    <p className="text-[16px] text-[#f1f1f1]">
                      <span>{item.a}</span>&nbsp;
                      <span>{item.b}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-105">
              <PanelTitle label="党的动态" flip />
              <div className="h-90">
                {NEWS_ROWS.map((row, i) => (
                  <div
                    key={i}
                    className="bg-dddtBG bg-no-repeat bg-cover w-125 text-[16px] text-[#f1f1f1] h-15 leading-[60px] inline-flex"
                  >
                    <b
                      className={`text-[18px] w-30 text-[#e46262] ${row.icon} indent-9.5 bg-auto bg-no-repeat bg-center`}
                    >
                      {row.tag}
                    </b>
                    <div className={`px-3.5 ${row.dateClass}`}>{row.date}</div>
                    <p className="w-75 overflow-hidden text-ellipsis whitespace-nowrap">
                      {row.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 背景 + 底部内容 */}
      <div className="absolute z-10 text-white inset-0">
        <FrameAnimation seq={SEQUENCES.party} />
      </div>
      <VideoBackground src="/media/BG-grid.mp4" className="absolute bottom-0" />
    </DashboardShell>
  )
}
