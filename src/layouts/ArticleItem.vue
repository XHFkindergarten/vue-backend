<template>
  <div @click="toArticle" class="art-container" :style="`background:${colorPlan.bg}`">
    <div class="title" :style="`color:${colorPlan.font}`">{{artInfo.title}}</div>
    <div class="author" :style="`color:${colorPlan.font}`">{{artInfo.userInfo.name}}</div>
    <div class="summary" :style="`color:${colorPlan.font}`">{{artInfo.summary}}</div>
    <div class="tags" :style="`color:${colorPlan.font}`">{{tags}}</div>
    <div class="info-container">
      <div class="circle">
        <SvgIcon class="icon" size="mini" icon="like3"></SvgIcon>
        <div class="side-num">{{artInfo.likeNum}}</div>
      </div>
      <div class="circle">
        <SvgIcon class="icon" size="mini" icon="Comment"></SvgIcon>
        <div class="side-num">{{artInfo.commentNum}}</div>
      </div>
      <div class="circle">
        <SvgIcon class="icon" size="mini" icon="eyes"></SvgIcon>
        <div class="side-num">{{artInfo.viewTime}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import SvgIcon from '@/layouts/SvgIcon'
export default {
  components: {
    SvgIcon
  },
  data() {
    return {
      colorList: [
        {
          bg: '#5C638B',
          font: '#FFF'
        },
        {
          bg: '#C43239',
          font: '#FFF'
        },
        {
          bg: '#2F5C85',
          font: '#FFF'
        },
        {
          bg: '#F9CE8C',
          font: '#000'
        },
        {
          bg: '#18927B',
          font: '#FFF'
        },
        {
          bg: '#02206D',
          font: '#FFF'
        },
        {
          bg: '#7BA1C7',
          font: '#FFF'
        },
        {
          bg: '#DAE1EB',
          font: '#000'
        },
      ]
    }
  },
  methods: {
    toArticle() {
      this.$router.push({path: '/article', query: {id: this.artInfo.id}})
    }
  },
  computed: {
    colorPlan() {
      return this.colorList[
        this.index%this.colorList.length
      ]
    },
    tags() {
      return this.artInfo.tags.join('  |  ')
    }
  },
  props: [
    'artInfo',
    'index'
  ]
}
</script>
<style lang="less" scoped>
@media screen and (min-width: 992px) {
  .title {
    font-size: 50px;
  }
  .summary {
    font-size: 20px;
  }
  .info-container {
    width: 500px;
  }
}
@media screen and (max-width: 992px) {
  .summary {
    max-width: 80vw;
    font-size: 16px;
  }
  .title {
    font-size: 40px;
    max-width: 80vw;
    word-break: break-all;
  }
  .info-container {
    width: 80vw;
  }
}
.art-container {
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 100px 0;
  .title {
    font-weight: bolder;
  }
  .author {
    font-family: Circular_book;
  }
  .summary {
    margin: 20px;
    width: 500px;
  }
  .tags {
    font-weight: 700;
  }
  .info-container {
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .circle{
      @circle: 40px;
      width: @circle;
      height: @circle;
      border-radius: 50%;
      // background: #FFF;
      // box-shadow: 0 2px 4px 0 rgba(0,0,0,.04);
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .side-num{
        position: absolute;
        left: 75%;
        line-height: 1;
        top: 0;
        background: #FFF;
        transform-origin: left top;
        font-size: 1rem;
        transform: scale(0.75);
        border-radius: .7rem;
        color: #000;
        padding: .1rem .4rem;
      }
    }
  }
}
</style>
