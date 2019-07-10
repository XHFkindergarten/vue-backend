<template>
  <div>
    <el-row
      style="margin-top:50px;">
      <el-col
        :lg={span:5,offset:4}
        :md={span:8,offset:8}
        :sm={span:10,offset:7}
        :xs={span:24}
        >
        <el-row>
          <el-col
            :lg={span:24}
            :md={span:24}
            :sm={span:24}
            :xs={span:24}
            >
            <div class="avatar-container">
              <img  v-loading="loadingBtn" style="width:100%;height:100%;" :src="userInfo.avatar" alt="头像">
            </div>
            <div class="status-container">
              <SvgIcon :icon="moodOption[userInfo.mood]" size="mid" style="margin:0 5px 0 10px;"></SvgIcon>
              <div style="display:inline-block">{{userInfo.sign}}</div>
            </div>
          </el-col>
          <el-col
            :lg={span:24}
            :md={span:24}
            :sm={span:24}
            :xs={span:24}
            >
            <div class="username-container">
              <p id="username">{{userInfo.name}}</p>
              <p id="email">{{userInfo.email}}</p>
            </div>
          </el-col>
        </el-row>  
      </el-col>
      <el-col
        :lg={span:10,offset:1}
        :md={span:12,offset:6}
        :sm={span:14,offset:5}
        :xs={span:20,offset:2}
        >
        <div class="big-title">Articles</div>
        <div class="hr"></div>
        <ArticlePreviewList
          v-loading="isLoading"
          :articleList="showList"></ArticlePreviewList>
      </el-col>
      <el-col
        :lg={span:8,offset:8}
        :md={span:8,offset:8}
        :sm={span:8,offset:8}
        :xs={span:24}
        >
        <el-pagination
          :total="articleNum"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="pageChange"
          background
          layout="prev, pager, next"
          >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ArticlePreviewList from '@/layouts/ArticlePreviewList'
import SvgIcon from '@/layouts/SvgIcon'
export default {
  name: 'Person',
  data() {
    return {
      userInfo: {},
      moodOption: {
        0: 'smile',
        1: 'meh',
        2: 'frown'
      },
      sign: '',
      mood: '',
      loadingBtn: false,
      // 个人文章列表
      articleList: [],
      // 加载文章时显示loading
      isLoading: false,
      // 每页显示的条数
      pageSize: 4,
      currentPage: 1,
    }
  },
  props: ['id'],
  components: {
    ArticlePreviewList,
    SvgIcon
  },
  computed: {
    articleNum() {
      return this.articleList.length
    },
    showList() {
      const begin = (this.currentPage-1)*this.pageSize
      const end = this.currentPage*this.pageSize
      return this.articleList.slice(begin, end)
    }
  },
  mounted() {
    // this.judgeScreen()
    this.getUserInfo()
    this.getUserArticle()
  },
  // created() {
  //   window.onresize = this.judgeScreen
  // },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      const res = await this.$store.dispatch('getOneUserAction', this.id)
      this.userInfo = res.data.user
    },
    // 获取用户的文章
    async getUserArticle() {
      this.isLoading = true
      const res = await this.$store.dispatch('getArticleList', {
        userId: this.id,
        isPublic: 1
      })
      this.isLoading = false
      console.log(res)
      this.articleList = res.data.article
    },
    pageChange(index) {
      this.currentPage = index
    }
  },
  directives: {

  }
}
</script>
<style lang="less" scoped>
.big-title{
  margin-top: 30px;
  font-size: 40px;
  text-align: left;
  font-weight: bolder;
}
.hr{
  width: 100%;
  border-top: 1px #505050 solid;
  margin: 10px 0 20px 0;
}


.avatar-container{
  margin: 0 auto;
  width: 240px;
  height: 240px;
  border: 1px #e1e4e8 solid;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  position: relative;
}

.status-container{
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  width: 240px;
  border-bottom: 1px #e1e4e8 solid;
  border-left: 1px #e1e4e8 solid;
  border-right: 1px #e1e4e8 solid;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  text-align: left;
  line-height: 40px;
  position: relative;
  .edit-icon{
    display: none;
  }
}
.status-container:hover{
  .edit-icon{
    display: block;
    position: absolute;
    right: 10px;
  }
}
.editUsernameInput{
  width: 80%;
  margin-top: 20px;
}
.icon{
  margin: 0 5px 0 10px;
}
.username-container{
  margin: 0 auto;
  text-align: left;
  border-bottom: 1px #e1e4e8 solid;
  width:240px;
}
#username{
  font-size: 25px;
  font-weight: bold;
  margin: 15px 0 0;
}
.email{
  font-size: 18px;
  font-weight: thin;
  margin:0;
}
.mood-select-container{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
