<template>
  <div style="min-height:200px;">
    <el-card
      class="card"
      v-for="item in articleList"
      @click.native="toArticle(item)"
      :key="item.id"
      shadow="hover"
      :body-style="{
        padding:'0',
      }"
      style="border-radius:10px;margin:40px 0;"
      >
      <el-row>
        <el-col
          :lg="{span:12}"
          :md="{span:24}"
          :sm="{span:24}"
          :xs="{span:24}"
          >
          <div class="img-container">
            <img src="@/assets/demo.jpg">
          </div>
        </el-col>
        <el-col
          :lg="{span:12}"
          :md="{span:24}"
          :sm="{span:24}"
          :xs="{span:24}"
          >
          <div class="art-container">
            <div class="title">{{item.title}}</div>
            <div class="summary">{{item.summary}}</div>
            <div class="comment">
              <span>{{item.userInfo.name}}</span>
              <SvgIcon class="info-icon" size="mini" icon="like3"></SvgIcon>
              <span>{{item.likeNum}}</span>
              <SvgIcon class="info-icon" size="mini" icon="Comment"></SvgIcon>
              <span>{{item.commentNum}}</span>
              <SvgIcon class="info-icon" size="mini" icon="eyes"></SvgIcon>
              <span>{{item.viewTime}}</span>
            </div>
          </div>
        </el-col>  
      </el-row>
        </el-card>
  </div>
</template>
<script>
import SvgIcon from '@/layouts/SvgIcon'
export default {
  name: 'ArticlePreviewList',
  data() {
    return {

    }
  },
  methods: {
    toArticle(item) {
      this.$router.push({path: '/article', query: {id: item.id}})
    }
  },
  props: [
    'articleList'
  ],
  components: {
    SvgIcon
  }
}
</script>
<style lang="less" scoped>
.info-icon{
  margin: 0 10px;
}
.card{
  cursor: pointer;
}
.img-container{
  width:100%;
  height:275px;
  overflow: hidden;
  // float: left;
  img {
    width:100%;
    height:100%;
    object-fit: cover;
  }
}
.art-container{
  // float: left;
  width: 100%;
  .title{
    margin: 30px 0 10px 30px;
    text-align: left;
    font-size: 30px;
    font-weight: bold;
    height: 72px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }
  .summary{
    margin: 0 30px;
    min-height: 110px;
    text-align: left;
    font-size: 14px;
    color: #717a84;
    word-wrap: break-word;
  }
  .comment{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 12px;
    color: #717a84;
    margin-left: 30px;
    min-height: 50px;
  }
}
</style>
