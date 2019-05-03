<template>
  <div>
    <el-row>
      <el-col :span="5" :offset="2">
        <div class="avatar-container" @click="editAvatar">
          <img style="width:100%;height:100%;" :src="userInfo.avatar" alt="头像">
          <div class="avatar-edit">
            <i class="el-icon-edit">Edit</i>
          </div>
        </div>
        <el-dialog
          width="40%"
          :center="false"
          :visible.sync="editAvatarDialog"
          title="修改头像">
          <EditAvatar @editavatarsuccess="editAvatarSuccess" :avatarUrl="userInfo.avatar"></EditAvatar>
        </el-dialog>
        <div class="status-container">
          <SvgIcon icon="edit" size="mini" style="margin-left:10px;"></SvgIcon>
          <div style="display:inline-block">Focusing</div>
        </div>
        <div class="username-container">
          <el-row v-if="isEditName" style="margin-top:15px;">
            <el-col :span="17">
              <el-input @blur="abandonEditName" v-model="userInfo.name" />
            </el-col>
            <el-col :span="6" :offset="1">
              <el-button type="success" icon="el-icon-check" circle></el-button>
            </el-col>
          </el-row>
          
          <p v-else @click="editUsername" id="username">{{userInfo.username}}<i class="el-icon-edit username-icon"></i></p>
          <p id="email">{{userInfo.email}}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import SvgIcon from '@/layouts/SvgIcon'
import EditAvatar from '@/components/editAvatar'
export default {
  name: 'me',
  data() {
    return {
      editDialog: false,
      isEditName: false,
      editAvatarDialog: false
      
    }
  },
  components: {
    EditAvatar,
    SvgIcon
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    
  },
  created() {
    
  },
  methods: {
    editUsername() {
      this.isEditName = true
    },
    abandonEditName() {
      this.isEditName = false
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
.avatar-container{
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
.status-container{
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
}
.editUsernameInput{
  width: 80%;
  margin-top: 20px;
}
.icon{
  margin: 0 5px 0 10px;
}
.username-container{
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
</style>
