<template>
  <div class="edit-item">
    <VE :content="content" @changeText="changeText" :height="height"></VE>
  </div>
</template>
<script>
  import  VE from '../../components/vueEdit/VueEdit.vue'
  export default{
    data () {
      return {
        content: '',
        height: 400
      };
    },
    components: {
      VE
    },
    methods: {
      changeText (val) {
        this.content = val;
        console.log(this.content);
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
</style>
