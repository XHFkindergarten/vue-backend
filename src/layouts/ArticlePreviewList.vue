<template>
  <div>
    <el-card
      class="card"
      v-for="item in articleList"
      :key="item.id"
      shadow="hover"
      :body-style="{
        padding:'0',
        height:'280px'
      }"
          style="border-radius:10px;margin:40px 0;"
          >
          <div class="img-container">
            <img src="@/assets/demo.jpg">
          </div>
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
  width: 50%;
  height: 100%;
  float: left;
  img {
    width:100%;
    height:100%;
    object-fit: cover
  }
}
.art-container{
  float: left;
  width: 50%;
  .title{
    margin-top: 30px;
    margin-left: 30px;
    text-align: left;
    font-size: 30px;
    font-weight: bold;
    min-height: 60px;
  }
  .summary{
    margin: 0 0 0 30px;
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
