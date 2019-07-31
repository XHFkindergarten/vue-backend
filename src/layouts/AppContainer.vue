<template>
  <div>
    <NewHead></NewHead>
    <router-view/>
  </div>
</template>
<script>
import 'element-ui/lib/theme-chalk/display.css';
import Head from '@/layouts/Head'
import NewHead from '@/layouts/NewHead'
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
    Side,
    NewHead
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
.el-main{
  padding: 0;
}
</style>
