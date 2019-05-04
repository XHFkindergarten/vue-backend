<template>
  <div>
    <h1>TODO: 未完成未完成未完成</h1>
    <el-row>
      <el-col :span="10" :offset="1">
        <el-tree
          ref="tree"
          show-checkbox
          highlight-current
          expand-on-click-node
          default-expand-all
          :filter-node-method="nodeFilter"
          @check-change="handleCheckChange"
          @node-click="handleNodeClick"
          :data="authorityData"></el-tree>
      </el-col>
    </el-row>
    
  </div>
</template>
<script>
import { asyncRouterMap } from '@/router/asyncRouterMap'
export default {
  name: 'AuthorityTree',
  data() {
    return {
      // 不确定的路由
      indeterminateRoute: ''
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    nodeFilter(value, data) {
      console.log(value)
      return true
    }
  },
  created() {
    
  },
  computed: {
    authorityData() {
      return asyncRouterMap
    },
  }
}
</script>
<style lang="less" scoped>

</style>
