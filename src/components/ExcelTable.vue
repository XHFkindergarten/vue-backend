<template>
  <div>
    <el-table
      :data="tableData"
      border>
      <el-table-column
        v-for="item in tHead"
        :key="item"
        :prop="item"
        :label="item"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'ExcelTable',
  data() {
    return {
      tHead: []
    }
  },
  watch: {
    tableData: {
      handler(newValue, oldValue) {
        this.tHead = Object.keys(newValue[0])
      },
      deep: true
    }
  },
  props: [
    'tableData'
  ]
}
</script>
<style lang="less" scoped>

</style>
