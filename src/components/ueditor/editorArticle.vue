<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="article-editor">
    <div class="acticle-add-body">
      <div class="title">
        <span>标题:</span>
        <input v-model="article.title" v-on:change="changeTitle(article.title)">
      </div>
      <div class=" author">
        <span>作者:</span>
        <input v-model="article.author" v-on:change="changeAuthor(article.author)">
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
        <ueditor v-bind:value=article.body @input="input"></ueditor>
      </div>
      <div class="save-box">
        <div @click="save()" class="save">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import http from '../../http/http';
  import ueditor from './ueditor.vue';
  import {doOperationSuccess, doOperationFailture} from '../../assets/js/operation';
  export default {
    data() {
      return {
        desciption: '',
        realTitle: '',
        title: '',
        realAuthor: '',
        author: '',
        body: '',
        inputMsg: ''
      };
    },
    props: {
      article: {
        type: Object,
        require: true
      }
    },
    watch: {
      article: function () {
        this.title = this.article.title;
        this.author = this.article.author;
        this.body = this.article.body;
        this.desciption = this.article.desciption;
      }
    },
    created(){
    },
    components: {
      ueditor
    },
    methods: {
      changeTitle(val){
        this.realTitle = val;
      },
      changeAuthor(val){
        this.realAuthor = val;
      },
      input(val) {
        this.inputMsg = val.content;
      },
      save(){
        http.api({
          url: '/huhuhu/article/updateArticle',
          params: {
            'id': this.article.id,
            'userId': this.article.userId,
            'articleTitle': this.realTitle ? this.realTitle : this.article.title,
            "author": this.realAuthor ? this.realAuthor : this.article.author,
            "articleBody": this.inputMsg ? this.inputMsg : this.article.body,
            "desciption": this.desciption ? this.desciption : this.article.desciption
          },
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            this.$router.push({path: '/acticleList', query: {'id': this.article.userId}});
            doOperationSuccess(this);
          }.bind(this),
          errorCallback: function (data) {
            doOperationFailture(this);
          }.bind(this)
        });
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .article-editor {
    color: #808080;
    margin: 20px 0 40px 0;
    padding: 20px 10px 20px 10px;
    border: 1px solid #8c8c8c;
    border-radius: 5px;
    .acticle-add-body {
      margin: 0 30px 0 30px;
      .title {
        font-size: 24px;
        margin-bottom: 20px;
        input {
          width: 100%;
          border-radius: 5px;
          color: #ffffff;
          border: none;
          background-color: #8c8c8c;
          padding-left: 5px;
          height: 40px;
          line-height: 40px;
        }
      }
      .author {
        font-size: 24px;
        margin: 20px 0 20px 0;
        input {
          width: 100%;
          border-radius: 5px;
          color: #ffffff;
          border: none;
          background-color: #8c8c8c;
          padding-left: 5px;
          height: 40px;
          line-height: 40px;
        }
      }
      .article-desc {
        font-size: 24px;
        margin: 20px 0 20px 0;
        textarea {
          color: #FFFFFF;
          font-size: 24px;
          height: 100px;
          width: 100%;
          border-radius: 5px;
          border: none;
          background-color: #8c8c8c;
          padding-left: 5px;
        }
      }
      .add-picture {
        font-size: 24px;
        margin: 20px 0 20px 0;
      }
    }
    .save-box {
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
    }
  }
</style>
