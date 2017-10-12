<template>
  <div class="home-root">
    <div class="head-title-motto">
      <div class="head-title">个人博客</div>
      <div class="head-motto">意志目标不在自然中存在，而在生命中蕴藏</div>
    </div>
    <div class="left-list">
      <div class="float-box" v-for="(router,index) in routerList"
           key="router.id"
           @click="goPage(router.router)"
           @mouseover="showTip(index)"
           @mouseout="hideTip(index)">
        <div :class="{'box-element': true,'selected': selectedList[index]}"><i :class="router.iconName"></i></div>
        <div class="router-name">{{router.name}}</div>
      </div>
    </div>
    <div class="fast-go">
      新文章推荐:
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
        routerList: [],
        selectedList: []
      };
    },
    methods: {
      getColor(index){
        console.log('111122');
        return this.selectedList[index];
      },
      showTip(index){
        console.log(index);
        this.selectedList[index] = true;
        console.log('in' + this.selectedList[index]);
      },
      hideTip(index){
        this.selectedList[index] = false;
        console.log('out' + this.selectedList[index]);
      },
      goPage (val) {
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
          this.selectedList = new Array(this.routerList.length).fill(false);
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
      padding-bottom: 20px;
      padding-top: 20px;
      background-color: #2181cb;
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
        .selected {
          color: #8ec31e;
        }
        .router-name {
          text-align: center;
          font-size: 12px;
        }
      }
    }
    .fast-go {
      margin: 20px 30px 20px 30px;
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
