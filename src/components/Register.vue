<template>
  <div>
    <img src="../assets/scutLOGO.png">
    <h1>Register</h1>
    <el-form
      :model="registerForm"
      ref="registerForm"
      :rules="registerRules"
      status-icon
      hide-required-asterisk
      >
        <el-row class="row">
            <el-col :span="6" :offset="9">
                <el-form-item prop="email" label="邮箱">
                    <el-input v-model="registerForm.email" placeholder="请输入注册邮箱"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="3">
              <div class="button-container">
                <el-button @click="sendMail" type="primary" :disabled="hasSend" round>{{sendBtnWord?`请在${timeout}s后重试`:'发送邮件'}}</el-button>
              </div>
            </el-col>
        </el-row>
        <el-row v-if="hasSend" style="margin-top:30px;">
          <el-col :span="6" :offset="9">
            <el-form-item prop="emailcode" label="验证码">
              <div class="code-input-container">
                <el-input v-model="registerForm.code1" class="code-input" type="text" maxlength="1"></el-input>
                <el-input v-model="registerForm.code2" class="code-input" type="text" maxlength="1"></el-input>
                <el-input v-model="registerForm.code3" class="code-input" type="text" maxlength="1"></el-input>
                <el-input v-model="registerForm.code4" class="code-input" type="text" maxlength="1"></el-input>
                <el-input v-model="registerForm.code5" class="code-input" type="text" maxlength="1"></el-input>
                <el-input v-model="registerForm.code6" class="code-input" type="text" maxlength="1"></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="6" :offset="9">
                <el-form-item prop="name" label="用户名">
                    <el-input v-model="registerForm.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="6" :offset="9">
                <el-form-item prop="password" label="密码">
                    <el-input type="password" autocomplete="off" v-model="registerForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="6" :offset="9">
                <el-form-item prop="password2" label="重复输入密码">
                    <el-input type="password" autocomplete="off" v-model="registerForm.password2" placeholder="请再次输入密码"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="6" :offset="9">
                <el-button class="register-button" round @click="register" type="primary" size="medium">register</el-button>
            </el-col>
        </el-row>
    </el-form>
  </div>
</template>
<script>
import Utils from '@/tools/utils'
import keys from '@/common'
export default {
  created() {
    console.log(this.$refs)
  },
  data() {
    return {
      // 登录的输入表单
      registerForm: {
        email: '',
        name: '',
        password: '',
        password2: '',
        // 输入的验证码
        code1:'',
        code2:'',
        code3:'',
        code4:'',
        code5:'',
        code6:'',
      },
      // 注册表单校验规则
      registerRules: {
        email: [
          { required: true, message: '登录邮箱不能为空', trigger: 'blur'},
          { type: 'email', message: '邮箱格式不合法', trigger: 'blur'}
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur'}
        ],
        password2: [
          { required: true, message: '请再次输入密码', trigger: 'blur'}
        ]
      },
      // 是否已发送邮件
      hasSend: false,
      // 发送邮件的时间间隔
      timeout: keys.sendEmailWaitTime,
      // 修改发送邮件按钮文字
      sendBtnWord: false
    }
  },
  methods: {
    // 注册 @click
    register: function() {
      console.log(this.isEmailCodeRight)
      if (!this.isEmailCodeRight) {
        this.$message.error('对不起，您输入的验证码与发送到您邮箱中的验证码不一致')
        return
      }
      const app = this
      this.$refs['registerForm'].validate(valid => {
        if(valid) {
          app.$store.dispatch('registerAction',this.registerForm)
            .then(res => {
              console.log(res)
              if(res.status==200&&res.data.success) {
                this.$message({
                  message: '注册成功',
                  type: 'success'
                })
                this.$router.push('/login')
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    // 发送验证邮件
    sendMail: function() {
      if (!Utils.isEmail(this.registerForm.email)) {
        this.$message.error('请输入正确的邮箱')
        return
      }
      this.$store.dispatch('sendemailAction', this.registerForm.email)
        .then(res => {
          if (res.data.success) {
            // 修改按钮文字
            this.sendBtnWord = true
            // 按钮disable
            this.hasSend = true
            // 倒计时60s内不允许再次点击
            const timer = setInterval(() => {
              this.timeout--
              if(this.timeout==0){
                clearInterval(timer)
                this.sendBtnWord = false
                this.timeout = keys.sendEmailWaitTime
                this.hasSend = false
              }
            }, 1000)
            this.$store.commit('setEmailCode', res.data.code)
          } else {
            this.$message.error(res.data.msg)
            // clearInterval(timer)
            // this.timeout = keys.sendEmailWaitTime
            // this.sendBtnWord = false
            // this.hasSend = false
          }
        })
        .catch(err => {
          throw new Error(err)
        })
    }
  },
  computed: {
    isEmailCodeRight() {
      const code = localStorage.getItem('email-code')
      const input = this.registerForm.code1+
        this.registerForm.code2+
        this.registerForm.code3+
        this.registerForm.code4+
        this.registerForm.code5+
        this.registerForm.code6
      if (code===input) {
        return true
      } else {
        return false
      }
    }
  },
  directives: {
    focus: {
      update: function(el) {
        el.focus()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.button-container{
  margin-top: 40px;
}
.code-input{
  width:45px;
}
.code-input-container{
  width:100%;
  display:flex;
  justify-content: space-around;
}
</style>
