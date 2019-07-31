<template>
  <div class="route-header">
    <el-row>
      <el-col
        :lg={span:4,offset:2}
        :md={span:2,offset:4}
        :sm={span:3,offset:2}
        :xs={span:24}
        @click.native="RoutePush('/')"
        >
        <div class="title">XHFkindergarten.cn</div>
      </el-col>
      <el-col
        class="hidden-md-and-down"
        :lg={span:2,offset:hasLogin?8:5}
        :md={span:2,offset:4}
        :sm={span:3,offset:2}
        :xs={span:8,offset:8}
        @click.native="RoutePush('/readFile')"
        >
        <div class="header-item">Read</div>
      </el-col>
      <el-col
        class="hidden-md-and-down"
        @click.native="RoutePush('/articleList')"
        :lg={span:2,offset:0}
        :md={span:2,offset:4}
        :sm={span:3,offset:2}
        :xs={span:8,offset:8}
        >
        <div class="header-item">Article</div>
      </el-col>
      <el-col
        class="hidden-md-and-down"
        :lg={span:2,offset:0}
        :md={span:2,offset:4}
        :sm={span:3,offset:2}
        :xs={span:8,offset:8}
        @click.native="RoutePush('/daily')"
        >
        <div class="header-item">Daily</div>
      </el-col>
      <el-col
        class="hidden-md-and-down"
        v-if="!hasLogin"
        :lg={span:2,offset:0}
        :md={span:2,offset:4}
        :sm={span:3,offset:2}
        :xs={span:8,offset:8}
        @click.native="RoutePush('/login')"
        >
        <div class="header-item">
          <div class="divider"></div>
          Sign in
        </div>
      </el-col>
      <el-col
        class="hidden-md-and-down"
        v-if="!hasLogin"
        :lg={span:2,offset:0}
        :md={span:2,offset:4}
        :sm={span:3,offset:2}
        :xs={span:8,offset:8}
        @click.native="RoutePush('/register')"
        >
        <div class="header-item">
          Sign up
        </div>
      </el-col>
      <el-col
        class="hidden-md-and-down"
        @click.native="toUser"
        v-if="hasLogin"
        :lg={span:4,offset:0}
        :md={span:2,offset:4}
        :sm={span:3,offset:2}
        :xs={span:8,offset:8}
        >
        <template>
          <el-popover
            placement="bottom"
            title=""
            width="100"
            trigger="click">
            <MeItems
              :hasLogin="hasLogin"></MeItems>
            <div class="header-user" slot="reference">
              <img v-if="hasLogin" class="avatar" :src="userInfo.avatar" alt="用户头像">
              {{userInfo.username}}
            </div>
            <!-- <el-button class="username" type="text" slot="reference">{{(userInfo.username==''||userInfo.username==null)?'未登录':userInfo.username}}</el-button> -->
          </el-popover>
        </template>
        
      </el-col>

    </el-row>
    <div :class="isCollapse?'show-bar':'none-bar'" class="nav-bar">
      <div
        v-if="hasLogin"
        @click="CollapseRouteChange('/me')"
        class="user-container"
        :class="isCollapse?'show-words':'none-words'">
        <div class="username">
          <img v-if="hasLogin" class="avatar" :src="userInfo.avatar" alt="用户头像">
          {{userInfo.username}}
        </div>
        <el-button @click.stop="logout" class="logout-btn" round>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-logout-white"></use>
          </svg>
        </el-button>
        
        <!-- <FavIcon icon="logout"></FavIcon> -->
      </div>
      <div @click="CollapseRouteChange('/')" :class="isCollapse?'show-words':'none-words'" class="nav-words" style="animation-delay: 0ms;">Home</div>
      <div @click="CollapseRouteChange('/articleList')" :class="isCollapse?'show-words':'none-words'" class="nav-words" style="animation-delay: 17ms;">Article</div>
      <div @click="CollapseRouteChange('/daily')" :class="isCollapse?'show-words':'none-words'" class="nav-words" style="animation-delay: 34ms;">Daily</div>
      <div @click="CollapseRouteChange('/readFile')" :class="isCollapse?'show-words':'none-words'" class="nav-words" style="animation-delay: 51ms;">Read</div>
      <div :class="isCollapse?'show-words':'none-words'" class="divider"></div>
      <div @click="CollapseRouteChange('/login')" :class="isCollapse?'show-words':'none-words'" class="nav-words" v-if="!hasLogin" style="animation-delay: 68ms;">Sign in</div>
      <div @click="CollapseRouteChange('/register')" :class="isCollapse?'show-words':'none-words'" class="nav-words" v-if="!hasLogin" style="animation-delay: 85ms;">Sign up</div>
    </div>
    <el-button
      v-if="!isCollapse&&!isBigScreen"
      @click="isCollapse=true"
      :class="isCollapse?'noOpacity':'showOpacity'"
      class="openCollapse"
      round>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-menu-white"></use>
      </svg>
    </el-button>
    <el-button
      v-if="isCollapse&&!isBigScreen"
      @click="isCollapse=false"
      :class="isCollapse?'showOpacity':'noOpacity'"
      class="openCollapse"
      round>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-cross-white"></use>
      </svg>
    </el-button>
  </div>
</template>
<script>
import MeItems from '@/components/MeItems'
// import FavIcon from '@/layouts/FavIcon'
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  components: {
    MeItems
  },
  methods: {
    // 点击侧边栏路由跳转
    CollapseRouteChange(path) {
      this.isCollapse = false
      this.RoutePush(path)
    },
    // 登出
    logout() {
      this.$store.dispatch('logoutAction')
      Cookies.remove('login-token')
      this.$store.commit('resetRoutes')
      this.$store.dispatch('addRoutes')
      this.$router.push('/')
      this.isCollapse = false
    },
    // 通用无参路由跳转
    RoutePush(path) {
      if (path==='/' && !this.isBigScreen) {
        return
      }
      this.$router.push(path)
    },
    toUser() {
      this.$router.push()
    }
  },
  computed: {
    hasLogin() {
      return this.$store.state.status
    },
    userInfo() {
      return this.$store.state.userInfo
    },
    isBigScreen() {
      return this.$store.state.isBigScreen
    }
  }
}
</script>
<style lang="less" scoped>
@big-header-height: 80px;
@small-header-height: 60px;
.noOpacity {
  display: none;
  opacity: 0;
  transition: all 1s ease-in-out;
}
.showOpacity {
  display: block;
  opacity: 1;
  transition: all 1s ease-in-out;
}
.openCollapse {
  position: absolute;
  height: @small-header-height;
  right: 0;
  top: 0;
  background: #000;
  border: none;
  // top: 0;
}
.nav-bar {
  transition: width 0.5s ease-in-out;
  position: fixed;
  right: 0;
  top: 0;
  color: #FFF;
  font-family: Circular_black;
  padding-top: 80px;
  // padding-left: 40px;
  .user-container {
    margin: 16px 0;
    padding-left: 40px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .username {
      color: #FFF;
      font-size: 16px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .avatar {
      width:30px;
      height: 30px;
      border-radius: 50%;
      align-items: center;
      margin-right: 10px;
    }
    .logout-btn {
      // animation-delay: 200ms;
      background: #000;
      border: none;
      // position: absolute;
      // right: 0;
    }
  }
  .divider {
    width: 40px;
    height: 2px;
    background: #FFF;
    margin: 40px 0 20px 40px;
  }
}
.nav-words {
  transition: padding-left 1s ease-in-out;
  text-align: left;
  padding: 16px 0;
  font-size: 24px;
  cursor: pointer;
  // padding-top: 30px;
  // padding-bottom: 30px;
}
.nav-words:hover {
  color: #5084C3;
}
.none-words {
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  padding-left: 40px;
}
.show-words {
  transition: opacity 0.9s ease-in-out;
  opacity: 1;
  animation: showWords 0.8s ease-in-out;
  padding-left: 40px;
}
.none-bar {
  // display: none;
  height: 100vh;
  width: 0;
  background: #000;
}
.show-bar {
  height: 100vh;
  width: 80vw;
  background: #000;
}
@keyframes showWords {
  from {padding-left: 100px;}
  to {padding-left: 40px;}
}
.header-user{
  color: #FFF;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  .avatar {
    width:30px;
    height: 30px;
    border-radius: 50%;
    align-items: center;
    margin-right: 10px;
  }
}
.header-item {
  position: relative;
  font-size: 18px;
  font-family: Circular_book;
  color: #FFF;
  line-height: 80px;
  cursor: pointer;
  text-align: center;
  .divider {
    height: 30px;
    width: 1px;
    background: #999;
    position: absolute;
    left: 0;
    top: 25px;
  }
}
.header-item:hover {
  color: #5084C3;
}

.route-header{
  z-index: 110;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  // height: @big-header-height;
  // opacity: 0.5;
  .title{
    font-family: Circular_black;
    color: white;
    // line-height: @big-header-height;
    cursor: pointer;
  }
}
@media screen and (min-width: 992px) {
  .header-user{
    line-height: @big-header-height;
  }
  .route-header{
    height: @big-header-height;
    background-color: rgba(0, 0, 0, 0.6);
    // opacity: 0.5;
    .title{
      font-size: 20px;
      line-height: @big-header-height;
    }
  }
}

@media screen and (max-width: 992px) {
  .header-user{
    line-height: @small-header-height;
  }
  .route-header{
    height: @small-header-height;
    background-color: rgba(0, 0, 0, 1);
    // opacity: 0.5;
    .title{
      font-size: 18px;
      line-height: @small-header-height;
      text-align: left;
      padding-left: 20px;
    }
  }
}
</style>
