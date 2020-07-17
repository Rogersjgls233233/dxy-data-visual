<template>
  <el-card class="box-card timeAndBasic" body-style="height:80%">
    <div class="time">
      <el-date-picker
        v-model="timeRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="mini"
        @change="onchange"
      ></el-date-picker>
    </div>

    <div class="box">
      <div class="up">
        <div class="left">
          <h3>死亡人数</h3>
          <p>{{this.$store.getters.num_origin.death}}</p>
        </div>
        <div class="right">
          <h3>治愈人数</h3>
          <p>{{this.$store.getters.num_origin.cure}}</p>
        </div>
      </div>
      <div class="down">
        <div class="downleft">
          <h3>确诊人数</h3>
          <p>{{this.$store.getters.num_origin.confirmed}}</p>
        </div>
        <div class="downright">
          <h3>地区范围</h3>
          <p>{{this.$store.state.mode===0?'全国':this.$store.state.provinceName}}</p>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      timeRange: ""
    };
  },
  created() {
    // console.log(this);
    // console.log("line_origin", this.$store.getters.line_origin);
  },
  methods: {
    onchange() {
      // vuex 改变全局状态
      this.$store.commit("timeChange", this.formatTime);
    }
  },
  computed: {
    // 将时间格式化成 2020/3/1
    formatTime: function() {
      let result = [];
      for (let i in this.timeRange) {
        let temp = this.timeRange[i].toLocaleDateString();
        result.push(temp);
      }
      return result;
    }
  }
};
</script>

<style scoped>
.box {
  min-width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.up,
.down {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.left,
.right,
.downleft,
.downright {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h3 {
  position: relative;
}
h3::before {
  content: " ";
  position: absolute;
  top: 0;
  left: -10px;
  width: 5px;
  height: 25px;
}
h3 {
  letter-spacing: 2px;
}
.left {
  color: rgb(245, 108, 108);
}
.right {
  color: rgb(230, 162, 60);
}
.downleft {
  color: rgb(102, 177, 255);
}
.downright {
  color: black;
}
.left h3::before {
  background-color: rgb(245, 108, 108);
}
.right h3::before {
  background-color: rgb(230, 162, 60);
}
.downleft h3::before {
  background-color: rgb(102, 177, 255);
}
.downright h3::before {
  background-color: black;
}
.timeAndBasic {
  width: 20%;
  height: 90%;
  /* overflow: hidden; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 250px;
}
p {
  font-size: 20px;
  font-weight: 900;
  margin-top: 5px;
  margin-bottom: 5px;
}
.downright p {
  font-size: 16px;
}
</style>