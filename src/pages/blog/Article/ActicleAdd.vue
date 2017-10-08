<template>
  <div class="acticle-add-root">
    <goBack @goBack="goBack"
            @goHome="goHome"></goBack>
    <div class="acticle-add-body">
      <div class="title">
        <span>标题:</span>
        <input v-model="myImputTitle">
      </div>
      <div class="author">
        <span>作者:</span>
        <input v-model="myAuthor">
      </div>
      <div class="edit-area">
        <ueditor v-bind:value=defaultMsg @input="input"></ueditor>
      </div>
      <div class="submit">
        <div class="save" @click="save()">保存</div>
        <div class="saveAndOnline">保存并发布</div>
      </div>
    </div>
  </div>
</template>

<script>
  import http from '../../../http/http';
  import ueditor from '../../../components/ueditor/ueditor.vue';
  import {goBack} from '../../../components/index';
  export default {
    data() {
      return {
        id: this.$route.query.id,
        myImputTitle: '',
        myAuthor: '',
        defaultMsg: '请输入内容。。。',
        inputMsg: ''

      };
    },
    components: {
      ueditor,
      goBack
    },
    methods: {
      save(){
        http.api({
          url: '/huhuhu/article/saveArticle',
          params: {
            'userId': this.id,
            'articleTitle': this.myImputTitle,
            "author": this.myAuthor,
            "articleBody": this.inputMsg
          },
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            this.$router.push({path: '/acticleList', query: {'id': this.id}});
          }.bind(this),
          errorCallback: function (data) {
          }.bind(this)
        });
      },
      goBack() {
        this.$router.go(-1);
      },
      goHome(){
        this.$router.push({path: '/homePage', query: {'id': this.id}});
      },
      input(val) {
        this.inputMsg = val.content;
        console.log(this.inputMsg)
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .acticle-add-root {
    color: #808080;
    margin-bottom: 40px;
    .acticle-add-body {
      margin: 0 30px 0 30px;
      .title {
        font-size: 24px;
        margin-bottom: 20px;
        input {
          width: 90%;
        }
      }
      .author {
        font-size: 24px;
        margin: 20px 0 20px 0;
        input {
          width: 90%;
        }
      }
    }
    .submit {
      display: flex;
      justify-content: center;
      margin-top: 40px;
      .save {
        width: 200px;
        height: 50px;
        line-height: 50px;
        border: 1px solid #00a0e9;
        text-align: center;
        background-color: #00a0e9;
        color: #FFFFFF;
        margin-right: 30px;
      }
      .saveAndOnline {
        width: 200px;
        height: 50px;
        line-height: 50px;
        border: 1px solid #00a0e9;
        text-align: center;
        background-color: #00a0e9;
        color: #FFFFFF;
        margin-left: 30px;
      }
    }
  }
</style>
