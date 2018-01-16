<template>
  <div class="manage-item">
    <div class="head">
      <div :class="{myShare: true,'selected': selected[0]}" @click="select(0)">我的分享</div>
      <div :class="{myTool: true,'selected': selected[1]}" @click="select(1)">快捷入口</div>
    </div>
    <div class="content">
      <div class="tools" v-show="selected[0]">
        <div class="item" v-for="item in shares" @click="toDelete(item.shareId,0)">
          <span>{{item.shareTitle}}</span>
          <span class="delete">
              <i class="iconfont icon-shibai"></i>
          </span>
        </div>
        <div class="addSpace" v-if="shares.length % 4 === 3 || shares.length % 4 === 2"></div>
        <div class="addSpace" v-if="shares.length % 4 === 2"></div>
      </div>
      <div class="tools" v-show="selected[1]">
        <div class="item" v-for="item in myTools" @click="toDelete(item.id,1)">
          {{item.urlName}}
          <span class="delete">
              <i class="iconfont icon-shibai"></i>
          </span>
        </div>
        <div class="addSpace" v-if="myTools.length % 4 === 3 || myTools.length % 4 === 2"></div>
        <div class="addSpace" v-if="myTools.length % 4 === 2"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import http from '../../http/http';
  import {doOperationSuccess, doOperationFailture} from '../../assets/js/operation';
  import {
    myCookie
  } from '../../auth/index';
  export default{
    data () {
      return {
        userId: myCookie.userId,
        selected: [false, true],
        shares: [],
        myTools: []
      };
    },
    computed: {},
    mounted () {
      console.log('userId:' + this.userId)
    },
    methods: {
      toDelete (val, type) {
        if (type === 0) {
          http.api({
            url: '/huhuhu/share/delteShares',
            params: {
              userId: this.userId,
              shareId: val
            },
            emulateJSON: true,
            useLoadLayer: true,
            successCallback: function (data) {
              doOperationSuccess(this);
              this.select(0);
            }.bind(this),
            errorCallback: function (data) {
              doOperationFailture(this);
            }.bind(this)
          });
        }
        if (type === 1) {
          http.api({
            url: '/huhuhu/ToolKit/deleteToolkit',
            params: {
              'id': val,
              'userId': this.userId,
            },
            emulateJSON: true,
            useLoadLayer: true,
            successCallback: function (data) {
              doOperationSuccess(this);
              this.select(1);
            }.bind(this),
            errorCallback: function (data) {
              doOperationFailture(this);
            }.bind(this)
          });
        }
      },
      select (index) {
        this.selected.fill(false);
        this.selected[index] = true;
        this.selected.push();
        if (index === 0) {
          http.api({
            url: '/huhuhu/share/selectShares',
            params: {
              userId: this.userId
            },
            emulateJSON: true,
            useLoadLayer: true,
            successCallback: function (data) {
              this.shares = data.shares;
              this.shares.push();
            }.bind(this),
            errorCallback: function (data) {
//              doOperationFailture(this);
            }.bind(this)
          });
        }
        if (index === 1) {
          this.$http.api({
            url: '/huhuhu/ToolKit/selectTookies',
            params: {'userId': this.userId},
            emulateJSON: true,
            useLoadLayer: true,
            successCallback: function (data) {
              this.myTools = data.toolKitList;
            }.bind(this),
            errorCallback: function (data) {
//              doOperationFailture(this);
            }.bind(this)
          });
        }
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .manage-item {
    margin: 50px;
    background-color: #FFFFFF;
    .head {
      display: flex;
      font-size: 24px;
      padding: 10px;
      .myShare {
        border-right: 1px solid #000000;
        width: 100px;
        text-align: center;
        padding-right: 10px;
      }
      .myTool {
        padding-left: 10px;
      }
      .selected {
        color: #00a0e9;
      }
    }
    .content {
      padding: 10px;
      .tools {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item {
          width: 19%;
          height: 50px;
          margin: 20px;
          border-radius: 20px;
          background-color: #32CD32;
          line-height: 50px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #FFFFFF;
          .delete {
            position: relative;
            top: -10px;
            i {
              position: absolute;
              color: #3e3e3e;
            }
          }
        }
        .addSpace {
          width: 19%;
          height: 50px;
          margin: 20px;
        }
      }
    }
  }
</style>
