<template>
  <div class="root" ref="myApp">
    <div class="exit" @click="exit">退出</div>
    <div class="login-box">
      <div class="title">
        <h1>欢迎</h1>
      </div>
      <div class="login-logo">
        <i class="iconfont icon-denglu"></i>
      </div>
      <div>
        <div class="input-name">
          <i class="iconfont icon-xingming"></i>
          <input type="text" v-model="name" placeholder="请输入姓名"/>
        </div>
        <div class="input-password">
          <i class="iconfont icon-mima"></i>
          <input type="password" v-model="password" placeholder="请输入密码"/>
          <i class="iconfont icon-wangjimima" @click="getPasswordBack"></i>
        </div>
      </div>
      <div class="to-operation">
        <div class="input-submit-in" @click="login">登录</div>
        <div class="input-submit-up">注册</div>
      </div>
    </div>
    <div class="error">{{error}}</div>
  </div>
</template>
<script>
  import {setStyle} from '../../assets/js/dom';
  import http from '../../http/http';
  export default{
    data () {
      return {
        contentHeight: '',
        name: '',
        password: '',
        errorList: ['姓名为空', '密码为空', '密码错误'],
        error: '',
        index: 0
      };
    },
    created () {
      this.getWindows();
    },
    mounted (){
      this.pageInit();
    },
    watch: {
      name: function () {
        if (this.error === '姓名为空' || this.error === '密码错误') {
          this.error = '';
        }
      },
      password: function () {
        if (this.error === '密码为空' || this.error === '密码错误') {
          this.error = '';
        }
      }
    },
    methods: {
      getPasswordBack: function () {
        console.log('找密码');
      },
      login: function () {
        if (this.name === '') {
          this.error = this.errorList[0];
          return false;
        }
        if (this.password === '') {
          this.error = this.errorList[1];
          return false;
        }
        let condition = Object.assign({}, {'name': this.name}, {'password': this.password});
        http.api({
          url: '/huhuhu/toLogin/login',
          params: condition,
          emulateJSON: true,
          successCallback: function (data) {
            this.error = data.result;
            //todo  跳落地页
          }.bind(this),
          errorCallback: function (data) {
            this.error = this.errorList[2];
          }.bind(this)
        });
      },
      exit: function () {
        console.log('1111');
        this.$router.go(-1);
      },
      getWindows: function () {
        this.contentHeight = window.screen.availHeight;
      },
      pageInit: function () {
        let _this = this.$refs.myApp;
        console.log(_this);
        setStyle(_this, 'height', this.contentHeight + 'px');
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .root {
    background-color: #ffffff;
    .exit {
      font-size: 16px;
      position: fixed;
      right: 60px;
      top: 30px;
      color: #2097f3;

    }
    .login-box {
      padding-top: 90px;
      text-align: center;
      margin-left: 10px;
      margin-right: 10px;
      .title {
        color: #2097f3;
      }
      .login-logo {
        margin-top: 40px;
        margin-bottom: 40px;
        .icon-denglu {
          font-size: 50px;
        }
      }
      .input-name {
        margin-bottom: 40px;
      }
      .input-password {
        margin-bottom: 60px;
        position: relative;
        left: 12px;
      }
      .forget {
        text-align: left !important;
        margin-left: 100px;
      }
      .to-operation {
        display: flex;
        justify-content: center;
        font-size: 16px;
        .input-submit-in {
          border-radius: 5px;
          border: 1px solid #2097f3;
          background-color: #2097f3;
          color: #ffffff;
          margin-right: 50px;
          width: 100px;
        }
        .input-submit-up {
          border-radius: 5px;
          border: 1px solid #2097f3;
          background-color: #2097f3;
          color: #ffffff;
          width: 100px;
        }
      }
    }
    input {
      border-radius: 5px;
      width: 230px;
      height: 30px;
      font-size: 14px;
      outline: none;
      border: 1px solid #b7b7b7;
      line-height: 30px;
      padding-left: 28px;
    }
    .iconfont {
      color: #2097f3;
    }
    .error {
      color: red;
      width: 100px;
      margin: auto;
      position: relative;
      left: -74px;
      top: 20px;
      font-size: 16px;
    }
  }
</style>
