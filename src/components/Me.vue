<template>
  <div class="header-padding">
    <!-- <div class="img-container">
      <img class="avatar-bg" :src="userInfo.avatar" alt="用户头像">
      <img @click="editAvatar" class="avatar-img" :src="userInfo.avatar" alt="用户头像">
      <div @click="editusername" class="username">{{userInfo.username}}</div>
      <el-popover
        v-model="editMoodDialog"
        placement="bottom"
        width="300"
        trigger="click">
        <p style="padding-left: 12px;">选择你的心情：）</p>
        <div class="mood-select-container">
          <el-radio-group v-model="mood">
            <el-radio-button label="0">
              <SvgIcon size="mid" icon="smile"></SvgIcon>
            </el-radio-button>
            <el-radio-button label="1">
              <SvgIcon size="mid" icon="meh"></SvgIcon>
            </el-radio-button>
            <el-radio-button label="2">
              <SvgIcon size="mid" icon="frown"></SvgIcon>
            </el-radio-button>
          </el-radio-group>
        </div>
        <p style="padding-left: 12px">一个词描述你</p>
        <div style="text-align:center;">
          <el-input v-model="sign" placeholder="请控制在12个字母以内" type="text" style="width: 216px;"></el-input>
        </div> 
        <div style="text-align:center;margin: 25px 0 0;">
          <el-button @click="submitMood" type="primary" round>提交</el-button>
        </div>
        <div slot="reference" class="status-container">
          <SvgIcon :icon="moodOption[this.mood]" size="mid" style="margin:0 5px 0 10px;"></SvgIcon>
          <div style="display:inline-block">{{userInfo.sign}}</div>
        </div>
      </el-popover>
      <Pagination
        id="target"
        class="pagination"
        @current-change="pageChange"
        :total="articleNum"
        :page-size="pageSize"
        :current-page="currentPage"
        ></Pagination>
    </div>
    <NewArticlePreviewList :articleList="showArticleList"></NewArticlePreviewList>
    <el-dialog
      :width="isBigScreen?'700px':'80%'"
      :center="false"
      :visible.sync="editAvatarDialog"
      title="修改头像">
      <EditAvatar @editavatarsuccess="editAvatarSuccess" :avatarUrl="userInfo.avatar"></EditAvatar>
    </el-dialog>
    <ToTop
      :target="'#target'"
      :bg="'#000'"
      :opacity="opacity"
      :show="showToTop"
      ></ToTop> -->


    <el-row
      style="margin-top:50px;">
      <el-col
        :lg={span:5,offset:5}
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
            <div class="avatar-container" @click="editAvatar">
              <img  v-loading="loadingBtn" style="width:100%;height:100%;" :src="userInfo.avatar" alt="头像">
              <div class="avatar-edit">
                <i class="el-icon-edit">Edit</i>
              </div>
            </div>
          </el-col>
          <el-col
            :lg={span:24}
            :md={span:24}
            :sm={span:24}
            :xs={span:24}
            >
            <el-popover
              v-model="editMoodDialog"
              placement="bottom"
              width="300"
              trigger="click">
              <p style="padding-left: 12px;">选择你的心情：）</p>
              <div class="mood-select-container">
                <el-radio-group v-model="mood">
                  <el-radio-button label="0">
                    <SvgIcon size="mid" icon="smile"></SvgIcon>
                  </el-radio-button>
                  <el-radio-button label="1">
                    <SvgIcon size="mid" icon="meh"></SvgIcon>
                  </el-radio-button>
                  <el-radio-button label="2">
                    <SvgIcon size="mid" icon="frown"></SvgIcon>
                  </el-radio-button>
                </el-radio-group>
              </div>
              <p style="padding-left: 12px">一个词描述你</p>
              <div style="text-align:center;">
                <el-input v-model="sign" placeholder="请控制在12个字母以内" type="text" style="width: 216px;"></el-input>
              </div> 
              <div style="text-align:center;margin: 25px 0 0;">
                <el-button @click="submitMood" type="primary" round>提交</el-button>
              </div>
              <div slot="reference" class="status-container">
                <SvgIcon :icon="moodOption[this.mood]" size="mid" style="margin:0 5px 0 10px;"></SvgIcon>
                <div style="display:inline-block">{{userInfo.sign}}</div>
                <SvgIcon class="edit-icon" icon="edit" size="mid"></SvgIcon>
              </div>
            </el-popover>
            
            <div class="username-container">
              <el-row v-if="isEditName" style="margin-top:15px;">
                <el-col :span="17">
                  <el-input @blur="abandonEditName" v-model="editUsername" />
                </el-col>
                <el-col :span="6" :offset="1">
                  <el-button type="success" @click="updateUserName" icon="el-icon-check" circle></el-button>
                </el-col>
              </el-row>
              
              <p v-else @click="editusername" id="username">{{userInfo.username}}<i class="el-icon-edit username-icon"></i></p>
              <p id="email">{{userInfo.email}}</p>
            </div>
          </el-col>
        </el-row>
        
        
        <el-dialog
          :width="isBigScreen?'700px':'80%'"
          :center="false"
          :visible.sync="editAvatarDialog"
          title="修改头像">
          <EditAvatar @editavatarsuccess="editAvatarSuccess" :avatarUrl="userInfo.avatar"></EditAvatar>
        </el-dialog>
        
      </el-col>
      <el-col
        :lg={span:8,offset:1}
        :md={span:12,offset:6}
        :sm={span:14,offset:5}
        :xs={span:20,offset:2}
        >
        <div class="big-title">Articles</div>
        <div class="hr"></div>
        <ArticlePreviewList
          v-loading="isLoading"
          :articleList="showArticleList"></ArticlePreviewList>
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
          style="margin-bottom:60px;overflow:auto;"
          >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import keys from '@/common'
import ArticlePreviewList from '@/layouts/ArticlePreviewList'
import SvgIcon from '@/layouts/SvgIcon'
import EditAvatar from '@/components/editAvatar'
import Pagination from '@/layouts/Pagination'
import ToTop from '@/layouts/ToTop'
export default {
  name: 'me',
  data() {
    return {
      editDialog: false,
      isEditName: false,
      editUsername: '',
      editAvatarDialog: false,
      moodOption: {
        0: 'smile',
        1: 'meh',
        2: 'frown'
      },
      sign: '',
      mood: '',
      loadingBtn: false,
      editMoodDialog: false,
      // 个人文章列表
      articleList: [],
      // 加载文章时显示loading
      isLoading: false,
      // 每页显示条数
      pageSize: 5,
      // 当前页
      currentPage: 1,
      // 展示出来的文章列表
      showArticleList: [],
      // 展示to顶端按钮
      showToTop: false,
      // 按钮透明度
      opacity: 0
    }
  },
  components: {
    ArticlePreviewList,
    EditAvatar,
    SvgIcon,
    Pagination,
    ToTop
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    isBigScreen() {
      return this.$store.state.isBigScreen
    },
    articleNum() {
      return this.articleList.length
    }
  },  
  watch: {
    currentPage(newValue, oldValue) {
      this.getCurrentArts()
    }
  },
  mounted() {
    // 监听页面高度是否需要显示 回到顶部按钮
    // const vuecom = this
    // window.addEventListener('scroll', function() {
    //   if (window.pageYOffset > $('#target')[0].offsetTop) {
    //     vuecom.showToTop = true
    //     vuecom.opacity = (window.pageYOffset - $('#target')[0].offsetTop) / $('#target')[0].clientHeight
    //   } else {
    //     vuecom.showToTop = false
    //   }
    // })
    // this.judgeScreen()
    this.mood = this.userInfo.mood
    this.sign = this.userInfo.sign
    this.getUserArticle()
  },
  methods: {
    // 计算显示的页面
    getCurrentArts() {
      const begin = (this.currentPage-1)*this.pageSize
      const end = this.currentPage*this.pageSize
      this.showArticleList = this.articleList.slice(begin, end)
    },
    // 页码改变
    pageChange(newPage) {
      this.currentPage = newPage
      // window.scrollTo(0,0)
    },
    // judgeScreen() {
    //   if (window.innerWidth<800) {
    //     this.isBigScreen = false
    //   } else {
    //     this.isBigScreen = true
    //   }
    // },
    editusername() {
      this.isEditName = true
      this.editUsername = this.userInfo.username
    },
    abandonEditName() {
      // this.isEditName = false
      // this.editUsername = ''
    },
    editAvatar() {
      this.editAvatarDialog = true
    },
    editAvatarSuccess() {
      this.$store.dispatch('currentAction')
        .then(res=> {
          this.$store.commit('setUserInfo', res.data)
        })
      this.editAvatarDialog = false
    },
    submitMood() {
      this.loadingBtn = true
      if (['0','1','2'].indexOf(this.mood)>=0 && this.sign.length<=12) {
        const res = this.$store.dispatch('updateUserInfo', {
          mood: this.mood,
          sign: this.sign,
          id: this.userInfo.id
        })
          .then(res => {
            if (res.data.success) {
              this.loadingBtn = false
              this.editMoodDialog = false
              this.$store.dispatch('currentAction')
                .then(res => {
                  this.$store.commit('setUserInfo', res.data)
                  this.$message({
                    type: 'success',
                    message: '修改成功'
                  })
                })
            }
          })
          .catch(err => {
            this.$message.error(err)
          })
      } else {
        this.$message.error('请输入正确的信息')
      }
    },
    // 更新用户名
    async updateUserName() {
      if (this.editUsername) {
        const res = await this.$store.dispatch('updateUserInfo', {
          id: this.userInfo.id,
          name: this.editUsername
        })
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '更改成功'
          })
          this.isEditName = false
          const userinfo = await this.$store.dispatch('currentAction')
          this.$store.commit('setUserInfo', userinfo.data)
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请输入用户名'
        })
      }
    },
    // 根据用户id请求用户的所有文章
    async getUserArticle() {
      this.isLoading = true
      const res = await this.$store.dispatch('getArticleList', {
        userId: this.userInfo.id
      })
      this.isLoading = false
      this.articleList = res.data.article
      this.articleList.forEach(art => {
        if (!art.tags) {
          art.tags = []
        } else {
          art.tags = art.tags.split(keys.tagGap)
        }
      })
      this.getCurrentArts()
    }
  },
  directives: {
    focus: {
      inserted: function (el, {value}) {
        if (value) {
          el.focus()
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
@big-header-height: 80px;
@small-header-height: 60px;
@media screen and (min-width: 992px) {
  .header-padding {
    padding-top: @big-header-height;
  }
}
@media screen and (max-width: 992px) {
  .header-padding {
    padding-top: @small-header-height;
  }
}
.pagination {
  position: absolute;
  bottom: 40px;
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
// .img-container {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   @avatar-size: 200px;
//   min-height: 100vh;
//   .status-container{
//     margin: 0 auto;
//     cursor: pointer;
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;
//     text-align: left;
//     position: relative;
//     .edit-icon{
//       display: none;
//     }
//   }
//   .username {
//     font-size: 50px;
//     margin: 10px;
//   }
//   .email {
//     font-size: 20px;
//     font-family: Circular_book;
//   }
//   .avatar-img {
//     width: @avatar-size;
//     height: @avatar-size;
//     border-radius: @avatar-size/2;
//   }
//   .avatar-bg {
//     width: 110vw;
//     object-fit: cover;
//     filter: blur(10px);
//     max-height: 100vh;
//     position: absolute;
//     top: 0;
//     left: -5vw;
//     right: 0;
//     z-index: -1;
//   }
// }


// ============原有style===========


.big-title{
  margin-top: 30px;
  font-size: 40px;
  text-align: left;
  font-weight: bolder;
  font-family: Circular_black;
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
  cursor: pointer;
}
.avatar-edit {
  display: none;
}
.avatar-container:hover .avatar-edit{
  display: block;
  position: absolute;
  left: 10px;
  bottom: 10px;
  width: 60px;
  height: 30px;
  background: #24292E;
  text-align: left;
  line-height: 30px;
  color: #fff;
  padding-left: 10px;
  border-radius: 5px;
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
  cursor: pointer;
}
#username:hover{
  color:#409EFF;
}
#username:hover .username-icon{
  display: inline;
}
.username-icon{
  display: none;
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
