<template>
  <div class="person-article-list" id="article">
    <div class="person-record">
      个人日记
    </div>
    <div class="person-article-detail" id="detail">
      <div class="left">
        <div v-for="article in personRecordList" class="left-list">
          <div class="left-body">
            <div class="canlendar">{{article.createTime}}</div>
            <div class="tree"
                 style="width: 5px;height: 100%;background:-webkit-gradient(linear, 0 0, 0 bottom, from(#ff0000), to(rgba(0, 0, 255, 0.5)));">
              <div style="position: relative;right: 13px;">
                <div style="width: 30px;height: 30px;border-radius: 30px;background-color: #ff2626;position: absolute;">
                </div>
              </div>
            </div>
          </div>
          <div style="position: relative;right: 10px;">
            <div
              style="border: 10px solid transparent;border-right: 20px solid #06addd;width: 0;height: 0;position: absolute;border-width: 25px 20px 24px 10px;"></div>
          </div>
          <div class="right">
            <div class="right-title">{{article.title}}</div>
            <div class="right-author">{{article.author}}</div>
            <div class="right-body">{{article.body}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import http from '../../http/http';
  import Vue from 'vue';
  import auth from '../../auth';
  import {setStyle, getStyle}  from  '../../assets/js/dom';
  export default{
    data () {
      return {
        id: this.$route.query.id,
        scrrenHeight: '',
        personRecordList: []
      };
    },
    created () {
      let condition = Object.assign({}, {'id': this.id}, {'cookie': auth.cookie.cookieName});
      http.api({
        url: '/huhuhu/article/personRecord',
        params: condition,
        emulateJSON: true,
        useLoadLayer: true,
        successCallback: function (data) {
          this.personRecordList = data.personRecordList;
        }.bind(this),
        errorCallback: function (data) {
          auth.clearCookie();
          this.$router.push({path: '/'});
        }.bind(this)
      });
    },
    methods: {},
    mounted () {
      Vue.nextTick(function () {
        this.scrrenHeight = window.screen.availHeight;
        setStyle(document.getElementById('article'), 'height', this.scrrenHeight + 'px');
        setStyle(document.getElementById('detail'), 'height', (this.scrrenHeight - 50) + 'px');
      }.bind(this));
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .person-article-list {
    .person-record {
      height: 50px;
      line-height: 50px;
      font-size: 30px;
      font-weight: bold;
      display: flex;

    }
    .person-article-detail {
      .left {
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        .left-list {
          max-height: 200px;
          min-height: 100px;
          display: flex;
          overflow: hidden;
          text-overflow: ellipsis;
          border: 5px;
          border-bottom: 0;
          margin-bottom: 10px;
          &:last-child {
            border-bottom: 5px;
          }
          .left-body {
            display: flex;
            .canlendar {
              margin-right: 30px;
            }
            .tree {
              margin-right: 20px;
            }
          }
          .right {
            margin-left: 20px;
            width: 85%;
            background-color: #06addd;
            .right-title {

            }
            .right-author {
              text-align: right;
            }
            .right-body {

            }
          }
        }
      }
      .left::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }
  }


</style>
