<template>
  <div>
    <template v-for="list in this.menuList">
      <el-submenu v-if="list.children&&list.children.length>0" :index="list.path" :key="list.path">
        <template slot="title">
          <i :class="('el-icon-'+list.icon)"></i>
          <span slot="title">{{list.label}}</span>
        </template>
        <sidebar-item :menuList="list.children.filter(l=>!l.hidden)"></sidebar-item>
      </el-submenu>
      <el-menu-item v-else :index="list.path" :key="list.path">
        <template slot="title">
          <i :class="('el-icon-'+list.icon)"></i>
          <span slot="title">{{list.label}}</span>
        </template>
      </el-menu-item>
    </template>
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
    'menuList'
  ],
  computed: {
    
  }
}
</script>
<style lang="less" scoped>

</style>
