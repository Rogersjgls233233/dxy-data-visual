<template>
  <div class="partChina">
    <div class="up">
      <News></News>
      <Map></Map>
      <TimeAndBasic></TimeAndBasic>
    </div>
    <div class="down">
      <LineChart></LineChart>
      <HistogramChart></HistogramChart>
      <PieChart></PieChart>
    </div>
  </div>
</template>

<script>
import LineChart from "../components/LineChart.vue";
import HistogramChart from "../components/HistogramChart.vue";
import PieChart from "../components/PieChart.vue";
import News from "../components/News.vue";
import TimeAndBasic from "../components/TimeAndBasic.vue";
import Map from "../components/Map.vue";
export default {
  components: {
    LineChart,
    HistogramChart,
    PieChart,
    News,
    TimeAndBasic,
    Map
  },
  data() {
    return {
      msg: "welcome to "
    };
  },
  mounted() {
    this.$store.dispatch("getAllProvinceBasic");
    this.$store.dispatch("getCountryBasic");
    this.$store.dispatch("getCountryGender");
  },
  watch: {
    //监听vuex里 是否选择了地区
    "$store.state.provinceSingal"() {
      this.$store.dispatch("getAllProvinceBasic");
      //  this.$store.dispatch("getCountryBasic");
    },
    // 监听时间变化
    "$store.state.timeSignal"() {
      this.$store.dispatch("getAllProvinceBasic");
      this.$store.dispatch("getCountryBasic");
    }
  }
};
</script>

<style scoped>
.partChina {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.partChina .up {
  width: 100%;
  /* flex: 1; */
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.partChina .down {
  width: 100%;
  /* flex: 1; */
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.partChina .box-card {
  margin: 5px 5px;
}
</style>>

