<template>
  <div class="person-info-item">
    <div>昵称：</div>
    <div>昵称：</div>
    <div>简介：</div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        msg: ''
      };
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .person-info-item {
    padding: 20px;
    background-color: #ffffff;
    width: 800px;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    z-index: 1002;
  }
</style>
