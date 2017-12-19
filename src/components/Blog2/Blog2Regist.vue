<template>
  <div class="regist-root" v-show="registShow">
    <mask-layer></mask-layer>
    <div class="regist">
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
      <button class="btn" @click="toRegist">注册</button>
    </div>
  </div>
</template>
<script>
  import MaskLayer from '../operationDialog/MaskLayer.vue';

  export default {
    data() {
      return {
        userName: '',
        userEmail: '',
        userPassword: ''
      };
    },
    props: {
      registShow: {
        type: Boolean,
        require: true
      }
    },
    computed: {},
    methods: {
      closeRegist: function () {
        this.$emit('closeRegist');
      },
      toRegist: function () {
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
      height: 265px;
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
      .btn {
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
