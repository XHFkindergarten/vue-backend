<template>
  <div class="container">
    <div class="user-container">
      <img id="avatar" :src="comment.from.avatar">
      <div class="user-info">
        <div class="username">{{comment.from.name}}</div>
        <div class="article-info">
          <span>第{{index+1}}楼·{{comment.time}}</span>
        </div>
      </div>
    </div>
    <div class="comment-content">
      {{comment.content}}
    </div>
    
    <div class="reply-container" v-for="item in replyList" :key="item.id">
      <div class="nametime">
        <span>{{item.from.name}}</span>
        <span class="content">{{item.content}}</span>
      </div>
      <div class="time">{{item.time}}</div>
    </div>

    <div class="add-reply-container">
      <div @click="editReply" class="add-reply">
        <SvgIcon size="mini" icon="Edit" style="position:relative;top:4px;"></SvgIcon>
        <span>添加回复</span>
      </div>
    </div>

    <div class="add-reply-container" v-if="isEdit">
      <div class="input-container">
        <input id="reply-input" placeholder="请输入回复内容" v-model="reply" type="text">
        <el-button @click="submitReply" style="background: #409EFF;color:#fff;" circle>ok</el-button>
        <el-button @click="cancelReply" circle>no</el-button>
      </div>
    </div>

  </div>
</template>
<script>
import SvgIcon from '@/layouts/SvgIcon'
export default {
  name: 'CommentItem',
  data() {
    return {
      // 要回复评论的内容
      reply: '',
      // 是否点击了回复
      isEdit: false,
      replyList: this.comment.reply
    }
  },
  mounted() {
  },
  watch: {
    comment: {
      handler(newValue) {
        console.log('change')
      },
      deep: true
    }
  },
  methods: {
    // 点击回复
    editReply() {
      this.isEdit = true
    },
    // 提交回复
    async submitReply() {
      if (!this.reply) {
        this.$message({
          type: 'warning',
          message: '请输入内容'
        })
        return
      }
      const res = await this.$store.dispatch('addReplyAction', {
        userId: this.userInfo.id,
        commentId: this.comment.id,
        articleId: this.comment.articleId,
        content: this.reply
      })
      if (res.data.success) {
        this.$message.success('评论成功')
        this.isEdit = false
        this.$emit('addReply')
        this.reply = ''
        this.getReply()
      }
    },
    // 取消回复
    cancelReply() {
      this.reply = ''
      this.isEdit = !this.isEdit
    },
    // 获取回复列表
    async getReply() {
      const res = await this.$store.dispatch('getReplyAction', this.comment.articleId)
      console.log(res.data.reply)
      this.replyList = res.data.reply.filter((item) => {
        return item.commentId==this.comment.id
      })
      console.log(this.replyList)
    },
    
  },
  components: {
    SvgIcon
  },
  props: ['comment', 'index', 'articleId'],
  computed: {
    //处理发表时间
    // publishTime() {
    //   const time = new Date(this.comment.time)
    //   const minute = time.getMinutes()<10 ? '0'+time.getMinutes() : time.getMinutes()
    //   const res = `${time.getFullYear()}.${time.getMonth()}.${time.getDay()}
    //      ${time.getHours()}:${minute}`
    //   return res
    // },
    // 是否登录
    status() {
      return this.$store.state.status
    },
    // 用户信息
    userInfo() {
      return this.$store.state.userInfo
    }
  }
}
</script>
<style lang="less" scoped>
.reply-container{
  border-left: 3px #969696 solid;
  padding-bottom: 20px;
  .nametime{
    text-align: left;
    padding-left: 20px;
  }
  .time{
    color: #969696;
    font-size: 14px;
    text-align: left;
    padding-left: 20px;
  }
}
.input-container{
  width: 100%;
  text-align: left;
  #reply-input{   
    font-size: 15px;
    outline: none;
    width: 50%;
    background: #EEE;
    border: none;
    height: 30px;
    border-radius: 15px;
    padding: 0 15px;
  }
}

.add-reply-container{
  border-left: 3px #969696 solid;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 5px;
  .add-reply{
    width:100%;
    min-height: 40px;
    text-align: left;
    font-size: 17px;
    cursor: pointer;
    line-height: 40px;
  }
}
.comment-content{
  width: 100%;
  text-align: left;
  font-size: 18px;
  margin: 20px 0;
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
.container{
  margin-bottom: 30px;
}
</style>
