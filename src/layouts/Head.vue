<template>
  <div>
    <el-menu
      :default-active="currentRoute"
      class="el-menu-demo"
      mode="horizontal"
      text-color="#000"
      active-text-color="#409EFF"
      router>
      <el-menu-item index="/">主页</el-menu-item>
      <el-menu-item v-if="!hasLogin" index="/register">注册</el-menu-item>
      <el-menu-item v-if="!hasLogin" index="/login">登录</el-menu-item>
      <el-menu-item>
        <template>
          <el-input
            placeholder="search..."
            suffix-icon="el-icon-search"></el-input>
        </template>
      </el-menu-item>
      <div class="userinfo">
        <img v-if="hasLogin" class="avatar" :src="userInfo.avatar" alt="用户头像">
        <template>
          <el-popover
            placement="bottom"
            title=""
            width="100"
            trigger="hover">
            <MeItems
              :hasLogin="hasLogin"></MeItems>
              <el-button class="username" type="text" slot="reference">{{(userInfo.username==''||userInfo.username==null)?'未登录':userInfo.username}}</el-button>
            </el-popover>
          </template>    
      </div>
    </el-menu>
  </div>
</template>
<script>
import MeItems from '@/components/MeItems'
export default {
  name:'Head',
  components:{
    MeItems
  },
  props: [
    'userInfo'
  ],
  data() {
    return {

    }
  },
  computed: {
    activeIndex() {
      return this.$route.path
    },
    hasLogin() {
      return this.$store.state.status
    },
    currentRoute() {
      return this.$route.path
    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.el-menu-demo {
  position: relative;
}

.userinfo {
  width:15%;
  line-height: 60px;
  position: absolute;
  right:0;
  display: flex;
  align-items: center;
}
.userinfo:hover  .username {
  color: #409EFF;
}
.username {
  color: #000;
}
.avatar {
  width:30px;
  height: 30px;
  border-radius: 50%;
  align-items: center;
  margin-right: 10px;
}
</style>
