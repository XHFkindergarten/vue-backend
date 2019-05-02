<template>
  <div style="display:inline">
    <el-button
      :style="`width:${width}px;`"
      :type="type">
      <div class="content-container">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="`#icon-${icon}`"></use>
        </svg>
          {{content}}
      </div>
      </el-button>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      default: ''
    },
    content: {
      default: ''
    },
    icon: {
      required: true
    },
    width: {
      default: 120
    }
  }
}
</script>
<style lang="less" scoped>
.content-container{
  display: flex;
  align-items: center;
  justify-content:space-around;
}
</style>
