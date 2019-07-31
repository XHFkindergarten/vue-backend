<template>
  <div class="reg-container">
    <img class="bg" src="https://img.xhfkindergarten.cn/deskwallpaper.jpg" alt="background">
    <el-row>
      <el-col
        :lg={span:10,offset:7}
        >
        <div class="input-container">
          <div class="title">Register</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
@big-header-height: 80px;
@small-header-height: 60px;
@media screen and (min-width: 992px) {
  .reg-container {
    padding-top: @big-header-height;
  }
  // .bg {
  //   background-size: 100% auto;
  // }
}
@media screen and (max-width: 992px) {
  .reg-container {
    padding-top: @big-header-height;
  }
  // .bg {
  //   background-size: auto 100%;
  // }
}
.input-container{
  margin-top: 60px;
  border-radius: 1rem;
  // opacity: 0.95;
  // background: #EEE;
  height: 500px;
  .title {
    color: #FFF;
    font-family: Circular_black;
    font-size: 50px;
  }
}
.reg-container {
  min-height: 100vh;
  position: relative;
  .bg {
    width: 100%;
    object-fit: cover;
    position: absolute;
    top:0;
    left: 0;
    right: 0;
  }
  .input-container {
    
  }
}
// .bg {
//   background: url('https://img.xhfkindergarten.cn/deskwallpaper.jpg') no-repeat;
//   // background-size: auto 100%;
//   background-size: 100% 100%;
// }
</style>
