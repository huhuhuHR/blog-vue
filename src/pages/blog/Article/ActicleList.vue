<template>
  <div class="person-article-list" id="article">
    <goBack @goBack="goBack"
            @goHome="goHome"></goBack>
    <div style="border-top: 2px solid #8c8c8c;margin: 0 30px 0 30px;"></div>
    <div class="article-list" v-for="(article,index) in personRecordList" key="article.id"
         @click="goDetail(article.id)">
      <div class="article-title">{{article.title}}</div>
      <div class="article-body" v-html="article.body">
      </div>
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
      },
      goDetail(vale){
        this.$router.push({path: '/articleDetail', query: {'id': vale}});
      }
    },
    components: {
      goBack
    },
    filters: {
      filterLength(val){
        return val.length > 50 ? val.substring(0, 50) + '...' : val;
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .person-article-list {
    color: #808080;
    .article-list {
      margin: 0 30px 0 30px;
      background-color: #f3f4f8;
      border-bottom: 2px solid #8c8c8c;
      .article-time {
        text-align: right;
      }
      .article-body {
        height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
