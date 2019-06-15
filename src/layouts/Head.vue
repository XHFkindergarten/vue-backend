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
        <el-col class="hidden-sm-and-up" :xs={span:8,offset:8}>
          <el-menu-item @click.native="backRoute">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-back5"></use>
            </svg>
          </el-menu-item>
        </el-col>
        <el-col
          class="hidden-sm-and-up"
          :lg={span:2,offset:4}
          :md={span:2,offset:4}
          :sm={span:3,offset:2}
          :xs={span:8,offset:8}
          >
          <el-menu-item @click.native="collapseMenu">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-menu1"></use>
            </svg>
          </el-menu-item>
        </el-col>
        <el-col
          :lg={span:24}
          :md={span:24}
          :sm={span:24}
          :xs={span:12,offset:6}
          >
          <el-row>
            <el-collapse-transition>
              <div v-show="isCollapse">
                <el-col
                  :lg={span:3,offset:1}
                  :md={span:3,offset:1}
                  :sm={span:3,offset:2}
                  :xs={span:24}
                  >
                  <el-menu-item index="/" @click.native="collapseMenu">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-home"></use>
                    </svg>
                    <span>主页</span>
                  </el-menu-item>
                </el-col>
                <el-col
                  :lg={span:3}
                  :md={span:3}
                  :sm={span:3}
                  :xs={span:24}
                  >
                  <el-menu-item v-if="!hasLogin" index="/register" @click.native="collapseMenu">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-adduser"></use>
                    </svg>
                    <span>注册</span>
                  </el-menu-item>
                </el-col>
                <el-col
                  :lg={span:3}
                  :md={span:3}
                  :sm={span:3}
                  :xs={span:24}
                  >
                  <el-menu-item v-if="!hasLogin" index="/login" @click.native="collapseMenu">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-login"></use>
                    </svg>
                    <span>登录</span>
                  </el-menu-item>
                </el-col>
                <el-col
                  :lg={span:3}
                  :md={span:3}
                  :sm={span:3}
                  :xs={span:24}
                  >
                  <el-menu-item index="/articleList" @click.native="collapseMenu">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-article-line"></use>
                    </svg>
                    <span>文章</span>
                  </el-menu-item>
                </el-col>
                <el-col
                  :lg={span:3}
                  :md={span:3}
                  :sm={span:3}
                  :xs={span:24}
                  >
                  <el-menu-item index="/readFile" @click.native="collapseMenu">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-icon7"></use>
                    </svg>
                    <span>阅读文档</span>
                  </el-menu-item>
                </el-col>
                <el-col
                  :lg={span:3}
                  :md={span:3}
                  :sm={span:3}
                  :xs={span:24}
                  >
                  <el-menu-item index="/daily" @click.native="collapseMenu">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-iconfontcha"></use>
                    </svg>
                    <span>动态</span>
                  </el-menu-item>
                </el-col>
                <!-- <el-col :span="4" class="hidden-xs-only">
                  <br>
                </el-col> -->
                <el-col
                  :lg={span:4,offset:6}
                  :md={span:4,offset:6}
                  :sm={span:3,offset:5}
                  :xs={span:24}
                  >
                  <div class="userinfo">
                    <img v-if="hasLogin" class="avatar" :src="userInfo.avatar" alt="用户头像">
                    <template>
                      <el-popover
                        placement="bottom"
                        title=""
                        width="100"
                        trigger="click">
                        <MeItems
                          :hasLogin="hasLogin"></MeItems>
                        <el-button class="username" type="text" slot="reference">{{(userInfo.username==''||userInfo.username==null)?'未登录':userInfo.username}}</el-button>
                      </el-popover>
                    </template>    
                  </div>
                </el-col>
              </div>
            </el-collapse-transition>
          </el-row>
        </el-col>
      </el-row>
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
      isCollapse: false,
      isBigScreen: true
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
    // xs尺寸下点击收放菜单
    collapseMenu() {
      if (this.isBigScreen) {
        this.isCollapse = true
      } else {
        this.isCollapse = !this.isCollapse
      }
    },
    // 监听屏幕尺寸，显示tab
    listenWidth() {
      if (window.innerWidth>768) {
        this.isBigScreen = true
      } else {
        this.isBigScreen = false
      }
    },
    // 点击返回按钮
    backRoute() {
      console.log('back')
      this.$router.back()
    }
  },
  created() {
    this.listenWidth()
    if (!this.isBigScreen) {
      this.isCollapse = false
    } else {
      this.isCollapse = true
    }
    window.onresize = this.listenWidth
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
