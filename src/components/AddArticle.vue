<template>
  <div>
    <el-container>
      <ArticleGroupAside
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
        @deleteArticle="deleteArticle"
        @saveArticle="saveArticle"
        @openArticle="openArticle"
        @addArticle="addArticle"
        :articleList="articleList"></ArticleListAside>
      <el-main class="main">
        <div v-if="activeArt==''" class="blank">
          <Favicon style="margin-top:50px;" title="Article"></Favicon>
        </div>
        <div v-else>
          <input autocomplete="off" id="article-name" v-model="editArticle.title" type="text" /> 
          <RichText
            :content="editArticle.content"
            ref="richtext"></RichText>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Favicon from '@/layouts/Favicon'
import RichText from '@/components/RichText'
import SvgIcon from '@/layouts/SvgIcon'
import ArticleGroupAside from '@/layouts/ArticleGroupAside'
import ArticleListAside from '@/layouts/ArticleListAside'
export default {
  name: 'ArticleContainer',
  components: {
    SvgIcon,
    RichText,
    ArticleGroupAside,
    ArticleListAside,
    Favicon
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
    }
  },
  methods: {
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
      this.$store.state.article = this.articleList[option]
    },
    // 保存当前编辑的文章
    async saveArticle() {
      const params = {
        id: this.editArticle.id,
        content: this.$refs.richtext.editContent,
        title: this.editArticle.title,
      }
      const res = await this.$store.dispatch('updateArticleAction', params)
      if (res.data.success) {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.getArticleList()
      }
    },
    // 删除当前文章
    async deleteArticle(option) {
      this.$confirm('是否确认要删除这篇文章?', 'warning', {
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
    }
  },
  computed: {
    currentGroupId() {
      return this.groupList[parseInt(this.activeGroupIndex)].id
    },
    // 正要编辑的文章obj
    editArticle() {
      return this.$store.state.article
    }
  },
  async mounted() {
    await this.getGroupList()
    await this.getArticleList()
  },
  created() {
    // 监听页面失焦时保存文章
    // window.onblur = function() {
    //   console.log('??')
    //   console.log(this.currentArticleContent)
    // }
  },
}
</script>
<style lang="less" scoped>
.main{
  padding: 0;
}
#article-name{
  outline: none;
  width: 100%;
  height: 40px;
  padding: 10px 10px 10px 20px;
  font-size: 18px;
}
.blank{
  width: 100%;
  height: 900px;
  #favicon{
    width: 200px;
  }
}
</style>