<template>
  <div>
    <el-container>
      <el-header style="padding:0;height:auto;">
        <!-- <Head :userInfo="userInfo"></Head> -->
        <NewHead></NewHead>
      </el-header>
      <!-- <el-main :style="`background: ${isBigScreen?'#F4F5F5':'#FFF'};`"> -->
      <div class="bg">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
      
      <!-- </el-main> -->
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
    isBigScreen() {
      return this.$store.state.isBigScreen
    },
    // key() {
    //   return this.$route + new Date()
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
