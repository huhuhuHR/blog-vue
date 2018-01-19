<template>
  <div class="login-root" v-show="loginShow">
    <mask-layer></mask-layer>
    <div class="login" @keyup.enter="goToLogin">
      <div class="login-head">
        <div>登录</div>
        <div @click="closeLogin">
          <i class="iconfont icon-shanchu1"></i>
        </div>
      </div>
      <div class="inputbox">
        <input placeholder="用户名/邮箱" v-model="name"/>
      </div>
      <div class="inputbox">
        <input type="password" placeholder="密码" v-model="password"/>
      </div>
      <div class="error">{{loginError}}</div>
      <button class="btn" @click="goToLogin">登录</button>
    </div>
  </div>
</template>
<script>
  import MaskLayer from '../operationDialog/MaskLayer.vue';

  export default {
    data() {
      return {
        name: '',
        password: ''
      };
    },
    props: {
      loginShow: {
        type: Boolean,
        require: true
      },
      loginError: {
        type: String,
        require: false
      }
    },
    computed: {},
    methods: {
      closeLogin: function () {
        this.$emit('closeLogin');
      },
      goToLogin: function () {
        if (this.name === '') {
          this.$emit('changeLoginError', '用户名不能为空');
          return;
        }
        if (this.password === '') {
          this.$emit('changeLoginError', '密码不能为空');
          return;
        }
        this.$emit('goToLogin', this.name, this.password);
      }
    },
    mounted() {

    },
    filters: {},
    components: {
      MaskLayer
    },
    created() {
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .login-root {
    .login {
      padding: 20px;
      background-color: #ffffff;
      width: 300px;
      height: 265px;
      position: absolute;
      right: 0;
      left: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      z-index: 1002;
      .login-head {
        font-size: 24px;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
      }
      .inputbox {
        position: relative;
        margin-bottom: 20px;
        input {
          padding: 10px;
          width: 100%;
          border: 1px solid #e9e9e9;
          border-radius: 2px;
          outline: none;
          box-sizing: border-box;
        }
      }
      .error {
        color: red;
        position: relative;
        top: -10px;
      }
      .btn {
        cursor:pointer;
        width: 100%;
        height: 40px;
        color: #fff;
        background-color: #007fff;
        border-radius: 2px;
        outline: none;
        box-sizing: border-box;
        cursor: pointer;
      }
    }
  }
</style>
