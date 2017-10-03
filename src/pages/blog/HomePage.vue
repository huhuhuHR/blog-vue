<template>
  <div class="home-root">
    <div class="head-title-motto">
      <div class="head-title">个人博客</div>
      <div class="head-motto">青春是一本书，打开了合不起来了。</div>
    </div>
    <div class="left-list">
      <div class="float-box" v-for="router in routerList" key="router.id" @click="goPage(router.router)">
        <div class="box-element"><i :class="router.iconName"></i></div>
        <div class="router-name">{{router.name}}</div>
      </div>
    </div>
    <div class="right-list"></div>
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
      Vue.nextTick(function () {
        let width = window.screen.width;
        setStyle(document.getElementById('.right-list'), 'width', (width - 50) + 'px');
      }.bind(this));
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
    overflow: hidden;
    .head-title-motto {
      border-bottom: 5px solid #5f5f5f;
      .head-title {
        font-size: 24px;
        text-align: center;
      }
      .head-motto {
        text-align: right;
      }
    }
    .left-list {
      position: absolute;
      .float-box {
        width: 50px;
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
      margin-left: 50px;
      border: 1px solid red;
      height: 600px;
    }
  }
</style>
