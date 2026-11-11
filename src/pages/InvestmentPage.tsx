import { DashboardShell } from "../components/DashboardShell"
import { EChart } from "../components/EChart"
import { Globe3D } from "../components/Globe3D"
import { VideoBackground } from "../components/VideoBackground"
import { DataIcon, SmileOutlineIcon } from "../components/icons"
import { buildCircularProOption } from "../charts/circularPro"
import { buildHillOption } from "../charts/hill"
import { buildPianoWavesOption } from "../charts/pianoWaves"
import { buildPlanFinishOption } from "../charts/planFinish"
import kvS1 from "../assets/images/kv-s1.png"
import kvI2 from "../assets/images/kv-i2.png"
import titleImg from "../assets/images/title.png"

/** 投资领域分布右侧的三行“在建”统计（颜色、气泡序列、百分比）。 */
const ONGOING_ROWS = [
  { color: "#fffd6a", pct: "40%" },
  { color: "#3190fd", pct: "5%" },
  { color: "#76f8fe", pct: "29%" },
]
const DOT_SIZES = [20, 10, 15, 12, 8, 16, 14, 7, 3]

const RND_LABELS = [
  { className: "text-[#feef90]", top: 150, left: 10 },
  { className: "text-[#f1f1f1]", top: 400, left: 40 },
  { className: "text-[#f1f1f1]", top: 250, left: 700 },
  { className: "text-[#f1f1f1]", top: 490, left: 650 },
]

/** 投资管理页（旧 InvestmentManager.html），舞台高 750 */
export default function InvestmentPage() {
  return (
    <DashboardShell stageHeight={750}>
      <div className="main absolute inset-0 w-500 h-187.5 flex justify-between z-99">
        {/* 左侧区域 */}
        <div className="w-127.5 h-187.5">
          {/* 投资情况 */}
          <div className="w-127.5 h-112.5">
            <div className="w-127.5 h-15 bg-title bg-no-repeat bg-cover font-PangMenZhengDao text-[#f1f1f1] indent-30 leading-[60px]">
              投资情况
            </div>
            <div className="w-127.5 h-97.5 px-10 text-[16px]">
              {/* 第一行 */}
              <div className="w-127.5 h-48.75 inline-flex">
                <div className="w-50 h-48.75 flex flex-col items-center justify-center">
                  <p className="text-[#f1f1f1]">
                    <b className="font-PangMenZhengDao">投资总额</b>
                    <span className="text-[30px] text-[#f6e64e] pl-2.5 font-Oswald">6.98</span>
                    <span className="text-[#f6e64e]">亿元</span>
                  </p>
                  <div id="pianoWaves" className="w-50 h-18.75">
                    <EChart option={buildPianoWavesOption()} />
                  </div>
                </div>

                <div className="w-75 h-47.5 flex text-[#f1f1f1] items-center">
                  <div className="w-30 h-30 flex flex-col justify-center items-center bg-jingNei bg-cover bg-no-repeat">
                    <p>
                      <span className="text-[28px] font-Oswald">
                        55<sub>%</sub>
                      </span>
                    </p>
                    <div className="mb-11.25">境内</div>
                  </div>
                  <div className="w-30 h-30 flex flex-col justify-center items-center bg-jingWai bg-cover bg-no-repeat">
                    <p>
                      <span className="text-[28px] font-Oswald">
                        45<sub>%</sub>
                      </span>
                    </p>
                    <div className="mb-11.25">境外</div>
                  </div>
                </div>
              </div>

              {/* 第二行 */}
              <div className="w-127.5 h-37.5 mt-12.5 -translate-x-2.5 inline-flex text-[#f1f1f1] bg-touRuBG bg-contain bg-no-repeat">
                <div
                  className="h-30 w-50 flex flex-col items-center"
                  style={{ transform: "translateX(48px) translateY(-40px)" }}
                >
                  <h2 className="text-[#3990d4] text-[28px] font-Oswald">12,057</h2>
                  <p>境内资金投入(万元)</p>
                  <div className="w-34.5 flex justify-between">
                    <span>完成率</span>
                    <span>85%</span>
                  </div>
                  <div className="w-34.5 h-2.5 bg-black/30 mt-2.5 p-1">
                    <div className="w-full h-full bg-[#77c4e8]"></div>
                  </div>
                </div>

                <div
                  className="h-30 w-50 flex flex-col items-center"
                  style={{ transform: "translateX(68px) translateY(-40px)" }}
                >
                  <h2 className="text-[#eed16b] text-[28px] font-Oswald">12,057</h2>
                  <p>境内资金投入(万元)</p>
                  <div className="w-34.5 flex justify-between">
                    <span>完成率</span>
                    <span>85%</span>
                  </div>
                  <div className="w-34.5 h-2.5 bg-black/30 mt-2.5 p-1">
                    <div className="w-full h-full bg-[#77c4e8]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 投资领域分布 */}
          <div className="w-127.5 h-75 pl-10">
            <div className="w-127.5 h-15 bg-title bg-no-repeat bg-cover font-PangMenZhengDao text-[#f1f1f1] indent-30 leading-[60px]">
              投资领域分布
            </div>
            <div className="h-60 inline-flex text-[#f1f1f1]">
              <div className="w-72.5 h-60">
                <div className="w-70 h-60 relative">
                  <div className="absolute right-0 z-10 w-45 h-10 leading-[40px]">
                    <svg className="text-[#6abff8] w-6 h-6 inline-block" viewBox="0 0 24 24">
                      <DataIcon />
                    </svg>
                    投资领域
                    <span className="font-Oswald text-[24px] pl-2.5">631</span>
                  </div>
                  <div id="circularPro" className="w-72.5 h-60">
                    <EChart option={buildCircularProOption()} />
                  </div>
                </div>
              </div>

              <div className="w-102.5 h-60 pt-17.5">
                {ONGOING_ROWS.map((row) => (
                  <div key={row.pct} className="w-102.5 h-12.5 leading-[50px] text-[16px] inline-flex">
                    <div>
                      <span>在建</span>{" "}
                      <b className="font-Oswald font-normal" style={{ color: row.color }}>
                        20.3亿
                      </b>
                    </div>
                    <div className="w-55 h-12.5 flex items-center">
                      {DOT_SIZES.map((size, i) => (
                        <div
                          key={i}
                          className="rounded-full mx-1.5"
                          style={{ backgroundColor: row.color, width: size, height: size }}
                        ></div>
                      ))}
                    </div>
                    <div>
                      <span className="font-Oswald text-[24px]">{row.pct}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 中间区域 */}
        <div className="w-245 h-187.5 relative">
          <div className="w-150 h-150 absolute z-10 left-1/2 top-12.5 -translate-x-75">
            {/* 3d地图 */}
            <div id="3d-globe" className="w-150 h-150">
              <Globe3D />
            </div>
          </div>

          {/* 底部圆弧 */}
          <div className="w-245 h-100 absolute top-82.5 left-52.5">
            <img className="w-145" src={kvS1} alt="" />
          </div>

          {/* 蓝色圆环 */}
          <div
            className="w-145 h-100 absolute top-30 left-47.5"
            style={{ transform: "rotateX(60deg) rotateY(20deg)" }}
          >
            <img className="w-145" src={kvI2} alt="" />
          </div>

          {/* 投入与项目 */}
          {RND_LABELS.map(({ className, top, left }, i) => (
            <div
              key={i}
              className={`absolute ${className} w-62.5 h-20 bg-kv-a1 bg-no-repeat bg-cover font-PangMenZhengDao text-center leading-[80px]`}
              style={{ top, left }}
            >
              研发投入
              <span className="font-Oswald text-[24px]">1908</span>
            </div>
          ))}
        </div>

        {/* 右侧区域 */}
        <div className="w-127.5 h-187.5">
          {/* 投资规模趋势 */}
          <div className="w-127.5 h-112.5">
            <div className="relative indent-60 leading-[48px] w-127.5 h-15 font-PangMenZhengDao text-[#f1f1f1]">
              <img
                style={{ transform: "rotate3d(0, 1, 0, 180deg)" }}
                className="absolute inset-0"
                src={titleImg}
                alt=""
              />
              <span>投资达成分析</span>
            </div>
            <div className="w-127.5 h-52.5 inline-flex">
              {/* 投资达成分析里面内容 */}
              <div className="w-52.5 h-52.5 ml-7.5 text-[#f1f1f1] text-[30px] relative bg-tzdcfx bg-contain bg-no-repeat">
                <span className="font-Oswald absolute top-12.5 left-11.25">
                  4.5<sub>%</sub>
                </span>
              </div>
              <div className="w-63.75 h-52.5">
                <div className="text-[16px] text-[#f1f1f1] inline-flex items-center h-17.5">
                  <div className="inline-block w-6 h-6 bg-tzdcfx1 bg-cover"></div>
                  计划投入资金
                  <span className="w-12.5 text-right text-[24px] font-Oswald text-[#d4c92b]">903.12</span>亿元
                </div>
                <div className="text-[16px] text-[#f1f1f1] h-17.5 leading-[70px]">
                  <svg className="inline-block w-6 h-6 mr-1.5 text-[#6de9ed]" viewBox="0 0 24 24">
                    <DataIcon />
                  </svg>
                  实际投入资金
                  <span className="w-12.5 text-right text-[24px] font-Oswald text-[#6de9ed]">1,425.60</span>亿元
                </div>
                <div className="text-[16px] text-[#f1f1f1] h-17.5 leading-[70px]">
                  <svg className="inline-block w-6 h-6 mr-1.5 text-[#226bbe]" viewBox="0 0 24 24">
                    <SmileOutlineIcon />
                  </svg>
                  投入差异资金
                  <span className="w-12.5 text-right text-[24px] font-Oswald text-[#226bbe]">515.52</span>亿元
                </div>
              </div>
            </div>
            <div className="w-127.5 h-45 text-[#f1f1f1] relative">
              <div className="absolute indent-10">年度完成计划</div>
              {/* 年度计划完成 eCharts 图 */}
              <div id="planFinish" className="absolute" style={{ width: 510, height: 220 }}>
                <EChart option={buildPlanFinishOption()} />
              </div>
            </div>
          </div>

          {/* 投资项目完成图 */}
          <div className="w-127.5 h-87.5">
            <div className="relative indent-60 leading-[48px] w-127.5 h-15 font-PangMenZhengDao text-[#f1f1f1]">
              <img
                style={{ transform: "rotate3d(0, 1, 0, 180deg)" }}
                className="absolute inset-0"
                src={titleImg}
                alt=""
              />
              <span>投资项目完成图</span>
            </div>
            <div id="project-progress" className="w-127.5 h-62.5">
              <EChart option={buildHillOption()} />
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
