<template>
  <div>
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

export default {
  // 默认的通用框架
  name: 'AppContainer',
  data() {
    return {
      collapse: true
    }
  },
  computed:{
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  components: {
    Head,
    Side
  },
  methods: {
    altCollapse() {
      !this.sideWidth
    }
  },
}
</script>
<style lang="less" scoped>
body {
  margin: 8px;
}
</style>
