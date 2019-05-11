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
          <p>Write Blog</p>
          <button @click="writeArt" id="editArt">
            <SvgIcon size="mid" icon="edit"></SvgIcon>
          </button>
          <p>条件筛选</p>
          <input id="search" v-model="filterValue" @blur="articleFilter" placeholder="请输入查询关键字" type="text">
          <!-- <el-input v-model="filterValue" @blur="articleFilter" style="border-radius:50%;" type="text" placeholder="请输入文章标题或内容中的字段"></el-input> -->
        </div>
      </el-col>
      <el-col
        v-loading="isLoading"
        :lg={span:10,offset:2}
        :md={span:10,offset:2}
        :sm={span:10,offset:2}
        :xs={span:20,offset:2}
        >
        <h1 style="text-align:left;">Articles</h1>
        <div v-if="articleList.length==0" style="font-size:18px;height:50px;">暂无文章</div>
        <ArticlePreviewList
          v-else
          :articleList="currentPageArticleList"></ArticlePreviewList>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="2">
        <el-pagination
          v-if="articleList.length>0"
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
import SvgIcon from '@/layouts/SvgIcon'
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
      pageSize: 5,
      // 文章正在加载
      isLoading: false,
      // 是否是大屏
      isBigScreen: false,
      // 是否没有文章
      emptyArticle: true
    }
  },
  components: {
    ArticlePreviewList,
    SvgIcon
  },
  methods: {
    // 跳转到写文章页面
    writeArt() {
      if (this.$store.state.status) {
        if (this.isBigScreen) {
          this.$router.push('/articleManage')
        } else {
          this.$router.push('/SmallScreen')
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请登录后再试:('
        })
      }
      
      
    },
    // 根据用户id请求用户的所有文章
    async getUserArticle() {
      this.isLoading = true
      const res = await this.$store.dispatch('getAllArticleAction')
      this.isLoading = false
      this.articleList = res.data.article
      if (this.articleList.length==0) {
        this.emptyArticle = true
      }
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
    },
    judgeScreen() {
      console.log('change')
      if (window.innerWidth<800) {
        this.isBigScreen = false
      } else {
        this.isBigScreen = true
      }
    },
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
      const end = this.currentPage*this.pageSize
      return this.showArticleList.slice(begin, end)
    }
  },
  mounted() {
    this.judgeScreen()
    this.getUserArticle()
  },
  created() {
    window.onresize = this.judgeScreen
  }
}
</script>
<style lang="less" scoped>
p{
  font-size: 18px;
  font-weight: bold;
}
#editArt{
  padding: 0 20px;
  color: #fff;
  width: 100px;
  background: #409EFF;
  height:50px;
  border: none;
  border-radius: 25px;
}
#search{
  font-size: 15px;
  outline: none;
  width: 80%;
  background: #EEE;
  border: none;
  height: 40px;
  border-radius: 20px;
  padding: 0 20px;
}
.search-container{
  margin: 40px 0 20px;
  p{
    text-align: left;
  }
}
</style>
