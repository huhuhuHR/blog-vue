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
                 placeholder="标题"
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
      <div class="image-box">
        <!--<img src="./1.jpeg"/>-->
        <div>点击上传图片</div>
      </div>
    </div>
  </div>
</template>
<script>
  import utils from '../../utils/CommonUtils';
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
        error: ''
      };
    },
    methods: {
      checkParams(){
        if (utils.isEmpty(this.url)) {
          this.error = 'url必填';
        } else if (!utils.isURL(this.url)) {
          this.error = '无效url';
        } else if (utils.isEmpty(this.label)) {
          this.error = '标签必填';
        } else if (utils.isEmpty(this.title)) {
          this.error = '标题必填';
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
              userId: this.userId
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
    }
  }
</style>
