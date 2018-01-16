<template>
  <div class="user-hasLogin">
    <div class="user-item" @click="deal">
      <i class="iconfont icon-ttpodicon"></i>
      <span>管理</span>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {};
    },
    methods: {
      deal(){
        this.$emit('deal');
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .user-hasLogin {
    margin-bottom: 10px;
    background-color: #ffffff;
    font-size: 16px;
    padding: 10px;
    border-bottom: 1px solid rgba(178, 186, 194, .15);
    .user-info {
      span {
        font-weight: 500;
        color: #b71ed7;
      }
    }
    :last-child {
      margin-bottom: 0 !important;
    }
    .user-item {
      border-top: 1px solid rgba(178, 186, 194, .15);
      border-bottom: 1px solid rgba(178, 186, 194, .15);
      border-radius: 2px;
      padding: 10px 0;
      margin-bottom: 2px;
      font-size: 16px;
      color: #007fff;
      i {
        font-size: 16px;
        color: #000000;
        margin-right: 5px;
      }
    }
  }
</style>
