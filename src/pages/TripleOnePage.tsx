import { DashboardShell } from "../components/DashboardShell"
import { EChart } from "../components/EChart"
import { FrameAnimation } from "../components/FrameAnimation"
import { VideoBackground } from "../components/VideoBackground"
import { BookAtlasIcon, ContactEmergencyIcon, DataIcon } from "../components/icons"
import { SEQUENCES } from "../lib/sequences"
import { buildEventStatisticsOption } from "../charts/eventStatistics"
import { buildNestedRingsOption } from "../charts/nestedRings"
import { buildValprogressbarOption } from "../charts/valprogressbar"
import titleImg from "../assets/images/title.png"

/** 左下事项统计右侧的项目&次数清单 */
const EVENT_COUNTS = [
  "695项",
  "198项",
  "173项",
  "158项",
  "157项",
  "128项",
  "107项",
]
const EVENT_TIMES = ["201次", "98次", "53次", "72次", "36次", "45次", "100次"]

/** 中间底部四张统计卡（四张内容在旧页完全相同） */
const BOTTOM_CARDS = ["bg-bgIcon1", "bg-bgIcon2", "bg-bgIcon3", "bg-bgIcon4"]

/** 右上议题统计两行（第一行 是否通过，第二行 是否报国资委） */
const TOPIC_ROWS = [
  {
    bg: "bg-xydb",
    numColor: "#7aef9f",
    label: "是否通过",
    cells: [
      { name: "通过", num: "8157", color: "#5bc8e9" },
      { name: "否决", num: "35", color: "#da3f15" },
      { name: "缓议", num: "10", color: "#e5db30" },
    ],
  },
  {
    bg: "bg-bxydb",
    numColor: "#55bbdb",
    label: "是否报国资委",
    cells: [
      { name: "审批", num: "8157", color: "#5bc8e9" },
      { name: "备案", num: "35", color: "#55bbdb" },
      { name: "否", num: "10", color: "#55bbdb" },
    ],
  },
]

/** 法律审核进度条左图标（颜色取自旧页 svg class） */
const LAW_ICONS = [
  { Icon: BookAtlasIcon, viewBox: "0 0 448 512", color: "#fffc4f" },
  { Icon: DataIcon, viewBox: "0 0 24 24", color: "#3292fe" },
  { Icon: ContactEmergencyIcon, viewBox: "0 0 24 24", color: "#9eecfe" },
]
const LAW_PCTS = ["30%", "40%", "30%"]

/** 指标异常六项 */
const ANOMALIES = [
  { num: "76", label: "会议超期报送" },
  { num: "70", label: "近期未报送" },
  { num: "68", label: "决策长期未结束" },
  { num: "62", label: "阻止实施未开始" },
  { num: "45", label: "会议召开异常" },
  { num: "40", label: "事项清单版本" },
]

/** 三重一大页（旧 tripleAndOneBig.html），舞台高 750 */
export default function TripleOnePage() {
  return (
    <DashboardShell stageHeight={750}>
      <div className="absolute top-0 left-0 bottom-0 text-[#f1f1f1] right-0 inline-flex w-[2000px] h-[750px] z-[99]">
        {/* 左侧区域 */}
        <div className="w-[500px] h-[750px] pl-[20px]">
          {/* 重大会议分析 */}
          <div className="h-[360px]">
            <div className="h-[60px] relative leading-[40px] indent-[120px]">
              <img className="absolute top-0 left-0 bottom-0 right-0" src={titleImg} alt="" />
              <span className="font-PangMenZhengDao text-[22px]">重大会议分析</span>
            </div>
            <div className="h-[300px] relative">
              <div id="nestRing" className="absolute w-[480px] h-[300px]">
                <EChart option={buildNestedRingsOption()} />
              </div>
              <div className="absolute text-center w-[100px] h-[100px] top-[100px] left-[190px]">
                <p>
                  <span className="font-Oswald text-[34px]">279</span>次
                </p>
                <p>召开会议</p>
              </div>
            </div>
          </div>

          {/* 事项统计情况 */}
          <div className="h-[390px]">
            <div className="h-[60px] relative leading-[40px] indent-[120px]">
              <img className="absolute top-0 left-0 bottom-0 right-0" src={titleImg} alt="" />
              <span className="font-PangMenZhengDao text-[22px]">事项统计情况</span>
            </div>
            <div className="h-[330px] bg-indigo-600 relative">
              <div id="eventStatistics" className="w-[100%] h-[330px] absolute">
                <EChart option={buildEventStatisticsOption()} />
              </div>
              <ul className="absolute pt-[36px] right-[14px] text-[#f1f1f1] text-[16px] justify-around h-full">
                {EVENT_COUNTS.map((count, i) => (
                  <li key={i} className="h-[40px] leading-[40px]">
                    {count} &nbsp; {EVENT_TIMES[i]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 中间区域 */}
        <div className="w-[1000px] h-[750px]">
          <div className="w-[1000px] px-[36px] mt-[580px] text-[#f1f1f1] h-[110px] inline-flex">
            {BOTTOM_CARDS.map((bg) => (
              <div key={bg} className={`flex-1 flex items-center w-[228px] h-[110px] ${bg} bg-no-repeat bg-cover`}>
                <div className="ml-[90px]">
                  <div className="h-[45px] leading-[60px]">
                    <span className="font-Oswald text-[24px]">1,438</span>项 &nbsp; 27%
                  </div>
                  <p className="font-PangMenZhengDao pt-[10px] h-[55px] leading-[55px]">会议统计</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧区域 */}
        <div className="w-[500px] h-[750px] pr-[20px]">
          {/* 议题统计情况 */}
          <div className="h-[330px]">
            <div className="h-[60px] relative leading-[40px] text-right">
              <img
                style={{ transform: "rotate3d(0, 1, 0, 180deg)" }}
                className="absolute top-0 left-0 bottom-0 right-0"
                src={titleImg}
                alt=""
              />
              <span className="mr-[120px] font-PangMenZhengDao text-[22px]">议题统计情况</span>
            </div>
            <div className="h-[270px]">
              {TOPIC_ROWS.map(({ bg, numColor, label, cells }) => (
                <div key={label} className="h-[135px] inline-flex">
                  <div className={`w-[120px] h-[120px] mr-[20px] text-center ${bg} bg-contain bg-no-repeat`}>
                    <p className="mt-[50px] h-[30px] leading-[30px] text-[24px] font-Oswald" style={{ color: numColor }}>
                      1009
                    </p>
                  </div>
                  <div>
                    <p>{label}</p>
                    <div className="flex justify-around gap-[16px]">
                      {cells.map(({ name, num, color }) => (
                        <div key={name} className="w-[100px] h-[90px] bg-xydbBG bg-no-repeat bg-contain text-center">
                          <p className="h-[40px] leading-[40px]">{name}</p>
                          <p className="h-[50px] leading-[50px] font-Oswald text-[24px]" style={{ color }}>
                            {num}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 法律审核情况 */}
          <div className="h-[220px]">
            <div className="h-[60px] relative leading-[40px] text-right">
              <img
                style={{ transform: "rotate3d(0, 1, 0, 180deg)" }}
                className="absolute top-0 left-0 bottom-0 right-0"
                src={titleImg}
                alt=""
              />
              <span className="mr-[120px] font-PangMenZhengDao text-[22px]">法律审核情况</span>
            </div>
            <div className="h-[160px] relative">
              <div id="valprogressbar" className="w-[480px] h-[160px] absolute">
                <EChart option={buildValprogressbarOption()} />
              </div>
              <div className="absolute top-[25px]">
                {LAW_ICONS.map(({ Icon, viewBox, color }) => (
                  <div key={color} className="w-[40px] h-[40px] flex justify-center items-center">
                    <svg className="w-[26px] h-[26px]" style={{ color }} viewBox={viewBox}>
                      <Icon />
                    </svg>
                  </div>
                ))}
              </div>
              <div className="absolute right-0 top-[30px]">
                {LAW_PCTS.map((pct, i) => (
                  <div key={i} className="h-[40px] font-Oswald">
                    {pct}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 指标异常 */}
          <div className="h-[200px]">
            <div className="h-[60px] relative leading-[40px] text-right">
              <img
                style={{ transform: "rotate3d(0, 1, 0, 180deg)" }}
                className="absolute top-0 left-0 bottom-0 right-0"
                src={titleImg}
                alt=""
              />
              <span className="mr-[120px] font-PangMenZhengDao text-[22px]">指标异常</span>
            </div>
            <div className="h-[140px]">
              <ul className="w-[480px] h-[140px] flex justify-around items-center">
                {ANOMALIES.map(({ num, label }) => (
                  <li key={label} className="text-center flex-1">
                    <div className="font-Oswald text-[#cec122] text-[20px] w-[50px] h-[50px] leading-[50px] rounded-[999px] border border-red-100">
                      {num}
                    </div>
                    <div className="h-[40px]"></div>
                    <p className="text-[15px] h-[45px]">{label}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 背景：透视视频 + 帧动画 */}
      <div className="w-[2000px] h-[750px] relative">
        <div className="absolute top-0 left-0 bottom-0 right-0" style={{ perspective: "500px" }}>
          <VideoBackground src="/media/BG_26.mp4" style={{ transform: "rotate3d(1, 0, 0, 70deg)" }} />
        </div>
        <div className="absolute text-[#fff] top-0 left-0 bottom-0 z-10 right-0">
          <FrameAnimation seq={SEQUENCES.triple} />
        </div>
      </div>
    </DashboardShell>
  )
}
