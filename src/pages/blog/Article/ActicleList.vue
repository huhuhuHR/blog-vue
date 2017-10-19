<template>
  <div class="person-article-list" id="article">
    <goBack @goBack="goBack"
            @goHome="goHome"></goBack>
    <div class="add-box">
      <div class="search" @keyup.enter="searchValue">
        搜索：<input placeholder="输入..." v-model="searchKey"/>
      </div>
      <div class="add" @click="goAdd()">添加新的文章</div>
    </div>
    <div class="list-box">
      <div class="article-list" v-for="(article,index) in personRecordList" key="article.id"
           @click="goDetail(article.id)">
        <div class="article-title">标题:<span style="margin-left: 5px">{{article.title}}</span></div>
        <div class="article-desc">作者：{{article.author}}</div>
        <div class="article-desc">描述：{{article.desciption}}</div>
        <div class="article-time">创建日期：{{article.createTime | dataFilter}}</div>
        <div class="article-time">更新日期：{{article.updateTime | dataFilter}}</div>
        <div class="last-line">
          <div class="operation">
            <div class="edit"><i class="iconfont icon-75bianji" @click.stop="goEdit(article.id)"></i></div>
            <div class="delete" @click.stop="deleteArticle(article.id)"><i class="iconfont icon-shanchu"></i></div>
          </div>
        </div>
      </div>
      <div v-if="personRecordList.length%3 === 2" class="article-list"
           style="background-color: #FFFFFF;border: none"></div>
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
  import {doOperationSuccess, doOperationFailture} from '../../../assets/js/operation';
  export default{
    data () {
      return {
        id: this.$route.query.id,
        scrrenHeight: '',
        personRecordList: [],
        searchKey: ''
      };
    },
    created () {
      this.init();
    },
    methods: {
      searchValue () {
        http.api({
          url: '/huhuhu/article/search',
          params: {
            'searchKey': this.searchKey,
            'id': this.id
          },
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            this.personRecordList = data.personRecordList;
          }.bind(this),
          errorCallback: function (data) {
            doOperationFailture(this);
            this.$router.go(-1);
          }.bind(this)
        });
      },
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
            doOperationFailture(this);
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
            doOperationSuccess(this);
            this.init();
          }.bind(this),
          errorCallback: function (data) {
            doOperationFailture(this);
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
    border: 1px dashed #111;
    margin: 30px;
    background-color: #FFFFFF;
    padding-bottom: 20px;
    border-radius: 5px;
    .add-box {
      border-bottom: 1px dashed #8c8c8c;
      display: flex;
      justify-content: space-between;
      padding: 10px 30px;
      .add {
        cursor: pointer;
        background-color: #00a0e9;
        border-radius: 5px;
        font-size: 14px;
        width: 100px;
        line-height: 32px;
        height: 32px;
        color: #FFFFFF;
        text-align: center;
      }
      .search {
        font-size: 18px;
        color: #8c8c8c;
        input {
          height: 30px;
          line-height: 30px;
          width: 200px;
          font-size: 16px;
          border-radius: 5px;
          border: none;
          background-color: #8c8c8c;
          padding-left: 5px;
        }
      }
    }
    .list-box {
      margin: 30px 30px 30px 30px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .article-list {
        cursor: pointer;
        color: #02ac1a;
        background-color: #000000;
        padding: 5px 10px 5px 10px;
        border: 1px solid #8c8c8c;
        width: 22%;
        border-radius: 5px;
        margin-top: 13px;
        .article-title {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .article-desc {
          /*padding-left: 10px;*/
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .article-time {
          /*text-align: right;*/
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
            justify-content: space-between;
            .delete {
              margin-left: 20px;
            }
          }
        }
      }
    }
  }
</style>
