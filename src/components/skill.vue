<template>
  <div class="panel bar1">
    <h2>柱状图-技能掌握</h2>
    <div class="chart"></div>
    <div class="panel-footer"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      myColor: ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"]
    };
  },
  mounted() {
    this.drawSkill();
  },
  methods: {
    drawSkill() {
      this.myChart = this.$echarts.init(document.querySelector(".bar1 .chart"));
      this.myChart.setOption({
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          show: false
          //   type: "value",
          //   axisLine: {
          //     show: false // 是否显示坐标轴轴线
          //   },
          //   splitLine: {
          //       show: false
          //   },
          //   axisTick: {
          //       show: false
          //   }
        },
        yAxis: [
          {
            type: "category",
            // inverse: true,
            data: ["HTML5", "CSS3", "javascript", "VUE", "NODE"],
            axisLine: {
              show: false
            },
            splitLine: {
              show: false // 是否显示分隔线
            },
            axisTick: {
              show: false // 是否显示刻度
            },
            axisLabel: {
              color: "#fff",
              rich: {
                lg: {
                  backgroundColor: "#339911",
                  color: "#fff",
                  borderRadius: 15,
                  // padding: 5,
                  align: "center",
                  width: 15,
                  height: 15
                }
              }
            }
          },
          {
            show: true,
            data: [702, 350, 610, 793, 664],
            axisTick: {
              show: false // 是否显示刻度
            },
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: "#fff"
              }
            }
          }
        ],
        series: [
          {
            name: "条",
            type: "bar",
            yAxisIndex: 0,
            data: [70, 34, 60, 78, 69],
            barCategoryGap: 50,
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 20,
                color: params => {
                  var num = this.myColor.length;
                  return this.myColor[params.dataIndex % num];
                }
              }
            },
            label: { // 图形上的文本标签
              show: true,
              position: "inside",
              formatter: "{c}%"
            }
          },
          {
            name: "框",
            type: "bar",
            yAxisIndex: 1,
            barCategoryGap: 50,
            data: [100, 100, 100, 100, 100],
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "none",
                borderColor: "#00c1de",
                borderWidth: 3,
                barBorderRadius: 15
              }
            }
          }
        ]
      });
    }
  }
};
</script>