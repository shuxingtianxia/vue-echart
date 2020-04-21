<template>
  <div class="panel bar">
    <h2>
      柱状图-就业行业 <a href="javascript:;">2019</a>
      <a href="javacript:;">2020</a>
    </h2>
    <div class="chart"></div>
    <div class="panel-footer"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  mounted() {
    this.drawBar();
    window.addEventListener("resize", () => {
      this.myChart.resize();
    });
  },
  methods: {
    drawBar() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.querySelector(".bar .chart"));
      // 绘制图表
      this.myChart.setOption({
        color: ["#2f89cf"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "0%",
          top: "10px",
          right: "0%",
          bottom: "4%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: [
            "旅游行业",
            "教育培训",
            "游戏行业",
            "医疗行业",
            "电商行业",
            "社交行业",
            "金融行业"
          ],
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: "12"
            }
          }
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: "12"
            }
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)"
              // width: 1,
              // type: "solid"
            }
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)"
            }
          }
        },
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "35%",
            data: [200, 300, 300, 900, 1500, 1200, 600],
            itemStyle: {
              barBorderRadius: 5,
              color: "#2f89cf"
            }
          }
        ]
      });
      // window.addEventListener("resize", function() {
      //   this.myChart.resize();
      // });
    }
  }
};
</script>

