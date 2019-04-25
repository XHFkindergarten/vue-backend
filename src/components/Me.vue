<template>
  <div>
    <el-row>
      <el-col :span="5" :offset="2">
        <div class="avatar-container">
          <img style="width:100%;height:100%;" src="../assets/img.jpg" alt="头像">
        </div>
        <div class="status-container">
          <i class="el-icon-edit icon"></i>
          <div style="display:inline-block">Focusing</div>
        </div>
        <div class="username-container">
          <p class="username">小哈佛幼儿园</p>
          <p class="email">XHFkindergarten@gmail.com</p>
        </div>
        <div class="editbtn-container">
          <el-button class="editbtn" type="primary" round>Edit</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  created() {
    
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
}
.status-container{
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
.icon{
  margin: 0 5px 0 10px;
}
.username-container{
  text-align: left;
  height: 80px;
  border-bottom: 1px #e1e4e8 solid;
  width:240px;
}
.username{
  font-size: 25px;
  font-weight: bold;
  margin: 15px 0 0;
}
.email{
  font-size: 18px;
  font-weight: thin;
  margin:0;
}
.editbtn-container{
  width: 240px;
}
.editbtn{
  margin: 20px 0;
  width:100%;
}
</style>
