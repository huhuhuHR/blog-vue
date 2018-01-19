<template>
  <div class="vueScropper-item">
    <div v-show="false">
      <img src="../blog2.0/1.jpeg" ref="myImage"/>
    </div>
    <div class="cut" v-show="!showPre">
      <vueCropper
        ref="cropper"
        :img="sourceImage"
        :outputSize="outputSize"
        :outputType="outputType"
        :fixedNumber="fixedNumber"
        :fixed="fixed"
      ></vueCropper>
    </div>
    <div class="cut" v-show="showPre">
      <img :src="base64Image"/>
    </div>
    <div class="flex-box" v-if="!startTag">
      <div class="item" @click="start">开始截图</div>
    </div>
    <div class="flex-box" v-if="startTag">
      <div class="item" @click="cancel">取消截图</div>
      <div class="item" @click="proportion(1)">1:1</div>
      <div class="item" @click="proportion(2)">2:1</div>
      <div class="item" @click="proportion(3)">3:4</div>
      <div class="item" @click="proportion(4)">自定义</div>
      <div class="item" @click="rigth">向右边旋转90度</div>
      <div class="item" @click="left">向左边旋转90度</div>
      <div class="item" @click="getBase64" v-if="!showPre">预览</div>
      <div class="item" @click="cancelShowPre" v-if="showPre">取消预览</div>
    </div>
  </div>
</template>
<script>
  import VueCropper from "vue-cropper";
  export default{
    data () {
      return {
        sourceImage: '',
        outputSize: 0,
        outputType: 'png|jpe?g',
        url: '/nginximage/picture.png',
        base64Image: '',
        fixedNumber: [1, 1],
        fixed: true,
        showPre: false,
        startTag: false
      };
    },
    methods: {
      proportion(val){
        if (val === 1) {
          this.fixedNumber = [1, 1];
          this.$refs.cropper.cropH = this.$refs.cropper.cropW;
        } else if (val === 2) {
          this.fixedNumber = [2, 1];
          this.$refs.cropper.cropH = this.$refs.cropper.cropW / 2;
        } else if (val === 3) {
          this.$refs.cropper.cropH = (this.$refs.cropper.cropW * 4) / 3;
        } else if (val === 4) {
          this.fixed = false;
        }
      },
      left () {
        this.$refs.cropper.rotateLeft();
      },
      rigth (){
        this.$refs.cropper.rotateRight();
      },
      cancel(){
        this.remove();
        this.stop();
        this.base64Image = '';
        this.startTag = false;
        this.showPre = false;
        this.fixedNumber = [1, 1];
        this.fixed = true;
      },
      cancelShowPre () {
        this.showPre = false;
      },
      getBase64 () {
        if (this.base64Image) {
          this.showPre = true;
          return;
        }
        if (!this.startTag) {
          return;
        }
        this.$refs.cropper.getCropData((data) => {
          // do something
          this.base64Image = data;
          this.showPre = true;
        });
      },
      remove () {
        this.$refs.cropper.clearCrop();
      },
      stop () {
        this.$refs.cropper.stopCrop();
      },
      start () {
        this.$refs.cropper.startCrop();
        this.startTag = true;
      }
    },
    mounted () {
      var _this = this.$refs.myImage;

      console.log('data:' + _this.image().base64Image);
    },
    components: {
      VueCropper
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .vueScropper-item {
    display: flex;
    padding: 20px;
    background-color: #ffffff;
    width: 700px;
    height: 600px;
    position: relative;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    .cut {
      width: 400px;
      height: 400px;
      margin-right: 20px;
    }
    .flex-box {
      .item {
        background-color: #02ac1a;
        width: 200px;
        text-align: center;
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        color: #FFFFFF;
        border-radius: 5px;
        margin-bottom: 20px;
      }
    }
  }
</style>
