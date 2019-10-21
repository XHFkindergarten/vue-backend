<template>
  <div class="header-padding" style="position:relative;">
    <!-- <img class="bg" src="https://img.xhfkindergarten.cn/desk.jpeg" alt="background"> -->
    <div class="banner">
      <div class="banner-word">Calm and Collected</div>
      <div @click="addArticle" :class="['write-circle',{'visibility':!hasStatus}]">
        <SvgIcon icon="add-white"></SvgIcon>
      </div>
    </div>
    <el-row class="form">
      <el-col
        :lg={span:5,offset:5}
        :md={span:5,offset:3}
        :sm={span:6,offset:2}
        :xs={span:20,offset:2}
        >
        <div class="label">Tag Filter</div>
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
      </el-col>
      <el-col
        :lg={span:5,offset:4}
        :md={span:5,offset:3}
        :sm={span:6,offset:2}
        :xs={span:20,offset:2}
        >
        <div class="label">Word Filter</div>
        <input id="search" v-model="filterValue" @blur="articleFilter" placeholder="请输入查询关键字" type="text">
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :lg={span:14,offset:5}
        :md={span:5,offset:3}
        :sm={span:6,offset:2}
        :xs={span:24,offset:0}
        >
        <div style="height:80px;">
          <Pagination
            @current-change="pageChange"
            :total="articleNum"
            :page-size="pageSize"
            :current-page="currentPage"
            ></Pagination>
        </div>
      </el-col>
    </el-row>
    <NewArticlePreviewList :articleList="currentPageArticleList"></NewArticlePreviewList>
    <ToTop
      :target="'.write-circle'"
      :bg="'#000'"
      :opacity="opacity"
      :show="showToTop"
      ></ToTop>
  </div>
</template>
<script>
import keys from '@/common'
import SvgIcon from '@/layouts/SvgIcon'
import ToTop from '@/layouts/ToTop'
import NewArticlePreviewList from '@/layouts/NewArticlePreviewList'
import Pagination from '@/layouts/Pagination'
import { setTimeout } from 'timers';
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
      tagOptions: [],
      // 当前页的文章列表
      currentPageArticleList: [],
      // 展示to顶端按钮
      showToTop: false,
      // 按钮透明度
      opacity: 0
    }
  },
  components: {
    NewArticlePreviewList,
    SvgIcon,
    Pagination,
    ToTop
  },
  methods: {
    // 跳转到文章编辑页面
    addArticle() {
      this.$router.push('/articleManage')
    },
    // 根据标签筛选
    tagSearch() {
      if (this.selectValue===null) {
        this.showArticleList = this.articleList
        this.getCurrentArts()
        return
      }
      const target = this.selectValue
      this.showArticleList = this.articleList.filter(item => {
        return item.tags&&item.tags.indexOf(target) !== -1
      })
      this.getCurrentArts()
    },
    // 条件查询筛选文章
    articleFilter() {
      this.isSearching = false
      if (!this.filterValue) {
        this.showArticleList = this.articleList
        this.getCurrentArts()
        return
      }
      this.currentPage = 1
      const Reg = new RegExp(this.filterValue, 'gi')
      this.showArticleList = this.articleList.filter((item) => {
        return Reg.test(item.title) || Reg.test(item.summary)
      })
      this.getCurrentArts()
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
      this.getCurrentArts()
    },
    
    // 页面变化
    pageChange(newPage) {
      this.currentPage = newPage
      // window.scrollTo(0,0)
    },
    // 计算显示的页面
    getCurrentArts() {
      const begin = (this.currentPage-1)*this.pageSize
      const end = this.currentPage*this.pageSize
      this.currentPageArticleList = this.showArticleList.slice(begin, end)
    }
  },
  computed: {
    // currentPageArticleList() {
    //   if (this.showArticleList.length==0) {
    //     return []
    //   }
    //   const begin = (this.currentPage-1)*this.pageSize
    //   const end = this.currentPage*this.pageSize
    //   return this.showArticleList.slice(begin, end)
    // },
    userInfo() {
      return this.$store.state.userInfo
    },
    hasStatus() {
      return this.$store.state.status
    },
    // 总的数据量
    articleNum() {
      return this.showArticleList.length
    },
    // // 当前页显示的文章
    // currentPageArticleList() {
    //   const begin = (this.currentPage-1)*this.pageSize
    //   const end = this.currentPage*this.pageSize
    //   return this.showArticleList.slice(begin, end)
    // },
    isBigScreen() {
      return this.$store.state.isBigScreen
    }
  },
  watch: {
    currentPage(newValue, oldValue) {
      this.getCurrentArts()
    }
  },
  mounted() {
    window.onresize = this.judgeScreen
    // 监听页面高度是否需要显示 回到顶部按钮
    const vuecom = this
    window.addEventListener('scroll', function() {
      if ($('.write-circle').length==0) {
        return
      }
      if (window.pageYOffset > $('.write-circle')[0].offsetTop) {
        vuecom.showToTop = true
        vuecom.opacity = (window.pageYOffset - $('.write-circle')[0].offsetTop) / $('.write-circle')[0].clientHeight
      } else {
        vuecom.showToTop = false
      }
    })
    // 数组原型链新增去重方法unique
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
    var that = this
    // setTimeout(function() {
    that.getUserArticle()
    // }, 2000)
    // this.getUserArticle()
  },
}
</script>
<style lang="less" scoped>
@big-header-height: 80px;
@small-header-height: 60px;
@circle: 80px;
@small-circle: 60px;
@media screen and (min-width: 992px) {
  .header-padding {
    padding-top: 0;
  }
  .banner {
    width: 100vw;
    min-height: 100vh;
    background: url('https://img.xhfkindergarten.cn/desk.jpeg') no-repeat;
    background-size: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    .write-circle {
      width: @circle;
      height: @circle;
      border-radius: @circle/2;
      bottom: -@circle/2;
      margin-left: -@circle/2;
      outline: none;
      transition: transform 0.5s ease-in-out;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #000;;
      position: absolute;
      left: 50%;
    }
    .banner-word {
      max-width: 50vw;
      font-size: 60px;
      font-family: Circular_black;
      color: #FFF;
    }
  }
  #search {
    width: 80%;
  }
}
@media screen and (max-width: 992px) {
  .header-padding {
    padding-top: @small-header-height;
  }
  .banner {
    width: 100vw;
    height: 800px;
    max-height: 60vh;
    background: url('https://img.xhfkindergarten.cn/B60BDCD2-1876-4FD1-B6F2-2F7858C81240.jpeg') no-repeat;

    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    .write-circle {
      width: @small-circle;
      height: @small-circle;
      border-radius: @small-circle/2;
      bottom: -@small-circle/2;
      margin-left: -@small-circle/2;
      outline: none;
      transition: transform 0.5s ease-in-out;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #000;
      position: absolute;
      left: 50%;
    }
    .banner-word {
      max-width: 80vw;
      font-size: 26px;
      font-family: Circular_black;
      color: #FFF;
    }
  }
  #search {
    width: 87%;
  }
}
.visibility {
  visibility: hidden;
}
.form {
  margin: 4rem 0;
  .label {
    font-family: Circular_black;
    font-size: 20px;
    text-align: left;
    margin: 10px 10px;
  }
}

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
  float: right;
  font-size: 15px;
  outline: none;
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
