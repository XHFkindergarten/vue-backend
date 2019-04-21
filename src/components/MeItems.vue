<template>
  <div>
    <div v-if="hasLogin" class="row">
      <el-button type="text">关于我</el-button>
    </div>
    <div v-if="hasLogin" class="row">
      <el-button type="text" @click="logout">LogOut</el-button>
    </div>
    <div v-else class="row">
      <el-button @click="login" type="text">登录</el-button>
    </div>
  </div>
  
</template>
<script>
import Cookies from 'js-cookie'
export default {
  name: 'MeItems',
  props:[
    'hasLogin'
  ],
  methods: {
    logout: function() {
      Cookies.remove('login-token')
      this.$store.commit('altStatus')
      this.$store.commit('resetToken')
      this.$store.commit('resetUserInfo')
    },
    login: function() {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scoped>
.row {
  text-align: center;
}
</style>
