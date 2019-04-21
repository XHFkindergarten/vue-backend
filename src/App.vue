<template>
  <div id="app">
    <el-container>
      <el-header>
        <Head
          :userInfo="userInfo"></Head>
      </el-header>
      <el-main>
        <img src="./assets/scutLOGO.png">
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Head from '@/layouts/Head'
import Cookies from 'js-cookie'
// import {mapState} from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  components: {
    Head
  },
  computed:{
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  created() {
    const token = Cookies.get('login-token')
    if(token!='') {
      this.$store.commit('setToken', token)
      this.$store.dispatch('currentAction')
        .then(res => {
          this.$store.commit('setUserInfo',res.data)
          this.$store.commit('altStatus')
          this.$store.dispatch('getRoleAction',{
            id: this.userInfo.id
          })
            .then(res => {
              this.$store.commit('setRoles',res.data.data)
            })
        })
    }
  },
  methods: {

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
</style>
