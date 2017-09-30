<template>
  <div class="rootLogin" ref="myApp">
    <vue-particles
      class="particles"
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
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
  import Vue from 'vue';
  import {setStyle}  from  '../../assets/js/dom';
  import http from '../../http/http';
  import auth from '../../auth';
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
      Vue.nextTick(function () {
        let winowHeight = window.screen.availHeight;
        setStyle(document.getElementById('.particles'), 'height', winowHeight + 'px');
      }.bind(this));
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
          useLoadLayer: true,
          successCallback: function (data) {
            auth.saveCookie(data.cookie, data.id);
            auth.cookie.cookieName = data.cookie;
            console.log(auth.cookie.accountId);
            this.$router.push({path: '/record', query: {'id': data.id}});
          }.bind(this),
          errorCallback: function (data) {
            auth.clearCookie();
            this.error = this.errorList[2];
          }.bind(this)
        });
      },
      exit: function () {
        this.$router.go(-1);
      },
      getWindows: function () {
        this.contentHeight = window.screen.availHeight;
      },
      pageInit: function () {
        let _this = this.$refs.myApp;
        setStyle(_this, 'height', this.clientHeight + 'px');
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .rootLogin {
    .particles {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: url("../../../src/assets/img/1.jpg");
      background-repeat: no-repeat;
      -moz-background-size: 100% 100%;
      background-size: cover;
      background-position: 50% 50%;
    }
    .exit {
      position: relative;
      font-size: 16px;
      color: lightblue;
      margin-top: 10px;
      margin-right: 15px;
      text-align: right;
    }
    .login-box {
      position: relative;
      z-index: 10000;
      border: 1px lightblue;
      padding-top: 30px;
      text-align: center;
      margin-left: 10px;
      margin-right: 10px;
      .title {
        color: lightblue;
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
          position: relative;
          border-radius: 5px;
          border: 1px solid lightblue;
          background-color: lightblue;
          color: #4F4F4F;
          width: 100px;
          right: 15px;
        }
        .input-submit-up {
          position: relative;
          border-radius: 5px;
          border: 1px solid lightblue;
          background-color: lightblue;
          color: #4F4F4F;
          width: 100px;
          left: 40px;
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
      color: lightblue;
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
