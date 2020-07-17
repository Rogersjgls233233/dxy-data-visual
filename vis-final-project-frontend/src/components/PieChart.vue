<template>
  <el-card class="box-card pie" body-style="height:80%">
    <div id="pie"></div>
    <div class="btn">
      <el-button size="mini" type="primary" @click="male">男性患病分布</el-button>
      <el-button size="mini" type="danger" @click="female">女性患病分布</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 0男 1女
      mode: 0
    };
  },
  mounted() {
    // this.drawLine();
  },
  methods: {
    drawMale() {
      let mychart = this.$echarts.init(document.getElementById("pie"));
      mychart.setOption({
        title: {
          text: "男性患病年龄分布饼图",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          // formatter: "{a} <br/>{b} : {c} ({d}%)"
          formatter: " {a} <br/>{b} :({d}%)"
        },
        // legend: {
        //   orient: "vertical",
        //   top: 70,
        //   right: 0,
        //   itemWidth: 5,
        //   itemGap: 2,
        //   // bottom: "bottom",
        //   data: this.$store.getters.pie_origin.age
        // },
        series: [
          {
            name: "男性患病年龄分布",
            type: "pie",
            radius: "40%",
            center: ["50%", "60%"],
            //
            data: this.$store.getters.pie_origin.maleArr,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
      window.addEventListener("resize", () => {
        mychart.resize();
        console.log(this.$store.getters.pie_origin);
      });
    },
    drawFemale() {
      let mychart = this.$echarts.init(document.getElementById("pie"));
      mychart.setOption({
        title: {
          text: "女性患病年龄分布饼图",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          // formatter: "{a} <br/>{b} : {c} ({d}%)"
          formatter: " {a} <br/>{b} :({d}%)"
        },
        // legend: {
        //   orient: "vertical",
        //   top: 70,
        //   right: 0,
        //   itemWidth: 5,
        //   itemGap: 2,
        //   // bottom: "bottom",
        //   data: this.$store.getters.pie_origin.age
        // },
        series: [
          {
            name: "女性患病年龄分布",
            type: "pie",
            radius: "40%",
            center: ["50%", "60%"],
            //
            data: this.$store.getters.pie_origin.femaleArr,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
      window.addEventListener("resize", () => {
        mychart.resize();
        console.log(this.$store.getters.pie_origin);
      });
    },
    male() {
      this.mode == 0;
      this.drawMale();
    },
    female() {
      this.mode == 1;
      this.drawFemale();
    }
  },
  watch: {
    "$store.state.gender"() {
      if (this.mode === 0) this.drawMale();
      else this.drawFemale();
    }
  }
};
</script>

<style scoped>
#pie {
  /* width: 250px; */
  /* height: 250px; */
  height: 100%;
}
.pie {
  width: 30%;
  height: 90%;
}
.btn {
  max-height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>>

