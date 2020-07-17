<template>
  <el-card class="box-card news" body-style="height:80%">
    <h3>重大新闻</h3>
    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="item in this.$store.state.mode===0?this.$store.state.news_cn:$store.state.news_pro"
        :key="item.news_id"
        :timestamp="(new Date(item.news_time)).toLocaleString()+item.news_owner"
      >
        <a target="blank" :href="item.news_link">{{item.news_title}}</a>
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      reverse: true
    };
  },
  mounted() {
    // 获得初始数据 ajax
    this.$store.dispatch("getCountryNewsCN");
  },
  methods: {},
  watch: {
    // 监听地区变化
    "$store.state.provinceSingal"() {
      if (this.$store.state.mode === 1) {
        this.$store.dispatch("getProvinceNewsCN");
      }
    },
    // 监听时间变化
    "$store.state.timeSignal"() {
      if (this.$store.state.mode === 0) {
        this.$store.dispatch("getCountryNewsCN");
      } else {
        this.$store.dispatch("getProvinceNewsCN");
      }
    }
  }
};
</script>

<style scoped>
.news {
  width: 20%;
  /* height: 300px; */
  height: 90%;
  overflow-y: scroll;
}
h3 {
  margin-top: 0;
}
ul {
  padding: 0;
}
a {
  text-decoration: none;
  color: black;
}
</style>