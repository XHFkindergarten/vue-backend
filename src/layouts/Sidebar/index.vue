<template>
  <!-- <div> -->
    <el-menu
      class="menu"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      router
      >
      <el-menu-item @click="altCollapse">
        <template>
          <i v-if="!isCollapse" class="el-icon-d-arrow-left"></i>
          <i v-else class="el-icon-d-arrow-right"></i>
        </template>
      </el-menu-item>
      <!-- <div class="altCollapse">
        <i v-if="!isCollapse" class="el-icon-d-arrow-left"></i>
        <i v-else class="el-icon-d-arrow-right"></i>
      </div> -->
      <SidebarItem :menuList="getRouterMenu.filter(list=>list.hidden==false)" />
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
      isCollapse: false,
    }
  },
  components: {
    SidebarItem
  },
  computed: {
    getRouterMenu() {
      return this.$store.state.routes
    }
  },
  methods: {
    handleOpen() {

    },
    handleClose() {

    },
    altCollapse() {
      this.isCollapse = !this.isCollapse
      this.$emit('altCollapse')
    }
    // mouseover() {
    //   this.isCollapse = false
    // }
  }
}
</script>
<style lang="less" scoped>
.altCollapse{
  height: 56px;
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.menu{
  width:64px;
  min-height: 400px;
}
.menu:not(.el-menu--collapse){
  width:200px;
  min-height: 400px;
}
</style>
