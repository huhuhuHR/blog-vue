<template>
  <div class="vc-item">
    <vueCropper
      ref="cropper"
      :img="baseImage"
      :outputSize="outputSize"
      :outputType="outputType"
      :fixedNumber="fixedNumber"
      :fixed="fixed"
    ></vueCropper>
  </div>
</template>
<script>
  import VueCropper from "vue-cropper";
  export default{
    data () {
      return {
        outputSize: 0,
        outputType: 'png|jpe?g',
        base64Image: '',
        fixedNumber: [1, 1],
        fixed: true
      };
    },
    components: {
      VueCropper
    },
    props: {
      baseImage: {
        type: String,
        require: true
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .vc-item {
    width: 340px;
    height: 340px;
  }
</style>
