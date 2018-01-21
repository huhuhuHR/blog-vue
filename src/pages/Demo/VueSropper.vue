<template>
  <div>
    <div class="way1">
      <div class="params" @click="getImg">获取img参数</div>
      <div class="box">
        <input id="imgPicker" type="file" @change="changeExcel()"/>
        <i class="iconfont icon-icon02"></i>
      </div>
      <div class="min">
        <div class="pre" @click="toggleShow">预览</div>
        <img id="preview" v-show="showWayOneImg"/>
      </div>
    </div>
    <div class="vueScropper-item">
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
        startTag: false,
        showWayOneImg: false
      };
    },
    methods: {
      toggleShow () {
        this.showWayOneImg = !this.showWayOneImg;
      },
      getImgWay2 () {
        var img = document.querySelector('#way2');
        console.log(img.src);
      },
      getImg () {
        var img = document.querySelector('#preview');
        console.log(img.src);
      },
      changeExcel () {
        var my_this = this;
        var _this = document.querySelector('#imgPicker');
        if (_this.files.length === 0) {
          document.querySelector('#preview').src = '';
          return;
        }
        //实例化一个FileReader
        var reader = new FileReader();
        reader.onload = function (e) {
          //当reader加载时，把图片的内容赋值给
          document.querySelector('#preview').src = e.target.result;
          my_this.sourceImage = e.target.result;
//          console.log(my_this.sourceImage);
        };
        //读取选中的图片，并转换成dataURL格式
        reader.readAsDataURL(_this.files[0]);
      },
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
    },
    components: {
      VueCropper
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .way1 {
    width: 740px;
    margin: auto;
    background-color: #FFFFFF;
    .min {
      min-height: 100px;
      margin-top: 100px;
      .pre {
        width: 40px;
        height: 20px;
        line-height: 20px;
        border-radius: 5px;
        background-color: #0000cc;
        color: #FFFFFF;
        text-align: center;
      }
    }
    .params {
      font-size: 30px;
      text-align: center;
      font-weight: 600;
    }
    .box {
      border: 1px solid gainsboro;
      box-sizing: border-box;
      border-radius: 5px;
      width: 40px;
      height: 40px;
      margin: 5px 5px 5px 1px;
      float: left;
      text-align: center;
      display: table;
      position: relative;
      background-color: #02ac1a;
      #imgPicker {
        opacity: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        left: -1px;
      }
      i {
        font-size: 30px;
        color: #FFFFFF;
      }
    }
  }

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
