<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {

    }
  },
  // watch: {
  //   $route(to, from) {
  //     console.log('$route change')
  //   }
  // },
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
.v-note-wrapper {
  height: 100vh !important;
}
.v-note-op {
  position:absolute;
  top: 0;
}
@media screen and (min-width:992px) {
  .v-note-panel {
    margin-top: 80px;
  }
}
@media screen and (max-width:992px) {
  .v-note-panel {
    margin-top: 120px;
  }
}

</style>
