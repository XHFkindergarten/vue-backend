<template>
  <div>
    <div class="comment-container">
      <div class="avatar">
        <img class="img" :src="status?userInfo.avatar:defaultAvatar" alt="用户头像">
      </div>
      <div class="comment-input">
        <el-input
          v-if="status"
          @focus="beginComment"
          v-model="comment"
          placeholder="请输入宁的评论⑧"
          :show-word-limit="true"
          type="textarea"
          :rows="4"></el-input>
        <div v-else class="nopermission">
          请<router-link to="/login" style="color:#409Eff;text-decoration:none;">登录</router-link>后评论
        </div>
      </div>
    </div>
    <transition name="el-zoom-in-top">
      <el-row v-show="isComment" style="margin: 20px 0;">
        <el-col
          :lg="{span:5,offset:12}"
          :md="{span:5,offset:12}"
          :sm="{span:5,offset:12}"
          :xs="{span:18,offset:3}"
          >
          <el-button @click="submitComment" class="button" type="primary" round>提交</el-button>
        </el-col>
        <el-col
          :lg="{span:5,offset:1}"
          :md="{span:5,offset:1}"
          :sm="{span:5,offset:1}"
          :xs="{span:18,offset:3}"
          >
          <el-button class="button" @click="cancelCommont" round>取消</el-button>
        </el-col>
      </el-row>
    </transition>    
  </div>
</template>
<script>
import keys from '@/common'
export default {
  name: 'CommentInput',
  data() {
    return {
    // 用户的评论
    comment: '',
    // 是否正在评论
    isComment: false,
    // 默认头像
    defaultAvatar: `${keys.host}/upload/avatar/default-avatar.png`
    }
  },
  props: ['id'],
  methods: {
    // 点击评论框
    beginComment() {
      this.isComment = true
    },
    // 取消评论
    cancelCommont() {
      this.isComment = false
      this.comment = ''
    },
    // 提交评论
    async submitComment() {
      if (!this.comment) {
        this.$message({
          type: 'warning',
          message: '请输入评论内容'
        })
        return
      }
      const res = await this.$store.dispatch('addCommentAction', {
        userId: this.userInfo.id,
        articleId: this.id,
        content: this.comment
      }).catch(err => {
        this.$message.error(err)
      })
      if (res.data.success) {
        this.$emit('submitComment')
        this.$message.success('comment success')
        this.comment = ''
        this.isComment = false
      }
    },
  },
  computed: {
    status() {
      return this.$store.state.status
    },
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  mounted() {
    console.log(this.$router)
    console.log(this.$route)
  }
}
</script>
<style lang="less" scoped>
.nopermission{
  min-height: 100px;
  background: #EEE;
  border-radius: 4px;
  text-align: center;
  line-height: 100px;
}
.button{
  margin: 30px 0 0;
  width: 100%;
}
.comment-container{
  width: 100%;
  height: auto;
  display: flex;
  padding-bottom: 40px;
  border-bottom: 1px #d1dede solid;
  .avatar{
    padding: 10px 10px 0;
    width: 40px;
    float: left;
    .img{
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }
  }
  .comment-input{
    flex: 1;
  }
}
</style>
