<template>
  <div class="main-container">
    <div class="bg">
      <div style="min-width:30vw;">
        <div class="website">Public Blog</div>
        <div class="explain">and so on later...</div>
        <div class="explain">produced by XHFkindergarten</div>
        
        <!-- <div class="btn-container"> -->
        <el-row>
          <el-col
            class="btn-margin-top"
            :lg="{span:12}"
            :md="{span:12}"
            :sm="{span:12}"
            :xs="{span:24}"
            >
            <a href="https://github.com/XHFkindergarten/vue-backend" target="_blank">
              <button class="btn">
                GitHub
              </button>
            </a>
          </el-col>
          <el-col
            class="btn-margin-top"
            :lg="{span:12}"
            :md="{span:12}"
            :sm="{span:12}"
            :xs="{span:24}"
            >
            <a href="https://img.xhfkindergarten.cn/WechatIMG3.jpeg" target="_blank">
              <button class="white-btn">
                Contack me
              </button>
            </a>
          </el-col>
        </el-row>
        <!-- </div> -->
      </div>
    </div>
  </div>
  <!-- <Favicon style="margin-bottom:20px;"></Favicon>
  <div class="hidden-xs-only title-container">
    <div class="title">Public Blog</div>
    <div class="title2">and so on(later)</div>
    <div class="title2">Produced by XHFkindergarten</div>
  </div>
  <div class="hidden-sm-and-up small-title-container">
    <div class="title">Public Blog</div>
    <div class="title2">and so on(later)</div>
    <div class="title3">Produced by XHFkindergarten</div>
  </div>
  <el-row style="margin: 30px 0;">
    <el-col
      type="flex"
      justify="center"
      :xs="{span:20,offset:2}"
      :sm="{span:4,offset:6}"
      :lg="{span:3,offset:8}"
      :md="{span:3,offset:7}"
      style="padding: 20px 0;"
      >
      <a href="https://github.com/XHFkindergarten/vue-backend" target="_blank">
        <SvgButton
          content="GitHub"
          icon="github2"
          type="primary"
          :width="140"></SvgButton>
      </a>
      
    </el-col>
    <el-col
      type="flex"
      justify="center"
      :xs="{span:20,offset:2}"
      :sm="{span:4,offset:4}"
      :lg="{span:3,offset:2}"
      :md="{span:3,offset:4}"
      style="padding: 20px 0;"
      >
      <SvgButton
        v-if="!hasLogin"
        content="注册"
        icon="adduser"
        @click.native="register"
        :width="140"></SvgButton>
      <a v-else href="https://img.xhfkindergarten.cn/WechatIMG3.jpeg" target="_blank">
        <SvgButton
          content="Connect"
          icon="weixin"
          :width="140"></SvgButton>
      </a>  
    </el-col>
  </el-row> -->
</template>
<script>
import keys from '@/common'
import SvgButton from '@/layouts/SvgButton'
import Favicon from '@/layouts/Favicon'
export default {
  components: {
    Favicon,
    SvgButton
  },
  computed: {
    hasLogin() {
      return this.$store.state.status
    },
    myWx() {
      return `${keys.host}/assets/myWx.jpeg`
    }
  },
  methods: {
    register() {
      this.$router.push('/register')
    }
  }
}
</script>
<style lang="less" scoped>
.btn {
  width: 10rem;
  height: 2.8rem;
  border-radius: 1.4rem;
  background: #1DB954;
  border: none;
  outline: none;
  font-size: 20px;
  color: #FFF;
  font-family: Circular_black;
}
.white-btn {
  width: 10rem;
  height: 2.8rem;
  border-radius: 1.4rem;
  background: #FFF;
  border: none;
  outline: none;
  font-size: 20px;
  color: #d64d1b;
  font-family: Circular_black;
}
.main-container{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .bg {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    // background: linear-gradient(#87A0C6 -60%, #9E3E42 140%);
    // background: linear-gradient(45deg, #BA4A21 -20%, #FBBB02 140%);
    // background: linear-gradient(45deg, #BA4A21 -20%, #877DBB 140%);
    background: linear-gradient(45deg, rgb(214, 77, 27) 20%, #877DBB 140%);
    .website {
      color: #FFF;
      font-family: Circular_black;
    }
    .explain {
      color: #FFF;
      font-family: CoreSans;
      font-size: 20px;
      font-weight: 900;
      margin-top: 10px;
    }
    .btn-container {
      margin-top: 60px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .github {
        font-size: 14px;
        font-family: ADAM;
      }
    }
  }
}
@media screen and (min-width:992px) {
  .website {
    font-size: 80px;
  }
  .btn-margin-top {
    margin-top: 80px;
  }
}
@media screen and (max-width:992px) {
  .website {
    font-size: 50px;
  }
  .btn-margin-top {
    margin-top: 30px;
  }
}
// .small-title-container{
//   .title{
//     font-size: 60px;
//     font-weight: bolder;
//   }
//   .title2{
//     font-size: 50px;
//     font-weight: bolder;
//   }
//   .title3{
//     font-size: 20px;
//     font-weight: bolder;
//     margin: 20px;
//   }
// }
// .title-container{
//   .title{
//     font-size: 80px;
//     font-weight: bolder;
//   }
//   .title2{
//     font-size: 40px;
//     font-weight: bolder;
//   }
// }

// .favicon{
//   width: 300px;
//   height: 300px;
// }
// .main-button{
//   width:120px;
//   height: 60px;
// }
</style>
