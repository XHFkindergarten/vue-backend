<template>
  <div class="header-padding" style="position:relative;">
    <img class="bg" src="https://img.xhfkindergarten.cn/seawallpaper.jpg" alt="background">
    <el-row>
      <el-col
        :lg="{span:12,offset:6}"
        :md="{span:8,offset:8}"
        :sm="{span:8,offset:8}"
        :xs="{span:24}"
        >
        <div class="form-container">
          <div class="title">Login</div>
          <el-form
          :model="loginForm"
          ref="loginForm"
          :rules="loginRules"
          status-icon
          >
            <div class="label">Email</div>
            <el-form-item prop="email">
                <el-input v-model="loginForm.email" placeholder="请输入登录邮箱"></el-input>
            </el-form-item>
            <div class="label">Password</div>
            <el-form-item prop="password">
                <el-input type="password" autocomplete="off" v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <button class="login-button" @keyup.enter.native="login" @click="login">L o g i n</button>
        </el-form>
        </div>
      </el-col>
    </el-row>
    <!-- <el-form
      :model="loginForm"
      ref="loginForm"
      :rules="loginRules"
      status-icon
      >
        <el-row class="row">
            <el-col
              :lg={span:6,offset:9}
              :md={span:6,offset:9}
              :sm={span:8,offset:8}
              :xs={span:16,offset:4}
              >
                <el-form-item prop="email">
                    <el-input v-model="loginForm.email" placeholder="请输入登录邮箱"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col
              :lg={span:6,offset:9}
              :md={span:6,offset:9}
              :sm={span:8,offset:8}
              :xs={span:16,offset:4}>
                <el-form-item prop="password">
                    <el-input type="password" autocomplete="off" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="10" :offset="7">
                <el-button class="login-button" @keyup.enter.native="login" @click="login" type="primary" size="medium">Login</el-button>
            </el-col>
        </el-row>
    </el-form> -->
  </div>
</template>
<script>
import Favicon from '@/layouts/Favicon'
import Cookies from 'js-cookie'
export default {
    name: 'Login',
    components: {
      Favicon
    },
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
                    console.log(res.data.token === Cookies.get('login-token'))
                    this.$router.push('/')
                  } else {
                    console.log(res.data)
                    this.$message.error(res.data.msg)
                  }
                })
                .catch (err => {
                  console.log(err)
                  this.$message.error(err.message)
                  if (err.message !== 'password wrong') {
                    this.$refs.loginForm.resetFields()
                  } else {
                    this.loginForm.password = ''
                  }
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
@big-header-height: 80px;
@small-header-height: 60px;
@media screen and (min-width: 992px) {
  .header-padding {
    padding-top: @big-header-height;
  }
  .bg {
    width: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .form-container {
    margin-top: 40px;
    border: 3px solid #eee;
    padding: 60px 20%;
  }
}
@media screen and (max-width: 992px) {
  .header-padding {
    padding-top: @small-header-height;
  }
  .bg {
    width: 100%;
    object-fit: cover;
  }
  .form-container {
    margin-top: 0;
    padding: 60px 40px;
  }
}
.form-container {
  background: #FFF;
  .title {
    font-family: Circular_black;
    font-size: 40px;
    margin-bottom: 30px;
  }
  .label {
    font-family: Circular_black;
    font-size: 20px;
    text-align: left;
  }
}
.row {
    margin-bottom: 20px;
}
.login-button {
  width: 10rem;
  height: 2.6rem;
  font-size: 16px;
  border: none;
  outline: none;
  background: #409EFF;
  color: #FFF;
  font-family: ADAM;
  line-height: 2.6rem;
  cursor: pointer;
}


</style>
