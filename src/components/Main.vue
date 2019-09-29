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
                Contact me
              </button>
            </a>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
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
  },
  watch: {
    
  }
}
</script>
<style lang="less" scoped>
.btn {
  width: 10rem;
  height: 2.8rem;
  border-radius: 1.4rem;
  background: #5191E1;
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
  color: #5191E1;
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
    // background: linear-gradient(45deg, rgb(11, 4, 92) 20%,rgb(152, 83, 243)  140%);
    background: linear-gradient(45deg, rgb(9, 26, 70), #5084C3);
    // background: linear-gradient(45deg, #391571, #5213F9);

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
</style>
