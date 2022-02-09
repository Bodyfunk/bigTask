<template>
  <div class="login">
    <el-tabs type="border-card" class="borderCard">
      <el-tab-pane label="扫码登陆">
          <wxLogin />    
      </el-tab-pane>
      <el-tab-pane label="手机登陆">
        <div class="phonelogin">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">工业设备后台管理系统</h3>
      <el-form-item prop="userphone">
        <el-input v-model="loginForm.userphone" type="text" auto-complete="off" placeholder="手机号">
          <svg-icon slot="prefix" icon-class="phone" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="手机验证码"
          style="width: 63%"
          @keyup.enter.native="handleLoginByPhone"
        >
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <!-- <img :src="codeUrl" @click="getCode" class="login-code-img"/> -->
          <el-button type="primary" @click="submitForm()" :disabled="isDisabled" class="login-code-button">{{buttonName}}</el-button>
        </div>
      </el-form-item>
      <!-- <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox> -->
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLoginByPhone"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        
      </el-form-item>
    </el-form>
        </div>
      </el-tab-pane>

    </el-tabs>
    <div class="el-login-footer">
      <span>Copyright © 2018-2021 zzzqi&Cy All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
import { getCodeImg, getPhoneCode } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt';
import wxLogin from "./wxlogin";


export default {
  name: "Login",
  components:{wxLogin},
  data() {
    return {
      buttonName: "发送短信",
      isDisabled: false,
      RemainingTime: 60,
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        userphone: "",
        username: "admin",
        password: "admin123",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" }
        ],
        userphone: [
          {required: false, trigger: "blur", message: "请输入您的手机号码"}
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" }
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }]
      },
      loading: false,
      // 验证码开关
      captchaOnOff: false,
      // 注册开关
      register: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    // this.getCode();
    // this.getCookie();
  },
  methods: {
    submitForm () {
      // 调用全局方法校验手机号
      if (!this.validPhone(this.loginForm.userphone)) {
        this.$modal.msgError("手机格式不正确");
      } else {
        // return this.$modal.msgSuccess("手机格式正确");
        let me = this;
        let mobile = me.loginForm.userphone;
        // console.log(mobile);
        // 调用接口发送手机验证码
        getPhoneCode(mobile).then(Response => {
        })
        // 按钮灰掉，60s重新发送
        this.isDisabled = true;
        let interval = window.setInterval(function() {
          console.log(me.RemainingTime)
          me.buttonName = '(' + me.RemainingTime + '秒)';
          -- me.RemainingTime;
          if(me.RemainingTime === 0) {
            me.buttonName = "重新发送";
            me.RemainingTime = 60;
            me.isDisabled = false;
            window.clearInterval(interval);
          }
        }, 1000);

      }
    },

    // 手机验证码登陆
    handleLoginByPhone() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("userphone", this.loginForm.userphone, { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("userphone");
            Cookies.remove('rememberMe');
          }
          let longinData = {
            mobile: this.loginForm.userphone,
            code: this.loginForm.code
          };
          this.$store.dispatch("PhoneLogin", longinData).then(() => {
            this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
          }).catch(() => {
            this.loading = false;
          });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
// .wxlogin {
//   width: 400px;
// }

.login {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}

.head {
  position:absolute;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 2px 1px #e2e2e2;
}

.ruideerlogo {
  vertical-align: middle;
  margin-left: 40px;
  margin-bottom: 5px;
}

.ruideer {
  font-weight: 600;
  line-height: 50px;
  font-size: 20px;
  color: #666666;
  display: inline-block;
  // position: absolute;
  // left: 110px;
  }

.borderCard {
  border-radius: 20px;
  margin-right: 50px;
}

.el-tabs--border-card > .el-tabs__header {
  background-color: rgba($color: #000000, $alpha: 0);
}

.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  background-color: rgba($color: #000000, $alpha: 0);
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: hsl(0, 0%, 100%);
  width: 400px;
  padding: 25px 25px 45px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.login-code-button {
  width: 100%
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: #2e2e40;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
.phonelogin {
  width: 400px;
  height: 403px;
  padding: 30px 0px;
}
</style>
