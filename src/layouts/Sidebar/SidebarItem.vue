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

    <!-- 没有子标签的情况 -->

    <!-- <el-menu-item 
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
      
    </el-submenu> -->
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
