<template>
<div>
  <router-view :tableData="tableData"></router-view>
</div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        { time:'2019-1-1', name: 'lzk1', province: 'Jiangxi', city: 'Gaoan', address: '广州市天河区华南理工大学', edit: false},
        { time:'2019-2-1', name: 'lzk2', province: 'Jiangxi', city: 'Gaoan', address: '广州市天河区华南理工大学', edit: false },
        { time:'2019-3-1', name: 'lzk3', province: 'Jiangxi', city: 'Gaoan', address: '广州市天河区华南理工大学', edit: false },
        { time:'2019-4-1', name: 'lzk4', province: 'Jiangxi', city: 'Gaoan', address: '广州市天河区华南理工大学', edit: false },
        { time:'2019-5-1', name: 'lzk5', province: 'Jiangxi', city: 'Gaoan', address: '广州市天河区华南理工大学', edit: false },
        { time:'2019-6-1', name: 'lzk6', province: 'Jiangxi', city: 'Gaoan', address: '广州市天河区华南理工大学', edit: false },
        { time:'2019-7-1', name: 'lzk7', province: 'Jiangxi', city: 'Gaoan', address: '广州市天河区华南理工大学', edit: false },
        { time:'2019-8-1', name: 'lzk8', province: 'Jiangxi', city: 'Gaoan', address: '广州市天河区华南理工大学', edit: false },
      ],
    }
  }
}
</script>
<style lang="less" scoped>

</style>
