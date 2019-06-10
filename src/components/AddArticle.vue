<template>
  <div>
    <el-container>
      <ArticleGroupAside
        v-if="isBigScreen || (!isBigScreen&&!isEditing)"
        @activeGroupChange="activeGroupChange"
        @deleteGroup="showDeleteGroupDialog"
        @editGroupName="showEditGroupNameDialog"
        @addGroupSuccess="getGroupList"
        :groupList="groupList"></ArticleGroupAside>

      <el-dialog
        width="300px"
        title="修改分组名称"
        :visible.sync="editGroupNameDialog">
        <el-input v-model="editGroup.name" type="text" style="width:80%;"></el-input>
        <div style="margin-top: 30px;">
          <el-button @click="submitEditGroupName" type="primary" round>确定</el-button>
        </div>
      </el-dialog>

      <ArticleListAside
        ref="artList"
        v-if="isBigScreen || (!isBigScreen&&!isEditing)"
        @deleteArticle="deleteArticle"
        @saveArticle="saveArticle"
        @openArticle="openArticle"
        @addArticle="addArticle"
        :articleList="articleList"></ArticleListAside>
      <el-main class="main" v-if="isBigScreen || (!isBigScreen&&isEditing)">
        <div v-if="!activeArt && activeArt!==0" class="blank">
          <Favicon style="margin-top:50px;" title="Article"></Favicon>
        </div>
        <div v-else>
          <input autocomplete="off" id="article-name" v-model="editArticle.title" type="text" /> 
          <div v-if="!isBigScreen" class="editor-bar">
            <SvgIcon @click.native="smallScreenBack" icon="back5"></SvgIcon>
            <SvgIcon class="rotate" @click.native="saveArticle" style="margin-left:40px;" icon="refresh"></SvgIcon>
            <SvgIcon @click.native="previewArt" style="margin-left:40px;" icon="reverse"></SvgIcon>
            <SvgIcon @click.native="smallDeleteArticle" style="margin-left:40px;" icon="delete4"></SvgIcon>
          </div>
          <div class="tag-bar">
            <el-tag
              type="info"
              :key="tag"
              @close="handleClose(tag)"
              v-for="tag in editArticle.tags"
              closable>{{tag}}</el-tag>
            <el-input
              v-model="tabInputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputComfirm"
              @blur="handleInputComfirm"
              v-if="inputVisible"
              class="input-new-tag"></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </div>
          <!-- <RichText
            :content="editArticle.content"
            ref="richtext"></RichText> -->
          <Markdown :content="editArticle.content" ref="richtext"></Markdown>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Favicon from '@/layouts/Favicon'
import RichText from '@/components/RichText'
import Markdown from '@/components/Markdown'
import SvgIcon from '@/layouts/SvgIcon'
import keys from '@/common'
import ArticleGroupAside from '@/layouts/ArticleGroupAside'
import ArticleListAside from '@/layouts/ArticleListAside'
export default {
  name: 'ArticleContainer',
  components: {
    SvgIcon,
    RichText,
    ArticleGroupAside,
    ArticleListAside,
    Favicon,
    Markdown
  },
  data() {
    return {
      // 选中的文章
      activeArt: '',
      // 文章array
      articleList: [],
      // 分组array
      groupList: [],
      // 是否显示修改分组名的弹窗
      editGroupNameDialog: false,
      // 即将被更改的分组名臣
      editGroup: {
        name: '',
        id: ''
      },
      // 被选中的文章分组index
      activeGroupIndex: '0',
      editArticle: '',
      isBigScreen: true,
      // (小屏幕下)编辑文章
      isEditing: false,
      // 是否新建标签
      inputVisible: false,
      // 标签输入框value
      tabInputValue: ''
    }
  },
  methods: {
    // 显示标签输入框
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 确认添加标签
    handleInputComfirm() {
      if (!this.editArticle.tags) {
        this.editArticle.tags = []
      }
      let inputValue = this.tabInputValue
      if (inputValue && this.editArticle.tags.indexOf(inputValue) === -1) {
        this.editArticle.tags.push(inputValue)
      }
      this.inputVisible = false
      this.tabInputValue = ''
    },
    // 删除标签
    handleClose(tag) {
      this.editArticle.tags.splice(this.editArticle.tags.indexOf(tag), 1)
    },
    // (小屏幕下)预览
    previewArt() {
      if (this.$refs.richtext.$refs.markdown.defaultOpen==='preview'){
        this.$refs.richtext.$refs.markdown.defaultOpen='edit'
      } else {
        this.$refs.richtext.$refs.markdown.defaultOpen='preview'
      }
      
      // this.$refs.richtext.$refs.markdown.preview = !this.$refs.markdown.$refs.markdown.preview
    },
    // (小屏幕下)返回
    smallScreenBack() {
      this.isEditing = false
      this.activeArt = ''
      this.editArticle = ''
    },
    // 点击删除分组
    showDeleteGroupDialog(option) {
      if (this.groupList.length==1) {
        this.$message({
          type: 'warning',
          message: '请保留最少一个分组!'
        })
        return
      }
      this.$confirm('是否确认要删除该分组及分组内的所有文章?', 'warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$store.dispatch('deleteGroupAction', option.id)
          .catch(err => {
            this.$message.error(err)
          })
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '删除分组成功!'
          })
          this.getGroupList()
        }
      })
    },
    // 点击编辑分组名称
    showEditGroupNameDialog(option) {
      this.editGroup = {
        id: option.id,
        name: option.name
      }
      this.editGroupNameDialog = true
    },
    // 洗分组数据
    formatGroupList(list) {
      list.forEach((l, index) => {
        l.index = ''+index,
        l.edit = false
      })
    },
    // 洗文章列表数据
    formatArticleList(list) {
      list.forEach((l, index) => {
        l.index = '' + index
      })
    },
    // 获取分组列表
    async getGroupList() {
      const res = await this.$store.dispatch('getGroupAction', this.$store.state.userInfo.id)
        .catch(err => {
          this.$message.error(err)
        })
      this.groupList = res.data.group
      this.formatGroupList(this.groupList)
    },

    // 获取文章列表(根据分组id)
    async getArticleList() {
      const res = await this.$store.dispatch('getArticleList', {
        groupId: this.currentGroupId
      }).catch(err => {
        this.$message.error(err)
      })
      this.articleList = res.data.article
      this.formatArticleList(this.articleList)
    },

    // 提交修改分组名称
    async submitEditGroupName() {
      if (!this.editGroup.name) {
        this.$message.error('请输入新的分组名称')
        return 
      }
      const res = await this.$store.dispatch('editGroupNameAction', this.editGroup)
        .catch(err => {
          this.$message.error(err)
        })
      if (res.data.success) {
        this.$message({
          type: 'success',
          message: 'update groupinfo success'
        })
        this.editGroupNameDialog = false
        this.getGroupList()
      }
    },
    // 子组件中选中的grouptab发生变化
    activeGroupChange(option) {
      this.activeGroupIndex = option.index
      this.$store.state.group = this.groupList[option]
      this.getArticleList()
    },
    async addArticle() {
      const res = await this.$store.dispatch('addArticleAction', {
        groupId: this.currentGroupId,
        content: ''
      })
      await this.getArticleList()
    },
    // 点击打开某一篇文章
    openArticle(option) {
      this.activeArt = option
      this.editArticle = this.articleList[option]
      if (typeof(this.editArticle.tags) === 'string') {
        this.editArticle.tags = this.editArticle.tags.split(keys.tabGap)
      }
      if (!this.isBigScreen) {
        this.isEditing = true
      }
    },
    // 保存当前编辑的文章
    async saveArticle() {
      const that = this
      const params = {
        id: this.editArticle.id,
        content: this.$refs.richtext.markdownContent,
        html: this.$refs.richtext.htmlContent,
        title: this.editArticle.title,
        tags: this.editArticle.tags.join(keys.tabGap)
      }
      const res = await this.$store.dispatch('updateArticleAction', params)
      if (res.data.success) {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.getArticleList()
        if (this.isBigScreen) {
          this.$refs.artList.activeArt = 0
        }
      }
    },
    // 小屏幕下点击删除文章
    async smallDeleteArticle() {
      await this.deleteArticle({
        id: this.editArticle.id
      })
      this.smallScreenBack()
    },
    // 删除当前文章
    async deleteArticle(option) {
      await this.$confirm('是否确认要删除这篇文章?', 'warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async () => {
        const id = option.id
        const res = await this.$store.dispatch('deleteArticleAction', id)
          .catch(err => {
            throw err
          })
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getArticleList()
          this.activeArt = ''
        }
      })
    },
    // 判断屏幕尺寸
    judgeScreen() {
      if (window.innerWidth<800) {
        this.isBigScreen = false
      } else {
        this.isBigScreen = true
      }
    }
  },
  computed: {
    currentGroupId() {
      return this.groupList[parseInt(this.activeGroupIndex)].id
    },
    // // 正要编辑的文章obj
    // editArticle() {
    //   return this.$store.state.article
    // }
  },
  async mounted() {
    this.judgeScreen()
    await this.getGroupList()
    await this.getArticleList()
  },
  created() {
    // 监听页面失焦时保存文章
    // window.onblur = function() {
    //   console.log('??')
    //   console.log(this.currentArticleContent)
    // }
    let that = this
    let code1 = 0
    document.onkeydown = function (e) {
      let evn = e || event
      let key = evn.keyCode || evn.which || evn.charCode;
      // shift 16
      // S 83
      if (key === 17 || key === 91) {
        code1 = 1
        // e.preventDefault()
      }
      if (key === 83 && code1 === 1 && that.activeArt) {
        // 保存文章
        console.log('保存文章')
        that.saveArticle()
        e.preventDefault()
      }
      // if (code1 === 1 && code2 === 2) {
      //   console.log('同时按下了shift和S')
      //   console.log(this.activeArt)
      //   if (this.activeArt) {
      //     console.log('保存文章')
      //   }
      // }
    }
    document.onkeyup = function(e) {
      if (e.keyCode === 17 || e.keyCode === 91) {
        code1 = 0
      }
    }
  },
}
</script>
<style lang="less" scoped>
.el-tag{
  margin-left: 10px;
}
.el-tag:first-child{
  margin-left: 0;
}
.button-new-tag{
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.main{
  padding: 0;
}
#article-name{
  border: none;
  outline: none;
  width: 100%;
  height: 40px;
  padding: 10px 10px 10px 20px;
  font-size: 18px;
}
.tag-bar{
  overflow-x: auto;
  height: 40px;
  width: 90%;
  padding: 10px 10px 10px 20px;
  border-top: 1px solid #dfe2e5;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.editor-bar{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  height: 40px;
  padding: 10px 10px 10px 20px;
  border-top: 1px solid #dfe2e5;
}
.blank{
  width: 100%;
  height: 900px;
  #favicon{
    width: 200px;
  }
}

.rotate{
  transition: all 1s ease-in-out;
  transform: rotate(360deg)
}
</style>
