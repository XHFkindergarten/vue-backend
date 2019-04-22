<template>
  <!-- <div> -->
    <el-menu
      :default-active="$route.path"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      mode="vertical"
      router
      >
      <SidebarItem v-for="route in this.getRouterMenu" :item=route :key="route.path" />
    </el-menu>
  <!-- </div> -->
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  name: 'Sidebar',
  data() {
    return {
      isCollapse: false
    }
  },
  components: {
    SidebarItem
  },
  computed: {
    // ...mapGetters([
    //   "getRouterMenu"
    // ]),
    getRouterMenu() {
      return this.$store.state.routes
    }
  },
  methods: {
    handleOpen() {

    },
    handleClose() {

    },
    // mouseover() {
    //   this.isCollapse = false
    // }
  }
}
</script>
<style lang="less" scoped>

</style>
