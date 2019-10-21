<template>
  <div>
    <el-container>
      <el-header style="padding:0;height:auto;">
        <!-- <Head :userInfo="userInfo"></Head> -->
        <NewHead></NewHead>
      </el-header>
      <div :class="[{'bg': grayBg}]">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
      <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
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
      // grayBg: false
    }
  },
  // watch: {
  //   $route(newValue, oldValue) {
  //     if (newValue.meta.gray) {
  //       this.grayBg = true
  //     }
  //   }
  // },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    grayBg() {
      return this.$route.meta.gray
    }
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
@media screen and (min-width:992px) {
  .bg {
    background: #F4F5F5;
  }
}
@media screen and (max-width:992px) {
  .bg {
    background: #FFF;
  }
}
</style>
