<template>
  <div>
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
                <el-button class="register-button" @click="register" type="primary" size="medium">register</el-button>
            </el-col>
        </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 登录的输入表单
      registerForm: {
        email: '',
        name: '',
        password: '',
        password2: ''
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
      }
    }
  },
  methods: {
    // 注册 @click
    register: function() {
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
    }
  }
}
</script>
<style lang="less" scoped>

</style>
