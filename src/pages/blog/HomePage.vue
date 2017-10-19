<template>
  <div class="home-root">
    <div class="head-title-motto">
      <div class="head-title">个人博客</div>
      <!--<div class="head-motto">意志目标不在自然中存在，而在生命中蕴藏</div>-->
    </div>
    <div class="left-list">
      <div :class="{'float-box':true,'selected':selectedList[index]}" v-for="(router,index) in routerList"
           key="router.id"
           @click="goPage(router.router)"
           @mouseover="showTip(index)"
           @mouseout="hideTip(index)">
        <div class="box-element"><i :class="router.iconName"></i></div>
        <div class="router-name">{{router.name}}</div>
      </div>
    </div>
    <div class="display-between">
      <div class="fast-go">
        <div class="article-head">最新文章推荐:</div>
        <div class="article-list" v-for="(article,index) in articleList" @key="article.id"
             @click="goDetail(article.id)">
          <div class="article-title">标题：{{article.title}}</div>
          <div class="article-body">
            <div class="img"></div>
            <div class="article-body-detail"><p>{{article.desciption}}</p></div>
          </div>
          <div class="article-pv">
            <div class="pv"></div>
            <!--<div class="date">创建时间：{{article.createTime | dataFilter}}</div>-->
            <div class="date">更新时间：{{article.updateTime | dataFilter}}</div>
          </div>
        </div>
      </div>
      <div class="fast-go">
        <div class="article-head">最新工作记录:</div>
        <div class="article-list noWarp" v-for="workRecord in workRecords" @key="workRecord.id">
          {{workRecord.createTime | dataFilter}}(记录)：{{workRecord.recordBody}}
        </div>
      </div>
    </div>
    <div class="right-list">
      <div class="about">联系我:</div>
      <div class="about-me">
        <div class="qq">
          <img src="../../../src/assets/img/qq.jpg"/>
        </div>
        <div class="weixin">
          <img src="../../../src/assets/img/weixin.jpg"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import dataFormate from '../../assets/js/dataOperation';
  import Vue from 'vue';
  import {setStyle}  from  '../../assets/js/dom';
  import auth from '../../auth/index';
  import http from '../../http/http';
  export default{
    data () {
      return {
        accountId: this.$route.query.id,
        routerList: [],
        selectedList: [],
        articleList: [],
        workRecords: []
      };
    },
    methods: {
      goDetail(vale){
        this.$router.push({path: '/articleDetail', query: {'id': vale}});
      },
      showTip(index){
        this.selectedList[index] = true;
        this.selectedList.push();
      },
      hideTip(index){
        this.selectedList[index] = false;
        this.selectedList.push();
      },
      goPage (val) {
        this.$router.push({path: '/' + val, query: {'id': this.accountId}});
      }
    },
    mounted (){
    },
    filters: {
      dataFilter(val){
        return dataFormate(new Date(val), 'yyyy年MM月dd日hh时');
      }
    },
    created(){
      let condition = Object.assign({}, {'id': this.accountId});
      http.api({
        url: '/huhuhu/home/headList',
        params: condition,
        emulateJSON: true,
        useLoadLayer: true,
        successCallback: function (data) {
          this.routerList = data.routerList;
          this.selectedList = new Array(this.routerList.length).fill(false);
          this.articleList = data.articleList;
          this.workRecords = data.workRecords;
        }.bind(this),
        errorCallback: function (data) {
        }.bind(this)
      });
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .home-root {
    .head-title-motto {
      border-bottom: 2px solid #5f5f5f;
      padding-bottom: 20px;
      padding-top: 20px;
      background-color: #000000;
      .head-title {
        font-size: 30px;
        font-weight: bold;
        color: #FFFFFF;
        text-align: start;
        margin-left: 30px;
      }
      .head-motto {
        margin-right: 30px;
        font-size: 16px;
        text-align: right;
        color: #FFFFFF;
      }
    }
    .left-list {
      display: flex;
      align-self: center;
      justify-content: flex-start;
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 2px solid #5f5f5f;
      background-color: beige;
      color: #8c8c8c;
      .float-box {
        cursor: pointer;
        position: relative;
        top: 12px;
        border-radius: 5px;
        &:first-child {
          margin-left: 10px;
        }
        width: 100px;
        margin-bottom: 20px;
        .box-element {
          text-align: center;
        }
        .router-name {
          text-align: center;
          font-size: 12px;
        }
      }
      .selected {
        color: #8ec31e;
      }
    }
    .display-between {
      display: flex;
      justify-content: space-around;
      margin: 20px 30px 20px 30px;
      .fast-go {
        padding: 5px;
        border: 1px dashed #8c8c8c;
        width: 40%;
        height: 100%;
        color: #02ac1a;
        background-color: #000000;
        .article-head {
          margin-bottom: 5px;
        }
        .noWarp {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .article-list {
          cursor: pointer;
          width: 100%;
          border-top: 1px dashed #8c8c8c;
          padding: 10px 0;
          .article-title {

          }
          .article-body {
            .article-body-detail {
              word-wrap: break-word;
              text-indent: 25px;
            }
          }
          .article-pv {
            .date {
              text-align: right;
            }
          }
        }
      }
    }
    .right-list {
      border-top: 1px dashed #8c8c8c;
      border-bottom: 1px dashed #8c8c8c;
      margin: 0 30px 0 30px;
      .about {
        color: #8c8c8c;
        margin: 20px 0 20px 30px;
      }
      .about-me {
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;
        .qq {
          width: 100px;
          height: 100px;
          border: 1px solid #c0c0c0;
        }
        .weixin {
          width: 100px;
          height: 100px;
          border: 1px solid #c0c0c0;
        }
        img {
          width: 100px;
          height: 100px;
        }
      }
    }
  }
</style>
