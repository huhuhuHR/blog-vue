<template>
  <div class="list-body">
    <!--工具-->
    <div v-show="last">
      <div class="search" @keyup.enter="searchValue">
        <input placeholder="输入..." v-model="searchKey"/>
        <i class="iconfont icon-sousuo" @click="searchKey"></i>
      </div>
      <div class="tools">
        <div class="tools-item iconName-box" v-for="item in tools" @click.stop="addCount(item.id)">
          <a :href="item.url" target="_Blank">
            {{item.urlName}}
          </a>
        </div>
        <div class="addSpace" v-if="isLeaveThree"></div>
        <div class="addSpace" v-if="isLeaveTwo"></div>
      </div>
    </div>
    <div v-show="showElse">
      <ul>
        <li v-for="share in shareDetail">
          <div class="content-box" @click="toUrl(share.shareUrl)">
            <div class="info-box">
              <div class="info-row meta-row">
                {{share.shareTitle}}
              </div>
              <div class="info-row title-row">
                {{share.shareDesc}}
              </div>
              <div class="info-row action-row">
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        searchKey: ''
      };
    },
    mounted(){
    },
    methods: {
      toUrl (val) {
        window.open(val);
      },
      searchValue (){
        this.$emit('searchValue', this.searchKey);
      },
      addCount(val){
        this.$http.api({
          url: '/huhuhu/ToolKit/updateCountById',
          params: {
            'userId': '248886518218567680',
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
      showElse(){
        return !(this.index === this.totalSize - 1);
      },
      last () {
        return this.index === this.totalSize - 1;
      },
      isLeaveThree () {
        var length = this.tools.length;
        return length % 4 === 3 || length % 4 === 2;
      },
      isLeaveTwo () {
        return this.tools.length % 4 === 2;
      }
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
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .list-body {
    height: 91%;
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
