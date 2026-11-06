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
    pos: "top-[30px] left-[120px]",
    color: "#e9da63",
    name: "群众",
    a: "23%",
    b: "855人",
  },
  {
    pos: "top-[155px] left-[80px]",
    color: "#5dc6cd",
    name: "无党派人士",
    a: "11%",
    b: "204人",
  },
  {
    pos: "right-[70px] top-[10px]",
    color: "#1c5795",
    name: "共产党员",
    a: "3601人",
    b: "37%",
  },
  {
    pos: "right-[140px] bottom-[130px]",
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
      <div className="h-[60px] text-[#f1f1f1] leading-[45px] indent-[280px]">
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
    <div className="relative h-[60px] leading-[50px]">
      <img className="absolute top-0 left-0 h-[60px]" src={titleImg} alt="" />
      <span className="font-PangMenZhengDao ml-[120px]">{label}</span>
    </div>
  )
}

/** 党建管理页（旧 PartyBuildingManagement.html），舞台高 850 */
export default function PartyPage() {
  return (
    <DashboardShell stageHeight={850}>
      {/* 主体内容区域 */}
      <div className="w-[2000px] h-[800px] top-0 left-0 absolute z-20">
        <div className="relative w-[2000px] h-[800px] inline-flex">
          {/* 左侧区域 */}
          <div className="w-[490px] h-[800px] text-[#f1f1f1]">
            <div className="w-[490px] h-[280px]">
              <PanelTitle label="党组织数量" />
              <div className="pl-[30px] w-full h-[220px] inline-flex items-center">
                {/* 圆锥图 */}
                <img className="w-[120px] h-[160px]" src={coneImg} alt="" />
                <div className="ml-[46px] mt-[-10px]">
                  {ORG_ROWS.map((row) => (
                    <div
                      key={row.label}
                      className={`text-[16px] h-[30px] mb-[10px] indent-[20px] ${row.icon} bg-no-repeat bg-contain leading-[30px]`}
                    >
                      <span className="text-[24px] font-Oswald" style={{ color: row.color }}>
                        {row.count}
                      </span>
                      <span style={{ color: row.color }}>个</span>{" "}
                      <span className="mx-[14px]">{row.pct}</span>{" "}
                      <span className="text-[#999]">{row.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-[490px] h-[520px]">
              <PanelTitle label="党建活动" />
              <div className="pl-[30px] w-full h-[460px]">
                <div className="w-[490px] h-[200px] flex justify-between flex-wrap">
                  {ACTIVITY_CARDS.map((card) => (
                    <div
                      key={card.label}
                      className={`w-[245px] h-[100px] inline-flex items-center ${card.icon} bg-no-repeat bg-contain`}
                    >
                      <div className="ml-[94px] mb-[20px] text-[18px]">
                        <p>
                          <span className="font-Oswald text-[24px]">{card.count}</span> &nbsp;个
                        </p>
                        <p>{card.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-[490px] h-[260px]">
                  {/* 会议统计 */}
                  <div className="w-[490px] h-[260px]">
                    <EChart option={buildSessionCountOption()} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 中间区域 */}
          <div className="w-[1020px] h-[800px] relative">
            <div className="w-[1020px] h-[715px] bg-huiguang bg-cover flex justify-between bg-no-repeat">
              <div className="w-[280px] h-[600px] pt-[130px]">
                {CENTER_LEFT.map((item) => (
                  <div
                    key={item.icon}
                    className={`${item.icon} bg-no-repeat bg-contain relative h-[85px] w-[250px] mt-[30px]`}
                    style={{ marginLeft: item.ml }}
                  >
                    <img className="absolute top-[8px] left-[35px]" src={rleftImg} alt="" />
                    <span className="absolute top-[30px] left-[140px] font-Oswald text-[30px] text-[#ebb53f]">
                      165
                    </span>
                  </div>
                ))}
              </div>

              <div className="w-[280px] h-[600px] pt-[130px]">
                {CENTER_RIGHT.map((item) => (
                  <div
                    key={item.icon}
                    className={`${item.icon} bg-no-repeat bg-contain indent-[42px] relative h-[85px] w-[250px] mt-[30px]`}
                    style={{ marginLeft: item.ml, lineHeight: `${item.leading}px` }}
                  >
                    <img className="absolute top-0 left-[190px]" src={rlightImg} alt="" />
                    <span className="font-Oswald text-[30px] text-[#ebb53f]">165</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧区域 */}
          <div className="w-[490px] h-[800px]">
            <div className="h-[380px]">
              <PanelTitle label="党员结构" flip />
              <div className="h-[320px] px-[40px] relative">
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

            <div className="h-[420px]">
              <PanelTitle label="党的动态" flip />
              <div className="h-[360px]">
                {NEWS_ROWS.map((row, i) => (
                  <div
                    key={i}
                    className="bg-dddtBG bg-no-repeat bg-cover w-[500px] text-[16px] text-[#f1f1f1] h-[60px] leading-[60px] inline-flex"
                  >
                    <b
                      className={`text-[18px] w-[120px] text-[#e46262] ${row.icon} indent-[38px] bg-auto bg-no-repeat bg-center`}
                    >
                      {row.tag}
                    </b>
                    <div className={`px-[14px] ${row.dateClass}`}>{row.date}</div>
                    <p className="w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
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
      <div className="absolute z-10 text-[#fff] top-0 left-0 bottom-0 right-0">
        <FrameAnimation seq={SEQUENCES.party} />
      </div>
      <VideoBackground src="/media/BG-grid.mp4" className="absolute bottom-0" />
    </DashboardShell>
  )
}
