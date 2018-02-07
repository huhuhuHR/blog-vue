<template>
  <div class="share">
    <div class="word">分享</div>
    <div class="content">
      <div class="row-input">
        <div class="url">
          <input type="text"
                 placeholder="分享网址：wwww.baidu.com"
                 v-model="url"/>
        </div>
        <div class="url" style="padding-bottom: 0;!important;">
          <input type="text"
                 placeholder="关于"
                 maxlength="128"
                 v-model="title"/>
        </div>
        <div class="label">
          <div class="words">标签:</div>
          <input type="text" placeholder="必填" v-model="label" maxlength="10"/>
        </div>
        <div>{{error}}</div>
        <div class="submit" @click="submit">
          提交
        </div>
      </div>
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
        <div class="upload-image">
          上传图片
          <input type="file" class="inputImage" @change="changeImage"/>
        </div>
      </div>
      <div class="image-operation" v-if="hasBase64ImageTag">
        <img :src="base64Image" v-if="base64Image!=''">
        <div class="box" @click="reUploadImage">重新裁图</div>
      </div>
    </div>
  </div>
</template>
<script>
  import utils from '../../utils/CommonUtils';
  import vc from '../../components/Blog2/VC.vue';
  import {
    myCookie
  } from '../../auth/index';
  export default{
    data () {
      return {
        url: '',
        title: '',
        userId: myCookie.userId,
        label: '',
        error: '',
        baseImage: '',
        currentSate: 0,
        base64Image: '',
        hasBase64ImageTag: false,
        suffix: ''
      };
    },
    components: {
      vc
    },
    methods: {
      reUploadImage () {
        this.hasBase64ImageTag = false;
      },
      getBase64Image(val){
        this.base64Image = val;
//        console.log(this.base64Image);
        this.hasBase64ImageTag = true;
      },
      changeSate(val){
        if (this.currentSate === val) {
          if (this.currentSate === 4) {
            return;
          }
          val = val === 2 ? 4 : val === 4 ? 2 : val;
        }
        this.currentSate = val;
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
      checkParams(){
        if (utils.isEmpty(this.url)) {
          this.error = 'url必填';
        } else if (!utils.isURL(this.url)) {
          this.error = '无效url';
        } else if (utils.isEmpty(this.label)) {
          this.error = '标签必填';
        } else if (utils.isEmpty(this.title)) {
          this.error = '关于必填';
        } else {
          return true;
        }
        return false;
      },
      submit () {
        if (this.checkParams) {
          this.$http.api({
            url: this.HOST + '/share/toShare',
            params: {
              shareUrl: this.url,
              shareTitle: this.title,
              shareDesc: this.label,
              userId: this.userId,
              base64Image: this.base64Image,
              suffix: this.suffix
            },
            emulateJSON: true,
            useLoadLayer: true,
            successCallback: function (data) {
              this.$router.push({path: 'home'});
            }.bind(this),
            errorCallback: function (data) {
              console.log("fail")
            }.bind(this)
          });
        }
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .share {
    margin: 50px;
    background-color: #FFFFFF;
    min-height: 550px;
    .word {
      font-size: 40px;
      font-weight: bold;
      padding: 20px;
    }
    .content {
      display: flex;
      align-items: flex-start;
      padding: 0 20px;
      .row-input {
        width: 60%;
        .url {
          padding-bottom: 20px;
          input {
            width: 90%;
            height: 50px;
            padding: 0 10px;
          }
        }
        .description-input {
          textarea {
            width: 90%;
            height: 170px;
            padding: 10px;
            resize: none;
            font-size: 20px;
            border: 1px solid #999;
          }
        }
        .label {
          display: flex;
          height: 50px;
          line-height: 50px;
          font-size: 16px;
          color: #999;
          margin: 10px 0;
          .words {
            margin-right: 5px;
          }
          input {
            font-size: 12px;
            background-color: #FFFFFF;
            height: 30px;
            margin-top: 10px;
            padding-left: 5px;
          }
        }
        .submit {
          background-color: #007fff;
          text-align: center;
          color: #FFFFFF;
          height: 50px;
          line-height: 50px;
          width: 93.5%;
          margin-bottom: 20px;
        }
      }
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
      .image-operation {
        img {
          width: 100%;
          height: 100%;
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
  }
</style>
