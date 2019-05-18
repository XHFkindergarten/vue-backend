<template>
  <div class="favicon-container">
    <img class="favicon" style="margin:20px 0 0;" :src="srcUrl">
    <div class="favicon-title">{{title}}</div>
  </div>
</template>
<script>
import keys from '@/common'
export default {
  computed: {
    srcUrl() {
      return `http://img.xhfkindergarten.cn/${this.birdOptions[this.bird]}`
    }
  },
  data() {
    return {
      birdOptions: {
        default: 'default-bird.png',
        happy: 'happy-bird.png',
        knight: 'knight-bird.png',
        boxer: 'boxer-bird.png',
      }
    }
  },
  props: {
    title: {
      default: ''
    },
    bird: {
      default: 'default'
    }
  },
  mounted() {
    
  }
}
</script>
<style lang="less" scoped>
.favicon-container{
  height: 300px;
  position: relative;
  .favicon{
    width: 300px;
    height: 300px;
  }
  .favicon-title{
    width:400px;
    height: 80px;
    color: #301E1D;
    position:absolute;
    bottom: 0;
    text-align: center;
    margin-left: -200px;
    left: 50%;
    font-size: 60px;
    font-weight: bolder;
  }
}
</style>
