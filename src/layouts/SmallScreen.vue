<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2">
        <h1>手机用户⑧可以编辑</h1>
        <img style="width: 100%;" :src="img">
      </el-col>
    </el-row>
  </div>
</template>
<script>
import keys from '@/common'
export default {
  data() {
    return {
      img: `${keys.host}/uzi.gif`
    }
  }
}
</script>
<style lang="less" scoped>

</style>
