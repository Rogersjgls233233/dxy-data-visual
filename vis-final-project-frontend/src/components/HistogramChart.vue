<template>
  <el-card class="box-card histogram" body-style="height:80%">
    <div id="histogram"></div>
    <div class="btn">
      <el-button size="mini" type="primary" v-if="$store.state.mode===0" @click="clickBasic">基本数据</el-button>
      <el-button size="mini" type="danger" v-if="$store.state.mode===0" @click="clickArea">按面积</el-button>
      <el-button
        size="mini"
        type="warning"
        v-if="$store.state.mode===0"
        @click="clickPopulation"
      >按人口</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 表示哪种表格
      chart_mode: 1
    };
  },
  mounted() {},
  methods: {
    drawBasic() {
      let mychart = this.$echarts.init(document.getElementById("histogram"));
      mychart.setOption({
        title: {
          text: "各省确诊/死亡/治愈人数基本数据",
          left: "center"
        },
        xAxis: {
          type: "category"
        },
        yAxis: {
          type: "value"
        },
        dataset: {
          // 数据源
          source: this.$store.getters.histogram_origin
        },
        dataZoom: [
          {
            // 这个dataZoom组件，默认控制x轴。
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 0, // 左边在 0% 的位置。
            end: 20 // 右边在 20% 的位置。
          }
        ],
        legend: {
          // orient: "vertical",
          // left: "auto",
          top: "25",
          itemWidth: 60,
          itemGap: 10,
          // bottom: "bottom",
          data: ["确诊", "死亡", "治愈"]
        },
        series: [
          {
            name: "确诊",
            type: "bar",
            showBackground: true,
            color: " rgb(102, 177, 255)",
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            },
            encode: {
              x: "pro_name",
              y: "whole_confirmed"
            }
          },
          {
            name: "死亡",
            type: "bar",
            showBackground: true,
            color: "rgb(245,108,108)",
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            },
            encode: {
              x: "pro_name",
              y: "whole_death"
            }
          },
          {
            name: "治愈",
            type: "bar",
            color: "rgb(230, 162, 60)",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            },
            encode: {
              x: "pro_name",
              y: "whole_cure"
            }
          }
        ]
      });
      window.addEventListener("resize", () => {
        mychart.resize();
      });
    },
    drawByArea() {
      let mychart = this.$echarts.init(document.getElementById("histogram"));
      mychart.setOption({
        title: {
          text: "各省确诊/死亡/治愈人数按地域面积数据",
          left: "center"
        },
        xAxis: {
          type: "category"
        },
        yAxis: {
          type: "value"
        },
        dataset: {
          // 数据源
          source: this.$store.getters.histogram_origin
        },
        dataZoom: [
          {
            // 这个dataZoom组件，默认控制x轴。
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 0, // 左边在 0% 的位置。
            end: 20 // 右边在 20% 的位置。
          }
        ],
        legend: {
          // orient: "vertical",
          // left: "auto",
          top: "25",
          itemWidth: 60,
          itemGap: 10,
          // bottom: "bottom",
          data: ["确诊人数/地域面积", "死亡人数/地域面积", "治愈人数/地域面积"]
        },
        series: [
          {
            name: "确诊人数/地域面积",
            type: "bar",
            showBackground: true,
            color: " rgb(102, 177, 255)",
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            },
            encode: {
              x: "pro_name",
              y: "confirmed_areaRate"
            }
          },
          {
            name: "死亡人数/地域面积",
            type: "bar",
            showBackground: true,
            color: "rgb(245,108,108)",
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            },
            encode: {
              x: "pro_name",
              y: "death_areaRate"
            }
          },
          {
            name: "治愈人数/地域面积",
            type: "bar",
            color: "rgb(230, 162, 60)",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            },
            encode: {
              x: "pro_name",
              y: "cure_areaRate"
            }
          }
        ]
      });
      window.addEventListener("resize", () => {
        mychart.resize();
        console.log(this.$store.getters.histogram_origin);
        // console.log(this.$store.getters.line_origin);
      });
    },
    drawPopulation() {
      let mychart = this.$echarts.init(document.getElementById("histogram"));
      mychart.setOption({
        title: {
          text: "各省确诊/死亡/治愈人数按人口数据",
          left: "center"
        },
        xAxis: {
          type: "category"
        },
        yAxis: {
          type: "value"
        },
        dataset: {
          // 数据源
          source: this.$store.getters.histogram_origin
        },
        dataZoom: [
          {
            // 这个dataZoom组件，默认控制x轴。
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 0, // 左边在 0% 的位置。
            end: 20 // 右边在 20% 的位置。
          }
        ],
        legend: {
          // orient: "vertical",
          // left: "auto",
          top: "25",
          itemWidth: 60,
          itemGap: 10,
          // bottom: "bottom",
          data: ["确诊人数/人口", "死亡人数/人口", "治愈人数/人口"]
        },
        series: [
          {
            name: "确诊人数/人口",
            type: "bar",
            showBackground: true,
            color: " rgb(102, 177, 255)",
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            },
            encode: {
              x: "pro_name",
              y: "confirmed_populationRate"
            }
          },
          {
            name: "死亡人数/人口",
            type: "bar",
            showBackground: true,
            color: "rgb(245,108,108)",
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            },
            encode: {
              x: "pro_name",
              y: "death_populationRate"
            }
          },
          {
            name: "治愈人数/人口",
            type: "bar",
            color: "rgb(230, 162, 60)",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            },
            encode: {
              x: "pro_name",
              y: "cure_populationRate"
            }
          }
        ]
      });
      window.addEventListener("resize", () => {
        mychart.resize();
        console.log(this.$store.getters.histogram_origin);
        // console.log(this.$store.getters.line_origin);
      });
    },
    drawCity() {
      let mychart = this.$echarts.init(document.getElementById("histogram"));
      mychart.setOption({
        title: {
          text: "本省各城市确诊/死亡/治愈人数",
          left: "center"
        },
        xAxis: {
          type: "category"
        },
        yAxis: {
          type: "value"
        },
        dataset: {
          // 数据源
          source: this.$store.getters.histogram_origin
        },
        dataZoom: [
          {
            // 这个dataZoom组件，默认控制x轴。
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 0, // 左边在 0% 的位置。
            end: 100 // 右边在 20% 的位置。
            // xAxisIndex: 0
          }
        ],
        legend: {
          // orient: "vertical",
          // left: "auto",
          top: "25",
          itemWidth: 60,
          itemGap: 10,
          // bottom: "bottom",
          data: ["确诊", "死亡", "治愈"]
        },
        series: [
          {
            name: "确诊",
            type: "bar",
            showBackground: true,
            color: " rgb(102, 177, 255)",
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            },
            encode: {
              x: "city_name",
              y: "city_confirmed"
            }
          },
          {
            name: "死亡",
            type: "bar",
            showBackground: true,
            color: "rgb(245,108,108)",
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            },
            encode: {
              x: "city_name",
              y: "city_death"
            }
          },
          {
            name: "治愈",
            type: "bar",
            color: "rgb(230, 162, 60)",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            },
            encode: {
              x: "city_name",
              y: "city_cure"
            }
          }
        ]
      });
      window.addEventListener("resize", () => {
        mychart.resize();
        // console.log(this.$store.getters.histogram_origin);
        // console.log(this.$store.getters.line_origin);
      });
    },
    clickBasic() {
      this.chart_mode = 1;
      this.drawBasic();
    },
    clickArea() {
      this.chart_mode = 2;
      this.drawByArea();
    },
    clickPopulation() {
      this.chart_mode = 2;
      this.drawPopulation();
    }
  },
  watch: {
    "$store.state.basic_pro"() {
      if (this.$store.state.mode === 0) {
        switch (this.chart_mode) {
          case 1:
            this.drawBasic();
            break;
          case 2:
            this.drawByArea();
            break;
          case 3:
            this.drawPopulation();
            break;
          default:
            break;
        }
      } else {
        this.drawCity();
      }
    }
  }
};
</script>

<style scoped>
#histogram {
  /* width: 800px; */
  /* height: 250px; */
  height: 100%;
}
.histogram {
  width: 60%;
  height: 90%;
}
.btn {
  max-height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>>

