<template>
  <el-card class="box-card line" body-style="height:80%">
    <div id="line"></div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    drawLine() {
      let mychart = this.$echarts.init(
        document.getElementById("line")
        // "light"
      );
      mychart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        dataset: {
          // 数据源
          source: this.$store.getters.line_origin
        },
        title: {
          text: `${this.$store.getters.line_name}基本数据`,
          left: "center"
        },
        xAxis: {
          type: "category",
          boundaryGap: false
        },
        yAxis: {
          type: "value"
        },
        dataZoom: [
          {
            // 这个dataZoom组件，默认控制x轴。
            type: "inside" // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            // start: 0, // 左边在 0% 的位置。
            // end: 100 // 右边在 100% 的位置。
          }
        ],
        legend: {
          // orient: "vertical",
          // left: "auto",
          bottom: 0,
          itemWidth: 30,
          itemGap: 10,
          // bottom: "bottom",
          data: ["确诊", "死亡", "治愈"]
        },

        series: [
          {
            name: "确诊",
            type: "line",
            smooth: true,
            color: "rgb(102,177,255)",
            // 显示面积
            // areaStyle: {},
            // 指定x轴为time
            encode: {
              x: "time",
              y: this.$store.state.mode === 1 ? "pro_confirmed" : "confirmed"
            }
          },
          {
            name: "死亡",
            type: "line",
            smooth: true,
            color: "rgb(245,108,108)",
            // 显示面积
            // areaStyle: {},
            // 指定x轴为time
            encode: {
              x: "time",
              y: this.$store.state.mode === 1 ? "pro_death" : "death"
            }
          },
          {
            name: "治愈",
            type: "line",
            smooth: true,
            color: "rgb(230,162,60)",
            // 显示面积
            // areaStyle: {},
            // 指定x轴为time
            encode: {
              x: "time",
              y: this.$store.state.mode === 1 ? "pro_cure" : "cure"
            }
          }
        ],
        grid: {
          x: 50,
          y: 50
        }
      });
      window.addEventListener("resize", () => {
        mychart.resize();
      });
    }
  },
  watch: {
    "$store.state.basic_pro"() {
      if (this.$store.state.mode === 1) this.drawLine();
    },
    "$store.state.basic_cn"() {
      if (this.$store.state.mode === 0) this.drawLine();
    }
  }
};
</script>

<style scoped>
#line {
  /* width: 100%; */
  /* height: 220px; */
  height: 100%;
}

.line {
  width: 30%;
  margin: 0 auto;
  height: 90%;
}
.btn {
  display: flex;
  justify-content: center;
}
</style>>

