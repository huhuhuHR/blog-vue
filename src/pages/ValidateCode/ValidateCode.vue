<template>
  <div class="validateCode-root">
    {{imgData}}
  </div>
</template>
<script>
  import http from '../../http/http';
  export default{
    data () {
      return {
        imgData: ''
      };
    },
    created(){
      http.api({
        url: '/huhuhu/toLogin/getValidateCode',
        emulateJSON: true,
        successCallback: function (data) {
          this.imgData = './' + data.result;
        }.bind(this),
        errorCallback: function (data) {
        }.bind(this)
      });
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
</style>
