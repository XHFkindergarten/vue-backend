<template>
  <div id="container" :class="isFullScreen?'full-screen':'pic-container'" @click="fullScreen">
    <SvgIcon @click.native.stop="cancelFullScreen" class="cancel" v-if="isFullScreen" icon="add3-wrong"></SvgIcon>
    <img :src="picSrc" alt="图片">
  </div>
</template>
<script>
import SvgIcon from '@/layouts/SvgIcon'
export default {
  data() {
    return {
      isFullScreen: false
    }
  },
  components: {
    SvgIcon
  },
  methods: {
    fullScreen() {
      this.isFullScreen = true
    },
    cancelFullScreen() {
      this.isFullScreen = false
    }
  },
  props: [
    'picSrc'
  ]
}
</script>
<style lang="less" scoped>
div, img{
  transition: all 0.8s ease-in-out;
}
.full-screen{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color:rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: 80%;
    max-width: 500px;
  }
  .cancel{
    position:absolute;
    top: 30px;
    right: 30px;
    z-index: 60;
    cursor: pointer;
  }
}
.pic-container{
  height: 100%;
  img {
    border: 2px solid transparent;
    border-radius: 10px;
    width: 90%;
    height: 90%;
  }
}
</style>
