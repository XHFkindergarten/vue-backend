<template>
  <div id="app">
    <el-container>
      <el-header>
        <Head
          :userInfo="userInfo"></Head>
      </el-header>
      <el-container style="margin-top:1px;">
        <el-aside
          :width="(collapse?'201':'65'+'px')">
          <Side @altCollapse="altCollapse"></Side>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import Head from '@/layouts/Head'
import Side from '@/layouts/Sidebar'
import Cookies from 'js-cookie'
// import {mapState} from 'vuex'
import HelloWorld from '@/components/HelloWorld'
// import utils from '@/tools/utils'

export default {
  name: 'App',
  data() {
    return {
      collapse: true
    }
  },
  components: {
    Head,
    Side
  },
  computed:{
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  created() {
    
  },
  methods: {
    altCollapse() {
      !this.sideWidth
    }
  },
  mounted() {
    // 监听键盘按键
    // window.addEventListener('keydown', event => {
    //   console.log('按下', event.key)
    //   console.log('keynode', event.keyCode)
    //   if (event.keyCode==9) {
    //     event.preventDefault()
    //   }
    // })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
