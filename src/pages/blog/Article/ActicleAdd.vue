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
      <div class="article-desc">
        <span>文章描述:</span>
        <textarea placeholder='请描述您的问题' class="article-desciption" rows="3" cols="35" maxlength="300"
                  v-model="desciption"/>
      </div>
      <div class="add-picture">
        新增插图
      </div>
      <div class="edit-area">
        <ueditor v-bind:value=defaultMsg @input="input"></ueditor>
      </div>
    </div>
    <div style="width: 100%;border-bottom: 1px dashed #111;margin-top: 40px;"></div>
    <div class="submit">
      <div class="save" @click="save()">保存</div>
      <div class="saveAndOnline">保存并发布</div>
    </div>
  </div>
</template>

<script>
  import http from '../../../http/http';
  import auth from '../../../auth';
  import ueditor from '../../../components/ueditor/ueditor.vue';
  import {goBack} from '../../../components/index';
  import {doOperationSuccess, doOperationFailture} from '../../../assets/js/operation';
  export default {
    data() {
      return {
        id: this.$route.query.id,
        myImputTitle: '',
        myAuthor: '',
        defaultMsg: '请输入内容。。。',
        inputMsg: '',
        desciption: ''

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
            "articleBody": this.inputMsg,
            "desciption": this.desciption
          },
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            this.$router.push({path: '/acticleList', query: {'id': this.id}});
            doOperationSuccess(this);
          }.bind(this),
          errorCallback: function (data) {
            doOperationFailture(this);
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
//        console.log(this.inputMsg);
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .acticle-add-root {
    color: #808080;
    margin: 40px 30px 40px 30px;
    background-color: #FFFFFF;
    border-radius: 5px;
    .acticle-add-body {
      margin: 0 30px 0 30px;
      padding-top: 20px;
      .title {
        font-size: 24px;
        margin-bottom: 20px;
        input {
          width: 100%;
          border-radius: 5px;
        }
      }
      .author {
        font-size: 24px;
        margin: 20px 0 20px 0;
        input {
          width: 100%;
          border-radius: 5px;
        }
      }
      .article-desc {
        font-size: 24px;
        margin: 20px 0 20px 0;
        textarea {
          font-size: 24px;
          height: 100px;
          width: 100%;
          border-radius: 5px;
          background-color: #808080;
        }
      }
      .add-picture {
        font-size: 24px;
        margin: 20px 0 20px 0;
      }
    }
    .submit {
      display: flex;
      justify-content: center;
      margin-top: 40px;
      padding-bottom: 40px;
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
      .save {
        border-radius: 5px;
      }
      .saveAndOnline {
        border-radius: 5px;
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
    input {
      border: none;
      background-color: #808080;
      padding-left: 10px;
      height: 40px;
      line-height: 40px;
    }
  }
</style>
