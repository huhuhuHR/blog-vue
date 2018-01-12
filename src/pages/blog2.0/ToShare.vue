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
        <div class="url">
          <input type="text"
                 placeholder="标题"
                 maxlength="128"
                 v-model="title"/>
        </div>
        <div class="description-input">
          <textarea placeholder="描述（140字以内）"
                    maxlength="140"
                    rows="4"
                    v-model="desc"></textarea>
        </div>
        <div class="label">
          <div>标签:</div>
          <input type="text" placeholder="可选填"/>
        </div>
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
  export default{
    data () {
      return {
        url: '',
        title: '',
        desc: ''
      };
    },
    methods: {
      submit () {
        this.$http.api({
          url: this.HOST + '/share/toShare',
          params: {
            shareUrl: this.url,
            shareTitle: this.title,
            shareDesc: this.desc,
            userId: '248886518218567680'
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
