<template>
  <div>
    <template v-for="list in this.menuList">
      <el-submenu v-if="list.children&&list.children.length>0" :index="list.path" :key="list.path">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="`#icon-${list.icon}`"></use>
          </svg>
          <span slot="title">{{list.label}}</span>
        </template>
        <sidebar-item :menuList="list.children.filter(l=>!l.hidden)"></sidebar-item>
      </el-submenu>
      <el-menu-item v-else :index="list.alias" :key="list.path">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="`#icon-${list.icon}`"></use>
          </svg>
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
.icon {
  width: 20px;
  height: 20px;
  /* vertical-align: -0.15em; */
  fill: currentColor;
  overflow: hidden;
}
</style>
