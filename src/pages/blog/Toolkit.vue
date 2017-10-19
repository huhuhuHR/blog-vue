<template>
  <div class="toolkit-root">
    <div class="goBack">
      <i class="iconfont icon-fanhui" @click="goBack()"></i>
    </div>
    <div class="toolkit-list">
      <div class="search-box">
        <div class="add-new" @click="ToggleAdd()">
          添加
        </div>
        <div class="search" @keyup.enter="searchValue">
          搜索：<input placeholder="输入..." v-model="searchKey"/>
        </div>
      </div>
      <div class="add-box" v-show="showAdd">
        <div class="add-iu">
          <span>icon:</span><input v-model="iconName"/>
        </div>
        <div class="add-iu">
          <span>name:</span><input v-model="urlName"/>
        </div>
        <div class="add-iu">
          <span>url:</span><input v-model="url"/>
        </div>
        <div style="display: flex;">
          <div class="add-submit" style="margin-right: 20px" @click="submit">add</div>
          <div class="add-submit" @click="cancel()">cancel</div>
        </div>
      </div>
      <div class="box-toolkit" v-show="!showAdd">
        <div class="toolkits" v-for="(toolKit,index) in toolKitList" key="toolKit.id">
          <div class="delete-toolkits" @click.stop="deleteToolkit(toolKit.id)">
            <span class="delete-icon">
              <i class="iconfont icon-shibai"></i>
            </span>
          </div>
          <div class="iconName-box" @click.stop="addCount(toolKit.id)">
            <a :href="toolKit.url" target="_Blank">
              <i :class="toolKit.iconName"></i>
            </a>
          </div>
          <div class="urlName">{{toolKit.urlName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import auth from '../../auth';
  import http from '../../http/http';
  import {doOperationSuccess, doOperationFailture} from '../../assets/js/operation';
  export default{
    data () {
      return {
        id: this.$route.query.id,
        iconName: '',
        url: '',
        urlName: '',
        showAdd: false,
        toolKitList: [],
        searchKey: ''
      };
    },
    methods: {
      searchValue () {
        http.api({
          url: '/huhuhu/ToolKit/search',
          params: {
            'searchKey': this.searchKey,
            'userId': this.id
          },
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            this.toolKitList = data.toolKitList;
          }.bind(this),
          errorCallback: function (data) {
            doOperationFailture(this);
            this.$router.go(-1);
          }.bind(this)
        });
      },
      deleteToolkit (toolKitId) {
        http.api({
          url: '/huhuhu/ToolKit/deleteToolkit',
          params: {
            'id': toolKitId,
            'userId': this.id,
          },
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
      addCount(val){
        http.api({
          url: '/huhuhu/ToolKit/updateCountById',
          params: {
            'userId': this.id,
            'id': val
          },
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            doOperationSuccess(this);
          }.bind(this),
          errorCallback: function (data) {
            doOperationFailture(this);
          }.bind(this)
        });
      },
      init(){
        http.api({
          url: '/huhuhu/ToolKit/selectTookies',
          params: {'userId': this.id},
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            this.toolKitList = data.toolKitList;
          }.bind(this),
          errorCallback: function (data) {
            doOperationFailture(this);
          }.bind(this)
        });
      },
      submit(){
        let condition = Object.assign({},
          {'cookie': auth.getCookieValue(auth.TOKEN_KEY)},
          {'iconName': this.iconName},
          {'url': this.url},
          {'urlName': this.urlName});
        http.api({
          url: '/huhuhu/ToolKit/inserToolKit',
          params: condition,
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            doOperationSuccess(this);
            this.init();
            this.cancel();
          }.bind(this),
          errorCallback: function (data) {
            doOperationFailture(this);
          }.bind(this)
        });
      },
      cancel(){
        this.url = '';
        this.iconName = '';
        this.urlName = '';
        this.showAdd = false;
      },
      goBack(){
        this.$router.go(-1);
      },
      ToggleAdd(){
        this.showAdd = !this.showAdd;
      }
    },
    mounted (){
    },
    created(){
      this.init();
    },
    components: {}
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .toolkit-root {
    border: 1px dashed #111;
    border-radius: 5px;
    margin: 0 30px 0 30px;
    .goBack {
      margin: 20px 30px 10px 30px;
      i {
        font-size: 30px;
        color: #8ec31e;
      }
    }
    background-color: #FFFFFF;
    .toolkit-list {
      margin: 0 30px 0 30px;
      border-top: 1px solid #8ec31e;
      .search-box {
        display: flex;
        padding: 10px 0;
        justify-content: space-between;
        .add-new {
          width: 50px;
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          background-color: #00a0e9;
          color: #FFFFFF;
          border-radius: 5px;
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
            padding-left: 5px;
            background-color: #8c8c8c;
          }
          margin-right: 50px;
        }
      }
      .add-box {
        .add-iu {
          margin: 5px 0 5px 0;
          span {
            height: 30px;
            line-height: 30px;
            display: inline-block;
            width: 50px;
            font-size: 16px;
          }
          input {
            width: 200px;
            height: 30px;
            background-color: #808080;
            color: #FFFFFF;
            font-size: 16px;
            border: none;
            padding-left: 5px;
            border-radius: 5px;
          }
        }
        .add-submit {
          width: 50px;
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          background-color: #00a0e9;
          color: #FFFFFF;
          border-radius: 5px;
          margin: 5px 0 5px 0;
          text-align: center;
        }
      }
      .box-toolkit {
        padding: 10px;
        border: 1px solid #8ec31e;
        margin-bottom: 20px;
        border-radius: 5px;
        height: 500px;
        overflow-y: scroll;
        .toolkits {
          float: left;
          text-align: center;
          margin-bottom: 10px;
          i {
            color: #0000cc;
            font-size: 40px;
          }
          .delete-toolkits {
            position: relative;
            z-index: 100;
            left: 15px;
            top: -7px;
            .delete-icon {
              position: absolute;
            }
            .icon-shibai {
              font-size: 16px;
              /*color: #8c8c8c;*/
            }
          }
          width: 25%;
          .iconName-box {
            background-color: #8c8c8c;
            display: inline-block;
            width: 50px;
            border-radius: 5px;
            a {
              text-decoration: none;
            }
          }
          .urlName {
            font-size: 12px;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #0000cc;
          }
        }
      }
    }
  }
</style>
