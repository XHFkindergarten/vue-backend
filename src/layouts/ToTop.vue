<template>
  <div @click="toTarget">
    <div :class="show ? 'circle-container': 'none'" :style="`opacity:${opacity};background:${bg}`">
      <SvgIcon icon="top"></SvgIcon>
    </div>
  </div>
</template>
<script>
import SvgIcon from '@/layouts/SvgIcon'
export default {
  components: {
    SvgIcon
  },
  methods: {
    toTarget() {
      let offsetTop
      if (this.target == '#target') {
        offsetTop = $(this.target)[0].offsetTop - 60
      } else {
        offsetTop = $(this.target)[0].offsetTop
      }
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      })
    }
  },
  mounted() {

  },
  props: [
    'target',
    'show',
    'opacity',
    'bg'
  ]
}
</script>
<style lang="less" scoped>
@media screen and (min-width: 992px) {
  .circle-container {
    right: 100px;
    bottom: 200px;
  }
}
@media screen and (max-width: 992px) {
  .circle-container {
    right: 50px;
    bottom: 100px;
  }
}
.circle-container {
  position: fixed;
  @size: 60px;
  height: @size;
  width: @size;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.none {
  display: none;
}
</style>
