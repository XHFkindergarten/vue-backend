<template>
  <div>
    <div v-if="hasLogin" class="row">
      <el-button type="text" @click="aboutMe">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-user"></use>
        </svg>
        关于我
      </el-button>
    </div>
    <div v-if="hasLogin" class="row">
      <el-button type="text" @click="logout">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-logout"></use>
        </svg>
        LOGOUT
      </el-button>
    </div>
    <div v-else class="row">
      <el-button @click="login" type="text">
        <el-button type="text" @click="login">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-login"></use>
          </svg>
          登录
        </el-button>
      </el-button>
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
      this.$store.dispatch('logoutAction')
      Cookies.remove('login-token')
      this.$store.commit('resetRoutes')
      this.$store.dispatch('addRoutes')
      this.$router.push('/main/')
    },
    login: function() {
      this.$router.push('/main/login')
    },
    aboutMe: function() {
      this.$router.push('/main/me')
    }
  }
}
</script>
<style lang="less" scoped>
.row {
  text-align: center;
}
.icon {
  width: 20px;
  height: 20px;
  // 在el-button中的垂直居中需要设置
  vertical-align: -5px;
  fill: currentColor;
  overflow: hidden;
}
</style>
