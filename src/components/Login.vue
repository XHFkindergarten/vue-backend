<template>
  <div>
    <img src="../assets/scutLOGO.png">
    <h1>Login</h1>
    <el-form
      :model="loginForm"
      ref="loginForm"
      :rules="loginRules"
      status-icon
      >
        <el-row class="row">
            <el-col :span="6" :offset="9">
                <el-form-item prop="email">
                    <el-input v-model="loginForm.email" placeholder="请输入登录邮箱"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="6" :offset="9">
                <el-form-item prop="password">
                    <el-input type="password" autocomplete="off" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="6" :offset="9">
                <el-button class="login-button" @keyup.enter.native="login" @click="login" type="primary" size="medium">Login</el-button>
            </el-col>
        </el-row>
    </el-form>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
    name: 'Login',
    data () {
        return {
            // 登录表单数据
            loginForm: {
                email: '',
                password: ''
            },
            // 登录表单校验规则
            loginRules: {
                email: [
                    { required: true, message: '登录邮箱不能为空', trigger: 'blur'},
                    { type: 'email', message: '邮箱格式不合法', trigger: 'blur'}
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        // Login按钮 @click
        login: function() {
          const app = this
          this.$refs['loginForm'].validate(valid => {
            if(valid) {
              app.$store.dispatch('loginAction', {
                email: this.loginForm.email,
                password: this.loginForm.password
              })
                .then (res => {
                  if (res.status==200&&res.data.success) {
                    Cookies.set('login-token', res.data.token, { expires: 1 })
                    this.$router.push('/')
                  } else {
                    this.$message.error(res.data.msg)
                  }
                })
                .catch (err => {
                  this.$message.error(err.message)
                  this.$refs.loginForm.resetFields()
                })
            }else {
              // TODO 未通过校验
              console.log('invalid')
            }
          })
        }
    },
    created: function() {
        var _this = this;
        document.onkeydown = function(e) {
            let key = e.keyCode;
            if (key==13) {
              _this.login()
            }
        };
    },
}
</script>
<style lang="less" scoped>
.row {
    margin-bottom: 20px;
}
.login-button {
    width:120px;
    height:50px;
    border-radius: 25px;
}
</style>
