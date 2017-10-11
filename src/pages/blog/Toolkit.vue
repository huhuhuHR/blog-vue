<template>
  <div class="toolkit-root">
    aaaa
  </div>
</template>
<script>
  import http from '../../http/http';
  export default{
    data () {
      return {
        id: this.$route.query.id
      };
    },
    methods: {},
    mounted (){
//      console.log(this.id);
    },
    created(){
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .toolkit-root {

  }
</style>
