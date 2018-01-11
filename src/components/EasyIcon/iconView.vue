<template>
  <div>
    <i :class="['iconfont', iconName]" ref="icon"></i>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    mounted () {

      this.$refs.icon.fontSize = this.size;
    },
    props: {
      iconName: {
        type: String,
        require: true
      },
      size: {
        type: String,
        reuire: false,
        default: "16px"
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
</style>
