<template>
  <div class="new-home-root">
    <div class="head">
      <ul>
        <li class="my-point">我的关注</li>
        <li>java</li>
        <li>vue</li>
        <li>vue</li>
        <li>vue</li>
      </ul>
      <div class="label">标签管理</div>
    </div>
    <div class="myBody">
      <div class="left">
        <div class="write-share">
          <div class="item">
            <img src="./1.jpeg"/>
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
              <li>热门</li>
              <li>最新</li>
              <li>评论</li>
            </ul>
          </div>
          <div class="list-body">
            <ul>
              <li v-for="i in 10">
                <div class="content-box">
                  <div class="info-box">
                    <div class="info-row meta-row">
                      芋道源码掘金Java群217878901>4小时前>java
                    </div>
                    <div class="info-row title-row">
                      SpringCloud  Eureka 源码解析 —— 应用实例注册发现（六）之全量获取
                    </div>
                    <div class="info-row action-row">
                      收藏-评论
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="login">
          <div class="login-head">
            <span class="toLogin" @click="toLogin">登录</span>
            <span @click="toRegist">注册</span>
          </div>
        </div>
        <div class="user-hasLogin">
          <div class="user-info">
            <span>专栏：</span>霍荣
          </div>
          <div class="user-item">
            <i class="iconfont icon-wenzhang"></i>
            <span>我的文章</span>
          </div>
          <div class="user-item">
            <i class="iconfont icon-shoucang"></i>
            <span>我的收藏</span>
          </div>
          <div class="user-item">
            <i class="iconfont icon-huaban"></i>
            <span>我的分享</span>
          </div>
          <div class="user-item">
            <i class="iconfont icon-xiai"></i>
            <span>我的喜爱</span>
          </div>
          <div class="user-item">
            <i class="iconfont icon-ttpodicon"></i>
            <span>设置</span>
          </div>
        </div>
        <div class="my-group">
          <div class="group-orz">我的组织(10)</div>
          <div class="current-orz">
            当前组织：
            <span>锐意</span>
          </div>
          <div class="switch-orz">
            切换：<i class="iconfont icon-qiehuan"></i>
          </div>
        </div>
        <div class="user-else">
          <div class="user-else-head">
            <span>成员(10)</span>
          </div>
          <div class="over-flow-scroll">
            <div class="user-else-info" v-for="i in 10">
              <img src="./1.jpeg"/>
              <div class="introduce">
                <div class="user-name">霍荣</div>
                <div class="user-good-at">java</div>
              </div>
            </div>
          </div>
        </div>
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

  export default {
    data() {
      return {
        registShow: false,
        loginShow: false
      };
    },
    computed: {},
    methods: {
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
    },
    mounted() {
    },
    filters: {},
    components: {
      blogRegist,
      blogLogin
    },
    created() {
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
          }
          .list-body {
            height: 92%;
            overflow-y: scroll;
            ul {
              li {
                border-bottom: 1px solid rgba(178, 186, 194, .15);
                .content-box {
                  display: flex;
                  align-self: center;
                  padding: 20px 30px;
                  .info-box {
                    -webkit-box-flex: 1;
                    -ms-flex: 1 1 auto;
                    flex: 1 1 auto;
                    -webkit-box-orient: vertical;
                    -webkit-box-direction: normal;
                    -ms-flex-direction: column;
                    flex-direction: column;
                    -webkit-box-pack: center;
                    -ms-flex-pack: center;
                    justify-content: center;
                    min-width: 0;
                    .info-row {
                      padding: 5px 0;
                      :first-child {
                        padding-top: 0;
                      }
                      :last-child {
                        padding-bottom: 0;
                      }
                    }
                    .meta-row {
                      font-size: 12px;
                      color: #b2bac2;
                    }
                    .title-row {
                      font-size: 14px;
                      font-weight: 600;
                      line-height: 1.2;
                      color: #2e3135;
                    }
                  }
                }
              }
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
            font-size: 16px;
            color: #007fff;
            padding: 12.5px 0 12.5px 10px;
            border-bottom: 1px solid rgba(178, 186, 194, .15);
            .toLogin:after {
              content: "\B7";
              margin: 2px;
            }
          }
        }
        .user-hasLogin {
          margin-bottom: 10px;
          background-color: #ffffff;
          font-size: 16px;
          padding: 10px;
          border-bottom: 1px solid rgba(178, 186, 194, .15);
          .user-info {
            span {
              font-weight: 500;
              color: #b71ed7;
            }
          }
          :last-child {
            margin-bottom: 0 !important;
          }
          .user-item {
            border-top: 1px solid rgba(178, 186, 194, .15);
            border-bottom: 1px solid rgba(178, 186, 194, .15);
            border-radius: 2px;
            padding: 10px 0;
            margin-bottom: 2px;
            font-size: 12px;
            color: #007fff;
            i {
              font-size: 12px;
              color: #000000;
            }
          }
        }
        .my-group {
          background-color: #ffffff;
          padding: 10px;
          margin-bottom: 10px;
          .group-orz {
            font-size: 16px;
            font-weight: 600;
          }
          .current-orz {
            font-size: 12px;
            span {
              color: #007fff;
            }
          }
          .switch-orz {
            font-size: 12px;
          }
        }
        .user-else {
          background-color: #ffffff;
          .user-else-head {
            font-weight: 500;
            font-size: 16px;
            padding: 10px;
            border-bottom: 1px solid rgba(178, 186, 194, .15);
          }
          .over-flow-scroll {
            max-height: 254.5px;
            overflow-y: scroll;
            .user-else-info {
              padding: 10px;
              display: flex;
              border-bottom: 1px solid rgba(178, 186, 194, .15);
              img {
                height: 36px;
                width: 36px;
                border-radius: 36px;
              }
              .introduce {
                margin-left: 5px;
                width: 80%;
                .user-name {
                  width: 100%;
                  font-size: 14px;
                  color: #333;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                .user-good-at {
                  width: 100%;
                  color: #909090;
                  font-size: 12px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
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
