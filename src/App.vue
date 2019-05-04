<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {

    }
  },
  mounted() {
    console.log(window.innerHeight)
  }
}
</script>

<style>
body{
  min-height: 900px;
}
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-menu--collapse span
{
  display: none!important;
}

.el-menu--collapse i.el-submenu__icon-arrow{
  display:none;
}
.icon {
  width: 30px;
  height: 30px;
  /* vertical-align: -0.15em; */
  fill: currentColor;
  overflow: hidden;
}
</style>
