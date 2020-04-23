<template>
  <div class="panel pie">
    <h2>饼形图-年龄分布</h2>
    <div class="chart"></div>
    <div class="panel-footer"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.drawPie();
  },
  methods: {
    drawPie() {
      this.myChart = this.$echarts.init(document.querySelector(".pie .chart"));
      this.myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          bottom: 10,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12"
          }
        },
        series: [
          {
            name: "年龄分布",
            type: "pie",
            center: ["50%", "40%"], // 饼图的位置
            radius: ["40%", "60%"],
            avoidLabelOverlap: false,
            // 设置圈的颜色
            color: [
              "#065aab",
              "#066eab",
              "#0682ab",
              "#0696ab",
              "#06a0ab",
              "#06b4ab",
              "#06c8ab",
              "#06dcab",
              "#06f0ab"
            ],
            label: {
              show: false,
              position: "center"
            },
            // 是否下圈内显示name
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1, name: "0-19岁" },
              { value: 4, name: "20-29岁" },
              { value: 2, name: "40-49岁" },
              { value: 2, name: "30-39岁" },
              { value: 1, name: "50岁以上" }
            ]
          }
        ]
      });
    }
  }
};
</script>