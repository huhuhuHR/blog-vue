<template>
  <div class="goBack">
    <i class="iconfont icon-fanhui" @click="goBack()"></i>
    <i class="iconfont icon-zhuye" @click="goHome()"></i>
  </div>
</template>
<script>
  export default{
    data () {
      return {};
    },
    methods: {
      goBack() {
        this.$emit('goBack');
      },
      goHome(){
        this.$emit('goHome');
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .goBack {
    display: flex;
    justify-content: space-between;
    padding: 20px 30px 20px 30px;
    border-bottom: 1px dashed #8c8c8c;
    color: #8ec31e;
    i {
      cursor: pointer;
      font-size: 30px;
    }
    .icon-zhuye {
      color: red;
    }
  }
</style>
