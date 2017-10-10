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
    margin: 20px 30px 20px 30px;
    color: #06addd;
    i {
      font-size: 30px;
    }
  }
</style>
