<template>
  <div>
    <Favicon style="margin-bottom:20px;"></Favicon>
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
    </el-row>
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
  }
}
</script>
<style lang="less" scoped>
.small-title-container{
  .title{
    font-size: 60px;
    font-weight: bolder;
  }
  .title2{
    font-size: 50px;
    font-weight: bolder;
  }
  .title3{
    font-size: 20px;
    font-weight: bolder;
    margin: 20px;
  }
}
.title-container{
  .title{
    font-size: 80px;
    font-weight: bolder;
  }
  .title2{
    font-size: 40px;
    font-weight: bolder;
  }
}

.favicon{
  width: 300px;
  height: 300px;
}
.main-button{
  width:120px;
  height: 60px;
}
</style>
