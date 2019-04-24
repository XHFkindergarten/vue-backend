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
          <img src="./assets/scutLOGO.png">
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
    // const token = Cookies.get('login-token')
    // if(token!=''&&token!=undefined) {
    //   this.$store.commit('setToken', token)
    //   this.$store.dispatch('currentAction')
    //     .catch(err => {
    //       this.$store.commit('resetToken')
    //     })
    // } else {
    //   this.$store.dispatch('addRoutes')
    // }

  },
  methods: {
    altCollapse() {
      !this.sideWidth
    }
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
</style>
