<template>
  <div>
    <Favicon style="margin-bottom:20px;"></Favicon>
    <div class="title-container">
      <div class="title">Backend Project</div>
      <div class="title2">Produced by XHFkindergarten</div>
    </div>
    <el-row style="margin: 30px 0;">
      <el-col :span="8" :offset="8">
        <a href="https://github.com/XHFkindergarten/vue-backend" target="_blank">
          <SvgButton
            content="GitHub"
            icon="github2"
            type="primary"
            :width="140"
            style="float:left;"></SvgButton>
        </a>
        <SvgButton
          v-if="!hasLogin"
          content="注册"
          icon="adduser"
          @click.native="register"
          :width="140"
          style="float:right"></SvgButton>
        <a v-else :href="myWx" target="_blank">
          <SvgButton
            content="Connect"
            icon="weixin"
            :width="140"
            style="float:right"></SvgButton>
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
.title{
  font-size: 80px;
  font-weight: bolder;
}
.title2{
  font-size: 40px;
  font-weight: bolder;
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
