<template>
  <div style="height:100%;">
    <div id="container" class="pic-container" @click="fullScreen">
      <img class="img1" :src="picSrc" alt="图片">
    </div>
    <div v-if="isFullScreen" class="full-screen">
      <div class="full-pic-container">
        <img @click="cancelFullScreen" :src="picSrc" alt="大图">
      </div>
      <!-- <SvgIcon @click.native.stop="cancelFullScreen" class="cancel" v-if="isFullScreen" icon="add3-wrong"></SvgIcon> -->
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
    swipeLeft() {
      // console.log('swipe left')
    },
    fullScreen() {
      this.isFullScreen = true
      this.stop()
    },
    cancelFullScreen() {
      this.isFullScreen = false
      this.scroll()
    },
    // 禁止滚动滚动
    stop() {
      var mo = function(event){event.preventDefault()}
      document.body.style.overflow = 'hidden'
      document.addEventListener('scroll', mo, false)
    },
    // 允许滚动条滚动
    scroll() {
      var mo = function(event){event.preventDefault()}
      document.body.style.overflow = 'auto'
      document.removeEventListener('scroll', mo, false)
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
  background-color:rgba(0,0,0,0.8);
  overflow-x: auto;
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-start;
  // align-items: center;
  .full-pic-container{
    display: flex;
    // flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    height: auto;
    img{
      width: 100%;
      max-width: 500px;
      // object-fit: contain;
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
