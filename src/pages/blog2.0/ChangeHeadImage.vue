<template>
  <div v-show="uploadImage">
    <mask-layer></mask-layer>
    <div class="image-item">
      <div class="image-box" v-if="!hasBase64ImageTag">
        <vc :baseImage="baseImage"
            :currentSate="currentSate"
            @getBase64Image="getBase64Image"
        ></vc>
      </div>
      <div class="image-operation" v-if="!hasBase64ImageTag">
        <div class="box" @click="changeSate(1)">
          开始截图
        </div>
        <div class="box" @click="changeSate(2)">
          取消截图
        </div>
        <div class="box" @click="changeSate(3)">
          保存
        </div>
        <div class="box" @click="goOut">
          退出
        </div>
        <div class="upload-image">
          上传图片
          <input type="file" class="inputImage" @change="changeImage"/>
        </div>
      </div>
      <div class="image-operation toFlex" v-if="hasBase64ImageTag">
        <div>
          <img :src="base64Image" v-if="base64Image!=''">
        </div>
        <div>
          <div class="box" @click="reUploadImage">重新裁图</div>
          <div class="box" @click="generate" v-if="base64Image != ''">
            永久保存
          </div>
          <div class="box" @click="goOut">
            退出
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import MaskLayer from '../../components/operationDialog/MaskLayer.vue';
  import vc from '../../components/Blog2/VC.vue';
  export default{
    data () {
      return {
        baseImage: '',
        currentSate: 0,
        base64Image: '',
        hasBase64ImageTag: false
      };
    },
    props: {
      uploadImage: {
        type: Boolean,
        require: true
      }
    },
    components: {
      vc,
      MaskLayer
    },
    methods: {
      init(){
        this.baseImage = '';
        this.currentSate = 2;
        this.base64Image = '';
        this.hasBase64ImageTag = false;
      },
      generate(){
        if (this.base64Image === '') {
          return;
        }
        this.$emit('upload', this.base64Image);
      },
      goOut(){
        this.init();
        this.$emit('toggleImageUploadTag');
      },
      reUploadImage () {
        this.hasBase64ImageTag = false;
      },
      changeImage(){
        var imageSuffix = this.$el.getElementsByClassName('inputImage')[0].files[0];
        var name = imageSuffix.name;
        if (/\.(jpe?g|png)$/.test(name.toLowerCase())) {
          var index = name.lastIndexOf('.');
          this.suffix = (name.substring(index, name.length));
        } else {
          this.error = '图片只支持jpg，jpeg，png'
        }
        var my_this = this;
        var _this = document.querySelector('.inputImage');
        //实例化一个FileReader
        var reader = new FileReader();
        reader.onload = function (e) {
          //当reader加载时，把图片的内容赋值给
          my_this.baseImage = e.target.result;
//          console.log(my_this.sourceImage);
        };
        //读取选中的图片，并转换成dataURL格式
        reader.readAsDataURL(_this.files[0]);
      },
      changeSate(val){
        if (this.currentSate === val) {
          if (this.currentSate === 4) {
            return;
          }
          val = val === 2 ? 4 : val === 4 ? 2 : val;
        }
        this.currentSate = val;
        if (val === 2 || val === 4) {
          this.goOut();
        }
      },
      getBase64Image(val){
        this.base64Image = val;
        this.hasBase64ImageTag = true;
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .image-item {
    padding: 20px;
    background-color: #ffffff;
    width: 400px;
    height: 340px;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    z-index: 1033302;
    display: flex;
    .image-box {
      width: 340px;
      height: 340px;
      line-height: 340px;
      display: flex;
      justify-content: center;
      align-self: center;
      border: 1px dotted #999;
      font-size: 20px;
      color: #999;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .toFlex {
      display: flex;
    }
    .image-operation {
      img {
        width: 200px;
        height: 200px;
      }
      margin-left: 10px;
      .upload-image {
        border: 1px solid #007fff;
        background-color: #007fff;
        color: #FFFFFF;
        text-align: center;
        position: absolute;
        width: 60px;
        height: 20px;
        line-height: 20px;
        .inputImage {
          position: relative;
          top: -20px;
          left: 0;
          width: 60px;
          height: 20px;
          opacity: 0;
          cursor: pointer;
          z-index: 1111;
        }
      }
      .box {
        width: 60px;
        height: 20px;
        border: 1px solid #007fff;
        background-color: #007fff;
        color: #FFFFFF;
        line-height: 20px;
        text-align: center;
        margin-bottom: 20px;
        cursor: pointer;
      }
    }
  }
</style>
