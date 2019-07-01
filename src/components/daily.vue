<template>
  <div>
    <el-row>
      <el-col
        :lg={span:6,offset:2}
        :md={span:7,offset:1}
        :sm={span:8}
        :xs={span:20,offset:2}
        >
        <h1 style="margin-top:40px;">write daily</h1>
        <div class="create-container">
          <div @click="toggleInput" :class="isEditing?'input':'noinput'">
            <SvgIcon v-if="!isEditing" icon="edit1"></SvgIcon>
            <div v-else class="edit-container">
              <div class="userinfo">
                <img v-if="showInput" :src="userInfo.avatar" alt="">
                <span v-if="showInput" style="margin-left:5px;">{{userInfo.username}}</span>
              </div>
              <textarea
                v-model="content"
                :class="isEditing?'show':'hide'"
                placeholder="say something"
                rows="5"></textarea>
              <div style="width:80%;">
                <el-row>
                  <el-col
                    v-for="(src, i) in pic" :key="i"
                    class="col"
                    :span="8"
                    >
                    <div @click="removePic(i)" class="remove">
                      <SvgIcon icon="delete" size="mini"></SvgIcon>
                    </div>
                    <showPic :picSrc="src"></showPic>
                  </el-col>
                  <el-col :span="8" class="col">
                    <div v-if="showInput" class="add-pic">
                      <div class="inside">
                        <el-upload
                          ref="upload"
                          :action="qiniuUrl"
                          :on-success="handleSuccess"
                          :on-error="handleError"
                          :file-list="fileList"
                          :show-file-list="false"
                          :before-upload="beforeUpload"
                          :data="qiniuData"
                          list-type="picture"
                          >
                          <SvgIcon icon="addgray"></SvgIcon>
                        </el-upload>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="btn-container">
                <el-button @click.stop="submit" style="margin-right:10px;" type="text">确认</el-button>
                <el-button @click.stop="cancelEdit" style="margin-right:20px;" type="text">取消</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :lg={span:10,offset:2}
        :md={span:10,offset:2}
        :sm={span:10,offset:2}
        :xs={span:20,offset:2}
        >
        <div style="margin-top:30px;font-weight:bolder;font-size:30px;text-align:left;">Daily list</div>
        <div class="toggle-container">
          <button @click="showAll=true" :class="['button1',showAll?'active-btn':'inactive-btn',{'button2':!hasLogin}]">All</button>
          <button v-if="hasLogin" @click="showAll=false" :class="['button2',showAll?'inactive-btn':'active-btn']">myDaily</button>
        </div>
        <el-timeline>
          <el-timeline-item v-for="item in pastDaily" :key="item.id">
            <el-card>
              <DailyItem @deleteOne="deleteOne" :dailyInfo="item"></DailyItem>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <!-- <div v-if="loadMoreDisable" class="loading">lzk is trying...</div>
        <div v-if="toEnd" class="loading">没有惹⁽⁽◞(0ᴗ̵̍0=͟͟͞͞ 0ᴗ̍0)◟⁾⁾</div> -->
        <infiniteLoading ref="infinite" direction="bottom" :distance="0" @infinite="infiniteHandler">
          <div class="loading" slot="no-more">mo有了哦⁽⁽◞(0ᴗ̵̍0=͟͟͞͞ 0ᴗ̍0)◟⁾⁾</div>
        </infiniteLoading>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import http from '@/http'
import SvgIcon from '@/layouts/SvgIcon'
import showPic from '@/components/showPic'
import DailyItem from '@/layouts/DailyItem'
import keys from '@/common'
import infiniteLoading from 'vue-infinite-loading'
// import exif from '@/exif'
export default {
  data() {
    return {
      isEditing: false,
      content: '',
      pic: [],
      showInput: false,
      // 上传列表
      fileList: [],
      // 七牛云token
      qiniuToken: '',
      // 七牛云url
      qiniuUrl: 'https://up-z2.qiniup.com',
      // 配合上传的参数
      qiniuData: {
        token: '',
        key: ''
      },
      // 读取的daily
      pastDaily: [],
      // 正在加载动态
      isLoading: false,
      // 当前加载的动态index
      index: 0,
      loadMoreDisable: false,
      toEnd: false,
      // 是在看所有人的动态吗
      showAll: true
    }
  },
  components: {
    SvgIcon,
    showPic,
    DailyItem,
    infiniteLoading
  },
  watch: {
    showAll(newValue, oldValue) {
      this.index = 0
      this.pastDaily = []
      // this.getDaily()
      this.$refs.infinite.$emit('$InfiniteLoading:reset')
    },
    isEditing(newValue) {
      if (newValue) {
        this.showInput = true
      } else {
        this.showInput = false
      }
    }
  },
  methods: {
    async infiniteHandler($state) {
      // console.log(this.$refs.infinite)
      // if (this.loadMoreDisable) {
      //   console.log('no')
      //   return
      // }
      // this.loadMoreDisable = true
      const offset = this.index || 0
      let res
      if (this.showAll) {
        res = await this.$axios.get(`${keys.host}/daily/getAll?offset=${offset}`)
      } else {
        // 只请求一个人的
        const userId = this.$store.state.userInfo.id
        res = await this.$axios.get(`${keys.host}/daily/getAll?offset=${offset}&userId=${userId}`)
      }
      if (res.data.success) {
        if (this.index === 0) {
          this.pastDaily = res.data.daily
        } else {
          this.pastDaily = this.pastDaily.concat(res.data.daily)
        }
        this.index++
        $state.loaded()
        
        // this.$nextTick(() => {
        //   this.loadMoreDisable = false
        // })
      } else {
        this.toEnd = true
        $state.complete()
      }
    },
    // 删除动态后重新获取
    deleteOne() {
      this.index = 0
      this.getDaily()
    },
    // 处理滑动事件
    handleScroll(){
      if (this.loadMoreDisable || this.toEnd) {
        return
      }
      if (window.screen.height + document.documentElement.scrollTop + 20 >= document.body.clientHeight) {
        this.loadMore()
      }
    },
    handleScroll1(){
      if (this.loadMoreDisable || this.toEnd) {
        return
      }
      console.log('touchmove')
      if (window.screen.height + document.documentElement.scrollTop + 20 >= document.body.clientHeight) {
        this.loadMore()
      }
    },
    // 加载更多
    loadMore() {
      console.log('loadmore')
      this.loadMoreDisable = true
      setTimeout(() => {
        this.getDaily()
      }, 500)
    },
    // 读取所有动态
    async getDaily() {
      const offset = this.index || 0
      this.loadMoreDisable = true
      let res
      if (this.showAll) {
        res = await this.$axios.get(`${keys.host}/daily/getAll?offset=${offset}`)
      } else {
        // 只请求一个人的
        const userId = this.$store.state.userInfo.id
        res = await this.$axios.get(`${keys.host}/daily/getAll?offset=${offset}&userId=${userId}`)
      }
      if (res.data.success) {
        if (this.index === 0) {
          this.pastDaily = res.data.daily
        } else {
          this.pastDaily = this.pastDaily.concat(res.data.daily)
        }
        this.index++
      } else {
        this.toEnd = true
      }
      this.$nextTick(() => {
        this.loadMoreDisable = false
      })
    },
    // 提交动态
    async submit() {
      if (!this.content) {
        this.$message({
          type: 'info',
          message: '请输入内容'
        })
        return
      }
      const params = {
        userId: this.userInfo.id,
        content: this.content,
        pics: this.pic.join(keys.tagGap)
      }
      const res = await this.addDaily(params)
    },
    // 请求接口
    async addDaily(params) {
      const res = await this.$axios.post(`${keys.host}/daily/addDaily`, params)
      if (res.data.success) {
        this.$message({
          type: 'success',
          message: '发表成功',
          duration: 1000
        })
        this.cancelEdit()
        this.index = 0
        this.$refs.infinite.$emit('$InfiniteLoading:reset')
        // this.getDaily()
      }
    },
    // 取消编辑
    cancelEdit() {
      this.content = ''
      this.pic = []
      this.isEditing = false
    },
    // 删除图片
    removePic(i) {
      this.pic.splice(i, 1)
    },
    // 上传成功处理
    handleSuccess(res, file) {
      const picUrl = `https://img.xhfkindergarten.cn/${res.key}`
      this.pic.push(picUrl)
      this.$nextTick(() => {
        this.adjustSquare()
      })
    },
    // 上传失败处理
    handleError(res) {
      this.$message({
        type: 'wrong',
        message: res
      })
    },
    // 上传之前,处理上传参数
    beforeUpload(file) {
      if (file.type!='image/jpeg'&&file.type!='image/png'&&file.type!='image/jpg') {
        this.$message({
          type: 'info',
          message: '请上传图片'
        })
        return false
      }
      const time = new Date()
      this.qiniuData.key = `${file.name}${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()}/${time.getHours()}/${time.getMinutes()}${time.getSeconds()}`
      this.qiniuData.token = this.qiniuToken
    },
    toggleInput() {
      if (!this.$store.state.status) {
        this.$message({
          type: 'info',
          message: '请登录后再试...'
        })
        return
      }
      if (!this.isEditing) {
        this.isEditing = true
        setTimeout(() => {
          this.adjustSquare()
        }, 200);
      }
    },
    // 调整自适应正方形的高度=宽度
    adjustSquare() {
      $('.el-col-8').height($('.el-col-8').width())
      $('.el-col-12').height($('.el-col-12').width())
      $('.el-col-20').height($('.el-col-20').width())
    }
  },
  computed: {
    hasLogin() {
      return this.$store.state.status
    },
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  mounted() {
    http.getQnToken().then(res => {
      this.qiniuToken = res
    })
    if (this.hasLogin) {
      this.showAll = false
    }
    // this.getDaily()
    // window.addEventListener('scroll', this.handleScroll)
    // window.addEventListener('touchmove', this.handleScroll1)
  }
}
</script>
<style lang="less" scoped>
.toggle-container{
  margin: 20px 0;
  display: flex;
  justify-content: center;
  .active-btn{
    background: #409EFF;
    color: #FFF;
  }
  .inactive-btn{
    background: #FFF;
    color: #000;
  }
  button{
    height: 30px;
    width: 80px;
    outline: none;
    cursor: pointer;
    font-size: 14px;
    border: 1px solid #409EFF;
  }
  .button1 {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    border-right: none;
  }
  .button2 {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    border-left: none;
  }
}
.loading{
  font-size: 14px;
  color: #888;
}
ul{
  list-style-type: none;
  padding: 0;
}
h1{
  text-align: left;
}
.title{
  font-size: 40px;
  margin: 30px 0;
  font-weight: bolder;
  text-align: left;
}
// div{
//   transition: all 0.5s ease-in-out;
// }
.col{
  position: relative;
}
.remove{
  position: absolute;
  right: 0px;
  top: 0px;
}
.add-pic{
  height: 100%;
  display: flex;
  justify-content: center;
  // align-items: center;
  .inside{
    width: 90%;
    height: 90%;
    border: 2px solid #bfbfbf;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.edit-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .btn-container{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .userinfo{
    width: 80%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img{
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  textarea{
    margin: 10px 0;
    transition: all 0.5s ease-in-out;
  }
  .hide{
    width: 0;
    font-size: 16px;
    border: none;
    background: #F4F4F4;
    outline: none;
    overflow: auto;
    word-break: break-all;
  }
  .show{
    width: 80%;
    font-size: 16px;
    border: none;
    background: #F4F4F4;
    outline: none;
    overflow: auto;
    word-break: break-all;
  }
}
.create-container{
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .noinput{
    transition: all 0.2s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 100px;
    background: #F4F4F4;
    border-radius: 25px;
  }
  .input{
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: auto;
    width: 100%;
    background: #F4F4F4;
    border-radius: 30px;
    padding: 20px 0;
  }
}
</style>
