<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <span class="svg-container"><icon-svg icon-class="jiedianyoujian"></icon-svg></span>
        <el-input name="account" type="text" v-model="loginForm.account" autoComplete="on" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container"><icon-svg icon-class="mima"></icon-svg></span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio v-model="radio" label="0">管理员</el-radio>
        <el-radio v-model="radio" label="1">学校</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import { isWscnEmail } from '@/utils/validate';
import { getType, setType } from '@/utils/auth';
  // import socialSign from './socialsignin';
  export default {
    // components: { socialSign },
    name: 'login',
    data() {
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          account: 'admin',
          password: '123456',
          type: '0'
        },
        loginRules: {
          account: [
            { required: true, message: '账号不能为空', trigger: 'blur' }
          ],
          password:[
            { required: true, trigger: 'blur', validator: validatePass }
          ]
        },
        radio: 0,
        loading: false,
        showDialog: false
      }
    },
    mounted(){
      this.getType();
    },
    methods: {
      getType(){
        this.radio = getType() ? 0 : getType();
        console.log(this.radio)
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            setType(this.radio);
            this.loginForm.type = this.radio;
            this.$store.dispatch('Login', this.loginForm).then(res => {
              this.loading = false;
              if(getType() == 0){
                this.$router.push({ path: '/welcome/index' });
              }else{
                this.$router.push({ path: '/student/list' });
              }
              
                // this.showDialog = true;
            }).catch(() => {
              this.loading = false;
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      afterQRScan() {
          // const hash = window.location.hash.slice(1);
          // const hashObj = getQueryObject(hash);
          // const originUrl = window.location.origin;
          // history.replaceState({}, '', originUrl);
          // const codeMap = {
          //   wechat: 'code',
          //   tencent: 'code'
          // };
          // const codeName = hashObj[codeMap[this.auth_type]];
          // if (!codeName) {
          //   alert('第三方登录失败');
          // } else {
          //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
          //     this.$router.push({ path: '/' });
          //   });
          // }
      }
    },
    created() {
        // window.addEventListener('hashchange', this.afterQRScan);
    },
    destroyed() {
        // window.removeEventListener('hashchange', this.afterQRScan);
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
  }
  .login-container {
    @include relative;
    height: 100vh;

    background-image: url(/static/banner/58219a45ecb1088c2f4cb1b24f8cc541.jpg);
    background-size: cover;
    background-color: #2d3a4b;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #eeeeee;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      color: #fff;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #fff;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: #eeeeee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      color: #454545;
    }
    .el-form-item:nth-of-type(2){
      margin-bottom: 0
    }
    .el-form-item:nth-of-type(3){
      background-color: transparent;;
      border: 0 solid;
    }
    .forget-pwd {
      color: #fff;
    }
    .el-radio{
      color:#fff;
    }
  }
</style>