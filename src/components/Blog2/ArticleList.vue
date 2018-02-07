<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="list-body" id="load" v-on:scroll="loadMore">
    <MaskLayer v-show="currentBigImage!=''"></MaskLayer>
    <div class="show-big" v-show="currentBigImage!=''">
      <img :src="currentBigImage" @click="hideBigImage">
    </div>
    <!--工具-->
    <div v-show="last">
      <div class="search" @keyup.enter="searchValue">
        <input placeholder="输入工具名称..." v-model="searchKey"/>
        <i class="iconfont icon-sousuo" @click="searchValue"></i>
      </div>
      <div class="tools">
        <div class="tools-item iconName-box" v-for="item in tools">
          <a :href="item.url" target="_Blank" @click.stop="addCount(item.id)">
            {{item.urlName}}
          </a>
        </div>
        <div class="addSpace" v-if="isLeaveThree"></div>
        <div class="addSpace" v-if="isLeaveTwo"></div>
      </div>
    </div>
    <div v-show="showElse">
      <div class="search" @keyup.enter="searchKeyFunction">
        <input placeholder="标题..." v-model="searchKeyTitle"/>
        <i class="iconfont icon-sousuo" @click="searchKeyFunction"></i>
      </div>
      <ul>
        <li v-for="(share,index) in shareDetail" v-if="index<(currentPage)*(pageSize)">
          <div class="content-box" @click="toUrl(share.shareUrl,share.shareId)">
            <div class="info-box">
              <div class="info-row meta-row">
                关于：{{share.shareTitle}}
              </div>
              <div class="info-row title-row">
                <span class="label-box">{{share.shareDesc}}</span>
                <span>-</span>
                <span>分享人({{share.userName}})</span>
                <span>-</span>
                <span>分享时间({{share.dayString}})</span>
                <span>-</span>
                <span>阅读次数({{share.recordCount}})</span>
              </div>
            </div>
          </div>
          <div class="image" v-if="share.imageId">
            <img :src="share.imageId" @click="showCurrentBigImg(share.imageId)">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import MaskLayer from '../../components/operationDialog/MaskLayer.vue';
  import Vue from 'vue';
  export default {
    data() {
      return {
        searchKey: '',
        searchKeyTitle: '',
        currentBigImage: '',
        currentPage: 1,
        pageSize: 10,
        starIndex: 0,
        loading: false
      };
    },
    mounted () {
    },
    watch: {
      shareDetail(){
        this.currentPage = 1;
        this.pageSize = 10;
        this.starIndex = 0;
      }
    },
    methods: {
      loadMore: function () {
        if (this.loading) {
          console.log('加载中');
          return;
        }
        console.log(this.totalPages);
        let doc = document.getElementById('load');
        let scrollTop = doc.scrollTop;
        let scrollHeight = doc.scrollHeight;
        let clientHeight = doc.clientHeight;
        if (scrollTop >= scrollHeight - clientHeight) {
          if (this.currentPage >= this.totalPages) {
            console.log('没有更多了');
            return false;
          }
          var _this = this;
          this.loading = true;
          _this.starIndex += _this.pageSize;
          _this.currentPage += 1;
          console.log('load-starIndex-' + _this.starIndex);
          console.log('load-currentPage-' + _this.currentPage);
          this.loading = false;
        }
      },
      hideBigImage(){
        this.currentBigImage = '';
      },
      showCurrentBigImg(val){
        this.currentBigImage = val;
      },
      searchKeyFunction() {
        this.$emit('searchKeyFunction', this.currentRouter === 0 ? '0' : '1', this.searchKeyTitle);
      },
      toUrl(val, val1) {
        this.$http.api({
          url: '/huhuhu/share/addShareCount',
          params: {
            'shareId': val1
          },
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
          }.bind(this),
          errorCallback: function (data) {
          }.bind(this)
        });
        this.$emit('getNewestShare', this.currentRouter === 0 ? '0' : '1');
        window.open(val);
      },
      searchValue() {
        this.$emit('searchValue', this.searchKey);
      },
      addCount(val) {
        this.$http.api({
          url: '/huhuhu/ToolKit/updateCountById',
          params: {
            'id': val
          },
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            this.$emit('initTools');
          }.bind(this),
          errorCallback: function (data) {
          }.bind(this)
        });
      }
    },
    computed: {
      showElse() {
        return !(this.index === this.totalSize - 1);
      },
      last() {
        return this.index === this.totalSize - 1;
      },
      isLeaveThree() {
        var length = this.tools.length;
        return length % 4 === 3 || length % 4 === 2;
      },
      isLeaveTwo() {
        return this.tools.length % 4 === 2;
      }
    },
    components: {
      MaskLayer
    },
    props: {
      index: {
        type: Number,
        require: true
      },
      totalSize: {
        type: Number,
        require: true,
        default: 0
      },
      tools: {
        type: Array,
        require: false
      },
      shareDetail: {
        type: Array,
        require: false
      },
      currentRouter: {
        type: Number,
        require: false
      },
      totalPages: {
        type: Number,
        require: true
      },
      totalNum: {
        type: Number,
        require: true
      },
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .list-body {
    height: 91%;
    overflow-y: scroll;
    .show-big {
      padding: 20px;
      background-color: #ffffff;
      width: 400px;
      height: 400px;
      position: absolute;
      right: 0;
      left: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      z-index: 1002;
      img {
        width: 400px;
        height: 400px;
      }
    }
    ul {
      li {
        border-bottom: 1px solid rgba(178, 186, 194, .15);
        display: flex;
        justify-content: space-between;
        .image {
          margin-right: 10px;
          margin-left: 10px;
          img {
            width: 80px;
            height: 80px;
            margin-top: 10px;
          }
        }
        .content-box {
          cursor: pointer;
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
              font-size: 16px;
            }
            .title-row {
              font-size: 14px;
              font-weight: 600;
              line-height: 1.2;
              color: #999999;
              .label-box {
                height: 20px;
                padding: 5px;
                text-align: center;
                background-color: #02ac1a;
                color: #FFFFFF;
                border-radius: 5px;
              }
            }
          }
        }
      }
    }
    .search {
      display: flex;
      margin: 20px 37px 0 37px;
      input {
        width: 90%;
        height: 50px;
        padding: 0 50px 0 10px;
        font-size: 16px;
        color: #999;
      }
      i {
        position: relative;
        font-size: 50px;
        color: #007fff;
        cursor: pointer;
      }
    }
    .tools {
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .iconName-box {
        cursor: pointer;
        background-color: #8c8c8c;
        display: inline-block;
        a {
          text-decoration: none;
          color: #FFFFFF;
        }
      }
      .tools-item {
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
      }
      .addSpace {
        width: 19%;
        height: 50px;
        margin: 20px;
      }
    }
  }
</style>
