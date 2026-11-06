import { DashboardShell } from "../components/DashboardShell"
import { EChart } from "../components/EChart"
import { FrameAnimation } from "../components/FrameAnimation"
import { VideoBackground } from "../components/VideoBackground"
import { EnterpriseIcon, FinanceRoundedIcon, HostRoundedIcon } from "../components/icons"
import { SEQUENCES } from "../lib/sequences"
import { buildCubeBarOption } from "../charts/cubeBar"
import { buildDoubleDiscountOption } from "../charts/doubleDiscount"
import { buildLiquidfillOption } from "../charts/liquidfill"
import { buildPie3dOption } from "../charts/pie3d"
import { buildRankListOption } from "../charts/rankList"
import s from "./economy.module.css"
import lanIcon from "../assets/images/蓝icon.png"
import lanQiu from "../assets/images/蓝球.png"
import huangQiu from "../assets/images/黄球.png"
import liangJin from "../assets/images/两金预警.png"
import danbao from "../assets/images/对外担保禁止清单.png"
import ziben from "../assets/images/资本保值率.png"
import titleImg from "../assets/images/title.png"

const BANK_ROWS = [
  { label: <>中国银行&nbsp;40%</>, numClass: s.cnBank, num: 1665 },
  { label: <>建设银行&nbsp;35%</>, numClass: s.jsBank, num: 230 },
  { label: <>工商银行&nbsp;15%</>, numClass: s.gsBank, num: 90 },
  { label: <>农业银行&nbsp;5%</>, numClass: s.nyBank, num: 32 },
  { label: <>招商银行&nbsp;40%</>, numClass: s.zsBank, num: 32 },
]

const RANK_ICONS = [
  { viewBox: "0 0 24 24", Icon: FinanceRoundedIcon, color: "#75f6fd", value: "53,126" },
  { viewBox: "0 0 32 32", Icon: EnterpriseIcon, color: "#c7b839", value: "108,978" },
  { viewBox: "0 0 24 24", Icon: HostRoundedIcon, color: "#75f0cd", value: "4,832,849" },
]

/** 经济运行页（旧 index.html），舞台高 750 */
export default function EconomyPage() {
  return (
    <DashboardShell stageHeight={750}>
      <div className="absolute inset-0 z-[99] flex">
        {/* 主体左侧区域 */}
        <div className="flex-1 h-[750px]">
          {/* 资产负债率 */}
          <div>
            <div className={s.titleL}>资产负债率</div>
            <div className={`${s.leftContent} ${s.dRContent}`}>
              <div className={s.dRInsPanel}>
                <div className={s.dRInsPanelCon}>87%</div>
              </div>
              <div className={s.dRInsGold}>
                <div className={s.dRInsGoldCon}></div>
              </div>
              <div className={s.dRInsTrend}>
                <div className={s.dRInsTrendCon}>
                  <img className={`${s.yellowIcon} ${s.dRInsTrendImg}`} src={lanIcon} alt="" />
                  <div className={s.dRInsInfo}>
                    <p className={s.dRInsInfoTotal}>
                      <b>1,483</b>亿
                    </p>
                    <span className={s.subTitle}>负债金额</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 总资产周转率 */}
          <div>
            <div className={s.titleL}>总资产周转率</div>
            <div className={s.leftContent}>
              {/* eCharts 图表 */}
              <div className="h-[200px] w-[510px]">
                <EChart option={buildCubeBarOption()} />
              </div>
            </div>
          </div>
          {/* 银行账户分布 */}
          <div>
            <div className={s.titleL}>银行账户分布</div>
            <div className={s.leftContent}>
              <div className="h-[180px] w-[180px]">
                <EChart option={buildPie3dOption()} />
              </div>
              <div className={s.leftContentR}>
                {BANK_ROWS.map((row, i) => (
                  <p key={i}>
                    {row.label}
                    <span className={`${s.accountNum} ${row.numClass}`}>{row.num}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* 主体中间区域 */}
        <div className="h-[750px] w-[980px] relative">
          <div className={`${s.panel} ${s.topL}`}>1666</div>
          <div className={`${s.panel} ${s.bottomL}`}>1666</div>
          <div className={`${s.panel} ${s.cen}`}>1666</div>
          <div className={`${s.panel} ${s.righrL}`}>1666</div>
          <div className={`${s.panel} ${s.bottomR}`}>1666</div>
          <div className={`${s.arc} ${s.leftArc}`}></div>
          <div className={`${s.arc} ${s.rightArc}`}></div>
        </div>
        {/* 主体右侧区域 */}
        <div className="flex-1 h-[750px]">
          <div className={s.rightContentTop}>
            <div className={s.rightContentTitle}>
              <img src={titleImg} alt="" />
              <span>重点关注</span>
            </div>
            <div className={s.rightConGraph}>
              <div className={s.rightConGraphL}>
                <EChart
                  option={buildLiquidfillOption()}
                  style={{ position: "absolute", inset: 0, width: 300, height: 200 }}
                />
                <img className={`${s.globeicon} ${s.lanIcon1}`} src={lanQiu} alt="" />
                <img className={`${s.globeicon} ${s.lanIcon2}`} src={lanQiu} alt="" />
                <img className={`${s.globeicon} ${s.huangIcon1}`} src={huangQiu} alt="" />
                <img className={`${s.globeicon} ${s.huangIcon2}`} src={huangQiu} alt="" />
              </div>
              <div className={s.rightConGraphR}>
                <div>
                  <img src={liangJin} alt="" />
                  <img src={danbao} alt="" />
                  <img src={ziben} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className={s.rightContentCenter}>
            {/* 排行榜图表 */}
            <div className="h-[210px] w-[510px]">
              <EChart option={buildRankListOption()} />
            </div>
            <div className={s.rankListInfo}>
              <div className={s.rankListInfoL}>
                {RANK_ICONS.map(({ viewBox, Icon }) => (
                  <svg key={viewBox} xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
                    <Icon />
                  </svg>
                ))}
              </div>
              <div className={s.rankListInfoR}>
                {RANK_ICONS.map(({ color, value }) => (
                  <div key={value}>
                    <span className={s.rankListNum} style={{ color }}>
                      {value}
                    </span>
                    万元
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={s.rightContentBottom}>
            <div className={s.rightContentTitle}>
              <img src={titleImg} alt="" />
              <span>收入分析</span>
            </div>
            {/* 双折线图表 */}
            <div className="h-[250px] w-[510px]">
              <EChart option={buildDoubleDiscountOption()} />
            </div>
          </div>
        </div>
      </div>

      {/* 背景 */}
      <div className="relative h-[750px] w-[2000px]">
        <div className="absolute inset-0 z-[9]">
          <FrameAnimation seq={SEQUENCES.economy} />
        </div>
        <div style={{ perspective: "500px" }}>
          <VideoBackground
            src="/media/BG_26.mp4"
            style={{ transform: "rotate3d(1, 0, 0, 70deg)" }}
          />
        </div>
      </div>
    </DashboardShell>
  )
}
