<template>
  <div>
    <el-container>
      <el-header style="padding:0;height:auto;">
        <Head :userInfo="userInfo"></Head>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Head from '@/layouts/Head'
export default {
  name: 'HeaderContainer',
  data() {
    return {

    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    // key() {
    //   return this.$route+new Date()
    // }
  },
  components: {
    Head
  }
}
</script>
<style lang="less" scoped>

</style>
