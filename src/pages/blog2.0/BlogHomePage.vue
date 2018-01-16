<template>
  <div class="new-home-root">
    <div class="myBody">
      <div class="left">
        <div class="write-share">
          <div class="item">
            <img src="../../components/Blog2/1.jpeg"/>
          </div>
          <div class="item" @click="toShare" v-if="shareShow">
            <i class="iconfont icon-huaban"></i>
            收藏链接
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
                       :shareDetail="shareDetail"
                       @initTools="initTools"
                       @searchValue="searchValue"
                       @getNewestShare="getNewestShare"
                       :currentRouter="currentRouter"
                       @searchKeyFunction="searchKeyFunction"></articleList>
        </div>
      </div>
      <div class="right">
        <div class="login">
          <div class="login-head">
            <div v-if="userState === '0'" class="noLogin">
              <span class="toLogin" @click="toLogin">登录</span>
              <span @click="toRegist">注册</span>
            </div>
            <div v-if="userState === '1'" class="toactive" @click="toActiveWithCookieUUID">
              <span>去激活</span>
            </div>
            <div v-if="userState === '2'" class="hasLogin">
              <span>已经登录</span>
              <i class="iconfont icon-tuichu" @click="loginOut"></i>
            </div>
          </div>
        </div>
        <column v-if="shareShow"
                @deal="deal"></column>
        <menbers></menbers>
      </div>
    </div>
    <blog-regist
      :registShow="registShow"
      @closeRegist="closeRegist"
      :error="reigistError"
      @regist="regist"
      @changeError="changeError"
    ></blog-regist>
    <blog-login
      :loginShow="loginShow"
      @closeLogin="closeLogin"
      @goToLogin="goToLogin"
      :loginError="loginError"
      @changeLoginError="changeLoginError"
    ></blog-login>
  </div>
</template>
<script>
  import blogRegist from '../../components/Blog2/Blog2Regist.vue';
  import blogLogin from '../../components/Blog2/Blog2ToLogin.vue';
  import articleList from '../../components/Blog2/ArticleList.vue';
  import menbers from '../../components/Blog2/Members.vue';
  import column from '../../components/Blog2/myColumn.vue';
  import {doOperationSuccess, doOperationFailture} from '../../assets/js/operation';
  import {
    saveCookie,
    clearCookie,
    TOKEN_KEY,
    getCookieValue,
    refresh,
    myCookie,
    setCookie,
    UUID,
    ONE_DAY
  } from '../../auth/index';
  import {
    CHANE_STATE_USER,
    CHANE_STATE_USERID,
  } from '../../store/mutation-types';

  export default {
    data() {
      return {
        registShow: false,
        loginShow: false,
        myRouters: [
          '热门',
          '最新分享',
          '快捷入口',
        ],
        currentRouter: 0,
        selected: [],
        tools: [],
        shareDetail: [],
        reigistError: '',
        loginError: '',
        userId: myCookie.userId,
        userState: myCookie.userState,
        shareShow: false
      }
    },
    mounted() {
      this.selected = new Array(this.myRouters.length).fill(false);
      this.currentRouter = this.myRouters.indexOf('热门');
      this.selected[this.currentRouter] = true;
      this.selected.push();
      this.getNewestShare(this.currentRouter);
      // userState- 0游客;1注册未激活2注册已经激活/已登录
      refresh();
      console.log('userID:' + this.userId);
      this.shareShow = this.userState === '2' && this.userId;
    },
    computed: {},
    methods: {
      searchKeyFunction(val1, val2) {
        this.$http.api({
          url: '/huhuhu/share/selectNewestShare',
          params: {
            type: val1,
            searchKey: val2
          },
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            this.shareDetail = data.shares;
          }.bind(this),
          errorCallback: function (data) {
            doOperationFailture(this);
          }.bind(this)
        });
      },
      deal() {
        this.$router.push({path: '/blog/manage'});
      },
      toActiveWithCookieUUID() {
        var uuid = getCookieValue(UUID);
        console.log('uuid:' + uuid);
        this.$router.push({path: '/blog/active', query: {'uuid': uuid}});
      },
      changeLoginError(val) {
        this.loginError = val;
      },
      goToLogin(name, pssword) {
        this.$http.api({
          url: '/huhuhu/regist/getLoginInfo',
          params: {
            'name': name,
            'password': pssword
          },
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            if (data) {
              if (data.result === '0') {
                this.loginError = data.msg;
              } else if (data.result === '1') {
                this.userId = data.userId;
                this.userState = '2';
                this.closeLogin();
                saveCookie(data.userId, this.userState);
                window.location.reload();
              } else if (data.result === '2') {
                console.log("未激活");
                this.loginError = data.msg;
                this.closeLogin();
                this.$router.push({path: '/blog/active', query: {'uuid': data.uuid}});
              }
            }
          }.bind(this),
          errorCallback: function (data) {
            doOperationFailture(this);
          }.bind(this)
        });
      },
      loginOut() {
        clearCookie();
      },
      toShare() {
        this.$router.push({path: 'share'});
      },
      searchValue(val) {
        this.$http.api({
          url: '/huhuhu/ToolKit/search',
          params: {
            'searchKey': val,
            'userId': ''
          },
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            this.tools = data.toolKitList;
          }.bind(this),
          errorCallback: function (data) {
          }.bind(this)
        });
      },
      changeCurrentIndex: function (val) {
        this.selected[this.currentRouter] = false;
        console.log(val);
        this.currentRouter = val;
        this.selected[val] = true;
        this.selected.push();
        if (val === this.myRouters.indexOf('快捷入口')) {
          this.initTools();
        } else if (val === this.myRouters.indexOf('最新分享')) {
          this.getNewestShare("1");
        } else if (val === this.myRouters.indexOf('热门')) {
          this.getNewestShare("0");
        }
      },
      initTools: function () {
        this.$http.api({
          url: '/huhuhu/ToolKit/selectTookies',
          params: {'userId': ''},
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
      getNewestShare: function (val) {
        console.log('刷新？？？' + val);
        this.$http.api({
          url: '/huhuhu/share/selectNewestShare',
          params: {
            type: val
          },
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            this.shareDetail = data.shares;
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
            if (data) {
              var result = data.result;
              if (result === '2') {
                console.log('注册成功');
//                0游客;1注册未激活2注册已经激活/已登录
                this.userState = '1';
                saveCookie(data.userId, '1');
                this.closeRegist();
                setCookie(UUID, data.uuid, ONE_DAY);
                this.$router.push({path: '/blog/active', query: {'uuid': data.uuid}});
              } else if (result === '0') {
                this.reigistError = '用户名已经存在';
              } else if (result === '1') {
                this.reigistError = '邮件已存在';
              } else if (result === '3' || result === '4') {
                this.reigistError = '系统异常';
              } else if (result === '5') {
                this.reigistError = '激活邮件发送失败';
              } else if (result === '6') {
                this.reigistError = data.checkResult;
              }
            }
          }.bind(this),
          errorCallback: function (data) {
            console.log("注册失败！！！");
          }.bind(this)
        });
      },
      changeError(val) {
        this.reigistError = val;
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
    },
    components: {
      blogRegist,
      blogLogin,
      articleList,
      menbers,
      column
    }
  };
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
            cursor: pointer;
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
                cursor: pointer;
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
              span {
                cursor: pointer;
              }
            }
            .toactive {
              text-align: center;
              height: 48px;
              line-height: 48px;
              font-size: 16px;
              color: #007fff;
              cursor: pointer;
              span {
                margin-right: 10px;
              }
            }
            .hasLogin {
              i {
                cursor: pointer;
              }
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
