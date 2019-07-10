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
          <p>标签筛选</p>
          <el-select
            clearable
            @change="tagSearch"
            style="width:94%;"
            v-model="selectValue"
            placeholder="请选择标签">
            <el-option
              v-for="item in tagOptions"
              :key="item"
              :value="item"
              :label="item"
              ></el-option>
          </el-select>
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
import keys from '@/common'
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
      // 文章筛选标签
      selectValue: '',
      // 当前所在页码
      currentPage: 1,
      // 每页的数据量
      pageSize: 5,
      // 文章正在加载
      isLoading: false,
      // 是否没有文章
      emptyArticle: true,
      // 是否正在搜索
      isSearching: false,
      // 标签选项
      tagOptions: []
    }
  },
  components: {
    ArticlePreviewList,
    SvgIcon
  },
  methods: {
    // 根据标签筛选
    tagSearch() {
      if (this.selectValue===null) {
        this.showArticleList = this.articleList
        return
      }
      const target = this.selectValue
      this.showArticleList = this.articleList.filter(item => {
        return item.tags.indexOf(target) !== -1
      })

    },
    // 条件查询筛选文章
    articleFilter() {
      this.isSearching = false
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
    // 跳转到写文章页面
    writeArt() {
      if (this.$store.state.status) {
        this.$router.push('/articleManage')
      } else {
        this.$message({
          type: 'warning',
          message: '请登录后再试:('
        })
      }
    },
    // 洗数据(tags)
    formatTags() {
      let tagOptions = []
      
      this.articleList.forEach(art => {
        if (art.tags&&art.tags.length > 0) {
          art.tags = art.tags.split(keys.tagGap)
          tagOptions = tagOptions.concat(art.tags).unique()
        }
      })
      this.tagOptions = tagOptions
      // console.log(this.articleList)
    },
    // 获取所有文章
    async getUserArticle() {
      this.isLoading = true
      const res = await this.$store.dispatch('getAllArticleAction')
      this.isLoading = false
      this.articleList = res.data.article
      this.formatTags()
      if (this.articleList.length==0) {
        this.emptyArticle = true
      }
      this.showArticleList = res.data.article
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
      const end = this.currentPage*this.pageSize
      return this.showArticleList.slice(begin, end)
    },
    isBigScreen() {
      return this.$store.state.isBigScreen
    }
  },
  mounted() {
    Array.prototype.unique = function(){
      var a = {};
      for(var i = 0; i < this.length; i++){
        if(typeof a[this[i]] == "undefined")
          a[this[i]] = 1;
      }
      this.length = 0;
      for(var i in a)
        this[this.length] = i;
      return this;
    }
    // this.judgeScreen()
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
