<template>
  <div id="container" class="pic-container" @click="fullScreen">
    <img :src="picSrc" alt="图片">
    <div v-if="isFullScreen" class="full-screen">
      <SvgIcon @click.native.stop="cancelFullScreen" class="cancel" v-if="isFullScreen" icon="add3-wrong"></SvgIcon>
      <div class="img-container">
        <img :src="picSrc" alt="图片">
      </div>
    </div>
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
.full-screen{
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // min-height: 100vh;
  background-color:rgba(0,0,0,0.8);
  // display: flex;
  // justify-content: center;
  // align-items: center;
  overflow-x: auto;
  .img-container{
    width: 100%;
    min-height: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    // overflow-x: auto;
    align-items: center;
    justify-content: center;
    img{
      width: 100%;
      max-width: 500px;
    }
  }

  .cancel{
    position: fixed;
    bottom: 60px;
    right: 30px;
    z-index: 60;
    cursor: pointer;
  }
}
.pic-container{
  height: 100%;
  img {
    cursor: pointer;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 10px;
    width: 90%;
    height: 90%;
    object-fit: cover;
  }
}
</style>
