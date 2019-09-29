<template>
  <div>
    <el-container>
      <el-header style="padding:0;height:auto;">
        <!-- <Head :userInfo="userInfo"></Head> -->
        <NewHead></NewHead>
      </el-header>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </el-container>
  </div>
</template>
<script>
import Head from '@/layouts/Head'
import NewHead from '@/layouts/NewHead'
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
    Head,
    NewHead
  }
}
</script>
<style lang="less" scoped>

</style>
