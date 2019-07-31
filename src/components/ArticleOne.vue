<template>
  <div class="header-padding between-padding" v-loading="isLoading">
    <el-row>
      <el-col
        class="bg-white round"
        :lg={span:12,offset:6}
        :md={span:10,offset:7}
        :sm={span:12,offset:6}
        :xs={span:24}
        >
        <div v-if="isBigScreen" class="aside">
          <div class="square">
            <div class="circle">
              <SvgIcon v-if="!hasLike" @click.native="likeArticle" class="icon" size="mini" icon="like3"></SvgIcon>
              <SvgIcon v-else @click.native="dislikeArticle" class="icon" size="mini" icon="like3-active"></SvgIcon>
              <div class="side-num">{{article.likeNum}}</div>
            </div>
          </div>
          <div class="square">
            <div class="circle">
              <SvgIcon class="icon" size="mini" icon="Comment"></SvgIcon>
              <div class="side-num">{{article.commentNum}}</div>
            </div>
          </div>
          <div class="square">
            <div class="circle">
              <SvgIcon class="icon" size="mini" icon="eyes"></SvgIcon>
              <div class="side-num">{{article.viewTime}}</div>
            </div>
          </div>
        </div>
        <div class="padding-aside" style="padding-top:0;padding-bottom:0;">
          <p class="title">{{article.title}}</p>
          <div class="user-container" @click="toAuthor">
            <img id="avatar" :src="article.userInfo.avatar">
            <div class="user-info">
              <div class="username">{{article.userInfo.name}}</div>
              <div class="article-info">
                <span>{{article.updatedAt}}</span>
              </div>
            </div>
          </div>
          <div style="text-align:left;margin:20px 0 100px;" class="markdown-body" v-highlight v-html="html"></div>
          <div v-if="!isBigScreen" class="bottom-info">
            <div class="circle">
              <SvgIcon v-if="!hasLike" @click.native="likeArticle" class="icon" size="mini" icon="like3"></SvgIcon>
              <SvgIcon v-else @click.native="dislikeArticle" class="icon" size="mini" icon="like3-active"></SvgIcon>
              <div class="side-num">{{article.likeNum}}</div>
            </div>
            <div class="circle">
              <SvgIcon class="icon" size="mini" icon="Comment"></SvgIcon>
              <div class="side-num">{{article.commentNum}}</div>
            </div>
            <div class="circle">
              <SvgIcon class="icon" size="mini" icon="eyes"></SvgIcon>
              <div class="side-num">{{article.viewTime}}</div>
            </div>
          </div>
          <CommentInput
            @submitComment="submitComment"
            :id="id"></CommentInput>
          <div v-if="hasData" class="comments-container">
            <div class="title">评论({{commentList.length+replyList.length}})</div>
            <CommentItem @deleteComment="refreshComment" @addReply="addReplySuccess" v-for="(item,index) in commentList" :key="item.id" :index="index" :comment="item"></CommentItem>
          </div>
        </div>
        
      </el-col>
    </el-row>
    <el-row class="recommend-container">
      <el-col
        class="bg-white round"
        :lg={span:12,offset:6}
        :md={span:10,offset:7}
        :sm={span:12,offset:6}
        :xs={span:24}>
        <div class="padding-aside" style="padding-top:30px;padding-bottom:30px;">
          <Recommend ref="recommend" :id="id" :tagstring="article.tags"></Recommend>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import CommentItem from '@/layouts/CommentItem'
import CommentInput from '@/layouts/CommentInput'
import Recommend from '@/components/recommend'
import SvgIcon from '@/layouts/SvgIcon'
import marked from 'marked'
export default {
  name: 'ArticleOne',
  data() {
    return {
      // 当前文章信息
      article: {
        userInfo: {
          avatar:''
        }
      },
      // 是否给文章点过赞
      hasLike: false,
      
      // 这篇文章的评论列表
      commentList: [],
      // 这篇文章的回复列表
      replyList: [],
      // 是否已经获得了数据
      hasData: false,
      // 显示的html
      html: '',
      // 显示加载ing
      isLoading: false,
    }
  },
  computed: {
    // 是否登录
    status() {
      return this.$store.state.status
    },
    userInfo() {
      return this.$store.state.userInfo
    },
    isBigScreen() {
      return this.$store.state.isBigScreen
    },
    paddingAside() {
      if (this.isBigScreen) {
        return 50
      } else {
        return 0
      }
    }
  },
  components: {
    SvgIcon,
    CommentInput,
    CommentItem,
    Recommend
  },
  props: [
    'id'
  ],
  watch: {
    async $route(to, from) {
      await this.initPage()
      this.$refs.recommend.resetLoader()
    }
  },
  methods: {
    // 重新刷新评论列表
    refreshComment() {
      this.getComment()
    },
    // 跳转作者页面
    toAuthor() {
      this.$router.push({ path: 'Person', query: {id: this.article.userInfo.id}})
    },
    async getArticle() {
      const res = await this.$store.dispatch('getOneArticleAction', this.id)
      this.article = res.data.article
      this.html = marked(this.article.content)
      const time = new Date(this.article.updatedAt)
      const minute = time.getMinutes()<10 ? '0'+time.getMinutes() : time.getMinutes()
      this.article.updatedAt = 
        `${time.getFullYear()}.${time.getUTCMonth()+1}.${time.getDate()}
         ${time.getHours()}:${minute}`
    },
    // 点击喜欢文章
    async likeArticle() {
      if (!this.status) {
        this.$message({
          type: 'warning',
          message: '请登录后点👍'
        })
        return
      }
      const res = await this.$store.dispatch('likeArticleAction', {
        userId: this.userInfo.id,
        articleId: this.article.id
      })
      if (res.data.success) {
        this.hasLike = true
        this.getArticle()
      }
    },
    // 获取喜欢这篇文章的所有用户id
    async getLikeList() {
      const res = await this.$store.dispatch('likeListAction', this.article.id)
      const likeList = res.data.likeList
      if (this.status && likeList.indexOf(this.userInfo.id)>=0) {
        this.hasLike = true
      } else {
        this.hasLike = false
      }
    },
    // 不喜欢这篇文章
    async dislikeArticle() {
      const res = await this.$store.dispatch('dislikeArticleAction', {
        articleId: this.id,
        userId: this.userInfo.id
      }).catch(err => {
        throw new Error(err)
      })
      if (res.data.success) {
        this.hasLike = false
        this.getArticle()
      } 
    },
    // 获取文章评论
    async getComment() {
      const res = await this.$store.dispatch('getCommentAction', this.id)
        .catch(err => {
          this.$message.error(err)
        })
      this.commentList = res.data.comment
    },
    // 提交评论成功
    submitComment() {
      this.getComment()
      this.getArticle()
    },
    // 获取回复列表
    async getReply() {
      const res = await this.$store.dispatch('getReplyAction', this.id)
      this.replyList = res.data.reply
    },
    // 洗数据,将评论和回复组合起来
    formatData() {
      this.commentList.forEach(comment => {
        comment.reply = []
      })
      this.replyList.forEach(reply => {
        this.commentList.forEach(comment => {
          if (reply.commentId == comment.id) {
            comment.reply.push(reply)
          }
        })
      })
      this.hasData = true
    },
    // 发起回复成功
    addReplySuccess() {
      this.getArticle().then(res => {
        this.getReply().then(res => {
          this.formatData()
        })
      })
      // const res = await 
      // this.formatData()
    },
    // 通知后端查看次数+1
    async viewArticle() {
      const res = await this.$store.dispatch('viewArticleAction', this.id)
    },
    async initPage() {
      this.isLoading = true
      await this.getArticle()
      await this.getLikeList()
      await this.getComment()
      await this.getReply()
      await this.viewArticle()
      this.formatData()
      this.isLoading = false
    }
  },
  // 获取文章内所有的回复
  async mounted() {
    // this.judgeScreen()
    this.initPage()
  },
}
</script>
<style lang="less" scoped>
@import 'element-ui/lib/theme-chalk/base.css';
@import 'element-ui/lib/theme-chalk/display.css';
@import 'https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css';
@circle: 40px;
@big-header-height: 80px;
@small-header-height: 60px;
@media screen and (min-width: 992px) {
  .padding-aside {
    padding: 0 50px;
  }
  .header-padding {
    padding-top: @big-header-height+40px;
  }
  .bottom-info {
    margin: 2rem -50px;
  }
  .recommend-container {
    margin-top: 40px;
  }
}
@media screen and (max-width: 992px) {
  .padding-aside {
    padding: 0;
  }
  .header-padding {
    padding-top: @big-header-height;
  }
  .bottom-info {
    margin: 2rem -20px;
  }
  .recommend-container {
    margin-top: 0;
  }
}
.between-padding {
  padding-left: 20px;
  padding-right: 20px;
}
.aside{
  cursor: pointer;
  z-index:10;
  height: @circle*4;
  width: @circle;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: fixed;
  margin-left: -7rem;
  top: 16rem;
  // border: 1px #d1dede solid;
  // border-radius: 6px;
  .square{
    height: @circle;
    width: @circle;
    .circle{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #FFF;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.04);
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .side-num{
        position: absolute;
        left: 75%;
        line-height: 1;
        top: 0;
        background: #b2bac2;
        transform-origin: left top;
        font-size: 1rem;
        transform: scale(0.75);
        border-radius: .7rem;
        color: #FFF;
        padding: .1rem .4rem;
      }
    }
  }
}
.round{
  border-radius: 6px;
}
.bg-gray {
  background: #F4F5F5;
}
.bg-white {
  background: #FFF;
}
.comments-container{
  .title{
    font-size: 26px;
    font-weight: bold;
  }
}
.bottom-info {
  height: 5rem;
  background: #F4F5F5;
  // margin: 2rem 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .circle{
      width: @circle;
      height: @circle;
      border-radius: 50%;
      background: #FFF;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.04);
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .side-num{
        position: absolute;
        left: 75%;
        line-height: 1;
        top: 0;
        background: #b2bac2;
        transform-origin: left top;
        font-size: 1rem;
        transform: scale(0.75);
        border-radius: .7rem;
        color: #FFF;
        padding: .1rem .4rem;
      }
    }
}

.title{
  text-align: left;
  font-size: 30px;
  font-weight: bolder;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  margin: 30px 0;
}
.user-container{
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  #avatar{
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-right: 15px;
  }
  .user-info{
    height: 100%;
    .username{
      height: 50%;
      color: #1f2b40;
      font-size: 14px;
      line-height: 30px;
      font-weight: bold;
      text-align: left;
    }
    .article-info{
      color: #969696;
      text-align: left;
      height: 50%;
      font-size: 14px;
      line-height: 30px;
    }
  }
}

</style>
