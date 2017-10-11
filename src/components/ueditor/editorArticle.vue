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
      <div class="edit-area">
        <ueditor v-bind:value=article.body @input="input"></ueditor>
      </div>
      <div style="display: flex;
                  justify-content: center;
                  margin-top: 40px;">
        <div @click="save()" style="width: 200px;
                                    height: 50px;
                                    line-height: 50px;
                                    border: 1px solid #00a0e9;
                                    text-align: center;
                                    background-color: #00a0e9;
                                    color: #FFFFFF;
                                    margin-right: 30px;">保存
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import http from '../../http/http';
  import ueditor from './ueditor.vue';
  export default {
    data() {
      return {
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
//        console.log(this.body);
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
//        console.log(this.inputMsg);
      },
      save(){
        http.api({
          url: '/huhuhu/article/updateArticle',
          params: {
            'id': this.article.id,
            'userId': this.article.userId,
            'articleTitle': this.realTitle ? this.realTitle : this.article.title,
            "author": this.realAuthor ? this.realAuthor : this.article.author,
            "articleBody": this.inputMsg ? this.inputMsg : this.article.body
          },
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            this.$router.push({path: '/acticleList', query: {'id': this.article.userId}});
          }.bind(this),
          errorCallback: function (data) {
          }.bind(this)
        });
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
  }
</style>
