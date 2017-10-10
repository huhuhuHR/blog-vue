<template>
  <div class="person-article-list" id="article">
    <goBack @goBack="goBack"
            @goHome="goHome"></goBack>
    <div class="add" @click="goAdd()">添加新的文章:<i class="iconfont icon-icon02"></i></div>
    <div class="list-box">
      <div class="article-list" v-for="(article,index) in personRecordList" key="article.id"
           @click="goDetail(article.id)">
        <div class="article-title">标题:<span style="margin-left: 5px">{{article.title}}</span></div>
        <div class="article-time">日期：{{article.createTime | dataFilter}}</div>
        <div class="last-line">
          <div class="operation">
            <div class="edit"><i class="iconfont icon-75bianji" @click.stop="goEdit(article.id)"></i></div>
            <div class="delete" @click.stop="deleteArticle(article.id)"><i class="iconfont icon-shanchu"></i></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import dataFormate from '../../../assets/js/dataOperation';
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
      this.init();
    },
    methods: {
      goEdit(id){
        this.$router.push({path: '/articleDetail', query: {'id': id, 'edit': '1'}});
      },
      init(){
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
      deleteArticle(val){
        http.api({
          url: '/huhuhu/article/delete',
          params: {'id': val},
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            this.init();
          }.bind(this),
          errorCallback: function (data) {
            console.log('error');
          }.bind(this)
        });
      },
      goAdd(){
        this.$router.push({path: '/acticleAdd', query: {'id': this.id}});
      },
      check(val){
        return val.replace(/\s/g, "").length > 100;
      },
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
        return val.length > 10 ? val.substring(0, 20) + '...' : val;
      },
      dataFilter(val){
        return dataFormate(new Date(val), 'yyyy年MM月dd日 hh:mm:ss');
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .person-article-list {
    color: #808080;
    .add {
      font-size: 30px;
      margin-left: 30px;
      margin-bottom: 20px;
      i {
        font-size: 35px;
        margin-left: 5px;
      }
    }
    .list-box {
      margin: 0 30px 0 30px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .article-list {
        padding: 5px 5px 0 5px;
        background-color: #f3f4f8;
        border: 1px solid #8c8c8c;
        width: 29%;
        margin-top: 5px;
        .article-title {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .article-time {
          text-align: right;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .article-body {
          margin-left: 10px;
        }
        .toggleShow {
          height: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .last-line {
          margin-top: 10px;
          margin-bottom: 10px;
          .hidden {
            i {
              font-size: 12px;
              margin-right: 5px;
            }
          }
          .operation {
            display: flex;
            .delete {
              margin-left: 20px;
            }
          }
        }
      }
    }
  }
</style>
