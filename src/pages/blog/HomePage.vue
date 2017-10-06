<template>
  <div class="home-root">
    <div class="head-title-motto">
      <div class="head-title">个人博客</div>
      <div class="head-motto">意志目标不在自然中存在，而在生命中蕴藏</div>
    </div>
    <div class="left-list">
      <div class="float-box" v-for="router in routerList" key="router.id" @click="goPage(router.router)">
        <div class="box-element"><i :class="router.iconName"></i></div>
        <div class="router-name">{{router.name}}</div>
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
  import Vue from 'vue';
  import {setStyle}  from  '../../assets/js/dom';
  import auth from '../../auth/index';
  import http from '../../http/http';
  export default{
    data () {
      return {
        accountId: this.$route.query.id,
        routerList: []
      };
    },
    methods: {
      goPage (val) {
        console.log(val);
        this.$router.push({path: '/' + val, query: {'id': this.accountId}});
      }
    },
    mounted (){
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
      border-bottom: 2px solid #10b0de;
      margin-top: 20px;
      padding-bottom: 20px;
      .head-title {
        font-size: 30px;
        font-weight: bold;
        color: #DA70D6;
        text-align: start;
        margin-left: 30px;
      }
      .head-motto {
        margin-right: 30px;
        font-size: 16px;
        text-align: right;
        color: #EE6AA7;
      }
    }
    .left-list {
      display: flex;
      align-self: center;
      justify-content: flex-start;
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 2px solid #10b0de;
      background-color: beige;
      color: #8c8c8c;
      .float-box {
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
    }
    .right-list {
      .about {
        color: #8c8c8c;
        margin: 20px 0 20px 30px;
      }
      .about-me {
        display: flex;
        justify-content: space-around;
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
