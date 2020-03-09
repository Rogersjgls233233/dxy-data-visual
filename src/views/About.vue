<template>
  <div class="about">
    <div id="myChart" ref="mychart"></div>
  </div>
</template>

<script>
import confirmed from "../assets/data/confirmed.json";
export default {
  data() {
    return {
      confirmed,
      day: []
    };
  },
  methods: {
    calculate() {
      this.day = [];
      this.confirmed.forEach((element, i) => {
        this.day.push(i + 1);
      });
    },
    drawLine() {
      let that = this;
      let chart = that.$echarts.init(document.getElementById("myChart"));
      chart.setOption({
        title: {
          text: "疫情走势"
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true
            }
          }
        },
        xAxis: {
          data: that.day
        },
        yAxis: {},
        legend: {
          data: ["确诊人数"]
        },
        series: [
          {
            name: "确诊人数",
            type: "line",
            data: that.confirmed,
            symbolSize: 10,
            // 设置拐点为实心圆
            symbol: "circle",
            smooth: 0.5,
            itemStyle: {
              normal: {
                // 拐点上显示数值
                label: {
                  show: true
                },
                lineStyle: {
                  // 使用rgba设置折线透明度为0，可以视觉上隐藏折线
                  //color: "rgba(0,0,0,0)"
                }
              }
            }
          }
        ]
      });
    }
  },
  mounted() {
    this.calculate();
    this.drawLine();
  }
};
</script>

<style scoped>
#myChart {
  position: relative;
  width: 800px;
  height: 500px;
  left: 50%;
  margin-left: -400px;
}
</style>
