<template>
  <div class="article-root">
    aaaa
  </div>
</template>
<script>
  export default{
    data () {
      return {
        id: this.$route.query.id
      };
    },
    methods: {},
    mounted (){
      console.log(this.id);
    },
    created(){
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .article-root {

  }
</style>
