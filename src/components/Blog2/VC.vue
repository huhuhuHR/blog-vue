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
      },
      currentSate: {
        type: Number,
        require: true
      }
    },
    methods: {},
    watch: {
      currentSate(newVal, oldVal){
        var _this = this;
        console.log(newVal);
        console.log(newVal);
        if (newVal !== oldVal) {
          if (1 === newVal) {
            this.$refs.cropper.startCrop();
          } else if (2 === newVal) {
            this.$refs.cropper.clearCrop();
            this.$refs.cropper.stopCrop();
            this.base64Image = '';
            this.$emit('getBase64Image', this.base64Image);
          } else if (3 === newVal) {
            // 发送
            this.$refs.cropper.getCropData((data) => {
              // do something
              _this.base64Image = data;
              _this.$emit('getBase64Image', this.base64Image);
              this.$refs.cropper.clearCrop();
              _this.$refs.cropper.stopCrop();
            });
          }
        }
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
