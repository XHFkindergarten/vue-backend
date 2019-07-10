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
  methods: {
    // 判断屏幕大小
    judgeScreen() {
      if (window.innerWidth<800) {
        this.$store.commit('notBigScreen')
      }
    },
  },
  mounted() {
    this.judgeScreen()
    // this.$message({
    //   type: 'warning',
    //   message: '服务器又被攻击了,请重新注册!'
    // })
    // console.log(window.innerHeight)
  }
}
</script>

<style>
body{
  height: 100%;
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
