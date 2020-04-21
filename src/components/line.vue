<template>
  <div class="panel line">
    <h2>折线图-人员变化</h2>
    <div class="chart"></div>
    <div class="panel-footer"></div>
  </div>
</template>
<script>
export default {
  props: [],
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
    window.addEventListener("resize", () => {
      this.myChart.resize();
    });
  },
  methods: {
    drawLine() {
      this.myChart = this.$echarts.init(document.querySelector(".line .chart"));
      this.myChart.setOption({
        color: ["#00f2f1", "#ed3f35"], // 设置线条的颜色
        tooltip: {
          trigger: "axis"
        },
        legend: {
          right: "10%",
          textStyle: {
            color: "#4c9bfd"
          }
        },
        grid: {
          top: "20%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          borderColor: "#012f4a",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ],
          axisLabel: {
            fontSize: 12,
            color: "rgba(255,255,255,.6)"
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: 12,
            color: "rgba(255,255,255,.6)"
          },
          axisLine: {
            // 刻度线
            lineStyle: {
              color: "rgba(255,255,255,.1)"
            }
          },
          splitLine: {
            // 坐标轴在 grid 区域中的分隔线。
            lineStyle: {
              color: "rgba(255,255,255,.1)"
            }
          }
        },
        series: [
          {
            name: "新增粉丝",
            type: "line",
            stack: "总量",
            smooth: true,
            data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120]
            // lineStyle: {
            //     color: '#00f2f1'
            // }
          },
          {
            name: "新增游客",
            type: "line",
            stack: "总量",
            smooth: true, // 是否平滑
            data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
            // lineStyle: {
            //     color: '#ed3f35'
            // }
          }
        ]
      });
    }
  }
};
</script>