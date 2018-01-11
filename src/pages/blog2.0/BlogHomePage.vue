<template>
  <div class="new-home-root">
    <div class="myBody">
      <div class="left">
        <div class="write-share">
          <div class="item">
            <img src="../../components/Blog2/1.jpeg"/>
          </div>
          <div class="item">
            <i class="iconfont icon-wenzhang"></i>
            写文章
          </div>
          <div class="item">
            <i class="iconfont icon-huaban"></i>
            分享链接
          </div>
        </div>
        <div style="width: 100%;height: 10px;background-color: #b2bac2;"></div>
        <div class="public-list">
          <div class="list-header">
            <ul>
              <li
                v-for="(item,index) in myRouters" @click="changeCurrentIndex(index)"
                :class="{'selected': selected[index]}">{{item}}
              </li>
            </ul>
          </div>
          <articleList :index="currentRouter"
                       :totalSize="myRouters.length"
                       :tools="tools"
                       @initTools="initTools"></articleList>
        </div>
      </div>
      <div class="right">
        <div class="login">
          <div class="login-head">
            <div v-if="false" class="noLogin">
              <span class="toLogin" @click="toLogin">登录</span>
              <span @click="toRegist">注册</span>
            </div>
            <div v-else class="hasLogin">
              <span>已经登录</span>
              <i class="iconfont icon-tuichu"></i>
            </div>
          </div>
        </div>
        <column></column>
        <menbers></menbers>
      </div>
    </div>
    <blog-regist
      :registShow="registShow"
      @closeRegist="closeRegist"
      @regist="regist"
    ></blog-regist>
    <blog-login
      :loginShow="loginShow"
      @closeLogin="closeLogin"
    ></blog-login>
  </div>
</template>
<script>
  import blogRegist from '../../components/Blog2/Blog2Regist.vue';
  import blogLogin from '../../components/Blog2/Blog2ToLogin.vue';
  import articleList from '../../components/Blog2/ArticleList.vue';
  import menbers from '../../components/Blog2/Members.vue';
  import column from '../../components/Blog2/myColumn.vue';
  export default {
    data() {
      return {
        registShow: false,
        loginShow: false,
        myRouters: [
          '热门',
          '最新',
          '评论',
          '我的文章',
          '已分享链接',
          '个人工具',
        ],
        currentRouter: 0,
        selected: [],
        tools: []
      };
    },
    mounted(){
      this.selected = new Array(this.myRouters.length).fill(false);
    },
    computed: {},
    methods: {
      changeCurrentIndex: function (val) {
        this.selected[this.currentRouter] = false;
        console.log(val);
        this.currentRouter = val;
        this.selected[val] = true;
        this.selected.push();
        if (val === this.myRouters.length - 1) {
          this.initTools();
        }
      },
      initTools: function () {
        this.$http.api({
          url: '/huhuhu/ToolKit/selectTookies',
          params: {'userId': '248886518218567680'},
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            this.tools = data.toolKitList;
          }.bind(this),
          errorCallback: function (data) {
            doOperationFailture(this);
          }.bind(this)
        });
      },
      regist: function (v1, v2, v3) {
        let condition = Object.assign({}, {'blogName': v1, 'blogEmail': v2, 'blogPassword': v3});
        this.$http.api({
          url: this.HOST + '/regist/toRegist',
          params: condition,
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            console.log("注册成功，查收邮件！！！")
          }.bind(this),
          errorCallback: function (data) {
            console.log("注册失败！！！")
          }.bind(this)
        });
      },
      toRegist: function () {
        this.registShow = true;
      },
      toLogin: function () {
        this.loginShow = true;
      },
      closeRegist: function () {
        this.registShow = false;
      },
      closeLogin: function () {
        this.loginShow = false;
      }
    }
    ,
    mounted()
    {
    }
    ,
    filters: {}
    ,
    components: {
      blogRegist,
      blogLogin,
      articleList,
      menbers,
      column
    }
    ,
    created()
    {
    }
  }
  ;
</script>
<style scoped lang="less" rel="stylesheet/less">
  .new-home-root {
    height: 800px;
    .head {
      background-color: #ffffff;
      height: 50px;
      padding: 0 10%;
      line-height: 50px;
      display: flex;
      ul {
        width: 94%;
        display: flex;
        overflow: scroll;
        li {
          margin-right: 10px;
          flex-shrink: 0;
          font-size: 18px;
          color: #71777c;
          padding: 0 16px;
        }
        .my-point {
          color: #007fff;
          padding-left: 0 !important;
        }
      }
      .label {
        flex-shrink: 0;
        font-size: 18px;
        color: #71777c;
      }
    }
    .myBody {
      background-color: #b2bac2;
      margin: 20px 10%;
      height: 700px;
      display: flex;
      .left {
        width: 78%;
        margin-right: 2%;
        background-color: #ffffff;
        .write-share {
          display: flex;
          align-items: center;
          .item {
            display: flex;
            color: #007fff;
            width: 70px;
            height: 50px;
            line-height: 50px;
            margin-right: 16px;
            border-radius: 2px 0 0 2px;
            font-size: 12px;
            img {
              width: 50px;
              height: 50px;
            }
            i {
              font-size: 12px;
              margin-right: 5px;
            }
          }
        }
        .public-list {
          height: 91%;
          .list-header {
            padding: 17px 16px;
            border-bottom: 1px solid hsla(0, 0%, 59%, .1);
            ul {
              display: flex;
              li {
                padding: 0 16px;
                font-size: 14px;
                border-right: 1px solid hsla(0, 0%, 59%, .2);
              }
              :last-child {
                border-right: none !important;
              }
            }
            .selected {
              color: #007fff;
              font-weight: bold;
            }
          }
        }
      }
      .right {
        width: 20%;
        border: 1px solid rgba(178, 186, 194, .15);
        border-radius: 2px 0 0 2px;
        .login {
          margin-bottom: 10px;
          background-color: #ffffff;
          .login-head {
            .noLogin {
              font-size: 16px;
              color: #007fff;
              padding: 12.5px 0 12.5px 10px;
              border-bottom: 1px solid rgba(178, 186, 194, .15);
              .toLogin:after {
                content: "\B7";
                margin: 2px;
              }
            }
            .hasLogin {
              text-align: center;
              height: 48px;
              line-height: 48px;
              font-size: 16px;
              color: #007fff;
              span {
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
    ::-webkit-scrollbar { /*隐藏滚轮*/
      display: none;
    }
  }
</style>
