<template>
  <div class="image-item">
    <div class="image-getBase64-Path">
      <ul>
        <li>
          <h1>获取base64数据通过img的src路径</h1>
        </li>
        <li>
          <div class="imageHasPath" @click="getBase64ByPath">获取img-src(path)获取base64</div>
          <div><img class="img-has-path" src="../../components/Blog2/1.jpeg" id="imageHashPath"/></div>
          <div><span v-if="imageHasPathSrc!==''">path:{{imageHasPathSrc}}</span></div>
          <div class="word-wap" v-if="imageHashBase64Data!==''">{{imageHashBase64Data}}</div>
        </li>
      </ul>
      <ul>
        <li>
          <h1>获取base64通过src路径方法2</h1>
        </li>
        <li>
          <div class="imageHasPath" @click="getBase64ByPathWay2">通过file输入框获取base64</div>
          <input id="imgPicker" type="file" @change="changeExcel()"/>
          <div><img class="img-has-path" id="preview"/></div>
          <div><span v-show="show">name:{{imageHasPathSrc2}}</span></div>
          <div class="word-wap" v-show="show">{{imageHashBase64Data2}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        imageHasPathSrc: '',
        imageHashBase64Data: '',
        imageHasPathSrc2: '',
        imageHashBase64Data2: '',
        show: false
      };
    },
    methods: {
      getBase64ByPathWay2(){
        this.show = true;
      },
      changeExcel () {
        var my_this = this;
        var _this = document.querySelector('#imgPicker');
        console.log(_this.files[0]);
        this.imageHasPathSrc2 = _this.files[0].name;
        if (_this.files.length === 0) {
          document.querySelector('#preview').src = '';
          return;
        }
        //实例化一个FileReader
        var reader = new FileReader();
        reader.onload = function (e) {
          //当reader加载时，把图片的内容赋值给
          document.querySelector('#preview').src = e.target.result;
          my_this.imageHashBase64Data2 = e.target.result;
        };
        //读取选中的图片，并转换成dataURL格式
        reader.readAsDataURL(_this.files[0]);
      },
      getBase64ByPath () {
        var that = this;
        var _this = document.querySelector('#imageHashPath');
        this.imageHasPathSrc = _this.src;
        this.getBase64(this.imageHasPathSrc, function (data) {
          that.imageHashBase64Data = data;
        });
      },
      getBase64 (url, callback) {
        var type = this.getTypePicture(url);
        //通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
        var Img = new Image(),
          dataURL = '';
        Img.src = url;
        Img.onload = function () { //要先确保图片完整获取到，这是个异步事件
          var canvas = document.createElement("canvas"), //创建canvas元素
            width = Img.width, //确保canvas的尺寸和图片一样
            height = Img.height;
          canvas.width = width;
          canvas.height = height;
          canvas.getContext("2d").drawImage(Img, 0, 0, width, height); //将图片绘制到canvas中
          dataURL = canvas.toDataURL(type); //转换图片为dataURL
          callback ? callback(dataURL) : null; //调用回调函数
        };
      },
      getTypePicture(url){
        var index = url.lastIndexOf('.');
        var suffix = url.substring(index + 1, url.length);
        console.log(suffix);
        return 'image/' + suffix;
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .image-item {
    width: 900px;
    margin: auto;
    background-color: #FFFFFF;
    .imageHasPath {
      width: 200px;
      height: 30px;
      border-radius: 5px;
      background-color: #00a0e9;
      color: #FFFFFF;
      line-height: 30px;
      text-align: center;
      margin: 10px 0;
    }
    .word-wap {
      word-wrap: break-word;
      height: 200px;
      overflow: scroll;
    }
    .img-has-path {
      width: 50px;
      height: 50px;
    }
    .image-getBase64-Path {
      ul {
        margin-left: 10px;
        li {
          h1 {
            text-align: center;
            font-size: 20px;
          }
        }
      }
    }
  }
</style>
