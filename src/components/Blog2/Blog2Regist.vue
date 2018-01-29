<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="regist-root" v-show="registShow">
    <mask-layer></mask-layer>
    <div class="regist" @keyup.enter="toRegist">
      <div class="regist-head">
        <div>注册</div>
        <div @click="closeRegist">
          <i class="iconfont icon-shanchu1"></i>
        </div>
      </div>
      <div class="inputbox">
        <input placeholder="请输入用户名" v-model="userName"/>
      </div>
      <div class="inputbox">
        <input placeholder="请输入邮箱" v-model="userEmail"/>
      </div>
      <div class="inputbox">
        <input type="password" placeholder="密码" v-model="userPassword"/>
      </div>
      <div class="inputbox">
        <input type="password"
               placeholder="重复密码"
               v-model="userPasswordRepeat"
               v-on:blur="checkPassword"/>
      </div>
      <div class="error">{{error}}</div>
      <button class="btn" @click="toRegist">注册</button>
    </div>
  </div>
</template>
<script>
  import MaskLayer from '../operationDialog/MaskLayer.vue';
  import {checkEmail} from '../../utils/CommonUtils';

  export default {
    data() {
      return {
        userName: '',
        userEmail: '',
        userPassword: '',
        userPasswordRepeat: ''
      };
    },
    props: {
      registShow: {
        type: Boolean,
        require: true
      },
      error: {
        type: String,
        require: false
      }
    },
    watch: {
      userName(newVal, oldVal) {
        this.hasChage(newVal, oldVal);
      },
      userEmail(newVal, oldVal) {
        this.hasChage(newVal, oldVal);
      },
      userPassword(newVal, oldVal) {
        this.hasChage(newVal, oldVal);
      },
      userPasswordRepeat(newVal, oldVal) {
        this.hasChage(newVal, oldVal);
      }
    },
    methods: {
      hasChage(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$emit('changeError', '');
        }
      },
      checkPassword() {
        if (this.userPassword != this.userPasswordRepeat) {
          this.$emit('changeError', '密码不一致!');
        } else {
          this.$emit('changeError', '');
        }
      },
      closeRegist: function () {
        this.$emit('closeRegist');
      },
      toRegist: function () {
        if (this.userPassword != this.userPasswordRepeat) {
          this.$emit('changeError', '密码不一致!');
          return;
        }
        if (!this.userName) {
          console.log('用户名');
          this.$emit('changeError', '用户名不能为空！');
          return;
        }
        if (!this.userEmail) {
          console.log('邮件名');
          this.$emit('changeError', '邮件名不能为空！');
          return;
        }
        if (!this.userPassword) {
          console.log('密码');
          this.$emit('changeError', '密码不能为空！');
          return;
        }
        if (!checkEmail(this.userEmail)) {
          this.$emit('changeError', '不合法邮件地址！');
          return;
        }
        this.$emit('regist', this.userName, this.userEmail, this.userPassword);
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
  .regist-root {
    .regist {
      padding: 20px;
      background-color: #ffffff;
      width: 300px;
      height: 320px;
      position: absolute;
      right: 0;
      left: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      z-index: 1002;
      .regist-head {
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
        cursor: pointer;
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
