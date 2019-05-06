<template>
  <div>
    <el-aside class="aside2" width="240px">
      <div class="addArt-container" @click="addArticle">
        <SvgIcon style="margin:5px;" size="mini" icon="add6"></SvgIcon>
        <span>添加文章</span>
      </div>
      <div v-if="articleList.length==0" class="empty-tip">
        <SvgIcon style="margin:10px;" size="mid" icon="frown"></SvgIcon>
        <div>
          <div>没有文章？</div>
          <div>点击 <el-button @click="addArticle" type="text">添加文章</el-button></div>
          <div>搞快点!</div>
        </div>
        <span></span>
      </div>
      <div :class="item.index==activeArt?'active-art-container':'art-container'" @click="openArticle(item)" v-for="item in articleList" :key="item.index">
        <div class="art-svg-container">
        <SvgIcon icon="smile" size="mid" style="color:#b3b3b3"></SvgIcon>
          <span class="font-num">字数:{{item.content.length}}</span>
        </div>
        <div class="art-title">
          <p>{{item.title}}</p>
        </div>
      </div>
    </el-aside>
  </div>
</template>
<script>
import SvgIcon from '@/layouts/SvgIcon'
export default {
  name: 'ArticleListAside',
  components: {
    SvgIcon
  },
  props: {
    articleList: {
      default: {}
    }
  },
  data() {
    return {
      activeArt: ''
    }
  },
  methods: {
    // 点击添加文章
    addArticle() {
      this.$emit('addArticle')
    },
    // 点击打开文章
    openArticle(item) {
      this.activeArt = item.index
      this.$emit('openArticle', item.index)
    }
  }
}
</script>
<style lang="less" scoped>
.aside2{
  background: #2E2E2E;
  height: 100%;
  .empty-tip{
    font-size: 14px;
    height: 100px;
    color: #b3b3b3;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .addArt-container{
    height:72px;
    display: flex;
    padding-left: 10px;
    justify-content: flex-start;
    align-items: center;
    color: #b3b3b3;
    font-size: 16px;
  }
  .addArt-container:hover{
    color: #0A86AF;
    cursor: pointer;
  }
  .art-container{
    height: 90px;
    border-left: 3px #2e2e2e solid;
    
  }
  .active-art-container{
    border-left: 3px #0A86AF solid;
    height: 90px;
  }
  .active-art-container:hover {
    background: #404040;
  }
  .art-container:hover {
    background: #404040;
    border-left: 3px #404040 solid;
  }
}
.art-svg-container{
  display: flex;
  position:relative;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 100%;
  float: left;
  .font-num{
    position: absolute;
    bottom: 3px;
    font-size: 10px;
    color: #b3b3b3;
  }
}
.art-title{
  height: 100%;
  width: 150px;
  float: left;
  display: flex;
  align-items: center;
  p{
   text-align: left;
    font-size: 20px;
    color: #b3b3b3;
  }
}
</style>
