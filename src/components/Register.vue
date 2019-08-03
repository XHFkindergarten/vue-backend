<template>
  <div class="header-padding" style="position:relative;">
    <img class="bg" src="https://img.xhfkindergarten.cn/deskwallpaper1.jpg" alt="background" />
    <!-- <Favicon bird="boxer" style="margin-bottom:30px;" title="Register"></Favicon> -->
    <el-row>
      <el-col
        :lg="{span:12,offset:6}"
        :md="{span:8,offset:8}"
        :sm="{span:8,offset:8}"
        :xs="{span:24}"
      >
        <div class="form-container">
          <div class="title">Register</div>
          <el-form
            :model="registerForm"
            ref="registerForm"
            :rules="registerRules"
            status-icon
            hide-required-asterisk
          >
            <div class="label">Email</div>
            <el-form-item prop="email">
              <el-input v-model="registerForm.email" placeholder="请输入注册邮箱"></el-input>
            </el-form-item>
            <div style="margin-top:40px">
              <button
                type="button"
                class="send-email-btn"
                @click="sendMail"
                :disabled="hasSend"
                round
              >{{sendBtnWord?`请在${timeout}s后重试`:'Send Code'}}</button>
            </div>
            <!-- <div>
              <el-button
                @click="sendMail"
                type="primary"
                :disabled="hasSend"
                round
              >{{sendBtnWord?`请在${timeout}s后重试`:'收取验证码'}}</el-button>
            </div> -->
            <div class="label">Code</div>
            <el-form-item prop="emailcode">
              <div class="code-input-container">
                <el-input
                  ref="code1"
                  v-model="registerForm.code1"
                  class="code-input"
                  type="text"
                  maxlength="1"
                ></el-input>
                <el-input
                  ref="code2"
                  v-model="registerForm.code2"
                  class="code-input"
                  type="text"
                  maxlength="1"
                ></el-input>
                <el-input
                  ref="code3"
                  v-model="registerForm.code3"
                  class="code-input"
                  type="text"
                  maxlength="1"
                ></el-input>
                <el-input
                  ref="code4"
                  v-model="registerForm.code4"
                  class="code-input"
                  type="text"
                  maxlength="1"
                ></el-input>
                <el-input
                  ref="code5"
                  v-model="registerForm.code5"
                  class="code-input"
                  type="text"
                  maxlength="1"
                ></el-input>
                <el-input
                  ref="code6"
                  v-model="registerForm.code6"
                  class="code-input"
                  type="text"
                  maxlength="1"
                ></el-input>
              </div>
            </el-form-item>
            <div class="label">Username</div>
            <el-form-item prop="name">
              <el-input v-model="registerForm.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <div class="label">Password</div>
            <el-form-item prop="password">
              <el-input
                type="password"
                autocomplete="off"
                v-model="registerForm.password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <div class="label">Repeat Password</div>
            <el-form-item prop="password2">
              <el-input
                type="password"
                autocomplete="off"
                v-model="registerForm.password2"
                placeholder="请再次输入密码"
              ></el-input>
            </el-form-item>
            <button
              type="button"
              class="send-email-btn"
              @click="register"
              size="medium"
            >C o m f i r m</button>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <!-- <el-form
      :model="registerForm"
      ref="registerForm"
      :rules="registerRules"
      status-icon
      hide-required-asterisk
      >
        <el-row class="row">
            <el-col
              :lg={span:6,offset:9}
              :md={span:8,offset:8}
              :sm={span:8,offset:8}
              :xs={span:18,offset:3}>
                <el-form-item prop="email" label="邮箱">
                    <el-input v-model="registerForm.email" placeholder="请输入注册邮箱"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="3"
              :xs={span:12,offset:6}>
              <div class="hidden-xs-only" style="margin-left:10px;margin-top:40px">
                <el-button @click="sendMail" type="primary" :disabled="hasSend" round>{{sendBtnWord?`请在${timeout}s后重试`:'收取验证码'}}</el-button>
              </div>
              <div class="hidden-sm-and-up" style="margin-left:10px;">
                <el-button @click="sendMail" type="primary" :disabled="hasSend" round>{{sendBtnWord?`请在${timeout}s后重试`:'收取验证码'}}</el-button>
              </div>
            </el-col>
        </el-row>
        <el-row v-if="hasSend" style="margin-top:30px;">
          <el-col
              :lg={span:6,offset:9}
              :md={span:8,offset:8}
              :sm={span:8,offset:8}
              :xs={span:18,offset:3}
              >
            <el-form-item prop="emailcode" label="验证码">
              <div class="code-input-container">
                <el-input ref="code1" v-model="registerForm.code1" class="code-input" type="text" maxlength="1"></el-input>
                <el-input ref="code2" v-model="registerForm.code2" class="code-input" type="text" maxlength="1"></el-input>
                <el-input ref="code3" v-model="registerForm.code3" class="code-input" type="text" maxlength="1"></el-input>
                <el-input ref="code4" v-model="registerForm.code4" class="code-input" type="text" maxlength="1"></el-input>
                <el-input ref="code5" v-model="registerForm.code5" class="code-input" type="text" maxlength="1"></el-input>
                <el-input ref="code6" v-model="registerForm.code6" class="code-input" type="text" maxlength="1"></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
            <el-col
              :lg={span:6,offset:9}
              :md={span:8,offset:8}
              :sm={span:8,offset:8}
              :xs={span:18,offset:3}>
                <el-form-item prop="name" label="用户名">
                    <el-input v-model="registerForm.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col
              :lg={span:6,offset:9}
              :md={span:8,offset:8}
              :sm={span:8,offset:8}
              :xs={span:18,offset:3}>
                <el-form-item prop="password" label="密码">
                    <el-input type="password" autocomplete="off" v-model="registerForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col
              :lg={span:6,offset:9}
              :md={span:8,offset:8}
              :sm={span:8,offset:8}
              :xs={span:18,offset:3}>
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
    </el-form>-->
  </div>
</template>
<script>
import Favicon from "@/layouts/Favicon";
import Utils from "@/tools/utils";
import keys from "@/common";
export default {
  created() {},
  components: {
    Favicon
  },
  data() {
    return {
      // 登录的输入表单
      registerForm: {
        email: "",
        name: "",
        password: "",
        password2: "",
        // 输入的验证码
        code1: "",
        code2: "",
        code3: "",
        code4: "",
        code5: "",
        code6: ""
      },
      // 注册表单校验规则
      registerRules: {
        email: [
          { required: true, message: "登录邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不合法", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password2: [
          { required: true, message: "请再次输入密码", trigger: "blur" }
        ]
      },
      // 是否已发送邮件
      hasSend: false,
      // 发送邮件的时间间隔
      timeout: keys.sendEmailWaitTime,
      // 修改发送邮件按钮文字
      sendBtnWord: false
    };
  },
  watch: {
    "registerForm.code1": function() {
      this.$refs.code2.focus();
    },
    "registerForm.code2": function() {
      this.$refs.code3.focus();
    },
    "registerForm.code3": function() {
      this.$refs.code4.focus();
    },
    "registerForm.code4": function() {
      this.$refs.code5.focus();
    },
    "registerForm.code5": function() {
      this.$refs.code6.focus();
    }
  },
  methods: {
    // 注册 @click
    register: function() {
      // 邮箱验证码校验是否通过
      if (!this.isEmailCodeRight) {
        this.$message.error(
          "对不起，您输入的验证码与发送到您邮箱中的验证码不一致"
        );
        return;
      }
      const app = this;
      // 表单校验
      this.$refs["registerForm"].validate(async valid => {
        if (valid) {
          const res = await app.$store
            .dispatch("registerAction", this.registerForm)
            .catch(err => {
              console.log(err);
            });
          if (res.status == 200 && res.data.success) {
            this.$message({
              message: "注册成功",
              type: "success"
            });
            this.$router.push("/login");
          }
        }
      });
    },
    // 发送验证邮件
    sendMail: function() {
      if (!Utils.isEmail(this.registerForm.email)) {
        this.$message.error("请输入正确的邮箱");
        return;
      }
      this.$store
        .dispatch("sendemailAction", this.registerForm.email)
        .then(res => {
          if (res.data.success) {
            // 修改按钮文字
            this.sendBtnWord = true;
            // 按钮disable
            this.hasSend = true;
            // 倒计时60s内不允许再次点击
            const timer = setInterval(() => {
              this.timeout--;
              if (this.timeout == 0) {
                clearInterval(timer);
                this.sendBtnWord = false;
                this.timeout = keys.sendEmailWaitTime;
              }
            }, 1000);
            this.$store.commit("setEmailCode", res.data.code);
            this.$nextTick(() => {
              this.$refs.code1.focus();
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          throw new Error(err);
        });
    },

    //
    handleChange() {
      alert("change");
    }
  },
  computed: {
    // 邮箱验证码是否正确
    isEmailCodeRight() {
      const code = localStorage.getItem("email-code");
      const input =
        this.registerForm.code1 +
        this.registerForm.code2 +
        this.registerForm.code3 +
        this.registerForm.code4 +
        this.registerForm.code5 +
        this.registerForm.code6;
      if (code === input) {
        return true;
      } else {
        return false;
      }
    }
  },
  directives: {
    focus: {
      update: function(el) {
        el.focus();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.form-container {
  // margin-top: 40px;
  background: #fff;
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
.send-email-btn {
  width: 10rem;
  height: 2.6rem;
  font-size: 16px;
  border: none;
  outline: none;
  background: rgb(255, 0, 13);
  color: #FFF;
  font-family: ADAM;
  line-height: 2.6rem;
  cursor: pointer;
}
// input {
//   // opacity: 0.4;
//   background: #000;
// }

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
.code-input {
  width: 45px;
  text-align: center;
}
.code-input-container {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
