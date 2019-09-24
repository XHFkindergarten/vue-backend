<template>
  <div>
    <el-aside class="aside2 entire-container" :width="isBigScreen?'240px':'50vw'">
      <div class="addArt-container" @click="addArticle">
        <SvgIcon style="margin:5px;" size="mini" icon="add6"></SvgIcon>
        <span>添加文章</span>
      </div>
      <div v-if="!isBigScreen" class="addArt-container" >点击文章进入编辑</div>
      <div v-if="articleList.length==0" class="empty-tip">
        <SvgIcon style="margin:10px;" size="mid" icon="frown"></SvgIcon>
        <div>
          <div>没有文章？</div>
          <div>点击 <el-button @click="addArticle" type="text">添加文章</el-button></div>
          <div>搞快点!</div>
        </div>
        <span></span>
      </div>
      <div :class="index==activeArt?'active-art-container':'art-container'" @click="openArticle(index)" v-for="(item, index) in articleList" :key="index+''">
        <div class="art-svg-container">
          <SvgIcon id="save-icon" @click.native="saveArticle" v-if="index==activeArt" size="mid" icon="refresh"></SvgIcon>
          <SvgIcon v-else icon="code2" size="mid" style="color:#FFF"></SvgIcon>
        </div>
        <div class="art-title">
          <span>{{item.title}}</span>
        </div>
        <div class="delete-svg-container" @click="deleteArticle(item)">
          <SvgIcon id="delete-icon" icon="delete1" size="mid"></SvgIcon>
        </div>
        <div style="clear:both;"></div>
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
    openArticle(index) {
      this.activeArt = index
      this.$emit('openArticle', index)
    },
    // 点击保存文章
    saveArticle() {
      this.$emit('saveArticle')
    },
    // 点击删除文章
    deleteArticle(item) {
      this.$emit('deleteArticle', item)
    },
    // // 判断屏幕尺寸
    // judgeScreen() {
    //   if (window.innerWidth<800) {
    //     this.isBigScreen = false
    //   } else {
    //     this.isBigScreen = true
    //   }
    // },
  },
  computed: {
    isBigScreen() {
      return this.$store.state.isBigScreen
    }
  },
  mounted() {
    // this.judgeScreen()
  }
}
</script>
<style lang="less" scoped>
@block-height: 70px;
.entire-container {
  height: 100vh;
  overflow-x: auto;
}
.aside2{
  background: #2E2E2E;
  // height: 100%;
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
    font-size: 14px;
  }
  .addArt-container:hover{
    color: #0A86AF;
    cursor: pointer;
  }
  .art-container{
    padding: 5px 0;
    min-height: @block-height;
    border-left: 3px #2e2e2e solid;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    .art-title{
      // float:left;
      min-height: @block-height;
      width: 65%;
      float: left;
      display: flex;
      align-items: center;
      flex: 1;
      word-break: break-all;
      span{
      text-align: left;
        font-size: 14px;
        color: #FFF;
      }
    }
    .art-svg-container{
      display: flex;
      // position:relative;
      float: left;
      align-items: center;
      justify-content: center;
      width: 20%;
      min-height: @block-height;
      float: left;
      .font-num{
        position: absolute;
        bottom: 3px;
        font-size: 10px;
        color: #b3b3b3;
      }
    }
    .delete-svg-container{
      display: none;
    }
  }
  .active-art-container{
    padding: 5px 0;
    border-left: 3px #0A86AF solid;
    min-height: @block-height;
    display: flex;
    // justify-content: center;
    align-items: center;
    .art-title{
      word-break: break-all;
      // float:left;
      flex: 1;
      min-height: @block-height;
      width: 65%;
      float: left;
      display: flex;
      align-items: center;
      span{
      text-align: left;
        font-size: 14px;
        color: #FFF;
      }
    }
    .art-svg-container{
      display: flex;
      float: left;
      // position:relative;
      align-items: center;
      justify-content: center;
      width: 20%;
      min-height: @block-height;
      float: left;
      .font-num{
        position: absolute;
        bottom: 3px;
        font-size: 10px;
        color: #b3b3b3;
      }
    }
    .delete-svg-container{
      display: none;
    }
  }
  .active-art-container:hover {
    background: #404040;
    min-height: @block-height;
    .delete-svg-container{
      // float: left;
      width: 15%;
      justify-content: center;
      display:flex;
      align-items: center;
      min-height: @block-height;
      color: #b3b3b3;
      margin: 0 10px;
    }
  }
  .art-container:hover {
    background: #404040;
    border-left: 3px #404040 solid;
  }
}




#save-icon{
  cursor: pointer;
  color: #FFF;
}
#save-icon:hover{
  color: #0A86AF;
}
#delete-icon{
  color: #FFF;
  cursor: pointer;
}

</style>
