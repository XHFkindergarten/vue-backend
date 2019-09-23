<template>
  <div class="wrapper">
    <div class="info">
      <img @click="toAuthor" :src="dailyInfo.userInfo.avatar" alt="用户头像">
      <div @click="toAuthor" class="userInfo">
        <span class="span1">{{dailyInfo.userInfo.name}}</span>
        <span class="span2">{{time}}</span>
      </div>
      <el-popover
      v-model="openDelete"
      placement="bottom"
      width="20"
      trigger="click">
      <el-popover
        placement="bottom"
        width="160"
        trigger="click"
        v-model="comfirmDelete"
        >
        <p>删除动态无法恢复</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="comfirmDelete=false">取消</el-button>
          <el-button type="primary" size="mini" @click="deleteDaily">确定</el-button>
        </div>
        <div slot="reference" class="delete-container">
          <el-button type="text">删除</el-button>
        </div>
      </el-popover>
      
      <div v-if="isMyDaily" slot="reference" class="down">
        <SvgIcon icon="down" size="mini"></SvgIcon>
      </div>
    </el-popover>
      
    </div>
    <div class="content" v-html="content"></div>
    <div :style="`max-width:500px`">
      <el-row>
        <el-col
          class="col"
          v-for="(src, i) in pics"
          :key="i"
          :span="picWidth">
          <showPic :picSrc="src"></showPic>
        </el-col>
      </el-row>
    </div>
    <div class="itemrow">
      <div @click="like" style="cursor:pointer;">
        <SvgIcon class="icon" :icon="isLiked?'like3-active':'like3'" size="mini"></SvgIcon>
      </div>
      <div @click="comment" style="cursor:pointer;">
        <SvgIcon class="icon" icon="comment1" size="mini"></SvgIcon>
      </div>
    </div>
    
    <div @click="replyTo(item)" class="commentrows" v-for="item in commentList" :key="item.id">
      <strong>{{item.userInfo.name}}</strong> {{item.replyTo?'回复'+item.reply.name:'评论'}}: {{item.content}}
      <el-popover
        placement="bottom"
        width="160"
        trigger="hover"
        >
        <p>确认删除评论吗</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text">取消</el-button>
          <el-button type="primary" size="mini" @click="deleteComment(item.id)">确定</el-button>
        </div>
        <div slot="reference" @click="cancelPropagation" class="deletecomment">×</div>
      </el-popover>
    </div>
    <div v-if="isCommenting" class="commentrow">
      <input id="comment" v-model="commentInput" :placeholder="placeholder" autocomplete="off" type="text">
      <el-button @click="commitComment" type="text">确认</el-button>
      <el-button @click="cancleComment" type="text">取消</el-button>
    </div>
  </div>
</template>
<script>
import SvgIcon from '@/layouts/SvgIcon'
import keys from '@/common'
import showPic from '@/components/showPic'
export default {
  data() {
    return {
      // 打开删除弹框
      openDelete: false,
      // 确认删除弹框
      comfirmDelete: false,
      isLiked: false,
      // 是否正在评论
      isCommenting: false,
      // 评论内容
      commentInput: "",
      // 评论列表
      commentList: [],
      // placeholder
      placeholder: '请输入回复内容',
      isReplyTo: ''
    }
  },
  methods: {
    async deleteComment(id) {
      const res = await this.$axios.get(`${keys.host}/daily/deleteComment?id=${id}`)
      console.log(res)
      var that = this
      setTimeout(() => {
        that.getComment()
      },1000)
    },
    cancelPropagation(e) {
      e.stopPropagation()
    },
    // 回复别人的评论
    replyTo(item) {
      this.placeholder = '回复'+item.userInfo.name
      this.isReplyTo = item.userId
      this.isCommenting = true
    },
    // 获取这条评论的所有评论
    async getComment() {
      const res = await this.$axios.get(`${keys.host}/daily/getComment?id=${this.dailyInfo.id}`)
      if (res.data.success) {
        console.log(res.data.comments)
        this.commentList = res.data.comments
      } else {
        this.commentList = []
      }
    },
    // 发表评论
    commitComment() {
      if (!this.commentInput) return
      const userId = this.$store.state.userInfo.id
      const res = this.$axios.post('daily/comment', {
        content: this.commentInput,
        dailyId: this.dailyInfo.id,
        userId,
        replyTo: this.isReplyTo
      }).then(res => {
        if (res.data.success) {
          setTimeout(() => {
            this.getComment()
          },1000)
        }
      })
      this.commentInput = ""
      this.cancleComment()
    },
    // 取消评论
    cancleComment() {
      this.isCommenting = false
      this.placeholder = "请输入回复内容"
      this.isReplyTo = ''
    },
    // 点击评论
    comment() {
      if (!this.$store.state.status) return
      this.isCommenting = !this.isCommenting
      this.placeholder = "请输入回复内容"
      this.isReplyTo = ''
    },  
    // 点击喜欢
    like() {
      if (!this.$store.state.status) return
      this.isLiked = !this.isLiked
    },
    // 跳转作者页面
    toAuthor() {
      this.$router.push({ path: 'Person', query: {id: this.dailyInfo.userId}})
    },
    // 删除动态
    async deleteDaily() {
      const res = await this.$axios.get(`${keys.host}/daily/deleteOne?id=${this.dailyInfo.id}`)
      if (res.data.success) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.$emit('deleteOne')
        this.comfirmDelete = false
        this.openDelete = false
      }
    },
    // 调整自适应正方形的高度=宽度
    adjustSquare() {
      $('.el-col-8').height($('.el-col-8').width())
      $('.el-col-12').height($('.el-col-12').width())
      $('.el-col-20').height($('.el-col-20').width())
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.adjustSquare()
    })
    this.getComment()
  },
  components: {
    showPic,
    SvgIcon
  },
  props: [
    'dailyInfo'
  ],
  computed: {
    isMyDaily() {
      return this.dailyInfo.userId === this.$store.state.userInfo.id
    },
    time() {
      if (this.dailyInfo) {
        const date = new Date(this.dailyInfo.createdAt)
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()}`
      } else {
        return ''
      }
    },
    content() {
      const reg = new RegExp("\n", "g")
      return this.dailyInfo.content.replace(reg, "<br/>")
    },
    pics() {
      if (this.dailyInfo && this.dailyInfo.pics) {
        return this.dailyInfo.pics.split(keys.tagGap)
      } else {
        return []
      }
    },
    picWidth() {
      const length = this.pics.length
      if (length === 1) {
        return 20
      } else if (length>1&&length<5) {
        return 12
      } else {
        return 8
      }
    }
  }
}
</script>
<style lang="less" scoped>
.commentrows {
  margin: 3px 0;
  font-size: 12px;
  text-align: left;
  padding: 0 20px 0 10px;
  position: relative;
  .deletecomment {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -6px;
  }
}
.commentrow {
  margin: 10px 0;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  .el-button {
    margin: 0 5px;
    padding: 0;
  }
  #comment {
    flex: 1;
    @commentInputHeight: 30px;
    width: 100%;
    height: @commentInputHeight;
    border-radius: @commentInputHeight/2;
    border: 1px solid #EEE;
    outline: none;
    padding: 0 15px;
  }
}
.itemrow {
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .icon {
    margin: 0 10px;
  }
}
.delete-container{
  width: 100%;
  display: flex;
  justify-content: center;
}
.wrapper{
  padding-bottom: 10px;
}
.content{
  text-align: left;
  margin: 15px 0;
}
.info{
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  .down{
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 10px;
    outline: none;
  }
  img{
    cursor: pointer;
    height: 40px;
    width: 40px;
    border-radius: 20px;
  }
  .userInfo{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: left;
    margin-left: 5px;
    span{
      text-align: left;
    }
    .span1{
      font-size: 14px;
      font-weight: bold;
      text-align: left;
    }
    .span2{
      font-size: 12px;
      color: #969696;
    }
  }
}
</style>
