<template>
  <div class="person-article-list" id="article">
    <goBack @goBack="goBack"
            @goHome="goHome"></goBack>
    <div class="article-list" v-for="article in personRecordList" key="article.id">
      <div class="article-title">{{article.title}}</div>
      <div class="article-body">{{article.body}}</div>
      <div class="article-time">{{article.createTime}}</div>
    </div>
  </div>
</template>
<script>
  import {goBack} from '../../../components/index';
  import http from '../../../http/http';
  import Vue from 'vue';
  import auth from '../../../auth';
  import {setStyle, getStyle}  from  '../../../assets/js/dom';
  export default{
    data () {
      return {
        id: this.$route.query.id,
        scrrenHeight: '',
        personRecordList: []
      };
    },
    created () {
      let condition = Object.assign({}, {'id': this.id}, {'cookie': auth.getCookieValue(auth.TOKEN_KEY)});
      http.api({
        url: '/huhuhu/article/personRecord',
        params: condition,
        emulateJSON: true,
        useLoadLayer: true,
        successCallback: function (data) {
          this.personRecordList = data.personRecordList;
        }.bind(this),
        errorCallback: function (data) {
          this.$router.go(-1);
        }.bind(this)
      });
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      goHome(){
        this.$router.push({path: '/homePage', query: {'id': this.id}});
      }
    },
    components: {
      goBack
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .person-article-list {
    .article-list {
      background-color: #ffffff;
      border-bottom: 2px solid #8c8c8c;
      .article-time {
        text-align: right;
      }
    }
  }
</style>
