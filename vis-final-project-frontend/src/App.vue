<template>
  <div id="app">
    <el-container class="home-container">
      <!-- 头部 -->
      <el-header class="nav" height="7vh">
        <div class="title">Covid-19可视分析系统</div>
        <div class="change">
          <router-link to="/">中国板块 |</router-link>
          <router-link to="/line">| 时间线</router-link>
        </div>
        <div class="setting">设置</div>
      </el-header>
      <!-- 解决fixed高度坍塌 -->
      <div class="token"></div>
      <!-- 主要区域 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  mounted() {}
  //
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}
.home-container {
  height: 100%;
}
.el-header {
  line-height: 7vh;
}
.el-main {
  padding: 10px !important;
  background-color: #e9eef3;
  height: 93vh;
  overflow: hidden;
}

.token {
  height: 7vh;
}
.nav {
  width: 100%;
  background: #333333;
  color: white;
  text-align: center;
  display: flex;
  position: fixed;
}
.nav a {
  color: white;
  text-decoration: none;
}
.nav .title {
  width: 25%;
  font-size: 26px;
  position: relative;
}
.nav .change {
  text-align: center;
  width: 50%;
}
.nav .setting {
  width: 25%;
}
.content {
  /* height: 94vh; */
  /* background: red; */
}
</style>
