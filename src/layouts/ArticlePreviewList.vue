<template>
  <div style="min-height:200px;">
    <el-card
      class="card"
      v-for="item in artList"
      :key="item.id"
      shadow="hover"
      :body-style="{
        padding:'0',
      }"
      style="border-radius:10px;margin:40px 0;"
      >
      <el-row>
        <el-col
          :lg="{span:12}"
          :md="{span:24}"
          :sm="{span:24}"
          :xs="{span:24}"
          >
          <div class="img-container" :style="!isBigScreen?'height:240px;':''" @click="editPic(item)">
            <SvgIcon v-if="isMe" class="edit-pic" size="mid" icon="edit"></SvgIcon>
            <img :src="item.labelImg">
          </div>
        </el-col>
        <el-col
          :lg="{span:12}"
          :md="{span:24}"
          :sm="{span:24}"
          :xs="{span:24}"
          >
          <div class="art-container" @click="toArticle(item)">
            <div :class="['title',{'min-title':isBigScreen}]">{{item.title}}</div>
            <div class="tags-container">
              <div class="tags" v-if="item.tags">
                <el-tag
                  :key="tag"
                  :closable="false"
                  v-for="tag in item.tags"
                  type="info">{{tag}}</el-tag>
              </div>
            </div>
            
            <div :class="['summary',{'min-summary':isBigScreen}]">{{item.summary}}</div>
            <div class="comment">
              <span>{{item.userInfo.name}}</span>
              <SvgIcon class="info-icon" size="mini" icon="like3"></SvgIcon>
              <span>{{item.likeNum}}</span>
              <SvgIcon class="info-icon" size="mini" icon="Comment"></SvgIcon>
              <span>{{item.commentNum}}</span>
              <SvgIcon class="info-icon" size="mini" icon="eyes"></SvgIcon>
              <span>{{item.viewTime}}</span>
            </div>
          </div>
        </el-col>  
      </el-row>
    </el-card>
    <el-dialog
        :width="isBigScreen?'700px':'80%'"
        :center="false"
        :visible.sync="editPicDialog"
        title="修改封面图">
        <EditPic v-if="editPicDialog" @uploadLabelImg="uploadLabelImg" :picUrl="editPicUrl" :id="editId"></EditPic>
      </el-dialog>
  </div>
</template>
<script>
import EditPic from '@/components/EditPic'
import SvgIcon from '@/layouts/SvgIcon'
import keys from '@/common'
export default {
  name: 'ArticlePreviewList',
  data() {
    return {
      editPicDialog: false,
      // 即将要编辑的图片
      editPicUrl: '',
      // 即将要编辑的文章id
      editId: '',
      // 文章列表
      artList: this.articleList
    }
  },
  watch: {
    articleList: {
      handler(newValue, oldValue) {
        if (newValue.length === oldValue.length) {
          return
        }
        this.artList = newValue
        this.formatTags()
      },
      deep: true
    }
  },
  methods: {
    toArticle(item) {
      this.$router.push({path: '/article', query: {id: item.id}})
    },
    formatTags() {
      this.artList.forEach(art => {
        if (typeof(art.tags)==='string') {
          art.tags = art.tags.split(keys.tagGap)
        }
      })
    },
    // 编辑封面图
    editPic(item) {
      if (!this.isMe){
        this.toArticle(item)
        return
      }
      this.editPicDialog = true
      this.editPicUrl = item.labelImg
      this.editId = item.id
    },
    // 上传封面图成功
    uploadLabelImg() {
      this.$message.success('修改成功')
      this.editPicDialog = false
      this.$emit('uploadLabelImg')
    }
    // judgeScreen() {
    //   if (window.innerWidth<800) {
    //     this.isBigScreen = false
    //   } else {
    //     this.isBigScreen = true
    //   }
    // }
  },
  props: {
    articleList: {
      default: []
    }
  },
  components: {
    SvgIcon,
    EditPic
  },
  computed: {
    isMe() {
      return this.$route.path=="/me"
    },
    isBigScreen() {
      return this.$store.state.isBigScreen
    }
  },
  created() {
    window.onresize = this.judgeScreen
  },
  mounted() {
    // this.judgeScreen()
  }
}
</script>
<style lang="less" scoped>
.info-icon{
  margin: 0 10px;
}
.card{
  cursor: pointer;
}
.img-container{
  width:100%;
  height:340px;
  overflow: hidden;
  position: relative;
  .edit-pic{
    color: #fff;
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
  .edit-pic:hover{
    color: #409EFF;
    z-index:99;
  }
  img {
    width:100%;
    height:100%;
    object-fit: cover;
  }
}
.art-container{
  // float: left;
  width: 100%;
  .title{
    margin: 18px 30px 0;
    text-align: left;
    font-size: 26px;
    font-weight: bold;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }
  .tags-container{
    white-space: nowrap;
    overflow-x: auto;
    .tags{
      display: flex;
      justify-content: flex-start;
      margin: 10px 0 10px 30px;
    }
  }
  .min-title{
    min-height: 70px;
  }
  .min-summary{
    min-height: 150px;
  }
  .summary{
    margin: 0 30px;
    text-align: left;
    font-size: 14px;
    color: #717a84;
    word-wrap: break-word;
  }
  .comment{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 12px;
    color: #717a84;
    margin-left: 30px;
    min-height: 50px;
  }
}
.el-tag{
  margin-left: 10px;
}
.el-tag:first-child{
  margin-left: 0px;
}
</style>
