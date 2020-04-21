<template>
  <div id="app">
    <header>
      <h1>数据可视化-ECharts</h1>
      <div class="showTime">当前时间：{{ timer }}</div>
    </header>
    <section class="mainbox">
      <div class="column">
        <bar></bar>
        <line-chart></line-chart>  
        <div class="panel pie">
          <h2>饼形图-年龄分布</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
      <div class="column">
        <div class="no">
          <div class="no-hd">
            <ul>
              <li>125811</li>
              <li>104563</li>
            </ul>
          </div>
          <div class="no-bd">
            <ul>
              <li>前端需求人数</li>
              <li>市场供应人数</li>
            </ul>
          </div>
        </div>
        <div class="map">
          <div class="chart"></div>
          <div class="map1"></div>
          <div class="map2"></div>
          <div class="map3"></div>
        </div>
      </div>
      <div class="column">
        <div class="panel bar1">
          <h2>柱状图-技能掌握</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line1">
          <h2>折线图-播放量</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie1">
          <h2>饼形图-地区分布</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Bar from "@/components/bar";
import LineChart from '@/components/line';

export default {
  name: "App",
  data() {
    return {
      timer: "",
      setTimer: null
    };
  },
  components: {
    Bar,
    LineChart
  },
  created() {
    clearTimeout(this.setTimer);
    this.time();
  },
  methods: {
    time() {
      this.setTimer = setTimeout(() => {
        let dt = new Date();
        let y = dt.getFullYear();
        let mt = dt.getMonth() + 1;
        let day = dt.getDate();
        let h = dt.getHours(); //获取时
        let m = dt.getMinutes(); //获取分
        let s = dt.getSeconds(); //获取秒
        this.timer =
          y +
          " 年 " +
          mt +
          " 月 " +
          day +
          " - " +
          h +
          " 时 " +
          m +
          " 分 " +
          s +
          " 秒 ";
      }, 1000);
      setTimeout(this.time, 1000); //设定定时器，循环运行
    }
  },
  destroyed() {
    clearTimeout(this.setTimer);
  }
};
</script>
<style lang="less" scoped>
#app {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  /*  背景图定位 / 背景图尺寸  cover 完全铺满容器  contain 完整显示在容器内 */
  background: url("./assets/images/bg.jpg") no-repeat #000;
  background-size: cover;
  /* 行高是字体1.15倍 */
  line-height: 1.15;
}
header {
  position: relative;
  height: 1.25rem;
  background: url("./assets/images/head_bg.png") no-repeat top center;
  background-size: 100% 100%;
}
header h1 {
  font-size: 0.475rem;
  color: #fff;
  text-align: center;
  line-height: 1rem;
}
header .showTime {
  position: absolute;
  top: 0;
  right: 0.375rem;
  line-height: 0.9375rem;
  font-size: 0.25rem;
  color: rgba(255, 255, 255, 0.7);
}
.mainbox {
  min-width: 1024px;
  max-width: 1920px;
  padding: 0.125rem 0.125rem 0;
  display: flex;
}
.mainbox .column {
  flex: 3;
}
.mainbox .column:nth-child(2) {
  flex: 5;
  margin: 0 0.125rem 0.1875rem;
  overflow: hidden;
}
</style>