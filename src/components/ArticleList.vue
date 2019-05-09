<template>
  <div>
    <el-row>
      <el-col
        :lg={span:4,offset:4}
        :md={span:5,offset:3}
        :sm={span:6,offset:2}
        :xs={span:20,offset:2}
        >
        <div class="search-container">
          <p>条件筛选</p>
          <el-input v-model="filterValue" @blur="articleFilter" type="text" placeholder="请输入文章标题或内容中的字段"></el-input>
        </div>
      </el-col>
      <el-col
        :lg={span:10,offset:2}
        :md={span:10,offset:2}
        :sm={span:10,offset:2}
        :xs={span:20,offset:2}
        >
        <ArticlePreviewList
          v-loading="isLoading"
          :articleList="currentPageArticleList"></ArticlePreviewList>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="8">
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
export default {
  name: 'articleList',
  data() {
    return {
      // 文章列表
      articleList: [],
      // 被筛选条件筛选后的显示的文章
      showArticleList: [],
      // 文章筛选文字
      filterValue: '',
      // 当前所在页码
      currentPage: 1,
      // 每页的数据量
      pageSize: 3,
      // 文章正在加载
      isLoading: false,
    }
  },
  components: {
    ArticlePreviewList
  },
  methods: {
    // 根据用户id请求用户的所有文章
    async getUserArticle() {
      this.isLoading = true
      const res = await this.$store.dispatch('getAllArticleAction')
      this.isLoading = false
      this.articleList = res.data.article
      this.showArticleList = res.data.article
    },
    // 条件查询筛选文章
    articleFilter() {
      if (!this.filterValue) {
        this.showArticleList = this.articleList
        return
      }
      this.currentPage = 1
      const Reg = new RegExp(this.filterValue, 'g')
      this.showArticleList = this.articleList.filter((item) => {
        return Reg.test(item.title) || Reg.test(item.content)
      })
    },
    // 页面变化
    pageChange(newPage) {
      this.currentPage = newPage
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    // 总的数据量
    articleNum() {
      return this.showArticleList.length
    },
    // 当前页显示的文章
    currentPageArticleList() {
      const begin = (this.currentPage-1)*this.pageSize
      const end = this.currentPage*this.pageSize - 1
      return this.showArticleList.slice(begin, end)
    }
  },
  mounted() {
    this.getUserArticle()
  }
}
</script>
<style lang="less" scoped>
.search-container{
  margin: 40px 0 20px;
  p{
    text-align: left;
  }
}
</style>
