<template>
  <div>
    <el-aside style="overflow-x:auto;height:100vh;" class="aside" :width="isBigScreen?'200px':'50vw'">
      <div class="back-container">
        <el-button @click="backto" class="back-button" round>
          <div class="svg-container">
            <svg style="width:20px;height:20px;" class="icon" aria-hidden="true">
              <use xlink:href="#icon-back"></use>
            </svg>
            <span>返回列表</span>
          </div>
        </el-button>
      </div>
      <div class="addGroup">
        <SvgIcon v-if="!isAddingGroup" style="margin:0 10px 0 5px;" icon="add4" size="mini"></SvgIcon>
        <SvgIcon v-else @click.native="cancelAddGroup" style="margin:0 10px 0 5px;" icon="close-circle" size="mini"></SvgIcon>
        <el-input ref="addGroupName" v-if="isAddingGroup" v-model="newGroupName" maxlength="10" placeholder="请输入分组名" size="mini" style="width:110px;" type="text"></el-input>
        <el-button v-else class="add-btn" type="text" @click="addGroup">添加分组</el-button> 
        <SvgIcon v-if="isAddingGroup" @click.native="submitAddGroup" class="setting-btn" icon="check-circle" size="mini"></SvgIcon>
      </div>
      <el-menu
        ref="menu"
        active-text-color="#0A86AF"
        text-color="#b3b3b3"
        background-color="#404040"
        @select="selectTab"
        :default-active="activeTab"
        style="border-right:none;">
        <el-menu-item v-for="(item, index) in groupList" :key="item.index" :index="index+''">
          <template slot="title">
            <div class="menu-item-container">
              <SvgIcon @click.native="editGroup(item)" class="edit-icon" size="mini" icon="bianji"></SvgIcon>
              <span>{{item.name}}</span>
              <SvgIcon @click.native="deleteGroup(item)" class="delete-icon" size="mini" icon="delete4"></SvgIcon>
            </div>
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>
<script>
import SvgIcon from '@/layouts/SvgIcon'
export default {
  name: 'ArticleGroupAside',
  data() {
    return {
      // 添加分组的分组名
      newGroupName: '',
      // 是否正在添加分组
      isAddingGroup: false,
      // 选中的分组
      activeTab: '0'
    }
  },
  props: {
    groupList: {
      default: []
    }
  },
  components: {
    SvgIcon
  },
  computed: {
    isBigScreen() {
      return this.$store.state.isBigScreen
    }
  },
  methods: {
    // 分组模式完成
    finishSettingGroup() {
      this.isSettingGourp = false
    },
    // 添加分组
    addGroup() {
      this.isAddingGroup = true
      setTimeout(() => {
        this.$refs.addGroupName.focus()
      },0)
    },
    // 返回
    backto() {
      this.$router.push('/articleList')
    },
    // 提交添加分组
    async submitAddGroup() {
      const res = await this.$store.dispatch('addGroupAction', {
        name: this.newGroupName,
        userId: this.$store.state.userInfo.id
      })
        .catch(err => {
          this.$message.error(err)
        })
      if (res.data.success) {
        this.isAddingGroup = false
        this.newGroupName = ''
        this.$emit('addGroupSuccess')
      }
    },
    // 取消添加分组
    cancelAddGroup(e) {
      this.isAddingGroup = false,
      this.newGroupName = ''
    },
    
    // 编辑分组名称
    editGroup(item) {
      this.$emit('editGroupName', item)
    },
    // 删除分组
    deleteGroup(item) {
      this.$emit('deleteGroup', item)
    },
    // 当前选中的tab变化
    selectTab() {
      this.$emit('activeGroupChange', {
        index: this.$refs.menu.activeIndex
      })
    },
    // // 判断屏幕尺寸
    // judgeScreen() {
    //   if (window.innerWidth<800) {
    //     this.isBigScreen = false
    //   } else {
    //     this.isBigScreen = true
    //   }
    // },
  },
  mounted() {
    // this.judgeScreen()
  }
}
</script>


<style lang="less" scoped>
// .big-height {
//   min-height: 100vh;
// }
// .small-height {
//   min-height: 200px;
// }
.aside{
  height: 100%;
  background: #404040;
  .back-container{
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    .back-button{
      color: #0A86AF;
      width: 80%;
      background: #404040;
      border: 1px #2F5C85 solid;
      .svg-container{
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .addGroup{
    height: 48px;
    color: #fff;
    font-size: 14px;
    text-align: left;
    margin-left: 5px; 
    display: flex;
    position: relative;
    justify-content: left;
    align-items: center;
    .add-btn{
      color: #fff;
      cursor: pointer;
    }
    .add-btn:hover{
      color: #0A86AF;
    }
    .setting-btn{
       margin: 0 5px;
       position:absolute;
       right:10px;
       cursor: pointer;
    }
  }
}

.menu-item-container{
  position: relative;
  .edit-icon{
    display: none;
  }
  .delete-icon{
    display: none;
  }
}
.menu-item-container:hover{
  .edit-icon{
    position: absolute;
    left: 5px;
    display: inline;
    color: #fff;
  }
  .delete-icon{
    position: absolute;
    right:5px;
    display: inline;
    color: #fff;
  }
  .edit-icon:hover{
    position: absolute;
    left: 5px;
    display: inline;
    color: #0A86AF;
  }
  .delete-icon:hover{
    position: absolute;
    right:5px;
    display: inline;
    color: #0A86AF;
  }
}
</style>
