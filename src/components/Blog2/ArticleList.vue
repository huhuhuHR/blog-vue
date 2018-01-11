<template>
  <div class="list-body">
    <!--工具-->
    <div v-show="last" class="tools">
      <div class="tools-item" v-for="item in tools" @click.stop="addCount(item.id)">
        <a :href="item.url" target="_Blank">
          {{item.urlName}}
        </a>
      </div>
    </div>
    <!--搜索-->
    <!--<div v-show="secondLast">-->
    <!--@-->
    <!--</div>-->
    <div v-show="showElse">
      <ul>
        <li v-for="i in 10">
          <div class="content-box">
            <div class="info-box">
              <div class="info-row meta-row">
                芋道源码掘金Java群217878901>4小时前>java
              </div>
              <div class="info-row title-row">
                SpringCloud Eureka 源码解析 —— 应用实例注册发现（六）之全量获取
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
</template>
<script>
  export default{
    data () {
      return {};
    },
    mounted(){
    },
    methods: {
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
        return !(this.index === this.totalSize - 1 || this.index === this.totalSize - 2);
      },
      last () {
        return this.index === this.totalSize - 1;
      }
    },
    props: {
      index: {
        type: Number,
        require: true
      },
      totalSize: {
        type: Number,
        require: true
      },
      tools: {
        type: Array,
        require: false
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
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
    .tools {
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
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
    }
  }
</style>
