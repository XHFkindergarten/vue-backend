<template>
  <div :class="sizeOption[size]">
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="`#icon-${icon}`"></use>
    </svg>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sizeOption: {
        mini: 'container-mini',
        mid: 'container-mid',
        large: 'container-large'
      }
    }
  },
  props: {
    icon: {
      required: true
    },
    size: {
      default: 'mid'
    },
  }
}
</script>
<style lang="less" scoped>
.container-mid{
  display: inline;
  height:30px;
  .icon{
    height: 30px;
    width: 30px;
  }
}
.container-mini{
  display: inline;
  height:20px;
  .icon{
    height: 20px;
    width: 20px;
  }
}
.container-large{
  display: inline;
  height:40px;
  .icon{
    height: 40px;
    width: 40px;
  }
}
</style>
