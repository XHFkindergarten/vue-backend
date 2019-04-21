<template>
  <div v-if="!item.hidden">
    <!-- 没有子标签的情况 -->

    <el-menu-item 
      v-if="!item.children"
      :index="item.path">
      <template slot="title">
        <i :class="('el-icon-'+item.icon)"></i>
        <span slot="title">{{item.label}}</span>
      </template>
    </el-menu-item>
    
    <el-submenu
      v-else
      popper-append-to-body
      :index="item.path">
      <template slot="title">
        <i :class="('el-icon-'+item.icon)"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        ></sidebar-item>
      
    </el-submenu>
  </div>
</template>
<script>
export default {
  name: 'SidebarItem',
  data() {
    return {
      
    }
  },
  props: [
    'item'
  ],
  computed: {
    
  }
}
</script>
<style lang="less" scoped>

</style>
