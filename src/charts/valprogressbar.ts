import type { EChartsCoreOption } from "echarts"

const DATA = [
  { name: "事项", itemNum: "9,796", value: 9796, itemStyle: { color: "#96ddfe" } },
  { name: "议题", itemNum: "10,052", value: 10052, itemStyle: { color: "#3290fd" } },
  { name: "制度", itemNum: "6,051", value: 6051, itemStyle: { color: "#ffef34" } },
]

/** 右侧"法律审核情况"分段进度条。移植自 src/js/valprogressbar.js。 */
export function buildValprogressbarOption(): EChartsCoreOption {
  // 旧代码 nameArr.unshift → y 轴自下而上为 事项/议事/制度
  const nameArr: string[] = []
  DATA.forEach((item) => {
    nameArr.unshift(item.name)
  })

  return {
    backgroundColor: "black",
    grid: { left: "18%", top: "15%", right: "20%", bottom: "10%" },
    xAxis: {
      type: "value",
      splitLine: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
    },
    yAxis: [
      {
        type: "category",
        inverse: false,
        data: nameArr,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          show: true,
          margin: 6,
          textStyle: { color: "#f1f1f1", fontSize: 16.25 },
        },
      },
    ],
    series: [
      {
        type: "pictorialBar",
        label: {
          show: true,
          position: "insideRight",
          distance: -40,
          color: "#6f89b6",
          formatter: "{c}万元",
          fontSize: 18,
        },
        itemStyle: { borderRadius: 5 },
        symbolRepeat: "fixed",
        symbolMargin: "4",
        symbol: "rect",
        symbolClip: true,
        symbolSize: [10, 16],
        symbolPosition: "start",
        data: DATA,
      },
    ],
  }
}
