<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in routesArray" :key="item">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'RouteView',
  data() {
    return {

    }
  },
  computed: {
    routesArray() {
      const array = []
      this.$route.matched.forEach(route => {
        array.push(route.name)
      })
      return array
    }
  },
  mounted() {
    console.log(this.$route)
  }
}
</script>
<style lang="less" scoped>
.container{
  height: 60px;
  display: flex;
  align-items: center;
}
</style>
