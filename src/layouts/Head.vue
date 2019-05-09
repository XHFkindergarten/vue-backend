<template>
  <div>
    <el-menu
      :default-active="currentRoute"
      class="el-menu-demo"
      mode="horizontal"
      text-color="#000"
      active-text-color="#409EFF"
      router>
      <el-row>
        <el-col
          :lg={span:2,offset:4}
          :md={span:2,offset:4}
          :sm={span:3,offset:2}
          :xs={span:8,offset:8}
          >
          <el-menu-item index="/">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-home"></use>
            </svg>
            <span>主页</span>
          </el-menu-item>
          
          
          <!-- <RouteView></RouteView> -->
        </el-col>
        <el-col
          :lg={span:2}
          :md={span:2}
          :sm={span:3}
          :xs={span:8,offset:8}
          >
          <el-menu-item v-if="!hasLogin" index="/register">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-adduser"></use>
            </svg>
            <span>注册</span>
          </el-menu-item>
        </el-col>
        <el-col
          :lg={span:2}
          :md={span:2}
          :sm={span:3}
          :xs={span:8,offset:8}
          >
          <el-menu-item v-if="!hasLogin" index="/login">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-login"></use>
            </svg>
            <span>登录</span>
          </el-menu-item>
        </el-col>
        <el-col :span="4" class="hidden-xs-only">
          <br>
        </el-col>
        <el-col
          :lg={span:4,offset:10}
          :md={span:4,offset:10}
          :sm={span:4,offset:9}
          :xs={span:8,offset:8}
          >
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
        </el-col>
      </el-row>
      
      <!-- <el-menu-item>
        <template>
          <el-input
            placeholder="search..."
            suffix-icon="el-icon-search"></el-input>
        </template>
      </el-menu-item> -->
      
      
    </el-menu>
  </div>
</template>
<script>
import 'element-ui/lib/theme-chalk/display.css';
// import RouteView from '@/layouts/RouteView'
import MeItems from '@/components/MeItems'
export default {
  name:'Head',
  components:{
    MeItems,
    // RouteView
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
  height: 60px;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
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
.el-menu-item{
  display: inline-block;
}
</style>
