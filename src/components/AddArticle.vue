<template>
  <div>
    <el-container>
      <el-aside class="aside" width="200px">
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
          
          <SvgIcon v-if="!isAddingGroup&&!isSettingGourp" @click.native="settingGroup" class="setting-btn" icon="setting" size="mini"></SvgIcon>
          <SvgIcon v-if="isAddingGroup" @click.native="submitAddGroup" class="setting-btn" icon="check-circle" size="mini"></SvgIcon>
          <SvgIcon v-if="isSettingGourp" @click.native="finishSettingGroup" class="setting-btn" icon="check-circle" size="mini"></SvgIcon>
          </div>
        <el-menu
          active-text-color="#0A86AF"
          text-color="#b3b3b3"
          background-color="#404040"
          default-active="0"
          style="border-right:none;">
          <el-menu-item v-for="item in groupList" :key="item.index" :index="item.index">
            {{item.name}}
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-aside class="aside2" width="240px">
        <div class="addArt-container">
          <SvgIcon style="margin:5px;" size="mini" icon="add6"></SvgIcon>
          <span>添加文章</span>
        </div>
        <div :class="item.index==activeArt?'active-art-container':'art-container'" v-for="item in articleList" :key="item.index">
          <div class="art-svg-container">
            <SvgIcon icon="smile" size="mid" style="color:#b3b3b3"></SvgIcon>
            <span class="font-num">字数:</span>
          </div>
          <div class="art-title">
            <p>文章</p>
          </div>
        </div>
      </el-aside>
      <el-main class="main">
        <RichText style="background: #000;"></RichText>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import RichText from '@/components/RichText'
import SvgIcon from '@/layouts/SvgIcon'
export default {
  name: 'ArticleContainer',
  components: {
    SvgIcon,
    RichText
  },
  data() {
    return {
      // 是否正在设置分组
      isSettingGourp: false,
      // 添加分组的分组名
      newGroupName: '',
      // 是否正在添加分组
      isAddingGroup: false,
      // 选中的分组
      activeTab: 0,
      // 选中的文章
      activeArt: '1',
      // 分组array
      groupList: [],
      // 文章array
      articleList: [
        {
          name: '文章1',
          index: '1'
        },{
          name: '文章2',
          index: '2'
        }
      ]
    }
  },
  computed: {
    
  },
  methods: {
    // 分组模式完成
    finishSettingGroup() {
      this.isSettingGourp = false
    },
    // 开启设置分组模式
    settingGroup() {
      this.isSettingGourp = true
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
      this.$router.push('/main/')
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
        const getGroup = await this.$store.dispatch('getGroupAction', this.$store.state.userInfo.id)
        this.groupList = getGroup.data.group
      }
    },
    // 取消添加分组
    cancelAddGroup(e) {
      this.isAddingGroup = false,
      this.newGroupName = ''
    },
    // 洗分组数据
    formatGroupList(list) {
      list.forEach((l, index) => {
        l.index = ''+index
      })
    }
  },
  mounted() {
    this.$store.dispatch('getGroupAction', this.$store.state.userInfo.id)
      .then(res => {
        this.groupList = res.data.group
        this.formatGroupList(this.groupList)
      })
  },
  created() {
    // 监听页面失焦时保存文章
    window.onblur = function() {
      
    }
  }
}
</script>
<style lang="less" scoped>
.aside{
  min-height: 900px;
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
.aside2{
  background: #2E2E2E;
  min-height: 900px;
  .addArt-container{
    height:72px;
    display: flex;
    padding-left: 10px;
    justify-content: flex-start;
    align-items: center;
    color: #b3b3b3;
    font-size: 16px;
  }
  .addArt-container:hover{
    color: #0A86AF;
    cursor: pointer;
  }
  .art-container{
    height: 90px;
    border-left: 3px #2e2e2e solid;
    
  }
  .active-art-container{
    border-left: 3px #0A86AF solid;
    height: 90px;
  }
  .active-art-container:hover {
    background: #404040;
  }
  .art-container:hover {
    background: #404040;
    border-left: 3px #404040 solid;
  }
}
.art-svg-container{
  display: flex;
  position:relative;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 100%;
  float: left;
  .font-num{
    position: absolute;
    bottom: 3px;
    font-size: 10px;
    color: #b3b3b3;
  }
}
.art-title{
  height: 100%;
  width: 150px;
  float: left;
  display: flex;
  align-items: center;
  p{
   text-align: left;
    font-size: 20px;
    color: #b3b3b3;
  }
}

.main{
  padding: 0;
}

</style>
